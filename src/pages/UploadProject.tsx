import { useState } from "react";

export default function UploadProject() {
  const [projectName, setProjectName] = useState("");

  const [script, setScript] = useState<File | null>(null);
  const [subtitle, setSubtitle] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  async function importProject() {
    if (!projectName.trim()) {
      alert("Please enter project name.");
      return;
    }

    setLoading(true);

    const scriptText = script ? await script.text() : "";
    const subtitleText = subtitle ? await subtitle.text() : "";

    const body = {
      name: projectName,
      script: scriptText,
      subtitle: subtitleText,
      audio: audio?.name ?? "",
    };

    const response = await fetch("http://127.0.0.1:3001/api/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    console.log(result);

    alert("Project imported successfully.");

    setLoading(false);
  }

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "40px auto",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <h1>Documentary Factory</h1>

      <input
        placeholder="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />

      <label>
        Script (.txt)

        <input
          type="file"
          accept=".txt"
          onChange={(e) => setScript(e.target.files?.[0] ?? null)}
        />
      </label>

      <label>
        Subtitle (.srt)

        <input
          type="file"
          accept=".srt"
          onChange={(e) => setSubtitle(e.target.files?.[0] ?? null)}
        />
      </label>

      <label>
        Voice (.mp3)

        <input
          type="file"
          accept=".mp3"
          onChange={(e) => setAudio(e.target.files?.[0] ?? null)}
        />
      </label>

      <hr />

      <div>Script: {script?.name ?? "-"}</div>

      <div>Subtitle: {subtitle?.name ?? "-"}</div>

      <div>Audio: {audio?.name ?? "-"}</div>

      <button onClick={importProject} disabled={loading}>
        {loading ? "Importing..." : "Import Project"}
      </button>
    </div>
  );
}