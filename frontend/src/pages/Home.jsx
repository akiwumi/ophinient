import HeroSection from "../components/HeroSection";
import ProjectsCarousel from "../components/ProjectsCarousel";
import AboutSection from "../components/AboutSection";
import ContactForm from "../components/ContactForm";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProjectsCarousel />
      <AboutSection />
      <ContactForm />

      <footer
        style={{
          textAlign: "center",
          padding: "var(--space-12) var(--space-6)",
          background: "var(--bg-primary)",
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        <p className="caption">
          &copy; {new Date().getFullYear()} Ophini Entertainment. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
