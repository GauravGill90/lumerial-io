"use client";

import { useState } from "react";
import { ArrowLeft, Plus } from "@phosphor-icons/react";
import BlogReadingProgress from "@/components/BlogReadingProgress";
import BlogTableOfContents from "@/components/BlogTableOfContents";

const tocItems = [
  { id: "comparison", label: "Two different weeks" },
  { id: "how-it-works", label: "How it works" },
  { id: "surfaces", label: "Five surfaces" },
  { id: "benefits", label: "Benefits" },
  { id: "use-cases", label: "Use cases" },
  { id: "case-study", label: "Real-app case study" },
];

const comparisonRows: { label: string; without: string; withLumerial: string }[] = [
  {
    label: "Reading the reviews",
    without: "Someone skims the 1-star pile once a sprint, if there's time.",
    withLumerial: "Every review is read and clustered into themes automatically.",
  },
  {
    label: "Prioritizing what to fix",
    without: "Whatever complaint was loudest in Slack this week.",
    withLumerial: "A ranked queue scored by review volume, rating impact, sentiment, and trend.",
  },
  {
    label: "Diagnosing the cause",
    without: "A PM paraphrases the bug; an engineer can't reproduce it.",
    withLumerial: "A diagnosis traced to the actual file and function in your repo.",
  },
  {
    label: "Trusting the diagnosis",
    without: "“Is this even real, or just one angry user?”",
    withLumerial: "Grounded in code that actually exists — or an honest “we don't know.”",
  },
  {
    label: "Answering “why is our rating dropping”",
    without: "Someone digs through spreadsheets and old Slack threads.",
    withLumerial: "Ask a question in plain English, get an answer grounded in the same data.",
  },
];

const steps = [
  {
    n: "01",
    title: "Connect",
    description:
      "Point Lumerial at your app's Google Play or App Store listing. Optionally link the GitHub repo behind it — credentials are verified server-side and stored in Supabase Vault, never in a plain column.",
  },
  {
    n: "02",
    title: "Cluster",
    description:
      "Every review gets pulled in and clustered into themes — the recurring complaints, not one-off noise. Each theme carries a plain-English verdict, its review volume, and its average rating.",
  },
  {
    n: "03",
    title: "Ground",
    description:
      "For each theme, Lumerial generates code-search queries, pulls real files from your connected repo, and asks whether that code explains what users are describing — following up to two hops deeper when it doesn't, before concluding the cause is outside what it can see.",
  },
  {
    n: "04",
    title: "Prioritize",
    description:
      "Focus ranks everything into a top-10 queue, scored by review volume, rating impact, sentiment, and trend — so the next thing you fix is the thing actually costing you users, not just the loudest complaint in Slack.",
  },
];

const surfaces = [
  { name: "Focus", description: "A ranked top-10 queue of what to fix next, scored from review volume, rating, sentiment, and trend." },
  { name: "Themes", description: "Every recurring complaint clustered into one theme, with a plain-English verdict and a code-grounded fix." },
  { name: "Reviews", description: "The raw review stream behind every theme, searchable and filterable. Nothing above is a black box." },
  { name: "Ask", description: "Ask a question in plain English and get an answer grounded in your own review and theme data — not a general chatbot guess." },
  { name: "Connections", description: "Link an app's reviews to its GitHub repo so fix suggestions cite real files, not hallucinated ones." },
];

const benefits = [
  {
    title: "Every review gets read, not just the one-star pile",
    body: "All reviews are pulled in and clustered into themes automatically, so nothing sits unread in a spreadsheet or gets judged on star rating alone.",
  },
  {
    title: "Fixes grounded in real code",
    body: "Every suggested fix traces to a file that actually exists in your connected repo — usually a function — not a plausible-sounding guess.",
  },
  {
    title: "Honest when the evidence isn't there",
    body: "When the code can't explain a complaint, Lumerial says so instead of naming a mechanism it can't see. That's what makes the fixes it does suggest worth trusting.",
  },
  {
    title: "One source of truth",
    body: "The dashboard and the Ask agent read from the same retrieval layer, so the UI and the answer to a question can never quietly disagree.",
  },
  {
    title: "Nothing to set up before you look",
    body: "Every page falls back to a built-in fixture with no backend configured, so you can click through the real product before connecting anything.",
  },
];

const useCases = [
  {
    title: "Turning review volume into a ranked backlog",
    body: "Focus scores every theme by review volume, rating impact, sentiment, and trend, so “what do we fix next” has a data-backed answer instead of a hunch.",
  },
  {
    title: "Giving engineers a reproducible bug report",
    body: "Instead of a PM's paraphrase of a review, hand off a diagnosis tied to an exact file and function in the codebase.",
  },
  {
    title: "Investigating a rating drop",
    body: "Ask “why did our rating drop this week” in plain English and get an answer grounded in the same review and theme data everyone else is looking at.",
  },
  {
    title: "Grounding fixes in your own repo",
    body: "Connect an app's reviews to its GitHub repository so fix suggestions cite real files instead of hallucinated ones.",
  },
  {
    title: "Settling roadmap debates with evidence",
    body: "Bring a ranked, evidence-backed list to planning instead of whoever complained loudest in Slack this week.",
  },
];

