import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Lumerial — Product Signal Intelligence",
  description:
    "Lumerial aggregates app reviews, support tickets, forum threads, and telemetry into a single intelligence layer — then surfaces exactly what users need and what engineers should fix first.",
  metadataBase: new URL("https://lumerial.io"),
  openGraph: {
    title: "Lumerial — Product Signal Intelligence",
    description:
      "Aggregate signals from App Store reviews, Zendesk tickets, Reddit, and Sentry into one unified layer. Get ranked engineering fix suggestions, not just summaries.",
    url: "https://lumerial.io",
    siteName: "Lumerial",
    type: "website",
    images: [
      {
        url: "/lumerial-linkedin.png",
        width: 800,
        height: 800,
        alt: "Lumerial — Product Signal Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumerial — Product Signal Intelligence",
    description:
      "Stop guessing. Lumerial turns raw user feedback into ranked engineering signals your team can act on.",
    images: ["/lumerial-linkedin.png"],
  },
  keywords: [
    "product signal intelligence",
    "app review aggregation",
    "user feedback analysis",
    "engineering fix suggestions",
    "product feedback tool",
    "app store review analysis",
    "support ticket intelligence",
    "product analytics",
    "user feedback aggregator",
    "Enterpret alternative",
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
      </body>
    </html>
  );
}
