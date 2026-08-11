"use client";

import { useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import type { BlogPostMeta } from "@/lib/blog-posts";

export default function BlogCard({ post, index = 0 }: { post: BlogPostMeta; index?: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`/blogs/${post.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="block p-7 no-underline animate-fade-in-up"
      style={{
        border: `1px solid ${hovered ? "#0a0a0a" : "#e8e8e8"}`,
        borderRadius: 4,
        background: "#fff",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 24px -12px rgba(10,10,10,0.18)" : "none",
        transition: "transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease",
        animationDelay: `${index * 80}ms`,
      }}
    >
      <div className="flex items-center justify-between mb-5">
        <span
          className="text-xs font-semibold px-2 py-1"
          style={{ color: "#eab308", border: "1px solid #eab308", borderRadius: 4, letterSpacing: "0.05em", textTransform: "uppercase" }}
        >
          {post.category}
        </span>
        <span className="text-xs" style={{ color: "#999" }}>{post.readingTime}</span>
      </div>

      <h3 className="text-xl font-bold mb-2.5 text-[#0a0a0a]" style={{ letterSpacing: "-0.01em", lineHeight: 1.25 }}>
        {post.title}
      </h3>
      <p className="text-sm leading-relaxed mb-6" style={{ color: "#666" }}>
        {post.subtitle}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs" style={{ color: "#999" }}>{post.displayDate}</span>
        <span
          className="inline-flex items-center gap-1.5 text-sm font-bold"
          style={{ color: "#0a0a0a" }}
        >
          Read
          <ArrowRight
            size={14}
            weight="bold"
            style={{ transform: hovered ? "translateX(4px)" : "translateX(0)", transition: "transform 200ms ease" }}
          />
        </span>
      </div>
    </a>
  );
}
