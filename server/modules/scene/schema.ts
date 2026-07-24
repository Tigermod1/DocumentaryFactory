import { z } from "zod";

export const createSceneSchema = z.object({
  title: z.string().min(1),

  narration: z.string().min(1),

  start: z.number().min(0),

  end: z.number().gt(0),

  characterId: z.string().optional(),

  environmentId: z.string().optional(),

  propIds: z.array(z.string()).default([]),

  soundIds: z.array(z.string()).default([]),

  musicId: z.string().optional(),
});

export const createScenesSchema = z.object({
  scenes: z.array(createSceneSchema).min(1),
});

export const updateSceneSchema = z.object({
  title: z.string().optional(),

  narration: z.string().optional(),

  type: z
    .enum([
      "intro",
      "dialogue",
      "action",
      "transition",
      "ending",
    ])
    .optional(),

  prompt: z.string().optional(),

  notes: z.string().optional(),
});

export type CreateSceneInput =
  z.infer<typeof createSceneSchema>;

export type CreateScenesInput =
  z.infer<typeof createScenesSchema>;

export type UpdateSceneInput =
  z.infer<typeof updateSceneSchema>;