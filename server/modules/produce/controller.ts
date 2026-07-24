import express from "express";

import { produceService } from "./service.js";
import type { ProduceRequest } from "./types.js";

export const produceRouter = express.Router();

produceRouter.post("/", async (req, res) => {
  try {
    const request = req.body as ProduceRequest;

    const result = await produceService.produce(request);

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Produce failed",
    });
  }
});

produceRouter.get("/health", (_req, res) => {
  res.json({
    success: true,
    service: "Produce Engine",
    status: "ready",
  });
});