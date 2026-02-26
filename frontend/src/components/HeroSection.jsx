import { useEffect, useRef } from "react";

export default function HeroSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero" className="hero" ref={sectionRef}>
      <div className="hero-bg">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1600&q=80"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-an-aerial-view-of-a-city-at-night-3953/1080p.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="hero-letterbox hero-letterbox--top" />
      <div className="hero-letterbox hero-letterbox--bottom" />

      <div className="hero-overlay" />

      <div className="hero-content slide-up">
        <h1 className="display-hero" style={{ marginBottom: 0 }}>
          Ophini<br />Entertainment
        </h1>
        <p className="hero-tagline">
          Crafting cinematic stories that challenge, inspire, and endure.
        </p>
      </div>

      <div className="scroll-cue">
        <span>Scroll</span>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M9 3v12M4 10l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
