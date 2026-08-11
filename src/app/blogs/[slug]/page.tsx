import type { Metadata } from "next";
import type { ComponentType } from "react";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts, getBlogPost } from "@/lib/blog-posts";
import BlogPostUsersAlreadyToldYou from "@/components/BlogPostUsersAlreadyToldYou";

const postComponents: Record<string, ComponentType> = {
  "your-users-already-told-you-whats-broken": BlogPostUsersAlreadyToldYou,
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const url = `https://lumerial.io/blogs/${post.slug}`;
  const title = `${post.title} — Lumerial`;

  return {
    title,
    description: post.subtitle,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: post.subtitle,
      url,
      siteName: "Lumerial",
      type: "article",
      images: [
        {
          url: "/lumerial-linkedin.png",
          width: 800,
          height: 800,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.subtitle,
      images: ["/lumerial-linkedin.png"],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const PostComponent = postComponents[slug];

  if (!post || !PostComponent) notFound();

  return (
    <>
      <Navbar />
      <PostComponent />
      <Footer />
    </>
  );
}
