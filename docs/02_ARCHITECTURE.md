# DocumentaryFactory Architecture

Version: 1.0

---

# Overview

DocumentaryFactory is designed as a modular desktop application.

Every module has a single responsibility.

Every module communicates through well-defined interfaces.

No module should directly depend on implementation details of another module.

---

# High Level Architecture

                 User Interface
                       │
      ┌────────────────┴────────────────┐
      │                                 │
 Project Manager                 AI Agent System
      │                                 │
      └──────────────┬──────────────────┘
                     │
              Application Core
                     │
────────────────────────────────────────────────

 Timeline Engine

 Storyboard Engine

 Asset Library

 Prompt Library

 Character Manager

 Voice Manager

 Video Composer

 Export Manager

────────────────────────────────────────────────
                     │
             Database Layer
                     │
              SQLite + Prisma
                     │
              Local File System

---

# Application Layers

Presentation Layer

↓

Application Layer

↓

Business Logic

↓

Data Layer

↓

Storage Layer

---

# Presentation Layer

Technology

React

Electron

TypeScript

Responsibilities

User interaction

Dashboard

Timeline Editor

Asset Browser

Storyboard Editor

Settings

Project Manager

---

# Business Layer

Contains all project logic.

Examples

Timeline Engine

Asset Manager

Subtitle Parser

Storyboard Generator

Export Service

---

# Data Layer

Stores

Projects

Scenes

Assets

Timeline

Characters

Prompts

Settings

Database

SQLite

ORM

Prisma

---

# Storage Layer

Folders

/projects

/assets

/output

/cache

/temp

/logs

---

# Main Engines

Timeline Engine

Input

SRT

Output

Timeline

-----------------------------------

Storyboard Engine

Input

Timeline

Output

Storyboard

-----------------------------------

Asset Engine

Input

Storyboard

Output

Scene Assets

-----------------------------------

Render Engine

Input

Timeline

Assets

Voice

Output

Final Video

---

# AI Layer

Research Agent

↓

Script Agent

↓

Timeline Agent

↓

Storyboard Agent

↓

Asset Agent

↓

Render Agent

↓

QA Agent

---

# Event Flow

Create Project

↓

Import Script

↓

Import Audio

↓

Generate Subtitle

↓

Timeline

↓

Storyboard

↓

Assets

↓

Render

↓

Export

---

# Design Rules

Modules never modify each other's data directly.

Always communicate through services.

All database access goes through Prisma.

No UI component accesses SQLite directly.

---

# Dependency Direction

UI

↓

Controllers

↓

Services

↓

Repositories

↓

Database

Never reverse.

---

# Future Expansion

Plugin System

Multiple AI Providers

Cloud Sync

Mobile Companion

REST API

Team Collaboration

Version Control

Auto Backup

---

End of Document