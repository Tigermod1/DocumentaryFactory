import type { Request, Response } from "express";

import {
  createPipelineSchema,
  updatePipelineStageSchema,
} from "./schema.js";

import {
  createPipeline,
  getPipelines,
  getPipeline,
  getPipelineReport,
  updatePipelineStage,
  deletePipeline,
  clearPipelines,
} from "./service.js";

export function createPipelineController(
  req: Request,
  res: Response
): void {
  const input = createPipelineSchema.parse(req.body);

  const pipeline = createPipeline(input);

  res.status(201).json(pipeline);
}

export function getPipelinesController(
  _req: Request,
  res: Response
): void {
  res.json(getPipelines());
}

export function getPipelineController(
  req: Request,
  res: Response
): void {
  const pipeline = getPipeline(req.params.id);

  if (!pipeline) {
    res.status(404).json({
      message: "Pipeline not found",
    });

    return;
  }

  res.json(pipeline);
}

export function getPipelineReportController(
  req: Request,
  res: Response
): void {
  const report = getPipelineReport(req.params.id);

  if (!report) {
    res.status(404).json({
      message: "Pipeline not found",
    });

    return;
  }

  res.json(report);
}

export function updatePipelineStageController(
  req: Request,
  res: Response
): void {
  const input = updatePipelineStageSchema.parse(req.body);

  const pipeline = updatePipelineStage(
    req.params.id,
    input.stage,
    input.status
  );

  if (!pipeline) {
    res.status(404).json({
      message: "Pipeline not found",
    });

    return;
  }

  res.json(pipeline);
}

export function deletePipelineController(
  req: Request,
  res: Response
): void {
  const ok = deletePipeline(req.params.id);

  if (!ok) {
    res.status(404).json({
      message: "Pipeline not found",
    });

    return;
  }

  res.status(204).send();
}

export function clearPipelinesController(
  _req: Request,
  res: Response
): void {
  clearPipelines();

  res.status(204).send();
}