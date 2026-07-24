import type { Request, Response } from "express";

import {
  createBibleSchema,
  updateBibleSchema,
} from "./schema.js";

import {
  createBible,
  getBibles,
  getBible,
  updateBible,
  deleteBible,
  clearBibles,
  getBiblesByType,
} from "./service.js";

export function createBibleController(
  req: Request,
  res: Response
): void {
  const input = createBibleSchema.parse(req.body);

  const bible = createBible(input);

  res.status(201).json(bible);
}

export function getBiblesController(
  _req: Request,
  res: Response
): void {
  res.json(getBibles());
}

export function getBibleController(
  req: Request,
  res: Response
): void {
  const bible = getBible(req.params.id);

  if (!bible) {
    res.status(404).json({
      message: "Bible not found",
    });

    return;
  }

  res.json(bible);
}

export function getBibleTypeController(
  req: Request,
  res: Response
): void {
  const type = req.params.type as
    | "character"
    | "environment"
    | "style"
    | "sound"
    | "project";

  res.json(getBiblesByType(type));
}

export function updateBibleController(
  req: Request,
  res: Response
): void {
  const input = updateBibleSchema.parse(req.body);

  const bible = updateBible(
    req.params.id,
    input
  );

  if (!bible) {
    res.status(404).json({
      message: "Bible not found",
    });

    return;
  }

  res.json(bible);
}

export function deleteBibleController(
  req: Request,
  res: Response
): void {
  const ok = deleteBible(req.params.id);

  if (!ok) {
    res.status(404).json({
      message: "Bible not found",
    });

    return;
  }

  res.status(204).send();
}

export function clearBiblesController(
  _req: Request,
  res: Response
): void {
  clearBibles();

  res.status(204).send();
}