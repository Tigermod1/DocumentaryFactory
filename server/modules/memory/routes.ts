import { Router } from "express";

import {
  getMemory,
  saveMemory,
} from "./controller.js";

export const memoryRouter = Router();

memoryRouter.get(
  "/:projectId",
  getMemory
);

memoryRouter.post(
  "/",
  saveMemory
);