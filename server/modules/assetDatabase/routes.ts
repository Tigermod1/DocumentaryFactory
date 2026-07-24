import { Router } from "express";
import { scanAssetsController } from "./controller.js";

const router = Router();

router.get(
    "/scan",
    scanAssetsController
);

export default router;