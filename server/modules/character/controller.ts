import type { Request, Response } from "express";

import { createCharacterSchema } from "./schema.js";
import { createCharacter } from "./service.js";

export function createCharacterController(
  req: Request,
  res: Response
): void {
  const input = createCharacterSchema.parse(req.body);

  const character = createCharacter(input);

  res.status(201).json(character);
}