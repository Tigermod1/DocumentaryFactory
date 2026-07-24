# Production Engine V2

## Purpose

Production Engine is the orchestrator of Documentary Factory.

It does not implement business logic itself.

Each module (Timeline, Brain, Prompt, Render...) is responsible for its own logic.

Production only coordinates execution.

---

## Pipeline

Create Project

↓

Save Script

↓

Generate Timeline

↓

Documentary Brain

↓

Prompt Composer

↓

Package Builder

---

## Core Files

context.ts

pipeline.ts

runner.ts

service.ts

stage.ts

types.ts

schema.ts

---

## Stage Rules

Each stage:

- receives ProductionContext
- modifies ProductionContext
- never calls the frontend
- never accesses unrelated modules directly
- can be tested independently

---

## Project Structure

Workspace/

project/

manifest.json

project.dfp

01_SCRIPT/

02_TIMELINE/

03_STORYBOARD/

04_PROMPTS/

05_IMAGES/

06_VIDEO/

07_AUDIO/

08_SUBTITLE/

09_RENDER/

10_THUMBNAILS/

11_YOUTUBE/

12_LOG/

---

## Design Principles

- Single Responsibility
- Modular
- Dependency Injection
- Context Driven
- Event Ready
- Easily Extensible