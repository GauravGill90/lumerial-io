"use client";

const Y = "#eab308";
const BK = "#0a0a0a";

function Wordmark({ dark = false, size = 17 }: { dark?: boolean; size?: number }) {
  return (
    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: size, color: dark ? "#fff" : BK, letterSpacing: "-0.03em" }}>
      lumerial
    </span>
  );
}

// Base: outlined square + yellow square overlapping bottom-right
// A: + small dot at overlap corner
function Mark3A({ dark = false, scale = 1 }: { dark?: boolean; scale?: number }) {
  const c = dark ? "#fff" : BK;
  return (
    <svg width={32 * scale} height={32 * scale} viewBox="0 0 32 32" fill="none">
      <rect x="2" y="2" width="17" height="17" rx="2" fill="none" stroke={c} strokeWidth="2.5" />
      <rect x="13" y="13" width="17" height="17" rx="2" fill={Y} />
      {/* dot at the overlap corner */}
      <circle cx="13" cy="13" r="3" fill={c} />
    </svg>
  );
}

// B: + alignment ticks on the outlined square corners (surveying marks)
function Mark3B({ dark = false, scale = 1 }: { dark?: boolean; scale?: number }) {
  const c = dark ? "#fff" : BK;
  const t = 4; // tick length
  return (
    <svg width={32 * scale} height={32 * scale} viewBox="0 0 32 32" fill="none">
      <rect x="2" y="2" width="17" height="17" rx="2" fill="none" stroke={c} strokeWidth="2.5" />
      <rect x="13" y="13" width="17" height="17" rx="2" fill={Y} />
      {/* corner ticks outside the outlined square — top-left, top-right, bottom-left */}
      <line x1="2" y1="2" x2="2" y2={2 - t} stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="2" y1="2" x2={2 - t} y2="2" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="19" y1="2" x2="19" y2={2 - t} stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="19" y1="2" x2={19 + t} y2="2" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="2" y1="19" x2="2" y2={19 + t} stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="2" y1="19" x2={2 - t} y2="19" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// C: + a third small square (creates a staircase / layered depth)
function Mark3C({ dark = false, scale = 1 }: { dark?: boolean; scale?: number }) {
  const c = dark ? "#fff" : BK;
  return (
    <svg width={32 * scale} height={32 * scale} viewBox="0 0 32 32" fill="none">
      <rect x="2" y="2" width="17" height="17" rx="2" fill="none" stroke={c} strokeWidth="2.5" />
      <rect x="13" y="13" width="17" height="17" rx="2" fill={Y} />
      {/* third small square — top-right, outlined in yellow */}
      <rect x="17" y="2" width="9" height="9" rx="1.5" fill="none" stroke={Y} strokeWidth="1.5" />
    </svg>
  );
}

// D: + inner dot inside the yellow square (focal point / signal origin)
function Mark3D({ dark = false, scale = 1 }: { dark?: boolean; scale?: number }) {
  const c = dark ? "#fff" : BK;
  return (
    <svg width={32 * scale} height={32 * scale} viewBox="0 0 32 32" fill="none">
      <rect x="2" y="2" width="17" height="17" rx="2" fill="none" stroke={c} strokeWidth="2.5" />
      <rect x="13" y="13" width="17" height="17" rx="2" fill={Y} />
      {/* inner dot in center of yellow square */}
      <circle cx="21.5" cy="21.5" r="3.5" fill={BK} />
    </svg>
  );
}

type MarkFn = (props: { dark?: boolean; scale?: number }) => React.ReactElement;

const variants: { id: string; name: string; description: string; Mark: MarkFn }[] = [
  {
    id: "A",
    name: "Corner dot",
    description: "A solid dot pins the exact overlap corner — the point where signal meets structure. Feels deliberate.",
    Mark: Mark3A,
  },
  {
    id: "B",
    name: "Alignment ticks",
    description: "Surveying / registration marks on the outlined square's corners. Technical precision, like a crop mark.",
    Mark: Mark3B,
  },
  {
    id: "C",
    name: "Third square",
    description: "A third outlined square echoes the offset — staircase depth, layers of data stacking.",
    Mark: Mark3C,
  },
  {
    id: "D",
    name: "Inner dot",
    description: "A black dot centered in the yellow square — focal point, the signal origin inside the noise.",
    Mark: Mark3D,
  },
];

function Card({ v }: { v: typeof variants[0] }) {
  const { Mark, name, description, id } = v;
  return (
    <div style={{ border: "1px solid #e8e8e8", borderRadius: 4, overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 160, background: "#fafafa", borderBottom: "1px solid #e8e8e8" }}>
        <Mark scale={3.5} />
      </div>
      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", background: "#f7f7f7", borderRadius: 4, marginBottom: 6 }}>
          <Mark scale={0.85} />
          <Wordmark />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", background: BK, borderRadius: 4, marginBottom: 14 }}>
          <Mark scale={0.85} dark />
          <Wordmark dark />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <Mark scale={0.5} />
          <Mark scale={0.75} />
          <Mark />
          <span style={{ fontSize: 10, color: "#ccc" }}>16 / 24 / 32px</span>
        </div>
      </div>
      <div style={{ padding: "0 16px 16px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: BK, marginBottom: 4 }}>{id}. {name}</div>
        <p style={{ fontSize: 12, color: "#666", lineHeight: 1.6, margin: 0 }}>{description}</p>
      </div>
    </div>
  );
}

export default function LogoPreview() {
  return (
    <div style={{ fontFamily: "var(--font-heading)", background: "#fff", minHeight: "100vh", padding: "48px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: Y, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
            Logo concept 3 — variations
          </div>
          <h1 style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.03em", color: BK, margin: "0 0 6px" }}>
            Corner offset + one element
          </h1>
          <p style={{ fontSize: 13, color: "#666", margin: 0 }}>
            Base: outlined square overlapping yellow square. Four additions — pick the one that feels right.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14, marginBottom: 28 }}>
          {variants.map((v) => <Card key={v.id} v={v} />)}
        </div>

        <div style={{ padding: "18px 22px", border: "1px solid #e8e8e8", borderRadius: 4, background: "#fafafa" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#999", letterSpacing: "0.05em", marginBottom: 6 }}>TAKE</div>
          <p style={{ fontSize: 13, color: "#555", lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: BK }}>A (corner dot)</strong> is the cleanest addition — one element, anchors the composition.{" "}
            <strong style={{ color: BK }}>D (inner dot)</strong> adds a clear focal point and reads well at favicon size.{" "}
            B is the most technical-feeling; C works if you want to suggest layered data.
          </p>
        </div>
      </div>
    </div>
  );
}
