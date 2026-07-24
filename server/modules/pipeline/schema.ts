import { z } from "zod";

export const createPipelineSchema = z.object({
  name: z.string().min(1),

  projectId: z.string().min(1),
});

export const updatePipelineStageSchema = z.object({
  stage: z.enum([
    "project",
    "timeline",
    "scene",
    "story",
    "director",
    "character",
    "environment",
    "prop",
    "camera",
    "lighting",
    "weather",
    "motion",
    "sound",
    "music",
    "prompt",
    "render",
    "subtitle",
    "export",
  ]),

  status: z.enum([
    "pending",
    "running",
    "completed",
    "failed",
    "skipped",
  ]),
});

export type CreatePipelineInput =
  z.infer<typeof createPipelineSchema>;

export type UpdatePipelineStageInput =
  z.infer<typeof updatePipelineStageSchema>;