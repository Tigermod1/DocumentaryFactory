import { useState } from "react";

import EnvironmentToolbar from "./EnvironmentToolbar";
import EnvironmentForm from "./EnvironmentForm";
import EnvironmentGrid from "./EnvironmentGrid";
import EnvironmentDetails from "./EnvironmentDetails";

export interface EnvironmentItem {
  id: string;
  name: string;
  description: string;
  image?: string;
}

export default function EnvironmentPage() {
  const [environments, setEnvironments] = useState<EnvironmentItem[]>([]);

  const [selected, setSelected] =
    useState<EnvironmentItem | null>(null);

  const [showForm, setShowForm] = useState(false);

  function handleCreate(environment: EnvironmentItem) {
    setEnvironments((prev) => [...prev, environment]);
    setShowForm(false);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        padding: 24,
      }}
    >
      <EnvironmentToolbar
        onAdd={() => setShowForm(true)}
      />

      {showForm && (
        <EnvironmentForm
          onCreate={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}

      <EnvironmentGrid
        environments={environments}
        onSelect={setSelected}
      />

      <EnvironmentDetails
        environment={selected}
      />
    </div>
  );
}