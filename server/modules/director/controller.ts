import type { Request, Response } from "express";

import {
  directorBatchSchema,
  updateDirectorSchema,
} from "./schema.js";

import {
  analyzeDirector,
  createDirectorPlan,
  getDirectorPlans,
  getDirectorPlan,
  updateDirectorPlan,
  deleteDirectorPlan,
  clearDirectorPlans,
} from "./service.js";

export function analyzeDirectorController(
  req: Request,
  res: Response
): void {
  const input = directorBatchSchema.parse(req.body);

  const report = analyzeDirector(input.inputs);

  res.json(report);
}

export function createDirectorPlanController(
  req: Request,
  res: Response
): void {
  const input = directorBatchSchema.parse(req.body);

  const plans = createDirectorPlan(input.inputs);

  res.status(201).json(plans);
}

export function getDirectorPlansController(
  _req: Request,
  res: Response
): void {
  res.json(getDirectorPlans());
}

export function getDirectorPlanController(
  req: Request,
  res: Response
): void {
  const plan = getDirectorPlan(req.params.id);

  if (!plan) {
    res.status(404).json({
      message: "Director plan not found",
    });

    return;
  }

  res.json(plan);
}

export function updateDirectorPlanController(
  req: Request,
  res: Response
): void {
  const input = updateDirectorSchema.parse(req.body);

  const plan = updateDirectorPlan(
    req.params.id,
    input
  );

  if (!plan) {
    res.status(404).json({
      message: "Director plan not found",
    });

    return;
  }

  res.json(plan);
}

export function deleteDirectorPlanController(
  req: Request,
  res: Response
): void {
  const ok = deleteDirectorPlan(req.params.id);

  if (!ok) {
    res.status(404).json({
      message: "Director plan not found",
    });

    return;
  }

  res.status(204).send();
}

export function clearDirectorPlansController(
  _req: Request,
  res: Response
): void {
  clearDirectorPlans();

  res.status(204).send();
}