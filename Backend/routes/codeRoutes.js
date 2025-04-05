import express from "express";
import {
  updateCodeReview,
  deleteCodeReview,
  saveCodeReview,
  getAllCodeReviews,
} from "../controllers/codeReviewController.js";

const router = express.Router();

router.post("/save-code", saveCodeReview);
router.get("/saved-codes", getAllCodeReviews);
router.put("/code-review/:id", updateCodeReview);
router.delete("/delete-code-review/:id", deleteCodeReview);

export default router;
