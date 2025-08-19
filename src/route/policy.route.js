const express = require("express");
const {
    createPolicyController,
    getAllPolicyController,
    updatePolicyController,
    deletePolicyController,
    getByNamePolicyController
} = require("../controller/policy.controller");

const router = express.Router();

router.post("/", createPolicyController);
router.post("/getAll", getAllPolicyController);
router.post("/update", updatePolicyController);
router.post("/delete", deletePolicyController);
router.post("/getByName", getByNamePolicyController);

module.exports = router;
