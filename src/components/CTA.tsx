"use client";

import { useState } from "react";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-24 px-6" style={{ borderTop: "1px solid #1f1f1f" }}>
      <div className="max-w-6xl mx-auto">
        <div
          className="p-12 md:p-16"
          style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 4 }}
        >
          <div className="max-w-xl">
            <div className="text-xs font-medium mb-6" style={{ color: "#a3e635", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Early access
            </div>
            <h2
              className="font-bold tracking-tight mb-4"
              style={{ fontSize: "clamp(32px, 4vw, 56px)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
            >
              Stop guessing.
              <br />
              Start knowing.
            </h2>
            <p className="text-base mb-8" style={{ color: "#555", lineHeight: 1.7 }}>
              We&apos;re in private beta. Drop your email and we&apos;ll reach out when your spot is ready.
            </p>

            {submitted ? (
              <div
                className="inline-flex items-center gap-2 text-sm font-medium px-5 py-3"
                style={{ border: "1px solid #a3e635", color: "#a3e635", borderRadius: 4 }}
              >
                <span style={{ fontWeight: 900 }}>+</span> You&apos;re on the list — we&apos;ll be in touch.
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
                className="flex gap-2"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="flex-1 text-sm px-4 py-3 outline-none transition-colors duration-150"
                  style={{
                    background: "#0c0c0c",
                    border: "1px solid #1f1f1f",
                    color: "#fff",
                    borderRadius: 4,
                    maxWidth: 300,
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#a3e635")}
                  onBlur={(e) => (e.target.style.borderColor = "#1f1f1f")}
                />
                <button
                  type="submit"
                  className="text-sm font-bold px-5 py-3 transition-colors duration-150 whitespace-nowrap"
                  style={{ background: "#a3e635", color: "#0c0c0c", border: "none", borderRadius: 4, cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#bef264")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#a3e635")}
                >
                  Join waitlist
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
