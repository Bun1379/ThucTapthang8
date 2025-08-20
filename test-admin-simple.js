// Test file admin đơn giản
const io = require('socket.io-client');

const adminSocket = io('http://localhost:3000');

adminSocket.emit('auth', { userId: '507f1f77bcf86cd799439013', role: 'admin' });

adminSocket.on('connect', () => {
    console.log('✅ Admin connected');
});

adminSocket.on('conversation:started', (data) => {
    console.log('💬 Admin conversation started:', data);
});

adminSocket.on('message:new', (data) => {
    console.log('📨 Admin received message:', data.message.text);

    // Admin trả lời tự động
    setTimeout(() => {
        adminSocket.emit('agent:message', {
            conversationId: data.conversationId,
            text: 'Xin chào! Tôi là CSKH, tôi có thể giúp gì cho bạn?'
        });
    }, 1000);
});

// Disconnect sau 30 giây
setTimeout(() => {
    adminSocket.disconnect();
    console.log('🔌 Admin disconnected');
    process.exit(0);
}, 30000);
