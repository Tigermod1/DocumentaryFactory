import type { Prisma, Scene, Timeline } from '@prisma/client';
import { prisma } from '../../prisma.js';
import { buildScenes, sceneTextToSegments } from './scene-builder.js';
import { parseSubtitleContent } from './parser.js';
import {
  metadataSchema,
  parseMetadata,
  sceneInsertSchema,
  sceneMergeSchema,
  sceneReorderSchema,
  sceneSplitSchema,
  sceneUpdateSchema,
  timelineCreateSchema,
  timelineDraftSchema,
  timelineUpdateSchema,
  type SceneDto,
  type SceneEmotion,
  type TimelineDraft,
  type TimelineDto,
  type TimelineFormat,
  serializeMetadata,
} from './types.js';

function toSceneDto(scene: Scene): SceneDto {
  return {
    id: scene.id,
    sceneNumber: scene.sceneNumber,
    orderIndex: scene.orderIndex,
    startTime: scene.startTime,
    endTime: scene.endTime,
    duration: scene.duration,
    narration: scene.narration,
    summary: scene.summary,
    emotion: scene.emotion as SceneEmotion,
    importance: scene.importance,
    keywords: JSON.parse(scene.keywords) as string[],
    metadata: parseMetadata(scene.metadata),
    wordCount: scene.wordCount,
    createdAt: scene.createdAt.toISOString(),
    updatedAt: scene.updatedAt.toISOString(),
  };
}

function toTimelineDto(timeline: Timeline & { scenes?: Scene[] }): TimelineDto {
  const scenes = [...(timeline.scenes ?? [])].sort((a, b) => a.orderIndex - b.orderIndex).map(toSceneDto);

  return {
    id: timeline.id,
    name: timeline.name,
    sourceFormat: timeline.sourceFormat as TimelineFormat,
    sourceText: timeline.sourceText,
    totalDuration: timeline.totalDuration,
    wordCount: timeline.wordCount,
    sceneCount: timeline.sceneCount,
    metadata: parseMetadata(timeline.metadata),
    createdAt: timeline.createdAt.toISOString(),
    updatedAt: timeline.updatedAt.toISOString(),
    scenes,
  };
}

function sceneKeywordsToJson(keywords: string[]): string {
  return JSON.stringify([...new Set(keywords.map((keyword) => keyword.trim()).filter(Boolean))]);
}

type SceneWriteInput = {
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
};

function normalizeName(name: string | undefined, format: TimelineFormat): string {
  if (name?.trim()) {
    return name.trim();
  }

  return format === 'srt' ? 'Imported SRT timeline' : 'Imported TXT timeline';
}

function calculateTimelineTotals(scenes: SceneDto[]) {
  return scenes.reduce(
    (totals, scene) => ({
      totalDuration: Math.max(totals.totalDuration, scene.endTime),
      wordCount: totals.wordCount + scene.wordCount,
      sceneCount: totals.sceneCount + 1,
    }),
    { totalDuration: 0, wordCount: 0, sceneCount: 0 },
  );
}

async function loadTimeline(timelineId: string) {
  return prisma.timeline.findUnique({
    where: { id: timelineId },
    include: { scenes: { orderBy: { orderIndex: 'asc' } } },
  });
}

async function renumberScenes(tx: Prisma.TransactionClient, timelineId: string): Promise<Scene[]> {
  const scenes = await tx.scene.findMany({
    where: { timelineId },
    orderBy: { orderIndex: 'asc' },
  });

  const updatedScenes: Scene[] = [];

  for (let index = 0; index < scenes.length; index += 1) {
    const scene = scenes[index];
    const next = await tx.scene.update({
      where: { id: scene.id },
      data: {
        sceneNumber: index + 1,
        orderIndex: index,
      },
    });
    updatedScenes.push(next);
  }

  return updatedScenes;
}

