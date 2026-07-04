# Documentary Factory

Documentary Factory is an Electron desktop application foundation built with React, Vite, TypeScript, Express, Prisma, SQLite, and Electron Builder.

## Sprint 01 scope

This repository currently contains only the initial project foundation:

- Electron main process
- React + Vite renderer
- TypeScript configuration
- Express development API server
- Server TypeScript build output
- Prisma configured for SQLite
- Electron Builder packaging configuration
- npm scripts for development, build, packaging, and Prisma workflows

No application features are implemented yet.

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

Generate Prisma Client:

```bash
npm run prisma:generate
```

Start the development environment:

```bash
npm run dev
```

The development command starts:

- Express API at `http://127.0.0.1:3001`
- Vite renderer at `http://127.0.0.1:5173`
- Electron shell pointed at the Vite development server

## Linux desktop runtime notes

Electron requires native desktop libraries and an active graphical display on Linux. In headless containers or CI images that do not provide those libraries/display, the development script keeps the Express and Vite processes running and prints a clear warning instead of crashing the whole dev stack.

## Scripts

- `npm run dev` - start the API, renderer, and Electron development shell
- `npm run build` - build the renderer, Electron main process, and Express API server
- `npm run package` - build and package the desktop app with Electron Builder
- `npm run prisma:generate` - generate Prisma Client
- `npm run prisma:migrate` - create and apply a SQLite migration during development
- `npm run prisma:studio` - open Prisma Studio
