import { useState } from "react";
import type { SoundItem } from "./SoundPage";

interface SoundFormProps {
  onCreate: (sound: SoundItem) => void;
  onCancel: () => void;
}

export default function SoundForm({
  onCreate,
  onCancel,
}: SoundFormProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  function createSound() {
    if (!name.trim()) return;

    onCreate({
      id: crypto.randomUUID(),
      name,
      category,
      description,
      tags: [],
    });

    setName("");
    setCategory("");
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
      <h2>Add Sound</h2>

      <input
        placeholder="Sound Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Category (Footstep, Rain, Sword...)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <textarea
        rows={5}
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="file"
        accept=".mp3,.wav,.ogg"
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

        <button onClick={createSound}>
          Save Sound
        </button>
      </div>
    </div>
  );
}