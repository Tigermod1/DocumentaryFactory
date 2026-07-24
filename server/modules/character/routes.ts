import { Router } from "express";

import { createCharacterController } from "./controller.js";

const router = Router();

router.post("/", createCharacterController);

export default router;