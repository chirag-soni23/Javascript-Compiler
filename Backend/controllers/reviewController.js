import generateContent from "../services/ai.service.js";

export const reviewCode = async (req, res) => {
  try {
    const { prompt } = req.body; // Now accepting `prompt` instead of `code`

    if (!prompt) {
      return res.status(400).json({ error: "No prompt provided for review." });
    }

    const review = await generateContent(prompt);

    return res.json({ review });
  } catch (error) {
    console.error("AI Review Error:", error);
    return res.status(500).json({ error: "Failed to generate AI review." });
  }
};
