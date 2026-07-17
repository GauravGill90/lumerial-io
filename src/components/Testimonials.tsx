"use client";

const quotes = [
  {
    quote:
      "We used to spend 3 hours a week manually reading App Store reviews and tagging them in Notion. Lumerial does it automatically and surfaces themes we'd never have connected ourselves.",
    name: "Sarah Chen",
    role: "Head of Product",
    company: "Finora",
  },
  {
    quote:
      "The priority scoring is the killer feature. When I go into sprint planning I have a ranked list of user pain points with volume data to back it up. My engineers actually trust it.",
    name: "James Okafor",
    role: "VP Engineering",
    company: "Stackly",
  },
  {
    quote:
      "We saw a sentiment drop on Zendesk tickets three days after our last release. Lumerial flagged it before our support team escalated. That's the kind of visibility we never had before.",
    name: "Priya Nair",
    role: "Product Lead",
    company: "Helios AI",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight text-gradient"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Loved by product teams
          </h2>
          <p className="mt-4 text-lg" style={{ color: "var(--foreground-muted)" }}>
            From early-stage startups to enterprise product orgs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {quotes.map((q) => (
            <div
              key={q.name}
              className="p-6 rounded-2xl flex flex-col gap-4 glass transition-all duration-300"
              style={{ border: "1px solid var(--border)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(99,102,241,0.25)";
                e.currentTarget.style.boxShadow = "0 0 30px rgba(99,102,241,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="#fbbf24"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>

              <p
                className="text-sm leading-relaxed flex-1"
                style={{ color: "var(--foreground-muted)" }}
              >
                &ldquo;{q.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-2" style={{ borderTop: "1px solid var(--border)" }}>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    color: "#fff",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {q.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold">{q.name}</div>
                  <div className="text-xs" style={{ color: "var(--foreground-muted)" }}>
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
