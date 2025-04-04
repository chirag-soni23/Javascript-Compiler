import CodeReview from "../models/codeReview.js";

// Code Save Karna
export const saveCode = async (req, res) => {
  try {
    const { code, review } = req.body;
    const newCodeReview = new CodeReview({ code, review });
    await newCodeReview.save();
    res.status(201).json({ message: "Code saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Saved Codes Fetch Karna
export const getSavedCodes = async (req, res) => {
  try {
    const codes = await CodeReview.find().sort({ createdAt: -1 });
    res.json(codes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
