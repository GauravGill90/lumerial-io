"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LogoMark from "@/components/LogoMark";

function AccessForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";

  const [password, setPassword] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password) return;
    setState("loading");

    try {
      const res = await fetch("/api/case-study-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push(next);
        router.refresh();
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <LogoMark size={24} />
          <span className="text-sm font-bold tracking-tight text-[#0a0a0a]" style={{ letterSpacing: "-0.03em" }}>
            lumerial
          </span>
        </div>

        <div className="p-8" style={{ border: "1px solid #e8e8e8", borderRadius: 4 }}>
          <div
            className="text-xs font-semibold mb-3"
            style={{ color: "#eab308", letterSpacing: "0.1em", textTransform: "uppercase" }}
          >
            Case study
          </div>
          <h1 className="font-bold tracking-tight text-[#0a0a0a] mb-2" style={{ fontSize: 24, letterSpacing: "-0.02em" }}>
            This page is password protected
          </h1>
          <p className="text-sm mb-6" style={{ color: "#666" }}>
            Enter the password you were given to view this case study.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (state === "error") setState("idle");
              }}
              placeholder="Password"
              autoFocus
              required
              disabled={state === "loading"}
              className="text-sm px-4 py-3 outline-none transition-colors duration-150"
              style={{
                background: "#fff",
                border: `1px solid ${state === "error" ? "#f43f5e" : "#e8e8e8"}`,
                color: "#0a0a0a",
                borderRadius: 4,
              }}
              onFocus={(e) => {
                if (state !== "error") e.target.style.borderColor = "#eab308";
              }}
              onBlur={(e) => {
                if (state !== "error") e.target.style.borderColor = "#e8e8e8";
              }}
            />

            {state === "error" ? (
              <p className="text-xs" style={{ color: "#f43f5e" }}>
                That password isn&apos;t right — try again.
              </p>
            ) : null}

            <button
              type="submit"
              disabled={state === "loading"}
              className="text-sm font-bold px-5 py-3 transition-colors duration-150"
              style={{
                background: "#eab308",
                color: "#0a0a0a",
                border: "none",
                borderRadius: 4,
                cursor: state === "loading" ? "wait" : "pointer",
                opacity: state === "loading" ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                if (state !== "loading") e.currentTarget.style.background = "#fbbf24";
              }}
              onMouseLeave={(e) => {
                if (state !== "loading") e.currentTarget.style.background = "#eab308";
              }}
            >
              {state === "loading" ? "Checking…" : "View case study"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function CaseStudyAccessPage() {
  return (
    <Suspense fallback={null}>
      <AccessForm />
    </Suspense>
  );
}
