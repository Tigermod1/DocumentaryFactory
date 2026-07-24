import { Router } from "express";

import {
  getLibraryController,
  getCharactersController,
  getEnvironmentsController,
  createCharacterController,
  createEnvironmentController,
  deleteCharacterController,
  deleteEnvironmentController,
} from "./controller.js";

const router = Router();

router.get("/", getLibraryController);

router.get("/characters", getCharactersController);

router.get("/environments", getEnvironmentsController);

router.post("/characters", createCharacterController);

router.post("/environments", createEnvironmentController);

router.delete("/characters/:id", deleteCharacterController);

router.delete("/environments/:id", deleteEnvironmentController);

export default router;