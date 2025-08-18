const packageFeature = require("../model/package.feature.model");

const createPackageFeatureService = async (data) => {
    try {
        const newPackageFeature = new packageFeature(data);
        await newPackageFeature.save();
        return newPackageFeature;
    } catch (error) {
        throw new Error("Error creating package feature: " + error.message);
    }
};

const getAllPackageFeatureService = async () => {
    try {
        const packageFeatures = await packageFeature.find();
        return packageFeatures;
    } catch (error) {
        throw new Error("Error fetching package features: " + error.message);
    }
};

const updatePackageFeatureService = async (id, data) => {
    try {
        const updatedPackageFeature = await packageFeature.findByIdAndUpdate(id, data, { new: true });
        return updatedPackageFeature;
    } catch (error) {
        throw new Error("Error updating package feature: " + error.message);
    }
};

const deletePackageFeatureService = async (id) => {
    try {
        await packageFeature.findByIdAndDelete(id);
    } catch (error) {
        throw new Error("Error deleting package feature");
    }
};

module.exports = {
    createPackageFeatureService,
    getAllPackageFeatureService,
    updatePackageFeatureService,
    deletePackageFeatureService
};
