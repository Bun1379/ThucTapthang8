const express = require("express");
const {
    getConversationsController,
    createMessageController,
    getMessagesByConversationIdController
} = require("../controller/message.controller");

const router = express.Router();

router.post("/conversations", getConversationsController);
router.post("/", createMessageController);
router.post("/getConversation", getMessagesByConversationIdController);

module.exports = router;

