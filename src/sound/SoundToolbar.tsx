interface SoundToolbarProps {
  onAdd: () => void;
}

export default function SoundToolbar({
  onAdd,
}: SoundToolbarProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16,
      }}
    >
      <div>
        <h1
          style={{
            margin: 0,
          }}
        >
          Sound Library
        </h1>

        <p
          style={{
            marginTop: 6,
            color: "#888",
          }}
        >
          Manage reusable sound effects, ambience and cinematic audio.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: 12,
        }}
      >
        <input
          type="text"
          placeholder="Search sound..."
          style={{
            width: 280,
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #333",
            background: "#1f1f1f",
            color: "#fff",
          }}
        />

        <button onClick={onAdd}>
          + New Sound
        </button>
      </div>
    </div>
  );
}