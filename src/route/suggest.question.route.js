const express = require("express");
const {
    createSuggestQuestionController,
    updateSuggestQuestionController,
    deleteSuggestQuestionController,
    getSuggestQuestionsBySellerIdController
} = require("../controller/suggest.question.controller");

const router = express.Router();

router.post("/", createSuggestQuestionController);
router.post("/update", updateSuggestQuestionController);
router.post("/delete", deleteSuggestQuestionController);
router.post("/getBySellerId", getSuggestQuestionsBySellerIdController);

module.exports = router;
