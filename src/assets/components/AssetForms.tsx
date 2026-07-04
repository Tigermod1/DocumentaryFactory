import { FormEvent, useState } from 'react';
import { assetCategories, type AssetCategory } from '../types';

interface AssetFormsProps {
  selectedFolderId: string | null;
  onImportAsset: (input: {
    sourcePath: string;
    name?: string;
    category: AssetCategory;
    thumbnailSourcePath?: string;
  }) => Promise<void>;
  onCreateFolder: (input: { name: string; category: AssetCategory }) => Promise<void>;
}

export function AssetForms({ onImportAsset, onCreateFolder }: AssetFormsProps) {
  const [sourcePath, setSourcePath] = useState('');
  const [thumbnailSourcePath, setThumbnailSourcePath] = useState('');
  const [assetName, setAssetName] = useState('');
  const [folderName, setFolderName] = useState('');
  const [assetCategory, setAssetCategory] = useState<AssetCategory>('other');
  const [folderCategory, setFolderCategory] = useState<AssetCategory>('project');

  async function submitImport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onImportAsset({
      sourcePath,
      name: assetName || undefined,
      category: assetCategory,
      thumbnailSourcePath: thumbnailSourcePath || undefined,
    });
    setSourcePath('');
    setThumbnailSourcePath('');
    setAssetName('');
  }

  async function submitFolder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onCreateFolder({ name: folderName, category: folderCategory });
    setFolderName('');
  }

  return (
    <section className="action-bar">
      <form onSubmit={submitImport}>
        <input
          required
          placeholder="Source file path"
          value={sourcePath}
          onChange={(event) => setSourcePath(event.target.value)}
        />
        <input
          placeholder="Display name"
          value={assetName}
          onChange={(event) => setAssetName(event.target.value)}
        />
        <input
          placeholder="Thumbnail path"
          value={thumbnailSourcePath}
          onChange={(event) => setThumbnailSourcePath(event.target.value)}
        />
        <select value={assetCategory} onChange={(event) => setAssetCategory(event.target.value as AssetCategory)}>
          {assetCategories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <button type="submit">Import</button>
      </form>

      <form onSubmit={submitFolder}>
        <input
          required
          placeholder="Folder name"
          value={folderName}
          onChange={(event) => setFolderName(event.target.value)}
        />
        <select value={folderCategory} onChange={(event) => setFolderCategory(event.target.value as AssetCategory)}>
          {assetCategories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <button type="submit">New folder</button>
      </form>
    </section>
  );
}
