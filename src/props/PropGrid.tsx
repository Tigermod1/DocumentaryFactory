import type { PropItem } from "./PropPage";

interface PropGridProps {
  props: PropItem[];
  onSelect: (prop: PropItem) => void;
}

export default function PropGrid({
  props,
  onSelect,
}: PropGridProps) {
  if (props.length === 0) {
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
        No props yet.
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
      {props.map((prop) => (
        <div
          key={prop.id}
          onClick={() => onSelect(prop)}
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
            {prop.image ? (
              <img
                src={prop.image}
                alt={prop.name}
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
              {prop.name}
            </h3>

            <p
              style={{
                color: "#6ea8fe",
                margin: "0 0 8px 0",
                fontSize: 13,
              }}
            >
              {prop.category}
            </p>

            <p
              style={{
                margin: 0,
                color: "#999",
                fontSize: 14,
                lineHeight: 1.5,
              }}
            >
              {prop.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}