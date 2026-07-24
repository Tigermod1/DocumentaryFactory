import express from "express";

import { runRenderPipeline } from "./pipeline.js";
import type { RenderProject } from "./types.js";

export const renderRouter = express.Router();

renderRouter.post("/", async (req, res) => {
  try {
    const project = req.body as RenderProject;

    const result = await runRenderPipeline(project);

    res.json(result);
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : "Render failed",
    });
  }
});