import type { Request, Response } from "express";

import {
  createCharacterSchema,
  createEnvironmentSchema,
  deleteAssetSchema,
} from "./schema.js";

import {
  listLibrary,
  listCharacters,
  listEnvironments,
  createCharacter,
  createEnvironment,
  deleteCharacter,
  deleteEnvironment,
} from "./service.js";

export function getLibraryController(
  _req: Request,
  res: Response
): void {
  res.json(listLibrary());
}

export function getCharactersController(
  _req: Request,
  res: Response
): void {
  res.json(listCharacters());
}

export function getEnvironmentsController(
  _req: Request,
  res: Response
): void {
  res.json(listEnvironments());
}

export function createCharacterController(
  req: Request,
  res: Response
): void {
  const input = createCharacterSchema.parse(req.body);

  const character = createCharacter(input);

  res.status(201).json(character);
}

export function createEnvironmentController(
  req: Request,
  res: Response
): void {
  const input = createEnvironmentSchema.parse(req.body);

  const environment = createEnvironment(input);

  res.status(201).json(environment);
}

export function deleteCharacterController(
  req: Request,
  res: Response
): void {
  const { id } = deleteAssetSchema.parse(req.params);

  deleteCharacter(id);

  res.status(204).send();
}

export function deleteEnvironmentController(
  req: Request,
  res: Response
): void {
  const { id } = deleteAssetSchema.parse(req.params);

  deleteEnvironment(id);

  res.status(204).send();
}