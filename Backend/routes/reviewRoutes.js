import express from "express";
import { generateDocumentation, reviewCode } from "../controllers/reviewController.js";

const router = express.Router();

router.post("/review", reviewCode);
router.post("/generate-documentation", generateDocumentation);


export default router;
