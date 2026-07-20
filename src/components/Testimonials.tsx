"use client";

const quotes = [
  {
    quote:
      "We used to spend 3 hours a week manually reading App Store reviews. Lumerial does it automatically and surfaces themes we'd never have connected ourselves.",
    name: "Sarah Chen",
    role: "Head of Product",
    company: "Finora",
  },
  {
    quote:
      "The priority scoring is the killer feature. When I go into sprint planning I have a ranked list of user pain points with volume data to back it up.",
    name: "James Okafor",
    role: "VP Engineering",
    company: "Stackly",
  },
  {
    quote:
      "We saw a sentiment drop on Zendesk three days after our last release. Lumerial flagged it before our support team escalated. That's the visibility we never had.",
    name: "Priya Nair",
    role: "Product Lead",
    company: "Helios AI",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6" style={{ borderTop: "1px solid #1f1f1f" }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2
            className="font-bold tracking-tight"
            style={{ fontSize: "clamp(32px, 4vw, 56px)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
          >
            Loved by product teams.
          </h2>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ border: "1px solid #1f1f1f", borderRadius: 4 }}
        >
          {quotes.map((q, i) => (
            <div
              key={q.name}
              className="p-8 flex flex-col gap-6 transition-colors duration-150"
              style={{ borderRight: i < 2 ? "1px solid #1f1f1f" : "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#111")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <p className="text-sm leading-relaxed flex-1" style={{ color: "#888" }}>
                &ldquo;{q.quote}&rdquo;
              </p>
              <div
                className="flex items-center gap-3 pt-6"
                style={{ borderTop: "1px solid #1f1f1f" }}
              >
                <div
                  className="w-8 h-8 flex items-center justify-center text-xs font-bold shrink-0"
                  style={{
                    background: "#a3e635",
                    color: "#0c0c0c",
                    borderRadius: 4,
                  }}
                >
                  {q.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold">{q.name}</div>
                  <div className="text-xs" style={{ color: "#555" }}>
                    {q.role} · {q.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
