import type {
  CreatePipelineInput,
  Pipeline,
  PipelineContext,
  PipelineReport,
  PipelineStage,
  PipelineStep,
} from "./types.js";

const DEFAULT_STAGES: PipelineStage[] = [
  "project",
  "timeline",
  "scene",
  "story",
  "director",
  "character",
  "environment",
  "prop",
  "camera",
  "lighting",
  "weather",
  "motion",
  "sound",
  "music",
  "prompt",
  "render",
  "subtitle",
  "export",
];

function createContext(
  input: CreatePipelineInput
): PipelineContext {
  return {
    projectId: input.projectId,

    sceneIds: [],

    storyIds: [],

    directorIds: [],

    assets: {
      characters: [],
      environments: [],
      props: [],
      sounds: [],
      music: [],
    },

    output: {
      aspectRatio: "16:9",

      resolution: "1920x1080",

      fps: 30,

      codec: "H264",

      burnSubtitle: true,

      exportSrt: true,
    },
  };
}

function createSteps(): PipelineStep[] {
  return DEFAULT_STAGES.map((stage, index) => ({
    id: crypto.randomUUID(),

    stage,

    name: stage,

    order: index + 1,

    enabled: true,

    status: index === 0 ? "running" : "pending",
  }));
}

export function parsePipeline(
  input: CreatePipelineInput
): Pipeline {
  return {
    id: crypto.randomUUID(),

    name: input.name,

    createdAt: new Date().toISOString(),

    context: createContext(input),

    steps: createSteps(),

    currentStage: "project",

    status: "running",
  };
}

export function buildPipelineReport(
  pipeline: Pipeline
): PipelineReport {
  const completedSteps = pipeline.steps.filter(
    (step) => step.status === "completed"
  ).length;

  return {
    pipeline,

    totalSteps: pipeline.steps.length,

    completedSteps,

    progress:
      pipeline.steps.length === 0
        ? 0
        : Math.round(
            (completedSteps /
              pipeline.steps.length) *
              100
          ),
  };
}