import { parseScenes } from "./parser.js";

import type {
  CreateSceneInput,
  Scene,
  SceneAnalysisResult,
} from "./types.js";

const sceneStore: Scene[] = [];

export function analyzeScenes(
  inputs: CreateSceneInput[]
): SceneAnalysisResult {
  return parseScenes(inputs);
}

export function createScenes(
  inputs: CreateSceneInput[]
): Scene[] {
  const result = parseScenes(inputs);

  sceneStore.push(...result.scenes);

  return result.scenes;
}

export function getScenes(): Scene[] {
  return sceneStore;
}

export function getScene(
  id: string
): Scene | undefined {
  return sceneStore.find((scene) => scene.id === id);
}

export function updateScene(
  id: string,
  data: Partial<Scene>
): Scene | null {
  const scene = sceneStore.find(
    (item) => item.id === id
  );

  if (!scene) {
    return null;
  }

  Object.assign(scene, data);

  return scene;
}

export function deleteScene(
  id: string
): boolean {
  const index = sceneStore.findIndex(
    (scene) => scene.id === id
  );

  if (index === -1) {
    return false;
  }

  sceneStore.splice(index, 1);

  return true;
}

export function clearScenes(): void {
  sceneStore.length = 0;
}