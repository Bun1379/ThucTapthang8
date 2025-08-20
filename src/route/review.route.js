const express = require("express");
const {
    createReviewController,
    updateReviewController,
    deleteReviewController,
    getOverviewReviewByProductIdController,
    getReviewByProductIdController,
    getReviewBySellerIdController
} = require("../controller/review.controller");

const routerAPI = express.Router();

routerAPI.post("/", createReviewController);
routerAPI.post("/update", updateReviewController);
routerAPI.post("/delete", deleteReviewController);
routerAPI.post("/overviewByProductId", getOverviewReviewByProductIdController);
routerAPI.post("/getByProductId", getReviewByProductIdController);
routerAPI.post("/getBySellerId", getReviewBySellerIdController);

module.exports = routerAPI;
