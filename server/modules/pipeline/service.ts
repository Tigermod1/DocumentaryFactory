import { buildPipelineReport, parsePipeline } from "./parser.js";

import type {
  CreatePipelineInput,
  Pipeline,
  PipelineReport,
  PipelineStage,
  PipelineStatus,
} from "./types.js";

const pipelineStore: Pipeline[] = [];

export function createPipeline(
  input: CreatePipelineInput
): Pipeline {
  const pipeline = parsePipeline(input);

  pipelineStore.push(pipeline);

  return pipeline;
}

export function getPipelines(): Pipeline[] {
  return pipelineStore;
}

export function getPipeline(
  id: string
): Pipeline | undefined {
  return pipelineStore.find(
    (pipeline) => pipeline.id === id
  );
}

export function getPipelineReport(
  id: string
): PipelineReport | null {
  const pipeline = getPipeline(id);

  if (!pipeline) {
    return null;
  }

  return buildPipelineReport(pipeline);
}

export function updatePipelineStage(
  id: string,
  stage: PipelineStage,
  status: PipelineStatus
): Pipeline | null {
  const pipeline = getPipeline(id);

  if (!pipeline) {
    return null;
  }

  const step = pipeline.steps.find(
    (item) => item.stage === stage
  );

  if (!step) {
    return null;
  }

  step.status = status;

  if (status === "running") {
    step.startedAt = new Date().toISOString();

    pipeline.currentStage = stage;

    pipeline.status = "running";
  }

  if (status === "completed") {
    step.finishedAt = new Date().toISOString();

    if (step.startedAt) {
      step.durationMs =
        new Date(step.finishedAt).getTime() -
        new Date(step.startedAt).getTime();
    }

    const next = pipeline.steps.find(
      (item) =>
        item.order === step.order + 1 &&
        item.enabled
    );

    if (next) {
      next.status = "running";
      next.startedAt = new Date().toISOString();
      pipeline.currentStage = next.stage;
    } else {
      pipeline.status = "completed";
    }
  }

  if (status === "failed") {
    pipeline.status = "failed";
  }

  return pipeline;
}

export function deletePipeline(
  id: string
): boolean {
  const index = pipelineStore.findIndex(
    (pipeline) => pipeline.id === id
  );

  if (index === -1) {
    return false;
  }

  pipelineStore.splice(index, 1);

  return true;
}

export function clearPipelines(): void {
  pipelineStore.length = 0;
}