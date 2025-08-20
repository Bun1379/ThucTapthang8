const conversationModel = require('../model/conversation.model');
const messageModel = require('../model/message.model');

const getConversations = async (buyer, seller, type) => {
    try {
        let query = {};

        if (type === "user-admin") {
            query = { type: "user-admin", buyer: buyer };
        } else {
            query = { type: "user-seller", buyer: buyer, seller: seller };
        }

        let conversations = await conversationModel.find(query);

        if (!conversations || conversations.length === 0) {
            const newConversation = new conversationModel({
                type: type === "user-admin" ? "user-admin" : "user-seller",
                buyer: buyer,
                seller: type === "user-seller" ? seller : null,
                assigned_to: type === "user-admin" ? seller : null,

            });
            await newConversation.save();
            return newConversation;
        }

        return { conversations };
    } catch (error) {
        throw new Error("Error getting conversations by user ID: " + error.message);
    }
};


const createMessage = async (data) => {
    try {
        const message = new messageModel(data);
        await message.save();
        return message;
    } catch (error) {
        throw new Error("Error creating message: " + error.message);
    }
};

const getMessagesByConversationId = async (conversationId) => {
    try {
        const messages = await messageModel.find({ conversationId });
        return messages;
    } catch (error) {
        throw new Error("Error getting messages by conversation ID: " + error.message);
    }
};

module.exports = {
    getConversations,
    createMessage,
    getMessagesByConversationId
};
