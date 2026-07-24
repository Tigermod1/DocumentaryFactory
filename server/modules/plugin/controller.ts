import type { Request, Response } from "express";

import { loadPluginSchema } from "./schema.js";

import {
  loadPlugin,
  getPlugins,
  getPlugin,
  getPluginsByCategory,
  enablePlugin,
  disablePlugin,
  uninstallPlugin,
  getPluginRegistry,
} from "./service.js";

export function loadPluginController(
  req: Request,
  res: Response
): void {
  const input = loadPluginSchema.parse(req.body);

  const plugin = loadPlugin(input);

  res.status(201).json(plugin);
}

export function getPluginsController(
  _req: Request,
  res: Response
): void {
  res.json(getPlugins());
}

export function getPluginController(
  req: Request,
  res: Response
): void {
  const plugin = getPlugin(req.params.id);

  if (!plugin) {
    res.status(404).json({
      message: "Plugin not found",
    });

    return;
  }

  res.json(plugin);
}

export function getPluginsByCategoryController(
  req: Request,
  res: Response
): void {
  const category = req.params.category as
    | "image"
    | "video"
    | "audio"
    | "render"
    | "export";

  res.json(getPluginsByCategory(category));
}

export function enablePluginController(
  req: Request,
  res: Response
): void {
  const plugin = enablePlugin(req.params.id);

  if (!plugin) {
    res.status(404).json({
      message: "Plugin not found",
    });

    return;
  }

  res.json(plugin);
}

export function disablePluginController(
  req: Request,
  res: Response
): void {
  const plugin = disablePlugin(req.params.id);

  if (!plugin) {
    res.status(404).json({
      message: "Plugin not found",
    });

    return;
  }

  res.json(plugin);
}

export function uninstallPluginController(
  req: Request,
  res: Response
): void {
  const ok = uninstallPlugin(req.params.id);

  if (!ok) {
    res.status(404).json({
      message: "Plugin not found",
    });

    return;
  }

  res.status(204).send();
}

export function getPluginRegistryController(
  _req: Request,
  res: Response
): void {
  res.json(getPluginRegistry());
}