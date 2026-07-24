interface ProductionPipelineProps {
  progress: number;

  status:
    | "idle"
    | "running"
    | "completed"
    | "failed";
}

const stages = [
  "Story Analyzer",
  "Character Matcher",
  "Environment Matcher",
  "Director Engine",
  "Prompt Composer",
  "Image Generator",
  "Animation",
  "Sound Design",
  "Subtitle",
  "FFmpeg Render",
  "Export",
];

export default function ProductionPipeline({
  progress,
  status,
}: ProductionPipelineProps) {
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
        <h2
          style={{
            margin: 0,
          }}
        >
          Production Pipeline
        </h2>

        <span
          style={{
            color: "#999",
          }}
        >
          {status.toUpperCase()}
        </span>
      </div>

      <div
        style={{
          height: 12,
          background: "#2b2b2b",
          borderRadius: 999,
          overflow: "hidden",
          marginBottom: 24,
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "#2f7cf6",
            transition: ".3s",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill,minmax(240px,1fr))",
          gap: 12,
        }}
      >
        {stages.map((stage) => (
          <div
            key={stage}
            style={{
              background: "#202020",
              border: "1px solid #333",
              borderRadius: 10,
              padding: 14,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{stage}</span>

            <span
              style={{
                color: "#888",
              }}
            >
              Pending
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}