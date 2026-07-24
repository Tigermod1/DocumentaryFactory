import { Router } from "express";
import { parseSRTController } from "./controller.js";

const router = Router();

router.post("/upload", parseSRTController);

export default router;