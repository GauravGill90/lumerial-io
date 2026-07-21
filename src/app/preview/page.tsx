"use client";

const font = "'Space Grotesk', system-ui, sans-serif";
const bg = "#ffffff";
const fg = "#0a0a0a";
const muted = "#777";
const border = "#e8e8e8";
const cardBg = "#f7f7f7";

type AccentConfig = {
  name: string;
  slug: string;
  accent: string;
  accentFg: string;
  desc: string;
  vibe: string;
};

const accents: AccentConfig[] = [
  {
    name: "Electric Blue",
    slug: "blue",
    accent: "#2563eb",
    accentFg: "#fff",
    desc: "Precise, confident, technical. Feels like a tool engineers would trust.",
    vibe: "Linear · Stripe · Raycast",
  },
  {
    name: "Warm Coral",
    slug: "coral",
    accent: "#f43f5e",
    accentFg: "#fff",
    desc: "Bold and immediate. Draws the eye without feeling aggressive.",
    vibe: "Notion · Superhuman · Arc",
  },
  {
    name: "Acid Yellow",
    slug: "yellow",
    accent: "#eab308",
    accentFg: "#0a0a0a",
    desc: "Energetic and very distinctive. Nobody else in this space uses yellow.",
    vibe: "Vercel · Figma · Pitch",
  },
  {
    name: "Electric Violet",
    slug: "violet",
    accent: "#7c3aed",
    accentFg: "#fff",
    desc: "Premium, slightly unexpected. Works well with data-heavy interfaces.",
    vibe: "Loom · Framer · Linear (alt)",
  },
];

