"use client";

import { useState, useEffect } from "react";
import { List, X } from "@phosphor-icons/react";
import LogoMark from "./LogoMark";

const NAV_ITEMS = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Blogs", href: "/blogs" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-200 bg-white"
      style={{ borderBottom: scrolled || menuOpen ? "1px solid #e8e8e8" : "1px solid transparent" }}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 no-underline">
          <LogoMark size={24} />
          <span className="text-sm font-bold tracking-tight text-[#0a0a0a]" style={{ letterSpacing: "-0.03em" }}>lumerial</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm transition-colors duration-150"
              style={{ color: "#666" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#0a0a0a")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <a
            href="https://app.lumerial.io/login"
            className="hidden sm:inline text-sm transition-colors duration-150"
            style={{ color: "#666" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#0a0a0a")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
          >
            Log in
          </a>
          <a
            href="#waitlist"
            className="text-sm font-bold px-4 py-2 transition-colors duration-150"
            style={{ background: "#eab308", color: "#0a0a0a", borderRadius: 4 }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#fbbf24")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#eab308")}
          >
            Get access
          </a>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="md:hidden flex items-center justify-center"
            style={{ color: "#0a0a0a", width: 28, height: 28 }}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="md:hidden flex flex-col" style={{ borderTop: "1px solid #e8e8e8", background: "#ffffff" }}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm px-6 py-3"
              style={{ color: "#666", borderBottom: "1px solid #e8e8e8" }}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://app.lumerial.io/login"
            className="sm:hidden text-sm px-6 py-3"
            style={{ color: "#666" }}
            onClick={() => setMenuOpen(false)}
          >
            Log in
          </a>
        </div>
      ) : null}
    </nav>
  );
}
