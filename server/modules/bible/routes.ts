import { Router } from "express";

import {
  createBibleController,
  getBiblesController,
  getBibleController,
  getBibleTypeController,
  updateBibleController,
  deleteBibleController,
  clearBiblesController,
} from "./controller.js";

const router = Router();

router.post("/", createBibleController);

router.get("/", getBiblesController);

router.get("/type/:type", getBibleTypeController);

router.get("/:id", getBibleController);

router.patch("/:id", updateBibleController);

router.delete("/:id", deleteBibleController);

router.delete("/", clearBiblesController);

export default router;