const mongoose = require("mongoose");

const packageFeatureSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String }
});

const packageFeature = mongoose.model("packageFeature", packageFeatureSchema);

module.exports = packageFeature;
