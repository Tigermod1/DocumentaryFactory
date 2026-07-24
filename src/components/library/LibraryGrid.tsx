import CharacterCard from "./CharacterCard";
import EnvironmentCard from "./EnvironmentCard";

export interface LibraryItem {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

interface LibraryGridProps {
  type: "character" | "environment";

  items: LibraryItem[];

  selectedId?: string;

  onSelect?: (id: string) => void;
}

export default function LibraryGrid({
  type,
  items,
  selectedId,
  onSelect,
}: LibraryGridProps) {
  if (items.length === 0) {
    return (
      <div
        style={{
          padding: 40,
          textAlign: "center",
          opacity: 0.7,
        }}
      >
        No assets found.
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fill,minmax(240px,1fr))",
        gap: 20,
      }}
    >
      {items.map((item) =>
        type === "character" ? (
          <CharacterCard
            key={item.id}
            {...item}
            selected={selectedId === item.id}
            onSelect={onSelect}
          />
        ) : (
          <EnvironmentCard
            key={item.id}
            {...item}
            selected={selectedId === item.id}
            onSelect={onSelect}
          />
        )
      )}
    </div>
  );
}