import { useState } from "react";

import PropToolbar from "./PropToolbar";
import PropForm from "./PropForm";
import PropGrid from "./PropGrid";
import PropDetails from "./PropDetails";

export interface PropItem {
  id: string;
  name: string;
  category: string;
  description: string;
  image?: string;
}

export default function PropPage() {
  const [props, setProps] = useState<PropItem[]>([]);

  const [selected, setSelected] =
    useState<PropItem | null>(null);

  const [showForm, setShowForm] = useState(false);

  function handleCreate(prop: PropItem) {
    setProps((prev) => [...prev, prop]);
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
      <PropToolbar
        onAdd={() => setShowForm(true)}
      />

      {showForm && (
        <PropForm
          onCreate={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}

      <PropGrid
        props={props}
        onSelect={setSelected}
      />

      <PropDetails
        prop={selected}
      />
    </div>
  );
}