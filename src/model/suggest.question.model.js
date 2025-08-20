const mongoose = require("mongoose");

const suggestQuestionSchema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: function () {
            return this.seller_type === "User";
        }
    },
    seller_type: {
        type: String,
        enum: ["User", "Admin"],
        required: true
    },
    question: { type: String, required: true },
    answer: { type: String, required: true },
});

const SuggestQuestion = mongoose.model("SuggestQuestion", suggestQuestionSchema);

module.exports = SuggestQuestion;
