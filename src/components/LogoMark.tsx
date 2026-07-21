const Y = "#eab308";

export default function LogoMark({ dark = false, size = 24 }: { dark?: boolean; size?: number }) {
  const c = dark ? "#ffffff" : "#0a0a0a";
  const s = size / 32;
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* main outlined square — top-left */}
      <rect x="2" y="2" width="17" height="17" rx="2" fill="none" stroke={c} strokeWidth="2.5" />
      {/* yellow filled square — bottom-right */}
      <rect x="13" y="13" width="17" height="17" rx="2" fill={Y} />
      {/* third small square — top-right, yellow outline */}
      <rect x="18" y="2" width="9" height="9" rx="1.5" fill="none" stroke={Y} strokeWidth="1.5" />
    </svg>
  );
}
