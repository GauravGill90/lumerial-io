import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogsIndex from "@/components/BlogsIndex";

const title = "Blog — Lumerial";
const description =
  "How we think about turning raw user feedback into engineering-level fixes — and what we learn running Lumerial against real apps.";
const url = "https://lumerial.io/blogs";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    siteName: "Lumerial",
    type: "website",
    images: [{ url: "/lumerial-linkedin.png", width: 800, height: 800, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/lumerial-linkedin.png"],
  },
};

export default function BlogsPage() {
  return (
    <>
      <Navbar />
      <BlogsIndex />
      <Footer />
    </>
  );
}
