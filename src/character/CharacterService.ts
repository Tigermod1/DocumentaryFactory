import type { CharacterItem } from "./CharacterPage";

const API = "http://127.0.0.1:3001/api/characters";

export async function getCharacters(): Promise<CharacterItem[]> {
  const response = await fetch(API);

  if (!response.ok) {
    throw new Error("Failed to load characters.");
  }

  return response.json();
}

export async function createCharacter(
  character: Omit<CharacterItem, "id">
): Promise<CharacterItem> {
  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(character),
  });

  if (!response.ok) {
    throw new Error("Failed to create character.");
  }

  return response.json();
}

export async function deleteCharacter(
  id: string
): Promise<void> {
  const response = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete character.");
  }
}