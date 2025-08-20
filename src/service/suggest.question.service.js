const SuggestQuestionModel = require('../model/suggest.question.model');

const createSuggestQuestionService = async (data) => {
    const suggestQuestion = new SuggestQuestionModel(data);
    await suggestQuestion.save();
    return suggestQuestion;
};

const updateSuggestQuestionService = async (id, data) => {
    return await SuggestQuestionModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteSuggestQuestionService = async (id) => {
    return await SuggestQuestionModel.findByIdAndDelete(id);
};

const getSuggestQuestionsBySellerId = async (sellerType, sellerId) => {
    return await SuggestQuestionModel.find({ seller: sellerId, seller_type: sellerType });
};

module.exports = {
    createSuggestQuestionService,
    updateSuggestQuestionService,
    deleteSuggestQuestionService,
    getSuggestQuestionsBySellerId
};
