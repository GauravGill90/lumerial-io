"use client";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-24 px-6 overflow-hidden">
      {/* Ambient blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(139,92,246,0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
          transform: "translate(50%, 50%)",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full glass">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: "#4ade80", boxShadow: "0 0 8px #4ade80" }}
          />
          <span className="text-xs font-medium" style={{ color: "var(--foreground-muted)" }}>
            Now in private beta — join the waitlist
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.05]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <span className="text-gradient">Every signal.</span>
          <br />
          <span className="text-gradient-accent">One truth.</span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: "var(--foreground-muted)" }}
        >
          Lumerial aggregates product signals from App Store reviews, support
          tickets, Reddit threads, and survey data — then surfaces what actually
          matters to your users.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#"
            className="px-8 py-3.5 rounded-xl font-semibold text-base transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff",
              boxShadow:
                "0 0 30px rgba(99,102,241,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 50px rgba(99,102,241,0.5), inset 0 1px 0 rgba(255,255,255,0.15)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 30px rgba(99,102,241,0.35), inset 0 1px 0 rgba(255,255,255,0.15)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Request early access
          </a>
          <a
            href="#how-it-works"
            className="px-8 py-3.5 rounded-xl font-medium text-base glass transition-all duration-200"
            style={{ color: "var(--foreground-muted)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--foreground)";
              e.currentTarget.style.background =
                "rgba(255,255,255,0.07)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--foreground-muted)";
              e.currentTarget.style.background = "";
            }}
          >
            See how it works →
          </a>
        </div>

        {/* Signal sources preview */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
          <span className="text-xs" style={{ color: "var(--foreground-muted)" }}>
            Connects to:
          </span>
          {[
            { name: "App Store", color: "#147efb" },
            { name: "Google Play", color: "#3ddc84" },
            { name: "BigSnag", color: "#f97316" },
            { name: "Zendesk", color: "#87c443" },
            { name: "Intercom", color: "#286ef1" },
            { name: "Reddit", color: "#ff4500" },
            { name: "G2", color: "#e84b3a" },
            { name: "Trustpilot", color: "#00b67a" },
          ].map((src) => (
            <span
              key={src.name}
              className="text-xs px-3 py-1.5 rounded-full glass font-medium"
              style={{ color: "var(--foreground-muted)" }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full mr-1.5"
                style={{ background: src.color, verticalAlign: "middle" }}
              />
              {src.name}
            </span>
          ))}
          <span
            className="text-xs px-3 py-1.5 rounded-full glass font-medium"
            style={{ color: "var(--foreground-muted)" }}
          >
            +12 more
          </span>
        </div>
      </div>

      {/* Dashboard mockup */}
      <div className="relative mt-20 max-w-5xl w-full mx-auto z-10">
        <div
          className="rounded-2xl overflow-hidden glass-strong"
          style={{
            boxShadow:
              "0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(99,102,241,0.1), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          {/* Window chrome */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
            <span
              className="ml-4 text-xs px-3 py-1 rounded-md"
              style={{
                background: "var(--surface)",
                color: "var(--foreground-muted)",
                border: "1px solid var(--border)",
              }}
            >
              app.lumerial.io / signals
            </span>
          </div>

          {/* Dashboard body */}
          <div className="p-6 grid grid-cols-12 gap-4 min-h-[340px]">
            {/* Sidebar */}
            <div className="col-span-2 flex flex-col gap-2">
              {["Overview", "Reviews", "Support", "Forums", "Surveys"].map(
                (item, i) => (
                  <div
                    key={item}
                    className="px-3 py-2 rounded-lg text-xs font-medium transition-colors"
                    style={{
                      background: i === 0 ? "var(--accent-soft)" : "transparent",
                      color:
                        i === 0 ? "#818cf8" : "var(--foreground-muted)",
                      border:
                        i === 0 ? "1px solid rgba(99,102,241,0.2)" : "none",
                    }}
                  >
                    {item}
                  </div>
                )
              )}
            </div>

            {/* Main area */}
            <div className="col-span-10 flex flex-col gap-4">
              {/* Stats row */}
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: "Signals today", value: "2,847", delta: "+12%" },
                  { label: "Sentiment score", value: "73/100", delta: "+4pts" },
                  { label: "Top theme", value: "Onboarding", delta: "↑ rising" },
                  { label: "Critical issues", value: "3", delta: "-2 resolved" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-3 rounded-xl"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div
                      className="text-xs mb-1"
                      style={{ color: "var(--foreground-muted)" }}
                    >
                      {stat.label}
                    </div>
                    <div
                      className="text-lg font-bold"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "#4ade80" }}>
                      {stat.delta}
                    </div>
                  </div>
                ))}
              </div>

              {/* Signal feed */}
              <div
                className="rounded-xl p-3 flex-1"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="text-xs font-semibold mb-3"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  RECENT SIGNALS
                </div>
                <div className="flex flex-col gap-2">
                  {[
                    {
                      src: "App Store",
                      color: "#147efb",
                      sentiment: "negative",
                      text: "Search is really hard to use on the latest update...",
                      theme: "Search UX",
                    },
                    {
                      src: "Zendesk",
                      color: "#87c443",
                      sentiment: "neutral",
                      text: "User can't figure out how to export their data as CSV",
                      theme: "Data Export",
                    },
                    {
                      src: "Reddit",
                      color: "#ff4500",
                      sentiment: "positive",
                      text: "The new dashboard design is incredible. Much better workflow.",
                      theme: "Dashboard",
                    },
                  ].map((signal) => (
                    <div
                      key={signal.text}
                      className="flex items-start gap-3 px-3 py-2 rounded-lg"
                      style={{ background: "rgba(255,255,255,0.02)" }}
                    >
                      <span
                        className="mt-0.5 shrink-0 text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                          background: `${signal.color}15`,
                          color: signal.color,
                          border: `1px solid ${signal.color}30`,
                        }}
                      >
                        {signal.src}
                      </span>
                      <span
                        className="text-xs leading-relaxed flex-1 truncate"
                        style={{ color: "var(--foreground-muted)" }}
                      >
                        {signal.text}
                      </span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full shrink-0"
                        style={{
                          background: "rgba(99,102,241,0.15)",
                          color: "#818cf8",
                        }}
                      >
                        {signal.theme}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--bg-base))",
          }}
        />
      </div>
    </section>
  );
}
