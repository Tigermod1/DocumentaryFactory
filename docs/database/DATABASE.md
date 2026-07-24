# Database Design

## Purpose

Database is NOT the source of truth.

Workspace is the source of truth.

Database is used for:

- Cache
- Search
- History
- Analytics
- Queue

---

# Source of Truth

Workspace/

↓

Project

↓

Files

---

# Database Tables

Projects

Jobs

Assets

Characters

Timeline

Prompts

Providers

Logs

Users

---

# Relationships

Project

↓

Timeline

↓

Storyboard

↓

Prompts

↓

Assets

↓

Render

---

# Storage Rules

Never store video files.

Never store images.

Never store audio.

Store only metadata.

---

# Workspace

Workspace/

<Project>/

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

# Future

SQLite

↓

PostgreSQL

↓

Cloud Database

---

# Status

Database V2

Planning