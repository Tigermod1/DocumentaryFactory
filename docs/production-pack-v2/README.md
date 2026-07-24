# Production Pack V2

Version: 2.0

---

## Purpose

Production Pack V2 is the core orchestration layer of Documentary Factory.

It is responsible for coordinating every engine without containing business logic.

---

## Included Files

```
production/

context.ts

controller.ts

index.ts

parser.ts

pipeline.ts

routes.ts

runner.ts

schema.ts

service.ts

stage.ts

types.ts

stages/

createProject.ts

saveScript.ts

generateTimeline.ts

documentaryBrain.ts

promptComposer.ts

packageBuilder.ts
```

---

## Design Goals

- Build with zero TypeScript errors
- Independent modules
- Dependency Injection
- Context-driven pipeline
- Replaceable AI providers
- Testable stages

---

## Dependencies

Production Pack depends on:

- Timeline Engine
- Brain Engine
- Prompt Engine
- Asset Engine

It never contains their business logic.

---

## Execution Flow

```
Request

↓

Create Context

↓

Create Runner

↓

Load Pipeline

↓

Execute Stages

↓

Update Progress

↓

Finish
```

---

## Current Status

Planning Complete

Implementation Pending