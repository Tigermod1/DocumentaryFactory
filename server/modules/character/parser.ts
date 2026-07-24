import type {
  Character,
  CreateCharacterInput,
} from "./types.js";

function generateId(): string {
  return crypto.randomUUID();
}

export function buildCharacter(
  input: CreateCharacterInput
): Character {
  const now = new Date().toISOString();

  return {
    id: generateId(),

    name: input.name,

    description: input.description,

    gender: input.gender,

    age: input.age,

    ethnicity: input.ethnicity,

    hair: input.hair,

    eyes: input.eyes,

    skin: input.skin,

    clothes: input.clothes,

    notes: input.notes,

    references: [],

    createdAt: now,

    updatedAt: now,
  };
}