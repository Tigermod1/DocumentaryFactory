import { exportProducePackage } from "./exporter.js";

import type {
  ProduceRequest,
  ProduceResult,
} from "./types.js";

export async function runProducePipeline(
  request: ProduceRequest
): Promise<ProduceResult> {
  return exportProducePackage(request);
}