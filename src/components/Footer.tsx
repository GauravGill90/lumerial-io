"use client";

export default function Footer() {
  return (
    <footer
      className="py-12 px-6"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-10">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="4" cy="7" r="2.5" fill="white" />
                  <circle cx="10" cy="4" r="1.8" fill="rgba(255,255,255,0.6)" />
                  <circle cx="10" cy="10" r="1.8" fill="rgba(255,255,255,0.6)" />
                  <line x1="6.3" y1="6.1" x2="8.5" y2="4.8" stroke="white" strokeWidth="0.8" strokeOpacity="0.5" />
                  <line x1="6.3" y1="7.9" x2="8.5" y2="9.2" stroke="white" strokeWidth="0.8" strokeOpacity="0.5" />
                </svg>
              </div>
              <span
                className="font-semibold"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                lumerial
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
              Product signal intelligence for teams that care about what users actually need.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-12">
            {[
              {
                heading: "Product",
                links: ["Features", "Pricing", "Changelog", "Roadmap"],
              },
              {
                heading: "Company",
                links: ["About", "Blog", "Careers", "Contact"],
              },
              {
                heading: "Legal",
                links: ["Privacy", "Terms", "Security", "GDPR"],
              },
            ].map((col) => (
              <div key={col.heading}>
                <div
                  className="text-xs font-semibold uppercase tracking-wider mb-3"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  {col.heading}
                </div>
                <ul className="flex flex-col gap-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm transition-colors duration-200"
                        style={{ color: "var(--foreground-muted)" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "var(--foreground)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "var(--foreground-muted)")
                        }
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div
          className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
            © 2025 Lumerial, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Twitter", "LinkedIn", "GitHub"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs transition-colors duration-200"
                style={{ color: "var(--foreground-muted)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--foreground)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--foreground-muted)")
                }
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
