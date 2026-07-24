import {
  getLibrary,
  newId,
  readCharacters,
  readEnvironments,
  writeCharacters,
  writeEnvironments,
} from "./parser.js";

import type {
  CharacterAsset,
  EnvironmentAsset,
} from "./types.js";

export function listLibrary() {
  return getLibrary();
}

export function listCharacters() {
  return readCharacters();
}

export function listEnvironments() {
  return readEnvironments();
}

export function createCharacter(
  data: Omit<
    CharacterAsset,
    "id" | "createdAt" | "updatedAt"
  >
) {
  const characters = readCharacters();

  const character: CharacterAsset = {
    id: newId(),
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  characters.push(character);

  writeCharacters(characters);

  return character;
}

export function createEnvironment(
  data: Omit<
    EnvironmentAsset,
    "id" | "createdAt" | "updatedAt"
  >
) {
  const environments = readEnvironments();

  const environment: EnvironmentAsset = {
    id: newId(),
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  environments.push(environment);

  writeEnvironments(environments);

  return environment;
}

export function deleteCharacter(id: string) {
  const characters = readCharacters().filter(
    (item) => item.id !== id
  );

  writeCharacters(characters);
}

export function deleteEnvironment(id: string) {
  const environments = readEnvironments().filter(
    (item) => item.id !== id
  );

  writeEnvironments(environments);
}