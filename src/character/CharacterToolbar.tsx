interface CharacterToolbarProps {
  onAdd: () => void;
}

export default function CharacterToolbar({
  onAdd,
}: CharacterToolbarProps) {
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
          Character Library
        </h1>

        <p
          style={{
            marginTop: 6,
            color: "#888",
          }}
        >
          Manage reusable characters for every documentary project.
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
          placeholder="Search character..."
          style={{
            width: 260,
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #333",
            background: "#1f1f1f",
            color: "#fff",
          }}
        />

        <button onClick={onAdd}>
          + New Character
        </button>
      </div>
    </div>
  );
}