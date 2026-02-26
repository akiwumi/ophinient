import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import projects from "../data/projects.json";

const STATUS_LABELS = {
  development: "Development",
  "pre-production": "Pre-Production",
  production: "In Production",
  "post-production": "Post-Production",
  released: "Released",
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);
  const pageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const el = pageRef.current;
    if (el) {
      el.style.opacity = "0";
      requestAnimationFrame(() => {
        el.style.transition = "opacity 0.8s cubic-bezier(0.25,0.1,0.25,1)";
        el.style.opacity = "1";
      });
    }
  }, [slug]);

  const handleBack = () => {
    document.documentElement.style.opacity = "0";
    document.documentElement.style.transition = "opacity 0.5s ease";
    setTimeout(() => {
      navigate("/#projects");
      document.documentElement.style.opacity = "1";
    }, 500);
  };

  if (!project) {
    return (
      <div className="section bg-primary flex-center" style={{ minHeight: "100vh" }}>
        <div className="text-center">
          <h2>Project Not Found</h2>
          <p className="body-lg" style={{ marginTop: "var(--space-4)", marginBottom: "var(--space-8)" }}>
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
          <button className="btn btn-gold" onClick={handleBack}>
            &larr; Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={pageRef}>
      {/* Hero Image */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          className="project-hero-img"
          src={project.featuredImage}
          alt={project.title}
          style={{ width: "100%", display: "block" }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "40%",
            background: "linear-gradient(transparent, var(--bg-primary))",
          }}
        />
      </div>

      <div className="container project-detail-body">
        {/* Back button */}
        <button
          className="btn btn-ghost"
          onClick={handleBack}
          style={{ marginBottom: "var(--space-8)", color: "var(--accent-gold)" }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ marginRight: "var(--space-2)" }}>
            <path d="M12 3L6 9l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Projects
        </button>

        {/* Title & Badge */}
        <span className="badge" style={{ marginBottom: "var(--space-4)", display: "inline-flex" }}>
          {STATUS_LABELS[project.status] || project.status}
        </span>
        <h1 style={{ marginBottom: "var(--space-2)" }}>{project.title}</h1>
        <p className="body-sm text-tertiary" style={{ marginBottom: "var(--space-8)" }}>
          {project.year} &middot; Directed by {project.director}
        </p>

        <hr className="divider-gold" style={{ margin: "0 0 var(--space-10)" }} />

        {/* Synopsis */}
        <div style={{ maxWidth: "var(--content-narrow)" }}>
          <h3 style={{ marginBottom: "var(--space-4)" }}>Synopsis</h3>
          <p className="body-lg" style={{ lineHeight: "var(--leading-relaxed)" }}>
            {project.synopsis}
          </p>
        </div>

        {/* Meta grid */}
        <div className="project-meta" style={{ marginTop: "var(--space-16)" }}>
          <div className="project-meta-item">
            <h6>Director</h6>
            <p className="body-base">{project.director}</p>
          </div>
          <div className="project-meta-item">
            <h6>Year</h6>
            <p className="body-base">{project.year}</p>
          </div>
          <div className="project-meta-item">
            <h6>Status</h6>
            <p className="body-base">{STATUS_LABELS[project.status]}</p>
          </div>
          {project.cast && project.cast.length > 0 && (
            <div className="project-meta-item">
              <h6>Cast</h6>
              <p className="body-base">{project.cast.join(", ")}</p>
            </div>
          )}
        </div>

        {/* Crew */}
        {project.crew && project.crew.length > 0 && (
          <div style={{ marginTop: "var(--space-12)" }}>
            <h3 style={{ marginBottom: "var(--space-6)" }}>Key Crew</h3>
            <div className="project-meta">
              {project.crew.map((member, i) => (
                <div className="project-meta-item" key={i}>
                  <h6>{member.role}</h6>
                  <p className="body-base">{member.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div style={{ marginTop: "var(--space-16)" }}>
            <h3 style={{ marginBottom: "var(--space-6)" }}>Gallery</h3>
            <div className="project-gallery">
              {project.gallery.map((url, i) => (
                <img key={i} src={url} alt={`${project.title} still ${i + 1}`} loading="lazy" />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer area */}
      <div style={{ textAlign: "center", paddingBlock: "var(--space-16)" }}>
        <button className="btn btn-gold btn-lg" onClick={handleBack}>
          &larr; Back to Projects
        </button>
      </div>
    </div>
  );
}
