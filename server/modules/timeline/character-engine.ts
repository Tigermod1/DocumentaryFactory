// ======================================================
// server/modules/timeline/character-engine.ts
// Documentary Factory V13
// ======================================================

export type CharacterRole =
  | "MAIN"
  | "SUPPORT"
  | "GROUP"
  | "NARRATOR"
  | "UNKNOWN";

export interface CharacterInfo {
  name: string;
  role: CharacterRole;
  confidence: number;
  present: boolean;
}

const GROUP_WORDS = [
  "people",
  "humans",
  "scientists",
  "soldiers",
  "workers",
  "farmers",
  "children",
  "tribes",
  "villagers",
  "citizens",
  "kings",
  "queens",
  "armies",
];

const TITLE_WORDS = [
  "king",
  "queen",
  "emperor",
  "president",
  "general",
  "doctor",
  "professor",
  "captain",
  "saint",
];

function normalize(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

function extractProperNames(text: string): string[] {

  const matches =
    text.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2}\b/g);

  if (!matches) return [];

  return [...new Set(matches)];
}

function detectGroups(text: string): string[] {

  const lower = text.toLowerCase();

  return GROUP_WORDS.filter((w) => lower.includes(w));
}

function detectTitles(text: string): string[] {

  const lower = text.toLowerCase();

  return TITLE_WORDS.filter((w) => lower.includes(w));
}

export function analyzeCharacters(
  text: string
): CharacterInfo[] {

  const characters: CharacterInfo[] = [];

  const names = extractProperNames(text);

  for (const name of names) {

    characters.push({

      name: normalize(name),

      role: "MAIN",

      confidence: 0.95,

      present: true,

    });

  }

  const groups = detectGroups(text);

  for (const group of groups) {

    characters.push({

      name: group,

      role: "GROUP",

      confidence: 0.80,

      present: true,

    });

  }

  const titles = detectTitles(text);

  for (const title of titles) {

    if (
      characters.some(
        c => c.name.toLowerCase() === title
      )
    ) continue;

    characters.push({

      name: title,

      role: "SUPPORT",

      confidence: 0.65,

      present: true,

    });

  }

  if (characters.length === 0) {

    characters.push({

      name: "Narrator",

      role: "NARRATOR",

      confidence: 1,

      present: true,

    });

  }

  return characters;

}