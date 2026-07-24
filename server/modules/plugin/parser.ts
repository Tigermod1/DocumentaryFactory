import type {
  InstalledPlugin,
  LoadPluginInput,
  PluginManifest,
  PluginRegistry,
} from "./types.js";

const registry: PluginRegistry = {
  image: [],
  video: [],
  audio: [],
  render: [],
  export: [],
};

function createManifest(
  input: LoadPluginInput
): PluginManifest {
  const folder = input.path
    .replace(/\\/g, "/")
    .split("/")
    .pop()!;

  const category = input.path
    .replace(/\\/g, "/")
    .split("/")
    .slice(-2)[0] as PluginManifest["category"];

  return {
    id: crypto.randomUUID(),

    name: folder,

    version: "1.0.0",

    author: "Unknown",

    description: "",

    category,

    entry: "index.js",

    capabilities: [],

    supportedPlatforms: [
      "windows",
      "linux",
      "macos",
    ],

    enabled: true,
  };
}

export function parsePlugin(
  input: LoadPluginInput
): InstalledPlugin {
  return {
    id: crypto.randomUUID(),

    status: "enabled",

    installedAt:
      new Date().toISOString(),

    manifest: createManifest(input),
  };
}

export function registerPlugin(
  plugin: InstalledPlugin
): void {
  registry[
    plugin.manifest.category
  ].push(plugin);
}

export function getRegistry(): PluginRegistry {
  return structuredClone(registry);
}