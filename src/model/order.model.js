const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            variant: { type: String },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    status: { type: String, enum: ["PENDING", "DELIVERED", "COMPLETED"], default: "PENDING" },
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
