import type {
  ProjectProfile,
} from "./types.js";

export function createDefaultProfile(): ProjectProfile {
  const now = new Date().toISOString();

  return {
    general: {
      id: crypto.randomUUID(),

      name: "New Project",

      description: "",

      version: "1.0.0",

      author: "",

      createdAt: now,

      updatedAt: now,
    },

    workspace: {
      language: "vi",

      theme: "dark",

      autosave: true,

      backup: true,
    },

    market: {
      market: "us",

      language: "English",

      region: "North America",

      platform: "youtube",
    },

    audience: {
      type: "adults",

      ageRange: "25-45",

      interests: [],
    },

    content: {
      category: "history",

      topic: "",

      narrativeStyle: "BBC Documentary",
    },

    ai: {
      provider: "anthropic",

      model: "claude",

      temperature: 0.7,

      creativity: 80,
    },

    image: {
      provider: "flow",

      style: "cinematic",

      aspectRatio: "16:9",

      consistency: true,
    },

    voice: {
      provider: "elevenlabs",

      voice: "Adam",

      speed: 1,

      emotion: "calm",
    },

    render: {
      resolution: "3840x2160",

      fps: 30,

      codec: "h264",

      hardSubtitle: true,
    },
  };
}

export function parseProfile(
  data?: Partial<ProjectProfile>
): ProjectProfile {
  const profile = createDefaultProfile();

  if (!data) {
    return profile;
  }

  return {
    ...profile,

    ...data,

    general: {
      ...profile.general,
      ...data.general,
      updatedAt: new Date().toISOString(),
    },

    workspace: {
      ...profile.workspace,
      ...data.workspace,
    },

    market: {
      ...profile.market,
      ...data.market,
    },

    audience: {
      ...profile.audience,
      ...data.audience,
    },

    content: {
      ...profile.content,
      ...data.content,
    },

    ai: {
      ...profile.ai,
      ...data.ai,
    },

    image: {
      ...profile.image,
      ...data.image,
    },

    voice: {
      ...profile.voice,
      ...data.voice,
    },

    render: {
      ...profile.render,
      ...data.render,
    },
  };
}