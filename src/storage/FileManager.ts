import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

import {
  OUTPUT_STRUCTURE,
} from "./FolderTemplate";

import type {
  AssetType,
  ProjectAsset,
} from "./StorageTypes";

export class FileManager {
  exists(file: string): boolean {
    return fs.existsSync(file);
  }

  ensureFolder(folder: string) {
    fs.mkdirSync(folder, {
      recursive: true,
    });
  }

  writeText(
    file: string,
    content: string
  ) {
    this.ensureFolder(
      path.dirname(file)
    );

    fs.writeFileSync(
      file,
      content,
      "utf8"
    );
  }

  writeJSON(
    file: string,
    data: unknown
  ) {
    this.ensureFolder(
      path.dirname(file)
    );

    fs.writeFileSync(
      file,
      JSON.stringify(data, null, 2),
      "utf8"
    );
  }

  readText(
    file: string
  ): string {
    return fs.readFileSync(
      file,
      "utf8"
    );
  }

  readJSON<T>(
    file: string
  ): T {
    return JSON.parse(
      this.readText(file)
    ) as T;
  }

  copy(
    source: string,
    target: string
  ) {
    this.ensureFolder(
      path.dirname(target)
    );

    fs.cpSync(source, target, {
      recursive: true,
      force: true,
    });
  }

  move(
    source: string,
    target: string
  ) {
    this.ensureFolder(
      path.dirname(target)
    );

    fs.renameSync(source, target);
  }

  delete(
    target: string
  ) {
    if (!this.exists(target))
      return;

    fs.rmSync(target, {
      recursive: true,
      force: true,
    });
  }

  checksum(
    file: string
  ): string {
    const buffer =
      fs.readFileSync(file);

    return crypto
      .createHash("sha256")
      .update(buffer)
      .digest("hex");
  }

  fileSize(
    file: string
  ): number {
    return fs.statSync(file).size;
  }

  createAsset(
    projectRoot: string,
    folder: keyof typeof OUTPUT_STRUCTURE,
    type: AssetType,
    fileName: string,
    sourceFile: string
  ): ProjectAsset {
    const relativePath = path.join(
      OUTPUT_STRUCTURE[folder],
      fileName
    );

    const destination =
      path.join(
        projectRoot,
        relativePath
      );

    this.copy(
      sourceFile,
      destination
    );

    return {
      id: crypto.randomUUID(),

      type,

      name: path.parse(fileName)
        .name,

      fileName,

      relativePath,

      createdAt:
        new Date().toISOString(),
    };
  }

  listFiles(
    folder: string
  ): string[] {
    if (!this.exists(folder))
      return [];

    return fs.readdirSync(folder);
  }

  absolutePath(
    projectRoot: string,
    relativePath: string
  ): string {
    return path.join(
      projectRoot,
      relativePath
    );
  }
}

export const fileManager =
  new FileManager();