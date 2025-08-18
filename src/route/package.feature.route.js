const express = require("express");
const {
    createPackageFeatureController,
    getAllPackageFeatureController,
    updatePackageFeatureController,
    deletePackageFeatureController
} = require("../controller/package.feature.controller");

const router = express.Router();

router.post("/", createPackageFeatureController);
router.get("/", getAllPackageFeatureController);
router.put("/:id", updatePackageFeatureController);
router.delete("/:id", deletePackageFeatureController);

module.exports = router;
