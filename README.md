# Documentary Factory

Documentary Factory is an Electron desktop application foundation built with React, Vite, TypeScript, Express, Prisma, SQLite, and Electron Builder.

## Sprint 03 scope

The application now includes the Timeline Engine module alongside the Asset Library:

- SRT and TXT parsing
- Timestamp conversion
- Narration detection and semantic scene building
- Scene insert, delete, reorder, merge, and split operations
- Timeline ordering, numbering, statistics, and scene metadata
- Prisma Timeline and Scene models with SQLite persistence
- Timeline editor, scene list, scene details, and statistics views

## Sprint 02 scope

The application now includes the Asset Library module:

- Electron main process
- React + Vite renderer
- TypeScript configuration
- Express development API server
- Server TypeScript build output
- Prisma configured for SQLite
- Prisma Asset model and migration
- Asset folders, categories, metadata, thumbnails, search, rename, move, delete, and local import
- Local storage copy/delete management with storage usage stats
- Electron Builder packaging configuration
- npm scripts for development, build, packaging, and Prisma workflows

## Prerequisites

- Node.js 20 or newer
- npm 10 or newer

## Getting started

Install dependencies:

```bash
npm install
```

Copy the example environment file when you need a local SQLite database:

```bash
cp .env.example .env
```

`ASSET_STORAGE_DIR` is optional. If it is not set, imported asset files and thumbnails are stored under `data/assets` in the project working directory.

Generate Prisma Client:

```bash
npm run prisma:generate
```

Apply database migrations:

```bash
npm run prisma:migrate
```

Start the development environment:

```bash
npm run dev
```

The development command starts:

- Express API at `http://127.0.0.1:3001`
- Vite renderer at `http://127.0.0.1:5173`
- Electron shell pointed at the Vite development server

## Asset Library API

- `GET /api/assets` - list and search assets
- `GET /api/assets/tree` - fetch the folder tree
- `GET /api/assets/storage` - inspect local storage usage
- `POST /api/assets/import` - import a local file by source path
- `POST /api/assets/folders` - create a folder
- `PATCH /api/assets/:id` - rename, move, recategorize, update metadata, or update thumbnail
- `DELETE /api/assets/:id` - delete an asset and managed stored files

## Timeline Engine API

- `GET /api/timelines` - list timelines
- `GET /api/timelines/:timelineId` - load a timeline with scenes
- `POST /api/timelines` - create a timeline from SRT or TXT content
- `POST /api/timelines/parse` - preview a parsed timeline without saving
- `POST /api/timelines/empty` - create an empty timeline
- `PATCH /api/timelines/:timelineId` - rename or update metadata
- `DELETE /api/timelines/:timelineId` - delete a timeline and its scenes
- `POST /api/timelines/:timelineId/scenes` - insert a manual scene
- `POST /api/timelines/:timelineId/scenes/reorder` - reorder a scene
- `PATCH /api/timelines/:timelineId/scenes/:sceneId` - update scene details
- `POST /api/timelines/:timelineId/scenes/:sceneId/merge` - merge two scenes
- `POST /api/timelines/:timelineId/scenes/:sceneId/split` - split a scene
- `DELETE /api/timelines/:timelineId/scenes/:sceneId` - delete a scene

## Linux desktop runtime notes

Electron requires native desktop libraries and an active graphical display on Linux. In headless containers or CI images that do not provide those libraries/display, the development script keeps the Express and Vite processes running and prints a clear warning instead of crashing the whole dev stack.

## Scripts

- `npm run dev` - start the API, renderer, and Electron development shell
- `npm run build` - build the renderer, Electron main process, and Express API server
- `npm run package` - build and package the desktop app with Electron Builder
- `npm run prisma:generate` - generate Prisma Client
- `npm run prisma:migrate` - create and apply a SQLite migration during development
- `npm run prisma:studio` - open Prisma Studio
