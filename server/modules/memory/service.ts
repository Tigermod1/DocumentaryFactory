import type { FactoryMemory } from "./types.js";

import {
  loadMemory,
  saveMemory,
} from "./storage.js";

export class MemoryService {
  async get(
    projectId: string
  ): Promise<FactoryMemory> {
    return loadMemory(projectId);
  }

  async save(
    memory: FactoryMemory
  ): Promise<void> {
    await saveMemory(memory);
  }

  async update(
    projectId: string,
    updater: (
      memory: FactoryMemory
    ) => void
  ): Promise<FactoryMemory> {
    const memory =
      await loadMemory(projectId);

    updater(memory);

    await saveMemory(memory);

    return memory;
  }
}

export const memoryService =
  new MemoryService();