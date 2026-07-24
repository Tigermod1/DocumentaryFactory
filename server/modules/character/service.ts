import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { buildCharacter } from "./parser.js";
import type { Character, CreateCharacterInput } from "./types.js";

export function createCharacter(
  input: CreateCharacterInput
): Character {
  const character = buildCharacter(input);

  const characterDir = join(
    process.cwd(),
    "library",
    "characters",
    character.name
  );

  if (!existsSync(characterDir)) {
    mkdirSync(characterDir, { recursive: true });
  }

  writeFileSync(
    join(characterDir, "character.json"),
    JSON.stringify(character, null, 2),
    "utf8"
  );

  return character;
}