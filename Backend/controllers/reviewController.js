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

export const generateDocumentation = async (req, res) => {
  try {
    const { code } = req.body;  // Code jo user ne bheja hai

    if (!code.trim()) {
      return res.status(400).json({ error: "No code provided for documentation." });
    }

    // Gemini AI API se documentation generate karne ke liye prompt banaye
    const prompt = `
      You are a **JavaScript Documentation Generator**. Your task is to provide detailed and accurate documentation for the following JavaScript code.

      --- 

      Code:
      \`\`\`javascript
      ${code}
      \`\`\`

      --- 

      Please generate the documentation including:
      1. **Function descriptions**
      2. **Parameter explanations**
      3. **Return value descriptions**
      4. **Code flow and logic**
    `;

    // AI se documentation generate karna
    const documentation = await generateContent(prompt);

    // Response me generated documentation bhejna
    return res.json({ documentation });
  } catch (error) {
    console.error("AI Documentation Error:", error);
    return res.status(500).json({ error: "Failed to generate documentation." });
  }
};
