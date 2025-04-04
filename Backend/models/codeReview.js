import mongoose from "mongoose";

const CodeReviewSchema = new mongoose.Schema({
  code: { type: String, required: true },
  review: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const CodeReview = mongoose.model("CodeReview", CodeReviewSchema);

export default CodeReview;
