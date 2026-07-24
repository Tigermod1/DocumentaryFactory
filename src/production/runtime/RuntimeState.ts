export type RuntimeStage =
  | "idle"
  | "timeline"
  | "scene"
  | "story"
  | "director"
  | "bible"
  | "prompt"
  | "image"
  | "animation"
  | "sound"
  | "render"
  | "completed"
  | "failed";

export interface RuntimeLog {
  id: string;

  time: string;

  stage: RuntimeStage;

  message: string;

  level:
    | "info"
    | "success"
    | "warning"
    | "error";
}

export interface RuntimePreview {
  image?: string;

  prompt?: string;

  scene?: number;
}

export interface RuntimeState {
  running: boolean;

  paused: boolean;

  stage: RuntimeStage;

  progress: number;

  currentScene: number;

  totalScenes: number;

  logs: RuntimeLog[];

  preview: RuntimePreview;
}

export function createRuntimeState(): RuntimeState {
  return {
    running: false,

    paused: false,

    stage: "idle",

    progress: 0,

    currentScene: 0,

    totalScenes: 0,

    logs: [],

    preview: {},
  };
}