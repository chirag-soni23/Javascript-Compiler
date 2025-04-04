import express from "express";
import {
  generateDocumentation,
  reviewCode,
  generateTitleFromCode,
} from "../controllers/reviewController.js";

const router = express.Router();

// Route for reviewing code
router.post("/review", reviewCode);

// Route for generating documentation
router.post("/generate-documentation", generateDocumentation);

// Route for generating title from code
router.post("/generate-title", async (req, res) => {
  try {
    const { code } = req.body;

    if (!code.trim()) {
      return res.status(400).json({ error: "No code provided for title generation." });
    }

    // Generate title based on the code
    const title = await generateTitleFromCode(code);

    return res.json({ title });
  } catch (error) {
    console.error("AI Title Generation Error:", error);
    return res.status(500).json({ error: "Failed to generate title." });
  }
});

export default router;
