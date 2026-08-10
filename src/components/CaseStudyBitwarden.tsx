"use client";

type Finding = {
  theme: string;
  reviews: number;
  rating: number;
  quote: string;
  quoteMeta: string;
  status: "grounded" | "abstained" | "no-evidence";
  confidence?: "low" | "medium";
  files: string[];
  diagnosis: string;
  fix?: string;
};

const findings: Finding[] = [
  {
    theme: "Vault gets stuck on an infinite loading spinner after sync",
    reviews: 14,
    rating: 1.71,
    quote:
      "Since the latest update the app is basically unusable. Half of the time there will be a loading spinner that never goes away and you have to quit and restart the app.",
    quoteMeta: "1★ · Google Play",
    status: "grounded",
    confidence: "medium",
    files: ["VaultSyncManagerImpl.kt", "VaultItemListingViewModel.kt"],
    diagnosis:
      "Every disk-observation flow in VaultSyncManagerImpl (ciphers, folders, collections, sends) ends with the same gate: it.takeUnless { settingsDiskSource.getLastSyncTime(userId) == null } ?: DataState.Loading. So even when the vault is already unlocked and decrypted, the emitted state gets forced back to Loading whenever lastSyncTime is null — and VaultItemListingViewModel.vaultLoadingReceive() maps any Loading state straight to the spinner, with no timeout and no fallback to cached data. Separately, the fullSyncFlow handler clears lastSyncTime to null for non-active users on every push sync. If a subsequent sync stalls, lastSyncTime never gets set again, and the spinner never clears without a forced sync or app restart.",
    fix: "When lastSyncTime is null but decrypted data is already present, emit the loaded data instead of discarding it to Loading.",
  },
  {
    theme: "App doesn't respect configured security settings",
    reviews: 14,
    rating: 2.0,
    quote:
      "It started frequently 'forgetting' some of the settings every day or so — biometric login (requires password again), autofill settings, URL match detections, etc.",
    quoteMeta: "2★ · Google Play",
    status: "grounded",
    confidence: "medium",
    files: ["UserLogoutManagerImpl.kt", "SettingsDiskSourceImpl.kt"],
    diagnosis:
      "UserLogoutManagerImpl.softLogout() — triggered on vault timeout — wipes all of SettingsDiskSource via clearData(), then explicitly restores only four values: vault timeout, vault timeout action, encrypted PIN, and the PIN-protected key envelopes. It does not restore clearClipboardFrequencySeconds, defaultUriMatchType, or the biometric integrity key — all three are cleared and never put back. That's a line-level match for the exact settings users describe losing.",
    fix: "Capture and restore those three values the same way vault timeout is already handled, or move them into the 'intentionally not cleared' allowlist that already exists in SettingsDiskSourceImpl.clearData().",
  },
  {
    theme: "Passkeys fail to save, sync, or complete sign-in",
    reviews: 7,
    rating: 2.0,
    quote:
      "Setting up a passkey seems to work, then it's gone — or sign-in just asks for my fingerprint again and again without ever completing.",
    quoteMeta: "Google Play",
    status: "grounded",
    confidence: "medium",
    files: ["VaultAddEditViewModel.kt"],
    diagnosis:
      "handleCreatePublicKeyCredentialRequest() skips verification entirely when bitwardenCredentialManager.isUserVerified is already true — that flag lives on a shared, injected manager, so it can carry stale state across operations. handleFido2RegisterCredentialResultReceive()'s Success branch resets isUserVerified = false specifically to prevent that staleness (the code comment says so explicitly) — but the Error branch does not reset it. A failed or aborted registration can leave verification state inconsistent for the next attempt, which lines up with the repeated-fingerprint-loop symptom.",
    fix: "Reset bitwardenCredentialManager.isUserVerified = false in the Error branch too, mirroring the Success branch.",
  },
  {
    theme: "Search doesn't cover notes, and a recent update removed autofill search",
    reviews: 6,
    rating: 2.0,
    quote:
      "I can't search my secure notes at all — only titles seem to match. And the search option inside autofill just disappeared after the update.",
    quoteMeta: "Google Play",
    status: "grounded",
    confidence: "medium",
    files: ["SearchTypeDataExtensions.kt", "VaultItemListingViewModel.kt"],
    diagnosis:
      "Two separate issues, and only one is explained by the given code. CipherListView.matchedSearch(searchTerm) checks name, id (for terms over 8 characters), subtitle, and login URIs — there's no check against notes at all, so text typed into a secure note is never matched. The autofill-search-icon half of the complaint is not explained here: shouldShowSearchIcon already returns true when isAutofill, so the entry point still exists in this file — that regression is elsewhere.",
    fix: "Extend matchedSearch to also test note content (caveat: CipherListView may not expose a notes field directly — the SDK type would need checking, or the filter would need to run against the decrypted CipherView instead).",
  },
  {
    theme: "Login fails with 'incorrect password' despite correct credentials",
    reviews: 20,
    rating: 1.55,
    quote:
      "It just logged me out and asked me to login again — and it just won't accept my password. There's no password reset option either.",
    quoteMeta: "1★ · Google Play",
    status: "abstained",
    files: [
      "AuthRepositoryImpl.kt",
      "KdfParamsExtensions.kt",
      "AuthSdkSource.kt",
      "AuthSdkSourceImpl.kt",
    ],
    diagnosis:
      "Traced the full chain: login() → preLogin() → authSdkSource.hashPassword() → loginCommon() → identityService.getToken() → GetTokenResponseJson.Invalid.GenericInvalid → LoginResult.Error. The client-side KDF parameter mapping is correct. The actual password hash computation happens inside AuthClient.hashPassword() — part of Bitwarden's separate, closed SDK (com.bitwarden.sdk), imported here but not defined here. The real cause is either inside that SDK or server-side. Neither is visible from this repository.",
  },
  {
    theme: "Redesigned UI hurt usability",
    reviews: 15,
    rating: 1.53,
    quote: "",
    quoteMeta: "",
    status: "no-evidence",
    files: [],
    diagnosis:
      "No query the pipeline generated for this theme matched anything in the repository. \"The redesign feels worse\" doesn't translate into code-search vocabulary the way a specific bug does — there's no function or file a general UI-usability complaint points to. No suggestion was generated, and none was fabricated to fill the gap.",
  },
];