function AccordionItem({ title, body, defaultOpen = false }: { title: string; body: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: "1px solid #e8e8e8" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        style={{ background: "transparent", border: "none", cursor: "pointer" }}
      >
        <span className="text-sm font-bold text-[#0a0a0a]">{title}</span>
        <Plus
          size={16}
          weight="bold"
          color="#999"
          style={{ flexShrink: 0, transition: "transform 150ms", transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        />
      </button>
      {open ? (
        <p className="text-sm leading-relaxed pb-5 pr-8" style={{ color: "#555" }}>
          {body}
        </p>
      ) : null}
    </div>
  );
}

export default function BlogPostUsersAlreadyToldYou() {
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
            Your Users Already Told You What&apos;s Broken
          </h1>
          <p className="text-lg leading-relaxed mb-6" style={{ color: "#555" }}>
            App Store and Google Play reviews are the highest-signal, lowest-cost user research
            most teams already own — and stop reading past the star rating. Here&apos;s what
            we built to actually read them, and why it&apos;s willing to tell you when it doesn&apos;t
            know the answer.
          </p>
          <div className="flex items-center gap-3 text-xs" style={{ color: "#999" }}>
            <span>The Lumerial team</span>
            <span>&middot;</span>
            <span>August 11, 2026</span>
            <span>&middot;</span>
            <span>6 min read</span>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>
            Every team with a public app is sitting on a pile of free, unsolicited user research.
            It arrives daily, it&apos;s specific, and almost nobody reads past the aggregate star
            rating. A one-star review that says exactly which button doesn&apos;t work gets the
            same five seconds of attention as one that just says &ldquo;bad app.&rdquo; At any real
            volume, that&apos;s not a process problem — it&apos;s a reading problem. There&apos;s
            simply more feedback than any one person can triage by hand.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>
            We built Lumerial to do that reading. It ingests every review from your app&apos;s
            Google Play or App Store listing, clusters the recurring complaints into themes, and
            — once you connect the GitHub repo behind the app — traces each theme back to
            the code that actually explains it. Not sentiment. Not a paraphrase. A diagnosis, or an
            honest admission that the evidence isn&apos;t there.
          </p>
        </div>
      </section>

      <section id="comparison" className="py-16 px-6" style={{ borderTop: "1px solid #e8e8e8", scrollMarginTop: 80 }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold tracking-tight text-[#0a0a0a] mb-3" style={{ fontSize: "clamp(22px, 2.6vw, 30px)", letterSpacing: "-0.02em" }}>
            The same reviews, two different weeks
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "#555" }}>
            Nothing about the raw material changes — it&apos;s the same reviews either way.
            What changes is what happens to them between the moment a user hits submit and the
            moment an engineer picks up a ticket.
          </p>

          <div className="overflow-x-auto" style={{ border: "1px solid #e8e8e8", borderRadius: 4 }}>
            <table className="w-full text-sm" style={{ borderCollapse: "collapse", minWidth: 640 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #e8e8e8", background: "#fafafa" }}>
                  <th className="text-left p-4 font-semibold" style={{ color: "#999" }} />
                  <th className="text-left p-4 font-semibold" style={{ color: "#999" }}>Without Lumerial</th>
                  <th className="text-left p-4 font-semibold" style={{ color: "#0a0a0a" }}>With Lumerial</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.label} style={{ borderBottom: i < comparisonRows.length - 1 ? "1px solid #e8e8e8" : "none" }}>
                    <td className="p-4 align-top font-semibold text-[#0a0a0a]" style={{ whiteSpace: "nowrap" }}>{row.label}</td>
                    <td className="p-4 align-top" style={{ color: "#777" }}>{row.without}</td>
                    <td className="p-4 align-top" style={{ color: "#333" }}>{row.withLumerial}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-sm leading-relaxed mt-6" style={{ color: "#666" }}>
            The right-hand column isn&apos;t a promise that every review turns into a tidy answer.
            Some genuinely don&apos;t — the code that would explain them isn&apos;t visible from
            the repo. Lumerial is built to say that plainly instead of guessing, which is what makes
            the rest of the column worth trusting.
          </p>
        </div>
      </section>

      <section id="how-it-works" className="py-16 px-6" style={{ borderTop: "1px solid #e8e8e8", scrollMarginTop: 80 }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold tracking-tight text-[#0a0a0a] mb-3" style={{ fontSize: "clamp(22px, 2.6vw, 30px)", letterSpacing: "-0.02em" }}>
            How it works
          </h2>
          <p className="text-base leading-relaxed mb-10" style={{ color: "#555" }}>
            The same four steps run for every app, every time.
          </p>

          <div className="flex flex-col gap-8 mb-10">
            {steps.map((step) => (
              <div key={step.n} className="flex gap-5">
                <div
                  className="text-xs font-bold shrink-0 flex items-center justify-center"
                  style={{ width: 28, height: 28, borderRadius: 4, border: "1px solid #e8e8e8", color: "#999" }}
                >
                  {step.n}
                </div>
                <div>
                  <h3 className="text-base font-bold mb-1.5 text-[#0a0a0a]">{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#555" }}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <blockquote
            className="text-base leading-relaxed pl-5"
            style={{ borderLeft: "2px solid #eab308", color: "#333", fontStyle: "italic" }}
          >
            &ldquo;When the code can&apos;t explain what a review is describing, Lumerial says so
            — instead of naming a mechanism it can&apos;t see.&rdquo;
          </blockquote>
        </div>
      </section>

      <section id="surfaces" className="py-16 px-6" style={{ borderTop: "1px solid #e8e8e8", scrollMarginTop: 80 }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold tracking-tight text-[#0a0a0a] mb-3" style={{ fontSize: "clamp(22px, 2.6vw, 30px)", letterSpacing: "-0.02em" }}>
            Five surfaces, one source of truth
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "#555" }}>
            The dashboard and the chat agent read from the same retrieval layer, so the UI and the
            answer to &ldquo;why is our rating dropping&rdquo; can never disagree.
          </p>

          <div className="flex flex-col" style={{ border: "1px solid #e8e8e8", borderRadius: 4 }}>
            {surfaces.map((s, i) => (
              <div
                key={s.name}
                className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 p-5"
                style={{ borderBottom: i < surfaces.length - 1 ? "1px solid #e8e8e8" : "none" }}
              >
                <span className="text-sm font-bold shrink-0 text-[#0a0a0a]" style={{ width: 120 }}>{s.name}</span>
                <span className="text-sm leading-relaxed" style={{ color: "#555" }}>{s.description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="benefits" className="py-16 px-6" style={{ borderTop: "1px solid #e8e8e8", scrollMarginTop: 80 }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold tracking-tight text-[#0a0a0a] mb-8" style={{ fontSize: "clamp(22px, 2.6vw, 30px)", letterSpacing: "-0.02em" }}>
            Benefits
          </h2>
          <div style={{ borderTop: "1px solid #e8e8e8" }}>
            {benefits.map((b) => (
              <AccordionItem key={b.title} title={b.title} body={b.body} />
            ))}
          </div>
        </div>
      </section>

      <section id="use-cases" className="py-16 px-6" style={{ borderTop: "1px solid #e8e8e8", scrollMarginTop: 80 }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold tracking-tight text-[#0a0a0a] mb-8" style={{ fontSize: "clamp(22px, 2.6vw, 30px)", letterSpacing: "-0.02em" }}>
            Use cases
          </h2>
          <div style={{ borderTop: "1px solid #e8e8e8" }}>
            {useCases.map((u) => (
              <AccordionItem key={u.title} title={u.title} body={u.body} />
            ))}
          </div>
        </div>
      </section>

      <section id="case-study" className="py-16 px-6" style={{ borderTop: "1px solid #e8e8e8", background: "#fafafa", scrollMarginTop: 80 }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold tracking-tight text-[#0a0a0a] mb-4" style={{ fontSize: "clamp(22px, 2.6vw, 30px)", letterSpacing: "-0.02em" }}>
            What it looked like on a real app
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: "#555" }}>
            We ran the full pipeline against Bitwarden for Android — 127 real Google Play
            reviews, clustered into themes, each checked against Bitwarden&apos;s actual
            open-source repository. Four themes came back with a fix suggestion grounded in a
            specific file. Two came back with an honest &ldquo;the evidence isn&apos;t here,&rdquo;
            on purpose, because the code that would explain them lives outside what the repo can
            see. Every claim was independently re-verified, line by line, against the live repo
            before we published it.
          </p>
          <a
            href="/case-studies/bitwarden"
            className="inline-flex items-center gap-2 text-sm font-bold transition-colors duration-150"
            style={{ color: "#0a0a0a" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#eab308")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#0a0a0a")}
          >
            Read the full Bitwarden case study &rarr;
          </a>
        </div>
      </section>

      <section className="py-20 px-6" style={{ borderTop: "1px solid #e8e8e8" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-base leading-relaxed max-w-xl mx-auto mb-8" style={{ color: "#555" }}>
            If your team is still triaging reviews by skimming the one-star pile once a sprint,
            this is the part where we&apos;d normally tell you to try it. So: try it on your own
            reviews, and see if what comes back is something your engineers would actually act on.
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
