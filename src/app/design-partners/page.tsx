import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DesignPartner from "@/components/DesignPartner";

const title = "Design Partner Program — Lumerial";
const description =
  "Lumerial is taking on a small number of design partners — full product access in exchange for real usage and honest feedback, with a straight yes/no on continuing at the end.";
const url = "https://lumerial.io/design-partners";

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

export default function DesignPartnersPage() {
  return (
    <>
      <Navbar />
      <div className="pt-14">
        <DesignPartner />
      </div>
      <Footer />
    </>
  );
}
