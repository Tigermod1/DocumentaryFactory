import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

import type {
  AssetType,
  ProjectAsset,
  StorageConfig,
} from "./StorageTypes";

export class AssetLibrary {
  constructor(
    private readonly config: StorageConfig
  ) {}

  addAsset(
    type: AssetType,
    sourceFile: string,
    name?: string
  ): ProjectAsset {
    const folder = this.assetFolder(type);

    fs.mkdirSync(folder, {
      recursive: true,
    });

    const ext = path.extname(sourceFile);

    const assetId = crypto.randomUUID();

    const fileName =
      `${assetId}${ext}`;

    const destination =
      path.join(folder, fileName);

    fs.copyFileSync(
      sourceFile,
      destination
    );

    return {
      id: assetId,

      type,

      name:
        name ??
        path.parse(sourceFile).name,

      fileName,

      relativePath: path.relative(
        this.config.workspace,
        destination
      ),

      createdAt:
        new Date().toISOString(),
    };
  }

  listAssets(
    type?: AssetType
  ): ProjectAsset[] {
    if (type) {
      return this.readFolder(
        this.assetFolder(type),
        type
      );
    }

    const result: ProjectAsset[] = [];

    const folders =
      fs.existsSync(
        this.config.assetFolder
      )
        ? fs.readdirSync(
            this.config.assetFolder
          )
        : [];

    for (const folder of folders) {
      result.push(
        ...this.readFolder(
          path.join(
            this.config.assetFolder,
            folder
          ),
          folder as AssetType
        )
      );
    }

    return result;
  }

  deleteAsset(
    asset: ProjectAsset
  ) {
    const file = path.join(
      this.config.workspace,
      asset.relativePath
    );

    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
  }

  assetExists(
    assetId: string,
    type: AssetType
  ): boolean {
    const folder =
      this.assetFolder(type);

    if (!fs.existsSync(folder))
      return false;

    return fs
      .readdirSync(folder)
      .some((file) =>
        file.startsWith(assetId)
      );
  }

  private assetFolder(
    type: AssetType
  ): string {
    return path.join(
      this.config.assetFolder,
      type
    );
  }

  private readFolder(
    folder: string,
    type: AssetType
  ): ProjectAsset[] {
    if (!fs.existsSync(folder))
      return [];

    return fs
      .readdirSync(folder)
      .map((file) => ({
        id: path.parse(file).name,

        type,

        name: path.parse(file).name,

        fileName: file,

        relativePath: path.relative(
          this.config.workspace,
          path.join(folder, file)
        ),

        createdAt:
          fs
            .statSync(
              path.join(folder, file)
            )
            .birthtime.toISOString(),
      }));
  }
}

export const assetLibrary =
  new AssetLibrary({
    workspace: "",
    projectsFolder: "",
    outputFolder: "",
    cacheFolder: "",
    templateFolder: "",
    pluginFolder: "",
    knowledgeFolder: "",
    marketFolder: "",
    styleFolder: "",
    logFolder: "",
    assetFolder: "",
});