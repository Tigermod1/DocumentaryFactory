import { parseProfile } from "./parser.js";

import type { ProjectProfile } from "./types.js";

let currentProfile: ProjectProfile =
  parseProfile();

export function getProfile(): ProjectProfile {
  return structuredClone(currentProfile);
}

export function createProfile(
  data?: Partial<ProjectProfile>
): ProjectProfile {
  currentProfile = parseProfile(data);

  return getProfile();
}

export function updateProfile(
  data: Partial<ProjectProfile>
): ProjectProfile {
  currentProfile = parseProfile({
    ...currentProfile,
    ...data,

    general: {
      ...currentProfile.general,
      ...data.general,
    },

    workspace: {
      ...currentProfile.workspace,
      ...data.workspace,
    },

    market: {
      ...currentProfile.market,
      ...data.market,
    },

    audience: {
      ...currentProfile.audience,
      ...data.audience,
    },

    content: {
      ...currentProfile.content,
      ...data.content,
    },

    ai: {
      ...currentProfile.ai,
      ...data.ai,
    },

    image: {
      ...currentProfile.image,
      ...data.image,
    },

    voice: {
      ...currentProfile.voice,
      ...data.voice,
    },

    render: {
      ...currentProfile.render,
      ...data.render,
    },
  });

  return getProfile();
}

export function resetProfile(): ProjectProfile {
  currentProfile = parseProfile();

  return getProfile();
}