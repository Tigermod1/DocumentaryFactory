import { useState } from "react";

import ProductionToolbar from "./ProductionToolbar";
import ProductionSidebar from "./ProductionSidebar";
import ProductionPipeline from "./ProductionPipeline";
import ProductionPreview from "./ProductionPreview";
import ProductionLog from "./ProductionLog";
import ProductionQueue from "./ProductionQueue";
import ProductionSettings from "./ProductionSettings";

export interface ProductionJob {
  id: string;

  project: string;

  status:
    | "idle"
    | "running"
    | "completed"
    | "failed";

  progress: number;
}

export default function ProductionPage() {
  const [job] = useState<ProductionJob>({
    id: crypto.randomUUID(),

    project: "Untitled Documentary",

    status: "idle",

    progress: 0,
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "#111",
      }}
    >
      <ProductionToolbar />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "340px 1fr 340px",
          flex: 1,
          overflow: "hidden",
        }}
      >
        <ProductionSidebar />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            padding: 20,
            overflow: "auto",
          }}
        >
          <ProductionPreview />

          <ProductionPipeline
            progress={job.progress}
            status={job.status}
          />

          <ProductionLog />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            padding: 20,
            borderLeft: "1px solid #222",
            overflow: "auto",
          }}
        >
          <ProductionSettings />

          <ProductionQueue />
        </div>
      </div>
    </div>
  );
}