import "./ProjectProfileSidebar.css";

interface Props {
  selectedSection: string;

  onSelect: (section: string) => void;
}

const sections = [
  {
    id: "general",
    title: "📁 Tổng quan",
  },
  {
    id: "workspace",
    title: "🌐 Giao diện",
  },
  {
    id: "market",
    title: "🎯 Thị trường",
  },
  {
    id: "audience",
    title: "👥 Đối tượng",
  },
  {
    id: "ai",
    title: "🤖 AI",
  },
  {
    id: "image",
    title: "🖼️ Hình ảnh",
  },
  {
    id: "video",
    title: "🎬 Video",
  },
  {
    id: "voice",
    title: "🎙️ Giọng đọc",
  },
  {
    id: "render",
    title: "🎞️ Render",
  },
  {
    id: "export",
    title: "📦 Xuất video",
  },
];

export default function ProjectProfileSidebar({
  selectedSection,
  onSelect,
}: Props) {
  return (
    <aside className="profile-sidebar">
      <h3>PROJECT PROFILE</h3>

      <div className="profile-menu">
        {sections.map((item) => (
          <button
            key={item.id}
            className={
              selectedSection === item.id
                ? "active"
                : ""
            }
            onClick={() =>
              onSelect(item.id)
            }
          >
            {item.title}
          </button>
        ))}
      </div>
    </aside>
  );
}