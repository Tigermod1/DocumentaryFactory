import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

import type {
  CharacterAsset,
  EnvironmentAsset,
  LibraryData,
} from "./types.js";

const ROOT = path.resolve(process.cwd(), "library");

const CHARACTER_DIR = path.join(ROOT, "characters");
const ENVIRONMENT_DIR = path.join(ROOT, "environments");

const CHARACTER_JSON = path.join(CHARACTER_DIR, "characters.json");
const ENVIRONMENT_JSON = path.join(
  ENVIRONMENT_DIR,
  "environments.json"
);

function ensureDirectory(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function ensureFile(file: string) {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, "[]", "utf8");
  }
}

export function initializeLibrary() {
  ensureDirectory(ROOT);

  ensureDirectory(CHARACTER_DIR);
  ensureDirectory(ENVIRONMENT_DIR);

  ensureFile(CHARACTER_JSON);
  ensureFile(ENVIRONMENT_JSON);
}

export function readCharacters(): CharacterAsset[] {
  initializeLibrary();

  return JSON.parse(
    fs.readFileSync(CHARACTER_JSON, "utf8")
  ) as CharacterAsset[];
}

export function writeCharacters(data: CharacterAsset[]) {
  initializeLibrary();

  fs.writeFileSync(
    CHARACTER_JSON,
    JSON.stringify(data, null, 2),
    "utf8"
  );
}

export function readEnvironments(): EnvironmentAsset[] {
  initializeLibrary();

  return JSON.parse(
    fs.readFileSync(ENVIRONMENT_JSON, "utf8")
  ) as EnvironmentAsset[];
}

export function writeEnvironments(
  data: EnvironmentAsset[]
) {
  initializeLibrary();

  fs.writeFileSync(
    ENVIRONMENT_JSON,
    JSON.stringify(data, null, 2),
    "utf8"
  );
}

export function newId() {
  return randomUUID();
}

export function getLibrary(): LibraryData {
  return {
    characters: readCharacters(),
    environments: readEnvironments(),
  };
}