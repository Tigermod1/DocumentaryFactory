// ======================================================
// server/modules/timeline/environment-engine.ts
// Documentary Factory V13
// ======================================================

export type EnvironmentType =
  | "INDOOR"
  | "OUTDOOR"
  | "CITY"
  | "NATURE"
  | "BATTLEFIELD"
  | "UNDERGROUND"
  | "UNDERWATER"
  | "SPACE"
  | "UNKNOWN";

export type EraType =
  | "PREHISTORIC"
  | "ANCIENT"
  | "MEDIEVAL"
  | "INDUSTRIAL"
  | "MODERN"
  | "FUTURE"
  | "UNKNOWN";

export type LightingType =
  | "DAY"
  | "NIGHT"
  | "SUNSET"
  | "FIRELIGHT"
  | "DIM"
  | "UNKNOWN";

export interface EnvironmentInfo {
  location: string;
  environment: EnvironmentType;
  era: EraType;
  lighting: LightingType;
  atmosphere: string;
}

const LOCATION_WORDS = [
  "rome",
  "egypt",
  "greece",
  "china",
  "africa",
  "forest",
  "jungle",
  "ocean",
  "sea",
  "river",
  "desert",
  "castle",
  "temple",
  "laboratory",
  "lab",
  "village",
  "city",
  "mountain",
  "cave",
  "moon",
  "mars",
  "earth",
];

function contains(text: string, words: string[]) {
  const lower = text.toLowerCase();
  return words.find((w) => lower.includes(w));
}

function detectEnvironment(text: string): EnvironmentType {

  const lower = text.toLowerCase();

  if (lower.includes("laboratory") || lower.includes("inside"))
    return "INDOOR";

  if (lower.includes("city"))
    return "CITY";

  if (
    lower.includes("forest") ||
    lower.includes("jungle") ||
    lower.includes("mountain")
  )
    return "NATURE";

  if (
    lower.includes("battle") ||
    lower.includes("war")
  )
    return "BATTLEFIELD";

  if (
    lower.includes("cave") ||
    lower.includes("underground")
  )
    return "UNDERGROUND";

  if (
    lower.includes("ocean") ||
    lower.includes("underwater")
  )
    return "UNDERWATER";

  if (
    lower.includes("space") ||
    lower.includes("galaxy") ||
    lower.includes("mars") ||
    lower.includes("moon")
  )
    return "SPACE";

  if (
    lower.includes("outside") ||
    lower.includes("field")
  )
    return "OUTDOOR";

  return "UNKNOWN";
}

function detectEra(text: string): EraType {

  const lower = text.toLowerCase();

  if (
    lower.includes("dinosaur") ||
    lower.includes("prehistoric")
  )
    return "PREHISTORIC";

  if (
    lower.includes("ancient") ||
    lower.includes("rome") ||
    lower.includes("egypt") ||
    lower.includes("greece")
  )
    return "ANCIENT";

  if (
    lower.includes("medieval") ||
    lower.includes("kingdom")
  )
    return "MEDIEVAL";

  if (
    lower.includes("industrial") ||
    lower.includes("steam")
  )
    return "INDUSTRIAL";

  if (
    lower.includes("future") ||
    lower.includes("2077")
  )
    return "FUTURE";

  if (
    lower.includes("today") ||
    lower.includes("modern")
  )
    return "MODERN";

  return "UNKNOWN";
}

function detectLighting(text: string): LightingType {

  const lower = text.toLowerCase();

  if (lower.includes("night"))
    return "NIGHT";

  if (
    lower.includes("sunset") ||
    lower.includes("dusk")
  )
    return "SUNSET";

  if (
    lower.includes("fire") ||
    lower.includes("torch")
  )
    return "FIRELIGHT";

  if (
    lower.includes("dark") ||
    lower.includes("shadow")
  )
    return "DIM";

  if (
    lower.includes("day") ||
    lower.includes("sunlight")
  )
    return "DAY";

  return "UNKNOWN";
}

function detectAtmosphere(text: string): string {

  const lower = text.toLowerCase();

  if (lower.includes("mysterious"))
    return "mysterious";

  if (lower.includes("peace"))
    return "peaceful";

  if (lower.includes("chaos"))
    return "chaotic";

  if (lower.includes("danger"))
    return "dangerous";

  if (lower.includes("hope"))
    return "hopeful";

  return "neutral";
}

export function analyzeEnvironment(
  text: string
): EnvironmentInfo {

  const location =
    contains(text, LOCATION_WORDS) ?? "Unknown";

  return {

    location,

    environment: detectEnvironment(text),

    era: detectEra(text),

    lighting: detectLighting(text),

    atmosphere: detectAtmosphere(text),

  };

}