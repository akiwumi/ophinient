import { useRef, useEffect, useState, useCallback } from "react";
import ProjectCard from "./ProjectCard";
import projects from "../data/projects.json";

function ArrowLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function ProjectsCarousel() {
  const carouselRef = useRef(null);
  const sectionRef = useRef(null);
  const [scrollPos, setScrollPos] = useState("start");

  const sorted = [...projects].sort((a, b) => a.sortOrder - b.sortOrder);

  const scroll = (direction) => {
    const el = carouselRef.current;
    if (!el) return;
    const amount = 400;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  const updateScrollPos = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const threshold = 8;
    if (scrollLeft <= threshold) {
      setScrollPos("start");
    } else if (scrollLeft + clientWidth >= scrollWidth - threshold) {
      setScrollPos("end");
    } else {
      setScrollPos("middle");
    }
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollPos, { passive: true });
    updateScrollPos();
    return () => el.removeEventListener("scroll", updateScrollPos);
  }, [updateScrollPos]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("visible");
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="section bg-primary" ref={sectionRef}>
      <div className="container-wide">
        <div className="section-header reveal" ref={(el) => {
          if (!el) return;
          const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); }
          }, { threshold: 0.2 });
          obs.observe(el);
        }}>
          <span className="overline-gold">Our Work</span>
          <h2>Projects</h2>
          <hr className="divider-gold" />
        </div>

        <div className="carousel-wrapper">
          <button
            className="carousel-arrow carousel-arrow--left"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <ArrowLeft />
          </button>

          <div className="carousel" ref={carouselRef}>
            {sorted.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <button
            className="carousel-arrow carousel-arrow--right"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <ArrowRight />
          </button>
        </div>

        {/* Mobile scroll indicators below the carousel */}
        <div className="carousel-mobile-hints">
          {scrollPos !== "start" && (
            <button className="carousel-hint-btn" onClick={() => scroll("left")} aria-label="Scroll left">
              <ArrowLeft />
            </button>
          )}
          {scrollPos !== "end" && (
            <button className="carousel-hint-btn" onClick={() => scroll("right")} aria-label="Scroll right">
              <ArrowRight />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
