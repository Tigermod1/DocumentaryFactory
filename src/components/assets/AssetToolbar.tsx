import "./asset.css";
import { ChangeEvent } from "react";
import { useLanguage } from "../../i18n";

interface Props {
  search: string;
  onSearch: (value: string) => void;

  onScan: () => void;
  onRefresh: () => void;
  onOpenFolder: () => void;

  onAddAsset?: () => void;
  onSettings?: () => void;
}

export default function AssetToolbar({
  search,
  onSearch,
  onScan,
  onRefresh,
  onOpenFolder,
  onAddAsset,
  onSettings,
}: Props) {
  const {
    t,
    language,
    setLanguage,
  } = useLanguage();

  function handleChange(
    e: ChangeEvent<HTMLInputElement>
  ) {
    onSearch(e.target.value);
  }

  return (
    <div className="asset-toolbar">

      <div className="toolbar-left">

        <button
          className="toolbar-btn primary"
          onClick={onAddAsset}
        >
          ➕ Add Asset
        </button>

        <button
          className="toolbar-btn"
          onClick={onScan}
        >
          🔍 {t.scanAssets}
        </button>

        <button
          className="toolbar-btn"
          onClick={onRefresh}
        >
          🔄 {t.refresh}
        </button>

        <button
          className="toolbar-btn"
          onClick={onOpenFolder}
        >
          📂 {t.openFolder}
        </button>

      </div>

      <div
        className="toolbar-right"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >

        <input
          className="toolbar-search"
          placeholder={t.searchAssets}
          value={search}
          onChange={handleChange}
        />

        <select
          className="toolbar-btn"
          value={language}
          onChange={(e) =>
            setLanguage(
              e.target.value as "en" | "vi"
            )
          }
        >
          <option value="en">
            🇺🇸 EN
          </option>

          <option value="vi">
            🇻🇳 VI
          </option>
        </select>

        <button
          className="toolbar-btn"
          onClick={onSettings}
        >
          ⚙️
        </button>

      </div>

    </div>
  );
}