"use client";

import { blogPosts } from "@/lib/blog-posts";
import BlogCard from "@/components/BlogCard";

export default function BlogTeaser() {
  return (
    <section className="py-24 px-6" style={{ borderTop: "1px solid #e8e8e8" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-8 flex-col md:flex-row mb-12">
          <div>
            <div className="text-xs font-semibold mb-4" style={{ color: "#eab308", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              From the blog
            </div>
            <h2 className="font-bold tracking-tight text-[#0a0a0a]" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Notes on product signal.
            </h2>
          </div>
          <a
            href="/blogs"
            className="text-sm font-bold shrink-0 transition-colors duration-150"
            style={{ color: "#0a0a0a" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#eab308")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#0a0a0a")}
          >
            View all posts &rarr;
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
