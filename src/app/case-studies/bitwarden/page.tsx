import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CaseStudyBitwarden from "@/components/CaseStudyBitwarden";

const title = "Case study: Bitwarden — Lumerial";
const description =
  "We ran Lumerial against 127 real Bitwarden Android reviews and its real open-source repo. Six themes, six honest outcomes — four code-grounded fixes, two honest abstentions.";
const url = "https://lumerial.io/case-studies/bitwarden";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title,
    description,
    url,
    siteName: "Lumerial",
    type: "article",
    images: [{ url: "/lumerial-linkedin.png", width: 800, height: 800, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/lumerial-linkedin.png"],
  },
};

export default function BitwardenCaseStudyPage() {
  return (
    <>
      <Navbar />
      <CaseStudyBitwarden />
      <Footer />
    </>
  );
}
