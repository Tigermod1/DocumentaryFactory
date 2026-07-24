import { z } from "zod";

export const analyzeStorySchema = z.object({
  sceneId: z.string().min(1),

  narration: z.string().min(1),
});

export const analyzeStoriesSchema = z.object({
  stories: z.array(analyzeStorySchema).min(1),
});

export const updateStorySchema = z.object({
  emotion: z
    .enum([
      "neutral",
      "curiosity",
      "tension",
      "fear",
      "hope",
      "sadness",
      "victory",
      "mystery",
    ])
    .optional(),

  pacing: z
    .enum([
      "slow",
      "medium",
      "fast",
    ])
    .optional(),

  intensity: z
    .number()
    .min(0)
    .max(100)
    .optional(),

  keywords: z.array(z.string()).optional(),

  characters: z.array(z.string()).optional(),

  environments: z.array(z.string()).optional(),

  props: z.array(z.string()).optional(),

  sounds: z.array(z.string()).optional(),

  ambience: z.array(z.string()).optional(),

  cameraStyle: z.string().optional(),

  transition: z.string().optional(),

  musicMood: z.string().optional(),

  notes: z.array(z.string()).optional(),
});

export type AnalyzeStoryInput = z.infer<
  typeof analyzeStorySchema
>;

export type AnalyzeStoriesInput = z.infer<
  typeof analyzeStoriesSchema
>;

export type UpdateStoryInput = z.infer<
  typeof updateStorySchema
>;