import type { PropItem } from "./PropPage";

interface PropDetailsProps {
  prop: PropItem | null;
}

export default function PropDetails({
  prop,
}: PropDetailsProps) {
  if (!prop) {
    return (
      <div
        style={{
          border: "1px solid #333",
          borderRadius: 12,
          padding: 24,
          color: "#888",
        }}
      >
        Select a prop to view details.
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
            }}
          >
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
        <h2>{prop.name}</h2>

        <div>
          <strong>Category</strong>

          <p
            style={{
              color: "#6ea8fe",
            }}
          >
            {prop.category}
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
            {prop.description || "No description."}
          </p>
        </div>

        <div>
          <strong>Reference Images</strong>

          <p
            style={{
              color: "#777",
            }}
          >
            (Coming in Sprint 10)
          </p>
        </div>

        <div>
          <strong>Projects Using This Prop</strong>

          <p
            style={{
              color: "#777",
            }}
          >
            (Coming in Sprint 10)
          </p>
        </div>
      </div>
    </div>
  );
}