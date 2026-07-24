import { z } from "zod";

export const productionStatusSchema = z.enum([
  "queued",
  "running",
  "completed",
  "failed",
]);

export const productionStageSchema = z.enum([
  "createProject",
  "saveScript",
  "generateTimeline",
  "documentaryBrain",
  "promptComposer",
  "packageBuilder",
]);

export const productionOptionsSchema = z.object({
  generateImages: z.boolean().default(false),

  generateVideos: z.boolean().default(false),

  renderVideo: z.boolean().default(false),

  generateThumbnail: z.boolean().default(false),

  generateSEO: z.boolean().default(false),

  publish: z.boolean().default(false),
});

export const produceRequestSchema = z.object({
  projectId: z.string().min(1),

  projectName: z.string().min(1),

  topic: z.string().min(1),

  market: z.string().min(1),

  style: z.string().min(1),

  language: z.string().min(1),

  script: z.string().min(1),

  provider: z.string().default("flow"),

  options: productionOptionsSchema.default({
    generateImages: false,
    generateVideos: false,
    renderVideo: false,
    generateThumbnail: false,
    generateSEO: false,
    publish: false,
  }),
});

export const productionStepSchema = z.object({
  id: z.string(),

  order: z.number(),

  stage: productionStageSchema,

  status: productionStatusSchema,

  enabled: z.boolean(),

  message: z.string().optional(),

  startedAt: z.string().optional(),

  finishedAt: z.string().optional(),

  durationMs: z.number().optional(),
});

export const productionJobSchema = z.object({
  id: z.string(),

  projectId: z.string(),

  projectName: z.string(),

  status: productionStatusSchema,

  progress: z.number(),

  currentStage: productionStageSchema.nullable(),

  startedAt: z.string(),

  finishedAt: z.string().optional(),

  steps: z.array(productionStepSchema),
});

export const produceResponseSchema = z.object({
  success: z.boolean(),

  job: productionJobSchema,
});