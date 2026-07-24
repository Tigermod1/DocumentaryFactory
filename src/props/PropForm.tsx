import { useState } from "react";
import type { PropItem } from "./PropPage";

interface PropFormProps {
  onCreate: (prop: PropItem) => void;
  onCancel: () => void;
}

export default function PropForm({
  onCreate,
  onCancel,
}: PropFormProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  function createProp() {
    if (!name.trim()) return;

    onCreate({
      id: crypto.randomUUID(),
      name,
      category,
      description,
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
      <h2>Add Prop</h2>

      <input
        placeholder="Prop Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Category (Weapon, Book, Chair...)"
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

        <button onClick={createProp}>
          Save Prop
        </button>
      </div>
    </div>
  );
}