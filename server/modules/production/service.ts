import {
  createProductionJob,
  calculateProgress,
} from "./parser.js";

import type {
  ProduceRequest,
  ProductionJob,
  ProductionStage,
  ProductionStatus,
} from "./types.js";

class ProductionService {
  private readonly jobs = new Map<
    string,
    ProductionJob
  >();

  create(
    request: ProduceRequest
  ): ProductionJob {
    const job =
      createProductionJob(request);

    this.jobs.set(job.id, job);

    return job;
  }

  get(
    id: string
  ): ProductionJob | undefined {
    return this.jobs.get(id);
  }

  getAll(): ProductionJob[] {
    return [...this.jobs.values()];
  }

  remove(
    id: string
  ): boolean {
    return this.jobs.delete(id);
  }

  clear(): void {
    this.jobs.clear();
  }

  start(
    id: string
  ): ProductionJob | undefined {
    const job = this.jobs.get(id);

    if (!job) return;

    job.status = "running";
    job.startedAt =
      new Date().toISOString();
    job.currentStage = null;

    return job;
  }

  finish(
    id: string
  ): ProductionJob | undefined {
    const job = this.jobs.get(id);

    if (!job) return;

    job.status = "completed";
    job.progress = 100;
    job.finishedAt =
      new Date().toISOString();
    job.currentStage = null;

    return job;
  }

  fail(
    id: string,
    message: string
  ): ProductionJob | undefined {
    const job = this.jobs.get(id);

    if (!job) return;

    job.status = "failed";
    job.finishedAt =
      new Date().toISOString();

    const current =
      job.steps.find(
        (step) =>
          step.stage ===
          job.currentStage
      );

    if (current) {
      current.status = "failed";
      current.message = message;
    }

    return job;
  }

  updateStage(
    id: string,
    stage: ProductionStage,
    status: ProductionStatus,
    message?: string
  ): ProductionJob | undefined {
    const job = this.jobs.get(id);

    if (!job) return;

    const step =
      job.steps.find(
        (item) =>
          item.stage === stage
      );

    if (!step) return;

    step.status = status;

    if (message) {
      step.message = message;
    }

    switch (status) {
      case "running":
        step.startedAt =
          new Date().toISOString();

        job.status = "running";
        job.currentStage = stage;
        break;

      case "completed":
        step.finishedAt =
          new Date().toISOString();

        if (step.startedAt) {
          step.durationMs =
            new Date(
              step.finishedAt
            ).getTime() -
            new Date(
              step.startedAt
            ).getTime();
        }
        break;

      case "failed":
        job.status = "failed";
        job.finishedAt =
          new Date().toISOString();
        break;
    }

    job.progress =
      calculateProgress(job);

    return job;
  }
}

export const productionService =
  new ProductionService();