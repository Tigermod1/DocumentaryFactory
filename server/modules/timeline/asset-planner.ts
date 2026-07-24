// ======================================================
// server/modules/timeline/asset-planner.ts
// Documentary Factory V14
// ======================================================

import type { CharacterInfo } from "./character-engine.js";
import type { EnvironmentInfo } from "./environment-engine.js";
import type { VisualAnalysis } from "./visual-engine.js";

export interface AssetPlan {

  characters: string[];

  environments: string[];

  props: string[];

  effects: string[];

  music: string[];

  camera: {

    shot: string;

    movement: string;

  };

  missingAssets: string[];

}

const PROP_RULES: Record<string, string[]> = {

  battle: [
    "horse",
    "sword",
    "shield",
    "cannon",
    "flag",
  ],

  battlefield: [
    "horse",
    "cannon",
    "smoke",
    "flag",
  ],

  laboratory: [
    "microscope",
    "test tube",
    "beaker",
  ],

  ocean: [
    "boat",
    "wave",
  ],

  forest: [
    "tree",
    "rock",
    "grass",
  ],

  castle: [
    "torch",
    "throne",
  ],

};

const EFFECT_RULES: Record<string, string[]> = {

  battlefield: [
    "dust",
    "smoke",
  ],

  war: [
    "explosion",
    "fire",
  ],

  ocean: [
    "water splash",
    "fog",
  ],

  forest: [
    "wind",
    "leaf particles",
  ],

  cave: [
    "fog",
    "dust",
  ],

};

const MUSIC_RULES: Record<string, string[]> = {

  ancient: [
    "epic orchestral",
  ],

  medieval: [
    "choir",
    "cinematic orchestra",
  ],

  modern: [
    "documentary ambient",
  ],

  future: [
    "sci-fi ambient",
  ],

};

function unique(items: string[]): string[] {

  return [...new Set(items)];

}

function detectProps(
  environment: EnvironmentInfo,
  narration: string,
): string[] {

  const props: string[] = [];

  const text = narration.toLowerCase();

  for (const key in PROP_RULES) {

    if (
      text.includes(key) ||
      environment.location.toLowerCase().includes(key) ||
      environment.environment.toLowerCase().includes(key)
    ) {

      props.push(...PROP_RULES[key]);

    }

  }

  return unique(props);

}

function detectEffects(
  environment: EnvironmentInfo,
  narration: string,
): string[] {

  const effects: string[] = [];

  const text = narration.toLowerCase();

  for (const key in EFFECT_RULES) {

    if (
      text.includes(key) ||
      environment.location.toLowerCase().includes(key) ||
      environment.environment.toLowerCase().includes(key)
    ) {

      effects.push(...EFFECT_RULES[key]);

    }

  }

  return unique(effects);

}

function detectMusic(
  environment: EnvironmentInfo,
): string[] {

  const music: string[] = [];

  const era =
    environment.era.toLowerCase();

  for (const key in MUSIC_RULES) {

    if (era.includes(key)) {

      music.push(...MUSIC_RULES[key]);

    }

  }

  return unique(music);

}

export function buildAssetPlan(

  narration: string,

  characters: CharacterInfo[],

  environment: EnvironmentInfo,

  visual: VisualAnalysis,

): AssetPlan {

  const characterAssets =
    characters
      .filter(c => c.present)
      .map(c => c.name);

  const environmentAssets = [

    environment.location,

  ].filter(Boolean);

  const props =
    detectProps(environment, narration);

  const effects =
    detectEffects(environment, narration);

  const music =
    detectMusic(environment);

  const missingAssets: string[] = [];

  return {

    characters: unique(characterAssets),

    environments: unique(environmentAssets),

    props,

    effects,

    music,

    camera: {

      shot: visual.shot,

      movement: visual.camera,

    },

    missingAssets: unique(missingAssets),

  };

}