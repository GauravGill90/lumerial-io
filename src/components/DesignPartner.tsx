"use client";

import DesignPartnerForm from "./DesignPartnerForm";

const GIVE = [
  "Full product access for the length of the partnership — no paywall, no seat limits",
  "Direct input into what we build next, straight to the founders, not a support queue",
  "We personally onboard your repo and review sources with you",
];

const ASK = [
  "Real usage against your actual app — not a sandbox or demo account",
  "Honest feedback, including what's broken or missing",
  "A straight yes/no on continuing as a paying customer once the partnership ends",
];

export default function DesignPartner() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-semibold mb-6" style={{ color: "#eab308", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Design partner program
          </div>
          <h1
            className="font-bold tracking-tight mb-6 text-[#0a0a0a]"
            style={{ fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
          >
            Help us build the fix, not just use it.
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#555" }}>
            We&apos;re taking on a small number of design partners — a fixed, time-boxed
            partnership where you get full access in exchange for real usage and honest
            feedback. At the end of it, a straight yes/no on continuing as a customer. No
            surprise billing, no open-ended free tier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div>
            <div className="text-xs font-bold uppercase mb-4" style={{ color: "#999", letterSpacing: "0.1em" }}>
              What you get
            </div>
            <ul className="flex flex-col gap-4">
              {GIVE.map((item) => (
                <li key={item} className="text-sm leading-relaxed flex gap-3" style={{ color: "#333" }}>
                  <span style={{ color: "#eab308" }}>+</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-bold uppercase mb-4" style={{ color: "#999", letterSpacing: "0.1em" }}>
              What we ask
            </div>
            <ul className="flex flex-col gap-4">
              {ASK.map((item) => (
                <li key={item} className="text-sm leading-relaxed flex gap-3" style={{ color: "#333" }}>
                  <span style={{ color: "#999" }}>—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-12 md:p-16" style={{ background: "#0a0a0a", borderRadius: 4 }}>
          <div className="max-w-xl">
            <h2 className="font-bold tracking-tight text-white mb-4" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Apply as a design partner
            </h2>
            <p className="text-base mb-8" style={{ color: "#777", lineHeight: 1.7 }}>
              We read every application ourselves. Tell us about your app and what&apos;s
              actually breaking for your users.
            </p>
            <DesignPartnerForm />
          </div>
        </div>
      </div>
    </section>
  );
}
