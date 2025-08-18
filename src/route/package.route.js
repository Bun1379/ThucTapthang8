const express = require("express");
const {
    createPackageController,
    getAllPackageController,
    updatePackageController,
    deletePackageController,
    getTablePackageController
} = require("../controller/package.controller");

const router = express.Router();

router.post("/", createPackageController);
router.get("/", getAllPackageController);
router.put("/:id", updatePackageController);
router.delete("/:id", deletePackageController);
router.get("/table", getTablePackageController);

module.exports = router;
