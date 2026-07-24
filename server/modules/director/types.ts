import type { Scene } from "../scene/types.js";
import type { StoryAnalysis } from "../story/types.js";

export type CameraShot =
  | "Extreme Wide Shot"
  | "Wide Shot"
  | "Full Shot"
  | "Medium Shot"
  | "Medium Close Up"
  | "Close Up"
  | "Extreme Close Up"
  | "Overhead"
  | "POV";

export type CameraMovement =
  | "Static"
  | "Slow Push In"
  | "Slow Pull Out"
  | "Pan Left"
  | "Pan Right"
  | "Tilt Up"
  | "Tilt Down"
  | "Orbit"
  | "Drone"
  | "Handheld";

export type LightingStyle =
  | "Natural"
  | "Golden Hour"
  | "Sunset"
  | "Dramatic"
  | "Soft"
  | "Dark"
  | "Firelight"
  | "Moonlight";

export type WeatherType =
  | "Clear"
  | "Cloudy"
  | "Fog"
  | "Rain"
  | "Snow"
  | "Storm"
  | "Dust";

export type TransitionType =
  | "Cut"
  | "Fade"
  | "Cross Fade"
  | "Flash"
  | "Whip"
  | "Zoom";

export interface CameraPlan {
  shot: CameraShot;

  movement: CameraMovement;

  lens: string;

  framing: string;
}

export interface LightingPlan {
  style: LightingStyle;

  contrast: number;

  temperature: "Warm" | "Neutral" | "Cool";
}

export interface EnvironmentPlan {
  weather: WeatherType;

  ambience: string[];

  props: string[];
}

export interface AudioPlan {
  musicMood: string;

  ambience: string[];

  sfx: string[];

  voiceLevel: number;

  musicLevel: number;

  ambienceLevel: number;

  sfxLevel: number;
}

export interface MotionPlan {
  effect: string;

  speed: number;

  parallax: boolean;
}

export interface DirectorDecision {
  id: string;

  sceneId: string;

  camera: CameraPlan;

  lighting: LightingPlan;

  environment: EnvironmentPlan;

  audio: AudioPlan;

  motion: MotionPlan;

  transition: TransitionType;

  notes: string[];
}

export interface DirectorInput {
  scene: Scene;

  story: StoryAnalysis;
}

export interface DirectorReport {
  decisions: DirectorDecision[];

  totalScenes: number;
}