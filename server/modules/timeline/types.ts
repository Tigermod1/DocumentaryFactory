import { z } from 'zod';

export const timelineFormats = ['srt', 'txt'] as const;
export type TimelineFormat = (typeof timelineFormats)[number];

export const sceneEmotions = [
  'reflective',
  'calm',
  'urgent',
  'hopeful',
  'tense',
  'somber',
  'neutral',
] as const;
export type SceneEmotion = (typeof sceneEmotions)[number];

export interface SubtitleBlock {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
  narration: boolean;
}

export interface SceneDto {
  id: string;
  sceneNumber: number;
  orderIndex: number;
  startTime: number;
  endTime: number;
  duration: number;
  narration: string;
  summary: string;
  emotion: SceneEmotion;
  importance: number;
  keywords: string[];
  metadata: Record<string, unknown>;
  wordCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface TimelineDto {
  id: string;
  name: string;
  sourceFormat: TimelineFormat;
  sourceText: string | null;
  totalDuration: number;
  wordCount: number;
  sceneCount: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  scenes: SceneDto[];
}

export interface TimelineDraft {
  format: TimelineFormat;
  content: string;
  sourceName?: string;
}

export const timelineFormatSchema = z.enum(timelineFormats);

export const metadataSchema = z.record(z.string(), z.unknown()).default({});

export const timelineDraftSchema = z.object({
  format: timelineFormatSchema,
  content: z.string().trim().min(1, 'Timeline content is required.'),
  sourceName: z.string().trim().min(1).optional(),
});

export const timelineCreateSchema = z.object({
  name: z.string().trim().min(1).optional(),
  format: timelineFormatSchema,
  content: z.string().trim().min(1),
  metadata: metadataSchema.optional(),
});

export const timelineUpdateSchema = z.object({
  name: z.string().trim().min(1).optional(),
  metadata: metadataSchema.optional(),
});

export const sceneInsertSchema = z.object({
  afterSceneId: z.string().trim().min(1).nullable().optional(),
  beforeSceneId: z.string().trim().min(1).nullable().optional(),
  scene: z.object({
    startTime: z.number().nonnegative(),
    endTime: z.number().nonnegative(),
    narration: z.string().trim().min(1),
    summary: z.string().trim().min(1).optional(),
    emotion: z.enum(sceneEmotions).optional(),
    importance: z.number().int().min(1).max(5).optional(),
    keywords: z.array(z.string().trim().min(1)).optional(),
    metadata: metadataSchema.optional(),
  }),
});

export const sceneReorderSchema = z.object({
  sceneId: z.string().trim().min(1),
  targetIndex: z.number().int().nonnegative(),
});

export const sceneUpdateSchema = z.object({
  startTime: z.number().nonnegative().optional(),
  endTime: z.number().nonnegative().optional(),
  narration: z.string().trim().min(1).optional(),
  summary: z.string().trim().min(1).optional(),
  emotion: z.enum(sceneEmotions).optional(),
  importance: z.number().int().min(1).max(5).optional(),
  keywords: z.array(z.string().trim().min(1)).optional(),
  metadata: metadataSchema.optional(),
});

export const sceneMergeSchema = z.object({
  withSceneId: z.string().trim().min(1).optional(),
});

export const sceneSplitSchema = z.object({
  splitWordIndex: z.number().int().positive().optional(),
});

export function parseMetadata(value: string | null | undefined): Record<string, unknown> {
  if (!value) {
    return {};
  }

  try {
    const parsed = JSON.parse(value);

    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }
  } catch {
    return {};
  }

  return {};
}

export function serializeMetadata(value: Record<string, unknown> | undefined): string {
  return JSON.stringify(value ?? {});
}
