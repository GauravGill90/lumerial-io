"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowSquareOut, GithubLogo, Circle } from "@phosphor-icons/react";
import BlogReadingProgress from "@/components/BlogReadingProgress";
import BlogTableOfContents from "@/components/BlogTableOfContents";

const tocItems = [
  { id: "the-workspace", label: "Inside the real workspace" },
  { id: "seven-themes", label: "The seven themes Focus found" },
  { id: "checking-the-homework", label: "Checking it against GitHub" },
  { id: "what-this-shows", label: "The verdict" },
];

/* ---------- shared scroll-reveal hook ---------- */

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

/* ---------- animated count-up ---------- */

function useCountUp(target: number, inView: boolean, duration = 1100) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(eased * target);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return value;
}

/* ---------- animated data-flow diagram: reviews -> Focus -> themes ---------- */

const flowParticles = [
  { y: 22 },
  { y: 44 },
  { y: 66 },
  { y: 88 },
];

function PipelineFlow() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className="py-2">
      <style>{`
        @keyframes ddgFlowDot {
          0% { transform: translateX(0); opacity: 0; }
          8% { opacity: 1; }
          46% { transform: translateX(150px); opacity: 1; }
          54% { transform: translateX(150px); opacity: 1; }
          92% { transform: translateX(300px); opacity: 1; }
          100% { transform: translateX(300px); opacity: 0; }
        }
        @keyframes ddgNodePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(234,179,8,0.35); }
          50% { box-shadow: 0 0 0 8px rgba(234,179,8,0); }
        }
      `}</style>
      <svg viewBox="0 0 460 110" className="w-full" style={{ maxWidth: 520, display: "block", margin: "0 auto" }}>
        <defs>
          <pattern id="ddgFlowDots" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#eee" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="460" height="110" fill="url(#ddgFlowDots)" />

        {/* start node: App Store reviews */}
        <g>
          <rect x="4" y="35" width="80" height="40" rx="4" fill="#fff" stroke="#0a0a0a" strokeWidth="1.5" />
          <text x="44" y="52" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0a0a0a">App Store</text>
          <text x="44" y="64" textAnchor="middle" fontSize="8" fill="#999">reviews</text>
        </g>

        {/* traveling dots */}
        {inView &&
          flowParticles.map((p, i) => (
            <circle
              key={i}
              cx={94}
              cy={p.y}
              r="3.5"
              fill="#eab308"
              style={{ animation: `ddgFlowDot 3.2s ease-in-out infinite`, animationDelay: `${i * 0.55}s` }}
            />
          ))}

        {/* Focus node */}
        <g>
          <rect
            x="190"
            y="30"
            width="80"
            height="50"
            rx="4"
            fill="#0a0a0a"
            style={{ animation: inView ? "ddgNodePulse 2.4s ease-in-out infinite" : undefined }}
          />
          <text x="230" y="51" textAnchor="middle" fontSize="10" fontWeight="700" fill="#eab308">Focus</text>
          <text x="230" y="64" textAnchor="middle" fontSize="7.5" fill="rgba(255,255,255,0.6)">clusters &amp; ranks</text>
        </g>

        {/* end node: 7 themes */}
        <g>
          <rect x="376" y="35" width="80" height="40" rx="4" fill="#fff" stroke="#0a0a0a" strokeWidth="1.5" />
          <text x="416" y="53" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0a0a0a">7</text>
          <text x="416" y="65" textAnchor="middle" fontSize="8" fill="#999">themes</text>
        </g>
      </svg>
      <p className="text-center text-xs mt-1" style={{ color: "#999" }}>
        29 real reviews, clustered and ranked automatically &mdash; no manual sorting.
      </p>
    </div>
  );
}

/* ---------- theme data, transcribed verbatim from the real Focus/Themes pages ---------- */

type GhRef = { number: number; title: string; kind: "PR" | "Issue"; state: "open" | "closed"; date: string };

type Theme = {
  slug: string;
  title: string;
  trend: "up" | "down";
  severityLabel: "Critical" | "Elevated" | "Low";
  severity: number;
  reviews: number;
  summary: string;
  ghRefs: GhRef[];
  ghNote?: string;
};

const REPO = "https://github.com/duckduckgo/apple-browsers";

