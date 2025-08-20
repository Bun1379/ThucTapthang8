// server/socket/chat.handler.js
const {
    getConversations,
    createMessage,
    getMessagesByConversationId,
} = require("../service/message.service.js");

const admins = new Map();
const sellers = new Map();
const waitingQueue = [];

function getLeastBusyAdmin() {
    let chosen = null;
    for (const [adminId, info] of admins.entries()) {
        if (!chosen || info.activeCount < admins.get(chosen).activeCount) {
            chosen = adminId;
        }
    }
    return chosen;
}

function serializeMessage(message) {
    return {
        id: message._id,
        conversation: message.conversation,
        sender: message.sender,
        text: message.text,
        senderType: message.senderType,
        timestamp: message.createdAt
    };
}

async function createUserSellerConversation(userId, sellerId) {
    return await getConversations(userId, sellerId, "user-seller");
}

async function getConversation(userId, adminId) {
    const conversations = await getConversations(userId, adminId, "user-admin");
    return Array.isArray(conversations) ? conversations[0] : conversations;
}

async function addMessage(conversationId, senderId, text, senderType = "customer") {
    return await createMessage({
        conversation: conversationId,
        sender: senderId,
        text: text,
        senderType: senderType
    });
}

function processWaitingQueue(io) {
    const adminId = getLeastBusyAdmin();
    if (!adminId || waitingQueue.length === 0) return;

    const waitingUser = waitingQueue.shift();
    // Xử lý user đang chờ khi có admin mới
    io.to(waitingUser.socketId).emit("queue:processed", {
        message: "CSKH đã sẵn sàng hỗ trợ bạn."
    });
}

function registerChatHandler(io) {
    io.on("connection", (socket) => {
        console.log("🔌 Socket connected", socket.id);

        socket.on("auth", ({ userId, role }) => {
            socket.data.userId = userId;
            socket.data.role = role;
            if (role === "admin") {
                admins.set(userId, { socketId: socket.id, activeCount: 0 });
                // Xử lý queue khi có admin mới
                processWaitingQueue(io);
            }
            if (role === "seller") sellers.set(userId, socket.id);
        });

        // User gửi tin nhắn cho admin
        socket.on("user:messageToAdmin", async ({ userId, text }) => {
            let conv = null;
            const adminId = getLeastBusyAdmin();

            if (!adminId) {
                // Không có admin rảnh, đưa vào hàng đợi
                waitingQueue.push({ userId, socketId: socket.id, firstMessage: text });
                io.to(socket.id).emit("queue:waiting", {
                    message: "Chưa có CSKH rảnh, bạn đang ở hàng đợi."
                });
                return;
            }

            // Tìm hoặc tạo conversation với admin
            conv = await getConversation(userId, adminId);
            admins.get(adminId).activeCount += 1;

            // Join vào room chat
            socket.join(conv.id);
            io.to(admins.get(adminId).socketId).socketsJoin(conv.id);

            // Thông báo bắt đầu conversation
            io.to([socket.id, admins.get(adminId).socketId]).emit("conversation:started", {
                conversationId: conv.id,
                type: "user-admin",
            });

            // Lưu tin nhắn và gửi cho tất cả trong room
            const msg = await addMessage(conv.id, userId, text, "customer");
            io.to(conv.id).emit("message:new", {
                conversationId: conv.id,
                message: serializeMessage(msg)
            });
        });

        // User gửi tin nhắn cho seller
        socket.on("user:messageToSeller", async ({ userId, sellerId, text }) => {
            // Tạo hoặc lấy conversation với seller
            const conv = await createUserSellerConversation(userId, sellerId);
            socket.join(conv.id);

            // Nếu seller online thì join vào room
            if (sellers.get(sellerId)) {
                io.to(sellers.get(sellerId)).socketsJoin(conv.id);
            }

            // Lưu tin nhắn và gửi cho tất cả trong room
            const msg = await addMessage(conv.id, userId, text, "customer");
            io.to(conv.id).emit("message:new", {
                conversationId: conv.id,
                message: serializeMessage(msg)
            });
        });

        // Admin/Seller trả lời tin nhắn
        socket.on("agent:message", async ({ conversationId, text }) => {
            const senderType = socket.data.role === "admin" ? "seller" : "seller";
            const msg = await addMessage(conversationId, socket.data.userId, text, senderType);
            io.to(conversationId).emit("message:new", {
                conversationId,
                message: serializeMessage(msg)
            });
        });

        // Lấy tin nhắn cũ của conversation
        socket.on("get:messages", async ({ conversationId }) => {
            try {
                const messages = await getMessagesByConversationId(conversationId);
                socket.emit("messages:history", {
                    conversationId,
                    messages: messages.map(msg => serializeMessage(msg))
                });
            } catch (error) {
                socket.emit("error", { message: "Không thể tải tin nhắn" });
            }
        });

        socket.on("disconnect", () => {
            const { userId, role } = socket.data || {};
            if (role === "admin") {
                const adminInfo = admins.get(userId);
                if (adminInfo) {
                    // Giảm activeCount khi admin disconnect
                    adminInfo.activeCount = Math.max(0, adminInfo.activeCount - 1);
                }
                admins.delete(userId);
            }
            if (role === "seller") sellers.delete(userId);
            console.log("❌ disconnected", socket.id);
        });
    });
}

module.exports = { registerChatHandler };
