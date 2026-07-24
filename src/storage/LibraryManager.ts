import fs from "node:fs";
import path from "node:path";

import type {
  ProjectManifest,
  StorageConfig,
} from "./StorageTypes";

export class LibraryManager {
  constructor(
    private readonly config: StorageConfig
  ) {}

  publishProject(
    workspaceProject: string,
    manifest: ProjectManifest
  ): string {
    const topicFolder = path.join(
      this.config.outputFolder,
      manifest.topic
    );

    this.ensureFolder(topicFolder);

    const libraryProject = path.join(
      topicFolder,
      path.basename(workspaceProject)
    );

    if (fs.existsSync(libraryProject)) {
      throw new Error(
        "Project already exists in Library."
      );
    }

    fs.cpSync(
      workspaceProject,
      libraryProject,
      {
        recursive: true,
      }
    );

    manifest.status = "completed";
    manifest.updatedAt =
      new Date().toISOString();

    this.saveManifest(
      libraryProject,
      manifest
    );

    return libraryProject;
  }

  archiveProject(
    workspaceProject: string,
    archiveFolder: string
  ) {
    this.ensureFolder(archiveFolder);

    const target = path.join(
      archiveFolder,
      path.basename(workspaceProject)
    );

    fs.renameSync(
      workspaceProject,
      target
    );
  }

  listProjects(): string[] {
    if (
      !fs.existsSync(
        this.config.outputFolder
      )
    ) {
      return [];
    }

    const projects: string[] = [];

    const topics =
      fs.readdirSync(
        this.config.outputFolder,
        {
          withFileTypes: true,
        }
      );

    for (const topic of topics) {
      if (!topic.isDirectory())
        continue;

      const topicFolder = path.join(
        this.config.outputFolder,
        topic.name
      );

      const folders =
        fs.readdirSync(topicFolder, {
          withFileTypes: true,
        });

      for (const folder of folders) {
        if (folder.isDirectory()) {
          projects.push(
            path.join(
              topicFolder,
              folder.name
            )
          );
        }
      }
    }

    return projects.sort();
  }

  deleteProject(
    libraryProject: string
  ) {
    if (!fs.existsSync(libraryProject))
      return;

    fs.rmSync(libraryProject, {
      recursive: true,
      force: true,
    });
  }

  loadManifest(
    libraryProject: string
  ): ProjectManifest {
    return JSON.parse(
      fs.readFileSync(
        path.join(
          libraryProject,
          "manifest.json"
        ),
        "utf8"
      )
    );
  }

  private saveManifest(
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

  private ensureFolder(
    folder: string
  ) {
    fs.mkdirSync(folder, {
      recursive: true,
    });
  }
}