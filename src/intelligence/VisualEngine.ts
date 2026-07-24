import type {
  CameraAnalysis,
  CompositionAnalysis,
  DocumentaryScene,
  EmotionAnalysis,
  StoryAnalysis,
  VisualAnalysis,
} from "./types";

export class VisualEngine {
  analyze(
    scene: DocumentaryScene,
    story: StoryAnalysis,
    emotion: EmotionAnalysis,
    camera: CameraAnalysis,
    composition: CompositionAnalysis
  ): VisualAnalysis {
    return {
      lighting: this.lighting(
        story,
        emotion
      ),

      color: this.color(
        story,
        emotion
      ),

      weather: this.weather(
        scene,
        emotion
      ),

      timeOfDay: this.timeOfDay(
        story,
        emotion
      ),

      mood: this.mood(
        story,
        emotion,
        camera,
        composition
      ),
    };
  }

  private lighting(
    story: StoryAnalysis,
    emotion: EmotionAnalysis
  ): VisualAnalysis["lighting"] {
    switch (story.intent) {
      case "introduce":
        return "natural";

      case "build_context":
        return "soft";

      case "raise_question":
        return "blue_hour";

      case "conflict":
        return "dramatic";

      case "reflection":
        return "soft";

      case "reveal":
        return "cinematic";

      case "resolution":
        return "golden_hour";

      default:
        break;
    }

    switch (emotion.emotion) {
      case "fear":
      case "tension":
        return "dramatic";

      case "loneliness":
        return "blue_hour";

      case "victory":
        return "golden_hour";

      default:
        return "cinematic";
    }
  }

  private color(
    story: StoryAnalysis,
    emotion: EmotionAnalysis
  ): VisualAnalysis["color"] {
    switch (emotion.emotion) {
      case "fear":
        return "cold";

      case "tension":
        return "high_contrast";

      case "sadness":
        return "desaturated";

      case "loneliness":
        return "cold";

      case "victory":
        return "warm";

      case "hope":
        return "warm";

      case "wonder":
        return "neutral";

      default:
        return "neutral";
    }
  }

  private weather(
    scene: DocumentaryScene,
    emotion: EmotionAnalysis
  ): string {
    const text =
      scene.narration.toLowerCase();

    if (
      text.includes("snow")
    )
      return "snow";

    if (
      text.includes("rain")
    )
      return "rain";

    if (
      text.includes("storm")
    )
      return "storm";

    if (
      emotion.emotion ===
      "loneliness"
    )
      return "fog";

    if (
      emotion.emotion ===
      "victory"
    )
      return "clear";

    return "clear";
  }

  private timeOfDay(
    story: StoryAnalysis,
    emotion: EmotionAnalysis
  ): string {
    switch (story.intent) {
      case "introduce":
        return "morning";

      case "conflict":
        return "afternoon";

      case "reflection":
        return "sunset";

      case "reveal":
        return "golden hour";

      case "resolution":
        return "sunrise";

      default:
        break;
    }

    switch (emotion.emotion) {
      case "fear":
        return "night";

      case "loneliness":
        return "dusk";

      case "victory":
        return "golden hour";

      default:
        return "day";
    }
  }

  private mood(
    story: StoryAnalysis,
    emotion: EmotionAnalysis,
    camera: CameraAnalysis,
    composition: CompositionAnalysis
  ): string {
    return [
      story.intent,
      emotion.emotion,
      camera.intent,
      composition.intent,
    ].join(" | ");
  }
}

export const visualEngine =
  new VisualEngine();