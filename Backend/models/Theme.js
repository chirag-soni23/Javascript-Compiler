import mongoose from "mongoose";

const ThemeSchema = new mongoose.Schema({
  theme: {
    type: String,
    required: true,
    enum: ["vs-dark", "light", "hc-black"],
  },
});

export default mongoose.model("Theme", ThemeSchema);
