# Production Engine

## Purpose

Production Engine is the orchestrator of Documentary Factory.

It coordinates all engines.

It does not contain business logic.

---

# Responsibilities

- Create Project
- Save Script
- Generate Timeline
- Documentary Brain
- Prompt Composer
- Asset Generation
- Video Generation
- Audio Generation
- Render
- Packaging

---

# Input

ProduceRequest

---

# Output

Workspace Project

---

# Context

Every stage receives the same ProductionContext.

No stage communicates directly with another stage.

---

# Current Stages

1. CreateProject
2. SaveScript
3. GenerateTimeline
4. DocumentaryBrain
5. PromptComposer
6. PackageBuilder

---

# Future Stages

- ImageGeneration
- VideoGeneration
- AudioGeneration
- SubtitleGeneration
- RenderVideo
- PublishYouTube

---

# Design Rules

- Single Responsibility
- Async
- Stateless
- Dependency Injection
- Testable
- Modular

---

# Status

Production Engine V2

Development