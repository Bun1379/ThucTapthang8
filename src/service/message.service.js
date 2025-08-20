const conversationModel = require("../model/conversation.model");
const messageModel = require("../model/message.model");

const mongoose = require("mongoose");

const getConversations = async (buyerId, sellerOrAdminId, type) => {
    try {
        const buyerObjectId = mongoose.Types.ObjectId.isValid(buyerId) ? buyerId : new mongoose.Types.ObjectId(buyerId);
        const sellerOrAdminObjectId = mongoose.Types.ObjectId.isValid(sellerOrAdminId) ? sellerOrAdminId : new mongoose.Types.ObjectId(sellerOrAdminId);

        let query = { type, buyer: buyerObjectId };

        if (type === "user-seller") {
            query.seller = sellerOrAdminObjectId;
        }
        if (type === "user-admin") {
            query.assigned_to = sellerOrAdminObjectId;
        }

        let conversations = await conversationModel.find(query);

        if (!conversations || conversations.length === 0) {
            const newConversation = new conversationModel({
                type,
                buyer: buyerObjectId,
                seller: type === "user-seller" ? sellerOrAdminObjectId : null,
                assigned_to: type === "user-admin" ? sellerOrAdminObjectId : null,
                status: "open"
            });

            await newConversation.save();
            return newConversation;
        }

        return conversations[0]; // Trả về conversation đầu tiên thay vì array
    } catch (error) {
        throw new Error("Error getting conversations: " + error.message);
    }
};

const createMessage = async (data) => {
    try {
        // Convert string IDs to ObjectId if they're not already
        const messageData = { ...data };
        if (messageData.conversation && !mongoose.Types.ObjectId.isValid(messageData.conversation)) {
            messageData.conversation = new mongoose.Types.ObjectId(messageData.conversation);
        }
        if (messageData.sender && !mongoose.Types.ObjectId.isValid(messageData.sender)) {
            messageData.sender = new mongoose.Types.ObjectId(messageData.sender);
        }

        const message = new messageModel(messageData);
        await message.save();
        return message;
    } catch (error) {
        throw new Error("Error creating message: " + error.message);
    }
};

const getMessagesByConversationId = async (conversationId) => {
    try {
        // Convert string ID to ObjectId if it's not already
        const conversationObjectId = mongoose.Types.ObjectId.isValid(conversationId) ? conversationId : new mongoose.Types.ObjectId(conversationId);
        const messages = await messageModel.find({ conversation: conversationObjectId });
        return messages;
    } catch (error) {
        throw new Error("Error getting messages: " + error.message);
    }
};

module.exports = {
    getConversations,
    createMessage,
    getMessagesByConversationId
};
