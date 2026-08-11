"use client";

import { useState } from "react";
import { ArrowLeft, ArrowsClockwise, Plus } from "@phosphor-icons/react";
import BlogReadingProgress from "@/components/BlogReadingProgress";
import BlogTableOfContents from "@/components/BlogTableOfContents";

const tocItems = [
  { id: "bottleneck", label: "Where the time actually goes" },
  { id: "how-it-works", label: "What connecting a repo skips" },
  { id: "comparison", label: "Before and after" },
  { id: "customer-impact", label: "What customers feel" },
  { id: "use-cases", label: "Use cases" },
  { id: "case-study", label: "Real-app case study" },
];

const relayChain: { day: string; source: string; color: string; text: string; dashed?: boolean }[] = [
  {
    day: "Day 1",
    source: "App Store",
    color: "#eab308",
    text: "“Checkout spinning forever on iOS 17.4 — 3 days now.”",
  },
  {
    day: "Day 4",
    source: "Support ticket",
    color: "#888",
    text: "User says checkout hangs. Forwarding to eng — can someone take a look?",
  },
  {
    day: "Day 9",
    source: "Eng Slack",
    color: "#f43f5e",
    text: "Tried to reproduce, couldn’t. Need repro steps from support.",
  },
  {
    day: "Day 15",
    source: "Backlog",
    color: "#999",
    text: "Still unprioritized. Waiting on next planning cycle.",
    dashed: true,
  },
];

const steps = [
  {
    n: "01",
    title: "The repo is already connected",
    description:
      "Once an app's GitHub repo is linked, every new theme is checked against it automatically — nobody has to file a request to \"see if engineering can take a look.\"",
  },
  {
    n: "02",
    title: "The diagnosis is grounded, not guessed",
    description:
      "Lumerial generates code-search queries from what users are describing, pulls the real files, and follows up to two hops deeper when the first pass doesn't explain it — before an engineer ever opens the repo themselves.",
  },
  {
    n: "03",
    title: "Priority is already decided",
    description:
      "Focus ranks the theme against everything else open, by review volume, rating impact, sentiment, and trend — so \"should we fix this now\" isn't a separate meeting.",
  },
  {
    n: "04",
    title: "The handoff is a diagnosis, not a rumor",
    description:
      "What lands on an engineer's desk is a specific file and function, not a paraphrase of a paraphrase. There's less to question, so there's less back-and-forth before work starts.",
  },
];

const customerImpacts = [
  {
    title: "The same complaint stops repeating",
    body: "When a theme is fixed at the root cause instead of patched at the symptom, the cluster of reviews describing it stops growing instead of just getting a slower drip of new one-star ratings.",
  },
  {
    title: "Fixes ship for what's actually costing users, not what's loudest",
    body: "A quiet but widespread bug can outrank a vocal complaint. Customers who never posted in a Slack channel or filed a ticket still get their issue addressed because the volume shows up in the data.",
  },
  {
    title: "Support isn't relaying guesses",
    body: "When support can point to a theme with a real diagnosis instead of saying \"we've passed it along,\" the answer a customer gets back is honest about where the fix actually stands.",
  },
  {
    title: "Trust compounds",
    body: "A user who sees their specific complaint reflected in a changelog is more likely to leave detailed feedback next time instead of a one-line rating and nothing else.",
  },
];

