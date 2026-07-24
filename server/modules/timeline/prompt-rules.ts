// ======================================================
// server/modules/timeline/prompt-rules.ts
// Documentary Factory V13
// ======================================================

import type { StoryBeat } from "./story-intelligence.js";
import type { EnvironmentType, EraType } from "./environment-engine.js";

export interface PromptRule {

  style: string[];

  camera: string[];

  lighting: string[];

  quality: string[];

}

const BASE_QUALITY = [

  "cinematic documentary",

  "ultra realistic",

  "8k",

  "high detail",

  "professional composition",

  "natural color grading",

  "volumetric lighting",

  "sharp focus",

  "35mm documentary lens",

];

const STORY_RULES: Record<StoryBeat, Partial<PromptRule>> = {

  HOOK: {

    camera: [
      "push in",
      "dramatic framing",
      "strong foreground"
    ],

    lighting: [
      "high contrast"
    ],

    style: [
      "attention grabbing"
    ],

  },

  QUESTION: {

    camera: [
      "slow dolly in"
    ],

    style: [
      "curiosity"
    ],

  },

  DISCOVERY: {

    camera: [
      "slow cinematic pan"
    ],

    style: [
      "sense of exploration"
    ],

  },

  CONFLICT: {

    camera: [
      "handheld",
      "dynamic movement"
    ],

    lighting: [
      "dramatic shadows"
    ],

    style: [
      "chaotic atmosphere"
    ],

  },

  REVEAL: {

    camera: [
      "orbit camera"
    ],

    lighting: [
      "soft cinematic light"
    ],

    style: [
      "epic reveal"
    ],

  },

  CLIMAX: {

    camera: [
      "wide cinematic shot"
    ],

    lighting: [
      "intense lighting"
    ],

    style: [
      "maximum emotional impact"
    ],

  },

  RESOLUTION: {

    camera: [
      "locked camera"
    ],

    lighting: [
      "warm sunlight"
    ],

    style: [
      "peaceful ending"
    ],

  },

  TRANSITION: {

    camera: [
      "smooth transition"
    ],

    style: [
      "visual continuity"
    ],

  },

};

const ENVIRONMENT_RULES: Partial<Record<EnvironmentType, string[]>> = {

  CITY: [

    "authentic architecture",

    "busy streets"

  ],

  NATURE: [

    "lush vegetation",

    "natural landscape"

  ],

  BATTLEFIELD: [

    "dust",

    "smoke",

    "battle damage"

  ],

  UNDERWATER: [

    "floating particles",

    "light rays"

  ],

  SPACE: [

    "deep space",

    "cinematic stars"

  ],

};

const ERA_RULES: Partial<Record<EraType, string[]>> = {

  PREHISTORIC: [

    "prehistoric world",

    "ancient vegetation"

  ],

  ANCIENT: [

    "historically accurate",

    "ancient architecture",

    "period clothing"

  ],

  MEDIEVAL: [

    "medieval castle",

    "authentic armor"

  ],

  INDUSTRIAL: [

    "steam machinery",

    "industrial revolution"

  ],

  MODERN: [

    "modern realism"

  ],

  FUTURE: [

    "futuristic technology",

    "advanced civilization"

  ],

};

export function buildPromptRules(

  beat: StoryBeat,

  environment: EnvironmentType,

  era: EraType,

): PromptRule {

  return {

    style: [

      ...(STORY_RULES[beat]?.style ?? []),

      ...(ERA_RULES[era] ?? []),

      ...(ENVIRONMENT_RULES[environment] ?? []),

    ],

    camera: [

      ...(STORY_RULES[beat]?.camera ?? []),

    ],

    lighting: [

      ...(STORY_RULES[beat]?.lighting ?? []),

    ],

    quality: BASE_QUALITY,

  };

}