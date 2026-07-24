import type { EnvironmentItem } from "./EnvironmentPage";

interface EnvironmentDetailsProps {
  environment: EnvironmentItem | null;
}

export default function EnvironmentDetails({
  environment,
}: EnvironmentDetailsProps) {
  if (!environment) {
    return (
      <div
        style={{
          border: "1px solid #333",
          borderRadius: 12,
          padding: 24,
          color: "#888",
        }}
      >
        Select an environment to view details.
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "340px 1fr",
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
        {environment.image ? (
          <img
            src={environment.image}
            alt={environment.name}
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
        <h2>{environment.name}</h2>

        <div>
          <strong>Description</strong>

          <p
            style={{
              color: "#aaa",
              lineHeight: 1.6,
            }}
          >
            {environment.description || "No description."}
          </p>
        </div>

        <div>
          <strong>Lighting</strong>

          <p style={{ color: "#777" }}>
            (Coming in Sprint 09)
          </p>
        </div>

        <div>
          <strong>Weather</strong>

          <p style={{ color: "#777" }}>
            (Coming in Sprint 09)
          </p>
        </div>

        <div>
          <strong>Ambience</strong>

          <p style={{ color: "#777" }}>
            (Coming in Sprint 10)
          </p>
        </div>

        <div>
          <strong>Projects Using This Environment</strong>

          <p style={{ color: "#777" }}>
            (Coming in Sprint 10)
          </p>
        </div>
      </div>
    </div>
  );
}