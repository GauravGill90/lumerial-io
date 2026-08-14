"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowsClockwise, Flag, Trophy, Wrench } from "@phosphor-icons/react";
import BlogReadingProgress from "@/components/BlogReadingProgress";
import BlogTableOfContents from "@/components/BlogTableOfContents";

const tocItems = [
  { id: "signal-value", label: "Why the signal is significant" },
  { id: "revenue-link", label: "How the loop touches revenue" },
  { id: "catching-early", label: "Catching it before the backlog" },
  { id: "live-demo", label: "See it in real time" },
];

const liveFeed: { source: string; text: string }[] = [
  { source: "App Store", text: "Checkout spinner never clears on iOS 17.4." },
  { source: "Support", text: "Same checkout issue reported again this morning." },
  { source: "Play Store", text: "Cart hangs indefinitely after the latest update." },
  { source: "Forum", text: "Anyone else stuck at checkout since the update?" },
];

const TICK_MS = 1300;
const TOTAL_TICKS = liveFeed.length + 3; // reveal each item, pause, hold diagnosis, reset

const radarParticles = [
  { x: 40, y: 30 },
  { x: 26, y: 96 },
  { x: 78, y: 140 },
  { x: 150, y: 32 },
  { x: 164, y: 130 },
  { x: 96, y: 74 },
];
const radarNode = { x: 340, y: 82 };

function SignalRadar() {
  const particleKeyframes = radarParticles
    .map((p, i) => {
      const tx = radarNode.x - p.x;
      const ty = radarNode.y - p.y;
      return `
        @keyframes s2rParticle${i} {
          0% { transform: translate(0px,0px); opacity: 0; }
          6% { opacity: 0.7; }
          48% { transform: translate(0px,0px); opacity: 0.85; }
          64% { transform: translate(${tx}px, ${ty}px); opacity: 1; }
          80% { transform: translate(${tx}px, ${ty}px); opacity: 1; }
          90% { transform: translate(${tx}px, ${ty}px); opacity: 0; }
          100% { transform: translate(0px,0px); opacity: 0; }
        }
      `;
    })
    .join("\n");

  return (
    <div className="py-8">
      <style>{`
        ${particleKeyframes}
        @keyframes s2rNodePulse {
          0%, 100% { r: 22; opacity: 0.3; }
          50% { r: 30; opacity: 0.75; }
        }
        @keyframes s2rCheckFade {
          0%, 56% { opacity: 0; transform: scale(0.6); }
          66% { opacity: 1; transform: scale(1.1); }
          72%, 82% { opacity: 1; transform: scale(1); }
          92%, 100% { opacity: 0; transform: scale(0.6); }
        }
      `}</style>
      <svg viewBox="0 0 400 164" className="w-full" style={{ maxWidth: 480, display: "block", margin: "0 auto" }}>
        <defs>
          <pattern id="s2rDots" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="1.2" cy="1.2" r="1.2" fill="#eee" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="400" height="164" fill="url(#s2rDots)" />

        {radarParticles.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="5"
            fill="#0a0a0a"
            style={{ animation: `s2rParticle${i} 5.5s ease-in-out infinite`, animationDelay: `${i * 0.28}s` }}
          />
        ))}

        <circle
          cx={radarNode.x}
          cy={radarNode.y}
          r="22"
          fill="none"
          stroke="#eab308"
          strokeWidth="1.5"
          style={{ animation: "s2rNodePulse 3s ease-in-out infinite" }}
        />
        <circle cx={radarNode.x} cy={radarNode.y} r="17" fill="#fff" stroke="#0a0a0a" strokeWidth="1.5" />
        <path
          d={`M${radarNode.x - 8},${radarNode.y} l6,7 l11,-15`}
          stroke="#eab308"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ animation: "s2rCheckFade 5.5s ease-in-out infinite", transformOrigin: `${radarNode.x}px ${radarNode.y}px` }}
        />

        <text x={radarNode.x} y={radarNode.y + 42} textAnchor="middle" fontSize="10" fill="#999">
          1 theme
        </text>
      </svg>
      <p className="text-center text-xs mt-1" style={{ color: "#999" }}>
        Independent reviews, converging into one pattern.
      </p>
    </div>
  );
}

const BAR_COL_WIDTH = 70;

type CatchBar = {
  week: string;
  height: number;
  color: string;
  badge?: "flag" | "work" | "win";
};

