-- CreateTable
CREATE TABLE "Timeline" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "sourceFormat" TEXT NOT NULL,
    "sourceText" TEXT,
    "totalDuration" REAL NOT NULL DEFAULT 0,
    "wordCount" INTEGER NOT NULL DEFAULT 0,
    "sceneCount" INTEGER NOT NULL DEFAULT 0,
    "metadata" TEXT NOT NULL DEFAULT '{}',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Scene" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "timelineId" TEXT NOT NULL,
    "sceneNumber" INTEGER NOT NULL,
    "orderIndex" INTEGER NOT NULL,
    "startTime" REAL NOT NULL,
    "endTime" REAL NOT NULL,
    "duration" REAL NOT NULL,
    "wordCount" INTEGER NOT NULL DEFAULT 0,
    "narration" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "emotion" TEXT NOT NULL,
    "importance" INTEGER NOT NULL,
    "keywords" TEXT NOT NULL DEFAULT '[]',
    "metadata" TEXT NOT NULL DEFAULT '{}',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Scene_timelineId_fkey" FOREIGN KEY ("timelineId") REFERENCES "Timeline" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Scene_timelineId_orderIndex_idx" ON "Scene"("timelineId", "orderIndex");

-- CreateIndex
CREATE INDEX "Scene_timelineId_sceneNumber_idx" ON "Scene"("timelineId", "sceneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Scene_timelineId_sceneNumber_key" ON "Scene"("timelineId", "sceneNumber");
