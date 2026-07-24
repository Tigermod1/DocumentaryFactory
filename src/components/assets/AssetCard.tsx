import "./asset.css";
import { useLanguage } from "../../i18n";

export interface AssetCardProps {
  id: string;
  name: string;
  description?: string;
  image?: string;
  selected?: boolean;
  type?: string;
  referenceCount?: number;
  generatedCount?: number;
  onSelect?: (id: string) => void;
}

export default function AssetCard({
  id,
  name,
  description,
  image,
  selected = false,
  type = "Asset",
  referenceCount = 0,
  generatedCount = 0,
  onSelect,
}: AssetCardProps) {
  const { t } = useLanguage();

  const typeMap: Record<string, string> = {
    Character: t.characters,
    Environment: t.environments,
    Prop: t.props,
    Camera: t.cameras,
    Sound: t.sounds,
    Effect: t.effects,
  };

  return (
    <div
      className={selected ? "asset-card selected" : "asset-card"}
      onClick={() => onSelect?.(id)}
    >
      <div className="asset-preview">
        {image ? (
          <img
            src={image}
            alt={name}
            loading="lazy"
          />
        ) : (
          <div className="asset-placeholder">
            {t.noPreview}
          </div>
        )}

        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: "#0b84ff",
            color: "#fff",
            padding: "4px 8px",
            borderRadius: 6,
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          {typeMap[type ?? ""] ?? type}
        </div>
      </div>

      <div className="asset-content">
        <h3>{name}</h3>

        <p>{description}</p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 12,
            fontSize: 12,
            opacity: 0.8,
          }}
        >
          <span>📷 {referenceCount}</span>

          <span>🖼 {generatedCount}</span>
        </div>
      </div>
    </div>
  );
}