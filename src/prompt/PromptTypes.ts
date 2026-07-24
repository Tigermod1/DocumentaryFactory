export type PromptProvider =
  | "flow"
  | "veo"
  | "flux"
  | "comfyui"
  | "runway"
  | "pika"
  | "luma";

export type CameraShot =
  | "extreme-wide"
  | "wide"
  | "medium-wide"
  | "medium"
  | "medium-close"
  | "close-up"
  | "extreme-close";

export type CameraAngle =
  | "eye-level"
  | "low-angle"
  | "high-angle"
  | "bird-eye"
  | "worm-eye"
  | "over-shoulder"
  | "top-down";

export type CameraMovement =
  | "static"
  | "pan-left"
  | "pan-right"
  | "tilt-up"
  | "tilt-down"
  | "dolly-in"
  | "dolly-out"
  | "truck-left"
  | "truck-right"
  | "orbit"
  | "handheld"
  | "drone";

export type LightingStyle =
  | "natural"
  | "golden-hour"
  | "blue-hour"
  | "soft"
  | "hard"
  | "dramatic"
  | "cinematic"
  | "studio";

export type RenderStyle =
  | "bbc-documentary"
  | "cinematic"
  | "photorealistic"
  | "hyperrealistic"
  | "historical"
  | "oil-painting"
  | "anime"
  | "3d";

export interface PromptSubject {
  character: string;

  environment: string;

  props: string[];
}

export interface PromptCamera {
  shot: CameraShot;

  angle: CameraAngle;

  movement: CameraMovement;

  lens: string;
}

export interface PromptVisual {
  lighting: LightingStyle;

  style: RenderStyle;

  colorPalette: string;

  mood: string;

  weather: string;

  timeOfDay: string;
}

export interface PromptOutput {
  provider: PromptProvider;

  positive: string;

  negative: string;
}

export interface PromptScene {
  id: string;

  sceneNumber: number;

  narration: string;

  duration: number;

  subject: PromptSubject;

  camera: PromptCamera;

  visual: PromptVisual;

  outputs: PromptOutput[];
}

export interface PromptProject {
  projectName: string;

  targetMarket: string;

  outputLanguage: string;

  imageProvider: PromptProvider;

  videoProvider: PromptProvider;

  scenes: PromptScene[];
}

export const defaultPromptScene: PromptScene = {
  id: crypto.randomUUID(),

  sceneNumber: 1,

  narration: "",

  duration: 8,

  subject: {
    character: "",

    environment: "",

    props: [],
  },

  camera: {
    shot: "medium",

    angle: "eye-level",

    movement: "static",

    lens: "35mm",
  },

  visual: {
    lighting: "cinematic",

    style: "bbc-documentary",

    colorPalette: "natural",

    mood: "dramatic",

    weather: "clear",

    timeOfDay: "day",
  },

  outputs: [],
};

export const defaultPromptProject: PromptProject = {
  projectName: "New Documentary",

  targetMarket: "US",

  outputLanguage: "English",

  imageProvider: "flow",

  videoProvider: "veo",

  scenes: [defaultPromptScene],
};