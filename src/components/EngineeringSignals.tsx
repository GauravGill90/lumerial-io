"use client";

const signals = [
  {
    theme: "Slow checkout",
    volume: "40 signals",
    window: "last 7 days",
    sources: ["App Store", "Zendesk"],
    priority: "high",
    pattern: "Reviews mention slow or broken checkout concentrated in iOS 17.4 users. Zendesk tickets show same cohort escalating within 24h of install.",
    suggestion: "Likely area: payment flow or cart API. Connect Sentry or Datadog to confirm root cause and get stack-level pinpointing.",
    telemetry: false,
    effort: "M",
  },
  {
    theme: "Search feels outdated",
    volume: "28 signals",
    window: "last 7 days",
    sources: ["Google Play", "Reddit"],
    priority: "medium",
    pattern: "Users describe results as 'stale' or 'not relevant' — language clusters around recency, not relevance. Pattern consistent across Android and web.",
    suggestion: "Likely area: index freshness or ranking model. Connect Datadog APM to confirm whether index lag correlates with complaint spikes.",
    telemetry: false,
    effort: "S",
  },
  {
    theme: "Crash on export (iOS)",
    volume: "19 signals",
    window: "last 48 hours",
    sources: ["App Store", "Sentry"],
    priority: "critical",
    pattern: "Sentry reports 34 unhandled exceptions in ExportManager.swift correlated with App Store reviews mentioning 'crashes when I try to export'. Error rate up 3× since v2.4.1.",
    suggestion: "ExportManager.swift line 214 — nil force-unwrap on optional fileURL. Reproduced on iOS 16.4+. Fix: guard let fileURL else { return .failure(.missingFile) }.",
    telemetry: true,
    effort: "XS",
  },
];

const priorityColor: Record<string, string> = {
  critical: "#0a0a0a",
  high: "#444",
  medium: "#777",
};

export default function EngineeringSignals() {
  return (
    <section className="py-24 px-6" style={{ borderTop: "1px solid #e8e8e8" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
          <div>
            <div className="text-xs font-semibold mb-4" style={{ color: "#eab308", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Engineering intelligence
            </div>
            <h2 className="font-bold tracking-tight text-[#0a0a0a]" style={{ fontSize: "clamp(32px, 4vw, 56px)", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
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
        <div className="mb-10 flex items-start gap-3 px-4 py-3" style={{ border: "1px solid #e8e8e8", borderRadius: 4, background: "#fafafa" }}>
          <span className="text-xs font-bold shrink-0 mt-0.5" style={{ color: "#999", letterSpacing: "0.05em" }}>HOW</span>
          <p className="text-xs leading-relaxed" style={{ color: "#666" }}>
            <span style={{ color: "#333" }}>Input:</span> review text, ticket text, forum threads — optionally Sentry errors and Datadog traces.{" "}
            <span style={{ color: "#333" }}>Output:</span> themes ranked by volume × recency × customer tier, each mapped to a likely engineering area.{" "}
            Not an LLM summarizer — structured signal extraction with source attribution.
          </p>
        </div>

        {/* Signal cards */}
        <div className="flex flex-col" style={{ border: "1px solid #e8e8e8", borderRadius: 4 }}>
          {signals.map((s, i) => (
            <div
              key={s.theme}
              className="p-6 transition-colors duration-150"
              style={{ borderBottom: i < signals.length - 1 ? "1px solid #e8e8e8" : "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-5">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-xs font-bold" style={{ color: priorityColor[s.priority], letterSpacing: "0.05em", textTransform: "uppercase" }}>
                      {s.priority}
                    </span>
                    <span className="text-xs" style={{ color: "#666" }}>{s.volume} · {s.window}</span>
                    {s.sources.map((src) => (
                      <span key={src} className="text-xs" style={{ color: "#999" }}>[{src}]</span>
                    ))}
                    <span
                      className="text-xs px-2 py-0.5 font-medium"
                      style={{
                        borderRadius: 4,
                        background: s.telemetry ? "#0a0a0a" : "transparent",
                        border: s.telemetry ? "1px solid #0a0a0a" : "1px solid #d0d0d0",
                        color: s.telemetry ? "#fff" : "#777",
                      }}
                    >
                      {s.telemetry ? "Telemetry-backed" : "Pattern only"}
                    </span>
                  </div>

                  <h3 className="text-base font-bold mb-3 text-[#0a0a0a]">{s.theme}</h3>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "#555" }}>{s.pattern}</p>

                  <div
                    className="flex items-start gap-3 p-4"
                    style={{ background: s.telemetry ? "#0a0a0a" : "#fafafa", border: "1px solid #e8e8e8", borderRadius: 4 }}
                  >
                    <span className="text-xs font-bold mt-0.5 shrink-0" style={{ color: s.telemetry ? "#eab308" : "#999", letterSpacing: "0.05em" }}>
                      {s.telemetry ? "FIX" : "AREA"}
                    </span>
                    <p className="text-sm leading-relaxed" style={{ color: s.telemetry ? "#ccc" : "#555" }}>
                      {s.suggestion}
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center justify-center shrink-0 text-xs font-bold"
                  style={{ width: 36, height: 36, border: "1px solid #e8e8e8", borderRadius: 4, color: "#777" }}
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
            <span className="text-xs px-2 py-0.5 bg-[#0a0a0a] text-white" style={{ borderRadius: 4 }}>Telemetry-backed</span>
            <span className="text-xs" style={{ color: "#666" }}>Sentry / Datadog connected — stack-level diagnosis</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5" style={{ border: "1px solid #d0d0d0", color: "#777", borderRadius: 4 }}>Pattern only</span>
            <span className="text-xs" style={{ color: "#666" }}>Text signal — points to likely area</span>
          </div>
        </div>
      </div>
    </section>
  );
}
