import fs from "node:fs";
import path from "node:path";

import type {
  ProjectManifest,
  ProjectVersion,
} from "./StorageTypes";

export class VersionManager {
  nextMajor(
    version: ProjectVersion
  ): ProjectVersion {
    return {
      major: version.major + 1,
      minor: 0,
      patch: 0,
    };
  }

  nextMinor(
    version: ProjectVersion
  ): ProjectVersion {
    return {
      major: version.major,
      minor: version.minor + 1,
      patch: 0,
    };
  }

  nextPatch(
    version: ProjectVersion
  ): ProjectVersion {
    return {
      major: version.major,
      minor: version.minor,
      patch: version.patch + 1,
    };
  }

  toString(
    version: ProjectVersion
  ): string {
    return `v${version.major}.${version.minor}.${version.patch}`;
  }

  createSnapshot(
    projectFolder: string,
    manifest: ProjectManifest
  ): string {
    const snapshotRoot = path.join(
      projectFolder,
      ".versions"
    );

    fs.mkdirSync(snapshotRoot, {
      recursive: true,
    });

    const snapshotFolder = path.join(
      snapshotRoot,
      this.toString(manifest.version)
    );

    if (fs.existsSync(snapshotFolder)) {
      throw new Error(
        "Snapshot already exists."
      );
    }

    fs.cpSync(
      projectFolder,
      snapshotFolder,
      {
        recursive: true,
        filter: (source) => {
          return !source.includes(".versions");
        },
      }
    );

    return snapshotFolder;
  }

  listSnapshots(
    projectFolder: string
  ): string[] {
    const snapshotRoot = path.join(
      projectFolder,
      ".versions"
    );

    if (!fs.existsSync(snapshotRoot)) {
      return [];
    }

    return fs
      .readdirSync(snapshotRoot)
      .sort();
  }

  restoreSnapshot(
    projectFolder: string,
    versionName: string
  ) {
    const snapshotFolder = path.join(
      projectFolder,
      ".versions",
      versionName
    );

    if (!fs.existsSync(snapshotFolder)) {
      throw new Error(
        "Snapshot not found."
      );
    }

    const items =
      fs.readdirSync(snapshotFolder);

    for (const item of items) {
      fs.cpSync(
        path.join(snapshotFolder, item),
        path.join(projectFolder, item),
        {
          recursive: true,
          force: true,
        }
      );
    }
  }

  deleteSnapshot(
    projectFolder: string,
    versionName: string
  ) {
    const snapshotFolder = path.join(
      projectFolder,
      ".versions",
      versionName
    );

    if (!fs.existsSync(snapshotFolder))
      return;

    fs.rmSync(snapshotFolder, {
      recursive: true,
      force: true,
    });
  }

  latestSnapshot(
    projectFolder: string
  ): string | undefined {
    const versions =
      this.listSnapshots(projectFolder);

    return versions.length
      ? versions[versions.length - 1]
      : undefined;
  }
}

export const versionManager =
  new VersionManager();