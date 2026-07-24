import type { EnvironmentItem } from "./EnvironmentPage";

interface EnvironmentGridProps {
  environments: EnvironmentItem[];
  onSelect: (environment: EnvironmentItem) => void;
}

export default function EnvironmentGrid({
  environments,
  onSelect,
}: EnvironmentGridProps) {
  if (environments.length === 0) {
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
        No environments yet.
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
      {environments.map((environment) => (
        <div
          key={environment.id}
          onClick={() => onSelect(environment)}
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
              height: 220,
              background: "#111",
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
              <span
                style={{
                  color: "#666",
                  fontSize: 14,
                }}
              >
                NO PREVIEW
              </span>
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
                marginBottom: 8,
              }}
            >
              {environment.name}
            </h3>

            <p
              style={{
                margin: 0,
                color: "#999",
                fontSize: 14,
                lineHeight: 1.5,
              }}
            >
              {environment.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}