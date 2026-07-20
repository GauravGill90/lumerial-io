"use client";

const signals = [
  {
    theme: "Slow checkout",
    volume: "40 signals",
    window: "last 7 days",
    sources: ["App Store", "Zendesk"],
    priority: "high",
    pattern:
      "Reviews mention slow or broken checkout concentrated in iOS 17.4 users. Zendesk tickets show same cohort escalating within 24h of install.",
    suggestion:
      "Likely area: payment flow or cart API. Connect Sentry or Datadog to confirm root cause and get stack-level pinpointing.",
    telemetry: false,
    effort: "M",
  },
  {
    theme: "Search feels outdated",
    volume: "28 signals",
    window: "last 7 days",
    sources: ["Google Play", "Reddit"],
    priority: "medium",
    pattern:
      "Users describe results as 'stale' or 'not relevant' — language clusters around recency, not relevance. Pattern consistent across Android and web.",
    suggestion:
      "Likely area: index freshness or ranking model. Connect Datadog APM to confirm whether index lag correlates with complaint spikes.",
    telemetry: false,
    effort: "S",
  },
  {
    theme: "Crash on export (iOS)",
    volume: "19 signals",
    window: "last 48 hours",
    sources: ["App Store", "Sentry"],
    priority: "critical",
    pattern:
      "Sentry reports 34 unhandled exceptions in ExportManager.swift correlated with App Store reviews mentioning 'crashes when I try to export'. Error rate up 3× since v2.4.1.",
    suggestion:
      "ExportManager.swift line 214 — nil force-unwrap on optional fileURL. Reproduced on iOS 16.4+. Fix: guard let fileURL else { return .failure(.missingFile) }.",
    telemetry: true,
    effort: "XS",
  },
];

const priorityColor: Record<string, string> = {
  critical: "#ef4444",
  high: "#f97316",
  medium: "#eab308",
};

export default function EngineeringSignals() {
  return (
    <section className="py-24 px-6" style={{ borderTop: "1px solid #1f1f1f" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
          <div>
            <div
              className="text-xs font-medium mb-4"
              style={{ color: "#a3e635", letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              Engineering intelligence
            </div>
            <h2
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(32px, 4vw, 56px)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
            >
              Not just &ldquo;users are unhappy.&rdquo;
              <br />
              Here&apos;s the actual fix.
            </h2>
          </div>
          <p className="text-sm max-w-xs" style={{ color: "#555", lineHeight: 1.7 }}>
            For every pain theme Lumerial detects, it generates a prioritized engineering signal your team can act on.
          </p>
        </div>

        {/* Technical explainer */}
        <div
          className="mb-10 flex items-start gap-3 px-4 py-3"
          style={{ border: "1px solid #1f1f1f", borderRadius: 4, background: "#0f0f0f" }}
        >
          <span className="text-xs font-bold shrink-0 mt-0.5" style={{ color: "#333", letterSpacing: "0.05em" }}>HOW</span>
          <p className="text-xs leading-relaxed" style={{ color: "#555" }}>
            <span style={{ color: "#888" }}>Input:</span> review text, ticket text, forum threads — optionally Sentry errors and Datadog traces.{" "}
            <span style={{ color: "#888" }}>Output:</span> themes ranked by volume × recency × customer tier, each mapped to a likely engineering area.{" "}
            <span style={{ color: "#555" }}>Not an LLM summarizer — structured signal extraction with source attribution.</span>
          </p>
        </div>

        {/* Signal cards */}
        <div className="flex flex-col" style={{ border: "1px solid #1f1f1f", borderRadius: 4 }}>
          {signals.map((s, i) => (
            <div
              key={s.theme}
              className="p-6 transition-colors duration-150"
              style={{ borderBottom: i < signals.length - 1 ? "1px solid #1f1f1f" : "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#111")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-5">
                <div className="flex-1">
                  {/* Meta row */}
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span
                      className="text-xs font-bold"
                      style={{ color: priorityColor[s.priority], letterSpacing: "0.05em", textTransform: "uppercase" }}
                    >
                      {s.priority}
                    </span>
                    <span className="text-xs" style={{ color: "#555" }}>
                      {s.volume} · {s.window}
                    </span>
                    {s.sources.map((src) => (
                      <span key={src} className="text-xs" style={{ color: "#333" }}>
                        [{src}]
                      </span>
                    ))}
                    {/* Telemetry badge */}
                    <span
                      className="text-xs px-2 py-0.5 font-medium"
                      style={{
                        borderRadius: 4,
                        background: s.telemetry ? "rgba(163,230,53,0.08)" : "rgba(255,255,255,0.03)",
                        border: s.telemetry ? "1px solid rgba(163,230,53,0.25)" : "1px solid #1f1f1f",
                        color: s.telemetry ? "#a3e635" : "#333",
                      }}
                    >
                      {s.telemetry ? "Telemetry-backed" : "Pattern only"}
                    </span>
                  </div>

                  <h3 className="text-base font-bold mb-3">{s.theme}</h3>

                  {/* Pattern block */}
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "#666" }}>
                    {s.pattern}
                  </p>

                  {/* Suggestion block */}
                  <div
                    className="flex items-start gap-3 p-4"
                    style={{
                      background: "#0c0c0c",
                      border: s.telemetry ? "1px solid rgba(163,230,53,0.2)" : "1px solid #1f1f1f",
                      borderRadius: 4,
                    }}
                  >
                    <span
                      className="text-xs font-bold mt-0.5 shrink-0"
                      style={{ color: s.telemetry ? "#a3e635" : "#444", letterSpacing: "0.05em" }}
                    >
                      {s.telemetry ? "FIX" : "AREA"}
                    </span>
                    <p className="text-sm leading-relaxed" style={{ color: "#888" }}>
                      {s.suggestion}
                    </p>
                  </div>
                </div>

                {/* Effort */}
                <div
                  className="flex items-center justify-center shrink-0 text-xs font-bold"
                  style={{ width: 36, height: 36, border: "1px solid #1f1f1f", borderRadius: 4, color: "#555" }}
                  title="Estimated effort"
                >
                  {s.effort}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span
              className="text-xs px-2 py-0.5"
              style={{ border: "1px solid rgba(163,230,53,0.25)", color: "#a3e635", borderRadius: 4 }}
            >
              Telemetry-backed
            </span>
            <span className="text-xs" style={{ color: "#444" }}>
              Sentry / Datadog connected — stack-level diagnosis
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="text-xs px-2 py-0.5"
              style={{ border: "1px solid #1f1f1f", color: "#333", borderRadius: 4 }}
            >
              Pattern only
            </span>
            <span className="text-xs" style={{ color: "#444" }}>
              Text signal — points to the likely area
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
