import { useRef, useEffect } from "react";
import aboutData from "../data/about.json";

function RevealBlock({ children, className = "", style }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`reveal ${className}`} ref={ref} style={style}>
      {children}
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="section-auto bg-surface">
      <div className="container">
        <RevealBlock>
          <div className="section-header">
            <span className="overline-gold">Who We Are</span>
            <h2>About Ophini Entertainment</h2>
            <hr className="divider-gold" />
          </div>
        </RevealBlock>

        <RevealBlock className="about-overview">
          <p className="body-lg" style={{ lineHeight: "var(--leading-relaxed)", textAlign: "center" }}>
            {aboutData.overview}
          </p>
        </RevealBlock>

        <RevealBlock className="about-block" style={{ marginTop: "var(--space-20)" }}>
          <h3 style={{ marginBottom: "var(--space-8)" }}>Our Story</h3>
          <div className="timeline">
            {aboutData.history.map((item, i) => (
              <div className="timeline-item" key={i}>
                <span className="timeline-year">{item.year}</span>
                <p className="body-base">{item.event}</p>
              </div>
            ))}
          </div>
        </RevealBlock>

        <RevealBlock className="about-block" style={{ marginTop: "var(--space-20)" }}>
          <h3 style={{ marginBottom: "var(--space-6)" }}>Our Mandate</h3>
          <p className="body-lg" style={{ lineHeight: "var(--leading-relaxed)" }}>
            {aboutData.mandate}
          </p>
        </RevealBlock>
      </div>
    </section>
  );
}
