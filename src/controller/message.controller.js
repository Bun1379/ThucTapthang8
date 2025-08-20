const {
    getConversations,
    createMessage,
    getMessagesByConversationId
} = require("../service/message.service");

const getConversationsController = async (req, res) => {
    const { buyer, seller, type } = req.body;
    try {
        const conversations = await getConversations(buyer, seller, type);
        return res.status(200).json({
            status: 200,
            message: "Get conversations successfully",
            data: conversations,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }
};

const createMessageController = async (req, res) => {
    const { data } = req.body;
    try {
        const message = await createMessage(data);
        return res.status(201).json({
            status: 201,
            message: "Create message successfully",
            data: message
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }
};

const getMessagesByConversationIdController = async (req, res) => {
    const { conversationId } = req.params;
    try {
        const messages = await getMessagesByConversationId(conversationId);
        res.status(200).json({
            status: 200,
            message: "Get messages by conversation ID successfully",
            data: messages
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }
};

module.exports = {
    getConversationsController,
    createMessageController,
    getMessagesByConversationIdController
};
