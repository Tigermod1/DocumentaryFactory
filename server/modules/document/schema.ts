import { z } from "zod";

export const generateDocumentSchema = z.object({
  projectName: z
    .string()
    .trim()
    .min(1, "Project name is required"),

  style: z
    .string()
    .trim()
    .optional(),

  scenes: z
    .array(z.any())
    .min(1, "At least one scene is required"),
});

export const updateDocumentSchema = z.object({
  name: z.string().optional(),

  style: z.string().optional(),
});

export type GenerateDocumentInput = z.infer<
  typeof generateDocumentSchema
>;

export type UpdateDocumentInput = z.infer<
  typeof updateDocumentSchema
>;