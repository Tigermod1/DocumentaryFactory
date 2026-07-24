/* ===========================================
   Documentary Intelligence Engine
   Core Types
=========================================== */

export type StoryIntent =
  | "introduce"
  | "build_context"
  | "raise_question"
  | "increase_tension"
  | "conflict"
  | "discovery"
  | "reveal"
  | "reflection"
  | "resolution"
  | "ending";

export type EmotionType =
  | "neutral"
  | "curiosity"
  | "wonder"
  | "hope"
  | "fear"
  | "loneliness"
  | "tension"
  | "sadness"
  | "victory"
  | "determination"
  | "inspiration";

export type CameraIntent =
  | "establishing"
  | "observation"
  | "character"
  | "emotion"
  | "action"
  | "detail"
  | "symbolic";

export type CompositionIntent =
  | "rule_of_thirds"
  | "center"
  | "symmetry"
  | "leading_lines"
  | "negative_space"
  | "silhouette"
  | "depth";

export type LightingIntent =
  | "natural"
  | "golden_hour"
  | "blue_hour"
  | "soft"
  | "hard"
  | "dramatic"
  | "cinematic";

export type ColorIntent =
  | "warm"
  | "cold"
  | "neutral"
  | "desaturated"
  | "high_contrast";

export interface StoryAnalysis {
  intent: StoryIntent;

  confidence: number;

  reason: string;
}

export interface EmotionAnalysis {
  emotion: EmotionType;

  intensity: number;

  confidence: number;
}

export interface CameraAnalysis {
  intent: CameraIntent;

  shot: string;

  angle: string;

  movement: string;

  lens: string;
}

export interface CompositionAnalysis {
  intent: CompositionIntent;

  framing: string;

  focus: string;
}

export interface VisualAnalysis {
  lighting: LightingIntent;

  color: ColorIntent;

  weather: string;

  timeOfDay: string;

  mood: string;
}

export interface PromptIntent {
  goal: string;

  subject: string;

  visualStory: string;

  cameraDirection: string;

  atmosphere: string;
}

export interface DocumentaryScene {
  id: string;

  sceneNumber: number;

  narration: string;

  duration: number;

  character?: string;

  environment?: string;
}

export interface DocumentaryAnalysis {
  story: StoryAnalysis;

  emotion: EmotionAnalysis;

  camera: CameraAnalysis;

  composition: CompositionAnalysis;

  visual: VisualAnalysis;

  prompt: PromptIntent;
}