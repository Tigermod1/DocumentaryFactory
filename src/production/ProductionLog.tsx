interface LogEntry {
  time: string;

  level: "INFO" | "SUCCESS" | "WARNING" | "ERROR";

  message: string;
}

const logs: LogEntry[] = [
  {
    time: "10:15:01",
    level: "SUCCESS",
    message: "Project loaded.",
  },
  {
    time: "10:15:04",
    level: "SUCCESS",
    message: "Script imported.",
  },
  {
    time: "10:15:06",
    level: "SUCCESS",
    message: "Voice imported.",
  },
  {
    time: "10:15:08",
    level: "INFO",
    message: "Waiting for production...",
  },
];

export default function ProductionLog() {
  return (
    <div
      style={{
        background: "#181818",
        border: "1px solid #2b2b2b",
        borderRadius: 12,
        padding: 20,
        minHeight: 260,
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: 20,
        }}
      >
        Production Log
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          maxHeight: 260,
          overflowY: "auto",
        }}
      >
        {logs.map((log, index) => (
          <div
            key={index}
            style={{
              display: "grid",
              gridTemplateColumns: "90px 90px 1fr",
              gap: 12,
              padding: "10px 12px",
              borderRadius: 8,
              background: "#202020",
              border: "1px solid #2f2f2f",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: "#888",
                fontSize: 12,
              }}
            >
              {log.time}
            </span>

            <span
              style={{
                color:
                  log.level === "SUCCESS"
                    ? "#4caf50"
                    : log.level === "ERROR"
                    ? "#f44336"
                    : log.level === "WARNING"
                    ? "#ff9800"
                    : "#64b5f6",
                fontWeight: 600,
                fontSize: 12,
              }}
            >
              {log.level}
            </span>

            <span>{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}