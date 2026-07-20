"use client";

export default function Footer() {
  return (
    <footer className="px-6 py-16" style={{ borderTop: "1px solid #1f1f1f" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          <div className="max-w-xs">
            <div className="text-sm font-bold mb-3">lumerial</div>
            <p className="text-sm leading-relaxed" style={{ color: "#555" }}>
              Product signal intelligence for teams that care about what users actually need.
            </p>
          </div>

          <div className="flex flex-wrap gap-12">
            {[
              { heading: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
              { heading: "Company", links: ["About", "Blog", "Careers", "Contact"] },
              { heading: "Legal", links: ["Privacy", "Terms", "Security", "GDPR"] },
            ].map((col) => (
              <div key={col.heading}>
                <div
                  className="text-xs font-bold uppercase mb-4"
                  style={{ color: "#333", letterSpacing: "0.1em" }}
                >
                  {col.heading}
                </div>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm transition-colors duration-150"
                        style={{ color: "#555" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
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
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid #1f1f1f" }}
        >
          <p className="text-xs" style={{ color: "#333" }}>
            © 2026 Lumerial, Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Twitter", "LinkedIn", "GitHub"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-xs transition-colors duration-150"
                style={{ color: "#333" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
