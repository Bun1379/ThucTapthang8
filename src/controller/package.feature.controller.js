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
        return res.status(201).json({
            DT: newPackageFeature,
            EM: "Create Package Feature successfully",
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAllPackageFeatureController = async (req, res) => {
    try {
        const PackageFeatures = await getAllPackageFeatureService();
        return res.status(200).json({
            DT: PackageFeatures,
            EM: "Get all Package Features successfully",
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updatePackageFeatureController = async (req, res) => {
    const { id } = req.params;
    const PackageFeatureData = req.body;
    try {
        const updatedPackageFeature = await updatePackageFeatureService(id, PackageFeatureData);
        return res.status(200).json({
            DT: updatedPackageFeature,
            EM: "Update PackageFeature successfully",
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deletePackageFeatureController = async (req, res) => {
    const { id } = req.params;
    try {
        await deletePackageFeatureService(id);
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createPackageFeatureController,
    getAllPackageFeatureController,
    updatePackageFeatureController,
    deletePackageFeatureController
};
