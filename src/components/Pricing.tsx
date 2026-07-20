"use client";

import { useState } from "react";

const plans = [
  {
    name: "Starter",
    monthly: 149,
    annual: 119,
    description: "For small product teams getting started.",
    features: ["5 signal sources", "10,000 signals/month", "Semantic clustering", "Weekly digest", "3 seats", "30-day retention"],
    cta: "Start free trial",
    highlight: false,
  },
  {
    name: "Growth",
    monthly: 399,
    annual: 319,
    description: "For teams that need real-time intelligence across all channels.",
    features: ["Unlimited sources", "100,000 signals/month", "Priority scoring + alerts", "Role-based views", "Jira / Linear / Notion sync", "15 seats", "1-year retention", "Slack + email alerts"],
    cta: "Start free trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    monthly: null,
    annual: null,
    description: "Custom volume, SSO, dedicated support, compliance guarantees.",
    features: ["Unlimited everything", "Custom integrations", "SSO / SAML", "SOC 2 Type II", "Dedicated CSM", "SLA guarantee", "On-prem option"],
    cta: "Talk to sales",
    highlight: false,
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 px-6" style={{ borderTop: "1px solid #1f1f1f" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="text-xs font-medium mb-4" style={{ color: "#a3e635", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Pricing
            </div>
            <h2
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(32px, 4vw, 56px)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
            >
              Simple, transparent pricing.
            </h2>
          </div>

          {/* Toggle */}
          <div
            className="inline-flex"
            style={{ border: "1px solid #1f1f1f", borderRadius: 4, padding: 4 }}
          >
            {[["Monthly", false], ["Annual", true]].map(([label, val]) => (
              <button
                key={String(label)}
                onClick={() => setAnnual(val as boolean)}
                className="text-xs font-medium px-4 py-2 transition-colors duration-150 flex items-center gap-2"
                style={{
                  background: annual === val ? "#1f1f1f" : "transparent",
                  color: annual === val ? "#fff" : "#555",
                  borderRadius: 2,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {label}
                {val && (
                  <span style={{ color: "#a3e635", fontSize: 10, fontWeight: 700 }}>–20%</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ border: "1px solid #1f1f1f", borderRadius: 4 }}
        >
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className="p-8 flex flex-col"
              style={{
                borderRight: i < 2 ? "1px solid #1f1f1f" : "none",
                background: plan.highlight ? "#111" : "transparent",
              }}
            >
              {plan.highlight && (
                <div
                  className="text-xs font-bold mb-4 self-start px-2 py-1"
                  style={{ background: "#a3e635", color: "#0c0c0c", borderRadius: 4, letterSpacing: "0.05em" }}
                >
                  MOST POPULAR
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                <p className="text-sm" style={{ color: "#555" }}>{plan.description}</p>
              </div>

              <div className="mb-8">
                {plan.monthly ? (
                  <>
                    <span
                      className="font-bold tracking-tight"
                      style={{ fontSize: 40, letterSpacing: "-0.03em" }}
                    >
                      ${annual ? plan.annual : plan.monthly}
                    </span>
                    <span className="text-sm ml-1" style={{ color: "#555" }}>/mo</span>
                    {annual && (
                      <div className="text-xs mt-1" style={{ color: "#555" }}>billed annually</div>
                    )}
                  </>
                ) : (
                  <span
                    className="font-bold tracking-tight"
                    style={{ fontSize: 40, letterSpacing: "-0.03em" }}
                  >
                    Custom
                  </span>
                )}
              </div>

              <ul className="flex flex-col gap-3 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <span style={{ color: "#a3e635", fontWeight: 700 }}>+</span>
                    <span style={{ color: "#888" }}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className="block text-center py-3 text-sm font-bold transition-colors duration-150"
                style={
                  plan.highlight
                    ? { background: "#a3e635", color: "#0c0c0c", borderRadius: 4 }
                    : { border: "1px solid #1f1f1f", color: "#fff", borderRadius: 4 }
                }
                onMouseEnter={(e) => {
                  if (plan.highlight) e.currentTarget.style.background = "#bef264";
                  else e.currentTarget.style.borderColor = "#2a2a2a";
                }}
                onMouseLeave={(e) => {
                  if (plan.highlight) e.currentTarget.style.background = "#a3e635";
                  else e.currentTarget.style.borderColor = "#1f1f1f";
                }}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-sm mt-6" style={{ color: "#555" }}>
          14-day free trial on all plans. No credit card required.
        </p>
      </div>
    </section>
  );
}
