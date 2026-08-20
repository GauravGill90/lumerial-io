import { Resend } from "resend";
import { NextResponse } from "next/server";

const NOTIFY_EMAIL = process.env.WAITLIST_NOTIFY_EMAIL ?? "hello@lumerial.io";
const FROM = "Lumerial <hello@lumerial.io>";

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const resend = new Resend(apiKey);

  const { name, email, company, message } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (!name || !company) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const escape = (s: string) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));

  const [notify, confirm] = await Promise.allSettled([
    resend.emails.send({
      from: FROM,
      to: NOTIFY_EMAIL,
      subject: `New design partner application: ${company}`,
      html: `
        <p><strong>${escape(name)}</strong> (${escape(email)}) at <strong>${escape(company)}</strong> applied to be a design partner.</p>
        ${message ? `<p>Message: ${escape(message)}</p>` : ""}
      `,
    }),
    resend.emails.send({
      from: FROM,
      to: email,
      subject: "Your Lumerial design partner application",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px">
          <div style="font-size:18px;font-weight:700;letter-spacing:-0.03em;margin-bottom:24px">lumerial</div>
          <p style="font-size:15px;line-height:1.6;color:#333;margin:0 0 16px">
            Thanks for applying, ${escape(name)}. We review these personally — expect to hear
            back from us directly within a few days.
          </p>
          <p style="font-size:13px;color:#888;margin:0">
            — The Lumerial team
          </p>
        </div>
      `,
    }),
  ]);

  if (notify.status === "rejected") {
    console.error("Notify email failed:", notify.reason);
    return NextResponse.json({ error: "Failed to record application" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
