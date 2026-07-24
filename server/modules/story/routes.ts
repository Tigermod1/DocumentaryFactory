import { Router } from "express";

import {
  analyzeStoriesController,
  createStoriesController,
  getStoriesController,
  getStoryController,
  updateStoryController,
  deleteStoryController,
  clearStoriesController,
} from "./controller.js";

const router = Router();

router.post("/analyze", analyzeStoriesController);

router.post("/", createStoriesController);

router.get("/", getStoriesController);

router.get("/:id", getStoryController);

router.patch("/:id", updateStoryController);

router.delete("/:id", deleteStoryController);

router.delete("/", clearStoriesController);

export default router;