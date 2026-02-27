import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  try {
    const payload = await req.json();
    const { full_name, user_email, content } = payload.record;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Contact Form <onboarding@resend.dev>",  // change this if you added a custom domain in Resend
        to: "akiwumi@icloud.com",                        // ← PUT YOUR REAL EMAIL HERE
        subject: `New Contact Form: ${full_name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${full_name}</p>
          <p><strong>Email:</strong> ${user_email}</p>
          <p><strong>Message:</strong></p>
          <p>${content}</p>
        `,
      }),
    });

    const data = await res.json();
    console.log("Email sent:", data);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});