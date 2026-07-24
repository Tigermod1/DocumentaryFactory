import type {
  CameraAnalysis,
  DocumentaryScene,
  EmotionAnalysis,
  StoryAnalysis,
} from "./types";

export class CameraEngine {
  analyze(
    scene: DocumentaryScene,
    story: StoryAnalysis,
    emotion: EmotionAnalysis
  ): CameraAnalysis {
    return {
      intent: this.intent(story),

      shot: this.shot(story, emotion),

      angle: this.angle(story, emotion),

      movement: this.movement(story, emotion),

      lens: this.lens(story, emotion),
    };
  }

  private intent(
    story: StoryAnalysis
  ): CameraAnalysis["intent"] {
    switch (story.intent) {
      case "introduce":
        return "establishing";

      case "build_context":
        return "observation";

      case "raise_question":
        return "detail";

      case "increase_tension":
      case "conflict":
        return "action";

      case "reflection":
        return "emotion";

      case "reveal":
        return "symbolic";

      default:
        return "character";
    }
  }

  private shot(
    story: StoryAnalysis,
    emotion: EmotionAnalysis
  ): string {
    switch (story.intent) {
      case "introduce":
        return "Extreme Wide Shot";

      case "build_context":
        return "Wide Shot";

      case "raise_question":
        return "Medium Shot";

      case "conflict":
        return "Medium Close-up";

      case "reflection":
        return "Close-up";

      case "reveal":
        return "Close-up";

      case "resolution":
        return "Wide Shot";
    }

    switch (emotion.emotion) {
      case "loneliness":
        return "Wide Shot";

      case "fear":
        return "Close-up";

      case "curiosity":
        return "Medium Close-up";

      case "victory":
        return "Wide Shot";

      default:
        return "Medium Shot";
    }
  }

  private angle(
    story: StoryAnalysis,
    emotion: EmotionAnalysis
  ): string {
    if (story.intent === "conflict")
      return "Low Angle";

    if (story.intent === "reflection")
      return "Eye Level";

    if (emotion.emotion === "fear")
      return "High Angle";

    if (emotion.emotion === "victory")
      return "Low Angle";

    return "Eye Level";
  }

  private movement(
    story: StoryAnalysis,
    emotion: EmotionAnalysis
  ): string {
    if (story.intent === "introduce")
      return "Slow Drone";

    if (story.intent === "build_context")
      return "Slow Pan";

    if (story.intent === "raise_question")
      return "Slow Push In";

    if (story.intent === "conflict")
      return "Handheld";

    if (story.intent === "reveal")
      return "Slow Dolly In";

    if (story.intent === "resolution")
      return "Slow Pull Back";

    switch (emotion.emotion) {
      case "loneliness":
        return "Slow Dolly Out";

      case "curiosity":
        return "Slow Push In";

      case "wonder":
        return "Orbit";

      case "tension":
        return "Handheld";

      default:
        return "Static";
    }
  }

  private lens(
    story: StoryAnalysis,
    emotion: EmotionAnalysis
  ): string {
    if (story.intent === "introduce")
      return "24mm";

    if (story.intent === "build_context")
      return "35mm";

    if (story.intent === "conflict")
      return "50mm";

    if (story.intent === "reflection")
      return "85mm";

    if (story.intent === "reveal")
      return "85mm";

    switch (emotion.emotion) {
      case "loneliness":
        return "85mm";

      case "fear":
        return "70mm";

      case "victory":
        return "35mm";

      default:
        return "50mm";
    }
  }
}

export const cameraEngine =
  new CameraEngine();