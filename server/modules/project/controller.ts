import type { Request, Response } from "express";

import { createProjectSchema } from "./schema.js";
import { createProject } from "./service.js";

export function createProjectController(
  req: Request,
  res: Response
): void {
  const input = createProjectSchema.parse(req.body);

  const project = createProject(
    input.name,
    input.script,
    input.subtitle,
    input.audio
  );

  res.status(201).json(project);
}