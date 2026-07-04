import { useEffect, useMemo, useState } from 'react';
import { assetCategories, type Asset, type AssetCategory } from '../types';
import { formatBytes, formatDate } from '../format';

interface AssetDetailsProps {
  asset: Asset | null;
  folders: Asset[];
  onRename: (name: string) => Promise<void>;
  onMove: (parentId: string | null) => Promise<void>;
  onDelete: () => Promise<void>;
  onUpdateCategory: (category: AssetCategory) => Promise<void>;
  onUpdateMetadata: (metadata: Record<string, unknown>) => Promise<void>;
}

export function AssetDetails({
  asset,
  folders,
  onRename,
  onMove,
  onDelete,
  onUpdateCategory,
  onUpdateMetadata,
}: AssetDetailsProps) {
  const [name, setName] = useState('');
  const [metadata, setMetadata] = useState('{}');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setName(asset?.name ?? '');
    setMetadata(JSON.stringify(asset?.metadata ?? {}, null, 2));
    setError(null);
  }, [asset]);

  const folderOptions = useMemo(
    () => folders.filter((folder) => folder.id !== asset?.id),
    [asset?.id, folders],
  );

  if (!asset) {
    return (
      <aside className="details-panel">
        <h2>Details</h2>
        <p className="muted">Select an asset to inspect and manage it.</p>
      </aside>
    );
  }

  async function saveMetadata() {
    try {
      const parsed = JSON.parse(metadata) as unknown;

      if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
        throw new Error('Metadata must be a JSON object.');
      }

      await onUpdateMetadata(parsed as Record<string, unknown>);
      setError(null);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Metadata is invalid.');
    }
  }

  return (
    <aside className="details-panel">
      <h2>Details</h2>

      <label>
        Name
        <input value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <button type="button" onClick={() => onRename(name)}>Rename</button>

      <label>
        Category
        <select
          value={asset.category}
          onChange={(event) => onUpdateCategory(event.target.value as AssetCategory)}
        >
          {assetCategories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </label>

      <label>
        Move to
        <select
          value={asset.parentId ?? ''}
          onChange={(event) => onMove(event.target.value || null)}
        >
          <option value="">All assets</option>
          {folderOptions.map((folder) => (
            <option key={folder.id} value={folder.id}>{folder.name}</option>
          ))}
        </select>
      </label>

      <dl className="detail-list">
        <div><dt>Type</dt><dd>{asset.type}</dd></div>
        <div><dt>Size</dt><dd>{formatBytes(asset.sizeBytes)}</dd></div>
        <div><dt>MIME</dt><dd>{asset.mimeType ?? 'None'}</dd></div>
        <div><dt>Created</dt><dd>{formatDate(asset.createdAt)}</dd></div>
        <div><dt>Storage</dt><dd>{asset.storagePath ?? 'Folder'}</dd></div>
      </dl>

      <label>
        Metadata
        <textarea value={metadata} onChange={(event) => setMetadata(event.target.value)} rows={8} />
      </label>
      {error ? <p className="form-error">{error}</p> : null}
      <button type="button" onClick={saveMetadata}>Save metadata</button>
      <button className="danger" type="button" onClick={onDelete}>Delete</button>
    </aside>
  );
}
