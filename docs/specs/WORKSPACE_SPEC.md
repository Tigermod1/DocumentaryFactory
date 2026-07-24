# Workspace Specification

Version: 2.0

---

# Purpose

Workspace is the single source of truth for every documentary project.

Every generated asset is stored inside the project folder.

---

# Structure

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

# Folder Definitions

## 01_SCRIPT

Original script

script.txt

script.json

---

## 02_TIMELINE

timeline.json

timeline.txt

scene list

---

## 03_STORYBOARD

storyboard.json

storyboard images

---

## 04_PROMPTS

prompts.json

image-prompts.txt

video-prompts.txt

---

## 05_IMAGES

Generated images

Reference images

Character images

---

## 06_VIDEO

Generated clips

Final clips

Transitions

---

## 07_AUDIO

Voice

Music

SFX

---

## 08_SUBTITLE

SRT

VTT

TXT

---

## 09_RENDER

Draft

Preview

Final MP4

XML

FCPXML

---

## 10_THUMBNAILS

PNG

PSD

JSON

---

## 11_YOUTUBE

Title

Description

Tags

SEO

Metadata

---

## 12_LOG

Pipeline logs

Errors

Performance

Provider logs

---

# Rules

- Never rename folders.
- Folder numbers are fixed.
- Every engine writes only to its own folder.
- Production Engine orchestrates only.
- Workspace is portable between machines.

---

# Status

Workspace Specification V2

Approved