import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import reviewRoutes from "./routes/reviewRoutes.js";
import themeRoutes from "./routes/themeRoutes.js";
import codeRoutes from "./routes/codeRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", reviewRoutes);
app.use("/api", themeRoutes);
app.use("/api", codeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
