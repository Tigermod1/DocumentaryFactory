// ======================================================
// server/modules/timeline/prompt-composer.ts
// Documentary Factory V13
// ======================================================

import type { StoryAnalysis } from "./story-intelligence.js";
import type { VisualAnalysis } from "./visual-engine.js";
import type { CharacterInfo } from "./character-engine.js";
import type { EnvironmentInfo } from "./environment-engine.js";
import { buildPromptRules } from "./prompt-rules.js";

export interface PromptMetadata {

  narration: string;

  story: StoryAnalysis;

  visual: VisualAnalysis;

  characters: CharacterInfo[];

  environment: EnvironmentInfo;

}

export interface PromptBundle {

  imagePrompt: string;

  videoPrompt: string;

  flowPrompt: string;

}

function mainCharacter(
  characters: CharacterInfo[]
): string {

  const c =
    characters.find(x => x.role === "MAIN");

  if (c) return c.name;

  return "No main character";

}

function buildSubject(
  meta: PromptMetadata
): string {

  return mainCharacter(meta.characters);

}

function buildLocation(
  meta: PromptMetadata
): string {

  return meta.environment.location;

}

function buildAtmosphere(
  meta: PromptMetadata
): string {

  return meta.environment.atmosphere;

}

function buildCamera(
  meta: PromptMetadata
): string {

  return `${meta.visual.camera} camera movement`;

}

function buildShot(
  meta: PromptMetadata
): string {

  return `${meta.visual.shot} shot`;

}

function buildStyle(): string {

  return [
    "cinematic documentary",
    "ultra realistic",
    "natural lighting",
    "35mm lens",
    "high detail",
    "historically accurate",
  ].join(", ");

}

export function composePrompt(
  meta: PromptMetadata
): PromptBundle {

  const subject = buildSubject(meta);

  const location = buildLocation(meta);

  const atmosphere = buildAtmosphere(meta);

  const rules = buildPromptRules(
    meta.story.beat,
    meta.environment.environment,
    meta.environment.era
  );

  const imagePrompt = [

    subject,

    location,

    atmosphere,

    ...rules.style,

    ...rules.camera,

    ...rules.lighting,

    ...rules.quality,

  ]
    .filter(Boolean)
    .join(", ");

  const videoPrompt = [

    imagePrompt,

    `${meta.visual.shot} shot`,

    `${meta.visual.camera} camera movement`,

  ].join(", ");

  return {

    imagePrompt,

    videoPrompt,

    flowPrompt: videoPrompt,

  };

}