import type {
  Bible,
  CreateBibleInput,
} from "./types.js";

function now(): string {
  return new Date().toISOString();
}

export function parseBible(
  input: CreateBibleInput
): Bible {
  return {
    id: crypto.randomUUID(),

    name: input.name,

    type: input.type,

    description: input.description ?? "",

    references: [],

    character:
      input.type === "character"
        ? {
            consistencyLock: true,
          }
        : undefined,

    environment:
      input.type === "environment"
        ? {
            consistencyLock: true,
          }
        : undefined,

    style:
      input.type === "style"
        ? {
            visualStyle: "Documentary",

            rendering: "Photorealistic",

            cameraLanguage:
              "BBC Documentary",

            colorGrading:
              "Natural",

            contrast: "Medium",

            saturation: "Natural",

            grain: "Light",

            aspectRatio: "16:9",
          }
        : undefined,

    sound:
      input.type === "sound"
        ? {
            musicStyle:
              "Documentary",

            ambienceStyle:
              "Cinematic",

            sfxStyle:
              "Realistic",

            voiceMix: -3,

            musicMix: -24,

            ambienceMix: -28,

            sfxMix: -18,
          }
        : undefined,

    project:
      input.type === "project"
        ? {
            targetAudience:
              "United States",

            language:
              "English",

            platform:
              "YouTube",

            duration: 10,

            narrationStyle:
              "Professional Documentary",

            subtitleStyle:
              "Documentary",

            outputQuality:
              "4K",
          }
        : undefined,

    createdAt: now(),

    updatedAt: now(),
  };
}

export function cloneBible(
  bible: Bible
): Bible {
  return structuredClone(bible);
}