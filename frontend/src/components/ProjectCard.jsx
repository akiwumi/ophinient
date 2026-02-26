import { useNavigate } from "react-router-dom";

const STATUS_LABELS = {
  development: "Development",
  "pre-production": "Pre-Production",
  production: "In Production",
  "post-production": "Post-Production",
  released: "Released",
};

export default function ProjectCard({ project }) {
  const navigate = useNavigate();

  const handleClick = () => {
    document.documentElement.style.opacity = "0";
    document.documentElement.style.transition = "opacity 0.5s ease";
    setTimeout(() => {
      navigate(`/projects/${project.slug}`);
      document.documentElement.style.opacity = "1";
    }, 500);
  };

  return (
    <div className="carousel-card">
      <div
        className="card card-interactive"
        onClick={handleClick}
        role="link"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
      >
        <div className="card-image-wrap">
          <img
            className="card-image"
            src={project.thumbnail}
            alt={project.title}
            loading="lazy"
          />
        </div>
        <div className="card-body">
          <span className="badge" style={{ marginBottom: "var(--space-3)" }}>
            {STATUS_LABELS[project.status] || project.status}
          </span>
          <h4 style={{ marginBottom: "var(--space-2)" }}>{project.title}</h4>
          <p className="body-sm">{project.logline}</p>
        </div>
      </div>
    </div>
  );
}