const themes: Theme[] = [
  {
    slug: "privacy-ads",
    title: "Privacy Concerns and Ads",
    trend: "up",
    severityLabel: "Critical",
    severity: 4.4,
    reviews: 5,
    summary:
      "Users express dissatisfaction with the app's privacy features, specifically highlighting an increase in targeted ads and popups after searches. Many feel that the app has become misleading in its claims about user privacy.",
    ghRefs: [
      { number: 5804, title: "[iOS] Hide Disable Privacy Protection menu option on SERP", kind: "PR", state: "closed", date: "2026-07-14" },
      { number: 5543, title: "PIR: iOS: Remove tracker blocking feature flag", kind: "PR", state: "closed", date: "2026-06-25" },
      { number: 5209, title: "macOS: Add UI tests for YouTube ad blocking", kind: "PR", state: "closed", date: "2026-06-01" },
    ],
  },
  {
    slug: "crashes",
    title: "Frequent Crashes and Usability Issues",
    trend: "up",
    severityLabel: "Critical",
    severity: 4.4,
    reviews: 5,
    summary:
      "Users consistently report that the application is crashing, freezing, and becoming increasingly difficult to navigate, leading to frustration. Many long-time users feel that the recent updates have degraded their experience, prompting them to con…",
    ghRefs: [
      { number: 6425, title: "[iOS] Fix voice search crash when the audio input format is invalid", kind: "PR", state: "open", date: "2026-08-19" },
      { number: 6397, title: "Fix crash & keep the tab bar's item count in sync when an insert re-enters", kind: "PR", state: "open", date: "2026-08-19" },
      { number: 6066, title: "macOS: App crashes silently on launch after Sparkle delta update from 1.199.0 (762)", kind: "Issue", state: "closed", date: "2026-08-14" },
      { number: 6148, title: "[iOS] show error page when tabs terminate frequently", kind: "PR", state: "closed", date: "2026-08-12" },
    ],
  },
  {
    slug: "ai-backlash",
    title: "AI Feature Backlash",
    trend: "up",
    severityLabel: "Elevated",
    severity: 3.5,
    reviews: 8,
    summary:
      "Many users express dissatisfaction with DuckDuckGo's recent integration of AI features, stating that it detracts from their overall experience and complicates the app's functionality. The recurring feedback highlights frustrations over forced AI p…",
    ghRefs: [
      { number: 6398, title: "iOS: Contextual Duck.ai surface polish and handover fixes", kind: "PR", state: "open", date: "2026-08-19" },
      { number: 6400, title: "iOS: Duck.ai usage-warning footer behind the UTI", kind: "PR", state: "open", date: "2026-08-19" },
      { number: 6395, title: "macOS: Help users choose best AI model", kind: "PR", state: "open", date: "2026-08-19" },
      { number: 6419, title: "[iOS] Remove obsolete UTI rollout flags", kind: "PR", state: "open", date: "2026-08-19" },
    ],
  },
  {
    slug: "performance-duckplayer",
    title: "Performance and Usability Issues",
    trend: "up",
    severityLabel: "Critical",
    severity: 4.7,
    reviews: 3,
    summary:
      "Users frequently complain about significant slowdowns, particularly after recent updates, and express frustration over poor usability with features like Duck Player for YouTube. Many long-time users are reconsidering their loyalty due to increasin…",
    ghRefs: [
      { number: 6358, title: "[macOS] Fix DuckPlayer UI tests", kind: "PR", state: "closed", date: "2026-08-14" },
      { number: 5209, title: "macOS: Add UI tests for YouTube ad blocking", kind: "PR", state: "closed", date: "2026-06-01" },
    ],
  },
  {
    slug: "recent-updates",
    title: "Frustration with Recent Updates",
    trend: "up",
    severityLabel: "Critical",
    severity: 4.0,
    reviews: 4,
    summary:
      "Users are expressing dissatisfaction with recent browser updates that disrupt their workflow, particularly regarding the prominent ‘fire’ button and the automatic tab opening feature. Many reviews indicate a desire for more customizable settings…",
    ghRefs: [
      { number: 6409, title: "[iOS] Purge app switcher snapshots on Fire", kind: "PR", state: "open", date: "2026-08-19" },
      { number: 6406, title: "[macOS] Update UI tests for the Simplified Fire Dialog", kind: "PR", state: "closed", date: "2026-08-19" },
      { number: 6420, title: "iOS: Fix unnecessary scrolling in Fire dialog on iPad", kind: "PR", state: "closed", date: "2026-08-19" },
    ],
    ghNote: "“Simplified Fire Dialog” and the UTI rollout PRs above are the same redesign this theme's summary is describing.",
  },
  {
    slug: "performance-frustration",
    title: "Performance Issues and User Frustration",
    trend: "up",
    severityLabel: "Low",
    severity: 2.0,
    reviews: 3,
    summary:
      "Many users express dissatisfaction with recent updates, noting performance problems such as crashes, slow loading times, and functionality issues. Additionally, the lack of support for features like Duck Player in multi-tab scenarios frustrates us…",
    ghRefs: [],
    ghNote:
      "Focus produced two separate performance-flavored themes in this run — this one and “Performance and Usability Issues” above. Real clustering isn't always perfectly disjoint; the same crash and Duck Player activity cited there applies here too. We're not going to hide that it happened.",
  },
  {
    slug: "search-quality",
    title: "Deteriorating Search Quality",
    trend: "down",
    severityLabel: "Critical",
    severity: 4.0,
    reviews: 1,
    summary:
      "Users express frustration over declining search result quality, often receiving irrelevant or misleading information, leading some to consider switching to alternative search options. There is a notable concern about the integration of AI negatively i…",
    ghRefs: [{ number: 5656, title: "Fix: UTI ignores Search Suggestions setting", kind: "PR", state: "closed", date: "2026-07-03" }],
  },
];

