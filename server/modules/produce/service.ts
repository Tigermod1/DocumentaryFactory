import { runProducePipeline } from "./pipeline.js";

import type {
  ProduceRequest,
  ProduceResult,
} from "./types.js";

export class ProduceService {
  async produce(
    request: ProduceRequest
  ): Promise<ProduceResult> {
    return runProducePipeline(request);
  }
}

export const produceService =
  new ProduceService();