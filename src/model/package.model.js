const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    time: { type: Number },
    time_unit: { type: String, enum: ["day", "month", "year"] },
    price: { type: Number, required: true },
    currency_unit: { type: String, required: true },
    features: [
        {
            feature: { type: mongoose.Schema.Types.ObjectId, ref: "packageFeature", required: true },
            limit_type: { type: String, enum: ["unlimited", "limited", "weekly", "monthly", "yearly", "daily", "text"] },
            limit_value: { type: Number }, // Trường này cho type: "weekly", "monthly", "yearly", "daily", "limited"
            limit_name: { type: String }, // tên đơn vị tùy thuộc vào type: sản phẩm, mẫu, lần 
            text: { type: String }, // Trường này cho type: "text" 
        }
    ]
});

const package = mongoose.model("package", packageSchema);

module.exports = package;

// numberProduct: { type: Number, required: true },
// proBooth: { type: Boolean, required: true, default: true },
// language: { type: Boolean, required: true, default: false },
// boothDesign: { type: Number, required: true, default: 0 },
// boothManagement: { type: Boolean, required: true, default: true },
// SEOsupport: { type: Boolean, required: true, default: false },
// directQuote: { type: String, required: true, default: "30" },
// negotiation: { type: Number, required: true, default: 0 },
// googleAds: { type: Boolean, required: true, default: false },
// paymentShipping: { type: Boolean, required: true, default: false },
// banner: { type: Number, required: true, default: 0 },
// homepagePost: { type: Number, required: true, default: 0 },
// FBPost: { type: Number, required: true, default: 0 },
// marketingSupport: { type: Boolean, required: true, default: false }