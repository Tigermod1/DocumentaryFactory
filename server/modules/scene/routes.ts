import { Router } from "express";

import {
  analyzeScenesController,
  createScenesController,
  getScenesController,
  getSceneController,
  updateSceneController,
  deleteSceneController,
  clearScenesController,
} from "./controller.js";

const router = Router();

router.post("/analyze", analyzeScenesController);

router.post("/", createScenesController);

router.get("/", getScenesController);

router.get("/:id", getSceneController);

router.patch("/:id", updateSceneController);

router.delete("/:id", deleteSceneController);

router.delete("/", clearScenesController);

export default router;