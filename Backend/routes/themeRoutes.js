import express from "express";
import { getTheme, updateTheme } from "../controllers/themeController.js";

const router = express.Router();

router.get("/theme", getTheme);
router.post("/theme", updateTheme);

export default router;
