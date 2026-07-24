import type {
  PromptOutput,
  PromptProject,
  PromptScene,
} from "./PromptTypes";

function buildPositive(
  project: PromptProject,
  scene: PromptScene
): string {
  return `
${scene.subject.character}

${scene.narration}

Environment:
${scene.subject.environment}

Props:
${scene.subject.props.join(", ")}

Camera:
${scene.camera.shot},
${scene.camera.angle},
${scene.camera.movement},
${scene.camera.lens}

Lighting:
${scene.visual.lighting}

Style:
${scene.visual.style}

Mood:
${scene.visual.mood}

Weather:
${scene.visual.weather}

Time:
${scene.visual.timeOfDay}

Color Palette:
${scene.visual.colorPalette}

Ultra realistic,
cinematic,
high detail,
8K,
award winning documentary,
perfect composition,
natural skin,
sharp focus
`.trim();
}

function buildNegative(): string {
  return `
low quality,
blurry,
out of focus,
duplicate,
deformed,
bad anatomy,
cropped,
watermark,
logo,
text,
subtitle,
frame,
jpeg artifacts,
extra fingers,
missing fingers,
bad hands,
bad face,
cartoon,
cgi,
oversaturated,
low contrast,
noise
`.trim();
}

export function buildFlowPrompt(
  project: PromptProject,
  scene: PromptScene
): PromptOutput {
  return {
    provider: "flow",

    positive: buildPositive(
      project,
      scene
    ),

    negative: buildNegative(),
  };
}

export function buildVeoPrompt(
  project: PromptProject,
  scene: PromptScene
): PromptOutput {
  return {
    provider: "veo",

    positive: `
DOCUMENTARY VIDEO

${buildPositive(project, scene)}

Camera Motion:
${scene.camera.movement}

Keep character consistency.

Natural movement.

Professional cinematography.

No subtitles.

No watermark.
`.trim(),

    negative: buildNegative(),
  };
}

export function buildFluxPrompt(
  project: PromptProject,
  scene: PromptScene
): PromptOutput {
  return {
    provider: "flux",

    positive: buildPositive(
      project,
      scene
    ),

    negative: buildNegative(),
  };
}

export function buildComfyPrompt(
  project: PromptProject,
  scene: PromptScene
): PromptOutput {
  return {
    provider: "comfyui",

    positive: buildPositive(
      project,
      scene
    ),

    negative: buildNegative(),
  };
}

export function buildRunwayPrompt(
  project: PromptProject,
  scene: PromptScene
): PromptOutput {
  return {
    provider: "runway",

    positive: buildPositive(
      project,
      scene
    ),

    negative: buildNegative(),
  };
}

export function buildPikaPrompt(
  project: PromptProject,
  scene: PromptScene
): PromptOutput {
  return {
    provider: "pika",

    positive: buildPositive(
      project,
      scene
    ),

    negative: buildNegative(),
  };
}

export function buildLumaPrompt(
  project: PromptProject,
  scene: PromptScene
): PromptOutput {
  return {
    provider: "luma",

    positive: buildPositive(
      project,
      scene
    ),

    negative: buildNegative(),
  };
}