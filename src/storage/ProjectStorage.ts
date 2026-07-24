import fs from "node:fs";
import path from "node:path";

import {
  OUTPUT_FOLDERS,
  buildProjectFolderName,
} from "./FolderTemplate";

import type {
  ProjectManifest,
  StorageConfig,
} from "./StorageTypes";

export class ProjectStorage {
  constructor(
    private readonly config: StorageConfig
  ) {}

  createProject(
    manifest: ProjectManifest
  ): string {
    const topicFolder = path.join(
      this.config.workspace,
      manifest.topic
    );

    this.ensureFolder(topicFolder);

    const projectFolder = path.join(
      topicFolder,
      buildProjectFolderName(
        manifest.id,
        manifest.projectName
      )
    );

    this.ensureFolder(projectFolder);

    for (const folder of OUTPUT_FOLDERS) {
      this.ensureFolder(
        path.join(projectFolder, folder)
      );
    }

    this.writeManifest(
      projectFolder,
      manifest
    );

    this.writeProjectFile(
      projectFolder,
      manifest
    );

    return projectFolder;
  }

  projectExists(
    projectFolder: string
  ): boolean {
    return fs.existsSync(projectFolder);
  }

  deleteProject(
    projectFolder: string
  ) {
    if (!this.projectExists(projectFolder))
      return;

    fs.rmSync(projectFolder, {
      recursive: true,
      force: true,
    });
  }

  loadManifest(
    projectFolder: string
  ): ProjectManifest {
    const file = path.join(
      projectFolder,
      "manifest.json"
    );

    return JSON.parse(
      fs.readFileSync(file, "utf8")
    );
  }

  saveManifest(
    projectFolder: string,
    manifest: ProjectManifest
  ) {
    this.writeManifest(
      projectFolder,
      manifest
    );
  }

  private writeManifest(
    projectFolder: string,
    manifest: ProjectManifest
  ) {
    fs.writeFileSync(
      path.join(
        projectFolder,
        "manifest.json"
      ),
      JSON.stringify(
        manifest,
        null,
        2
      )
    );
  }

  private writeProjectFile(
    projectFolder: string,
    manifest: ProjectManifest
  ) {
    fs.writeFileSync(
      path.join(
        projectFolder,
        "project.dfp"
      ),
      JSON.stringify(
        {
          id: manifest.id,
          version:
            manifest.version,
          createdAt:
            manifest.createdAt,
          updatedAt:
            manifest.updatedAt,
        },
        null,
        2
      )
    );
  }

  private ensureFolder(
    folder: string
  ) {
    fs.mkdirSync(folder, {
      recursive: true,
    });
  }
}