interface QueueItem {
  id: string;

  name: string;

  status:
    | "waiting"
    | "running"
    | "completed"
    | "failed";

  progress: number;
}

const queue: QueueItem[] = [
  {
    id: "1",
    name: "History of Rome",
    status: "running",
    progress: 42,
  },
  {
    id: "2",
    name: "Napoleon Documentary",
    status: "waiting",
    progress: 0,
  },
  {
    id: "3",
    name: "Ancient Egypt",
    status: "waiting",
    progress: 0,
  },
];

function statusColor(status: QueueItem["status"]) {
  switch (status) {
    case "completed":
      return "#4caf50";

    case "running":
      return "#2196f3";

    case "failed":
      return "#f44336";

    default:
      return "#999";
  }
}

export default function ProductionQueue() {
  return (
    <div
      style={{
        background: "#181818",
        border: "1px solid #2b2b2b",
        borderRadius: 12,
        padding: 20,
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: 20,
        }}
      >
        Production Queue
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {queue.map((job) => (
          <div
            key={job.id}
            style={{
              background: "#202020",
              border: "1px solid #333",
              borderRadius: 10,
              padding: 14,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <strong>{job.name}</strong>

              <span
                style={{
                  color: statusColor(job.status),
                  textTransform: "capitalize",
                }}
              >
                {job.status}
              </span>
            </div>

            <div
              style={{
                height: 8,
                background: "#2d2d2d",
                borderRadius: 999,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${job.progress}%`,
                  height: "100%",
                  background: "#2f7cf6",
                }}
              />
            </div>

            <div
              style={{
                marginTop: 8,
                color: "#888",
                fontSize: 12,
              }}
            >
              {job.progress}% complete
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}