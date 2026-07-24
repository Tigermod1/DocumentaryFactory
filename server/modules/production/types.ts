export type ProductionStatus =
  | "queued"
  | "running"
  | "completed"
  | "failed";

export type ProductionStage =
  | "createProject"
  | "saveScript"
  | "generateTimeline"
  | "documentaryBrain"
  | "promptComposer"
  | "packageBuilder";

export interface ProductionStep {
  id: string;

  order: number;

  stage: ProductionStage;

  status: ProductionStatus;

  enabled: boolean;

  message?: string;

  startedAt?: string;

  finishedAt?: string;

  durationMs?: number;
}

export interface ProductionJob {
  id: string;

  projectId: string;

  projectName: string;

  status: ProductionStatus;

  progress: number;

  currentStage: ProductionStage | null;

  startedAt: string;

  finishedAt?: string;

  steps: ProductionStep[];
}

export interface ProductionOptions {
  generateImages: boolean;

  generateVideos: boolean;

  renderVideo: boolean;

  generateThumbnail: boolean;

  generateSEO: boolean;

  publish: boolean;
}

export interface ProduceRequest {
  projectId: string;

  projectName: string;

  topic: string;

  market: string;

  style: string;

  language: string;

  script: string;

  provider: string;

  options: ProductionOptions;
}

/* -------------------------------------------------------------------------- */
/*                              Production Data                               */
/* -------------------------------------------------------------------------- */

export interface ProductionTimeline {
  sceneCount: number;

  scenes: unknown[];
}

export interface ProductionBrain {
  projectId: string;

  createdAt: string;

  provider: string;

  ai: string;

  timeline?: ProductionTimeline;
}

export interface ProductionData {
  script?: string;

  timeline?: ProductionTimeline;

  brain?: ProductionBrain;

  prompts?: unknown;

  assets?: unknown;

  render?: unknown;
}

/* -------------------------------------------------------------------------- */
/*                            Production Context                              */
/* -------------------------------------------------------------------------- */

export interface ProductionContext {
  request: ProduceRequest;

  job: ProductionJob;

  workspace: string;

  projectPath: string;

  scriptPath: string;

  timelinePath: string;

  storyboardPath: string;

  promptsPath: string;

  assetsPath: string;

  renderPath: string;

  logs: string[];

  data: ProductionData;
}

export interface ProduceResponse {
  success: boolean;

  job: ProductionJob;
}