const packageFeatureModel = require("../model/package.feature.model");

const createPackageFeatureService = async (data) => {
    try {
        const newPackageFeature = new packageFeatureModel(data);
        await newPackageFeature.save();
        return newPackageFeature;
    } catch (error) {
        throw new Error("Error creating package feature: " + error.message);
    }
};

const getAllPackageFeatureService = async () => {
    try {
        const packageFeatures = await packageFeatureModel.find();
        return { packageFeatures };
    } catch (error) {
        throw new Error("Error fetching package features: " + error.message);
    }
};

const updatePackageFeatureService = async (id, data) => {
    try {
        const updatedPackageFeature = await packageFeatureModel.findByIdAndUpdate(id, data, { new: true });
        return updatedPackageFeature;
    } catch (error) {
        throw new Error("Error updating package feature: " + error.message);
    }
};

const deletePackageFeatureService = async (id) => {
    try {
        await packageFeatureModel.findByIdAndDelete(id);
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
