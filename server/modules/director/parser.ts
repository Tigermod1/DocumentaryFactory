import type {
  DirectorDecision,
  DirectorInput,
  DirectorReport,
  LightingStyle,
  WeatherType,
} from "./types.js";

function chooseLighting(
  emotion: string
): LightingStyle {
  switch (emotion) {
    case "fear":
      return "Dark";

    case "tension":
      return "Dramatic";

    case "mystery":
      return "Moonlight";

    case "victory":
      return "Golden Hour";

    case "hope":
      return "Sunset";

    default:
      return "Natural";
  }
}

function chooseWeather(
  emotion: string
): WeatherType {
  switch (emotion) {
    case "fear":
      return "Storm";

    case "tension":
      return "Fog";

    case "mystery":
      return "Fog";

    case "sadness":
      return "Rain";

    case "victory":
      return "Clear";

    default:
      return "Cloudy";
  }
}

function buildDecision(
  input: DirectorInput
): DirectorDecision {
  const lighting = chooseLighting(
    input.story.emotion
  );

  const weather = chooseWeather(
    input.story.emotion
  );

  return {
    id: crypto.randomUUID(),

    sceneId: input.scene.id,

    camera: {
      shot:
        input.story.intensity > 80
          ? "Close Up"
          : "Medium Shot",

      movement:
        input.story.pacing === "fast"
          ? "Handheld"
          : "Slow Push In",

      lens:
        input.story.intensity > 80
          ? "85mm"
          : "35mm",

      framing: "Centered",
    },

    lighting: {
      style: lighting,

      contrast:
        input.story.intensity,

      temperature:
        lighting === "Golden Hour" ||
        lighting === "Sunset"
          ? "Warm"
          : lighting === "Moonlight"
          ? "Cool"
          : "Neutral",
    },

    environment: {
      weather,

      ambience: input.story.ambience,

      props: input.story.props,
    },

    audio: {
      musicMood:
        input.story.musicMood,

      ambience:
        input.story.ambience,

      sfx:
        input.story.sounds,

      voiceLevel: -3,

      musicLevel: -22,

      ambienceLevel: -28,

      sfxLevel: -18,
    },

    motion: {
      effect:
        input.story.pacing === "fast"
          ? "Fast Pan"
          : "Ken Burns",

      speed:
        input.story.pacing === "fast"
          ? 1.5
          : 0.6,

      parallax: true,
    },

    transition:
      input.story.transition as DirectorDecision["transition"],

    notes: [],
  };
}

export function parseDirector(
  input: DirectorInput
): DirectorDecision {
  return buildDecision(input);
}

export function parseDirectors(
  inputs: DirectorInput[]
): DirectorReport {
  return {
    decisions: inputs.map(buildDecision),

    totalScenes: inputs.length,
  };
}