import { cloneBible, parseBible } from "./parser.js";

import type {
  Bible,
  CreateBibleInput,
} from "./types.js";

const bibleStore: Bible[] = [];

export function createBible(
  input: CreateBibleInput
): Bible {
  const bible = parseBible(input);

  bibleStore.push(bible);

  return cloneBible(bible);
}

export function getBibles(): Bible[] {
  return bibleStore.map(cloneBible);
}

export function getBible(
  id: string
): Bible | undefined {
  const bible = bibleStore.find(
    (item) => item.id === id
  );

  return bible ? cloneBible(bible) : undefined;
}

export function updateBible(
  id: string,
  data: Partial<Bible>
): Bible | null {
  const bible = bibleStore.find(
    (item) => item.id === id
  );

  if (!bible) {
    return null;
  }

  Object.assign(bible, data);

  bible.updatedAt =
    new Date().toISOString();

  return cloneBible(bible);
}

export function deleteBible(
  id: string
): boolean {
  const index =
    bibleStore.findIndex(
      (item) => item.id === id
    );

  if (index === -1) {
    return false;
  }

  bibleStore.splice(index, 1);

  return true;
}

export function clearBibles(): void {
  bibleStore.length = 0;
}

export function findBibleByName(
  name: string
): Bible | undefined {
  return bibleStore.find(
    (item) =>
      item.name.toLowerCase() ===
      name.toLowerCase()
  );
}

export function getBiblesByType(
  type: Bible["type"]
): Bible[] {
  return bibleStore
    .filter(
      (item) => item.type === type
    )
    .map(cloneBible);
}