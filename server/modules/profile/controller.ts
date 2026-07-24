import type {
  Request,
  Response,
} from "express";

import {
  createProfile,
  getProfile,
  resetProfile,
  updateProfile,
} from "./service.js";

import {
  profileSchema,
  updateProfileSchema,
} from "./schema.js";

export function getProfileController(
  _req: Request,
  res: Response
): void {
  res.json(getProfile());
}

export function createProfileController(
  req: Request,
  res: Response
): void {
  const input = profileSchema.parse(
    req.body
  );

  const profile =
    createProfile(input);

  res.status(201).json(profile);
}

export function updateProfileController(
  req: Request,
  res: Response
): void {
  const input =
    updateProfileSchema.parse(
      req.body
    );

  const profile =
    updateProfile(input);

  res.json(profile);
}

export function resetProfileController(
  _req: Request,
  res: Response
): void {
  const profile =
    resetProfile();

  res.json(profile);
}