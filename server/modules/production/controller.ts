import type { Request, Response } from "express";

import { productionService } from "./service.js";
import { createProductionRunner } from "./runner.js";
import { parseProduceRequest } from "./parser.js";

export async function startProduction(
  req: Request,
  res: Response
) {
  try {
    const request = parseProduceRequest(req.body);

    const job = productionService.create(request);

    const runner = createProductionRunner();

    await runner.run(request, job);

    res.json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unknown error",
    });
  }
}

export function getProductionJob(
  req: Request,
  res: Response
) {
  const job = productionService.get(req.params.id);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found.",
    });
  }

  return res.json({
    success: true,
    job,
  });
}

export function getProductionQueue(
  _req: Request,
  res: Response
) {
  return res.json({
    success: true,
    jobs: productionService.getAll(),
  });
}

export function cancelProductionJob(
  req: Request,
  res: Response
) {
  const removed = productionService.remove(req.params.id);

  return res.json({
    success: removed,
  });
}