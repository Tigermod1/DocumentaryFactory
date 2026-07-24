import { Router } from "express";

import {
  startProduction,
  getProductionJob,
  getProductionQueue,
  cancelProductionJob,
} from "./controller.js";

const router = Router();

router.post("/start", startProduction);

router.get("/queue", getProductionQueue);

router.get("/:id", getProductionJob);

router.delete("/:id", cancelProductionJob);

export default router;