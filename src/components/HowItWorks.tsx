const steps = [
  {
    n: "01",
    title: "Connect your sources",
    description:
      "OAuth into App Store Connect, Google Play, Zendesk, Intercom, BigSnag, Reddit, and more in under 5 minutes. No engineering required.",
    tag: "20+ integrations",
  },
  {
    n: "02",
    title: "Lumerial processes your signals",
    description:
      "Our pipeline ingests, deduplicates, and runs semantic analysis across all sources. Themes emerge automatically — no taxonomy to maintain.",
    tag: "Updated every 15 min",
  },
  {
    n: "03",
    title: "Get actionable intelligence",
    description:
      "A unified dashboard shows what users are saying, how sentiment is trending, and what engineers should fix — with one-click export to Jira, Linear, or Notion.",
    tag: "Sync to your workflow",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6" style={{ borderTop: "1px solid #1f1f1f" }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <div className="text-xs font-medium mb-4" style={{ color: "#a3e635", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            How it works
          </div>
          <h2
            className="font-bold tracking-tight"
            style={{ fontSize: "clamp(32px, 4vw, 56px)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
          >
            Set up in minutes.
            <br />
            Ship smarter in days.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0" style={{ border: "1px solid #1f1f1f", borderRadius: 4 }}>
          {steps.map((step, i) => (
            <div
              key={step.n}
              className="p-8"
              style={{ borderRight: i < 2 ? "1px solid #1f1f1f" : "none" }}
            >
              <div className="flex items-center justify-between mb-8">
                <span
                  className="text-4xl font-bold tracking-tight"
                  style={{ color: "#1f1f1f", letterSpacing: "-0.04em" }}
                >
                  {step.n}
                </span>
                <span
                  className="text-xs px-2 py-1"
                  style={{ border: "1px solid #1f1f1f", color: "#555", borderRadius: 4 }}
                >
                  {step.tag}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-3">{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#555" }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
