# Documentary Factory V2

```text
                    USER
                      │
                      ▼
                 React Frontend
                      │
                      ▼
                Production API
                      │
                      ▼
              Production Runner
                      │
                      ▼
             Production Context
                      │
     ┌────────────────┼────────────────┐
     ▼                ▼                ▼
Timeline Engine   Brain Engine   Prompt Engine
     │                │                │
     └────────────────┼────────────────┘
                      ▼
                 Asset Engine
                      │
          ┌───────────┼───────────┐
          ▼           ▼           ▼
     Image AI     Video AI     Audio AI
          │           │           │
          └───────────┼───────────┘
                      ▼
                Render Engine
                      │
                      ▼
              YouTube Package
                      │
                      ▼
                 Final Output
```

---

# Source of Truth

```
Workspace/

Project/

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
```

---

# Principles

- Production orchestrates.
- Engines own business logic.
- Workspace is the source of truth.
- Database stores metadata only.
- Providers are replaceable.
- Every engine is independently testable.

---

# Status

Architecture V2

Approved