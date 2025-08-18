const {
    createPackageService,
    getAllPackageService,
    updatePackageService,
    deletePackageService,
    getTablePackageService
} = require("../service/package.service");

const createPackageController = async (req, res) => {
    try {
        const packageData = req.body;
        const newPackage = await createPackageService(packageData);
        return res.status(201).json({
            DT: newPackage,
            EM: "Create package successfully",
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAllPackageController = async (req, res) => {
    try {
        const packages = await getAllPackageService();
        return res.status(200).json({
            DT: packages,
            EM: "Get all packages successfully",
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updatePackageController = async (req, res) => {
    const { id } = req.params;
    const packageData = req.body;
    try {
        const updatedPackage = await updatePackageService(id, packageData);
        return res.status(200).json({
            DT: updatedPackage,
            EM: "Update package successfully",
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deletePackageController = async (req, res) => {
    const { id } = req.params;
    try {
        await deletePackageService(id);
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getTablePackageController = async (req, res) => {
    try {
        const table = await getTablePackageService();
        return res.status(200).json({
            DT: table,
            EM: "Get table packages successfully",
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createPackageController,
    getAllPackageController,
    updatePackageController,
    deletePackageController,
    getTablePackageController
};

