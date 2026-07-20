"use client";

/* ─── Theme 1: Dark Amber / Terminal ─────────────────────────── */
function ThemeAmber() {
  return (
    <section
      style={{ background: "#090800", minHeight: "100vh", padding: "0", fontFamily: "Inter, sans-serif", position: "relative", overflow: "hidden" }}
    >
      {/* Subtle scanline texture */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(245,158,11,0.015) 2px, rgba(245,158,11,0.015) 4px)", pointerEvents: "none" }} />

      {/* Nav */}
      <nav style={{ borderBottom: "1px solid rgba(245,158,11,0.15)", padding: "0 48px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "monospace", fontSize: 13, color: "#f59e0b", letterSpacing: "0.15em", fontWeight: 700 }}>LUMERIAL</span>
        <div style={{ display: "flex", gap: 32 }}>
          {["Features", "Pricing", "Docs"].map(l => (
            <span key={l} style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(245,158,11,0.5)", letterSpacing: "0.1em" }}>{l}</span>
          ))}
        </div>
        <button style={{ fontFamily: "monospace", fontSize: 11, color: "#090800", background: "#f59e0b", border: "none", padding: "6px 16px", letterSpacing: "0.1em", cursor: "pointer", fontWeight: 700 }}>GET ACCESS →</button>
      </nav>

      {/* Hero */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "100px 48px 60px" }}>
        <div style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(245,158,11,0.6)", letterSpacing: "0.2em", marginBottom: 32, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#f59e0b", boxShadow: "0 0 6px #f59e0b" }} />
          PRIVATE BETA — SIGNAL INTELLIGENCE PLATFORM
        </div>
        <h1 style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(42px, 6vw, 80px)", fontWeight: 800, color: "#fef3c7", lineHeight: 1.0, letterSpacing: "-0.03em", margin: "0 0 32px" }}>
          Every signal.<br />
          <span style={{ color: "#f59e0b" }}>One truth.</span>
        </h1>
        <p style={{ fontSize: 17, color: "rgba(254,243,199,0.45)", lineHeight: 1.7, maxWidth: 520, marginBottom: 48 }}>
          Lumerial aggregates app reviews, support tickets, and forum threads into structured product intelligence — and tells you exactly what to build next.
        </p>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button style={{ background: "#f59e0b", color: "#090800", border: "none", padding: "12px 28px", fontWeight: 800, fontSize: 13, fontFamily: "monospace", letterSpacing: "0.1em", cursor: "pointer" }}>REQUEST ACCESS →</button>
          <button style={{ background: "transparent", color: "rgba(245,158,11,0.6)", border: "1px solid rgba(245,158,11,0.25)", padding: "11px 28px", fontWeight: 600, fontSize: 13, fontFamily: "monospace", letterSpacing: "0.1em", cursor: "pointer" }}>LIVE DEMO</button>
        </div>

        {/* Data strip */}
        <div style={{ marginTop: 72, borderTop: "1px solid rgba(245,158,11,0.12)", borderBottom: "1px solid rgba(245,158,11,0.12)", padding: "20px 0", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
          {[["2,847", "signals today"], ["73/100", "sentiment score"], ["Onboarding", "top theme"], ["3", "critical issues"]].map(([val, lbl]) => (
            <div key={lbl} style={{ padding: "0 24px", borderRight: "1px solid rgba(245,158,11,0.12)" }}>
              <div style={{ fontFamily: "monospace", fontSize: 22, fontWeight: 700, color: "#f59e0b", letterSpacing: "-0.02em" }}>{val}</div>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(245,158,11,0.4)", letterSpacing: "0.12em", marginTop: 4 }}>{lbl.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Theme 2: Off-White Editorial ───────────────────────────── */
function ThemeEditorial() {
  return (
    <section style={{ background: "#faf9f6", minHeight: "100vh", fontFamily: "Georgia, serif" }}>
      {/* Nav */}
      <nav style={{ borderBottom: "1px solid #e5e1d8", padding: "0 48px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "Georgia, serif", fontSize: 16, color: "#1a1a2e", fontStyle: "italic", fontWeight: 700, letterSpacing: "-0.02em" }}>Lumerial</span>
        <div style={{ display: "flex", gap: 32 }}>
          {["Features", "Pricing", "Company"].map(l => (
            <span key={l} style={{ fontFamily: "system-ui, sans-serif", fontSize: 13, color: "#6b6b6b" }}>{l}</span>
          ))}
        </div>
        <button style={{ fontFamily: "system-ui, sans-serif", fontSize: 13, color: "#faf9f6", background: "#1a1a2e", border: "none", padding: "8px 20px", cursor: "pointer", fontWeight: 600 }}>Get early access</button>
      </nav>

      {/* Rule */}
      <div style={{ height: 3, background: "#1a1a2e" }} />

      {/* Hero */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 48px 60px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}>
          <span style={{ fontFamily: "system-ui", fontSize: 11, color: "#6b6b6b", letterSpacing: "0.15em", textTransform: "uppercase" }}>Signal Intelligence</span>
          <span style={{ flex: 1, height: 1, background: "#e5e1d8" }} />
          <span style={{ fontFamily: "system-ui", fontSize: 11, color: "#6b6b6b", letterSpacing: "0.15em" }}>Private Beta</span>
        </div>

        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(48px, 7vw, 96px)", fontWeight: 700, color: "#1a1a2e", lineHeight: 1.0, letterSpacing: "-0.03em", margin: "0 0 40px" }}>
          Stop drowning<br />
          in feedback.
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
          <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 18, color: "#4a4a4a", lineHeight: 1.7, margin: 0 }}>
            Lumerial aggregates product signals from App Store reviews, support tickets, and Reddit threads — then surfaces what users actually need, and what your engineers should fix.
          </p>
          <div>
            <button style={{ width: "100%", fontFamily: "system-ui", fontSize: 14, color: "#faf9f6", background: "#1a1a2e", border: "none", padding: "16px 28px", cursor: "pointer", fontWeight: 600, marginBottom: 12, textAlign: "left" }}>
              Request early access →
            </button>
            <button style={{ width: "100%", fontFamily: "system-ui", fontSize: 14, color: "#1a1a2e", background: "transparent", border: "2px solid #1a1a2e", padding: "14px 28px", cursor: "pointer", fontWeight: 600, textAlign: "left" }}>
              See how it works
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ marginTop: 80, paddingTop: 32, borderTop: "2px solid #1a1a2e", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }}>
          {[["20+ sources", "App Store, Zendesk, Reddit, G2 and more"], ["Real-time", "Signals processed every 15 minutes"], ["Code-level fixes", "Not just themes — actual engineering suggestions"]].map(([val, lbl]) => (
            <div key={val} style={{ paddingRight: 32, borderRight: "1px solid #e5e1d8", marginRight: 32 }}>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 26, fontWeight: 700, color: "#1a1a2e", fontStyle: "italic" }}>{val}</div>
              <div style={{ fontFamily: "system-ui", fontSize: 13, color: "#6b6b6b", marginTop: 6, lineHeight: 1.5 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Theme 3: Dark Lime / Sharp ─────────────────────────────── */
function ThemeLime() {
  return (
    <section style={{ background: "#0c0c0c", minHeight: "100vh", fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
      {/* Nav */}
      <nav style={{ padding: "0 48px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #1f1f1f" }}>
        <span style={{ fontSize: 15, color: "#fff", fontWeight: 700, letterSpacing: "-0.02em" }}>lumerial</span>
        <div style={{ display: "flex", gap: 32 }}>
          {["Features", "Pricing", "Docs"].map(l => (
            <span key={l} style={{ fontSize: 13, color: "#555" }}>{l}</span>
          ))}
        </div>
        <button style={{ fontSize: 13, color: "#0c0c0c", background: "#a3e635", border: "none", padding: "8px 18px", fontWeight: 700, cursor: "pointer", borderRadius: 4 }}>Get access</button>
      </nav>

      {/* Hero */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "96px 48px 60px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 40, border: "1px solid #1f1f1f", padding: "6px 14px", borderRadius: 4 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#a3e635", display: "inline-block" }} />
          <span style={{ fontSize: 12, color: "#555", letterSpacing: "0.05em" }}>Private beta — join waitlist</span>
        </div>

        <h1 style={{ fontSize: "clamp(44px, 6.5vw, 88px)", fontWeight: 800, color: "#fff", lineHeight: 1.0, letterSpacing: "-0.04em", margin: "0 0 28px" }}>
          All your signals.<br />
          <span style={{ color: "#a3e635" }}>One answer.</span>
        </h1>
        <p style={{ fontSize: 17, color: "#555", lineHeight: 1.65, maxWidth: 500, marginBottom: 44 }}>
          Aggregate reviews, tickets, and forum threads. Surface themes, sentiment, and engineering-level fix suggestions automatically.
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ fontSize: 14, color: "#0c0c0c", background: "#a3e635", border: "none", padding: "13px 28px", fontWeight: 700, cursor: "pointer", borderRadius: 4 }}>Request access</button>
          <button style={{ fontSize: 14, color: "#fff", background: "transparent", border: "1px solid #2a2a2a", padding: "12px 28px", fontWeight: 500, cursor: "pointer", borderRadius: 4 }}>View demo →</button>
        </div>

        {/* Cards */}
        <div style={{ marginTop: 72, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {[
            { label: "Sources connected", value: "20+", sub: "App Store, Zendesk, Reddit..." },
            { label: "Signals today", value: "2,847", sub: "+12% vs yesterday" },
            { label: "Top theme", value: "Onboarding", sub: "Rising — 293 signals" },
          ].map(c => (
            <div key={c.label} style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: 8, padding: "20px 20px" }}>
              <div style={{ fontSize: 11, color: "#444", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>{c.label}</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>{c.value}</div>
              <div style={{ fontSize: 12, color: "#555", marginTop: 4 }}>{c.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Theme 4: Raw Grid / Data Terminal ──────────────────────── */
function ThemeGrid() {
  return (
    <section style={{ background: "#080808", minHeight: "100vh", fontFamily: "'JetBrains Mono', 'Fira Code', monospace", position: "relative" }}>
      {/* Grid lines */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(34,197,94,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />

      {/* Nav */}
      <nav style={{ position: "relative", borderBottom: "1px solid rgba(34,197,94,0.15)", padding: "0 48px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#22c55e", fontSize: 12 }}>▸</span>
          <span style={{ fontSize: 13, color: "#22c55e", letterSpacing: "0.05em" }}>lumerial.io</span>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {["features", "pricing", "docs"].map(l => (
            <span key={l} style={{ fontSize: 11, color: "rgba(34,197,94,0.4)" }}>{l}</span>
          ))}
        </div>
        <button style={{ fontSize: 11, color: "#080808", background: "#22c55e", border: "none", padding: "6px 16px", cursor: "pointer", fontFamily: "monospace", letterSpacing: "0.05em" }}>access_</button>
      </nav>

      {/* Hero */}
      <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", padding: "80px 48px 60px" }}>
        <div style={{ fontSize: 10, color: "rgba(34,197,94,0.4)", letterSpacing: "0.2em", marginBottom: 32 }}>
          $ lumerial --mode=intelligence --sources=all
        </div>
        <h1 style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 700, color: "#f0fdf4", lineHeight: 1.05, letterSpacing: "-0.02em", margin: "0 0 24px" }}>
          Signal.<br />
          <span style={{ color: "#22c55e" }}>Synthesized.</span>
        </h1>
        <p style={{ fontSize: 15, color: "rgba(240,253,244,0.4)", lineHeight: 1.8, maxWidth: 480, marginBottom: 40, fontFamily: "'Inter', system-ui" }}>
          Ingest reviews, tickets, threads. Cluster into themes. Get engineering-level fix suggestions. Ship what matters.
        </p>
        <div style={{ display: "flex", gap: 0 }}>
          <button style={{ fontSize: 12, color: "#080808", background: "#22c55e", border: "none", padding: "12px 24px", cursor: "pointer", fontFamily: "monospace" }}>./request-access</button>
          <button style={{ fontSize: 12, color: "#22c55e", background: "transparent", border: "1px solid rgba(34,197,94,0.25)", borderLeft: "none", padding: "11px 24px", cursor: "pointer", fontFamily: "monospace" }}>./demo</button>
        </div>

        {/* Signal feed mock */}
        <div style={{ marginTop: 64, border: "1px solid rgba(34,197,94,0.15)" }}>
          <div style={{ padding: "8px 16px", borderBottom: "1px solid rgba(34,197,94,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 10, color: "rgba(34,197,94,0.6)", letterSpacing: "0.15em" }}>LIVE SIGNAL FEED</span>
            <span style={{ fontSize: 10, color: "rgba(34,197,94,0.3)" }}>● STREAMING</span>
          </div>
          {[
            { ts: "14:32:01", src: "AppStore", theme: "checkout", msg: "payment flow broken on iOS 17.4 — spinning forever" },
            { ts: "14:31:44", src: "Zendesk", theme: "export", msg: "user cannot export data as CSV — critical for compliance" },
            { ts: "14:31:12", src: "Reddit", theme: "onboarding", msg: "why does step 3 even exist? just let me in already" },
          ].map(row => (
            <div key={row.ts} style={{ padding: "10px 16px", borderBottom: "1px solid rgba(34,197,94,0.06)", display: "grid", gridTemplateColumns: "80px 90px 100px 1fr", gap: 16, alignItems: "center" }}>
              <span style={{ fontSize: 10, color: "rgba(34,197,94,0.3)", fontFamily: "monospace" }}>{row.ts}</span>
              <span style={{ fontSize: 10, color: "#22c55e", fontFamily: "monospace" }}>[{row.src}]</span>
              <span style={{ fontSize: 10, color: "rgba(34,197,94,0.5)", fontFamily: "monospace" }}>#{row.theme}</span>
              <span style={{ fontSize: 12, color: "rgba(240,253,244,0.5)", fontFamily: "'Inter', sans-serif" }}>{row.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Preview Page ────────────────────────────────────────────── */
const themes = [
  { id: "amber", label: "01 — Dark Amber / Terminal", component: ThemeAmber },
  { id: "editorial", label: "02 — Off-White Editorial", component: ThemeEditorial },
  { id: "lime", label: "03 — Dark Lime / Sharp", component: ThemeLime },
  { id: "grid", label: "04 — Raw Grid / Data Terminal", component: ThemeGrid },
];

export default function PreviewPage() {
  return (
    <div style={{ background: "#111", minHeight: "100vh" }}>
      {/* Sticky nav */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "#111", borderBottom: "1px solid #222", padding: "12px 32px", display: "flex", gap: 32, alignItems: "center" }}>
        <span style={{ fontSize: 11, color: "#555", fontFamily: "monospace", letterSpacing: "0.1em" }}>LUMERIAL — THEME PREVIEW</span>
        {themes.map(t => (
          <a key={t.id} href={`#${t.id}`} style={{ fontSize: 11, color: "#666", fontFamily: "monospace", textDecoration: "none" }}>{t.id}</a>
        ))}
      </div>

      {/* Themes */}
      {themes.map(({ id, label, component: Component }) => (
        <div key={id} id={id}>
          <div style={{ background: "#191919", padding: "10px 32px", borderBottom: "1px solid #222" }}>
            <span style={{ fontSize: 11, color: "#444", fontFamily: "monospace", letterSpacing: "0.12em" }}>{label}</span>
          </div>
          <Component />
        </div>
      ))}
    </div>
  );
}
