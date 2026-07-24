import { z } from "zod";

export const directorInputSchema = z.object({
  scene: z.any(),

  story: z.any(),
});

export const directorBatchSchema = z.object({
  inputs: z.array(directorInputSchema).min(1),
});

export const updateDirectorSchema = z.object({
  camera: z.any().optional(),

  lighting: z.any().optional(),

  environment: z.any().optional(),

  audio: z.any().optional(),

  motion: z.any().optional(),

  transition: z
    .enum([
      "Cut",
      "Fade",
      "Cross Fade",
      "Flash",
      "Whip",
      "Zoom",
    ])
    .optional(),

  notes: z.array(z.string()).optional(),
});

export type DirectorInputDTO =
  z.infer<typeof directorInputSchema>;

export type DirectorBatchDTO =
  z.infer<typeof directorBatchSchema>;

export type UpdateDirectorDTO =
  z.infer<typeof updateDirectorSchema>;