const express = require("express");
const router = express.Router();
const { verifyEmailDomain } = require("../services/emailVerifier");

function validateFields({ name, email, subject, message }) {
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push("Name must be at least 2 characters.");
  } else if (!/^[a-zA-Z\s\-']+$/.test(name)) {
    errors.push("Name can only contain letters, spaces, and hyphens.");
  }

  if (!email) {
    errors.push("Email is required.");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Please provide a valid email address.");
  }

  if (subject && subject.length > 150) {
    errors.push("Subject must be 150 characters or fewer.");
  }

  if (!message || message.trim().length < 10) {
    errors.push("Message must be at least 10 characters.");
  } else if (message.length > 2000) {
    errors.push("Message must be 2000 characters or fewer.");
  }

  return errors;
}

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const fieldErrors = validateFields({ name, email, subject, message });
    if (fieldErrors.length > 0) {
      return res.status(422).json({
        success: false,
        error: fieldErrors[0],
      });
    }

    const isRealDomain = await verifyEmailDomain(email);
    if (!isRealDomain) {
      return res.status(422).json({
        success: false,
        error: "Please use a real email address.",
      });
    }

    let stored = false;
    try {
      const supabase = require("../config/supabase");
      await supabase.from("contact_submissions").insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject ? subject.trim() : null,
        message: message.trim(),
        ip_address: req.ip,
      });
      stored = true;
    } catch {
      /* Supabase not configured — that's ok in dev, we still return success */
    }

    console.log(
      `[Contact] ${stored ? "Stored" : "Received"}: ${name} <${email}> — ${subject || "(no subject)"}`
    );

    res.json({
      success: true,
      message: "Thank you for reaching out. We'll be in touch.",
    });
  } catch (err) {
    console.error("[Contact] Error:", err);
    res.status(500).json({
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    });
  }
});

module.exports = router;
