import { useState, useRef, useEffect } from "react";
import { supabase } from "../lib/supabase";

const INITIAL = { name: "", email: "", subject: "", message: "" };

function validate(values) {
  const errors = {};
  if (!values.name || values.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (!/^[a-zA-Z\s\-']+$/.test(values.name)) {
    errors.name = "Name can only contain letters, spaces, and hyphens.";
  }

  if (!values.email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (values.subject && values.subject.length > 150) {
    errors.subject = "Subject must be 150 characters or fewer.";
  }

  if (!values.message || values.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  } else if (values.message.length > 2000) {
    errors.message = "Message must be 2000 characters or fewer.";
  }

  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);

    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setServerError("");

    const { error } = await supabase.from("contact_messages").insert([
      {
        name: values.name.trim(),
        email: values.email.trim().toLowerCase(),
        subject: values.subject?.trim() || null,
        message: values.message.trim(),
      },
    ]);

    setSubmitting(false);

    if (error) {
      setServerError(error.message || "Something went wrong. Please try again.");
    } else {
      setSuccess(true);
      setValues(INITIAL);
    }
  };

  return (
    <section
      id="contact"
      className="section bg-primary"
      ref={sectionRef}
    >
      <div className="container contact-container">
        <div className="section-header reveal" ref={(el) => {
          if (!el) return;
          const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); }
          }, { threshold: 0.2 });
          obs.observe(el);
        }}>
          <span className="overline-gold">Reach Out</span>
          <h2>Get in Touch</h2>
          <hr className="divider-gold" />
        </div>

        {success ? (
          <div className="form-success-msg slide-up">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ margin: "0 auto var(--space-4)" }}>
              <circle cx="24" cy="24" r="22" stroke="var(--success)" strokeWidth="2" />
              <path d="M15 25l6 6 12-14" stroke="var(--success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h3 style={{ color: "var(--success)", marginBottom: "var(--space-2)" }}>
              Your message has been sent
            </h3>
            <p className="body-base">
              Thank you for reaching out. We&apos;ll be in touch shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex-col gap-6">
            <div className="form-group">
              <label className="label" htmlFor="name">Full Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                className={`input ${errors.name ? "input-error" : ""}`}
                placeholder="Your full name"
                value={values.name}
                onChange={handleChange}
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label className="label" htmlFor="email">Email Address *</label>
              <input
                id="email"
                name="email"
                type="email"
                className={`input ${errors.email ? "input-error" : ""}`}
                placeholder="you@example.com"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="label" htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                className={`input ${errors.subject ? "input-error" : ""}`}
                placeholder="What is this regarding?"
                value={values.subject}
                onChange={handleChange}
              />
              {errors.subject && <span className="form-error">{errors.subject}</span>}
            </div>

            <div className="form-group">
              <label className="label" htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                className={`input ${errors.message ? "input-error" : ""}`}
                placeholder="Tell us about your project or enquiry..."
                value={values.message}
                onChange={handleChange}
              />
              {errors.message && <span className="form-error">{errors.message}</span>}
            </div>

            {serverError && (
              <p className="form-error" style={{ textAlign: "center" }}>{serverError}</p>
            )}

            <button
              type="submit"
              className="btn btn-gold btn-lg"
              disabled={submitting}
              style={{ alignSelf: "center", minWidth: 200, opacity: submitting ? 0.6 : 1 }}
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
