// ======================================================
// server/modules/timeline/visual-engine.ts
// Documentary Factory V13
// ======================================================

import type { StoryBeat } from "./story-intelligence.js";

export type VisualIntent =
  | "CHARACTER"
  | "ENVIRONMENT"
  | "OBJECT"
  | "TIMELINE"
  | "DIAGRAM"
  | "SYMBOLIC"
  | "MONTAGE";

export type CameraShot =
  | "EXTREME_WIDE"
  | "WIDE"
  | "MEDIUM"
  | "MEDIUM_CLOSE"
  | "CLOSE_UP"
  | "EXTREME_CLOSE";

export type CameraMove =
  | "STATIC"
  | "PAN"
  | "TILT"
  | "DOLLY_IN"
  | "DOLLY_OUT"
  | "ORBIT"
  | "HANDHELD"
  | "PUSH_IN";

export type SceneTransition =
  | "CUT"
  | "MATCH_CUT"
  | "FADE"
  | "DISSOLVE"
  | "WHIP_PAN";

export interface VisualAnalysis {
  intent: VisualIntent;
  shot: CameraShot;
  camera: CameraMove;
  transition: SceneTransition;
}

const CHARACTER = [
  "man",
  "woman",
  "people",
  "king",
  "queen",
  "soldier",
  "scientist",
  "child",
  "person",
];

const ENVIRONMENT = [
  "forest",
  "city",
  "village",
  "ocean",
  "mountain",
  "desert",
  "castle",
  "temple",
];

const OBJECT = [
  "book",
  "sword",
  "map",
  "coin",
  "letter",
  "weapon",
  "machine",
  "computer",
];

const TIMELINE = [
  "year",
  "century",
  "before",
  "after",
  "history",
  "timeline",
];

function has(text: string, words: string[]) {
  const t = text.toLowerCase();

  return words.some((x) => t.includes(x));
}

export function detectVisualIntent(
  text: string
): VisualIntent {

  if (has(text, CHARACTER))
    return "CHARACTER";

  if (has(text, ENVIRONMENT))
    return "ENVIRONMENT";

  if (has(text, OBJECT))
    return "OBJECT";

  if (has(text, TIMELINE))
    return "TIMELINE";

  if (text.includes("%"))
    return "DIAGRAM";

  return "SYMBOLIC";
}

export function chooseShot(
  beat: StoryBeat
): CameraShot {

  switch (beat) {

    case "HOOK":
      return "EXTREME_CLOSE";

    case "QUESTION":
      return "CLOSE_UP";

    case "DISCOVERY":
      return "MEDIUM";

    case "CONFLICT":
      return "WIDE";

    case "REVEAL":
      return "MEDIUM_CLOSE";

    case "CLIMAX":
      return "EXTREME_WIDE";

    case "RESOLUTION":
      return "WIDE";

    default:
      return "MEDIUM";
  }

}

export function chooseCameraMove(
  beat: StoryBeat
): CameraMove {

  switch (beat) {

    case "HOOK":
      return "PUSH_IN";

    case "QUESTION":
      return "DOLLY_IN";

    case "DISCOVERY":
      return "PAN";

    case "CONFLICT":
      return "HANDHELD";

    case "REVEAL":
      return "ORBIT";

    case "CLIMAX":
      return "DOLLY_OUT";

    case "RESOLUTION":
      return "STATIC";

    default:
      return "STATIC";
  }

}

export function chooseTransition(
  beat: StoryBeat
): SceneTransition {

  switch (beat) {

    case "HOOK":
      return "CUT";

    case "QUESTION":
      return "MATCH_CUT";

    case "DISCOVERY":
      return "CUT";

    case "CONFLICT":
      return "WHIP_PAN";

    case "REVEAL":
      return "DISSOLVE";

    case "CLIMAX":
      return "FADE";

    case "RESOLUTION":
      return "FADE";

    default:
      return "CUT";
  }

}

export function analyzeVisual(
  text: string,
  beat: StoryBeat
): VisualAnalysis {

  return {

    intent: detectVisualIntent(text),

    shot: chooseShot(beat),

    camera: chooseCameraMove(beat),

    transition: chooseTransition(beat),

  };

}