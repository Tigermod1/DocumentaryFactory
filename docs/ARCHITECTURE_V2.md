# Documentary Factory V2 Architecture

Version: 2.0

---

# Vision

Documentary Factory is an AI-native production system.

Production Engine is an Orchestrator.

It never contains business logic.

Business logic belongs to individual engines.

---

# Core Engines

Production Engine

Timeline Engine

Documentary Brain

Story Engine

Character Engine

Prompt Engine

Asset Engine

Video Engine

Audio Engine

Subtitle Engine

Render Engine

YouTube Engine

Plugin Engine

---

# Project Structure

Workspace/

<Project>/

manifest.json

project.dfp

01_SCRIPT

02_TIMELINE

03_STORYBOARD

04_PROMPTS

05_IMAGES

06_VIDEO

07_AUDIO

08_SUBTITLE

09_RENDER

10_THUMBNAILS

11_YOUTUBE

12_LOG

---

# Production Pipeline

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

Generate Images

↓

Generate Videos

↓

Audio

↓

Subtitle

↓

Render

↓

YouTube Package

---

# Production Context

Every stage receives one object.

ProductionContext

All stages only modify this object.

No stage communicates directly with another stage.

---

# Stage Rules

Each stage

- one responsibility

- stateless

- async

- testable

- reusable

---

# Engine Rules

Each engine

- independent

- replaceable

- injectable

---

# Dependency Rules

Frontend

↓

API

↓

Production Engine

↓

Engine

↓

Workspace

Never

Engine → Frontend

Never

Engine → Engine

---

# Storage

Workspace is the source of truth.

Database is only

- cache

- history

- indexing

---

# Providers

GPT

Claude

Gemini

Flow

Veo

Runway

Stable Diffusion

All providers implement one interface.

---

# Goal

One click

↓

PRODUCE

↓

Complete Documentary