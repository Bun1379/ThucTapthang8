const {
    createPolicyService,
    getAllPolicyService,
    updatePolicyService,
    deletePolicyService,
    getByNamePolicyService
} = require("../service/policy.service");

const createPolicyController = async (req, res) => {
    try {
        const policyData = req.body;
        const newPolicy = await createPolicyService(policyData);
        return res.status(200).json({
            status: 200,
            message: "Create policy successfully",
            data: newPolicy,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }
};

const getAllPolicyController = async (req, res) => {
    try {
        const policies = await getAllPolicyService();
        return res.status(200).json({
            status: 200,
            message: "Get all policies successfully",
            data: policies,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }
};

const updatePolicyController = async (req, res) => {
    const { id, policyData } = req.body;
    try {
        const updatedPolicy = await updatePolicyService(id, policyData);
        return res.status(200).json({
            status: 200,
            message: "Update policy successfully",
            data: updatedPolicy,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }
};

const deletePolicyController = async (req, res) => {
    const { id } = req.body;
    try {
        await deletePolicyService(id);
        return res.status(200).json({
            status: 200,
            message: "Delete policy successfully",
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

const getByNamePolicyController = async (req, res) => {
    const { name } = req.body;
    try {
        const policy = await getByNamePolicyService(name);
        return res.status(200).json({
            status: 200,
            message: "Get policy by name successfully",
            data: policy,
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
    createPolicyController,
    getAllPolicyController,
    updatePolicyController,
    deletePolicyController,
    getByNamePolicyController
};