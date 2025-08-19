const {
    createReviewService,
    updateReviewService,
    deleteReviewService,
    getOverviewReviewByProductIdService,
    getReviewByProductIdService
} = require("../service/review.service");

const createReviewController = async (req, res) => {
    try {
        const newReview = await createReviewService(req.body);
        return res.status(200).json({
            status: 200,
            message: "Create review successfully",
            data: newReview,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }
};

const updateReviewController = async (req, res) => {
    try {
        const { id, data } = req.body;
        const updatedReview = await updateReviewService(id, data);
        return res.status(200).json({
            status: 200,
            message: "Update review successfully",
            data: updatedReview,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }
};

const deleteReviewController = async (req, res) => {
    try {
        const { id } = req.body;
        await deleteReviewService(id);
        return res.status(200).json({
            status: 200,
            message: "Delete review successfully",
            data: null
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }
};

const getOverviewReviewByProductIdController = async (req, res) => {
    try {
        const { productId } = req.body;
        const overview = await getOverviewReviewByProductIdService(productId);
        return res.status(200).json({
            status: 200,
            message: "Get overview review by product ID successfully",
            data: overview,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }
};

const getReviewByProductIdController = async (req, res) => {
    try {
        const { productId } = req.body;
        const reviews = await getReviewByProductIdService(productId);
        return res.status(200).json({
            status: 200,
            message: "Get review by product ID successfully",
            data: reviews,
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
    createReviewController,
    updateReviewController,
    deleteReviewController,
    getOverviewReviewByProductIdController,
    getReviewByProductIdController
};
