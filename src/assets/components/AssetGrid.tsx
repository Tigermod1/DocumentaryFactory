import { formatBytes } from '../format';
import { thumbnailUrl } from '../api';
import type { Asset } from '../types';

interface AssetGridProps {
  assets: Asset[];
  selectedAssetId: string | null;
  onSelectAsset: (asset: Asset) => void;
  onOpenFolder: (asset: Asset) => void;
}

export function AssetGrid({ assets, selectedAssetId, onSelectAsset, onOpenFolder }: AssetGridProps) {
  if (assets.length === 0) {
    return (
      <div className="empty-state">
        <strong>No assets found</strong>
        <span>Import a local file or create a folder to begin.</span>
      </div>
    );
  }

  return (
    <div className="asset-grid">
      {assets.map((asset) => {
        const image = thumbnailUrl(asset);

        return (
          <button
            key={asset.id}
            className={asset.id === selectedAssetId ? 'asset-card selected' : 'asset-card'}
            type="button"
            onClick={() => onSelectAsset(asset)}
            onDoubleClick={() => {
              if (asset.type === 'folder') {
                onOpenFolder(asset);
              }
            }}
          >
            <span className="asset-thumb">
              {image ? <img alt="" src={image} /> : <span>{asset.type === 'folder' ? '□' : '▤'}</span>}
            </span>
            <span className="asset-name">{asset.name}</span>
            <span className="asset-meta">
              {asset.category} · {asset.type === 'folder' ? 'Folder' : formatBytes(asset.sizeBytes)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
