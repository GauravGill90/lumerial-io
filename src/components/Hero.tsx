"use client";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-14 px-6 relative overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto w-full">
        {/* Label */}
        <div className="flex items-center gap-3 mb-10">
          <span
            className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5"
            style={{
              border: "1px solid #1f1f1f",
              color: "#555",
              borderRadius: 4,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#a3e635" }}
            />
            Private beta — join the waitlist
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-bold tracking-tight mb-8"
          style={{
            fontSize: "clamp(48px, 7vw, 96px)",
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
          }}
        >
          All your signals.
          <br />
          <span style={{ color: "#a3e635" }}>One answer.</span>
        </h1>

        {/* Sub */}
        <p
          className="text-lg leading-relaxed mb-10 max-w-xl"
          style={{ color: "#555" }}
        >
          Lumerial aggregates app reviews, support tickets, and forum threads —
          then surfaces what users actually need and what your engineers should fix first.
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-3 mb-20">
          <a
            href="#"
            className="text-sm font-bold px-6 py-3 transition-colors duration-150"
            style={{ background: "#a3e635", color: "#0c0c0c", borderRadius: 4 }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#bef264")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#a3e635")}
          >
            Request access
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium px-6 py-3 transition-colors duration-150"
            style={{
              border: "1px solid #1f1f1f",
              color: "#555",
              borderRadius: 4,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "#2a2a2a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#555";
              e.currentTarget.style.borderColor = "#1f1f1f";
            }}
          >
            See how it works →
          </a>
        </div>

        {/* Source categories */}
        <div
          className="pt-8"
          style={{ borderTop: "1px solid #1f1f1f" }}
        >
          <div className="flex flex-col gap-4">
            {[
              {
                label: "Reviews & feedback",
                sources: ["App Store", "Google Play", "G2", "Trustpilot", "Intercom", "Zendesk"],
              },
              {
                label: "Telemetry & monitoring",
                sources: ["Sentry", "Datadog", "Crashlytics", "New Relic"],
                highlight: true,
              },
              {
                label: "Community & forums",
                sources: ["Reddit", "Discord", "Slack", "BigSnag"],
              },
            ].map((group) => (
              <div key={group.label} className="flex items-center gap-4 flex-wrap">
                <span
                  className="text-xs w-36 shrink-0"
                  style={{
                    color: group.highlight ? "#a3e635" : "#333",
                    letterSpacing: "0.05em",
                  }}
                >
                  {group.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.sources.map((src) => (
                    <span
                      key={src}
                      className="text-xs px-2.5 py-1"
                      style={{
                        border: group.highlight
                          ? "1px solid rgba(163,230,53,0.25)"
                          : "1px solid #1f1f1f",
                        color: group.highlight ? "#a3e635" : "#555",
                        borderRadius: 4,
                      }}
                    >
                      {src}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
