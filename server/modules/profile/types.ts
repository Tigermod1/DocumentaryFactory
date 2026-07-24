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

export type ContentCategory =
  | "history"
  | "psychology"
  | "philosophy"
  | "science"
  | "technology"
  | "finance"
  | "business"
  | "education"
  | "health"
  | "custom";

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

export type VoiceProvider =
  | "elevenlabs"
  | "azure"
  | "openai";

export type ExportPlatform =
  | "youtube"
  | "shorts"
  | "tiktok"
  | "instagram";

export interface GeneralProfile {
  id: string;

  name: string;

  description: string;

  version: string;

  author: string;

  createdAt: string;

  updatedAt: string;
}

export interface WorkspaceProfile {
  language: UILanguage;

  theme: ThemeMode;

  autosave: boolean;

  backup: boolean;
}

export interface MarketProfile {
  market: TargetMarket;

  language: string;

  region: string;

  platform: ExportPlatform;
}

export interface AudienceProfile {
  type: AudienceType;

  ageRange: string;

  interests: string[];
}

export interface ContentProfile {
  category: ContentCategory;

  topic: string;

  narrativeStyle: string;
}

export interface AIProfile {
  provider: AIProvider;

  model: string;

  temperature: number;

  creativity: number;
}

export interface ImageProfile {
  provider: ImageProvider;

  style: string;

  aspectRatio: string;

  consistency: boolean;
}

export interface VoiceProfile {
  provider: VoiceProvider;

  voice: string;

  speed: number;

  emotion: string;
}

export interface RenderProfile {
  resolution: string;

  fps: number;

  codec: string;

  hardSubtitle: boolean;
}

export interface ProjectProfile {
  general: GeneralProfile;

  workspace: WorkspaceProfile;

  market: MarketProfile;

  audience: AudienceProfile;

  content: ContentProfile;

  ai: AIProfile;

  image: ImageProfile;

  voice: VoiceProfile;

  render: RenderProfile;
}