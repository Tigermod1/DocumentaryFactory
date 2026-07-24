// ======================================================
// server/modules/timeline/story-intelligence.ts
// Documentary Factory V13
// ======================================================

import type { SceneEmotion } from "./types.js";

export type StoryBeat =
  | "HOOK"
  | "QUESTION"
  | "DISCOVERY"
  | "CONFLICT"
  | "REVEAL"
  | "CLIMAX"
  | "RESOLUTION"
  | "TRANSITION";

export interface StoryAnalysis {
  beat: StoryBeat;
  curiosity: number;
  tension: number;
  pacing: number;
  visualComplexity: number;
  topicShift: boolean;
}

const QUESTION_WORDS = [
  "why",
  "what",
  "who",
  "when",
  "where",
  "how",
  "could",
  "would",
  "did",
  "does",
];

const CONFLICT_WORDS = [
  "war",
  "fight",
  "battle",
  "destroy",
  "collapse",
  "crisis",
  "death",
  "kill",
  "fear",
  "enemy",
];

const REVEAL_WORDS = [
  "actually",
  "truth",
  "reveal",
  "discovered",
  "finally",
  "realized",
  "found",
  "secret",
];

const CLIMAX_WORDS = [
  "everything",
  "last",
  "final",
  "ultimate",
  "never",
  "forever",
  "impossible",
];

const HOOK_WORDS = [
  "imagine",
  "think",
  "picture",
  "suppose",
  "one day",
  "have you ever",
];

function contains(text: string, list: string[]) {
  const lower = text.toLowerCase();

  return list.some((v) => lower.includes(v));
}

function score(text: string, list: string[]) {
  const lower = text.toLowerCase();

  let s = 0;

  for (const w of list) {
    if (lower.includes(w)) s++;
  }

  return s;
}

export function detectStoryBeat(text: string): StoryBeat {
  if (contains(text, HOOK_WORDS)) return "HOOK";

  if (text.includes("?")) return "QUESTION";

  if (contains(text, REVEAL_WORDS)) return "REVEAL";

  if (contains(text, CONFLICT_WORDS)) return "CONFLICT";

  if (contains(text, CLIMAX_WORDS)) return "CLIMAX";

  return "DISCOVERY";
}

export function calculateCuriosity(text: string): number {
  let value = 20;

  if (text.includes("?")) value += 30;

  value += score(text, QUESTION_WORDS) * 8;
  value += score(text, HOOK_WORDS) * 12;
  value += score(text, REVEAL_WORDS) * 10;

  return Math.min(100, value);
}

export function calculateTension(
  emotion: SceneEmotion,
  text: string
): number {
  let value = 10;

  if (emotion === "urgent") value += 35;
  if (emotion === "tense") value += 40;
  if (emotion === "somber") value += 25;

  value += score(text, CONFLICT_WORDS) * 10;

  return Math.min(100, value);
}

export function calculatePacing(wordCount: number): number {
  if (wordCount < 10) return 20;
  if (wordCount < 20) return 40;
  if (wordCount < 35) return 60;
  if (wordCount < 50) return 80;
  return 100;
}

export function calculateVisualComplexity(text: string): number {
  let value = 20;

  const commas = (text.match(/,/g) || []).length;

  value += commas * 5;

  value += score(text, CONFLICT_WORDS) * 8;
  value += score(text, REVEAL_WORDS) * 6;

  return Math.min(100, value);
}

export function detectTopicShift(
  previous: string,
  current: string
): boolean {
  const a = new Set(previous.toLowerCase().split(/\W+/));
  const b = new Set(current.toLowerCase().split(/\W+/));

  let common = 0;

  for (const w of a) {
    if (b.has(w)) common++;
  }

  return common < Math.min(a.size, b.size) * 0.2;
}

export function analyzeStory(
  text: string,
  emotion: SceneEmotion,
  wordCount: number,
  previousText = ""
): StoryAnalysis {
  return {
    beat: detectStoryBeat(text),
    curiosity: calculateCuriosity(text),
    tension: calculateTension(emotion, text),
    pacing: calculatePacing(wordCount),
    visualComplexity: calculateVisualComplexity(text),
    topicShift: previousText
      ? detectTopicShift(previousText, text)
      : false,
  };
}