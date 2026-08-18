import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Lumerial — Signals to Fixes",
  description:
    "Lumerial aggregates app reviews, support tickets, forum threads, and telemetry — then turns them into ranked, engineering-ready fixes.",
  metadataBase: new URL("https://lumerial.io"),
  openGraph: {
    title: "Lumerial — Signals to Fixes",
    description:
      "Aggregate signals from App Store reviews, Zendesk tickets, Reddit, and Sentry into one place. Get ranked engineering fix suggestions, not just summaries.",
    url: "https://lumerial.io",
    siteName: "Lumerial",
    type: "website",
    images: [
      {
        url: "/lumerial-linkedin.png",
        width: 800,
        height: 800,
        alt: "Lumerial — Signals to Fixes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumerial — Signals to Fixes",
    description:
      "Stop guessing. Lumerial turns raw user feedback into ranked engineering fixes your team can act on.",
    images: ["/lumerial-linkedin.png"],
  },
  keywords: [
    "signals to fixes",
    "app review aggregation",
    "user feedback analysis",
    "engineering fix suggestions",
    "product feedback tool",
    "app store review analysis",
    "support ticket triage",
    "user feedback aggregator",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://lumerial.io",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[#0a0a0a]">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
