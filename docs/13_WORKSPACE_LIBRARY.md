# WORKSPACE & LIBRARY SYSTEM V1.0

---

# PURPOSE

Tách hoàn toàn khu vực làm việc và khu vực lưu trữ.

Workspace = Nơi sản xuất.

Library = Nơi lưu trữ thành phẩm.

---

# DESIGN PRINCIPLE

Workspace có thể thay đổi.

Library không thay đổi.

---

# WORKSPACE

Workspace là nơi Documentary Factory thực hiện toàn bộ quá trình sản xuất.

Bao gồm:

- Script
- Timeline
- Prompt
- Image
- Video
- Audio
- Subtitle
- Thumbnail
- SEO
- Render

Project trong Workspace luôn có thể chỉnh sửa.

---

# WORKSPACE STRUCTURE

Workspace/

History/

Psychology/

Finance/

Health/

Science/

Technology/

Business/

Biography/

Military/

Crime/

Nature/

Education/

Kids/

Custom/

---

# PROJECT STRUCTURE

Workspace/

History/

DF-20260709-000001_Why-Rome-Fell/

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

# PROJECT STATUS

created

planning

generating

paused

rendering

completed

failed

published

archived

---

# WORKSPACE FEATURES

Create Project

Rename Project

Duplicate Project

Move Project

Delete Project

Archive Project

Publish Project

Restore Project

Clone Project

Open Project

Recent Project

Favorite Project

Search Project

Filter Project

---

# LIBRARY

Library chỉ chứa Project đã hoàn thành.

Library là Read Only.

Không chỉnh sửa trực tiếp.

---

# LIBRARY STRUCTURE

Library/

History/

Psychology/

Finance/

Health/

Science/

Technology/

Business/

Biography/

Military/

Crime/

Nature/

Education/

Kids/

---

# LIBRARY PROJECT

Library/

History/

DF-20260709-000001_Why-Rome-Fell/

Video.mp4

Thumbnail_A.png

Thumbnail_B.png

Thumbnail_C.png

Titles.txt

Description.txt

Tags.txt

Keywords.txt

subtitle.srt

manifest.json

project.dfp

---

# PUBLISH PROCESS

Workspace

↓

Validation

↓

Copy Files

↓

Generate Manifest

↓

Generate Hash

↓

Copy To Library

↓

Mark Published

---

# ARCHIVE

Archive chỉ chuyển Project ra khỏi Workspace.

Không xóa dữ liệu.

---

# DELETE

Delete Project

↓

Recycle Bin

↓

Restore

↓

Permanent Delete

---

# DUPLICATE

Duplicate Project

↓

New Project ID

↓

Version Reset

↓

Keep Assets

↓

Ready For Editing

---

# VERSION

v1

v2

v3

...

Mỗi Version là một Project độc lập.

Không ghi đè.

---

# SEARCH

Search theo:

Project ID

Project Name

Topic

Market

Style

Language

Status

Keyword

Created Date

Updated Date

---

# FAVORITE

Có thể đánh dấu Project yêu thích.

---

# RECENT

Hiển thị Project mở gần nhất.

---

# AUTO SAVE

Mỗi thay đổi đều tự động lưu.

Không cần Save thủ công.

---

# CRASH RECOVERY

Nếu chương trình bị tắt.

Lần mở sau.

↓

Tự động Restore Workspace.

---

# FUTURE

Cloud Workspace

NAS Workspace

Team Workspace

Git Version

Project Lock

Multi User

Auto Sync

Background Backup

Workspace Snapshot

Incremental Backup

AI Project Memory