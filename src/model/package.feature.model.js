const mongoose = require("mongoose");

const packageFeatureSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String }
});

const PackageFeature = mongoose.model("PackageFeature", packageFeatureSchema);

module.exports = PackageFeature;
