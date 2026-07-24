import path from "node:path";

import { WorkspaceManager } from "./WorkspaceManager";
import { LibraryManager } from "./LibraryManager";
import { ManifestManager } from "./ManifestManager";
import { VersionManager } from "./VersionManager";
import { FileManager } from "./FileManager";
import { AssetLibrary } from "./AssetLibrary";
import { ProjectStorage } from "./ProjectStorage";

import type {
  AssetType,
  ProjectAsset,
  ProjectManifest,
  StorageConfig,
} from "./StorageTypes";

export class ProjectManager {
  constructor(
    private readonly config: StorageConfig,
    private readonly storage: ProjectStorage,
    private readonly workspace: WorkspaceManager,
    private readonly library: LibraryManager,
    private readonly manifest: ManifestManager,
    private readonly versions: VersionManager,
    private readonly files: FileManager,
    private readonly assets: AssetLibrary
  ) {}

  create(
    manifest: ProjectManifest
  ): string {
    const data =
      this.manifest.create(manifest);

    return this.workspace.createProject(
      data
    );
  }

  open(
    projectFolder: string
  ): ProjectManifest {
    return this.workspace.openProject(
      projectFolder
    );
  }

  save(
    projectFolder: string,
    manifest: ProjectManifest
  ) {
    this.workspace.saveProject(
      projectFolder,
      manifest
    );
  }

  publish(
    projectFolder: string
  ): string {
    const manifest =
      this.workspace.openProject(
        projectFolder
      );

    return this.library.publishProject(
      projectFolder,
      manifest
    );
  }

  archive(
    projectFolder: string,
    archiveFolder: string
  ) {
    this.library.archiveProject(
      projectFolder,
      archiveFolder
    );
  }

  delete(
    projectFolder: string
  ) {
    this.workspace.deleteProject(
      projectFolder
    );
  }

  addAsset(
    projectFolder: string,
    folder: string,
    type: AssetType,
    fileName: string,
    sourceFile: string
  ): ProjectAsset {
    const asset =
      this.files.createAsset(
        projectFolder,
        folder as never,
        type,
        fileName,
        sourceFile
      );

    this.manifest.addAsset(
      projectFolder,
      asset
    );

    return asset;
  }

  saveScript(
    projectFolder: string,
    script: string
  ) {
    this.files.writeText(
      path.join(
        projectFolder,
        "01_SCRIPT",
        "original.txt"
      ),
      script
    );
  }

  saveTimeline(
    projectFolder: string,
    timeline: unknown
  ) {
    this.files.writeJSON(
      path.join(
        projectFolder,
        "02_TIMELINE",
        "timeline.json"
      ),
      timeline
    );
  }

  saveStoryboard(
    projectFolder: string,
    storyboard: unknown
  ) {
    this.files.writeJSON(
      path.join(
        projectFolder,
        "03_STORYBOARD",
        "storyboard.json"
      ),
      storyboard
    );
  }

  savePrompt(
    projectFolder: string,
    prompt: string,
    provider = "flow"
  ) {
    this.files.writeText(
      path.join(
        projectFolder,
        "04_PROMPTS",
        `${provider}_prompt.txt`
      ),
      prompt
    );
  }

  saveAnalysis(
    projectFolder: string,
    analysis: unknown
  ) {
    this.files.writeJSON(
      path.join(
        projectFolder,
        "03_STORYBOARD",
        "analysis.json"
      ),
      analysis
    );
  }

  saveLog(
    projectFolder: string,
    message: string
  ) {
    const file = path.join(
      projectFolder,
      "12_LOG",
      "production.log"
    );

    const old =
      this.files.exists(file)
        ? this.files.readText(file)
        : "";

    this.files.writeText(
      file,
      old +
        `[${new Date().toISOString()}] ${message}\n`
    );
  }

  createSnapshot(
    projectFolder: string
  ) {
    const manifest =
      this.workspace.openProject(
        projectFolder
      );

    this.versions.createSnapshot(
      projectFolder,
      manifest
    );
  }

  restoreSnapshot(
    projectFolder: string,
    version: string
  ) {
    this.versions.restoreSnapshot(
      projectFolder,
      version
    );
  }

  listProjects(): string[] {
    return this.workspace.listProjects();
  }

  listLibrary(): string[] {
    return this.library.listProjects();
  }
}