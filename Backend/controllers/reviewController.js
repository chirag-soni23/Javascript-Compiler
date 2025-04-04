import generateContent from "../services/ai.service.js";

const handleAIResponse = async (prompt, fallbackMessage) => {
  try {
    const response = await generateContent(prompt);
    return response?.trim() || fallbackMessage;
  } catch (error) {
    console.error("AI Processing Error:", error);
    return fallbackMessage;
  }
};

export const reviewCode = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt?.trim()) {
    return res.status(400).json({ error: "No prompt provided for review." });
  }

  const review = await handleAIResponse(prompt, "Error: Unable to fetch AI review.");
  return res.json({ review });
};

export const generateDocumentation = async (req, res) => {
  const { code } = req.body;

  if (!code?.trim()) {
    return res.status(400).json({ error: "No code provided for documentation." });
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

  const documentation = await handleAIResponse(prompt, "Error: Failed to generate documentation.");
  return res.json({ documentation });
};

export const generateTitleFromCode = async (code) => {
  if (!code?.trim()) return "Untitled Code";

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

  return await handleAIResponse(prompt, "Untitled Code");
};
