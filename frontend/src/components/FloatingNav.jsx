import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Home", target: "hero" },
  { label: "Projects", target: "projects" },
  { label: "About", target: "about" },
  { label: "Contact", target: "contact" },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    if (!isHome) return;

    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.target)
    ).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome]);

  const scrollToSection = useCallback(
    (target) => {
      setOpen(false);
      if (!isHome) {
        navigate(`/#${target}`);
        return;
      }
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [isHome, navigate]
  );

  useEffect(() => {
    if (isHome && location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [isHome, location.hash]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Floating hamburger button */}
      <button
        className={`fab-menu ${open ? "open" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle navigation"
      >
        <span className="fab-menu__bar" />
        <span className="fab-menu__bar" />
        <span className="fab-menu__bar" />
      </button>

      {/* Fullscreen overlay menu */}
      <div className={`nav-overlay ${open ? "open" : ""}`}>
        <nav className="nav-overlay__inner">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.target}
              className={`nav-overlay__link ${isHome && activeSection === item.target ? "active" : ""}`}
              onClick={() => scrollToSection(item.target)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
