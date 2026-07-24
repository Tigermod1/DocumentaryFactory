import fs from "node:fs";
import path from "node:path";

import { ProjectStorage } from "./ProjectStorage";

import type {
  ProjectManifest,
  StorageConfig,
} from "./StorageTypes";

export class WorkspaceManager {
  constructor(
    private readonly storage: ProjectStorage,
    private readonly config: StorageConfig
  ) {}

  createProject(
    manifest: ProjectManifest
  ): string {
    return this.storage.createProject(
      manifest
    );
  }

  openProject(
    projectFolder: string
  ): ProjectManifest {
    return this.storage.loadManifest(
      projectFolder
    );
  }

  saveProject(
    projectFolder: string,
    manifest: ProjectManifest
  ) {
    manifest.updatedAt =
      new Date().toISOString();

    this.storage.saveManifest(
      projectFolder,
      manifest
    );
  }

  renameProject(
    projectFolder: string,
    newName: string
  ): string {
    const manifest =
      this.storage.loadManifest(
        projectFolder
      );

    const topicFolder =
      path.dirname(projectFolder);

    const newFolder =
      path.join(
        topicFolder,
        `${manifest.id}_${this.slug(
          newName
        )}`
      );

    fs.renameSync(
      projectFolder,
      newFolder
    );

    manifest.projectName =
      newName;

    this.storage.saveManifest(
      newFolder,
      manifest
    );

    return newFolder;
  }

  duplicateProject(
    projectFolder: string,
    newManifest: ProjectManifest
  ): string {
    const target =
      this.storage.createProject(
        newManifest
      );

    this.copyDirectory(
      projectFolder,
      target
    );

    this.storage.saveManifest(
      target,
      newManifest
    );

    return target;
  }

  deleteProject(
    projectFolder: string
  ) {
    this.storage.deleteProject(
      projectFolder
    );
  }

  listProjects(): string[] {
    if (
      !fs.existsSync(
        this.config.workspace
      )
    ) {
      return [];
    }

    const result: string[] =
      [];

    const topics =
      fs.readdirSync(
        this.config.workspace,
        {
          withFileTypes: true,
        }
      );

    for (const topic of topics) {
      if (!topic.isDirectory())
        continue;

      const topicFolder =
        path.join(
          this.config.workspace,
          topic.name
        );

      const projects =
        fs.readdirSync(
          topicFolder,
          {
            withFileTypes: true,
          }
        );

      for (const project of projects) {
        if (
          project.isDirectory()
        ) {
          result.push(
            path.join(
              topicFolder,
              project.name
            )
          );
        }
      }
    }

    return result.sort();
  }

  private slug(
    value: string
  ) {
    return value
      .trim()
      .replace(
        /[<>:"/\\|?*]/g,
        ""
      )
      .replace(
        /\s+/g,
        "-"
      );
  }

  private copyDirectory(
    source: string,
    target: string
  ) {
    fs.cpSync(
      source,
      target,
      {
        recursive: true,
        force: true,
      }
    );
  }
}