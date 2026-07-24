import type { Request, Response } from "express";

import { generateDocumentSchema } from "./schema.js";

import {
  generateDocument,
  getDocuments,
  getDocument,
  deleteDocument,
  clearDocuments,
  getDocumentSummary,
} from "./service.js";

export function generateDocumentController(
  req: Request,
  res: Response
): void {
  const input = generateDocumentSchema.parse(req.body);

  const document = generateDocument(input);

  res.status(201).json(document);
}

export function getDocumentsController(
  _req: Request,
  res: Response
): void {
  res.json(getDocuments());
}

export function getDocumentController(
  req: Request,
  res: Response
): void {
  const document = getDocument(req.params.id);

  if (!document) {
    res.status(404).json({
      message: "Document not found",
    });

    return;
  }

  res.json(document);
}

export function getDocumentSummaryController(
  req: Request,
  res: Response
): void {
  const document = getDocument(req.params.id);

  if (!document) {
    res.status(404).json({
      message: "Document not found",
    });

    return;
  }

  res.json(getDocumentSummary(document));
}

export function deleteDocumentController(
  req: Request,
  res: Response
): void {
  const ok = deleteDocument(req.params.id);

  if (!ok) {
    res.status(404).json({
      message: "Document not found",
    });

    return;
  }

  res.status(204).send();
}

export function clearDocumentsController(
  _req: Request,
  res: Response
): void {
  clearDocuments();

  res.status(204).send();
}