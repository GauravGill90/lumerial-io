"use client";

import { ArrowsClockwise, ArrowRight } from "@phosphor-icons/react";


export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-14 px-6">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">

          {/* Left: copy */}
          <div>
            <div className="flex items-center gap-3 mb-10">
              <span
                className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5"
                style={{ border: "1px solid #e8e8e8", color: "#666", borderRadius: 4 }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#eab308" }} />
                Private beta — join the waitlist
              </span>
            </div>

            <h1
              className="font-bold tracking-tight mb-8 text-[#0a0a0a]"
              style={{ fontSize: "clamp(44px, 5.5vw, 80px)", lineHeight: 1.0, letterSpacing: "-0.04em" }}
            >
              All your signals.
              <br />
              <span style={{ color: "#eab308" }}>One answer.</span>
            </h1>

            <p className="text-lg leading-relaxed mb-10 max-w-md" style={{ color: "#555" }}>
              Lumerial aggregates app reviews, support tickets, and forum threads —
              then surfaces what users actually need and what your engineers should fix first.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="#waitlist"
                className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 transition-colors duration-150"
                style={{ background: "#eab308", color: "#0a0a0a", borderRadius: 4 }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#fbbf24")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#eab308")}
              >
                Request access <ArrowRight size={14} weight="bold" />
              </a>
              <a
                href="#how-it-works"
                className="text-sm font-medium px-6 py-3 transition-colors duration-150"
                style={{ border: "1px solid #e8e8e8", color: "#555", borderRadius: 4 }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#0a0a0a"; e.currentTarget.style.borderColor = "#ccc"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#555"; e.currentTarget.style.borderColor = "#e8e8e8"; }}
              >
                How it works →
              </a>
            </div>
          </div>

          {/* Right: gradient dashboard */}
          <div
            className="flex flex-col overflow-hidden"
            style={{
              borderRadius: 12,
              background: "linear-gradient(145deg, #0f0f1a 0%, #0a0a12 100%)",
              boxShadow: "0 32px 64px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.06)",
            }}
          >
            {/* Window chrome */}
            <div
              className="flex items-center gap-1.5 px-4 py-3 shrink-0"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
              <span
                className="ml-3 text-xs px-2.5 py-0.5"
                style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)", borderRadius: 4, border: "1px solid rgba(255,255,255,0.08)" }}
              >
                app.lumerial.io / signals
              </span>
              <span className="ml-auto flex items-center gap-1.5">
                <ArrowsClockwise size={11} weight="regular" color="rgba(255,255,255,0.25)" />
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>Live</span>
              </span>
            </div>

            {/* Dashboard body */}
            <div className="p-4 flex flex-col gap-3">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Signals today", value: "2,847", delta: "+12%", color: "#eab308" },
                  { label: "Sentiment", value: "73 / 100", delta: "+4 pts", color: "#eab308" },
                  { label: "Top theme", value: "Onboarding", delta: "↑ rising", color: "#888" },
                  { label: "Critical issues", value: "3", delta: "−2 resolved", color: "#f43f5e" },
                ].map((stat) => (
                  <div key={stat.label} className="p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="text-xs mb-1.5" style={{ color: "rgba(255,255,255,0.35)" }}>{stat.label}</div>
                    <div className="text-base font-bold" style={{ color: "#fff", letterSpacing: "-0.02em" }}>{stat.value}</div>
                    <div className="text-xs mt-1" style={{ color: stat.color }}>{stat.delta}</div>
                  </div>
                ))}
              </div>

              {/* Signal feed */}
              <div className="rounded-lg overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="px-3 py-2 text-xs font-medium" style={{ background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.3)", borderBottom: "1px solid rgba(255,255,255,0.06)", letterSpacing: "0.08em" }}>
                  RECENT SIGNALS
                </div>
                {[
                  { src: "App Store", color: "#eab308", text: "Checkout spinning forever on iOS 17.4 — 3 days now", theme: "Checkout" },
                  { src: "Sentry", color: "#f43f5e", text: "34 unhandled exceptions · ExportManager.swift:214", theme: "Crash" },
                  { src: "Reddit", color: "#f97316", text: "Search results feel really stale, not relevant at all", theme: "Search" },
                ].map((row) => (
                  <div key={row.text} className="flex items-start gap-2.5 px-3 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <span className="text-xs px-1.5 py-0.5 rounded shrink-0 font-medium mt-0.5" style={{ background: `${row.color}18`, color: row.color, border: `1px solid ${row.color}30` }}>
                      {row.src}
                    </span>
                    <span className="text-xs leading-relaxed flex-1 line-clamp-1" style={{ color: "rgba(255,255,255,0.4)" }}>{row.text}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded shrink-0" style={{ background: "rgba(234,179,8,0.12)", color: "#eab308" }}>{row.theme}</span>
                  </div>
                ))}
              </div>

              {/* Sentiment bar */}
              <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em" }}>SENTIMENT — LAST 30 DAYS</span>
                  <span className="text-xs font-medium" style={{ color: "#eab308" }}>73 / 100</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
                  <div className="h-full rounded-full" style={{ width: "73%", background: "#eab308" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
