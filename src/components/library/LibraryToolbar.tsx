import { ChangeEvent } from "react";

interface LibraryToolbarProps {
  search: string;

  onSearch: (value: string) => void;

  onAddCharacter: () => void;

  onAddEnvironment: () => void;
}

export default function LibraryToolbar({
  search,
  onSearch,
  onAddCharacter,
  onAddEnvironment,
}: LibraryToolbarProps) {
  function handleChange(
    e: ChangeEvent<HTMLInputElement>
  ) {
    onSearch(e.target.value);
  }

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <input
        type="text"
        placeholder="Search library..."
        value={search}
        onChange={handleChange}
        style={{
          flex: 1,
          padding: "10px 14px",
          borderRadius: 8,
        }}
      />

      <button onClick={onAddCharacter}>
        + Character
      </button>

      <button onClick={onAddEnvironment}>
        + Environment
      </button>
    </div>
  );
}