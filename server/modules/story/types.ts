export type StoryEmotion =
  | "neutral"
  | "curiosity"
  | "tension"
  | "fear"
  | "hope"
  | "sadness"
  | "victory"
  | "mystery";

export type StoryPacing =
  | "slow"
  | "medium"
  | "fast";

export interface StoryAnalysis {
  id: string;

  sceneId: string;

  emotion: StoryEmotion;

  pacing: StoryPacing;

  intensity: number;

  keywords: string[];

  characters: string[];

  environments: string[];

  props: string[];

  sounds: string[];

  ambience: string[];

  cameraStyle: string;

  transition: string;

  musicMood: string;

  notes: string[];
}

export interface AnalyzeStoryInput {
  sceneId: string;

  narration: string;
}

export interface StoryReport {
  analyses: StoryAnalysis[];

  totalScenes: number;

  dominantEmotion: StoryEmotion;

  averageIntensity: number;
}