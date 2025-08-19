const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
    name: { type: String, enum: ["shipping_policy", "payment_policy", "origin_policy", "verification_policy", "genuine_policy", "wholesale_purchasing_policy", "introduce"], required: true, unique: true },
    url: { type: String, required: true }
});

const Policy = mongoose.model("Policy", policySchema);

module.exports = Policy;