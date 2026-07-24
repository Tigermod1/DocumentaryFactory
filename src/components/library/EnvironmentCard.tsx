import "./library.css";

export interface EnvironmentCardProps {
  id: string;
  name: string;
  description?: string;
  image?: string;

  selected?: boolean;

  onSelect?: (id: string) => void;
}

export default function EnvironmentCard({
  id,
  name,
  description,
  image,
  selected = false,
  onSelect,
}: EnvironmentCardProps) {
  return (
    <div
      className={`library-card ${selected ? "selected" : ""}`}
      onClick={() => onSelect?.(id)}
    >
      <div className="library-preview">
        {image ? (
          <img src={image} alt={name} />
        ) : (
          <div className="library-placeholder">
            ENVIRONMENT
          </div>
        )}
      </div>

      <div className="library-info">
        <h3>{name}</h3>

        <p>{description || "No description"}</p>
      </div>
    </div>
  );
}