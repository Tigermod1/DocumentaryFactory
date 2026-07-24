export default function ProductionPreview() {
  return (
    <div
      style={{
        background: "#181818",
        border: "1px solid #2b2b2b",
        borderRadius: 12,
        padding: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
            }}
          >
            Scene Preview
          </h2>

          <p
            style={{
              marginTop: 6,
              color: "#888",
            }}
          >
            Live preview of the current production scene.
          </p>
        </div>

        <span
          style={{
            background: "#2f7cf6",
            color: "#fff",
            padding: "6px 12px",
            borderRadius: 999,
            fontSize: 13,
          }}
        >
          Scene 1 / 32
        </span>
      </div>

      <div
        style={{
          width: "100%",
          aspectRatio: "16 / 9",
          background: "#0e0e0e",
          border: "1px dashed #444",
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            textAlign: "center",
            color: "#777",
          }}
        >
          <div
            style={{
              fontSize: 64,
              marginBottom: 16,
            }}
          >
            🎬
          </div>

          <h3
            style={{
              margin: 0,
            }}
          >
            Preview will appear here
          </h3>

          <p>
            Generated image / animation / video
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 16,
        }}
      >
        <InfoCard
          title="Character"
          value="Napoleon"
        />

        <InfoCard
          title="Environment"
          value="Battlefield"
        />

        <InfoCard
          title="Camera"
          value="Slow Push In"
        />

        <InfoCard
          title="Status"
          value="Waiting..."
        />
      </div>
    </div>
  );
}

interface InfoCardProps {
  title: string;

  value: string;
}

function InfoCard({
  title,
  value,
}: InfoCardProps) {
  return (
    <div
      style={{
        background: "#202020",
        border: "1px solid #333",
        borderRadius: 10,
        padding: 14,
      }}
    >
      <div
        style={{
          color: "#888",
          fontSize: 13,
          marginBottom: 8,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontWeight: 600,
        }}
      >
        {value}
      </div>
    </div>
  );
}