const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["user-seller", "user-admin"],
        required: true
    },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // nếu type=user-seller
    assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // nếu type=user-admin
    status: { type: String, enum: ["pending", "open", "closed"], default: "open" },
});

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
