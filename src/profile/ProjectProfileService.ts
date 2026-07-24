import type {
  ProjectProfile,
} from "./ProjectProfileTypes";

import {
  defaultProjectProfile,
} from "./ProjectProfileTypes";

const API =
  "http://127.0.0.1:3001/api/profile";

export class ProjectProfileService {
  async load(): Promise<ProjectProfile> {
    try {
      const response = await fetch(API);

      if (!response.ok) {
        throw new Error(
          "Unable to load profile."
        );
      }

      return await response.json();
    } catch {
      return structuredClone(
        defaultProjectProfile
      );
    }
  }

  async save(
    profile: ProjectProfile
  ): Promise<ProjectProfile> {
    const response = await fetch(API, {
      method: "PUT",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(profile),
    });

    if (!response.ok) {
      throw new Error(
        "Unable to save profile."
      );
    }

    return await response.json();
  }

  async create(): Promise<ProjectProfile> {
    const response = await fetch(API, {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(
        defaultProjectProfile
      ),
    });

    if (!response.ok) {
      throw new Error(
        "Unable to create profile."
      );
    }

    return await response.json();
  }

  async reset(): Promise<ProjectProfile> {
    const response = await fetch(
      `${API}/reset`,
      {
        method: "POST",
      }
    );

    if (!response.ok) {
      throw new Error(
        "Unable to reset profile."
      );
    }

    return await response.json();
  }
}

export const projectProfileService =
  new ProjectProfileService();