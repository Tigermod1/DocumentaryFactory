import {
  addLog,
  setPreview,
  setProgress,
  setStage,
  type ProductionEvents,
} from "./ProductionEvents";

import type {
  RuntimeStage,
  RuntimeState,
} from "./RuntimeState";

export interface StageContext {
  state: RuntimeState;

  events: ProductionEvents;
}

const wait = (ms: number) =>
  new Promise<void>((resolve) =>
    setTimeout(resolve, ms)
  );

async function runStage(
  ctx: StageContext,
  stage: RuntimeStage,
  progress: number,
  message: string,
  previewPrompt?: string
) {
  setStage(ctx.state, stage);

  addLog(
    ctx.state,
    stage,
    "info",
    `Starting ${stage}...`
  );

  ctx.events.emit("stage", ctx.state);

  await wait(600);

  setProgress(ctx.state, progress);

  addLog(
    ctx.state,
    stage,
    "success",
    message
  );

  if (previewPrompt) {
    setPreview(ctx.state, {
      scene: ctx.state.currentScene,

      prompt: previewPrompt,
    });

    ctx.events.emit(
      "preview",
      ctx.state
    );
  }

  ctx.events.emit(
    "progress",
    ctx.state
  );

  ctx.events.emit(
    "log",
    ctx.state
  );
}

export class StageExecutor {
  async executeTimeline(
    ctx: StageContext
  ) {
    await runStage(
      ctx,
      "timeline",
      10,
      "Timeline generated."
    );
  }

  async executeScene(
    ctx: StageContext
  ) {
    await runStage(
      ctx,
      "scene",
      20,
      "Scenes generated."
    );
  }

  async executeStory(
    ctx: StageContext
  ) {
    await runStage(
      ctx,
      "story",
      30,
      "Story analyzed."
    );
  }

  async executeDirector(
    ctx: StageContext
  ) {
    await runStage(
      ctx,
      "director",
      45,
      "Director decisions created."
    );
  }

  async executeBible(
    ctx: StageContext
  ) {
    await runStage(
      ctx,
      "bible",
      55,
      "Bible loaded."
    );
  }

  async executePrompt(
    ctx: StageContext
  ) {
    await runStage(
      ctx,
      "prompt",
      70,
      "Prompt composed.",
      `BBC documentary cinematic frame,
Napoleon standing on a foggy battlefield,
golden hour,
dramatic lighting,
35mm,
ultra realistic,
high detail`
    );
  }

  async executeImage(
    ctx: StageContext
  ) {
    await runStage(
      ctx,
      "image",
      82,
      "Preview image generated."
    );

    setPreview(ctx.state, {
      image: "/mock/preview.png",
    });

    ctx.events.emit(
      "preview",
      ctx.state
    );
  }

  async executeAnimation(
    ctx: StageContext
  ) {
    await runStage(
      ctx,
      "animation",
      90,
      "Animation generated."
    );
  }

  async executeSound(
    ctx: StageContext
  ) {
    await runStage(
      ctx,
      "sound",
      96,
      "Sound design completed."
    );
  }

  async executeRender(
    ctx: StageContext
  ) {
    await runStage(
      ctx,
      "render",
      100,
      "Render completed."
    );

    setStage(
      ctx.state,
      "completed"
    );

    ctx.state.running = false;

    addLog(
      ctx.state,
      "completed",
      "success",
      "Production finished successfully."
    );

    ctx.events.emit(
      "completed",
      ctx.state
    );
  }
}