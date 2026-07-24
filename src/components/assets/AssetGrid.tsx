import "./asset.css";
import AssetCard from "./AssetCard";
import { useLanguage } from "../../i18n";

export interface AssetItem {
  id: string;
  name: string;
  description?: string;
  image?: string;
  type?: string;
  referenceCount?: number;
  generatedCount?: number;
}

interface Props {
  items: AssetItem[];
  selectedId?: string;
  onSelect?: (id: string) => void;
}

export default function AssetGrid({
  items,
  selectedId,
  onSelect,
}: Props) {
  const { t } = useLanguage();

  if (items.length === 0) {
    return (
      <div className="asset-empty">
        {t.noAssets}
      </div>
    );
  }

  return (
    <div className="asset-grid">
      {items.map((item) => (
        <AssetCard
          key={item.id}
          id={item.id}
          name={item.name}
          description={item.description}
          image={item.image}
          type={item.type}
          referenceCount={item.referenceCount}
          generatedCount={item.generatedCount}
          selected={selectedId === item.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}