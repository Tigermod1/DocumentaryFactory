import { Router } from "express";

import {
  createPipelineController,
  getPipelinesController,
  getPipelineController,
  getPipelineReportController,
  updatePipelineStageController,
  deletePipelineController,
  clearPipelinesController,
} from "./controller.js";

const router = Router();

router.post("/", createPipelineController);

router.get("/", getPipelinesController);

router.get("/:id", getPipelineController);

router.get("/:id/report", getPipelineReportController);

router.patch("/:id/stage", updatePipelineStageController);

router.delete("/:id", deletePipelineController);

router.delete("/", clearPipelinesController);

export default router;