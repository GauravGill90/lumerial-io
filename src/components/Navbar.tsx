"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(8, 8, 16, 0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.07)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              boxShadow: "0 0 16px rgba(99,102,241,0.4)",
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
            className="text-base font-semibold tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            lumerial
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {["Features", "How it works", "Pricing"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm transition-colors duration-200"
              style={{ color: "var(--foreground-muted)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--foreground)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--foreground-muted)")
              }
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden md:block text-sm px-4 py-2 rounded-lg transition-all duration-200"
            style={{ color: "var(--foreground-muted)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--foreground)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--foreground-muted)")
            }
          >
            Sign in
          </a>
          <a
            href="#"
            className="text-sm px-4 py-2 rounded-lg font-medium transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff",
              boxShadow: "0 0 20px rgba(99,102,241,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 30px rgba(99,102,241,0.5)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 20px rgba(99,102,241,0.3)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Get early access
          </a>
        </div>
      </div>
    </nav>
  );
}