function AccentPreview({ cfg }: { cfg: AccentConfig }) {
  const { accent, accentFg, name, desc, vibe } = cfg;

  const signalFeed = [
    { src: "App Store", text: "Checkout spinning forever on iOS 17.4", theme: "Checkout" },
    { src: "Sentry", text: "34 unhandled exceptions · ExportManager.swift:214", theme: "Crash" },
    { src: "Reddit", text: "Search results feel really stale lately", theme: "Search" },
  ];

  const features = ["Unified signal ingestion", "Semantic clustering", "Priority scoring", "Engineering suggestions"];

  return (
    <div style={{ background: bg, fontFamily: font }}>
      {/* Label strip */}
      <div style={{ background: fg, padding: "10px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 16, height: 16, borderRadius: 3, background: accent }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>{name}</span>
        </div>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{vibe}</span>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", maxWidth: 280, textAlign: "right" }}>{desc}</span>
      </div>

      {/* Nav */}
      <nav style={{ borderBottom: `1px solid ${border}`, padding: "0 40px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: fg }}>lumerial</span>
        <div style={{ display: "flex", gap: 28 }}>
          {["Features", "How it works"].map(l => (
            <span key={l} style={{ fontSize: 13, color: "#aaa" }}>{l}</span>
          ))}
        </div>
        <button style={{ fontSize: 13, fontWeight: 700, padding: "8px 18px", background: accent, color: accentFg, border: "none", borderRadius: 4, cursor: "pointer" }}>
          Get access
        </button>
      </nav>

      {/* Hero */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "72px 40px 64px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        {/* Left */}
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 32, border: `1px solid ${border}`, padding: "6px 12px", borderRadius: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: accent }} />
            <span style={{ fontSize: 12, color: muted }}>Private beta — join the waitlist</span>
          </div>
          <h1 style={{ fontSize: 64, fontWeight: 700, color: fg, lineHeight: 1.0, letterSpacing: "-0.04em", margin: "0 0 24px" }}>
            All your signals.
            <br />
            <span style={{ color: accent }}>One answer.</span>
          </h1>
          <p style={{ fontSize: 17, color: muted, lineHeight: 1.7, marginBottom: 36, maxWidth: 440 }}>
            Lumerial aggregates app reviews, support tickets, and forum threads — then surfaces what users actually need and what your engineers should fix first.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={{ fontSize: 14, fontWeight: 700, padding: "12px 24px", background: accent, color: accentFg, border: "none", borderRadius: 4, cursor: "pointer" }}>
              Request access →
            </button>
            <button style={{ fontSize: 14, fontWeight: 500, padding: "11px 24px", background: "transparent", color: muted, border: `1px solid ${border}`, borderRadius: 4, cursor: "pointer" }}>
              How it works
            </button>
          </div>
        </div>

        {/* Right: dashboard mockup */}
        <div style={{ borderRadius: 10, overflow: "hidden", background: "#0d0d14", boxShadow: "0 24px 56px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.06)" }}>
          {/* Chrome */}
          <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
            <span style={{ marginLeft: 10, fontSize: 11, color: "rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.05)", padding: "2px 10px", borderRadius: 4 }}>app.lumerial.io / signals</span>
          </div>
          {/* Body */}
          <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[
                { label: "Signals today", value: "2,847", delta: "+12%", c: accent },
                { label: "Sentiment", value: "73 / 100", delta: "+4 pts", c: accent },
                { label: "Top theme", value: "Onboarding", delta: "↑ rising", c: "#888" },
                { label: "Critical", value: "3", delta: "−2 resolved", c: "#f43f5e" },
              ].map(s => (
                <div key={s.label} style={{ padding: "10px 12px", borderRadius: 6, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: s.c, marginTop: 2 }}>{s.delta}</div>
                </div>
              ))}
            </div>
            {/* Feed */}
            <div style={{ borderRadius: 6, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ padding: "6px 12px", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em" }}>SIGNALS</div>
              {signalFeed.map(row => (
                <div key={row.text} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 6px", borderRadius: 3, background: `${accent}18`, color: accent, whiteSpace: "nowrap" }}>{row.src}</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.text}</span>
                  <span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 3, background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)", whiteSpace: "nowrap" }}>{row.theme}</span>
                </div>
              ))}
            </div>
            {/* Bar */}
            <div style={{ padding: "10px 12px", borderRadius: 6, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em" }}>SENTIMENT · 30 DAYS</span>
                <span style={{ fontSize: 10, fontWeight: 600, color: accent }}>73 / 100</span>
              </div>
              <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.07)" }}>
                <div style={{ width: "73%", height: "100%", borderRadius: 2, background: accent }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features strip */}
      <div style={{ maxWidth: 1100, margin: "0 auto 64px", padding: "0 40px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: `1px solid ${border}` }}>
        {features.map((f, i) => (
          <div key={f} style={{ padding: "24px 24px 24px 0", borderRight: i < 3 ? `1px solid ${border}` : "none", paddingLeft: i > 0 ? 24 : 0 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: accent, marginBottom: 6, letterSpacing: "-0.01em" }}>—</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: fg }}>{f}</div>
          </div>
        ))}
      </div>

      {/* CTA block */}
      <div style={{ maxWidth: 1100, margin: "0 auto 64px", padding: "0 40px" }}>
        <div style={{ background: fg, borderRadius: 6, padding: "48px 48px" }}>
          <h2 style={{ fontSize: 40, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.05, margin: "0 0 16px" }}>Stop guessing.<br /><span style={{ color: accent }}>Start knowing.</span></h2>
          <p style={{ fontSize: 15, color: "#666", marginBottom: 28 }}>Private beta. Drop your email and we&apos;ll reach out when your spot is ready.</p>
          <div style={{ display: "flex", gap: 8 }}>
            <input placeholder="you@company.com" style={{ fontSize: 14, padding: "11px 16px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", borderRadius: 4, width: 260, outline: "none" }} />
            <button style={{ fontSize: 14, fontWeight: 700, padding: "11px 22px", background: accent, color: accentFg, border: "none", borderRadius: 4, cursor: "pointer" }}>Join waitlist</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <div style={{ background: "#111" }}>
      {/* Sticky nav */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "#111", borderBottom: "1px solid #222", padding: "12px 32px", display: "flex", gap: 24, alignItems: "center" }}>
        <span style={{ fontSize: 11, color: "#555", fontFamily: "monospace", letterSpacing: "0.1em" }}>LUMERIAL — ACCENT PREVIEW</span>
        {accents.map(a => (
          <a key={a.slug} href={`#${a.slug}`} style={{ fontSize: 11, color: "#555", fontFamily: "monospace", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: a.accent, display: "inline-block" }} />
            {a.name}
          </a>
        ))}
      </div>

      {accents.map(cfg => (
        <div key={cfg.slug} id={cfg.slug} style={{ borderTop: "4px solid #222" }}>
          <AccentPreview cfg={cfg} />
        </div>
      ))}
    </div>
  );
}
