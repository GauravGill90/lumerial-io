"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowSquareOut, GithubLogo, ThumbsUp } from "@phosphor-icons/react";
import BlogReadingProgress from "@/components/BlogReadingProgress";
import BlogTableOfContents from "@/components/BlogTableOfContents";

const tocItems = [
  { id: "why-duckduckgo", label: "Why DuckDuckGo" },
  { id: "the-pull", label: "2,180 real reviews" },
  { id: "findings", label: "Six themes, six outcomes" },
  { id: "why-it-matters", label: "Why the small ones matter" },
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

/* ---------- rating distribution chart ---------- */

const ratingCounts: { star: number; count: number }[] = [
  { star: 5, count: 1463 },
  { star: 4, count: 246 },
  { star: 3, count: 147 },
  { star: 2, count: 90 },
  { star: 1, count: 234 },
];
const totalReviews = ratingCounts.reduce((s, r) => s + r.count, 0);
const maxCount = Math.max(...ratingCounts.map((r) => r.count));

function RatingBarChart() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className="flex flex-col gap-2.5 py-2">
      {ratingCounts.map((r, i) => {
        const pct = (r.count / maxCount) * 100;
        return (
          <div key={r.star} className="flex items-center gap-3">
            <span className="text-xs shrink-0" style={{ color: "#777", width: 28 }}>
              {r.star}★
            </span>
            <div className="flex-1 h-5" style={{ background: "#f0f0f0", borderRadius: 3 }}>
              <div
                style={{
                  height: "100%",
                  width: inView ? `${pct}%` : "0%",
                  background: "#0a0a0a",
                  borderRadius: 3,
                  transition: `width 700ms cubic-bezier(0.16,1,0.3,1) ${i * 90}ms`,
                }}
              />
            </div>
            <span className="text-xs font-mono shrink-0 text-right" style={{ color: "#999", width: 52 }}>
              {r.count.toLocaleString()}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- animated "helpful votes" counter ---------- */

function HelpfulVotesBadge({ target }: { target: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1100;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span
      ref={ref}
      className="inline-flex items-center gap-1.5 text-xs font-bold px-2 py-1"
      style={{ background: "rgba(234,179,8,0.12)", border: "1px solid #eab308", color: "#8a6800", borderRadius: 4 }}
    >
      <ThumbsUp size={12} weight="fill" />
      {value} found this helpful
    </span>
  );
}

/* ---------- findings data ---------- */

type Finding = {
  theme: string;
  platform: "Android" | "iOS" | "Android + iOS";
  reviews: string;
  rating: string;
  quote: string;
  quoteMeta: string;
  status: "grounded" | "abstained";
  confidence?: "high" | "medium";
  files: string[];
  diagnosis: string;
  fix?: string;
  badge?: React.ReactNode;
};

const findings: Finding[] = [
  {
    theme: "“Device not supported” silently locks users out of saved passwords",
    platform: "Android",
    reviews: "1 written review — the single most-upvoted review in our entire 1,200-review Android sample",
    rating: "3★",
    quote:
      "When I go to the password option, it's now saying “device not supported” and then something about device not being encrypted. This is very very recent.",
    quoteMeta: "3★ · Google Play · v5.292.0",
    status: "grounded",
    confidence: "high",
    files: [
      "autofill/.../securestorage/SecureStorageKeyStore.kt",
      "autofill/.../securestorage/SecureStorageKeyProvider.kt",
      "autofill/.../securestorage/L2DataTransformer.kt",
      "autofill/.../strings-autofill-impl.xml",
    ],
    diagnosis:
      "autofillAvailable() gates the entire password manager on secureStorage.canAccessSecureStorage(), which chains through l2DataTransformer.canProcessData() → secureStorageKeyProvider.canAccessKeyStore() → RealSecureStorageKeyStore.canUseEncryption(). That last call resolves true only if the app's EncryptedSharedPreferences file — built on Android's Jetpack Security library, backed by a key in the Android Keystore — can be opened. The open call is wrapped in a try/catch: if key generation or retrieval from the Keystore throws for any reason, the exception is swallowed, a diagnostic pixel fires, and the result resolves to null. Every failure mode collapses into the same boolean, which the UI renders as the exact string in the review: “Device not supported — your device does not support encrypted storage.” The code can't tell a device that genuinely lacks secure hardware from a device where the Keystore call just failed once — a known class of transient failure on some Android OEM builds after certain security patches. Both get the identical permanent-sounding message and the identical dead end.",
    fix: "Retry key generation once (or show a distinct “temporarily unavailable” state) before falling back to the permanent “device not supported” screen — right now every EncryptedSharedPreferences failure is treated as proof the hardware can't do it.",
  },
  {
    theme: "Bookmarks imported from Safari never show up as Favorites",
    platform: "iOS",
    reviews: "3 reviews in 2026 — the same gap has been reported as far back as 2021",
    rating: "1.33★ avg",
    quote:
      "This was my favorite browser until I got my new iPad. Now I’ve lost all of my bookmarks & Favorites. I tried importing them from Safari but they don’t show up on the Home Page when I open it so what’s the point?? I’m just going to delete the app & use Safari.",
    quoteMeta: "1★ · App Store · v7.230.0",
    status: "grounded",
    confidence: "high",
    files: ["iOS/Core/BookmarksImporter.swift", ".../Bookmarks/ImportExport/BookmarkCoreDataImporter.swift"],
    diagnosis:
      "BookmarksImporter.parse() only tags an imported item as .favorite — the type that actually surfaces on the New Tab page — under two conditions: the HTML link carries a duckduckgo:favorite=\"true\" attribute, or it sits inside a folder literally named “DuckDuckGo Favorites.” Both markers exist only in HTML that DuckDuckGo itself exported, from macOS or a prior iOS install — the code's own comments call this “handling for DDG favorites imported from Android/MacOS/iOS.” Safari's export format (and Chrome's, and Firefox's) has neither. So every bookmark imported from any non-DuckDuckGo browser is unconditionally classified as .bookmark, never .favorite — it can never appear on the Home Page's Favorites strip, no matter how it was organized in Safari. The importer doesn't fail or throw; it runs to completion and reports success. It just has no way to recognize a favorite that didn't originate in DuckDuckGo's own export format.",
    fix: "Recognize Safari's “Favorites” folder (and Chrome's “Bookmarks bar”) as .favorite during import, the same way DuckDuckGo's own export format is already recognized.",
  },
  {
    theme: "Duck.ai / Search Assist settings silently turn themselves back on",
    platform: "iOS",
    reviews: "3 reports, 19 months apart — Dec 2024 to Aug 2026",
    rating: "1.67★ avg",
    quote:
      "I've been having a serious issue with the AI slop feature duckduckgo is forcing on me. Turned it all off immediately but every three weeks this useless, wasteful, unethically sourced feature turns itself back on, and I'm tired of my settings magically resetting every couple of weeks.",
    quoteMeta: "1★ · App Store · v7.148.0",
    status: "grounded",
    confidence: "medium",
    files: ["iOS/DuckDuckGo/AIChat/AIChatSettingsMigration.swift", "iOS/DuckDuckGo/AIChat/AIChatSettings.swift"],
    diagnosis:
      "DuckDuckGo migrated AI chat settings off raw UserDefaults into a new key-value store via AIChatSettingsMigration.migrate(). Its guard against running twice is a bare assertionFailure(...) — a no-op in every Release build, this one included. migrate() reads the old keys, writes them to the new store, then deletes them from UserDefaults — three separate steps, not one atomic operation. If the app is terminated between the write and the delete (an app switch, an OS-initiated kill — both routine on iOS), the old keys survive. On the next eligible launch, migrate() runs again, and because the guard doesn't actually stop anything, it re-reads those stale pre-migration values — the shipped defaults, from before the user ever touched the toggle — and overwrites whatever they'd since set. We can't confirm this is the only mechanism behind reports spanning 19 months, but it's a real, currently-shipping path that reproduces the exact symptom: a setting that was off comes back on with no user action in between.",
    fix: "Make the write-then-delete migration atomic (or delete first, write second, with a rollback path), and replace the assertionFailure double-run guard with a check that actually prevents a second migration in Release builds.",
  },
  {
    theme: "The Fire button's “Clear Tabs and Data” silently stops clearing tabs",
    platform: "iOS",
    reviews: "1 review",
    rating: "2★",
    quote: "Hitting the button to clear tabs and data does nothing anymore. The data is still retained and tabs don’t close. What happened?",
    quoteMeta: "2★ · App Store · v7.232.0",
    status: "grounded",
    confidence: "medium",
    files: ["iOS/DuckDuckGo/Fire/GranularFireConfirmationViewModel.swift", "iOS/DuckDuckGo/Fire/FireExecutor.swift"],
    diagnosis:
      "The redesigned Fire button confirmation screen replaced the old one-tap “clear everything” action with three independent toggles — Clear Tabs, Clear Data, Clear AI Chats — that default on but are then persisted via FireConfirmationSettingsStore and silently reloaded on every future visit. confirm() only writes clearTabs back to that store when the toggle was actually editable; otherwise whatever was saved last just carries forward. Nothing in the UI shows the state of that memory before you tap Fire — the button looks identical either way. A user who unchecked “Clear Tabs” once, deliberately or by an accidental tap, gets an app that keeps quietly “clearing data” without ever touching tabs again, on every subsequent press — which matches “hitting the button… does nothing anymore” exactly.",
    fix: "Surface the current state of the three toggles somewhere the user sees before tapping Fire, instead of only inside a confirmation sheet they may never open again.",
  },
  {
    theme: "App freezes or crashes constantly, especially with several tabs open",
    platform: "Android + iOS",
    reviews: "26 reviews in the 6 weeks before we pulled this data — the largest theme in the sample",
    rating: "1.81★ avg",
    quote:
      "The mobile app is literally unusable right now. If I try to open the tabs (if 4 or more tabs) it just freezes and crashes. After restarting it you have to clear all tabs to even be able to see the tab screen again.",
    quoteMeta: "1★ · Google Play · v5.291.1",
    status: "abstained",
    files: [],
    diagnosis:
      "This is the single largest and most severe theme in the whole sample — both platforms, concentrated in the most recent releases (Android 5.291.x–5.292.0, iOS 7.229.0–7.232.0). But reviewers don't converge on one trigger: one blames four-plus open tabs, another a specific video site, another the new AI features, another just “crashes 10x a day” with no pattern. That's several plausible subsystems — tab management, WebView, the AI bridge, general memory pressure — and no way to pick one from review text alone. Without a stack trace or a crash reporter attached to a real device, pointing at a specific file here would be a guess dressed up as a diagnosis. We'd rather say that plainly.",
  },
  {
    theme: "Duck.ai gives wrong answers and won't self-correct",
    platform: "Android + iOS",
    reviews: "3 reports, 2020–2026",
    rating: "2★ avg",
    quote:
      "duck.ai is a stupid ap. If you ask it a question, one where you already know the answer to nd it gives you the imcorrect answer. You correct it, it states you correct. You ask it the same question later, it will give you the same incorrect answer. lt will not correct itself.",
    quoteMeta: "1★ · Google Play · v5.291.2",
    status: "abstained",
    files: [],
    diagnosis:
      "This is a real complaint, but it's a claim about model behavior and answer ranking — served from DuckDuckGo's backend, not present anywhere in either client repository we searched. There's no function to cite here. The code that would explain this isn't open source, so we're not going to point at a file and pretend otherwise.",
  },
];

const statusMeta: Record<Finding["status"], { label: string; bg: string; fg: string; border: string }> = {
  grounded: { label: "Grounded in code", bg: "#0a0a0a", fg: "#eab308", border: "#0a0a0a" },
  abstained: { label: "Insufficient evidence — named why", bg: "transparent", fg: "#777", border: "#d0d0d0" },
};

function FindingCard({ finding, index }: { finding: Finding; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const meta = statusMeta[finding.status];

  return (
    <div
      ref={ref}
      className="p-6"
      style={{
        border: "1px solid #e8e8e8",
        borderRadius: 4,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 550ms ease ${index * 60}ms, transform 550ms cubic-bezier(0.16,1,0.3,1) ${index * 60}ms`,
      }}
    >
      <div className="flex flex-wrap items-center gap-2.5 mb-3">
        <span
          className="text-xs px-2 py-0.5 font-medium"
          style={{ borderRadius: 4, background: meta.bg, border: `1px solid ${meta.border}`, color: meta.fg }}
        >
          {meta.label}
        </span>
        {finding.confidence ? (
          <span className="text-xs" style={{ color: "#999" }}>
            confidence: {finding.confidence}
          </span>
        ) : null}
        <span
          className="text-xs px-1.5 py-0.5 font-medium"
          style={{ borderRadius: 4, background: "#f5f5f5", color: "#666" }}
        >
          {finding.platform}
        </span>
      </div>

      <h3 className="text-lg font-bold mb-3 text-[#0a0a0a]">{finding.theme}</h3>

      <blockquote
        className="text-sm leading-relaxed mb-3 pl-4"
        style={{ borderLeft: "2px solid #e8e8e8", color: "#555", fontStyle: "italic" }}
      >
        &ldquo;{finding.quote}&rdquo;
        <div className="text-xs mt-1.5 not-italic" style={{ color: "#999" }}>
          {finding.quoteMeta}
        </div>
      </blockquote>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-xs" style={{ color: "#999" }}>
          {finding.reviews} · {finding.rating}
        </span>
        {finding.theme.startsWith("“Device") ? <HelpfulVotesBadge target={288} /> : null}
      </div>

      <p className="text-sm leading-relaxed mb-3" style={{ color: "#555" }}>
        {finding.diagnosis}
      </p>

      {finding.fix ? (
        <div className="flex items-start gap-3 p-4 mb-3" style={{ background: "#fafafa", border: "1px solid #e8e8e8", borderRadius: 4 }}>
          <span className="text-xs font-bold mt-0.5 shrink-0" style={{ color: "#999", letterSpacing: "0.05em" }}>
            FIX
          </span>
          <p className="text-sm leading-relaxed" style={{ color: "#555" }}>{finding.fix}</p>
        </div>
      ) : null}

      {finding.files.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {finding.files.map((file) => (
            <span
              key={file}
              className="text-xs px-2 py-0.5 font-mono"
              style={{ background: "#fafafa", border: "1px solid #e8e8e8", borderRadius: 4, color: "#777" }}
            >
              {file}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4" style={{ border: "1px solid #e8e8e8", borderRadius: 4 }}>
      <div className="text-xs mb-1.5" style={{ color: "#999" }}>{label}</div>
      <div className="text-2xl font-bold text-[#0a0a0a]" style={{ letterSpacing: "-0.02em" }}>{value}</div>
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
            We pointed Lumerial at DuckDuckGo&apos;s real reviews.
            <br />
            Here&apos;s what we found.
          </h1>
          <p className="text-lg leading-relaxed mb-6" style={{ color: "#555" }}>
            2,180 real Google Play and App Store reviews for DuckDuckGo&apos;s privacy browser,
            clustered into six themes, checked line-by-line against DuckDuckGo&apos;s own
            open-source Android and iOS repositories &mdash; four confirmed in code, two we
            couldn&apos;t, and we say so.
          </p>
          <div className="flex items-center gap-3 text-xs mb-10" style={{ color: "#999" }}>
            <span>The Lumerial team</span>
            <span>&middot;</span>
            <span>August 17, 2026</span>
            <span>&middot;</span>
            <span>9 min read</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard label="Real reviews pulled" value="2,180" />
            <StatCard label="Themes clustered" value="6" />
            <StatCard label="Code-grounded" value="4" />
            <StatCard label="Honest abstentions" value="2" />
          </div>
        </div>
      </section>

      <section className="py-16 px-6" style={{ borderBottom: "1px solid #e8e8e8", background: "#fafafa" }}>
        <div className="max-w-3xl mx-auto flex items-start gap-3">
          <span className="text-xs font-bold shrink-0 mt-0.5" style={{ color: "#999", letterSpacing: "0.05em" }}>
            SCOPE
          </span>
          <p className="text-sm leading-relaxed" style={{ color: "#666" }}>
            <span style={{ color: "#333" }}>
              Lumerial reads reviews and reads code &mdash; it doesn&apos;t write code, open pull
              requests, or run anything against a connected repository.
            </span>{" "}
            Every finding below is a diagnosis and a proposed change, described in text, grounded
            in files that actually exist in DuckDuckGo&apos;s real repositories. When the given
            code couldn&apos;t explain the reported behavior, we said so instead of guessing &mdash;
            two of the six findings below are exactly that, on purpose.
          </p>
        </div>
      </section>

      <section id="why-duckduckgo" className="py-16 px-6" style={{ scrollMarginTop: 80 }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold tracking-tight text-[#0a0a0a] mb-3" style={{ fontSize: "clamp(22px, 2.6vw, 30px)", letterSpacing: "-0.02em" }}>
            Why DuckDuckGo
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "#555" }}>
            We wanted a second case study after Bitwarden &mdash; a real app, real reviews, no
            fixtures. This time we picked a target for a specific reason: well-known enough that
            you don&apos;t need us to explain what it does, and open source on{" "}
            <span style={{ color: "#333" }}>both</span> platforms, so we could check findings
            from App Store reviews against real iOS code and findings from Play Store reviews
            against real Android code &mdash; something the Bitwarden study, Android-only, couldn&apos;t do.
          </p>
          <p className="text-base leading-relaxed mb-8" style={{ color: "#555" }}>
            We also kept the pull small on purpose. DuckDuckGo&apos;s Play Store listing alone has
            over 380,000 written reviews on file &mdash; running our pipeline against all of them
            would have been expensive for no real gain in signal quality. We capped the pull at a
            few thousand recent reviews per platform instead, the same range a small or mid-size
            app would actually generate.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            <figure className="m-0">
              <div style={{ border: "1px solid #e8e8e8", borderRadius: 4, overflow: "hidden" }}>
                <Image
                  src="/case-studies/duckduckgo/play-store-hero.jpg"
                  alt="DuckDuckGo's real Google Play Store listing: 4.7 stars, 2.44M reviews, 50M+ downloads"
                  width={900}
                  height={430}
                  className="w-full h-auto block"
                />
              </div>
              <figcaption className="text-xs mt-2" style={{ color: "#999" }}>
                Google Play, captured live &mdash; 4.7★ across 2.44M reviews.
              </figcaption>
            </figure>
            <figure className="m-0">
              <div style={{ border: "1px solid #e8e8e8", borderRadius: 4, overflow: "hidden" }}>
                <Image
                  src="/case-studies/duckduckgo/app-store-hero.jpg"
                  alt="DuckDuckGo's real Apple App Store listing: 4.8 stars, 2.4M ratings"
                  width={900}
                  height={340}
                  className="w-full h-auto block"
                />
              </div>
              <figcaption className="text-xs mt-2" style={{ color: "#999" }}>
                App Store, captured live &mdash; 4.8★ across 2.4M ratings.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section id="the-pull" className="py-16 px-6" style={{ borderTop: "1px solid #e8e8e8", scrollMarginTop: 80 }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold tracking-tight text-[#0a0a0a] mb-3" style={{ fontSize: "clamp(22px, 2.6vw, 30px)", letterSpacing: "-0.02em" }}>
            2,180 real reviews, two platforms
          </h2>
          <p className="text-base leading-relaxed mb-2" style={{ color: "#555" }}>
            1,200 Android reviews via Google Play&apos;s public review feed, 980 iOS reviews via
            Apple&apos;s public RSS feed (mostRecent and mostHelpful, deduplicated &mdash;
            Apple&apos;s feed caps out around 500&ndash;540 unique reviews per sort order, which is
            why iOS comes in lighter than Android). 79.7% of what came back was from the trailing
            12 months.
          </p>
          <p className="text-base leading-relaxed mb-6" style={{ color: "#555" }}>
            Our sample skews a little more critical than the published aggregate above &mdash;
            4.20★ average here versus the store-wide 4.7&ndash;4.8★ &mdash; because a live feed
            sorted toward recent and most-helpful reviews surfaces more complaints than a lifetime
            average does. That&apos;s expected, and it&apos;s exactly the slice we wanted: not
            &ldquo;is this app good,&rdquo; but &ldquo;what, specifically, keeps coming up.&rdquo;
          </p>
          <div style={{ border: "1px solid #e8e8e8", borderRadius: 4, padding: "20px 20px 16px" }}>
            <div className="flex items-baseline justify-between mb-4">
              <span className="text-xs font-bold" style={{ color: "#999", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Rating distribution &mdash; our sample
              </span>
              <span className="text-xs" style={{ color: "#999" }}>
                {`${totalReviews.toLocaleString()} reviews · 4.20★ avg`}
              </span>
            </div>
            <RatingBarChart />
          </div>
        </div>
      </section>

      <section id="findings" className="py-20 px-6" style={{ borderTop: "1px solid #e8e8e8", scrollMarginTop: 80 }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold tracking-tight text-[#0a0a0a] mb-3" style={{ fontSize: "clamp(24px, 3vw, 36px)", letterSpacing: "-0.03em" }}>
            Six themes, six honest outcomes
          </h2>
          <p className="text-base leading-relaxed mb-10" style={{ color: "#555" }}>
            Each theme below was checked against DuckDuckGo&apos;s real, current source &mdash;{" "}
            <a
              href="https://github.com/duckduckgo/Android"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1"
              style={{ color: "#0a0a0a", textDecoration: "underline", textUnderlineOffset: 3 }}
            >
              duckduckgo/Android
              <ArrowSquareOut size={12} weight="bold" />
            </a>{" "}
            for the Play Store findings,{" "}
            <a
              href="https://github.com/duckduckgo/apple-browsers"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1"
              style={{ color: "#0a0a0a", textDecoration: "underline", textUnderlineOffset: 3 }}
            >
              duckduckgo/apple-browsers
              <ArrowSquareOut size={12} weight="bold" />
            </a>{" "}
            for the App Store findings, both Apache-2.0. Every claim below cites the actual file
            it traces to.
          </p>

          <div className="flex flex-col gap-6">
            {findings.map((f, i) => (
              <FindingCard key={f.theme} finding={f} index={i} />
            ))}
          </div>

          <div className="mt-10" style={{ border: "1px solid #e8e8e8", borderRadius: 4, overflow: "hidden" }}>
            <Image
              src="/case-studies/duckduckgo/github-repo-hero.jpg"
              alt="The duckduckgo/Android GitHub repository: Apache-2.0 license, 8,642 commits, commits from hours and days before we captured this"
              width={1600}
              height={900}
              className="w-full h-auto block"
            />
          </div>
          <div className="flex items-start gap-2.5 mt-3">
            <GithubLogo size={14} weight="bold" style={{ color: "#999", marginTop: 2, flexShrink: 0 }} />
            <p className="text-xs leading-relaxed" style={{ color: "#999" }}>
              Captured live from duckduckgo/Android: Apache-2.0, 8,642 commits, the most recent
              from 5 hours before this screenshot. The repo&apos;s own release page separately
              lists 5.292.0 &mdash; the exact version named in the &ldquo;device not
              supported&rdquo; review above &mdash; as tagged 5 days before we pulled this data.
              The repo, the reviews, and the version numbers all line up on the same real timeline.
            </p>
          </div>
        </div>
      </section>

      <section id="why-it-matters" className="py-16 px-6" style={{ borderTop: "1px solid #e8e8e8", scrollMarginTop: 80 }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold tracking-tight text-[#0a0a0a] mb-3" style={{ fontSize: "clamp(22px, 2.6vw, 30px)", letterSpacing: "-0.02em" }}>
            Why the small ones matter as much as the big one
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "#555" }}>
            The crash theme above is the obvious one &mdash; 26 reviews in six weeks, the lowest
            average rating of anything we found, impossible to miss. But three of the four
            findings we could actually confirm in code had a written review count of one or three.
            Raw volume alone would have buried every one of them under bigger, louder complaints.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: "#555" }}>
            The &ldquo;device not supported&rdquo; review is the clearest case: one person wrote
            it, and 288 other people tapped &ldquo;helpful&rdquo; &mdash; more agreement than any
            other review in our entire 1,200-review Android sample, including the ones with dozens
            of near-identical replies. A count-only view of the data would have ranked it below
            almost everything else. A view that also weighs corroboration wouldn&apos;t have.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>
            The Duck.ai settings theme makes a different version of the same point: three reports,
            19 months apart, each written by someone who had no idea the others existed. Low
            volume in any single month, a clear pattern across the full window &mdash; exactly the
            shape that a snapshot of &ldquo;this week&apos;s top complaints&rdquo; is built to miss,
            and a trend view is built to catch.
          </p>
        </div>
      </section>

      <section className="py-20 px-6" style={{ borderTop: "1px solid #e8e8e8" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-bold tracking-tight text-[#0a0a0a] mb-4" style={{ fontSize: "clamp(24px, 3vw, 36px)", letterSpacing: "-0.03em" }}>
            Not just &ldquo;users are unhappy.&rdquo; Not a guess either.
          </h2>
          <p className="text-base leading-relaxed max-w-xl mx-auto mb-8" style={{ color: "#555" }}>
            Every claim above traces to a real file in a real repository, pulled the same day
            these reviews were. When it couldn&apos;t trace one, it said so instead of naming a
            mechanism it couldn&apos;t see.
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
