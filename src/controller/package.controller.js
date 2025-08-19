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
        return res.status(200).json({
            status: 200,
            message: "Create package successfully",
            data: newPackage,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }
};

const getAllPackageController = async (req, res) => {
    try {
        const packages = await getAllPackageService();
        return res.status(200).json({
            status: 200,
            message: "Get all packages successfully",
            data: packages,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }
};

const updatePackageController = async (req, res) => {
    const { id } = req.params;
    const packageData = req.body;
    try {
        const updatedPackage = await updatePackageService(id, packageData);
        return res.status(200).json({
            status: 200,
            message: "Update package successfully",
            data: updatedPackage,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }
};

const deletePackageController = async (req, res) => {
    const { id } = req.params;
    try {
        await deletePackageService(id);
        return res.status(200).json({
            status: 200,
            message: "Delete package successfully",
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

const getTablePackageController = async (req, res) => {
    try {
        const table = await getTablePackageService();
        return res.status(200).json({
            status: 200,
            message: "Get table packages successfully",
            data: table,
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
    createPackageController,
    getAllPackageController,
    updatePackageController,
    deletePackageController,
    getTablePackageController
};

