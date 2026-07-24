import { parseDirectors } from "./parser.js";

import type {
  DirectorDecision,
  DirectorInput,
  DirectorReport,
} from "./types.js";

const directorStore: DirectorDecision[] = [];

export function analyzeDirector(
  inputs: DirectorInput[]
): DirectorReport {
  return parseDirectors(inputs);
}

export function createDirectorPlan(
  inputs: DirectorInput[]
): DirectorDecision[] {
  const report = parseDirectors(inputs);

  directorStore.push(...report.decisions);

  return report.decisions;
}

export function getDirectorPlans(): DirectorDecision[] {
  return directorStore;
}

export function getDirectorPlan(
  id: string
): DirectorDecision | undefined {
  return directorStore.find(
    (plan) => plan.id === id
  );
}

export function updateDirectorPlan(
  id: string,
  data: Partial<DirectorDecision>
): DirectorDecision | null {
  const plan = directorStore.find(
    (item) => item.id === id
  );

  if (!plan) {
    return null;
  }

  Object.assign(plan, data);

  return plan;
}

export function deleteDirectorPlan(
  id: string
): boolean {
  const index = directorStore.findIndex(
    (plan) => plan.id === id
  );

  if (index === -1) {
    return false;
  }

  directorStore.splice(index, 1);

  return true;
}

export function clearDirectorPlans(): void {
  directorStore.length = 0;
}