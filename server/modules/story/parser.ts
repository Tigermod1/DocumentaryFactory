import type {
  AnalyzeStoryInput,
  StoryAnalysis,
  StoryEmotion,
  StoryPacing,
  StoryReport,
} from "./types.js";

function detectEmotion(text: string): StoryEmotion {
  const t = text.toLowerCase();

  if (
    t.includes("battle") ||
    t.includes("attack") ||
    t.includes("war") ||
    t.includes("fight")
  ) {
    return "tension";
  }

  if (
    t.includes("fear") ||
    t.includes("terrified") ||
    t.includes("panic") ||
    t.includes("escape")
  ) {
    return "fear";
  }

  if (
    t.includes("mystery") ||
    t.includes("secret") ||
    t.includes("unknown") ||
    t.includes("hidden")
  ) {
    return "mystery";
  }

  if (
    t.includes("discover") ||
    t.includes("curious") ||
    t.includes("question") ||
    t.includes("why")
  ) {
    return "curiosity";
  }

  if (
    t.includes("hope") ||
    t.includes("future") ||
    t.includes("dream")
  ) {
    return "hope";
  }

  if (
    t.includes("death") ||
    t.includes("loss") ||
    t.includes("alone")
  ) {
    return "sadness";
  }

  if (
    t.includes("victory") ||
    t.includes("won") ||
    t.includes("success")
  ) {
    return "victory";
  }

  return "neutral";
}

function detectPacing(text: string): StoryPacing {
  const words = text.split(/\s+/).length;

  if (words < 20) {
    return "fast";
  }

  if (words < 50) {
    return "medium";
  }

  return "slow";
}

function detectIntensity(
  emotion: StoryEmotion
): number {
  switch (emotion) {
    case "fear":
      return 95;

    case "tension":
      return 90;

    case "victory":
      return 85;

    case "mystery":
      return 75;

    case "curiosity":
      return 65;

    case "hope":
      return 55;

    case "sadness":
      return 50;

    default:
      return 40;
  }
}

export function parseStory(
  input: AnalyzeStoryInput
): StoryAnalysis {
  const emotion = detectEmotion(input.narration);

  return {
    id: crypto.randomUUID(),

    sceneId: input.sceneId,

    emotion,

    pacing: detectPacing(input.narration),

    intensity: detectIntensity(emotion),

    keywords: [],

    characters: [],

    environments: [],

    props: [],

    sounds: [],

    ambience: [],

    cameraStyle: "Documentary",

    transition: "Cut",

    musicMood: "Neutral",

    notes: [],
  };
}

export function parseStories(
  inputs: AnalyzeStoryInput[]
): StoryReport {
  const analyses = inputs.map(parseStory);

  const avg =
    analyses.reduce(
      (sum, item) => sum + item.intensity,
      0
    ) / analyses.length;

  const emotions = new Map<StoryEmotion, number>();

  analyses.forEach((a) => {
    emotions.set(
      a.emotion,
      (emotions.get(a.emotion) ?? 0) + 1
    );
  });

  const dominantEmotion =
    [...emotions.entries()].sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] ?? "neutral";

  return {
    analyses,

    totalScenes: analyses.length,

    dominantEmotion,

    averageIntensity: Math.round(avg),
  };
}