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
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-200"
      style={{
        background: scrolled ? "#0c0c0c" : "transparent",
        borderBottom: scrolled ? "1px solid #1f1f1f" : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="text-sm font-bold tracking-tight text-white">lumerial</span>

        <div className="hidden md:flex items-center gap-8">
          {["Features", "How it works", "Pricing"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm transition-colors duration-150"
              style={{ color: "#555" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden md:block text-sm transition-colors duration-150"
            style={{ color: "#555" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
          >
            Sign in
          </a>
          <a
            href="#"
            className="text-sm font-bold px-4 py-2 transition-colors duration-150"
            style={{
              background: "#a3e635",
              color: "#0c0c0c",
              borderRadius: 4,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#bef264")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#a3e635")}
          >
            Get access
          </a>
        </div>
      </div>
    </nav>
  );
}
