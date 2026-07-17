"use client";

import { useState } from "react";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div
          className="relative rounded-3xl p-12 overflow-hidden"
          style={{
            background: "rgba(99,102,241,0.07)",
            border: "1px solid rgba(99,102,241,0.25)",
            boxShadow: "0 0 80px rgba(99,102,241,0.1)",
          }}
        >
          {/* Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 100%)",
            }}
          />

          <div className="relative z-10">
            <h2
              className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span className="text-gradient">Stop guessing.</span>
              <br />
              <span className="text-gradient-accent">Start knowing.</span>
            </h2>
            <p className="text-lg mb-8" style={{ color: "var(--foreground-muted)" }}>
              Join 200+ product teams on the waitlist. Early access opens next quarter.
            </p>

            {submitted ? (
              <div
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium"
                style={{
                  background: "rgba(74,222,128,0.1)",
                  border: "1px solid rgba(74,222,128,0.3)",
                  color: "#4ade80",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                You&apos;re on the list — we&apos;ll be in touch.
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid var(--border-strong)",
                    color: "var(--foreground)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(99,102,241,0.5)";
                    e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--border-strong)";
                    e.target.style.boxShadow = "";
                  }}
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    color: "#fff",
                    boxShadow: "0 0 20px rgba(99,102,241,0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 35px rgba(99,102,241,0.5)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(99,102,241,0.3)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Join the waitlist
                </button>
              </form>
            )}

            <p className="mt-4 text-xs" style={{ color: "var(--foreground-muted)" }}>
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
