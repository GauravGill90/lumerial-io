"use client";

const features = [
  {
    title: "Unified signal ingestion",
    description:
      "Pull reviews, tickets, social threads, and NPS responses from 20+ sources. No manual tagging. No copy-paste.",
  },
  {
    title: "Semantic theme clustering",
    description:
      "LLM-powered clustering groups related feedback into named themes — so you see \"Slow checkout\" not 3,000 individual complaints.",
  },
  {
    title: "Sentiment trend tracking",
    description:
      "Watch sentiment shift after releases or incidents in real time. Know immediately if your last ship hurt the user experience.",
  },
  {
    title: "Priority scoring",
    description:
      "Signals are weighted by volume, severity, customer tier, and recency. Your backlog gets a ranked list — not a flat dump of noise.",
  },
  {
    title: "Engineering suggestions",
    description:
      "For each theme, Lumerial generates a concrete, code-level fix suggestion your team can act on — not just a vague \"users are unhappy.\"",
  },
  {
    title: "Role-based views",
    description:
      "PMs see feature requests. Engineering sees bug clusters. Support sees escalation trends. One data source, tailored per team.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-16 gap-8 flex-col md:flex-row">
          <h2
            className="font-bold tracking-tight"
            style={{ fontSize: "clamp(32px, 4vw, 56px)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
          >
            Stop drowning in feedback.
            <br />
            Start listening to users.
          </h2>
          <p className="text-base max-w-sm md:text-right" style={{ color: "#555", lineHeight: 1.7 }}>
            Lumerial turns raw signal chaos into structured product intelligence your whole team can act on.
          </p>
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ border: "1px solid #1f1f1f", borderRadius: 4 }}
        >
          {features.map((f, i) => (
            <div
              key={f.title}
              className="p-7 transition-colors duration-150 group"
              style={{
                borderRight: (i + 1) % 3 !== 0 ? "1px solid #1f1f1f" : "none",
                borderBottom: i < 3 ? "1px solid #1f1f1f" : "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#111")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div
                className="text-xs font-medium mb-4"
                style={{ color: "#a3e635", letterSpacing: "0.05em" }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-base font-bold mb-3">{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#555" }}>
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
