import "./ProjectProfileToolbar.css";

interface Props {
  loading: boolean;

  onSave: () => void;

  onReset: () => void;

  onCreate: () => void;
}

export default function ProjectProfileToolbar({
  loading,
  onSave,
  onReset,
  onCreate,
}: Props) {
  return (
    <div className="project-profile-toolbar">
      <div className="toolbar-title">
        <h2>Project Profile</h2>

        <p>
          Quản lý cấu hình trung tâm của
          Documentary Factory
        </p>
      </div>

      <div className="toolbar-actions">
        <button
          onClick={onCreate}
          disabled={loading}
        >
          ➕ Tạo mới
        </button>

        <button
          onClick={onReset}
          disabled={loading}
        >
          🔄 Khôi phục
        </button>

        <button
          className="primary"
          onClick={onSave}
          disabled={loading}
        >
          💾 Lưu Profile
        </button>
      </div>
    </div>
  );
}