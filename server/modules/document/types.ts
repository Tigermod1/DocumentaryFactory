import type { Scene } from "../scene/types.js";

export interface DocumentAssetSelection {
  characterId?: string;

  environmentId?: string;

  propIds: string[];

  soundIds: string[];

  musicId?: string;
}

export interface CameraPlan {
  shot: string;

  movement: string;

  lens: string;

  framing: string;
}

export interface PromptPackage {
  imagePrompt: string;

  videoPrompt: string;

  negativePrompt: string;
}

export interface DocumentScene {
  scene: Scene;

  assets: DocumentAssetSelection;

  camera: CameraPlan;

  prompt: PromptPackage;

  ambience: string;

  notes: string[];
}

export interface DocumentProject {
  id: string;

  name: string;

  style: string;

  scenes: DocumentScene[];

  totalScenes: number;

  createdAt: string;
}

export interface GenerateDocumentInput {
  projectName: string;

  style?: string;

  scenes: Scene[];
}

export interface DocumentSummary {
  totalScenes: number;

  totalCharacters: number;

  totalEnvironments: number;

  totalProps: number;

  totalSounds: number;
}