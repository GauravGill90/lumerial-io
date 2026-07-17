"use client";

const suggestions = [
  {
    theme: "Slow checkout flow",
    volume: "847 signals",
    source: "App Store + Zendesk",
    engineeringSuggestion: "API p95 latency on /api/checkout exceeds 3s. Recommend adding Redis cache for cart hydration and moving tax calc to background job.",
    priority: "critical",
    effort: "M",
  },
  {
    theme: "Search returns wrong results",
    volume: "412 signals",
    source: "Google Play + Reddit",
    engineeringSuggestion: "Search index stale by ~6h due to indexing queue backlog. Increase worker concurrency or switch to real-time webhook-driven indexing.",
    priority: "high",
    effort: "S",
  },
  {
    theme: "Onboarding confusion",
    volume: "293 signals",
    source: "Intercom + Surveys",
    engineeringSuggestion: "Step 3 in onboarding flow has no input validation feedback. Add inline error state and consider pre-filling from OAuth profile data.",
    priority: "medium",
    effort: "XS",
  },
];

const priorityColors: Record<string, { bg: string; color: string }> = {
  critical: { bg: "rgba(239,68,68,0.12)", color: "#f87171" },
  high: { bg: "rgba(251,146,60,0.12)", color: "#fb923c" },
  medium: { bg: "rgba(250,204,21,0.1)", color: "#facc15" },
};

export default function EngineeringSignals() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div
            className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{
              color: "#818cf8",
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.2)",
            }}
          >
            Engineering intelligence
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight text-gradient"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Not just &ldquo;users are unhappy.&rdquo;
            <br />
            <span className="text-gradient-accent">Here&apos;s the fix.</span>
          </h2>
          <p
            className="mt-4 text-lg max-w-2xl mx-auto"
            style={{ color: "var(--foreground-muted)" }}
          >
            Lumerial bridges the gap between user pain and engineering action. For each
            theme it detects, it generates a concrete, code-level engineering suggestion
            your team can act on immediately.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {suggestions.map((s) => {
            const pc = priorityColors[s.priority];
            return (
              <div
                key={s.theme}
                className="group rounded-2xl p-5 transition-all duration-300 glass"
                style={{ border: "1px solid var(--border)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(99,102,241,0.25)";
                  e.currentTarget.style.boxShadow =
                    "0 0 30px rgba(99,102,241,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  {/* Left: signal summary */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: pc.bg, color: pc.color }}
                      >
                        {s.priority}
                      </span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: "var(--surface)",
                          color: "var(--foreground-muted)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        {s.volume}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: "var(--foreground-muted)" }}
                      >
                        via {s.source}
                      </span>
                    </div>
                    <h3
                      className="text-base font-semibold mb-1"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {s.theme}
                    </h3>
                  </div>

                  {/* Effort badge */}
                  <div
                    className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{
                      background: "rgba(99,102,241,0.12)",
                      color: "#818cf8",
                      border: "1px solid rgba(99,102,241,0.2)",
                    }}
                    title="Estimated effort"
                  >
                    {s.effort}
                  </div>
                </div>

                {/* Engineering suggestion */}
                <div
                  className="mt-4 rounded-xl px-4 py-3 flex items-start gap-3"
                  style={{
                    background: "rgba(99,102,241,0.06)",
                    border: "1px solid rgba(99,102,241,0.15)",
                  }}
                >
                  <svg
                    className="shrink-0 mt-0.5"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#818cf8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                  <p
                    className="text-sm leading-relaxed font-mono"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    {s.engineeringSuggestion}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p
          className="text-center text-sm mt-8"
          style={{ color: "var(--foreground-muted)" }}
        >
          Engineering suggestions are generated by analyzing signal patterns, your tech stack, and common resolution patterns across similar products.
        </p>
      </div>
    </section>
  );
}
