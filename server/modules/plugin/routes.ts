import { Router } from "express";

import {
  loadPluginController,
  getPluginsController,
  getPluginController,
  getPluginsByCategoryController,
  enablePluginController,
  disablePluginController,
  uninstallPluginController,
  getPluginRegistryController,
} from "./controller.js";

const router = Router();

router.post("/", loadPluginController);

router.get("/", getPluginsController);

router.get("/registry", getPluginRegistryController);

router.get("/category/:category", getPluginsByCategoryController);

router.get("/:id", getPluginController);

router.patch("/:id/enable", enablePluginController);

router.patch("/:id/disable", disablePluginController);

router.delete("/:id", uninstallPluginController);

export default router;