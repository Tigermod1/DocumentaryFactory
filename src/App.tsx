import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  createFolder,
  deleteAsset,
  getAssetTree,
  getStorageStats,
  importAsset,
  listAssets,
  updateAsset,
} from './assets/api';
import { AssetDetails } from './assets/components/AssetDetails';
import { AssetForms } from './assets/components/AssetForms';
import { AssetGrid } from './assets/components/AssetGrid';
import { FolderTree } from './assets/components/FolderTree';
import { formatBytes } from './assets/format';
import { TimelineWorkspace } from './timeline/TimelineWorkspace';
import type { Asset, AssetCategory, AssetTreeNode, StorageStats } from './assets/types';

type ActiveModule = 'assets' | 'timeline';

function flattenFolders(nodes: AssetTreeNode[]): Asset[] {
  return nodes.flatMap((node) => [
    ...(node.type === 'folder' ? [node] : []),
    ...flattenFolders(node.children),
  ]);
}

function AssetLibraryWorkspace() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [tree, setTree] = useState<AssetTreeNode[]>([]);
  const [storageStats, setStorageStats] = useState<StorageStats | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<AssetCategory | ''>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const selectedAsset = assets.find((asset) => asset.id === selectedAssetId) ?? null;
  const folders = useMemo(() => flattenFolders(tree), [tree]);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const [assetList, folderTree, stats] = await Promise.all([
        listAssets({ search, parentId: search ? undefined : selectedFolderId, category }),
        getAssetTree(),
        getStorageStats(),
      ]);

      setAssets(assetList);
      setTree(folderTree);
      setStorageStats(stats);
      setError(null);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Unable to load assets.');
    } finally {
      setIsLoading(false);
    }
  }, [category, search, selectedFolderId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  async function runMutation(action: () => Promise<void>) {
    try {
      await action();
      await refresh();
      setError(null);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Action failed.');
    }
  }

  return (
    <main className="app-shell">
      <header className="top-bar">
        <div>
          <h1>Asset Library</h1>
          <p>Manage local documentary source files, folders, thumbnails, and metadata.</p>
        </div>
        <div className="storage-pill">
          <span>{formatBytes(storageStats?.totalBytes ?? null)}</span>
          <small>{storageStats?.fileCount ?? 0} stored files</small>
        </div>
      </header>

      <AssetForms
        selectedFolderId={selectedFolderId}
        onImportAsset={(input) => runMutation(async () => {
          await importAsset({ ...input, parentId: selectedFolderId });
        })}
        onCreateFolder={(input) => runMutation(async () => {
          await createFolder({ ...input, parentId: selectedFolderId });
        })}
      />

      <section className="workspace">
        <FolderTree tree={tree} selectedFolderId={selectedFolderId} onSelectFolder={(folderId) => {
          setSelectedFolderId(folderId);
          setSelectedAssetId(null);
        }} />

        <section className="library-main">
          <div className="toolbar">
            <input
              aria-label="Search assets"
              placeholder="Search assets and metadata"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <select
              aria-label="Filter by category"
              value={category}
              onChange={(event) => setCategory(event.target.value as AssetCategory | '')}
            >
              <option value="">All categories</option>
              <option value="video">video</option>
              <option value="audio">audio</option>
              <option value="image">image</option>
              <option value="document">document</option>
              <option value="project">project</option>
              <option value="other">other</option>
            </select>
            <button type="button" onClick={() => void refresh()}>Refresh</button>
          </div>

          {error ? <p className="form-error">{error}</p> : null}
          {isLoading ? (
            <div className="empty-state"><strong>Loading assets</strong></div>
          ) : (
            <AssetGrid
              assets={assets}
              selectedAssetId={selectedAssetId}
              onSelectAsset={(asset) => setSelectedAssetId(asset.id)}
              onOpenFolder={(asset) => {
                setSelectedFolderId(asset.id);
                setSelectedAssetId(null);
              }}
            />
          )}
        </section>

        <AssetDetails
          asset={selectedAsset}
          folders={folders}
          onRename={(name) => runMutation(async () => {
            if (selectedAsset) {
              await updateAsset(selectedAsset.id, { name });
            }
          })}
          onMove={(parentId) => runMutation(async () => {
            if (selectedAsset) {
              await updateAsset(selectedAsset.id, { parentId });
            }
          })}
          onDelete={() => runMutation(async () => {
            if (selectedAsset) {
              await deleteAsset(selectedAsset.id);
              setSelectedAssetId(null);
            }
          })}
          onUpdateCategory={(nextCategory) => runMutation(async () => {
            if (selectedAsset) {
              await updateAsset(selectedAsset.id, { category: nextCategory });
            }
          })}
          onUpdateMetadata={(metadata) => runMutation(async () => {
            if (selectedAsset) {
              await updateAsset(selectedAsset.id, { metadata });
            }
          })}
        />
      </section>
    </main>
  );
}

export function App() {
  const [activeModule, setActiveModule] = useState<ActiveModule>('assets');

  return (
    <main className="root-shell">
      <header className="module-switcher">
        <div>
          <strong>Documentary Factory</strong>
          <p className="muted">Asset Library and Timeline Engine</p>
        </div>
        <div className="module-tabs" role="tablist" aria-label="Application modules">
          <button
            type="button"
            role="tab"
            aria-selected={activeModule === 'assets'}
            className={activeModule === 'assets' ? 'tab selected' : 'tab'}
            onClick={() => setActiveModule('assets')}
          >
            Asset Library
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeModule === 'timeline'}
            className={activeModule === 'timeline' ? 'tab selected' : 'tab'}
            onClick={() => setActiveModule('timeline')}
          >
            Timeline Engine
          </button>
        </div>
      </header>

      {activeModule === 'assets' ? <AssetLibraryWorkspace /> : <TimelineWorkspace />}
    </main>
  );
}
