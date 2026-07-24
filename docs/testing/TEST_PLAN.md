# Documentary Factory Test Plan

Version: 2.0

---

# Goal

Ensure every module works independently before integration.

---

# Test Levels

## Unit Test

- Parser
- Timeline Builder
- Prompt Composer
- Production Runner

---

## Integration Test

- Production Pipeline
- Timeline Engine
- Brain Engine
- Prompt Engine
- Asset Engine

---

## End-to-End Test

User

↓

New Project

↓

Import Script

↓

PRODUCE

↓

Render

↓

Complete Documentary

---

# Production Tests

## Create Project

Expected

- Workspace created
- manifest.json created
- project.dfp created

PASS

---

## Save Script

Expected

- script.txt
- script.json

PASS

---

## Generate Timeline

Expected

- timeline.json
- timeline.txt

PENDING

---

## Documentary Brain

Expected

- brain.json

PENDING

---

## Prompt Engine

Expected

- prompts.json

PENDING

---

## Asset Engine

Expected

- Images
- Videos
- Audio

PENDING

---

## Render Engine

Expected

- final.mp4

PENDING

---

# Performance Targets

Project Creation

< 1 second

Timeline

< 3 seconds

Prompt Generation

< 10 seconds

Render

Hardware dependent

---

# Regression Rules

Every commit must

- Build successfully
- Pass unit tests
- Pass integration tests

---

# Release Criteria

- Build OK
- No TypeScript errors
- No broken APIs
- Documentation updated
- Workspace specification followed

---

# Status

Testing Plan V2

Approved