import express from "express";

import { runImagePipeline } from "./pipeline.js";
import type { ImageRequest } from "./types.js";

export const imageRouter = express.Router();

imageRouter.post("/", async (req, res) => {
  try {
    const request = req.body as ImageRequest;

    const result = await runImagePipeline(request);

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Image generation failed",
    });
  }
});