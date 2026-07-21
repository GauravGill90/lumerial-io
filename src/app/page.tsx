import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EngineeringSignals from "@/components/EngineeringSignals";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://lumerial.io/#app",
      "name": "Lumerial",
      "url": "https://lumerial.io",
      "description":
        "Lumerial is a product signal intelligence platform that aggregates app reviews, support tickets, forum threads, and error telemetry into ranked engineering fix suggestions.",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "description": "Currently in private beta — join the waitlist for early access.",
      },
      "featureList": [
        "Unified signal ingestion from 20+ sources",
        "Semantic theme clustering",
        "Sentiment trend tracking",
        "Priority scoring by volume, severity, and customer tier",
        "Engineering fix suggestions with code-level detail",
        "Role-based views for PMs, engineers, and support",
      ],
    },
    {
      "@type": "Organization",
      "@id": "https://lumerial.io/#org",
      "name": "Lumerial",
      "url": "https://lumerial.io",
      "logo": "https://lumerial.io/lumerial-linkedin.png",
      "sameAs": [],
    },
    {
      "@type": "WebSite",
      "@id": "https://lumerial.io/#website",
      "url": "https://lumerial.io",
      "name": "Lumerial",
      "publisher": { "@id": "https://lumerial.io/#org" },
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Lumerial?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Lumerial is a product signal intelligence platform. It aggregates user feedback from App Store reviews, Google Play, Zendesk, Intercom, Reddit, Sentry, and 20+ other sources, then uses semantic analysis to surface ranked engineering fix suggestions — not just summaries.",
          },
        },
        {
          "@type": "Question",
          "name": "How does Lumerial surface engineering fix suggestions?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Lumerial ingests review text, support tickets, and forum threads — and optionally Sentry errors and Datadog traces. It runs structured signal extraction to identify themes, ranks them by volume, recency, and customer tier, then maps each theme to a likely engineering area. When telemetry is connected, it can pinpoint specific files and stack frames.",
          },
        },
        {
          "@type": "Question",
          "name": "What sources does Lumerial integrate with?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Lumerial integrates with App Store Connect, Google Play, G2, Trustpilot, Zendesk, Intercom, Reddit, Discord, Sentry, Datadog, Crashlytics, New Relic, and more — over 20 sources in total. Setup takes under 5 minutes with OAuth, no engineering required.",
          },
        },
        {
          "@type": "Question",
          "name": "How is Lumerial different from Enterpret or other feedback tools?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Most feedback tools stop at summarizing what users say. Lumerial goes further — it generates concrete engineering signals with suggested fix areas, effort estimates, and when telemetry is connected, specific code locations. It's built for engineering teams, not just product managers.",
          },
        },
        {
          "@type": "Question",
          "name": "Is Lumerial available now?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Lumerial is currently in private beta. You can join the waitlist at lumerial.io and the team will reach out when your spot is ready.",
          },
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <EngineeringSignals />
        <Features />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
