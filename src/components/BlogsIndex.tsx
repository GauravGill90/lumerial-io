"use client";

import { blogPosts } from "@/lib/blog-posts";
import BlogCard from "@/components/BlogCard";

export default function BlogsIndex() {
  return (
    <main className="flex-1 pt-14">
      <section className="py-20 px-6" style={{ borderBottom: "1px solid #e8e8e8" }}>
        <div className="max-w-6xl mx-auto">
          <div
            className="text-xs font-semibold mb-4"
            style={{ color: "#eab308", letterSpacing: "0.1em", textTransform: "uppercase" }}
          >
            Blog
          </div>
          <h1
            className="font-bold tracking-tight mb-4 text-[#0a0a0a]"
            style={{ fontSize: "clamp(32px, 4.5vw, 56px)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
          >
            Notes on product signal,
            <br />
            shipped in public.
          </h1>
          <p className="text-lg leading-relaxed max-w-xl" style={{ color: "#555" }}>
            How we think about turning raw user feedback into engineering-level fixes —
            and what we learn running Lumerial against real apps.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
