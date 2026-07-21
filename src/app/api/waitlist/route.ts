import { Resend } from "resend";
import { NextResponse } from "next/server";

const NOTIFY_EMAIL = process.env.WAITLIST_NOTIFY_EMAIL ?? "ggill@armstrongfluidtechnology.com";
const FROM = "Lumerial <onboarding@resend.dev>";

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const resend = new Resend(apiKey);

  const { email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const [notify, confirm] = await Promise.allSettled([
    // Internal notification
    resend.emails.send({
      from: FROM,
      to: NOTIFY_EMAIL,
      subject: `New waitlist signup: ${email}`,
      html: `<p><strong>${email}</strong> just joined the Lumerial waitlist.</p>`,
    }),
    // Confirmation to the user
    resend.emails.send({
      from: FROM,
      to: email,
      subject: "You're on the Lumerial waitlist",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px">
          <div style="font-size:18px;font-weight:700;letter-spacing:-0.03em;margin-bottom:24px">lumerial</div>
          <p style="font-size:15px;line-height:1.6;color:#333;margin:0 0 16px">
            You're on the list. We'll reach out personally when your spot is ready — no mass blast, just a note from us.
          </p>
          <p style="font-size:13px;color:#888;margin:0">
            — The Lumerial team
          </p>
        </div>
      `,
    }),
  ]);

  // Still return success even if confirmation email fails — the signup is captured
  if (notify.status === "rejected") {
    console.error("Notify email failed:", notify.reason);
    return NextResponse.json({ error: "Failed to record signup" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
