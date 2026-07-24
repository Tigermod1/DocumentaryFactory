export default function ProductionToolbar() {
  return (
    <header
      style={{
        height: 72,
        background: "#181818",
        borderBottom: "1px solid #2b2b2b",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            color: "#fff",
          }}
        >
          Documentary Factory
        </h2>

        <p
          style={{
            margin: 0,
            marginTop: 4,
            color: "#888",
            fontSize: 13,
          }}
        >
          AI Production Workspace
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
        }}
      >
        <button>
          Save Project
        </button>

        <button>
          Open Project
        </button>

        <button>
          Export
        </button>

        <button
          style={{
            background: "#2f7cf6",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 20px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          ▶ PRODUCE DOCUMENTARY
        </button>
      </div>
    </header>
  );
}