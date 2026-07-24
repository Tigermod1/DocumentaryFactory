import type { Request, Response } from "express";

import { memoryService } from "./service.js";

export async function getMemory(
  req: Request,
  res: Response
) {
  try {
    const memory = await memoryService.get(
      req.params.projectId
    );

    res.json({
      success: true,
      memory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unknown error",
    });
  }
}

export async function saveMemory(
  req: Request,
  res: Response
) {
  try {
    await memoryService.save(req.body);

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unknown error",
    });
  }
}