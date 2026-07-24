import { z } from "zod";

export const createBibleSchema = z.object({
  name: z.string().min(1),

  type: z.enum([
    "character",
    "environment",
    "style",
    "sound",
    "project",
  ]),

  description: z.string().optional(),
});

export const updateBibleSchema = z.object({
  name: z.string().optional(),

  description: z.string().optional(),

  references: z.array(z.any()).optional(),

  character: z.any().optional(),

  environment: z.any().optional(),

  style: z.any().optional(),

  sound: z.any().optional(),

  project: z.any().optional(),
});

export type CreateBibleInput =
  z.infer<typeof createBibleSchema>;

export type UpdateBibleInput =
  z.infer<typeof updateBibleSchema>;