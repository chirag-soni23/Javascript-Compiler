import express from "express";
import { saveCode, getSavedCodes } from "../controllers/codeReviewController.js";

const router = express.Router();

router.post("/save-code", saveCode);
router.get("/saved-codes", getSavedCodes);

export default router;
