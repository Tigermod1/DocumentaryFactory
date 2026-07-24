import { Router } from "express";

import {
  analyzeDirectorController,
  createDirectorPlanController,
  getDirectorPlansController,
  getDirectorPlanController,
  updateDirectorPlanController,
  deleteDirectorPlanController,
  clearDirectorPlansController,
} from "./controller.js";

const router = Router();

router.post("/analyze", analyzeDirectorController);

router.post("/", createDirectorPlanController);

router.get("/", getDirectorPlansController);

router.get("/:id", getDirectorPlanController);

router.patch("/:id", updateDirectorPlanController);

router.delete("/:id", deleteDirectorPlanController);

router.delete("/", clearDirectorPlansController);

export default router;