const useCases = [
  {
    title: "Cutting the time between complaint and code",
    body: "Skip the relay race of support forwarding, PM rewriting, and engineer re-diagnosing — the theme arrives with a file and function already attached.",
  },
  {
    title: "Deciding what ships in the next sprint",
    body: "Pull the top of the Focus queue instead of debating which bug report sounded most urgent in standup.",
  },
  {
    title: "Closing the loop with support",
    body: "Give support a real answer — a theme, its status, and what's actually being done — instead of a vague \"engineering is looking into it.\"",
  },
  {
    title: "Watching a fix actually land",
    body: "After shipping, watch the same theme's review volume and rating in the weeks after, using the same data that flagged it in the first place.",
  },
  {
    title: "Catching issues before they're loud",
    body: "A theme can rank high on volume and trend well before it generates the kind of noise that would normally force a team to notice it.",
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

export default function BlogPostFromReviewToFix() {
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
            Engineering
          </div>
          <h1
            className="font-bold tracking-tight mb-6 text-[#0a0a0a]"
            style={{ fontSize: "clamp(30px, 4.2vw, 48px)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
          >
            From Review to Fix: How Fast Lumerial Actually Moves
          </h1>
          <p className="text-lg leading-relaxed mb-6" style={{ color: "#555" }}>
            Most of the time between a user hitting submit on a complaint and an engineer opening
            a fix isn&apos;t spent writing code — it&apos;s spent relaying, rewriting, and
            reproducing. Connecting a repo is what lets Lumerial skip most of that.
          </p>
          <div className="flex items-center gap-3 text-xs" style={{ color: "#999" }}>
            <span>The Lumerial team</span>
            <span>&middot;</span>
            <span>August 11, 2026</span>
            <span>&middot;</span>
            <span>5 min read</span>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>
            Ask most engineering teams why a known bug took weeks to fix, and the honest answer is
            rarely &ldquo;it was hard to fix.&rdquo; It&apos;s that the bug spent most of that time
            not being worked on — sitting in a support queue, waiting for someone to write it up,
            waiting for someone else to figure out if it was even reproducible.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>
            Lumerial doesn&apos;t make engineers type faster. It removes the steps before typing
            starts. Once an app&apos;s reviews are flowing in and its GitHub repo is connected,
            every recurring complaint is already clustered, already checked against the actual
            code, and already ranked against everything else competing for attention — before
            anyone on the team has opened a ticket.
          </p>
        </div>
      </section>

      <section id="bottleneck" className="py-16 px-6" style={{ borderTop: "1px solid #e8e8e8", scrollMarginTop: 80 }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold tracking-tight text-[#0a0a0a] mb-3" style={{ fontSize: "clamp(22px, 2.6vw, 30px)", letterSpacing: "-0.02em" }}>
            Where the time actually goes
          </h2>
          <p className="text-base leading-relaxed mb-5" style={{ color: "#555" }}>
            A typical path from a user&apos;s complaint to a shipped fix passes through several
            people who each add a delay, not because anyone is slow, but because each handoff
            requires re-establishing context the last person already had:
          </p>
          <ul className="flex flex-col gap-3 mb-6">
            {[
              "The review sits in an app store dashboard until someone happens to read it.",
              "Support paraphrases it into a ticket, losing some of the original detail.",
              "A PM decides whether it's worth a slot, usually based on how many similar tickets they remember seeing.",
              "An engineer tries to reproduce it from a secondhand description, often without success on the first attempt.",
            ].map((line) => (
              <li key={line} className="flex gap-3 text-sm leading-relaxed" style={{ color: "#555" }}>
                <span style={{ color: "#eab308" }}>&bull;</span>
                {line}
              </li>
            ))}
          </ul>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>
            None of these steps are wasteful in isolation. But stacked together, they&apos;re the
            actual bottleneck — not the difficulty of the fix itself.
          </p>
        </div>
      </section>

      <section id="how-it-works" className="py-16 px-6" style={{ borderTop: "1px solid #e8e8e8", scrollMarginTop: 80 }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold tracking-tight text-[#0a0a0a] mb-3" style={{ fontSize: "clamp(22px, 2.6vw, 30px)", letterSpacing: "-0.02em" }}>
            What connecting a repo skips
          </h2>
          <p className="text-base leading-relaxed mb-10" style={{ color: "#555" }}>
            The moment a GitHub repo is linked to an app, the diagnosis step stops waiting on a
            human being available to do it.
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
            &ldquo;The fastest fix is the one that never had to wait for someone to notice, write
            up, and reproduce it first.&rdquo;
          </blockquote>
        </div>
      </section>

      <section id="comparison" className="py-16 px-6" style={{ borderTop: "1px solid #e8e8e8", scrollMarginTop: 80 }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-bold tracking-tight text-[#0a0a0a] mb-3" style={{ fontSize: "clamp(22px, 2.6vw, 30px)", letterSpacing: "-0.02em" }}>
            Before and after connecting a repo
          </h2>
          <p className="text-base leading-relaxed mb-10" style={{ color: "#555" }}>
            Same bug, same starting review. What changes is how many people and how much
            re-explaining stand between the complaint and someone actually able to act on it.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Without Lumerial: relay chain */}
            <div>
              <div
                className="text-xs font-semibold mb-4 px-1"
                style={{ color: "#999", letterSpacing: "0.08em", textTransform: "uppercase" }}
              >
                Without Lumerial
              </div>
              <div className="flex flex-col gap-3">
                {relayChain.map((step) => (
                  <div
                    key={step.day}
                    className="p-4"
                    style={{
                      border: step.dashed ? "1px dashed #d0d0d0" : "1px solid #e8e8e8",
                      borderRadius: 4,
                      background: step.dashed ? "#fafafa" : "#fff",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold" style={{ color: "#999" }}>{step.day}</span>
                      <span
                        className="text-xs px-1.5 py-0.5 font-medium"
                        style={{ background: `${step.color}18`, color: step.color, border: `1px solid ${step.color}40`, borderRadius: 4 }}
                      >
                        {step.source}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: step.dashed ? "#999" : "#555" }}>
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* With Lumerial: Focus panel */}
            <div>
              <div
                className="text-xs font-semibold mb-4 px-1"
                style={{ color: "#eab308", letterSpacing: "0.08em", textTransform: "uppercase" }}
              >
                With Lumerial
              </div>
              <div
                className="flex flex-col overflow-hidden"
                style={{
                  borderRadius: 12,
                  background: "linear-gradient(145deg, #0f0f1a 0%, #0a0a12 100%)",
                  boxShadow: "0 24px 48px rgba(0,0,0,0.16), 0 0 0 1px rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="flex items-center gap-1.5 px-4 py-3 shrink-0"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
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
                  </span>
                </div>

                <div className="p-4 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold" style={{ color: "rgba(255,255,255,0.4)" }}>Day 1</span>
                    <span
                      className="text-xs px-1.5 py-0.5 font-medium"
                      style={{ background: "rgba(34,197,94,0.14)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 4 }}
                    >
                      Grounded in code
                    </span>
                  </div>

                  <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="text-sm font-bold mb-1" style={{ color: "#fff" }}>
                      Checkout hangs on iOS 17.4
                    </div>
                    <div
                      className="text-xs mb-3 px-2 py-1 inline-block"
                      style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.55)", borderRadius: 4, fontFamily: "monospace" }}
                    >
                      CheckoutViewController.swift:214
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: "Volume", value: "38 reviews" },
                        { label: "Rating impact", value: "high" },
                        { label: "Trend", value: "↑ rising" },
                      ].map((stat) => (
                        <div key={stat.label}>
                          <div className="text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{stat.label}</div>
                          <div className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.75)" }}>{stat.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg px-3 py-2.5" style={{ background: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.25)" }}>
                    <span className="text-xs font-semibold" style={{ color: "#eab308" }}>
                      Ready for engineering — no repro needed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm leading-relaxed mt-8" style={{ color: "#666" }}>
            None of this replaces engineering judgment — someone still decides what to build and
            how. It just means that decision starts from a diagnosis instead of a rumor.
          </p>
        </div>
      </section>

      <section id="customer-impact" className="py-16 px-6" style={{ borderTop: "1px solid #e8e8e8", scrollMarginTop: 80 }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold tracking-tight text-[#0a0a0a] mb-8" style={{ fontSize: "clamp(22px, 2.6vw, 30px)", letterSpacing: "-0.02em" }}>
            What customers actually feel
          </h2>
          <div style={{ borderTop: "1px solid #e8e8e8" }}>
            {customerImpacts.map((c) => (
              <AccordionItem key={c.title} title={c.title} body={c.body} />
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
            We ran the full pipeline against Bitwarden for Android&apos;s connected repository.
            Four themes came back with a fix suggestion pointing at a specific file — no support
            ticket, no reproduction attempt, no PM write-up required to get there. Two came back
            with an honest &ldquo;the evidence isn&apos;t here,&rdquo; because the code that would
            explain them lives outside what the repo can see. Every claim was independently
            re-verified, line by line, against the live repo before we published it.
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
            If the gap between &ldquo;a user complained&rdquo; and &ldquo;an engineer is looking at
            the right file&rdquo; is where your team is losing time, connecting a repo is the
            single change that shortens it the most.
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