const statusMeta: Record<Finding["status"], { label: string; bg: string; fg: string; border: string }> = {
  grounded: { label: "Grounded in code", bg: "#0a0a0a", fg: "#eab308", border: "#0a0a0a" },
  abstained: { label: "Insufficient evidence — named why", bg: "transparent", fg: "#777", border: "#d0d0d0" },
  "no-evidence": { label: "No evidence found", bg: "transparent", fg: "#999", border: "#e8e8e8" },
};

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4" style={{ border: "1px solid #e8e8e8", borderRadius: 4 }}>
      <div className="text-xs mb-1.5" style={{ color: "#999" }}>{label}</div>
      <div className="text-2xl font-bold text-[#0a0a0a]" style={{ letterSpacing: "-0.02em" }}>{value}</div>
    </div>
  );
}

export default function CaseStudyBitwarden() {
  return (
    <main className="flex-1 pt-14">
      <section className="py-20 px-6" style={{ borderBottom: "1px solid #e8e8e8" }}>
        <div className="max-w-4xl mx-auto">
          <div
            className="text-xs font-semibold mb-4"
            style={{ color: "#eab308", letterSpacing: "0.1em", textTransform: "uppercase" }}
          >
            Case study — draft
          </div>
          <h1
            className="font-bold tracking-tight mb-6 text-[#0a0a0a]"
            style={{ fontSize: "clamp(32px, 4.5vw, 56px)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
          >
            We pointed Lumerial at a real app&apos;s real reviews.
            <br />
            Here&apos;s what it found — including when it didn&apos;t know.
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "#555" }}>
            We ran the full pipeline against <strong>Bitwarden for Android</strong> — 127 real
            Google Play reviews, clustered into themes, each checked against Bitwarden&apos;s
            actual open-source repository (MIT-licensed). Every finding below was independently
            re-verified, line by line, against the live repo before publishing.
          </p>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard label="Real reviews" value="127" />
            <StatCard label="Themes clustered" value="10" />
            <StatCard label="Code-grounded fixes" value="4" />
            <StatCard label="Honest abstentions" value="2" />
          </div>
        </div>
      </section>

      <section className="py-16 px-6" style={{ borderBottom: "1px solid #e8e8e8", background: "#fafafa" }}>
        <div className="max-w-4xl mx-auto flex items-start gap-3">
          <span className="text-xs font-bold shrink-0 mt-0.5" style={{ color: "#999", letterSpacing: "0.05em" }}>
            SCOPE
          </span>
          <p className="text-sm leading-relaxed" style={{ color: "#666" }}>
            <span style={{ color: "#333" }}>Lumerial reads reviews and reads code — it doesn&apos;t
            write code, open pull requests, or run anything against a connected repository.</span>{" "}
            Every result below is a diagnosis and a proposed change, described in text, grounded in
            files that actually exist. When the given code can&apos;t explain the reported behavior,
            the pipeline is built to say so instead of guessing — two of the six results below are
            exactly that, on purpose.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2
            className="font-bold tracking-tight text-[#0a0a0a] mb-10"
            style={{ fontSize: "clamp(24px, 3vw, 36px)", letterSpacing: "-0.03em" }}
          >
            Six themes, six honest outcomes
          </h2>

          <div className="flex flex-col gap-6">
            {findings.map((f) => {
              const meta = statusMeta[f.status];
              return (
                <div key={f.theme} className="p-6" style={{ border: "1px solid #e8e8e8", borderRadius: 4 }}>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span
                      className="text-xs px-2 py-0.5 font-medium"
                      style={{
                        borderRadius: 4,
                        background: meta.bg,
                        border: `1px solid ${meta.border}`,
                        color: meta.fg,
                      }}
                    >
                      {meta.label}
                    </span>
                    {f.confidence ? (
                      <span className="text-xs" style={{ color: "#999" }}>
                        confidence: {f.confidence}
                      </span>
                    ) : null}
                    <span className="text-xs" style={{ color: "#999" }}>
                      {f.reviews} reviews · avg {f.rating.toFixed(2)}★
                    </span>
                  </div>

                  <h3 className="text-lg font-bold mb-3 text-[#0a0a0a]">{f.theme}</h3>

                  {f.quote ? (
                    <blockquote
                      className="text-sm leading-relaxed mb-4 pl-4"
                      style={{ borderLeft: "2px solid #e8e8e8", color: "#555", fontStyle: "italic" }}
                    >
                      &ldquo;{f.quote}&rdquo;
                      <div className="text-xs mt-1.5 not-italic" style={{ color: "#999" }}>
                        {f.quoteMeta}
                      </div>
                    </blockquote>
                  ) : null}

                  <p className="text-sm leading-relaxed mb-3" style={{ color: "#555" }}>
                    {f.diagnosis}
                  </p>

                  {f.fix ? (
                    <div
                      className="flex items-start gap-3 p-4 mb-3"
                      style={{ background: "#fafafa", border: "1px solid #e8e8e8", borderRadius: 4 }}
                    >
                      <span
                        className="text-xs font-bold mt-0.5 shrink-0"
                        style={{ color: "#999", letterSpacing: "0.05em" }}
                      >
                        FIX
                      </span>
                      <p className="text-sm leading-relaxed" style={{ color: "#555" }}>{f.fix}</p>
                    </div>
                  ) : null}

                  {f.files.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {f.files.map((file) => (
                        <span
                          key={file}
                          className="text-xs px-2 py-0.5 font-mono"
                          style={{ background: "#fafafa", border: "1px solid #e8e8e8", borderRadius: 4, color: "#777" }}
                        >
                          {file}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-6" style={{ borderTop: "1px solid #e8e8e8" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="font-bold tracking-tight text-[#0a0a0a] mb-4"
            style={{ fontSize: "clamp(24px, 3vw, 36px)", letterSpacing: "-0.03em" }}
          >
            Not just &ldquo;users are unhappy.&rdquo; Not a guess either.
          </h2>
          <p className="text-base leading-relaxed max-w-xl mx-auto mb-8" style={{ color: "#555" }}>
            Every claim above traces to an exact file — usually an exact function. When it
            couldn&apos;t trace one, it said so instead of naming a mechanism it couldn&apos;t see.
          </p>
          <a
            href="/#waitlist"
            className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 transition-colors duration-150"
            style={{ background: "#eab308", color: "#0a0a0a", borderRadius: 4 }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#fbbf24")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#eab308")}
          >
            Request access
          </a>
        </div>
      </section>
    </main>
  );
}
