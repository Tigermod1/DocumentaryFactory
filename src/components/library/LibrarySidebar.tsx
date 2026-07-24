import "./library.css";

export type LibrarySection =
  | "characters"
  | "environments";

interface LibrarySidebarProps {
  section: LibrarySection;

  onChange: (section: LibrarySection) => void;
}

export default function LibrarySidebar({
  section,
  onChange,
}: LibrarySidebarProps) {
  return (
    <aside className="library-sidebar">
      <h2>Library</h2>

      <button
        className={
          section === "characters"
            ? "sidebar-btn active"
            : "sidebar-btn"
        }
        onClick={() => onChange("characters")}
      >
        👤 Characters
      </button>

      <button
        className={
          section === "environments"
            ? "sidebar-btn active"
            : "sidebar-btn"
        }
        onClick={() => onChange("environments")}
      >
        🏛 Environments
      </button>

      <div className="sidebar-divider" />

      <div className="sidebar-info">
        <strong>Documentary Factory</strong>

        <p>
          Asset Library
        </p>

        <small>
          Reuse characters and environments across every
          documentary project.
        </small>
      </div>
    </aside>
  );
}