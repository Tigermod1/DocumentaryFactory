import type { ProductionContext } from "./types.js";

export interface ProductionStage {
  readonly name: string;

  execute(
    context: ProductionContext
  ): Promise<void>;
}

export abstract class BaseProductionStage
  implements ProductionStage
{
  abstract readonly name: string;

  abstract execute(
    context: ProductionContext
  ): Promise<void>;
}