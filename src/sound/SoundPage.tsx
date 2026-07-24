import { useState } from "react";

import SoundToolbar from "./SoundToolbar";
import SoundForm from "./SoundForm";
import SoundGrid from "./SoundGrid";
import SoundDetails from "./SoundDetails";

export interface SoundItem {
  id: string;

  name: string;

  category: string;

  description: string;

  file?: string;

  duration?: number;

  tags?: string[];
}

export default function SoundPage() {
  const [sounds, setSounds] = useState<SoundItem[]>([]);

  const [selected, setSelected] =
    useState<SoundItem | null>(null);

  const [showForm, setShowForm] =
    useState(false);

  function handleCreate(sound: SoundItem) {
    setSounds((prev) => [...prev, sound]);

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
      <SoundToolbar
        onAdd={() => setShowForm(true)}
      />

      {showForm && (
        <SoundForm
          onCreate={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}

      <SoundGrid
        sounds={sounds}
        onSelect={setSelected}
      />

      <SoundDetails
        sound={selected}
      />
    </div>
  );
}