import {
  getRegistry,
  parsePlugin,
  registerPlugin,
} from "./parser.js";

import type {
  InstalledPlugin,
  LoadPluginInput,
  PluginCategory,
} from "./types.js";

const installedPlugins: InstalledPlugin[] = [];

export function loadPlugin(
  input: LoadPluginInput
): InstalledPlugin {
  const plugin = parsePlugin(input);

  installedPlugins.push(plugin);

  registerPlugin(plugin);

  return plugin;
}

export function getPlugins(): InstalledPlugin[] {
  return structuredClone(installedPlugins);
}

export function getPlugin(
  id: string
): InstalledPlugin | undefined {
  return installedPlugins.find(
    (plugin) => plugin.id === id
  );
}

export function getPluginsByCategory(
  category: PluginCategory
): InstalledPlugin[] {
  return installedPlugins.filter(
    (plugin) =>
      plugin.manifest.category === category
  );
}

export function enablePlugin(
  id: string
): InstalledPlugin | null {
  const plugin = installedPlugins.find(
    (item) => item.id === id
  );

  if (!plugin) {
    return null;
  }

  plugin.status = "enabled";

  plugin.manifest.enabled = true;

  return structuredClone(plugin);
}

export function disablePlugin(
  id: string
): InstalledPlugin | null {
  const plugin = installedPlugins.find(
    (item) => item.id === id
  );

  if (!plugin) {
    return null;
  }

  plugin.status = "disabled";

  plugin.manifest.enabled = false;

  return structuredClone(plugin);
}

export function uninstallPlugin(
  id: string
): boolean {
  const index =
    installedPlugins.findIndex(
      (item) => item.id === id
    );

  if (index === -1) {
    return false;
  }

  installedPlugins.splice(index, 1);

  return true;
}

export function getPluginRegistry() {
  return getRegistry();
}