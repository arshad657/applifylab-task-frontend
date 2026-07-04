export function BrandLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        role="img"
        aria-label="Buddy Script logo"
      >
        <rect width="32" height="32" rx="9" className="fill-primary" />
        <path
          d="M9 21V11a2 2 0 0 1 2-2h6.5a3.5 3.5 0 0 1 1.94 6.41A3.75 3.75 0 0 1 18.25 22H11a2 2 0 0 1-2-2v-1Z"
          fill="white"
          fillOpacity="0.95"
        />
      </svg>
      <span className="text-lg font-semibold tracking-tight text-foreground">
        Buddy Script
      </span>
    </div>
  );
}
