export type PluginCategory =
  | "image"
  | "video"
  | "audio"
  | "render"
  | "export";

export type PluginStatus =
  | "installed"
  | "enabled"
  | "disabled"
  | "error";

export interface PluginCapability {
  id: string;

  name: string;

  description: string;
}

export interface PluginManifest {
  id: string;

  name: string;

  version: string;

  author: string;

  description: string;

  category: PluginCategory;

  entry: string;

  capabilities: PluginCapability[];

  supportedPlatforms: string[];

  enabled: boolean;
}

export interface PluginContext {
  projectId: string;

  pipelineId: string;

  sceneId?: string;

  outputFolder: string;

  cacheFolder: string;

  tempFolder: string;

  variables: Record<string, unknown>;
}

export interface PluginResult {
  success: boolean;

  message: string;

  outputs: string[];

  metadata: Record<string, unknown>;
}

export interface Plugin {
  manifest: PluginManifest;

  initialize(
    context: PluginContext
  ): Promise<void>;

  execute(
    context: PluginContext
  ): Promise<PluginResult>;

  dispose(): Promise<void>;
}

export interface InstalledPlugin {
  id: string;

  status: PluginStatus;

  installedAt: string;

  manifest: PluginManifest;
}

export interface LoadPluginInput {
  path: string;
}

export interface PluginRegistry {
  image: InstalledPlugin[];

  video: InstalledPlugin[];

  audio: InstalledPlugin[];

  render: InstalledPlugin[];

  export: InstalledPlugin[];
}