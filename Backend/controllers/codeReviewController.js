import CodeReview from "../models/codeReview.js";

// Save Code Review
export const saveCodeReview = async (req, res) => {
  try {
    const { code, review } = req.body;
    const newReview = new CodeReview({ code, review });
    await newReview.save();
    res.status(201).json({ message: "Code saved successfully", newReview });
  } catch (error) {
    res.status(500).json({ error: "Failed to save code" });
  }
};

// Get All Saved Codes
export const getAllCodeReviews = async (req, res) => {
  try {
    const reviews = await CodeReview.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch code reviews" });
  }
};

// Edit (Update) Code Review
export const updateCodeReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, review } = req.body;

    const updatedReview = await CodeReview.findByIdAndUpdate(
      id,
      { code, review },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ error: "Code review not found" });
    }

    res
      .status(200)
      .json({ message: "Code updated successfully", updatedReview });
  } catch (error) {
    res.status(500).json({ error: "Failed to update code" });
  }
};

// Delete Code Review
export const deleteCodeReview = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedReview = await CodeReview.findByIdAndDelete(id);

    if (!deletedReview) {
      return res.status(404).json({ error: "Code review not found" });
    }

    res.status(200).json({ message: "Code deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete code" });
  }
};
