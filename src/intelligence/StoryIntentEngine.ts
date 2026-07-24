import type {
  DocumentaryScene,
  StoryAnalysis,
  StoryIntent,
} from "./types";

export class StoryIntentEngine {
  analyze(
    scene: DocumentaryScene
  ): StoryAnalysis {
    const text =
      scene.narration.toLowerCase();

    return {
      intent: this.detectIntent(text),

      confidence: 0.9,

      reason: this.buildReason(text),
    };
  }

  private detectIntent(
    text: string
  ): StoryIntent {
    if (
      this.contains(text, [
        "why",
        "how",
        "what if",
        "have you ever",
        "did you know",
      ])
    ) {
      return "raise_question";
    }

    if (
      this.contains(text, [
        "suddenly",
        "unexpected",
        "however",
        "until",
        "but then",
      ])
    ) {
      return "increase_tension";
    }

    if (
      this.contains(text, [
        "battle",
        "war",
        "fight",
        "attack",
        "collapse",
        "destroy",
        "death",
      ])
    ) {
      return "conflict";
    }

    if (
      this.contains(text, [
        "found",
        "discovered",
        "unearthed",
        "revealed",
        "identified",
      ])
    ) {
      return "discovery";
    }

    if (
      this.contains(text, [
        "truth",
        "real reason",
        "actually",
        "in fact",
      ])
    ) {
      return "reveal";
    }

    if (
      this.contains(text, [
        "perhaps",
        "maybe",
        "looking back",
        "history teaches",
      ])
    ) {
      return "reflection";
    }

    if (
      this.contains(text, [
        "finally",
        "therefore",
        "in conclusion",
        "today",
      ])
    ) {
      return "resolution";
    }

    if (
      sceneStarts(text)
    ) {
      return "introduce";
    }

    return "build_context";
  }

  private buildReason(
    text: string
  ): string {
    if (text.length < 60) {
      return "Short narration, likely introducing or transitioning.";
    }

    if (
      text.includes("?")
    ) {
      return "Question detected.";
    }

    return "Narrative keyword analysis.";
  }

  private contains(
    text: string,
    keywords: string[]
  ) {
    return keywords.some((k) =>
      text.includes(k)
    );
  }
}

function sceneStarts(
  text: string
) {
  return (
    text.startsWith("imagine") ||
    text.startsWith("think") ||
    text.startsWith("picture") ||
    text.startsWith("centuries ago") ||
    text.startsWith("once")
  );
}

export const storyIntentEngine =
  new StoryIntentEngine();