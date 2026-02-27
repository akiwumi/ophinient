import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

serve(async (req) => {
  try {
    const payload = await req.json();
    if (!payload?.record) {
      return json({ error: "Invalid payload: missing record" }, 400);
    }

    const { full_name, user_email, content } = payload.record;
    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      console.error("RESEND_API_KEY not set in Supabase secrets");
      return json({ error: "Email service not configured" }, 500);
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Contact Form <onboarding@resend.dev>",
        to: ["akiwumi@icloud.com"],
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
    if (!res.ok) {
      console.error("Resend error:", res.status, data);
      return json(
        { error: data?.message ?? "Email delivery failed" },
        res.status >= 500 ? 502 : res.status
      );
    }

    console.log("Email sent:", data.id);
    return json({ success: true }, 200);
  } catch (error) {
    console.error("Error:", error);
    return json(
      { error: error instanceof Error ? error.message : String(error) },
      500
    );
  }
});