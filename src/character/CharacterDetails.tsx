import type { CharacterItem } from "./CharacterPage";

interface CharacterDetailsProps {
  character: CharacterItem | null;
}

export default function CharacterDetails({
  character,
}: CharacterDetailsProps) {
  if (!character) {
    return (
      <div
        style={{
          border: "1px solid #333",
          borderRadius: 12,
          padding: 24,
          color: "#888",
        }}
      >
        Select a character to view details.
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "320px 1fr",
        gap: 24,
        border: "1px solid #333",
        borderRadius: 12,
        padding: 24,
      }}
    >
      <div
        style={{
          height: 420,
          background: "#111",
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
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
          <span style={{ color: "#666" }}>
            NO PREVIEW
          </span>
        )}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <h2>{character.name}</h2>

        <div>
          <strong>Description</strong>

          <p
            style={{
              color: "#aaa",
              lineHeight: 1.6,
            }}
          >
            {character.description || "No description."}
          </p>
        </div>

        <div>
          <strong>Reference Images</strong>

          <p style={{ color: "#777" }}>
            (Coming in Sprint 08)
          </p>
        </div>

        <div>
          <strong>Projects Using This Character</strong>

          <p style={{ color: "#777" }}>
            (Coming in Sprint 09)
          </p>
        </div>
      </div>
    </div>
  );
}