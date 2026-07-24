import "dotenv/config";

import express from "express";
import cors from "cors";
import path from "path";

import { assetRouter } from "./modules/assets/assetRoutes.js";
import { timelineRouter } from "./modules/timeline/controller.js";
import { imageRouter } from "./modules/image/controller.js";
import { memoryRouter } from "./modules/memory/index.js";

import srtRouter from "./modules/srt/index.js";
import projectRouter from "./modules/project/index.js";
import characterRouter from "./modules/character/index.js";
import libraryRouter from "./modules/library/index.js";
import sceneRouter from "./modules/scene/index.js";
import documentRouter from "./modules/document/index.js";
import storyRouter from "./modules/story/index.js";
import directorRouter from "./modules/director/index.js";
import pipelineRouter from "./modules/pipeline/index.js";
import bibleRouter from "./modules/bible/index.js";
import pluginRouter from "./modules/plugin/index.js";
import profileRouter from "./modules/profile/index.js";

import { productionRoutes } from "./modules/production/index.js";

import assetDatabaseRouter from "./modules/assetDatabase/routes.js";

const app = express();

const port = Number(process.env.PORT ?? 3001);

/* =========================================================
   CORS
========================================================= */

app.use(
  cors({
    origin: [
      "http://127.0.0.1:5173",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

/* =========================================================
   BODY PARSER
========================================================= */

app.use(
  express.json({
    limit: "50mb",
  })
);

/* =========================================================
   STATIC ASSETS
========================================================= */

app.use(
  "/Assets",
  express.static(path.resolve(process.cwd(), "../Assets"))
);

/* =========================================================
   HEALTH
========================================================= */

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "Documentary Factory API",
  });
});

/* =========================================================
   Assets
========================================================= */

app.use("/api/assets", assetRouter);

/* =========================================================
   Timeline
========================================================= */

app.use("/api/timelines", timelineRouter);

/* =========================================================
   Image
========================================================= */

app.use("/api/image", imageRouter);

/* =========================================================
   Memory
========================================================= */

app.use("/api/memory", memoryRouter);

/* =========================================================
   SRT
========================================================= */

app.use("/api/srt", srtRouter);

/* =========================================================
   Project
========================================================= */

app.use("/api/project", projectRouter);

/* =========================================================
   Profile
========================================================= */

app.use("/api/profile", profileRouter);

/* =========================================================
   Character
========================================================= */

app.use("/api/characters", characterRouter);

/* =========================================================
   Library
========================================================= */

app.use("/api/library", libraryRouter);

/* =========================================================
   Scene
========================================================= */

app.use("/api/scenes", sceneRouter);

/* =========================================================
   Document
========================================================= */

app.use("/api/document", documentRouter);

/* =========================================================
   Story
========================================================= */

app.use("/api/story", storyRouter);

/* =========================================================
   Director
========================================================= */

app.use("/api/director", directorRouter);

/* =========================================================
   Pipeline
========================================================= */

app.use("/api/pipeline", pipelineRouter);

/* =========================================================
   Production
========================================================= */

app.use("/api/production", productionRoutes);

/* =========================================================
   Bible
========================================================= */

app.use("/api/bible", bibleRouter);

/* =========================================================
   Plugin
========================================================= */

app.use("/api/plugins", pluginRouter);

/* =========================================================
   Asset Database
========================================================= */

app.use("/api/asset-database", assetDatabaseRouter);

/* =========================================================
   404
========================================================= */

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  });
});

/* =========================================================
   ERROR
========================================================= */

app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err);

    res.status(500).json({
      error: err.message ?? "Internal Server Error",
    });
  }
);

/* =========================================================
   SERVER
========================================================= */

app.listen(port, "127.0.0.1", () => {
  console.log(`
====================================================

        DOCUMENTARY FACTORY API

        http://127.0.0.1:${port}

====================================================
`);
});