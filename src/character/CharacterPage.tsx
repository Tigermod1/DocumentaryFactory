import { useState } from "react";

import CharacterToolbar from "./CharacterToolbar";
import CharacterForm from "./CharacterForm";
import CharacterGrid from "./CharacterGrid";
import CharacterDetails from "./CharacterDetails";

export interface CharacterItem {
  id: string;
  name: string;
  description: string;
  image?: string;
}

export default function CharacterPage() {
  const [characters, setCharacters] = useState<CharacterItem[]>([]);

  const [selected, setSelected] = useState<CharacterItem | null>(null);

  const [showForm, setShowForm] = useState(false);

  function handleCreate(character: CharacterItem) {
    setCharacters((prev) => [...prev, character]);
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
      <CharacterToolbar
        onAdd={() => setShowForm(true)}
      />

      {showForm && (
        <CharacterForm
          onCreate={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}

      <CharacterGrid
        characters={characters}
        onSelect={setSelected}
      />

      <CharacterDetails character={selected} />
    </div>
  );
}