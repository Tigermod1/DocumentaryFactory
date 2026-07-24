export default function ProductionSidebar() {
  return (
    <aside
      style={{
        width: "100%",
        borderRight: "1px solid #222",
        background: "#181818",
        padding: 20,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <section>
        <h3
          style={{
            marginTop: 0,
            color: "#fff",
          }}
        >
          Project
        </h3>

        <input
          type="text"
          placeholder="Project Name"
          style={{
            width: "100%",
          }}
        />
      </section>

      <section>
        <h3>Script</h3>

        <button
          style={{
            width: "100%",
          }}
        >
          Upload Script
        </button>
      </section>

      <section>
        <h3>Voice</h3>

        <button
          style={{
            width: "100%",
          }}
        >
          Upload Voice
        </button>
      </section>

      <section>
        <h3>Subtitle</h3>

        <button
          style={{
            width: "100%",
          }}
        >
          Upload SRT
        </button>
      </section>

      <section>
        <h3>Character Bible</h3>

        <select
          style={{
            width: "100%",
          }}
        >
          <option>Default Character Bible</option>
        </select>
      </section>

      <section>
        <h3>Environment Bible</h3>

        <select
          style={{
            width: "100%",
          }}
        >
          <option>Default Environment Bible</option>
        </select>
      </section>

      <section>
        <h3>Style Bible</h3>

        <select
          style={{
            width: "100%",
          }}
        >
          <option>BBC Documentary</option>
        </select>
      </section>

      <section>
        <h3>Sound Bible</h3>

        <select
          style={{
            width: "100%",
          }}
        >
          <option>Cinematic Documentary</option>
        </select>
      </section>

      <section>
        <h3>Pipeline</h3>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            color: "#bbb",
            fontSize: 14,
          }}
        >
          <span>✔ Story Analyzer</span>
          <span>✔ Director Engine</span>
          <span>⏳ Prompt Composer</span>
          <span>⏳ Image Generator</span>
          <span>⏳ Animation</span>
          <span>⏳ Sound Design</span>
          <span>⏳ FFmpeg Render</span>
          <span>⏳ Export</span>
        </div>
      </section>
    </aside>
  );
}