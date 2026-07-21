"use client";

import { useState, useEffect } from "react";
import LogoMark from "./LogoMark";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-200 bg-white"
      style={{ borderBottom: scrolled ? "1px solid #e8e8e8" : "1px solid transparent" }}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 no-underline">
          <LogoMark size={24} />
          <span className="text-sm font-bold tracking-tight text-[#0a0a0a]" style={{ letterSpacing: "-0.03em" }}>lumerial</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {["Features", "How it works"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm transition-colors duration-150"
              style={{ color: "#666" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#0a0a0a")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
            >
              {item}
            </a>
          ))}
        </div>

        <a
          href="#waitlist"
          className="text-sm font-bold px-4 py-2 transition-colors duration-150"
          style={{ background: "#eab308", color: "#0a0a0a", borderRadius: 4 }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#fbbf24")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#eab308")}
        >
          Get access
        </a>
      </div>
    </nav>
  );
}