async function refreshTimelineSummary(tx: Prisma.TransactionClient, timelineId: string): Promise<void> {
  const scenes = await tx.scene.findMany({
    where: { timelineId },
    orderBy: { orderIndex: 'asc' },
  });

  const dtoScenes = scenes.map(toSceneDto);
  const totals = calculateTimelineTotals(dtoScenes);

  await tx.timeline.update({
    where: { id: timelineId },
    data: {
      totalDuration: totals.totalDuration,
      wordCount: totals.wordCount,
      sceneCount: totals.sceneCount,
    },
  });
}

function buildTimelineDraft(format: TimelineFormat, content: string, sourceName?: string) {
  const subtitles = parseSubtitleContent(format, content);
  const scenes = buildScenes(subtitles);
  const sceneDtos = scenes.map((scene, index) => ({
    id: `draft-${index + 1}`,
    sceneNumber: index + 1,
    orderIndex: index,
    startTime: scene.startTime,
    endTime: scene.endTime,
    duration: scene.duration,
    narration: scene.narration,
    summary: scene.summary,
    emotion: scene.emotion,
    importance: scene.importance,
    keywords: scene.keywords,
    metadata: scene.metadata,
    wordCount: scene.wordCount,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  const totals = calculateTimelineTotals(sceneDtos);

  return {
    name: normalizeName(sourceName, format),
    sourceFormat: format,
    sourceText: content,
    totalDuration: totals.totalDuration,
    wordCount: totals.wordCount,
    sceneCount: totals.sceneCount,
    metadata: {
      sourceName: sourceName ?? null,
      parsedAt: new Date().toISOString(),
    },
    scenes: sceneDtos,
  };
}

async function createSceneRecords(tx: Prisma.TransactionClient, timelineId: string, scenes: SceneWriteInput[]) {
  for (let index = 0; index < scenes.length; index += 1) {
    const scene = scenes[index];
    await tx.scene.create({
      data: {
        timelineId,
        sceneNumber: index + 1,
        orderIndex: index,
        startTime: scene.startTime,
        endTime: scene.endTime,
        duration: scene.duration,
        wordCount: scene.wordCount,
        narration: scene.narration,
        summary: scene.summary,
        emotion: scene.emotion,
        importance: scene.importance,
        keywords: sceneKeywordsToJson(scene.keywords),
        metadata: serializeMetadata(scene.metadata),
      },
    });
  }
}

export async function listTimelines(): Promise<TimelineDto[]> {
  const timelines = await prisma.timeline.findMany({
    include: { scenes: { orderBy: { orderIndex: 'asc' } } },
    orderBy: { updatedAt: 'desc' },
  });

  return timelines.map(toTimelineDto);
}

export async function getTimelineById(timelineId: string): Promise<TimelineDto | null> {
  const timeline = await loadTimeline(timelineId);
  return timeline ? toTimelineDto(timeline) : null;
}

export async function parseTimeline(draft: TimelineDraft): Promise<ReturnType<typeof buildTimelineDraft>> {
  const payload = timelineDraftSchema.parse(draft);
  return buildTimelineDraft(payload.format, payload.content, payload.sourceName);
}

export async function createTimelineFromContent(input: {
  name?: string;
  format: TimelineFormat;
  content: string;
  metadata?: Record<string, unknown>;
}): Promise<TimelineDto> {
  const payload = timelineCreateSchema.parse(input);
  const draft = buildTimelineDraft(payload.format, payload.content, payload.name);

  const timeline = await prisma.$transaction(async (tx) => {
    const created = await tx.timeline.create({
      data: {
        name: draft.name,
        sourceFormat: draft.sourceFormat,
        sourceText: draft.sourceText,
        totalDuration: draft.totalDuration,
        wordCount: draft.wordCount,
        sceneCount: draft.sceneCount,
        metadata: serializeMetadata(payload.metadata ?? draft.metadata),
      },
    });

    await createSceneRecords(tx, created.id, draft.scenes.map((scene) => ({
      startTime: scene.startTime,
      endTime: scene.endTime,
      duration: scene.duration,
      narration: scene.narration,
      summary: scene.summary,
      emotion: scene.emotion as SceneEmotion,
      importance: scene.importance,
      keywords: scene.keywords,
      metadata: scene.metadata,
      wordCount: scene.wordCount,
    })));

    return tx.timeline.findUniqueOrThrow({
      where: { id: created.id },
      include: { scenes: { orderBy: { orderIndex: 'asc' } } },
    });
  });

  return toTimelineDto(timeline);
}

export async function createEmptyTimeline(input: { name: string; metadata?: Record<string, unknown> }): Promise<TimelineDto> {
  const timeline = await prisma.timeline.create({
    data: {
      name: input.name,
      sourceFormat: 'txt',
      metadata: serializeMetadata(input.metadata),
    },
  });

  return toTimelineDto(await prisma.timeline.findUniqueOrThrow({
    where: { id: timeline.id },
    include: { scenes: true },
  }));
}

export async function updateTimeline(timelineId: string, input: { name?: string; metadata?: Record<string, unknown> }): Promise<TimelineDto> {
  const payload = timelineUpdateSchema.parse(input);
  const timeline = await prisma.timeline.update({
    where: { id: timelineId },
    data: {
      name: payload.name,
      metadata: payload.metadata ? serializeMetadata(payload.metadata) : undefined,
    },
    include: { scenes: { orderBy: { orderIndex: 'asc' } } },
  });

  return toTimelineDto(timeline);
}

export async function deleteTimeline(timelineId: string): Promise<void> {
  await prisma.timeline.delete({ where: { id: timelineId } });
}

export async function updateScene(timelineId: string, sceneId: string, input: ReturnType<typeof sceneUpdateSchema.parse>): Promise<TimelineDto> {
  const payload = sceneUpdateSchema.parse(input);

  await prisma.$transaction(async (tx) => {
    const current = await tx.scene.findUniqueOrThrow({ where: { id: sceneId } });
    const nextStartTime = payload.startTime ?? current.startTime;
    const nextEndTime = payload.endTime ?? current.endTime;

    await tx.scene.update({
      where: { id: sceneId },
      data: {
        startTime: nextStartTime,
        endTime: nextEndTime,
        duration: nextEndTime - nextStartTime,
        narration: payload.narration,
        summary: payload.summary,
        emotion: payload.emotion,
        importance: payload.importance,
        keywords: payload.keywords ? sceneKeywordsToJson(payload.keywords) : undefined,
        metadata: payload.metadata ? serializeMetadata(payload.metadata) : undefined,
      },
    });

    await refreshTimelineSummary(tx, timelineId);
  });

  return getTimelineById(timelineId) as Promise<TimelineDto>;
}

export async function insertScene(timelineId: string, input: unknown): Promise<TimelineDto> {
  const payload = sceneInsertSchema.parse(input);
  const timeline = await prisma.timeline.findUniqueOrThrow({
    where: { id: timelineId },
    include: { scenes: { orderBy: { orderIndex: 'asc' } } },
  });

  const scenes = timeline.scenes.map((scene) => toSceneDto(scene));
  const insertSceneDto: SceneDto = {
    id: `manual-${Date.now()}`,
    sceneNumber: scenes.length + 1,
    orderIndex: scenes.length,
    startTime: payload.scene.startTime,
    endTime: payload.scene.endTime,
    duration: payload.scene.endTime - payload.scene.startTime,
    narration: payload.scene.narration,
    summary: payload.scene.summary ?? payload.scene.narration.slice(0, 160),
    emotion: payload.scene.emotion ?? 'neutral',
    importance: payload.scene.importance ?? 3,
    keywords: payload.scene.keywords ?? [],
    metadata: payload.scene.metadata ?? {},
    wordCount: payload.scene.narration.split(/\s+/).filter(Boolean).length,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const beforeIndex = payload.beforeSceneId
    ? scenes.findIndex((scene) => scene.id === payload.beforeSceneId)
    : -1;
  const afterIndex = payload.afterSceneId
    ? scenes.findIndex((scene) => scene.id === payload.afterSceneId)
    : -1;

  let insertIndex = scenes.length;
  if (beforeIndex >= 0) {
    insertIndex = beforeIndex;
  } else if (afterIndex >= 0) {
    insertIndex = afterIndex + 1;
  }

  scenes.splice(insertIndex, 0, insertSceneDto);

  await prisma.$transaction(async (tx) => {
    await tx.scene.deleteMany({ where: { timelineId } });
    await createSceneRecords(tx, timelineId, scenes.map((scene) => ({
      startTime: scene.startTime,
      endTime: scene.endTime,
      duration: scene.duration,
      narration: scene.narration,
      summary: scene.summary,
      emotion: scene.emotion as SceneEmotion,
      importance: scene.importance,
      keywords: scene.keywords,
      metadata: scene.metadata,
      wordCount: scene.wordCount,
    })));
    await refreshTimelineSummary(tx, timelineId);
  });

  return getTimelineById(timelineId) as Promise<TimelineDto>;
}

export async function deleteScene(timelineId: string, sceneId: string): Promise<TimelineDto> {
  await prisma.$transaction(async (tx) => {
    await tx.scene.delete({ where: { id: sceneId } });
    await renumberScenes(tx, timelineId);
    await refreshTimelineSummary(tx, timelineId);
  });

  return getTimelineById(timelineId) as Promise<TimelineDto>;
}

export async function reorderScene(timelineId: string, input: unknown): Promise<TimelineDto> {
  const payload = sceneReorderSchema.parse(input);

  await prisma.$transaction(async (tx) => {
    const scenes = await tx.scene.findMany({
      where: { timelineId },
      orderBy: { orderIndex: 'asc' },
    });

    const currentIndex = scenes.findIndex((scene) => scene.id === payload.sceneId);
    if (currentIndex === -1) {
      throw new Error('Scene not found.');
    }

    const [moved] = scenes.splice(currentIndex, 1);
    const safeTarget = Math.max(0, Math.min(payload.targetIndex, scenes.length));
    scenes.splice(safeTarget, 0, moved);

    await tx.scene.deleteMany({ where: { timelineId } });
    await createSceneRecords(tx, timelineId, scenes.map((scene) => ({
      startTime: scene.startTime,
      endTime: scene.endTime,
      duration: scene.duration,
      narration: scene.narration,
      summary: scene.summary,
      emotion: scene.emotion as SceneEmotion,
      importance: scene.importance,
      keywords: JSON.parse(scene.keywords),
      metadata: parseMetadata(scene.metadata),
      wordCount: scene.wordCount,
    })));
    await refreshTimelineSummary(tx, timelineId);
  });

  return getTimelineById(timelineId) as Promise<TimelineDto>;
}

export async function mergeScene(timelineId: string, sceneId: string, input: unknown): Promise<TimelineDto> {
  const payload = sceneMergeSchema.parse(input);

  await prisma.$transaction(async (tx) => {
    const scenes = await tx.scene.findMany({
      where: { timelineId },
      orderBy: { orderIndex: 'asc' },
    });

    const index = scenes.findIndex((scene) => scene.id === sceneId);
    if (index === -1) {
      throw new Error('Scene not found.');
    }

    const mergeTarget = payload.withSceneId
      ? scenes.findIndex((scene) => scene.id === payload.withSceneId)
      : index + 1;

    if (mergeTarget < 0 || mergeTarget >= scenes.length || mergeTarget === index) {
      throw new Error('A merge target is required.');
    }

    const leftIndex = Math.min(index, mergeTarget);
    const rightIndex = Math.max(index, mergeTarget);
    const left = scenes[leftIndex];
    const right = scenes[rightIndex];

    const mergedNarration = `${left.narration}\n\n${right.narration}`.trim();
    const mergedScene = {
      startTime: Math.min(left.startTime, right.startTime),
      endTime: Math.max(left.endTime, right.endTime),
      duration: Math.max(left.endTime, right.endTime) - Math.min(left.startTime, right.startTime),
      narration: mergedNarration,
      summary: `${left.summary} ${right.summary}`.trim().slice(0, 200),
      emotion: left.importance >= right.importance ? left.emotion : right.emotion,
      importance: Math.min(5, Math.max(left.importance, right.importance)),
      keywords: JSON.stringify([...new Set([...JSON.parse(left.keywords), ...JSON.parse(right.keywords)])]),
      metadata: JSON.stringify({ mergedSceneIds: [left.id, right.id] }),
      wordCount: left.wordCount + right.wordCount,
    };

    scenes.splice(rightIndex, 1);
    scenes.splice(leftIndex, 1, {
      ...left,
      ...mergedScene,
      id: left.id,
      sceneNumber: left.sceneNumber,
      orderIndex: left.orderIndex,
      createdAt: left.createdAt,
      updatedAt: left.updatedAt,
    });

    await tx.scene.deleteMany({ where: { timelineId } });
    await createSceneRecords(tx, timelineId, scenes.map((scene) => ({
      startTime: scene.startTime,
      endTime: scene.endTime,
      duration: scene.duration,
      narration: scene.narration,
      summary: scene.summary,
      emotion: scene.emotion as SceneEmotion,
      importance: scene.importance,
      keywords: JSON.parse(scene.keywords),
      metadata: parseMetadata(scene.metadata),
      wordCount: scene.wordCount,
    })));
    await refreshTimelineSummary(tx, timelineId);
  });

  return getTimelineById(timelineId) as Promise<TimelineDto>;
}

export async function splitScene(timelineId: string, sceneId: string, input: unknown): Promise<TimelineDto> {
  const payload = sceneSplitSchema.parse(input);

  await prisma.$transaction(async (tx) => {
    const scenes = await tx.scene.findMany({
      where: { timelineId },
      orderBy: { orderIndex: 'asc' },
    });

    const index = scenes.findIndex((scene) => scene.id === sceneId);
    if (index === -1) {
      throw new Error('Scene not found.');
    }

    const scene = scenes[index];
    const narrationWords = scene.narration.split(/\s+/).filter(Boolean);
    const splitPoint = payload.splitWordIndex ?? Math.ceil(narrationWords.length / 2);

    if (splitPoint <= 0 || splitPoint >= narrationWords.length) {
      throw new Error('Split point must fall within the scene narration.');
    }

    const [leftText, rightText] = sceneTextToSegments(scene.narration, splitPoint);
    const totalWords = Math.max(1, narrationWords.length);
    const leftWords = leftText.split(/\s+/).filter(Boolean).length;
    const leftDuration = Math.max(1000, Math.round((leftWords / totalWords) * scene.duration));
    const rightDuration = Math.max(1000, scene.duration - leftDuration);

    const leftScene = {
      ...scene,
      narration: leftText,
      summary: leftText.slice(0, 160),
      keywords: JSON.stringify([...new Set(leftText.toLowerCase().split(/\W+/).filter((word) => word.length > 3))].slice(0, 5)),
      wordCount: leftWords,
      duration: leftDuration,
      endTime: scene.startTime + leftDuration,
    };

    const rightScene = {
      ...scene,
      id: `${scene.id}-split`,
      narration: rightText,
      summary: rightText.slice(0, 160),
      keywords: JSON.stringify([...new Set(rightText.toLowerCase().split(/\W+/).filter((word) => word.length > 3))].slice(0, 5)),
      wordCount: narrationWords.length - leftWords,
      startTime: leftScene.endTime,
      duration: rightDuration,
      endTime: scene.endTime,
      importance: Math.max(1, scene.importance - 1),
    };

    scenes.splice(index, 1, leftScene, rightScene);

    await tx.scene.deleteMany({ where: { timelineId } });
    await createSceneRecords(tx, timelineId, scenes.map((item) => ({
      startTime: item.startTime,
      endTime: item.endTime,
      duration: item.duration,
      narration: item.narration,
      summary: item.summary,
      emotion: item.emotion as SceneEmotion,
      importance: item.importance,
      keywords: JSON.parse(item.keywords),
      metadata: parseMetadata(item.metadata),
      wordCount: item.wordCount,
    })));
    await refreshTimelineSummary(tx, timelineId);
  });

  return getTimelineById(timelineId) as Promise<TimelineDto>;
}

export async function parseTimelineContent(input: TimelineDraft): Promise<ReturnType<typeof buildTimelineDraft>> {
  return parseTimeline(input);
}
