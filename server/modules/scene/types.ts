export type SceneType =
  | "intro"
  | "dialogue"
  | "action"
  | "transition"
  | "ending";

export interface SceneCharacter {
  id: string;
  name: string;
}

export interface SceneEnvironment {
  id: string;
  name: string;
}

export interface SceneProp {
  id: string;
  name: string;
}

export interface SceneSound {
  id: string;
  name: string;
  category: string;
}

export interface SceneMusic {
  id: string;
  name: string;
}

export interface SceneCamera {
  shot: string;
  movement: string;
}

export interface SceneTiming {
  start: number;
  end: number;
  duration: number;
}

export interface Scene {
  id: string;

  index: number;

  title: string;

  type: SceneType;

  narration: string;

  timing: SceneTiming;

  character?: SceneCharacter;

  environment?: SceneEnvironment;

  props: SceneProp[];

  sounds: SceneSound[];

  music?: SceneMusic;

  camera: SceneCamera;

  prompt?: string;

  notes?: string;
}

export interface CreateSceneInput {
  title: string;

  narration: string;

  start: number;

  end: number;

  characterId?: string;

  environmentId?: string;

  propIds?: string[];

  soundIds?: string[];

  musicId?: string;
}

export interface SceneAnalysisResult {
  scenes: Scene[];

  totalScenes: number;

  totalDuration: number;
}