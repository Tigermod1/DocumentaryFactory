import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

import type {
  ProjectAsset,
  ProjectManifest,
} from "./StorageTypes";

export class ManifestManager {
  create(
    manifest: ProjectManifest
  ): ProjectManifest {
    return {
      ...manifest,
      assets: manifest.assets ?? [],
      createdAt:
        manifest.createdAt ??
        new Date().toISOString(),
      updatedAt:
        new Date().toISOString(),
    };
  }

  load(
    projectFolder: string
  ): ProjectManifest {
    const file = this.file(
      projectFolder
    );

    return JSON.parse(
      fs.readFileSync(file, "utf8")
    );
  }

  save(
    projectFolder: string,
    manifest: ProjectManifest
  ) {
    manifest.updatedAt =
      new Date().toISOString();

    fs.writeFileSync(
      this.file(projectFolder),
      JSON.stringify(
        manifest,
        null,
        2
      )
    );
  }

  update(
    projectFolder: string,
    updater: (
      manifest: ProjectManifest
    ) => void
  ): ProjectManifest {
    const manifest =
      this.load(projectFolder);

    updater(manifest);

    this.save(
      projectFolder,
      manifest
    );

    return manifest;
  }

  addAsset(
    projectFolder: string,
    asset: ProjectAsset
  ) {
    this.update(
      projectFolder,
      (manifest) => {
        manifest.assets.push(asset);
      }
    );
  }

  removeAsset(
    projectFolder: string,
    assetId: string
  ) {
    this.update(
      projectFolder,
      (manifest) => {
        manifest.assets =
          manifest.assets.filter(
            (x) =>
              x.id !== assetId
          );
      }
    );
  }

  findAsset(
    projectFolder: string,
    assetId: string
  ): ProjectAsset | undefined {
    return this.load(
      projectFolder
    ).assets.find(
      (x) => x.id === assetId
    );
  }

  listAssets(
    projectFolder: string
  ): ProjectAsset[] {
    return this.load(
      projectFolder
    ).assets;
  }

  exists(
    projectFolder: string
  ): boolean {
    return fs.existsSync(
      this.file(projectFolder)
    );
  }

  checksum(
    projectFolder: string
  ): string {
    const json =
      fs.readFileSync(
        this.file(projectFolder)
      );

    return crypto
      .createHash("sha256")
      .update(json)
      .digest("hex");
  }

  private file(
    projectFolder: string
  ) {
    return path.join(
      projectFolder,
      "manifest.json"
    );
  }
}

export const manifestManager =
  new ManifestManager();