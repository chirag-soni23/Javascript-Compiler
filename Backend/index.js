import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import reviewRoutes from "./routes/reviewRoutes.js";
import themeRoutes from "./routes/themeRoutes.js";
import codeRoutes from "./routes/codeRoutes.js";
import { connectDB } from "./config/db.js";
import bodyParser from "body-parser";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/api/review", reviewRoutes);
app.use("/api/theme", themeRoutes);
app.use("/api/codes", codeRoutes);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/Frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
