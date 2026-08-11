import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogsIndex from "@/components/BlogsIndex";

export const metadata: Metadata = {
  title: "Blog — Lumerial",
  description:
    "How we think about turning raw user feedback into engineering-level fixes — and what we learn running Lumerial against real apps.",
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
