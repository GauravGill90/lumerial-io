import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CaseStudyBitwarden from "@/components/CaseStudyBitwarden";

export const metadata: Metadata = {
  title: "Case study: Bitwarden — Lumerial",
  description:
    "We ran Lumerial against 127 real Bitwarden Android reviews and its real open-source repo. Six themes, six honest outcomes — four code-grounded fixes, two honest abstentions.",
  robots: {
    index: false,
    follow: false,
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
