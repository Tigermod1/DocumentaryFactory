import { useState } from "react";
import type { CharacterItem } from "./CharacterPage";

interface CharacterFormProps {
  onCreate: (character: CharacterItem) => void;
  onCancel: () => void;
}

export default function CharacterForm({
  onCreate,
  onCancel,
}: CharacterFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function createCharacter() {
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
      <h2>Add Character</h2>

      <input
        placeholder="Character Name"
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
          gap: 10,
          justifyContent: "flex-end",
        }}
      >
        <button onClick={onCancel}>
          Cancel
        </button>

        <button onClick={createCharacter}>
          Save Character
        </button>
      </div>
    </div>
  );
}