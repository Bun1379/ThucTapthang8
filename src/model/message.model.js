const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    conversation: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation", required: true },
    senderType: { type: String, enum: ["customer", "seller", "bot"], required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
