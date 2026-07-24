export type PipelineStage =
  | "project"
  | "timeline"
  | "scene"
  | "story"
  | "director"
  | "character"
  | "environment"
  | "prop"
  | "camera"
  | "lighting"
  | "weather"
  | "motion"
  | "sound"
  | "music"
  | "prompt"
  | "render"
  | "subtitle"
  | "export";

export type PipelineStatus =
  | "pending"
  | "running"
  | "completed"
  | "failed"
  | "skipped";

export interface PipelineStep {
  id: string;

  stage: PipelineStage;

  name: string;

  order: number;

  enabled: boolean;

  status: PipelineStatus;

  startedAt?: string;

  finishedAt?: string;

  durationMs?: number;

  error?: string;
}

export interface PipelineContext {
  projectId: string;

  documentId?: string;

  timelineId?: string;

  sceneIds: string[];

  storyIds: string[];

  directorIds: string[];

  assets: {
    characters: string[];

    environments: string[];

    props: string[];

    sounds: string[];

    music: string[];
  };

  output: {
    aspectRatio: string;

    resolution: string;

    fps: number;

    codec: string;

    burnSubtitle: boolean;

    exportSrt: boolean;
  };
}

export interface Pipeline {
  id: string;

  name: string;

  createdAt: string;

  context: PipelineContext;

  steps: PipelineStep[];

  currentStage: PipelineStage;

  status: PipelineStatus;
}

export interface CreatePipelineInput {
  name: string;

  projectId: string;
}

export interface PipelineReport {
  pipeline: Pipeline;

  totalSteps: number;

  completedSteps: number;

  progress: number;
}