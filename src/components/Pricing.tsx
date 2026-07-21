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
    <section id="pricing" className="py-24 px-6" style={{ borderTop: "1px solid #e8e8e8" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="text-xs font-semibold mb-4" style={{ color: "#aaa", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Pricing
            </div>
            <h2
              className="font-bold tracking-tight text-[#0a0a0a]"
              style={{ fontSize: "clamp(32px, 4vw, 56px)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
            >
              Simple, transparent pricing.
            </h2>
          </div>

          <div className="inline-flex" style={{ border: "1px solid #e8e8e8", borderRadius: 4, padding: 4 }}>
            {[["Monthly", false], ["Annual", true]].map(([label, val]) => (
              <button
                key={String(label)}
                onClick={() => setAnnual(val as boolean)}
                className="text-xs font-medium px-4 py-2 transition-colors duration-150 flex items-center gap-2"
                style={{
                  background: annual === val ? "#0a0a0a" : "transparent",
                  color: annual === val ? "#fff" : "#aaa",
                  borderRadius: 2,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {label}
                {val && <span style={{ color: annual ? "#fff" : "#0a0a0a", fontSize: 10, fontWeight: 700, opacity: 0.6 }}>–20%</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ border: "1px solid #e8e8e8", borderRadius: 4 }}>
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className="p-8 flex flex-col"
              style={{
                borderRight: i < 2 ? "1px solid #e8e8e8" : "none",
                background: plan.highlight ? "#0a0a0a" : "transparent",
              }}
            >
              {plan.highlight && (
                <div className="text-xs font-bold mb-4 self-start px-2 py-1 bg-white text-[#0a0a0a]" style={{ borderRadius: 4, letterSpacing: "0.05em" }}>
                  MOST POPULAR
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold mb-1" style={{ color: plan.highlight ? "#fff" : "#0a0a0a" }}>{plan.name}</h3>
                <p className="text-sm" style={{ color: plan.highlight ? "#888" : "#777" }}>{plan.description}</p>
              </div>

              <div className="mb-8">
                {plan.monthly ? (
                  <>
                    <span
                      className="font-bold tracking-tight"
                      style={{ fontSize: 40, letterSpacing: "-0.03em", color: plan.highlight ? "#fff" : "#0a0a0a" }}
                    >
                      ${annual ? plan.annual : plan.monthly}
                    </span>
                    <span className="text-sm ml-1" style={{ color: plan.highlight ? "#888" : "#aaa" }}>/mo</span>
                    {annual && <div className="text-xs mt-1" style={{ color: plan.highlight ? "#888" : "#aaa" }}>billed annually</div>}
                  </>
                ) : (
                  <span className="font-bold tracking-tight" style={{ fontSize: 40, letterSpacing: "-0.03em", color: "#0a0a0a" }}>Custom</span>
                )}
              </div>

              <ul className="flex flex-col gap-3 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <span style={{ color: plan.highlight ? "#fff" : "#0a0a0a", fontWeight: 700 }}>+</span>
                    <span style={{ color: plan.highlight ? "#888" : "#777" }}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className="block text-center py-3 text-sm font-bold transition-colors duration-150"
                style={
                  plan.highlight
                    ? { background: "#fff", color: "#0a0a0a", borderRadius: 4 }
                    : { border: "1px solid #e8e8e8", color: "#0a0a0a", borderRadius: 4 }
                }
                onMouseEnter={(e) => {
                  if (plan.highlight) e.currentTarget.style.background = "#e8e8e8";
                  else { e.currentTarget.style.background = "#0a0a0a"; e.currentTarget.style.color = "#fff"; }
                }}
                onMouseLeave={(e) => {
                  if (plan.highlight) e.currentTarget.style.background = "#fff";
                  else { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#0a0a0a"; }
                }}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-sm mt-6" style={{ color: "#aaa" }}>
          14-day free trial on all plans. No credit card required.
        </p>
      </div>
    </section>
  );
}
