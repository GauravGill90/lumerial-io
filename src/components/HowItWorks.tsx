const steps = [
  {
    number: "01",
    title: "Connect your sources",
    description:
      "OAuth into App Store Connect, Google Play Console, Zendesk, Intercom, BigSnag, Reddit, and more in under 5 minutes. No engineering required.",
    detail: "20+ integrations available",
  },
  {
    number: "02",
    title: "Lumerial processes your signals",
    description:
      "Our pipeline ingests, deduplicates, and runs semantic analysis across all sources. Themes emerge automatically — no tagging taxonomy to maintain.",
    detail: "Updated every 15 minutes",
  },
  {
    number: "03",
    title: "Get actionable intelligence",
    description:
      "See a unified dashboard of what users are saying, how sentiment is trending, and which themes need attention. Export to Jira, Linear, or Notion.",
    detail: "Sync to your workflow",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 relative">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(99,102,241,0.04) 0%, transparent 100%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div
            className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{
              color: "#818cf8",
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.2)",
            }}
          >
            How it works
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight text-gradient"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Set up in minutes.
            <br />
            Ship smarter in days.
          </h2>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div
            className="hidden md:block absolute left-1/2 top-12 bottom-12 w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(99,102,241,0.3), rgba(139,92,246,0.3), transparent)",
              transform: "translateX(-50%)",
            }}
          />

          <div className="flex flex-col gap-12">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`flex flex-col md:flex-row items-start md:items-center gap-8 ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${i % 2 === 1 ? "md:text-right" : ""}`}>
                  <div
                    className={`inline-flex items-center gap-2 mb-3 ${
                      i % 2 === 1 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <span
                      className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                      style={{
                        color: "#818cf8",
                        background: "rgba(99,102,241,0.1)",
                      }}
                    >
                      {step.number}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        color: "var(--foreground-muted)",
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      {step.detail}
                    </span>
                  </div>
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-base leading-relaxed max-w-sm"
                    style={{
                      color: "var(--foreground-muted)",
                      marginLeft: i % 2 === 1 ? "auto" : undefined,
                    }}
                  >
                    {step.description}
                  </p>
                </div>

                {/* Center node */}
                <div className="relative flex items-center justify-center z-10">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold glass-strong"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "#818cf8",
                      boxShadow: "0 0 30px rgba(99,102,241,0.2)",
                      border: "1px solid rgba(99,102,241,0.3)",
                    }}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Spacer on alternating side */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
