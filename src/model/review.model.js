const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    product_variant: {
      type: String,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    product_quality: {
      type: String,
    },
    impressive_feature: {
      type: String,
    },
    images: { type: [String], default: [] },
    medias: { type: [String], default: [] },
    comment: {
      type: String,
      minlength: 10,
      maxlength: 500,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    sellerReply: {
      type: String,
      minlength: 10,
      maxlength: 500,
    },
  },
);
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
