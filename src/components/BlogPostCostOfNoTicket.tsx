"use client";

import { ArrowLeft } from "@phosphor-icons/react";
import BlogReadingProgress from "@/components/BlogReadingProgress";
import BlogTableOfContents from "@/components/BlogTableOfContents";

const tocItems = [
  { id: "silent-drop", label: "The reporting drop-off" },
  { id: "backlog-blind-spot", label: "Why ticket-driven backlogs miss it" },
  { id: "how-focus-catches-it", label: "How Focus ranks without a ticket" },
  { id: "retention", label: "Why silence is a retention risk" },
  { id: "case-study", label: "A real example" },
];

const funnelStages = [
  { label: "Hits the bug", width: "100%" },
  { label: "Says something about it — a review, a one-line comment", width: "52%" },
  { label: "Opens a support ticket", width: "18%" },
];

export default function BlogPostCostOfNoTicket() {
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
            The Cost of a Bug Nobody Filed a Ticket For
          </h1>
          <p className="text-lg leading-relaxed mb-6" style={{ color: "#555" }}>
            Most backlogs are built from what got escalated — tickets, Slack pings, direct
            complaints. That quietly assumes every bug worth fixing produces one. Most don&apos;t.
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
            A user who hits a bug has to decide it&apos;s worth the effort of opening a support
            conversation, explaining what happened, and waiting for a reply. Most don&apos;t make
            that trade. Some leave a review on their way out — with or without an explanation.
            Some just stop opening the app. The bug doesn&apos;t disappear. It just never shows up
            in whatever tool your team uses to decide what to fix next.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>
            If that tool only counts tickets, a bug can be genuinely widespread and still rank
            below something a single vocal user escalated three times.
          </p>
        </div>
      </section>

      <section id="silent-drop" className="py-16 px-6" style={{ borderTop: "1px solid #e8e8e8", scrollMarginTop: 80 }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold tracking-tight text-[#0a0a0a] mb-3" style={{ fontSize: "clamp(22px, 2.6vw, 30px)", letterSpacing: "-0.02em" }}>
            The reporting drop-off
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "#555" }}>
            Between a user hitting a bug and a ticket landing in a support queue, there&apos;s a
            decision at every stage about whether it&apos;s worth saying anything at all. Fewer
            people make it through each stage than the one before.
          </p>

          <div className="flex flex-col gap-3 mb-4">
            {funnelStages.map((stage) => (
              <div key={stage.label} className="flex items-center gap-4">
                <div
                  className="h-9 flex items-center px-3"
                  style={{ width: stage.width, minWidth: 120, background: "#0a0a0a", borderRadius: 4 }}
                >
                  <span className="text-xs font-semibold" style={{ color: "#fff" }} />
                </div>
                <span className="text-sm flex-1" style={{ color: "#555" }}>{stage.label}</span>
              </div>
            ))}
          </div>

          <p className="text-xs leading-relaxed" style={{ color: "#999" }}>
            The exact proportions vary by app and audience — the shape doesn&apos;t. Most of the
            gap between the first bar and the last never reaches a backlog built only from tickets.
          </p>
        </div>
      </section>

      <section id="backlog-blind-spot" className="py-16 px-6" style={{ borderTop: "1px solid #e8e8e8", scrollMarginTop: 80 }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold tracking-tight text-[#0a0a0a] mb-3" style={{ fontSize: "clamp(22px, 2.6vw, 30px)", letterSpacing: "-0.02em" }}>
            Why ticket-driven backlogs miss it
          </h2>
          <p className="text-base leading-relaxed mb-5" style={{ color: "#555" }}>
            Filing a ticket takes more effort than most users are willing to spend, and the users
            willing to spend it aren&apos;t a random sample. They skew toward people who are more
            invested, more technical, or simply more patient with support flows. A backlog built
            from ticket volume inherits that skew — it ranks by who complained loudest and most
            persistently, not by how many people actually hit the problem.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>
            That&apos;s not a process failure. It&apos;s what happens when the only input to
            prioritization is the subset of users who chose to escalate.
          </p>
        </div>
      </section>

      <section id="how-focus-catches-it" className="py-16 px-6" style={{ borderTop: "1px solid #e8e8e8", scrollMarginTop: 80 }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold tracking-tight text-[#0a0a0a] mb-3" style={{ fontSize: "clamp(22px, 2.6vw, 30px)", letterSpacing: "-0.02em" }}>
            How Focus ranks without a ticket
          </h2>
          <p className="text-base leading-relaxed mb-5" style={{ color: "#555" }}>
            Focus scores every theme by review volume, rating impact, sentiment, and trend —
            pulled from the review stream itself, not from a support inbox. A theme built from
            dozens of reviews outranks a single loud escalation, whether or not anyone on the team
            ever filed a ticket for it.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>
            That matters because leaving a review is a lower bar than opening a support
            conversation. Some of the users who&apos;d never bother emailing support will still
            leave a one-line, one-star review on their way past. That review is a weaker signal on
            its own — but clustered with a dozen others describing the same thing, it&apos;s
            exactly the pattern a ticket count would have missed entirely.
          </p>
        </div>
      </section>

      <section id="retention" className="py-16 px-6" style={{ borderTop: "1px solid #e8e8e8", scrollMarginTop: 80 }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold tracking-tight text-[#0a0a0a] mb-3" style={{ fontSize: "clamp(22px, 2.6vw, 30px)", letterSpacing: "-0.02em" }}>
            Why silence is a retention risk
          </h2>
          <p className="text-base leading-relaxed mb-5" style={{ color: "#555" }}>
            The users least likely to file a ticket aren&apos;t necessarily the least affected —
            they&apos;re often just the least invested in the relationship. A user who cares enough
            to fight through a support flow is, in a sense, telling you they still want this to
            work. A user who says nothing and quietly stops opening the app isn&apos;t making that
            statement either way.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>
            A ticket-driven backlog structurally can&apos;t see that second group. Ranking on
            review signal instead doesn&apos;t bring back the users who already left — but it
            surfaces the same bug earlier, while there are still more users around who haven&apos;t
            churned over it yet.
          </p>
        </div>
      </section>

      <section id="case-study" className="py-16 px-6" style={{ borderTop: "1px solid #e8e8e8", background: "#fafafa", scrollMarginTop: 80 }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold tracking-tight text-[#0a0a0a] mb-4" style={{ fontSize: "clamp(22px, 2.6vw, 30px)", letterSpacing: "-0.02em" }}>
            What this looked like on a real app
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: "#555" }}>
            In the Bitwarden for Android run, fourteen reviews independently described the app
            silently dropping security settings — biometric login, autofill preferences, URL match
            detection — after a vault timeout, averaging a 2.0-star rating. That cluster traced to
            a specific function that wipes the settings store and restores only a handful of the
            values it should. Nothing in that data says how many other users hit the same bug and
            didn&apos;t leave a review at all. Fourteen who did was already enough to rank and
            ground it.
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
            If your backlog is built from what got escalated, it&apos;s only seeing the users who
            bothered to escalate. See what&apos;s in the part of the funnel your ticket queue never
            reaches.
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
