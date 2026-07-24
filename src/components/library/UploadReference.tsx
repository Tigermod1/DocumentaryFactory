import { useState } from "react";

interface UploadReferenceProps {
  title: string;

  onFilesSelected?: (files: File[]) => void;
}

export default function UploadReference({
  title,
  onFilesSelected,
}: UploadReferenceProps) {
  const [files, setFiles] = useState<File[]>([]);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const selected = Array.from(event.target.files ?? []);

    setFiles(selected);

    onFilesSelected?.(selected);
  }

  return (
    <div
      style={{
        border: "2px dashed #555",
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
      }}
    >
      <h3>{title}</h3>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleChange}
      />

      <div
        style={{
          marginTop: 16,
          display: "grid",
          gap: 8,
        }}
      >
        {files.length === 0 && (
          <span>No reference images selected.</span>
        )}

        {files.map((file) => (
          <div key={file.name}>
            📷 {file.name}
          </div>
        ))}
      </div>
    </div>
  );
}