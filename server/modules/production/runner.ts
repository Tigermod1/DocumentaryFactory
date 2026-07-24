import { createProductionContext } from "./context.js";
import { createProductionPipeline } from "./pipeline.js";
import { productionService } from "./service.js";

import { syncFactoryMemory } from "../memory/sync.js";

import type {
  ProduceRequest,
  ProductionJob,
} from "./types.js";

export class ProductionRunner {
  async run(
    request: ProduceRequest,
    job: ProductionJob
  ): Promise<void> {
    const context = createProductionContext(
      request,
      job
    );

    const stages = createProductionPipeline();

    productionService.start(job.id);

    try {
      for (const stage of stages) {
        productionService.updateStage(
          job.id,
          stage.name as any,
          "running"
        );

        context.logs.push(
          `▶ ${stage.name} started`
        );

        const started = Date.now();

        await stage.execute(context);

        await syncFactoryMemory(context);

        productionService.updateStage(
          job.id,
          stage.name as any,
          "completed"
        );

        context.logs.push(
          `✓ ${stage.name} completed (${Date.now() - started} ms)`
        );
      }

      productionService.finish(job.id);

      context.logs.push(
        "Production completed."
      );
    } catch (error) {
      productionService.fail(
        job.id,
        error instanceof Error
          ? error.message
          : "Unknown error"
      );

      context.logs.push(
        `✗ ${
          error instanceof Error
            ? error.message
            : "Unknown error"
        }`
      );

      throw error;
    }
  }
}

export function createProductionRunner() {
  return new ProductionRunner();
}