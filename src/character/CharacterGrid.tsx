import type { CharacterItem } from "./CharacterPage";

interface CharacterGridProps {
  characters: CharacterItem[];
  onSelect: (character: CharacterItem) => void;
}

export default function CharacterGrid({
  characters,
  onSelect,
}: CharacterGridProps) {
  if (characters.length === 0) {
    return (
      <div
        style={{
          border: "1px dashed #444",
          borderRadius: 12,
          padding: 40,
          textAlign: "center",
          color: "#888",
        }}
      >
        No characters yet.
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
      {characters.map((character) => (
        <div
          key={character.id}
          onClick={() => onSelect(character)}
          style={{
            cursor: "pointer",
            background: "#1f1f1f",
            border: "1px solid #333",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: 240,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#111",
              color: "#666",
            }}
          >
            {character.image ? (
              <img
                src={character.image}
                alt={character.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              "NO IMAGE"
            )}
          </div>

          <div
            style={{
              padding: 16,
            }}
          >
            <h3
              style={{
                margin: 0,
              }}
            >
              {character.name}
            </h3>

            <p
              style={{
                marginTop: 8,
                color: "#999",
              }}
            >
              {character.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}