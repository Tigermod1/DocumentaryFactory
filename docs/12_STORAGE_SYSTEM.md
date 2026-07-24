# STORAGE SYSTEM V1.0

---

# PURPOSE

Storage System chịu trách nhiệm quản lý toàn bộ dữ liệu của Documentary Factory.

Không module nào được ghi file trực tiếp.

Tất cả phải thông qua Storage System.

---

# GOALS

- Một Project = Một thư mục
- Không ghi đè dữ liệu
- Hỗ trợ Version
- Hỗ trợ Backup
- Hỗ trợ Restore
- Hỗ trợ Publish
- Hỗ trợ Asset Library
- Hỗ trợ AI Cache

---

# ROOT STRUCTURE

DocumentaryFactory/

Workspace/

Library/

Assets/

Templates/

KnowledgePacks/

MarketPacks/

StylePacks/

Plugins/

Models/

Cache/

Logs/

Settings/

---

# WORKSPACE

Nơi đang sản xuất.

Có thể sửa.

Có thể render nhiều lần.

Có cache.

Có file tạm.

---

# LIBRARY

Nơi lưu Project đã hoàn thành.

Read Only.

Không chỉnh sửa.

---

# PROJECT

Một Project gồm

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

# PROJECT ID

Format

DF-YYYYMMDD-XXXXXX

Ví dụ

DF-20260709-000001

---

# PROJECT NAME

Format

DF-20260709-000001_Why-Rome-Fell

---

# VERSION

v1

v2

v3

...

Không ghi đè.

---

# MANIFEST

Mỗi Project phải có

manifest.json

Lưu

ID

Version

Topic

Market

Style

Language

Provider

Render

Thumbnail

SEO

Status

Created

Updated

Asset List

---

# PROJECT FILE

project.dfp

Lưu toàn bộ trạng thái Project.

Có thể mở lại bất kỳ lúc nào.

---

# ASSET TYPES

Script

Timeline

Storyboard

Prompt

Image

Video

Voice

Subtitle

Thumbnail

SEO

Render

Music

SFX

Character

Environment

Plugin

---

# CACHE

Không backup.

Có thể xóa.

Tự sinh lại.

---

# LOG

Mỗi lần Produce

↓

Sinh

production.log

---

# BACKUP

Workspace

↓

Backup

↓

Zip

---

# RESTORE

Zip

↓

Workspace

---

# EXPORT

Publish

↓

Library

---

# DELETE

Workspace

↓

Recycle Bin

↓

Permanent Delete

---

# SECURITY

Không ghi đè.

Không mất dữ liệu.

Không xóa Asset đang được Project khác sử dụng.

---

# FUTURE

Cloud Sync

NAS

Google Drive

Dropbox

OneDrive

Team Workspace

Project Lock

AI Cache

Asset Database
