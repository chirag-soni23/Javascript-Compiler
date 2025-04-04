import generateContent from "../services/ai.service.js";

// Review the provided code by sending it to the AI model for analysis
export const reviewCode = async (req, res) => {
  try {
    const { prompt } = req.body;

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

// Generate documentation for the provided JavaScript code
export const generateDocumentation = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code.trim()) {
      return res
        .status(400)
        .json({ error: "No code provided for documentation." });
    }

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

    const documentation = await generateContent(prompt);

    return res.json({ documentation });
  } catch (error) {
    console.error("AI Documentation Error:", error);
    return res.status(500).json({ error: "Failed to generate documentation." });
  }
};

export const generateTitleFromCode = async (code) => {
  const prompt = `
    You are a **JavaScript Code Title Generator**. Your task is to generate a brief, descriptive title for the following JavaScript code:

    ---
    Code:
    \`\`\`javascript
    ${code}
    \`\`\`

    ---

    Please provide a title that briefly describes the purpose or functionality of the code.
  `;

  try {
    const title = await generateContent(prompt);
    return title.trim(); // Clean up the response
  } catch (error) {
    console.error("Error generating title:", error);
    return "Untitled Code"; // Fallback in case of error
  }
};
