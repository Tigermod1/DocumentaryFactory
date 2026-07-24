import crypto from "node:crypto";

import {
  produceRequestSchema,
  productionJobSchema,
} from "./schema.js";

import type {
  ProduceRequest,
  ProductionJob,
  ProductionStep,
} from "./types.js";

export function parseProduceRequest(
  input: unknown
): ProduceRequest {
  return produceRequestSchema.parse(input);
}

export function parseProductionJob(
  input: unknown
): ProductionJob {
  return productionJobSchema.parse(input);
}

export function createProductionJob(
  request: ProduceRequest
): ProductionJob {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),

    projectId: request.projectId,

    projectName: request.projectName,

    status: "queued",

    progress: 0,

    currentStage: null,

    startedAt: now,

    steps: createSteps(),
  };
}

function createSteps(): ProductionStep[] {
  return [
    createStep(1, "createProject"),
    createStep(2, "saveScript"),
    createStep(3, "generateTimeline"),
    createStep(4, "documentaryBrain"),
    createStep(5, "promptComposer"),
    createStep(6, "packageBuilder"),
  ];
}

function createStep(
  order: number,
  stage: ProductionStep["stage"]
): ProductionStep {
  return {
    id: crypto.randomUUID(),

    order,

    stage,

    status: "queued",

    enabled: true,
  };
}

export function calculateProgress(
  job: ProductionJob
): number {
  const completed =
    job.steps.filter(
      (step) =>
        step.status === "completed"
    ).length;

  return Math.round(
    (completed / job.steps.length) * 100
  );
}