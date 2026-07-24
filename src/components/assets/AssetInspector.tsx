import "./asset.css";
import { useLanguage } from "../../i18n";

export interface AssetDetails {
  id: string;
  name: string;
  folder: string;
  thumbnail?: string | null;
  metadata?: string | null;
  reference?: string[];
  poses?: string[];
  expressions?: string[];
  generated?: string[];
}

interface Props {
  asset?: AssetDetails | null;
}

const API = "http://127.0.0.1:3001";

function renderGallery(files?: string[]) {
  if (!files?.length) return null;

  return (
    <div className="inspector-gallery">
      {files.map((file) => (
        <img
          key={file}
          src={`${API}${file}`}
          alt=""
          onClick={() => window.open(`${API}${file}`, "_blank")}
        />
      ))}
    </div>
  );
}

export default function AssetInspector({ asset }: Props) {
  const { t } = useLanguage();

  if (!asset) {
    return (
      <aside className="asset-inspector">
        <h2>{t.inspector}</h2>

        <div className="asset-inspector-empty">
          {t.selectAsset}
        </div>
      </aside>
    );
  }

  return (
    <aside className="asset-inspector">
      <h2>{t.inspector}</h2>

      <div className="inspector-preview">
        {asset.thumbnail ? (
          <img
            src={
              asset.thumbnail.startsWith("http")
                ? asset.thumbnail
                : `${API}${asset.thumbnail}`
            }
            alt={asset.name}
          />
        ) : (
          <div className="asset-placeholder">
            {t.noImage}
          </div>
        )}
      </div>

      <div className="inspector-group">
        <h3>{t.name}</h3>
        <p>{asset.name}</p>
      </div>

      <div className="inspector-group">
        <h3>{t.folder}</h3>
        <p>{asset.folder}</p>
      </div>

      <div className="inspector-group">
        <h3>{t.metadata}</h3>
        <p>{asset.metadata ?? "-"}</p>
      </div>

      <div className="inspector-group">
        <h3>{t.referenceImages}</h3>
        <p>{asset.reference?.length ?? 0} {t.files}</p>
        {renderGallery(asset.reference)}
      </div>

      <div className="inspector-group">
        <h3>{t.generatedImages}</h3>
        <p>{asset.generated?.length ?? 0} {t.files}</p>
        {renderGallery(asset.generated)}
      </div>

      <div className="inspector-group">
        <h3>{t.expressions}</h3>
        <p>{asset.expressions?.length ?? 0} {t.files}</p>
        {renderGallery(asset.expressions)}
      </div>

      <div className="inspector-group">
        <h3>{t.poses}</h3>
        <p>{asset.poses?.length ?? 0} {t.files}</p>
        {renderGallery(asset.poses)}
      </div>

      <div className="inspector-actions">
        <button
          className="inspector-btn"
          onClick={() => navigator.clipboard.writeText(asset.folder)}
        >
          {t.copyFolderPath}
        </button>

        <button
          className="inspector-btn"
          onClick={() => {
            if (asset.metadata) {
              window.open(`${API}${asset.metadata}`, "_blank");
            }
          }}
        >
          {t.openMetadata}
        </button>
      </div>
    </aside>
  );
}