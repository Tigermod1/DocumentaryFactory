import type {
  CreateSceneInput,
  Scene,
  SceneAnalysisResult,
} from "./types.js";

function randomId() {
  return crypto.randomUUID();
}

function detectSceneType(
  narration: string
): Scene["type"] {
  const text = narration.toLowerCase();

  if (
    text.includes("finally") ||
    text.includes("in conclusion") ||
    text.includes("at last")
  ) {
    return "ending";
  }

  if (
    text.includes("suddenly") ||
    text.includes("battle") ||
    text.includes("attack") ||
    text.includes("fight")
  ) {
    return "action";
  }

  if (
    text.includes("however") ||
    text.includes("meanwhile") ||
    text.includes("later")
  ) {
    return "transition";
  }

  if (
    text.includes("said") ||
    text.includes("asked") ||
    text.includes("replied")
  ) {
    return "dialogue";
  }

  return "intro";
}

export function parseScene(
  input: CreateSceneInput,
  index: number
): Scene {
  return {
    id: randomId(),

    index,

    title: input.title,

    narration: input.narration,

    type: detectSceneType(input.narration),

    timing: {
      start: input.start,
      end: input.end,
      duration: input.end - input.start,
    },

    character: input.characterId
      ? {
          id: input.characterId,
          name: "",
        }
      : undefined,

    environment: input.environmentId
      ? {
          id: input.environmentId,
          name: "",
        }
      : undefined,

    props: (input.propIds ?? []).map((id) => ({
      id,
      name: "",
    })),

    sounds: (input.soundIds ?? []).map((id) => ({
      id,
      name: "",
      category: "",
    })),

    music: input.musicId
      ? {
          id: input.musicId,
          name: "",
        }
      : undefined,

    camera: {
      shot: "Medium Shot",
      movement: "Static",
    },

    prompt: "",

    notes: "",
  };
}

export function parseScenes(
  inputs: CreateSceneInput[]
): SceneAnalysisResult {
  const scenes = inputs.map((scene, index) =>
    parseScene(scene, index + 1)
  );

  return {
    scenes,

    totalScenes: scenes.length,

    totalDuration: scenes.reduce(
      (sum, scene) => sum + scene.timing.duration,
      0
    ),
  };
}