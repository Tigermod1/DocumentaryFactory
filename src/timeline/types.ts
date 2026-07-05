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

export interface Scene {
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

export interface Timeline {
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
  scenes: Scene[];
}

export interface TimelineDraft {
  name: string;
  sourceFormat: TimelineFormat;
  sourceText: string;
  totalDuration: number;
  wordCount: number;
  sceneCount: number;
  metadata: Record<string, unknown>;
  scenes: Scene[];
}
