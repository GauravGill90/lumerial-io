"use client";

import { useState } from "react";

export default function DesignPartnerForm() {
  const [values, setValues] = useState({ name: "", email: "", company: "", message: "" });
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  function update(field: keyof typeof values) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.name || !values.email || !values.company) return;
    setState("loading");
    try {
      const res = await fetch("/api/design-partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="inline-flex items-center gap-2 text-sm font-medium px-5 py-3" style={{ border: "1px solid #eab308", color: "#eab308", borderRadius: 4 }}>
        <span style={{ fontWeight: 900 }}>+</span> Application received — we&apos;ll be in touch directly.
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    background: "#1a1a1a",
    border: "1px solid #2a2a2a",
    color: "#fff",
    borderRadius: 4,
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
      <input
        type="text"
        value={values.name}
        onChange={update("name")}
        placeholder="Your name"
        required
        disabled={state === "loading"}
        className="text-sm px-4 py-3 outline-none transition-colors duration-150"
        style={inputStyle}
        onFocus={(e) => (e.target.style.borderColor = "#eab308")}
        onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
      />
      <input
        type="email"
        value={values.email}
        onChange={update("email")}
        placeholder="you@company.com"
        required
        disabled={state === "loading"}
        className="text-sm px-4 py-3 outline-none transition-colors duration-150"
        style={inputStyle}
        onFocus={(e) => (e.target.style.borderColor = "#eab308")}
        onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
      />
      <input
        type="text"
        value={values.company}
        onChange={update("company")}
        placeholder="Company"
        required
        disabled={state === "loading"}
        className="text-sm px-4 py-3 outline-none transition-colors duration-150"
        style={inputStyle}
        onFocus={(e) => (e.target.style.borderColor = "#eab308")}
        onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
      />
      <textarea
        value={values.message}
        onChange={update("message")}
        placeholder="What's the biggest thing users complain about right now? (optional)"
        rows={3}
        disabled={state === "loading"}
        className="text-sm px-4 py-3 outline-none transition-colors duration-150 resize-none"
        style={inputStyle}
        onFocus={(e) => (e.target.style.borderColor = "#eab308")}
        onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="text-sm font-bold px-5 py-3 transition-colors duration-150 whitespace-nowrap"
        style={{ background: "#eab308", color: "#0a0a0a", border: "none", borderRadius: 4, cursor: state === "loading" ? "wait" : "pointer", opacity: state === "loading" ? 0.7 : 1 }}
        onMouseEnter={(e) => { if (state !== "loading") e.currentTarget.style.background = "#fbbf24"; }}
        onMouseLeave={(e) => { if (state !== "loading") e.currentTarget.style.background = "#eab308"; }}
      >
        {state === "loading" ? "Submitting…" : "Apply as a design partner"}
      </button>
      {state === "error" && (
        <p className="text-xs" style={{ color: "#f43f5e" }}>Something went wrong — try again.</p>
      )}
    </form>
  );
}
