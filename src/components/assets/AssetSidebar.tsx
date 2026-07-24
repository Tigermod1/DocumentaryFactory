import "./asset.css";
import { useLanguage } from "../../i18n";

export type AssetSection =
  | "characters"
  | "environments"
  | "props"
  | "cameras"
  | "sounds"
  | "effects";

interface AssetSidebarProps {
  section: AssetSection;
  onChange: (section: AssetSection) => void;
}

export default function AssetSidebar({
  section,
  onChange,
}: AssetSidebarProps) {
  const { t } = useLanguage();

  const ITEMS = [
    {
      id: "characters" as const,
      icon: "👤",
      label: t.characters,
    },
    {
      id: "environments" as const,
      icon: "🏛",
      label: t.environments,
    },
    {
      id: "props" as const,
      icon: "📦",
      label: t.props,
    },
    {
      id: "cameras" as const,
      icon: "🎥",
      label: t.cameras,
    },
    {
      id: "sounds" as const,
      icon: "🔊",
      label: t.sounds,
    },
    {
      id: "effects" as const,
      icon: "✨",
      label: t.effects,
    },
  ];

  return (
    <aside className="asset-sidebar">
      <div className="asset-logo">
        <h2>{t.appName}</h2>
        <span>{t.assetLibrary}</span>
      </div>

      <div className="asset-menu">
        {ITEMS.map((item) => (
          <button
            key={item.id}
            className={
              section === item.id
                ? "asset-btn active"
                : "asset-btn"
            }
            onClick={() => onChange(item.id)}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}