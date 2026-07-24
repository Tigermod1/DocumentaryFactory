import { parseDocument } from "./parser.js";

import type {
  DocumentProject,
  GenerateDocumentInput,
  DocumentSummary,
} from "./types.js";

const documentStore: DocumentProject[] = [];

export function generateDocument(
  input: GenerateDocumentInput
): DocumentProject {
  const document = parseDocument(input);

  documentStore.push(document);

  return document;
}

export function getDocuments(): DocumentProject[] {
  return documentStore;
}

export function getDocument(
  id: string
): DocumentProject | undefined {
  return documentStore.find(
    (doc) => doc.id === id
  );
}

export function deleteDocument(
  id: string
): boolean {
  const index = documentStore.findIndex(
    (doc) => doc.id === id
  );

  if (index === -1) {
    return false;
  }

  documentStore.splice(index, 1);

  return true;
}

export function clearDocuments(): void {
  documentStore.length = 0;
}

export function getDocumentSummary(
  document: DocumentProject
): DocumentSummary {
  const characters = new Set<string>();
  const environments = new Set<string>();
  const props = new Set<string>();
  const sounds = new Set<string>();

  for (const scene of document.scenes) {
    if (scene.assets.characterId) {
      characters.add(scene.assets.characterId);
    }

    if (scene.assets.environmentId) {
      environments.add(scene.assets.environmentId);
    }

    scene.assets.propIds.forEach((id) =>
      props.add(id)
    );

    scene.assets.soundIds.forEach((id) =>
      sounds.add(id)
    );
  }

  return {
    totalScenes: document.totalScenes,
    totalCharacters: characters.size,
    totalEnvironments: environments.size,
    totalProps: props.size,
    totalSounds: sounds.size,
  };
}