const severityStyle: Record<Theme["severityLabel"], { bg: string; fg: string; border: string }> = {
  Critical: { bg: "#0a0a0a", fg: "#eab308", border: "#0a0a0a" },
  Elevated: { bg: "rgba(234,179,8,0.12)", fg: "#8a6800", border: "#eab308" },
  Low: { bg: "#f5f5f5", fg: "#666", border: "#e8e8e8" },
};

function ThemeCard({ theme, index }: { theme: Theme; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [hovered, setHovered] = useState(false);
  const sv = severityStyle[theme.severityLabel];
  const severityPct = (theme.severity / 5) * 100;

  return (
    <div
      ref={ref}
      className="p-6"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? "#0a0a0a" : "#e8e8e8"}`,
        borderRadius: 4,
        opacity: inView ? 1 : 0,
        transform: inView ? (hovered ? "translateY(-3px)" : "translateY(0)") : "translateY(18px)",
        boxShadow: hovered ? "0 12px 24px -14px rgba(10,10,10,0.2)" : "none",
        transition: `opacity 550ms ease ${index * 60}ms, transform 250ms cubic-bezier(0.16,1,0.3,1), box-shadow 250ms ease, border-color 200ms ease`,
      }}
    >
      <div className="flex flex-wrap items-center gap-2.5 mb-2">
        <span
          className="text-xs px-2 py-0.5 font-medium"
          style={{ borderRadius: 4, background: sv.bg, border: `1px solid ${sv.border}`, color: sv.fg }}
        >
          {theme.severityLabel} &middot; severity {theme.severity.toFixed(1)}
        </span>
        <span className="text-xs font-bold" style={{ color: theme.trend === "up" ? "#0a0a0a" : "#999" }}>
          {theme.trend === "up" ? "↑ up" : "↓ down"}
        </span>
        <span className="text-xs" style={{ color: "#999" }}>
          {theme.reviews} review{theme.reviews === 1 ? "" : "s"}
        </span>
      </div>

      <div className="h-1 mb-4" style={{ background: "#f0f0f0", borderRadius: 2, maxWidth: 160 }}>
        <div
          style={{
            height: "100%",
            width: inView ? `${severityPct}%` : "0%",
            background: sv.border,
            borderRadius: 2,
            transition: `width 700ms cubic-bezier(0.16,1,0.3,1) ${index * 60 + 150}ms`,
          }}
        />
      </div>

      <h3 className="text-lg font-bold mb-3 text-[#0a0a0a]">{theme.title}</h3>

      <p className="text-sm leading-relaxed mb-4" style={{ color: "#555" }}>
        {theme.summary}
      </p>

      {theme.ghRefs.length > 0 ? (
        <div className="flex flex-col gap-2 mb-2">
          <span className="text-xs font-bold" style={{ color: "#999", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            Matched real GitHub activity
          </span>
          {theme.ghRefs.map((r, ri) => (
            <a
              key={r.number}
              href={`${REPO}/${r.kind === "PR" ? "pull" : "issues"}/${r.number}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2.5 p-2.5 no-underline transition-colors duration-150 ${inView ? "animate-fade-in-up" : ""}`}
              style={{
                background: "#fafafa",
                border: "1px solid #e8e8e8",
                borderRadius: 4,
                opacity: inView ? undefined : 0,
                animationDelay: `${index * 60 + 250 + ri * 80}ms`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#0a0a0a")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e8e8e8")}
            >
              <span
                className="text-xs px-1.5 py-0.5 font-mono shrink-0"
                style={{
                  borderRadius: 4,
                  background: r.state === "open" ? "rgba(234,179,8,0.14)" : "#f0f0f0",
                  color: r.state === "open" ? "#8a6800" : "#777",
                }}
              >
                {r.kind} #{r.number} &middot; {r.state}
              </span>
              <span className="text-xs flex-1" style={{ color: "#333" }}>
                {r.title}
              </span>
              <span className="text-xs font-mono shrink-0" style={{ color: "#999" }}>
                {r.date}
              </span>
              <ArrowSquareOut size={12} weight="bold" style={{ color: "#999", flexShrink: 0 }} />
            </a>
          ))}
        </div>
      ) : null}

      {theme.ghNote ? (
        <p className="text-xs leading-relaxed mt-2" style={{ color: "#999" }}>
          {theme.ghNote}
        </p>
      ) : null}
    </div>
  );
}

function StatCard({ label, target, decimals = 0 }: { label: string; target: number; decimals?: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const value = useCountUp(target, inView);

  return (
    <div ref={ref} className="p-4" style={{ border: "1px solid #e8e8e8", borderRadius: 4 }}>
      <div className="text-xs mb-1.5" style={{ color: "#999" }}>{label}</div>
      <div className="text-2xl font-bold text-[#0a0a0a]" style={{ letterSpacing: "-0.02em" }}>
        {value.toFixed(decimals)}
      </div>
    </div>
  );
}

export default function BlogPostDuckDuckGoCaseStudy() {
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
          <div className="text-xs font-semibold mb-4" style={{ color: "#eab308", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Case Study
          </div>
          <h1
            className="font-bold tracking-tight mb-6 text-[#0a0a0a]"
            style={{ fontSize: "clamp(30px, 4.2vw, 48px)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
          >
            We connected DuckDuckGo&apos;s real App Store listing to Focus.
            <br />
            Here&apos;s exactly what it found.
          </h1>
          <p className="text-lg leading-relaxed mb-6" style={{ color: "#555" }}>
            No manual clustering, no hand-picked quotes &mdash; a live Lumerial workspace, a real
            review source, and Focus&apos;s own ranking. Seven themes came out. We checked every
            one against DuckDuckGo&apos;s actual public GitHub activity, and found the engineering
            team already working several of them, some literally today.
          </p>
          <div className="flex items-center gap-3 text-xs mb-10" style={{ color: "#999" }}>
            <span>The Lumerial team</span>
            <span>&middot;</span>
            <span>August 19, 2026</span>
            <span>&middot;</span>
            <span>8 min read</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <StatCard label="Open themes" target={7} />
            <StatCard label="Reviews (30d)" target={29} />
            <StatCard label="Avg rating" target={2.1} decimals={1} />
            <StatCard label="Critical" target={5} />
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs" style={{ color: "#999" }}>
            <span className="relative flex" style={{ width: 7, height: 7 }}>
              <Circle
                weight="fill"
                size={7}
                style={{ color: "#eab308", position: "absolute", animation: "ddgPing 1.8s cubic-bezier(0,0,0.2,1) infinite" }}
              />
              <Circle weight="fill" size={7} style={{ color: "#eab308" }} />
            </span>
            Live product data, not a mockup
          </div>
          <style>{`
            @keyframes ddgPing {
              0% { transform: scale(1); opacity: 0.6; }
              75%, 100% { transform: scale(2.4); opacity: 0; }
            }
          `}</style>
        </div>
      </section>

      <section className="py-16 px-6" style={{ borderBottom: "1px solid #e8e8e8", background: "#fafafa" }}>
        <div className="max-w-3xl mx-auto flex items-start gap-3">
          <span className="text-xs font-bold shrink-0 mt-0.5" style={{ color: "#999", letterSpacing: "0.05em" }}>
            SCOPE
          </span>
          <p className="text-sm leading-relaxed" style={{ color: "#666" }}>
            <span style={{ color: "#333" }}>
              This is a real, live Lumerial workspace &mdash; not a script, not a simulation.
            </span>{" "}
            DuckDuckGo&apos;s real App Store listing is connected as a review source. Google Play
            and a GitHub repo aren&apos;t connected in this run, so what follows is Focus&apos;s
            own review clustering and ranking &mdash; not the separate code-grounded fix-suggestion
            step, which needs a connected repo and runs per theme on demand. Every screenshot,
            score, and theme summary below is exactly what the product produced on its own.
          </p>
        </div>
      </section>

      <section id="the-workspace" className="py-16 px-6" style={{ scrollMarginTop: 80 }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold tracking-tight text-[#0a0a0a] mb-3" style={{ fontSize: "clamp(22px, 2.6vw, 30px)", letterSpacing: "-0.02em" }}>
            Inside the real workspace
          </h2>

          <PipelineFlow />

          <p className="text-base leading-relaxed mb-6 mt-4" style={{ color: "#555" }}>
            One app, one connected review source, real reviews flowing straight into the reviews
            table &mdash; tagged <code style={{ fontSize: "0.85em" }}>Scraped</code> rather than
            silently passed off as an official API feed. Two rows, exactly as they appear in the
            product, truncation included:
          </p>
          <div className="flex flex-col gap-2 mb-8">
            <div className="p-3 text-sm" style={{ border: "1px solid #e8e8e8", borderRadius: 4, color: "#555" }}>
              &ldquo;Using on an Ipad. Voice to text does not work in the searchbar or anywhere
              else ever. Excep&hellip;&rdquo;
              <div className="text-xs mt-1" style={{ color: "#999" }}>1★ &middot; App Store &middot; Scraped &middot; Aug 18, 2026</div>
            </div>
            <div className="p-3 text-sm" style={{ border: "1px solid #e8e8e8", borderRadius: 4, color: "#555" }}>
              &ldquo;I just did an update to the new version on iPad OS and it is acting so slow
              and weird. The new&hellip;&rdquo;
              <div className="text-xs mt-1" style={{ color: "#999" }}>1★ &middot; App Store &middot; Scraped &middot; Aug 17, 2026</div>
            </div>
          </div>

          <figure className="m-0 mb-8">
            <div style={{ border: "1px solid #e8e8e8", borderRadius: 4, overflow: "hidden" }}>
              <Image
                src="/case-studies/duckduckgo/product-apps.jpg"
                alt="The real Lumerial Apps page for DuckDuckGo: App Store connected (1 connected), Google Play and GitHub not yet connected, real scraped reviews in the table below"
                width={2000}
                height={1119}
                className="w-full h-auto block"
              />
            </div>
            <figcaption className="text-xs mt-2" style={{ color: "#999" }}>
              The Apps page: one connected review source, real reviews already streaming in.
            </figcaption>
          </figure>

          <figure className="m-0">
            <div style={{ border: "1px solid #e8e8e8", borderRadius: 4, overflow: "hidden" }}>
              <Image
                src="/case-studies/duckduckgo/product-focus.jpg"
                alt="The real Lumerial Focus page for DuckDuckGo: 7 open themes, 29 reviews this window, 2.1 avg rating, 5 critical, with Privacy Concerns and Ads ranked top priority with a suggested fix"
                width={2000}
                height={1179}
                className="w-full h-auto block"
              />
            </div>
            <figcaption className="text-xs mt-2" style={{ color: "#999" }}>
              Focus ranked seven themes by trend, severity, and rating impact &mdash; not raw
              count. Top priority: &ldquo;Privacy Concerns and Ads,&rdquo; 5 reviews, Critical,
              trending up, with its own generated fix suggestion.
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="seven-themes" className="py-20 px-6" style={{ borderTop: "1px solid #e8e8e8", scrollMarginTop: 80 }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold tracking-tight text-[#0a0a0a] mb-3" style={{ fontSize: "clamp(24px, 3vw, 36px)", letterSpacing: "-0.03em" }}>
            The seven themes Focus found
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "#555" }}>
            Titles and summaries below are transcribed exactly from the real Themes page &mdash;
            including the mid-sentence truncation on the longer ones, which is how the product
            actually renders them at this width.
          </p>
          <figure className="m-0 mb-10">
            <div style={{ border: "1px solid #e8e8e8", borderRadius: 4, overflow: "hidden" }}>
              <Image
                src="/case-studies/duckduckgo/product-themes.jpg"
                alt="The real Lumerial Themes page listing all 7 windowed themes for DuckDuckGo with trend, severity, and review counts"
                width={2000}
                height={1178}
                className="w-full h-auto block"
              />
            </div>
            <figcaption className="text-xs mt-2" style={{ color: "#999" }}>
              All seven, unedited.
            </figcaption>
          </figure>

          <div className="flex flex-col gap-6">
            {themes.map((t, i) => (
              <ThemeCard key={t.slug} theme={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section id="checking-the-homework" className="py-16 px-6" style={{ borderTop: "1px solid #e8e8e8", scrollMarginTop: 80 }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold tracking-tight text-[#0a0a0a] mb-3" style={{ fontSize: "clamp(22px, 2.6vw, 30px)", letterSpacing: "-0.02em" }}>
            Checking it against GitHub
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "#555" }}>
            None of the seven themes above came with a code-grounded diagnosis &mdash; GitHub
            wasn&apos;t connected in this run. So we checked them ourselves, by hand, against{" "}
            <a
              href={REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1"
              style={{ color: "#0a0a0a", textDecoration: "underline", textUnderlineOffset: 3 }}
            >
              duckduckgo/apple-browsers
              <ArrowSquareOut size={12} weight="bold" />
            </a>{" "}
            &mdash; the real, public, Apache-2.0 repository behind DuckDuckGo&apos;s iOS app. Five
            of the seven themes matched real, currently open or recently closed pull requests and
            issues, several updated the same day we pulled this data.
          </p>
          <p className="text-base leading-relaxed mb-8" style={{ color: "#555" }}>
            The links are embedded in each theme card above. A pattern shows up across several of
            them: a rollout the PR titles refer to as &ldquo;UTI&rdquo; &mdash; a new fire dialog,
            new tab-bar behavior, new AI surfacing &mdash; landing in the same window these reviews
            were written in. That&apos;s an independent confirmation, not something we could have
            fabricated: DuckDuckGo&apos;s own commit history says a large rollout is mid-flight,
            and the review text says users are unhappy about a large rollout, without either
            source knowing about the other.
          </p>
          <div className="mt-2" style={{ border: "1px solid #e8e8e8", borderRadius: 4, overflow: "hidden" }}>
            <Image
              src="/case-studies/duckduckgo/product-apps-connectors.jpg"
              alt="Real Lumerial connector cards for DuckDuckGo: GitHub Not connected, App Store 1 connected, Google Play Not connected"
              width={2000}
              height={430}
              className="w-full h-auto block"
            />
          </div>
          <div className="flex items-start gap-2.5 mt-3">
            <GithubLogo size={14} weight="bold" style={{ color: "#999", marginTop: 2, flexShrink: 0 }} />
            <p className="text-xs leading-relaxed" style={{ color: "#999" }}>
              GitHub reads &ldquo;Not connected&rdquo; here on purpose &mdash; the cross-referencing
              above is manual verification layered on top of Focus&apos;s output, not something
              Focus itself claimed to do. Connecting the repo is the natural next step: that&apos;s
              what turns this into the same file-and-function-level diagnosis the Bitwarden case
              study ran.
            </p>
          </div>
        </div>
      </section>

      <section id="what-this-shows" className="py-16 px-6" style={{ borderTop: "1px solid #e8e8e8", scrollMarginTop: 80 }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold tracking-tight text-[#0a0a0a] mb-3" style={{ fontSize: "clamp(22px, 2.6vw, 30px)", letterSpacing: "-0.02em" }}>
            The verdict
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "#555" }}>
            A real App Store listing, connected in minutes, with no OAuth flow and no fixtures.
            Real reviews scraped and landed in the reviews table, honestly tagged rather than
            dressed up as an official feed. Seven themes clustered and ranked automatically &mdash;
            by trend, severity, and rating impact, not just raw count &mdash; with zero manual
            sorting.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: "#555" }}>
            Then we checked Focus&apos;s homework by hand against DuckDuckGo&apos;s real public
            GitHub activity, and five of the seven themes lined up with real, dated engineering
            work &mdash; several PRs updated the very day we pulled this data. That&apos;s
            independent, external confirmation that what Focus surfaced from review text alone
            matches what DuckDuckGo&apos;s own engineers are actually building right now.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>
            All of it &mdash; every screenshot, every score, every theme &mdash; is unedited output
            from a live workspace, produced the same day.
          </p>
        </div>
      </section>

      <section className="py-20 px-6" style={{ borderTop: "1px solid #e8e8e8" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-bold tracking-tight text-[#0a0a0a] mb-4" style={{ fontSize: "clamp(24px, 3vw, 36px)", letterSpacing: "-0.03em" }}>
            Real reviews in. Real ranking out. No fixtures anywhere.
          </h2>
          <p className="text-base leading-relaxed max-w-xl mx-auto mb-8" style={{ color: "#555" }}>
            Every screenshot above is unedited product output, captured the same day these reviews
            were scraped. When we couldn&apos;t verify a claim ourselves, we said so instead of
            dressing it up.
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
