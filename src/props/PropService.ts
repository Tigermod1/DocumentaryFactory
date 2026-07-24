import type { PropItem } from "./PropPage";

const API = "http://127.0.0.1:3001/api/library/props";

export async function getProps(): Promise<PropItem[]> {
  const response = await fetch(API);

  if (!response.ok) {
    throw new Error("Failed to load props.");
  }

  return response.json();
}

export async function createProp(
  prop: Omit<PropItem, "id">
): Promise<PropItem> {
  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: prop.name,
      category: prop.category,
      description: prop.description,
      tags: [],
      images: [],
      referenceImage: prop.image,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create prop.");
  }

  return response.json();
}

export async function deleteProp(
  id: string
): Promise<void> {
  const response = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete prop.");
  }
}