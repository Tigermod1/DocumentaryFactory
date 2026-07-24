import { Router } from "express";

import {
  generateDocumentController,
  getDocumentsController,
  getDocumentController,
  getDocumentSummaryController,
  deleteDocumentController,
  clearDocumentsController,
} from "./controller.js";

const router = Router();

router.post("/", generateDocumentController);

router.get("/", getDocumentsController);

router.get("/:id", getDocumentController);

router.get("/:id/summary", getDocumentSummaryController);

router.delete("/:id", deleteDocumentController);

router.delete("/", clearDocumentsController);

export default router;