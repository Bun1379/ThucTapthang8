const reviewModel = require('../model/review.model');
const mongoose = require('mongoose');
const createReviewService = async (data) => {
    try {
        const newReview = new reviewModel(data);
        await newReview.save();
        return newReview;
    } catch (error) {
        throw new Error("Error creating review: " + error.message);
    }
};

const updateReviewService = async (id, data) => {
    try {
        const updatedReview = await reviewModel.findByIdAndUpdate(id, data, { new: true });
        return updatedReview;
    } catch (error) {
        throw new Error("Error updating review: " + error.message);
    }
};

const deleteReviewService = async (id) => {
    try {
        await reviewModel.findByIdAndDelete(id);
    } catch (error) {
        throw new Error("Error deleting review: " + error.message);
    }
};

const getOverviewReviewByProductIdService = async (id) => {
    try {
        const productId = new mongoose.Types.ObjectId(id);
        // 1. Thống kê theo rating
        const ratingStatsAgg = await reviewModel.aggregate([
            { $match: { product: productId } },
            { $group: { _id: "$rating", count: { $sum: 1 } } }
        ]);
        const ratingStats = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        ratingStatsAgg.forEach(r => {
            ratingStats[r._id] = r.count;
        });

        // 2. Số lượng review có bình luận
        const commentCount = await reviewModel.countDocuments({
            product: productId,
            comment: { $exists: true, $ne: "" }
        });

        // 3. Số lượng review có ảnh/video
        const imageMediaCount = await reviewModel.countDocuments({
            product: productId,
            $or: [
                { images: { $exists: true, $ne: [] } },
                { medias: { $exists: true, $ne: [] } }
            ]
        });

        // 4. Trung bình rating
        const avgResult = await reviewModel.aggregate([
            { $match: { product: productId } },
            { $group: { _id: null, avgRating: { $avg: "$rating" } } }
        ]);
        const avgRating = avgResult.length > 0 ? avgResult[0].avgRating : 0;

        return {
            ratingStats,
            commentCount,
            imageMediaCount,
            avgRating
        };
    } catch (error) {
        throw new Error("Error fetching reviews by product ID: " + error.message);
    }
};

const getReviewByProductIdService = async (productId, filterType, rating, page, limit, sort) => {
    try {

        const objProductId = new mongoose.Types.ObjectId(productId);

        let query = { product: objProductId };

        switch (filterType) {
            case "rating":
                if (rating) {
                    query.rating = Number(rating);
                }
                break;

            case "comment":
                query.comment = { $exists: true, $ne: "" };
                break;

            case "media":
                query.$or = [
                    { images: { $exists: true, $ne: [] } },
                    { medias: { $exists: true, $ne: [] } }
                ];
                break;

            default:
                break;
        }

        const reviews = await reviewModel
            .find(query)
            .sort(sort || { createdAt: -1 })
            .skip(((page || 1) - 1) * (limit || 10))
            .limit(limit || 10)
            .populate("user", "name avatar")
        return reviews;
    } catch (error) {
        throw new Error("Error fetching reviews: " + error.message);
    }
};

module.exports = {
    createReviewService,
    updateReviewService,
    deleteReviewService,
    getOverviewReviewByProductIdService,
    getReviewByProductIdService
};