function CatchRow({
  label,
  weekBadge,
  bars,
  outcome,
}: {
  label: string;
  weekBadge?: string;
  bars: CatchBar[];
  outcome: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span
          className="text-xs font-semibold"
          style={{ color: "#999", letterSpacing: "0.06em", textTransform: "uppercase" }}
        >
          {label}
        </span>
        {weekBadge ? (
          <span
            className="text-[10px] font-bold px-1.5 py-0.5"
            style={{ background: "#eab308", color: "#0a0a0a", borderRadius: 4, letterSpacing: "0.03em" }}
          >
            {weekBadge}
          </span>
        ) : null}
      </div>
      <div className="flex items-end gap-4" style={{ height: 110 }}>
        {bars.map((bar, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-end shrink-0"
            style={{ height: "100%", width: BAR_COL_WIDTH }}
          >
            <div className="flex flex-col items-center gap-1" style={{ marginBottom: 5, minHeight: 20 }}>
              {bar.badge === "flag" ? (
                <Flag
                  size={16}
                  weight="fill"
                  color={bar.color}
                  style={{ animation: "s2rFlagBob 1.8s ease-in-out infinite" }}
                />
              ) : null}
              {bar.badge === "work" ? (
                <Wrench
                  size={16}
                  weight="fill"
                  color={bar.color}
                  style={{ animation: "s2rWrenchWiggle 1.4s ease-in-out infinite" }}
                />
              ) : null}
              {bar.badge === "win" ? (
                <>
                  <Trophy
                    size={20}
                    weight="fill"
                    color="#eab308"
                    style={{ animation: "s2rTrophyPop 1.6s ease-in-out infinite" }}
                  />
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5"
                    style={{
                      background: "rgba(234,179,8,0.14)",
                      border: "1px solid #eab308",
                      color: "#b8860b",
                      borderRadius: 4,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Fixed
                  </span>
                </>
              ) : null}
            </div>
            <div
              className="w-full"
              style={{
                height: bar.height,
                background: bar.color,
                borderRadius: 3,
                transition: "background 300ms",
                animation: bar.badge === "win" ? "s2rWinGlow 1.6s ease-in-out infinite" : undefined,
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-1.5">
        {bars.map((bar, i) => (
          <span
            key={i}
            className="text-[10px] text-center shrink-0"
            style={{ color: "#bbb", width: BAR_COL_WIDTH }}
          >
            {bar.week}
          </span>
        ))}
      </div>
      <p className="text-sm mt-3" style={{ color: "#555" }}>{outcome}</p>
    </div>
  );
}

function CatchTimeline() {
  return (
    <div className="py-6 flex flex-col gap-10 max-w-md mx-auto">
      <style>{`
        @keyframes s2rFlagBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes s2rWrenchWiggle {
          0%, 100% { transform: rotate(-12deg); }
          50% { transform: rotate(12deg); }
        }
        @keyframes s2rTrophyPop {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.18) rotate(-5deg); }
        }
        @keyframes s2rWinGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(234,179,8,0.45); }
          50% { box-shadow: 0 0 12px 3px rgba(234,179,8,0.45); }
        }
      `}</style>
      <CatchRow
        label="Ticket-driven backlog"
        bars={[
          { week: "Wk 1", height: 14, color: "#e5e5e5" },
          { week: "Wk 2", height: 24, color: "#e5e5e5" },
          { week: "Wk 3", height: 36, color: "#e5e5e5" },
          { week: "Wk 4", height: 50, color: "#e5e5e5" },
          { week: "Wk 5", height: 66, color: "#f43f5e", badge: "flag" },
        ]}
        outcome="Grows unnoticed for weeks — only visible once it's already a fire drill."
      />
      <CatchRow
        label="Focus — ranked on trend"
        weekBadge="Resolved in Week 1"
        bars={[
          { week: "Day 1", height: 20, color: "#eab308", badge: "flag" },
          { week: "Day 3", height: 13, color: "#f97316", badge: "work" },
          { week: "Day 5", height: 6, color: "#4ade80", badge: "win" },
        ]}
        outcome="Flagged on day one, diagnosed mid-week, fixed by day five — the whole loop closes inside a single week."
      />
    </div>
  );
}

function LiveFocusDemo() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => (t + 1) % TOTAL_TICKS);
    }, TICK_MS);
    return () => clearInterval(interval);
  }, []);

  const visibleCount = Math.min(tick, liveFeed.length);
  const showDiagnosis = tick > liveFeed.length;

  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{
        borderRadius: 12,
        background: "linear-gradient(145deg, #0f0f1a 0%, #0a0a12 100%)",
        boxShadow: "0 24px 48px rgba(0,0,0,0.16), 0 0 0 1px rgba(255,255,255,0.06)",
      }}
    >
      <div className="flex items-center gap-1.5 px-4 py-3 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
        <span
          className="ml-3 text-xs px-2.5 py-0.5"
          style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)", borderRadius: 4, border: "1px solid rgba(255,255,255,0.08)" }}
        >
          app.lumerial.io / focus
        </span>
        <span className="ml-auto flex items-center gap-1.5">
          <ArrowsClockwise size={11} weight="regular" color="rgba(255,255,255,0.25)" />
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>Simulated</span>
        </span>
      </div>

      <div className="p-4 flex flex-col gap-3" style={{ minHeight: 280 }}>
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em" }}>
            INCOMING
          </span>
          <span className="text-xs font-medium" style={{ color: "#eab308" }}>
            {visibleCount} clustered
          </span>
        </div>

        <div className="rounded-lg overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)", minHeight: 132 }}>
          {liveFeed.slice(0, visibleCount).map((row, i) => (
            <div
              key={`${tick >= liveFeed.length ? "held" : tick}-${i}`}
              className="flex items-start gap-2.5 px-3 py-2.5 animate-fade-in-up"
              style={{ borderBottom: i < visibleCount - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
            >
              <span
                className="text-xs px-1.5 py-0.5 rounded shrink-0 font-medium mt-0.5"
                style={{ background: "rgba(234,179,8,0.1)", color: "#eab308", border: "1px solid rgba(234,179,8,0.25)" }}
              >
                {row.source}
              </span>
              <span className="text-xs leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                {row.text}
              </span>
            </div>
          ))}
          {visibleCount === 0 ? (
            <div className="px-3 py-8 text-center text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
              Waiting for the next cluster&hellip;
            </div>
          ) : null}
        </div>

        {showDiagnosis ? (
          <div className="flex flex-col gap-2 animate-fade-in-up">
            <div className="flex items-center gap-2">
              <span
                className="text-xs px-1.5 py-0.5 font-medium"
                style={{ background: "rgba(34,197,94,0.14)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 4 }}
              >
                Grounded in code
              </span>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Trend: ↑ rising</span>
            </div>
            <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="text-sm font-bold mb-1" style={{ color: "#fff" }}>
                Checkout hangs on iOS 17.4
              </div>
              <div
                className="text-xs px-2 py-1 inline-block"
                style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.55)", borderRadius: 4, fontFamily: "monospace" }}
              >
                CheckoutViewController.swift:214
              </div>
            </div>
            <div className="rounded-lg px-3 py-2.5" style={{ background: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.25)" }}>
              <span className="text-xs font-semibold" style={{ color: "#eab308" }}>
                Ready for engineering — no repro needed
              </span>
            </div>
          </div>
        ) : (
          <div style={{ height: 8 }} />
        )}
      </div>
    </div>
  );
}

export default function BlogPostSignalsToRevenue() {
  return (
    <main className="flex-1 pt-14">
      <BlogReadingProgress />
      <BlogTableOfContents items={tocItems} />

      <section className="py-20 px-6" style={{ borderBottom: "1px solid #e8e8e8" }}>
        <div className="max-w-3xl mx-auto">
          <a
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-xs font-semibold mb-8 transition-colors duration-150"
            style={{ color: "#999" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#0a0a0a")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#999")}
          >
            <ArrowLeft size={14} weight="bold" />
            All posts
          </a>
          <div
            className="text-xs font-semibold mb-4"
            style={{ color: "#eab308", letterSpacing: "0.1em", textTransform: "uppercase" }}
          >
            Product
          </div>
          <h1
            className="font-bold tracking-tight mb-6 text-[#0a0a0a]"
            style={{ fontSize: "clamp(30px, 4.2vw, 48px)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
          >
            From Signal to Revenue: Catching Issues Before They Hit the Backlog
          </h1>
          <p className="text-lg leading-relaxed mb-6" style={{ color: "#555" }}>
            Reviews and support signals are a leading indicator, not background noise. Catching a
            theme while it&apos;s still small is the difference between a quick fix and a backlog
            item everyone already resents.
          </p>
          <div className="flex items-center gap-3 text-xs" style={{ color: "#999" }}>
            <span>The Lumerial team</span>
            <span>&middot;</span>
            <span>August 12, 2026</span>
            <span>&middot;</span>
            <span>4 min read</span>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>
            Most of the metrics a product team is judged on — retention, revenue, NPS — are
            lagging. They tell you what already happened, weeks after the users behind the number
            decided how they felt. Reviews, support tickets, and forum threads sit further
            upstream. A theme worth worrying about usually shows up there first.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>
            That&apos;s not sentimental — it&apos;s just where the users who are about to affect
            those lagging numbers are currently saying something. A widespread bug doesn&apos;t
            just cost the handful of people who leave a review about it. It costs the same amount
            to everyone who hits it and says nothing, every day it stays unfixed.
          </p>
        </div>
      </section>

      <section id="signal-value" className="py-16 px-6" style={{ borderTop: "1px solid #e8e8e8", scrollMarginTop: 80 }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold tracking-tight text-[#0a0a0a] mb-3" style={{ fontSize: "clamp(22px, 2.6vw, 30px)", letterSpacing: "-0.02em" }}>
            Why the signal is significant
          </h2>
          <p className="text-base leading-relaxed mb-2" style={{ color: "#555" }}>
            A single review is weak evidence on its own — it could be one user&apos;s bad day, one
            edge case that&apos;ll never recur. But the same specific behavior, described
            independently by several reviewers in their own words, in the same window, isn&apos;t
            noise. It&apos;s a pattern, and it doesn&apos;t take a large volume of complaints for a
            pattern to be real — just independent people describing the same thing.
          </p>
          <SignalRadar />
        </div>
      </section>

      <section id="revenue-link" className="py-16 px-6" style={{ borderTop: "1px solid #e8e8e8", scrollMarginTop: 80 }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold tracking-tight text-[#0a0a0a] mb-3" style={{ fontSize: "clamp(22px, 2.6vw, 30px)", letterSpacing: "-0.02em" }}>
            How the loop touches revenue
          </h2>
          <p className="text-base leading-relaxed mb-5" style={{ color: "#555" }}>
            Turning a signal into a shipped fix isn&apos;t just an engineering hygiene exercise.
            It touches the business in a few concrete ways:
          </p>
          <ul className="flex flex-col gap-4 mb-2">
            {[
              {
                label: "Support cost",
                body: "A theme that isn't root-caused keeps generating the same support conversations on repeat. Fixing the cause removes a recurring cost, not a one-time one.",
              },
              {
                label: "Rating and discoverability",
                body: "App store ranking and install conversion are both sensitive to aggregate rating and its recent direction — something any team running app store marketing already plans around. A theme actively pulling the rating down keeps doing so until it's fixed.",
              },
              {
                label: "Retention",
                body: "Users who churn over an unresolved bug rarely announce it. They just stop coming back. Fixing the theme before more users hit it caps how many more people that specific bug gets to cost.",
              },
            ].map((item) => (
              <li key={item.label} className="flex gap-3">
                <span className="text-sm font-bold shrink-0 text-[#0a0a0a]" style={{ width: 148 }}>{item.label}</span>
                <span className="text-sm leading-relaxed" style={{ color: "#555" }}>{item.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="catching-early" className="py-16 px-6" style={{ borderTop: "1px solid #e8e8e8", scrollMarginTop: 80 }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold tracking-tight text-[#0a0a0a] mb-3" style={{ fontSize: "clamp(22px, 2.6vw, 30px)", letterSpacing: "-0.02em" }}>
            Catching it before the backlog
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "#555" }}>
            The usual path is that an issue grows quietly until someone notices the pattern
            anecdotally, writes it up, and brings it to planning — by which point it already has a
            name, a history, and a pile of frustrated users behind it. Focus scores every theme by
            trend as well as current size, so a theme that&apos;s small but climbing can outrank an
            established one that&apos;s flat. It gets flagged in the same automatic pass that
            catches everything else, not after a person happens to notice.
          </p>

          <CatchTimeline />

          <p className="text-base leading-relaxed mt-2" style={{ color: "#555" }}>
            The result isn&apos;t a smaller backlog. It&apos;s a backlog full of things caught on
            the way up, instead of after they&apos;d already grown into a fire drill.
          </p>
        </div>
      </section>

      <section id="live-demo" className="py-16 px-6" style={{ borderTop: "1px solid #e8e8e8", scrollMarginTop: 80 }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold tracking-tight text-[#0a0a0a] mb-3" style={{ fontSize: "clamp(22px, 2.6vw, 30px)", letterSpacing: "-0.02em" }}>
            See it in real time
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "#555" }}>
            This is a simulated walk-through of the loop above, not a recording of a real
            customer&apos;s data: reviews arrive, get clustered into a theme, and — once a
            repo&apos;s connected — get checked against the code that could explain them, all
            before anyone has opened a ticket.
          </p>

          <LiveFocusDemo />
        </div>
      </section>

      <section className="py-20 px-6" style={{ borderTop: "1px solid #e8e8e8" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-base leading-relaxed max-w-xl mx-auto mb-8" style={{ color: "#555" }}>
            The signal is usually already there before the lagging metric moves. The only question
            is whether anything is watching for it while it&apos;s still small.
          </p>
          <a
            href="/#waitlist"
            className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 transition-colors duration-150"
            style={{ background: "#eab308", color: "#0a0a0a", borderRadius: 4 }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#fbbf24")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#eab308")}
          >
            Request access
          </a>
        </div>
      </section>
    </main>
  );
}
