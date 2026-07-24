import type { SoundItem } from "./SoundPage";

const API = "http://127.0.0.1:3001/api/library/sounds";

export async function getSounds(): Promise<SoundItem[]> {
  const response = await fetch(API);

  if (!response.ok) {
    throw new Error("Failed to load sounds.");
  }

  return response.json();
}

export async function createSound(
  sound: Omit<SoundItem, "id">
): Promise<SoundItem> {
  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: sound.name,
      category: sound.category,
      description: sound.description,
      duration: sound.duration ?? 0,
      tags: sound.tags ?? [],
      file: sound.file,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create sound.");
  }

  return response.json();
}

export async function deleteSound(
  id: string
): Promise<void> {
  const response = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete sound.");
  }
}