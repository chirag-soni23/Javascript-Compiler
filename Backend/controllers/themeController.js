import Theme from "../models/Theme.js";

// Get the theme
export const getTheme = async (req, res) => {
  try {
    const theme = await Theme.findOne().sort({ _id: -1 });
    res.json({ theme: theme?.theme || "vs-dark" });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch theme" });
  }
};

// Update theme
export const updateTheme = async (req, res) => {
  try {
    const { theme } = req.body;
    if (!["vs-dark", "light", "hc-black"].includes(theme)) {
      return res.status(400).json({ error: "Invalid theme" });
    }

    await Theme.deleteMany();
    const newTheme = new Theme({ theme });
    await newTheme.save();

    res.json({ message: "Theme updated successfully", theme });
  } catch (error) {
    res.status(500).json({ error: "Failed to update theme" });
  }
};
