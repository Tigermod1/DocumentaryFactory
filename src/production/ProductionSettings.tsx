export default function ProductionSettings() {
  return (
    <div
      style={{
        background: "#181818",
        border: "1px solid #2b2b2b",
        borderRadius: 12,
        padding: 20,
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: 20,
        }}
      >
        Export Settings
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <Setting
          title="Resolution"
        >
          <select>
            <option>1280 × 720</option>
            <option selected>
              1920 × 1080
            </option>
            <option>2560 × 1440</option>
            <option>3840 × 2160 (4K)</option>
          </select>
        </Setting>

        <Setting
          title="Aspect Ratio"
        >
          <select>
            <option selected>16:9</option>
            <option>9:16</option>
            <option>1:1</option>
            <option>4:5</option>
            <option>21:9</option>
          </select>
        </Setting>

        <Setting title="FPS">
          <select>
            <option>24</option>
            <option selected>30</option>
            <option>60</option>
          </select>
        </Setting>

        <Setting title="Codec">
          <select>
            <option selected>H264</option>
            <option>H265</option>
            <option>AV1</option>
          </select>
        </Setting>

        <Setting title="Quality">
          <select>
            <option>Medium</option>
            <option>High</option>
            <option selected>
              Very High
            </option>
            <option>Lossless</option>
          </select>
        </Setting>

        <hr />

        <label>
          <input
            type="checkbox"
            defaultChecked
          />{" "}
          Burn Subtitle
        </label>

        <label>
          <input
            type="checkbox"
            defaultChecked
          />{" "}
          Export SRT
        </label>

        <label>
          <input
            type="checkbox"
            defaultChecked
          />{" "}
          Voice
        </label>

        <label>
          <input
            type="checkbox"
            defaultChecked
          />{" "}
          Music
        </label>

        <label>
          <input
            type="checkbox"
            defaultChecked
          />{" "}
          Sound FX
        </label>

        <label>
          <input
            type="checkbox"
            defaultChecked
          />{" "}
          Ambience
        </label>

        <hr />

        <button
          style={{
            padding: "12px",
            fontWeight: 700,
            background: "#2f7cf6",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          SAVE SETTINGS
        </button>
      </div>
    </div>
  );
}

interface SettingProps {
  title: string;

  children: React.ReactNode;
}

function Setting({
  title,
  children,
}: SettingProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <strong>{title}</strong>

      {children}
    </div>
  );
}