const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail({ to, subject, html, from = "onboarding@resend.dev" }) {
  const { data, error } = await resend.emails.send({ from, to, subject, html });
  if (error) throw error;
  return data;
}

module.exports = { sendEmail };
