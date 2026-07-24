// ======================================================
// server/modules/timeline/optimizer.ts
// Documentary Factory V14
// ======================================================

import type { PromptTemplate } from "./template-engine.js";

export type PromptProfile =
  | "FLOW"
  | "VEO"
  | "RUNWAY"
  | "IMAGE";

export interface OptimizedPrompt {

  prompt: string;

  negativePrompt: string;

}

const PRIORITY = [

  "subject",

  "action",

  "environment",

  "camera",

  "lighting",

  "style",

  "quality",

] as const;

function unique(list: string[]): string[] {

  const seen = new Set<string>();

  const output: string[] = [];

  for (const item of list) {

    const value = item.trim().toLowerCase();

    if (!value) continue;

    if (seen.has(value)) continue;

    seen.add(value);

    output.push(item.trim());

  }

  return output;

}

function normalize(list: string[]): string[] {

  return list
    .map(s => s.trim())
    .filter(Boolean);

}

function buildMainPrompt(
  template: PromptTemplate
): string {

  const parts: string[] = [];

  for (const key of PRIORITY) {

    parts.push(...template[key]);

  }

  return unique(normalize(parts)).join(", ");

}

function buildNegativePrompt(
  template: PromptTemplate
): string {

  return unique(template.negative).join(", ");

}

function applyProfile(

  prompt: string,

  profile: PromptProfile,

): string {

  switch (profile) {

    case "FLOW":

      return [
        prompt,
        "cinematic movement",
        "natural motion",
        "smooth transitions",
      ].join(", ");

    case "VEO":

      return [
        prompt,
        "movie quality",
        "realistic physics",
        "professional cinematography",
      ].join(", ");

    case "RUNWAY":

      return [
        prompt,
        "clean composition",
        "high consistency",
      ].join(", ");

    case "IMAGE":

      return [
        prompt,
        "masterpiece",
        "best quality",
      ].join(", ");

    default:

      return prompt;

  }

}

export function optimizePrompt(

  template: PromptTemplate,

  profile: PromptProfile,

): OptimizedPrompt {

  const prompt =
    buildMainPrompt(template);

  return {

    prompt:
      applyProfile(prompt, profile),

    negativePrompt:
      buildNegativePrompt(template),

  };

}