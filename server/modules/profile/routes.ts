import { Router } from "express";

import {
  getProfileController,
  createProfileController,
  updateProfileController,
  resetProfileController,
} from "./controller.js";

const router = Router();

router.get("/", getProfileController);

router.post("/", createProfileController);

router.put("/", updateProfileController);

router.patch("/", updateProfileController);

router.post("/reset", resetProfileController);

export default router;