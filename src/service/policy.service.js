const policyModel = require("../model/policy.model");

const createPolicyService = async (data) => {
    try {
        const newPolicy = new policyModel(data);
        await newPolicy.save();
        return newPolicy;
    } catch (error) {
        throw new Error("Error creating policy: " + error.message);
    }
};

const getAllPolicyService = async () => {
    try {
        const policies = await policyModel.find();
        return policies;
    } catch (error) {
        throw new Error("Error fetching policies: " + error.message);
    }
};

const updatePolicyService = async (id, data) => {
    try {
        const updatedPolicy = await policyModel.findByIdAndUpdate(id, data, { new: true });
        return updatedPolicy;
    } catch (error) {
        throw new Error("Error updating policy: " + error.message);
    }
};

const deletePolicyService = async (id) => {
    try {
        await policyModel.findByIdAndDelete(id);
    } catch (error) {
        throw new Error("Error deleting policy: " + error.message);
    }
};

const getByNamePolicyService = async (name) => {
    try {
        const policyData = await policyModel.findOne({ name });
        return policyData;
    } catch (error) {
        throw new Error("Error fetching policy by name: " + error.message);
    }
};

module.exports = {
    createPolicyService,
    getAllPolicyService,
    updatePolicyService,
    deletePolicyService,
    getByNamePolicyService
};