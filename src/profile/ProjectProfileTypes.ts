export type UILanguage =
  | "vi"
  | "en";

export type ThemeMode =
  | "light"
  | "dark"
  | "system";

export type TargetMarket =
  | "us"
  | "uk"
  | "ca"
  | "au"
  | "jp"
  | "kr"
  | "de"
  | "fr"
  | "es"
  | "it"
  | "br"
  | "vn";

export type AudienceType =
  | "kids"
  | "teen"
  | "young_adults"
  | "adults"
  | "seniors";

export type AIProvider =
  | "openai"
  | "anthropic"
  | "google";

export type ImageProvider =
  | "flow"
  | "veo"
  | "comfyui"
  | "flux"
  | "sdxl";

export type VideoProvider =
  | "veo"
  | "runway"
  | "luma"
  | "pika";

export type VoiceProvider =
  | "elevenlabs"
  | "azure"
  | "openai";

export interface GeneralProfile {
  projectName: string;

  description: string;
}

export interface WorkspaceProfile {
  language: UILanguage;

  theme: ThemeMode;
}

export interface MarketProfile {
  targetMarket: TargetMarket;

  outputLanguage: string;

  audience: AudienceType;
}

export interface AIProfile {
  llm: AIProvider;

  imageModel: ImageProvider;

  videoModel: VideoProvider;

  voiceModel: VoiceProvider;
}

export interface VideoProfile {
  aspectRatio: string;

  resolution: string;

  fps: number;

  hardSubtitle: boolean;
}

export interface ProjectProfile {
  general: GeneralProfile;

  workspace: WorkspaceProfile;

  market: MarketProfile;

  ai: AIProfile;

  video: VideoProfile;
}

export const defaultProjectProfile: ProjectProfile =
{
  general: {
    projectName: "New Project",

    description: "",
  },

  workspace: {
    language: "vi",

    theme: "dark",
  },

  market: {
    targetMarket: "us",

    outputLanguage: "English",

    audience: "adults",
  },

  ai: {
    llm: "anthropic",

    imageModel: "flow",

    videoModel: "veo",

    voiceModel: "elevenlabs",
  },

  video: {
    aspectRatio: "16:9",

    resolution: "3840x2160",

    fps: 30,

    hardSubtitle: true,
  },
};