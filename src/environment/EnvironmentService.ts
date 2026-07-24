import type { EnvironmentItem } from "./EnvironmentPage";

const API = "http://127.0.0.1:3001/api/library/environments";

export async function getEnvironments(): Promise<EnvironmentItem[]> {
  const response = await fetch(API);

  if (!response.ok) {
    throw new Error("Failed to load environments.");
  }

  return response.json();
}

export async function createEnvironment(
  environment: Omit<EnvironmentItem, "id">
): Promise<EnvironmentItem> {
  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: environment.name,
      description: environment.description,
      tags: [],
      images: [],
      referenceImage: environment.image,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create environment.");
  }

  return response.json();
}

export async function deleteEnvironment(
  id: string
): Promise<void> {
  const response = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete environment.");
  }
}