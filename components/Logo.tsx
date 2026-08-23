export function Logo({
  className,
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="20"
        cy="20"
        r="19"
        fill={isDark ? "rgba(255,255,255,0.08)" : "var(--color-brand)"}
      />
      <circle
        cx="20"
        cy="20"
        r="16.5"
        fill="none"
        stroke="var(--color-seal)"
        strokeWidth="1"
        strokeDasharray="2.2 2.4"
        opacity="0.85"
      />
      <text
        x="20"
        y="25.5"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="12.5"
        fontWeight="700"
        letterSpacing="0.5"
        fill={isDark ? "var(--color-seal)" : "white"}
      >
        HIA
      </text>
    </svg>
  );
}
