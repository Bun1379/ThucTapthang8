const {
    createSuggestQuestionService,
    updateSuggestQuestionService,
    deleteSuggestQuestionService,
    getSuggestQuestionsBySellerId
} = require('../service/suggest.question.service');

const createSuggestQuestionController = async (req, res) => {
    try {
        const suggestQuestion = await createSuggestQuestionService(req.body);
        return res.status(200).json({
            status: 200,
            message: "Create Suggest Question successfully",
            data: suggestQuestion,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }
};

const updateSuggestQuestionController = async (req, res) => {
    try {
        const { id, data } = req.body;
        const suggestQuestion = await updateSuggestQuestionService(id, data);
        return res.status(200).json({
            status: 200,
            message: "Update Suggest Question successfully",
            data: suggestQuestion,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }
};

const deleteSuggestQuestionController = async (req, res) => {
    try {
        const { id } = req.body;
        const suggestQuestion = await deleteSuggestQuestionService(id);
        return res.status(200).json({
            status: 200,
            message: "Delete Suggest Question successfully",
            data: suggestQuestion,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }
};

const getSuggestQuestionsBySellerIdController = async (req, res) => {
    try {
        const { id, seller_type } = req.body;
        const suggestQuestions = await getSuggestQuestionsBySellerId(seller_type, seller_id);
        return res.status(200).json({
            status: 200,
            message: "Get Suggest Questions by Seller ID successfully",
            data: suggestQuestions,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }
}

module.exports = {
    createSuggestQuestionController,
    updateSuggestQuestionController,
    deleteSuggestQuestionController,
    getSuggestQuestionsBySellerIdController
};
