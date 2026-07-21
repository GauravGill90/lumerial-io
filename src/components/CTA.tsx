"use client";

import { useState } from "react";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <section id="waitlist" className="py-24 px-6" style={{ borderTop: "1px solid #e8e8e8" }}>
      <div className="max-w-6xl mx-auto">
        <div className="p-12 md:p-16" style={{ background: "#0a0a0a", borderRadius: 4 }}>
          <div className="max-w-xl">
            <div className="text-xs font-semibold mb-6" style={{ color: "#eab308", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Early access
            </div>
            <h2 className="font-bold tracking-tight text-white mb-4" style={{ fontSize: "clamp(32px, 4vw, 56px)", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
              Stop guessing.
              <br />
              <span style={{ color: "#eab308" }}>Start knowing.</span>
            </h2>
            <p className="text-base mb-8" style={{ color: "#777", lineHeight: 1.7 }}>
              We&apos;re in private beta. Drop your email and we&apos;ll reach out when your spot is ready.
            </p>

            {state === "done" ? (
              <div className="inline-flex items-center gap-2 text-sm font-medium px-5 py-3" style={{ border: "1px solid #eab308", color: "#eab308", borderRadius: 4 }}>
                <span style={{ fontWeight: 900 }}>+</span> You&apos;re on the list — we&apos;ll be in touch.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  disabled={state === "loading"}
                  className="flex-1 text-sm px-4 py-3 outline-none transition-colors duration-150"
                  style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", color: "#fff", borderRadius: 4, maxWidth: 300 }}
                  onFocus={(e) => (e.target.style.borderColor = "#eab308")}
                  onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
                />
                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="text-sm font-bold px-5 py-3 transition-colors duration-150 whitespace-nowrap"
                  style={{ background: "#eab308", color: "#0a0a0a", border: "none", borderRadius: 4, cursor: state === "loading" ? "wait" : "pointer", opacity: state === "loading" ? 0.7 : 1 }}
                  onMouseEnter={(e) => { if (state !== "loading") e.currentTarget.style.background = "#fbbf24"; }}
                  onMouseLeave={(e) => { if (state !== "loading") e.currentTarget.style.background = "#eab308"; }}
                >
                  {state === "loading" ? "Joining…" : "Join waitlist"}
                </button>
                {state === "error" && (
                  <p className="text-xs mt-1" style={{ color: "#f43f5e" }}>Something went wrong — try again.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
