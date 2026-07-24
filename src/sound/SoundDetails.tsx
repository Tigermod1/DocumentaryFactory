import type { SoundItem } from "./SoundPage";

interface SoundDetailsProps {
  sound: SoundItem | null;
}

export default function SoundDetails({
  sound,
}: SoundDetailsProps) {
  if (!sound) {
    return (
      <div
        style={{
          border: "1px solid #333",
          borderRadius: 12,
          padding: 24,
          color: "#888",
        }}
      >
        Select a sound to view details.
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "280px 1fr",
        gap: 24,
        border: "1px solid #333",
        borderRadius: 12,
        padding: 24,
      }}
    >
      <div
        style={{
          background: "#111",
          borderRadius: 12,
          minHeight: 280,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 80,
        }}
      >
        🎧
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <h2>{sound.name}</h2>

        <div>
          <strong>Category</strong>

          <p
            style={{
              color: "#6ea8fe",
            }}
          >
            {sound.category}
          </p>
        </div>

        <div>
          <strong>Description</strong>

          <p
            style={{
              color: "#aaa",
              lineHeight: 1.6,
            }}
          >
            {sound.description || "No description."}
          </p>
        </div>

        <div>
          <strong>Duration</strong>

          <p
            style={{
              color: "#aaa",
            }}
          >
            {sound.duration
              ? `${sound.duration} seconds`
              : "Unknown"}
          </p>
        </div>

        <div>
          <strong>Tags</strong>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginTop: 8,
            }}
          >
            {(sound.tags ?? []).length > 0 ? (
              sound.tags!.map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "#2a2a2a",
                    padding: "4px 10px",
                    borderRadius: 999,
                    fontSize: 12,
                  }}
                >
                  {tag}
                </span>
              ))
            ) : (
              <span style={{ color: "#777" }}>
                No tags
              </span>
            )}
          </div>
        </div>

        <div>
          <strong>Preview</strong>

          <p
            style={{
              color: "#777",
            }}
          >
            (Audio player coming in Sprint 11)
          </p>
        </div>

        <div>
          <strong>Used In Projects</strong>

          <p
            style={{
              color: "#777",
            }}
          >
            (Coming in Sprint 11)
          </p>
        </div>
      </div>
    </div>
  );
}