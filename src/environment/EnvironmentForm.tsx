import { useState } from "react";
import type { EnvironmentItem } from "./EnvironmentPage";

interface EnvironmentFormProps {
  onCreate: (environment: EnvironmentItem) => void;
  onCancel: () => void;
}

export default function EnvironmentForm({
  onCreate,
  onCancel,
}: EnvironmentFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function createEnvironment() {
    if (!name.trim()) return;

    onCreate({
      id: crypto.randomUUID(),
      name,
      description,
    });

    setName("");
    setDescription("");
  }

  return (
    <div
      style={{
        background: "#1d1d1d",
        border: "1px solid #333",
        borderRadius: 12,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <h2>Add Environment</h2>

      <input
        placeholder="Environment Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        rows={5}
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="file"
        multiple
        accept="image/*"
      />

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 10,
        }}
      >
        <button onClick={onCancel}>
          Cancel
        </button>

        <button onClick={createEnvironment}>
          Save Environment
        </button>
      </div>
    </div>
  );
}