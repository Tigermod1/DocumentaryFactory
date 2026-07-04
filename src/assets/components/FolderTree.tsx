import type { AssetTreeNode } from '../types';

interface FolderTreeProps {
  tree: AssetTreeNode[];
  selectedFolderId: string | null;
  onSelectFolder: (folderId: string | null) => void;
}

function TreeBranch({
  nodes,
  selectedFolderId,
  onSelectFolder,
}: {
  nodes: AssetTreeNode[];
  selectedFolderId: string | null;
  onSelectFolder: (folderId: string | null) => void;
}) {
  const folders = nodes.filter((node) => node.type === 'folder');

  if (folders.length === 0) {
    return null;
  }

  return (
    <ul className="folder-tree">
      {folders.map((folder) => (
        <li key={folder.id}>
          <button
            className={folder.id === selectedFolderId ? 'tree-item selected' : 'tree-item'}
            type="button"
            onClick={() => onSelectFolder(folder.id)}
          >
            <span aria-hidden="true">▸</span>
            <span>{folder.name}</span>
          </button>
          <TreeBranch
            nodes={folder.children}
            selectedFolderId={selectedFolderId}
            onSelectFolder={onSelectFolder}
          />
        </li>
      ))}
    </ul>
  );
}

export function FolderTree({ tree, selectedFolderId, onSelectFolder }: FolderTreeProps) {
  return (
    <nav className="library-sidebar" aria-label="Asset folders">
      <button
        className={selectedFolderId === null ? 'tree-item selected' : 'tree-item'}
        type="button"
        onClick={() => onSelectFolder(null)}
      >
        <span aria-hidden="true">⌂</span>
        <span>All assets</span>
      </button>
      <TreeBranch nodes={tree} selectedFolderId={selectedFolderId} onSelectFolder={onSelectFolder} />
    </nav>
  );
}
