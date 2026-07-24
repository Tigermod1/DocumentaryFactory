import type { Request, Response } from "express";

import {
  createScenesSchema,
  updateSceneSchema,
} from "./schema.js";

import {
  analyzeScenes,
  createScenes,
  getScenes,
  getScene,
  updateScene,
  deleteScene,
  clearScenes,
} from "./service.js";

export function analyzeScenesController(
  req: Request,
  res: Response
): void {
  const input = createScenesSchema.parse(req.body);

  const result = analyzeScenes(input.scenes);

  res.json(result);
}

export function createScenesController(
  req: Request,
  res: Response
): void {
  const input = createScenesSchema.parse(req.body);

  const scenes = createScenes(input.scenes);

  res.status(201).json(scenes);
}

export function getScenesController(
  _req: Request,
  res: Response
): void {
  res.json(getScenes());
}

export function getSceneController(
  req: Request,
  res: Response
): void {
  const scene = getScene(req.params.id);

  if (!scene) {
    res.status(404).json({
      message: "Scene not found",
    });
    return;
  }

  res.json(scene);
}

export function updateSceneController(
  req: Request,
  res: Response
): void {
  const input = updateSceneSchema.parse(req.body);

  const scene = updateScene(req.params.id, input);

  if (!scene) {
    res.status(404).json({
      message: "Scene not found",
    });
    return;
  }

  res.json(scene);
}

export function deleteSceneController(
  req: Request,
  res: Response
): void {
  const ok = deleteScene(req.params.id);

  if (!ok) {
    res.status(404).json({
      message: "Scene not found",
    });
    return;
  }

  res.status(204).send();
}

export function clearScenesController(
  _req: Request,
  res: Response
): void {
  clearScenes();

  res.status(204).send();
}