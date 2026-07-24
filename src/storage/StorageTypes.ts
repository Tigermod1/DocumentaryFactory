export type ProjectStatus =
  | "created"
  | "processing"
  | "paused"
  | "completed"
  | "failed";

export type AssetType =
  | "script"
  | "timeline"
  | "prompt"
  | "image"
  | "video"
  | "audio"
  | "subtitle"
  | "thumbnail"
  | "seo"
  | "project";

export interface ProjectVersion {
  major: number;
  minor: number;
  patch: number;
}

export interface ProjectAsset {
  id: string;
  type: AssetType;
  name: string;
  fileName: string;
  relativePath: string;
  createdAt: string;
}

export interface OutputFolder {
  root: string;

  project: string;

  script: string;

  timeline: string;

  prompts: string;

  images: string;

  video: string;

  audio: string;

  subtitle: string;

  render: string;

  thumbnails: string;

  youtube: string;

  logs: string;
}

export interface ProjectManifest {
  id: string;

  projectName: string;

  topic: string;

  market: string;

  style: string;

  language: string;

  createdAt: string;

  updatedAt: string;

  status: ProjectStatus;

  version: ProjectVersion;

  outputFolder: string;

  assets: ProjectAsset[];
}

export interface StorageConfig {
  workspace: string;

  projectsFolder: string;

  outputFolder: string;

  assetFolder: string;

  cacheFolder: string;

  templateFolder: string;

  pluginFolder: string;

  knowledgeFolder: string;

  marketFolder: string;

  styleFolder: string;

  logFolder: string;
}