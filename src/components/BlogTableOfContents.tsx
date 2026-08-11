"use client";

import { useEffect, useState } from "react";

type TocItem = { id: string; label: string };

export default function BlogTableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="hidden xl:block fixed" style={{ top: 140, left: 40, width: 200 }}>
      <div className="text-xs font-bold mb-4" style={{ color: "#999", letterSpacing: "0.08em", textTransform: "uppercase" }}>
        On this page
      </div>
      <ul className="flex flex-col gap-3">
        {items.map((item) => {
          const active = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-sm block transition-colors duration-150"
                style={{
                  color: active ? "#0a0a0a" : "#999",
                  fontWeight: active ? 700 : 400,
                  borderLeft: active ? "2px solid #eab308" : "2px solid transparent",
                  paddingLeft: 10,
                }}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
