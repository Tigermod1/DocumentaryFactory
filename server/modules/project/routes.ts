import { Router } from "express";

import { createProjectController } from "./controller.js";

const router = Router();

router.post("/", createProjectController);

// TODO
// router.get("/", listProjectsController);

// TODO
// router.get("/:id", getProjectController);

export default router;