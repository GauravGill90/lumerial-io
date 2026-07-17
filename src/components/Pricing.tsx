"use client";

import { useState } from "react";

const plans = [
  {
    name: "Starter",
    monthlyPrice: 149,
    annualPrice: 119,
    description: "For small product teams getting started with signal intelligence.",
    features: [
      "Up to 5 signal sources",
      "10,000 signals/month",
      "Semantic theme clustering",
      "Weekly digest email",
      "3 team seats",
      "30-day data retention",
    ],
    cta: "Start free trial",
    highlight: false,
  },
  {
    name: "Growth",
    monthlyPrice: 399,
    annualPrice: 319,
    description: "For scaling teams that need real-time intelligence across all channels.",
    features: [
      "Unlimited signal sources",
      "100,000 signals/month",
      "Priority scoring & alerts",
      "Role-based views",
      "Jira / Linear / Notion sync",
      "15 team seats",
      "1-year data retention",
      "Slack & email alerts",
    ],
    cta: "Start free trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: null,
    annualPrice: null,
    description: "Custom volume, SSO, dedicated support, and compliance guarantees.",
    features: [
      "Unlimited everything",
      "Custom integrations",
      "SSO / SAML",
      "SOC 2 Type II",
      "Dedicated CSM",
      "SLA guarantee",
      "On-prem option",
    ],
    cta: "Talk to sales",
    highlight: false,
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div
            className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{
              color: "#818cf8",
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.2)",
            }}
          >
            Pricing
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight text-gradient"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg" style={{ color: "var(--foreground-muted)" }}>
            14-day free trial. No credit card required.
          </p>

          {/* Toggle */}
          <div className="mt-6 inline-flex items-center gap-3 p-1 rounded-xl glass" style={{ border: "1px solid var(--border)" }}>
            <button
              onClick={() => setAnnual(false)}
              className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                background: !annual ? "rgba(99,102,241,0.2)" : "transparent",
                color: !annual ? "#818cf8" : "var(--foreground-muted)",
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2"
              style={{
                background: annual ? "rgba(99,102,241,0.2)" : "transparent",
                color: annual ? "#818cf8" : "var(--foreground-muted)",
              }}
            >
              Annual
              <span
                className="text-xs px-1.5 py-0.5 rounded-full"
                style={{ background: "#4ade8020", color: "#4ade80" }}
              >
                -20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative p-6 rounded-2xl flex flex-col transition-all duration-300"
              style={{
                background: plan.highlight
                  ? "rgba(99,102,241,0.08)"
                  : "var(--surface)",
                border: plan.highlight
                  ? "1px solid rgba(99,102,241,0.4)"
                  : "1px solid var(--border)",
                boxShadow: plan.highlight
                  ? "0 0 50px rgba(99,102,241,0.12)"
                  : undefined,
              }}
            >
              {plan.highlight && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-3 py-1 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    color: "#fff",
                  }}
                >
                  Most popular
                </div>
              )}

              <div className="mb-5">
                <h3
                  className="text-lg font-bold mb-1"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {plan.name}
                </h3>
                <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                {plan.monthlyPrice ? (
                  <>
                    <span
                      className="text-4xl font-bold"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      ${annual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-sm ml-1" style={{ color: "var(--foreground-muted)" }}>
                      /mo
                    </span>
                    {annual && (
                      <div className="text-xs mt-1" style={{ color: "var(--foreground-muted)" }}>
                        billed annually
                      </div>
                    )}
                  </>
                ) : (
                  <span
                    className="text-3xl font-bold"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Custom
                  </span>
                )}
              </div>

              <ul className="flex flex-col gap-2.5 flex-1 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#818cf8"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span style={{ color: "var(--foreground-muted)" }}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className="block text-center py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                style={
                  plan.highlight
                    ? {
                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        color: "#fff",
                        boxShadow: "0 0 20px rgba(99,102,241,0.3)",
                      }
                    : {
                        background: "var(--surface)",
                        color: "var(--foreground)",
                        border: "1px solid var(--border-strong)",
                      }
                }
                onMouseEnter={(e) => {
                  if (plan.highlight) {
                    e.currentTarget.style.boxShadow = "0 0 35px rgba(99,102,241,0.5)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  } else {
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (plan.highlight) {
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(99,102,241,0.3)";
                    e.currentTarget.style.transform = "translateY(0)";
                  } else {
                    e.currentTarget.style.background = "var(--surface)";
                  }
                }}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
