const {
    createPackageFeatureService,
    getAllPackageFeatureService,
    updatePackageFeatureService,
    deletePackageFeatureService
} = require("../service/package.feature.service");

const createPackageFeatureController = async (req, res) => {
    try {
        const PackageFeatureData = req.body;
        const newPackageFeature = await createPackageFeatureService(PackageFeatureData);
        return res.status(200).json({
            status: 200,
            message: "Create PackageFeature successfully",
            data: newPackageFeature,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }
};

const getAllPackageFeatureController = async (req, res) => {
    try {
        const PackageFeatures = await getAllPackageFeatureService();
        return res.status(200).json({
            status: 200,
            data: PackageFeatures,
            message: "Get all Package Features successfully",
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }
};

const updatePackageFeatureController = async (req, res) => {
    const { id } = req.params;
    const PackageFeatureData = req.body;
    try {
        const updatedPackageFeature = await updatePackageFeatureService(id, PackageFeatureData);
        return res.status(200).json({
            status: 200,
            data: updatedPackageFeature,
            message: "Update PackageFeature successfully",
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }
};

const deletePackageFeatureController = async (req, res) => {
    const { id } = req.params;
    try {
        await deletePackageFeatureService(id);
        return res.status(200).json({
            status: 200,
            message: "Delete Package Feature successfully",
            data: null,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }
};

module.exports = {
    createPackageFeatureController,
    getAllPackageFeatureController,
    updatePackageFeatureController,
    deletePackageFeatureController
};
