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
router.post("/getAll", getAllPackageController);
router.put("/:id", updatePackageController);
router.delete("/:id", deletePackageController);
router.post("/table", getTablePackageController);

module.exports = router;
