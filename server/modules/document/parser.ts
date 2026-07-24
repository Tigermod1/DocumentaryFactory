import type {
  CameraPlan,
  DocumentProject,
  DocumentScene,
  GenerateDocumentInput,
  PromptPackage,
} from "./types.js";

function buildCameraPlan(): CameraPlan {
  return {
    shot: "Medium Shot",
    movement: "Slow Dolly In",
    lens: "35mm",
    framing: "Centered",
  };
}

function buildPrompt(
  narration: string
): PromptPackage {
  return {
    imagePrompt: narration,

    videoPrompt: `${narration}, cinematic documentary, ultra realistic, dramatic lighting, volumetric light, high detail, 8k`,

    negativePrompt:
      "low quality, blurry, watermark, logo, text, duplicate, extra limbs",
  };
}

export function parseDocument(
  input: GenerateDocumentInput
): DocumentProject {
  const scenes: DocumentScene[] = input.scenes.map(
    (scene) => ({
      scene,

      assets: {
        characterId: scene.character?.id,

        environmentId: scene.environment?.id,

        propIds: scene.props.map((p) => p.id),

        soundIds: scene.sounds.map((s) => s.id),

        musicId: scene.music?.id,
      },

      camera: buildCameraPlan(),

      prompt: buildPrompt(scene.narration),

      ambience: "cinematic",

      notes: [],
    })
  );

  return {
    id: crypto.randomUUID(),

    name: input.projectName,

    style: input.style ?? "documentary",

    scenes,

    totalScenes: scenes.length,

    createdAt: new Date().toISOString(),
  };
}