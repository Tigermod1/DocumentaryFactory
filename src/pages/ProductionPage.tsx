import { useState } from "react";
import { startProduction } from "../production/ProductionService";

export default function ProductionPage() {
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function produce() {
    try {
      setRunning(true);

      const job = await startProduction({
        projectId: "demo-project",

        projectName: "My Documentary",

        topic: "The Rise of Ancient Rome",

        market: "US",

        style: "Documentary",

        language: "English",

        script: `
This is a demo documentary script.

Ancient Rome was one of the greatest civilizations in human history.
`,

        provider: "flow",

        options: {
          generateImages: false,
          generateVideos: false,
          renderVideo: false,
          generateThumbnail: false,
          generateSEO: false,
          publish: false,
        },
      });

      setResult(job);
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Unknown error");
      }
    } finally {
      setRunning(false);
    }
  }

  return (
    <div
      style={{
        padding: 40,
        background: "#111",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      <h1>Documentary Factory</h1>

      <h2>Production</h2>

      <button
        onClick={produce}
        disabled={running}
        style={{
          padding: "16px 36px",
          fontSize: 18,
        }}
      >
        {running ? "RUNNING..." : "PRODUCE"}
      </button>

      {result && (
        <pre
          style={{
            marginTop: 30,
            background: "#222",
            padding: 20,
            borderRadius: 8,
          }}
        >
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}