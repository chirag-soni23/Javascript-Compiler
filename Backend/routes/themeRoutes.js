import express from "express";
import { getTheme, updateTheme } from "../controllers/themeController.js";

const router = express.Router();

router.get("/get-theme", getTheme);
router.post("/set-theme", updateTheme);

export default router;
