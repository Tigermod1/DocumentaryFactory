import type { SoundItem } from "./SoundPage";

interface SoundGridProps {
  sounds: SoundItem[];
  onSelect: (sound: SoundItem) => void;
}

export default function SoundGrid({
  sounds,
  onSelect,
}: SoundGridProps) {
  if (sounds.length === 0) {
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
        No sounds yet.
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fill,minmax(260px,1fr))",
        gap: 20,
      }}
    >
      {sounds.map((sound) => (
        <div
          key={sound.id}
          onClick={() => onSelect(sound)}
          style={{
            cursor: "pointer",
            background: "#1f1f1f",
            border: "1px solid #333",
            borderRadius: 12,
            overflow: "hidden",
            transition: ".2s",
          }}
        >
          <div
            style={{
              height: 120,
              background: "#111",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 46,
            }}
          >
            🎵
          </div>

          <div
            style={{
              padding: 16,
            }}
          >
            <h3
              style={{
                margin: 0,
                marginBottom: 8,
              }}
            >
              {sound.name}
            </h3>

            <p
              style={{
                margin: "0 0 8px 0",
                color: "#6ea8fe",
                fontSize: 13,
              }}
            >
              {sound.category}
            </p>

            <p
              style={{
                margin: 0,
                color: "#999",
                fontSize: 14,
                lineHeight: 1.5,
              }}
            >
              {sound.description}
            </p>

            {sound.duration && (
              <p
                style={{
                  marginTop: 12,
                  color: "#777",
                  fontSize: 12,
                }}
              >
                Duration: {sound.duration}s
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}