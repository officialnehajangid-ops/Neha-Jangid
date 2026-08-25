import type { ReactNode } from 'react';

export type IconProps = {
  /** Rendered width and height in pixels. */
  size?: number;
  className?: string;
};

type StrokeIconProps = IconProps & {
  strokeWidth?: number;
  children: ReactNode;
};

/**
 * Shared frame for the outline icons: a 24x24 viewBox stroked in the current
 * text colour, so every icon inherits the active accent wherever it is placed.
 */
function StrokeIcon({ size, className, strokeWidth = 2, children }: StrokeIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

/* ---------- Directional ---------- */

export function ArrowRightIcon({ size = 16, className }: IconProps) {
  return (
    <StrokeIcon size={size} className={className}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </StrokeIcon>
  );
}

export function ArrowLeftIcon({ size = 15, className }: IconProps) {
  return (
    <StrokeIcon size={size} className={className}>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </StrokeIcon>
  );
}

export function ArrowUpIcon({ size = 18, className }: IconProps) {
  return (
    <StrokeIcon size={size} className={className}>
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </StrokeIcon>
  );
}

export function ArrowUpRightIcon({ size = 16, className }: IconProps) {
  return (
    <StrokeIcon size={size} className={className}>
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </StrokeIcon>
  );
}

/* ---------- Header controls ---------- */

export function PaletteIcon({ size = 18, className }: IconProps) {
  return (
    <StrokeIcon size={size} className={className} strokeWidth={1.8}>
      <path d="M12 3a9 9 0 1 0 0 18c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.4-1a1.5 1.5 0 0 1 1.07-2.56H16a5 5 0 0 0 5-5c0-4.42-4.03-8-9-8z" />
      <circle cx="7.5" cy="11.5" r="1" />
      <circle cx="10.5" cy="7.5" r="1" />
      <circle cx="15" cy="9" r="1" />
    </StrokeIcon>
  );
}

export function SunIcon({ size = 18, className }: IconProps) {
  return (
    <StrokeIcon size={size} className={className} strokeWidth={1.8}>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
    </StrokeIcon>
  );
}

export function MoonIcon({ size = 18, className }: IconProps) {
  return (
    <StrokeIcon size={size} className={className} strokeWidth={1.8}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </StrokeIcon>
  );
}

export function MailIcon({ size = 18, className }: IconProps) {
  return (
    <StrokeIcon size={size} className={className} strokeWidth={1.8}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3.5 6 8.5 6.5L20.5 6" />
    </StrokeIcon>
  );
}

export function CloseIcon({ size = 18, className }: IconProps) {
  return (
    <StrokeIcon size={size} className={className} strokeWidth={1.8}>
      <path d="M5 5l14 14M19 5 5 19" />
    </StrokeIcon>
  );
}

/* ---------- Service pillars ---------- */

export function SearchInsightIcon({ size = 22, className }: IconProps) {
  return (
    <StrokeIcon size={size} className={className} strokeWidth={1.8}>
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" y1="16.5" x2="21" y2="21" />
      <path d="M11 8v6M8 11h6" />
    </StrokeIcon>
  );
}

export function StarIcon({ size = 22, className }: IconProps) {
  return (
    <StrokeIcon size={size} className={className} strokeWidth={1.8}>
      <path d="M12 2.5 14.9 8.4l6.6.95-4.75 4.63 1.12 6.52L12 17.4l-5.87 3.1 1.12-6.52L2.5 9.35l6.6-.95z" />
    </StrokeIcon>
  );
}

export function GlobeIcon({ size = 22, className }: IconProps) {
  return (
    <StrokeIcon size={size} className={className} strokeWidth={1.8}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M2.5 12h19" />
      <path d="M12 2.5a15 15 0 0 1 0 19a15 15 0 0 1 0-19z" />
    </StrokeIcon>
  );
}

/** Rising trend line, used by the services summary banner and the process rail. */
export function TrendUpIcon({ size = 20, className }: IconProps) {
  return (
    <StrokeIcon size={size} className={className} strokeWidth={1.8}>
      <polyline points="3 16.5 9 10.5 13 14.5 21 6.5" />
      <polyline points="15 6.5 21 6.5 21 12.5" />
    </StrokeIcon>
  );
}

/* ---------- Contact options ---------- */

export function CalendarCheckIcon({ size = 22, className }: IconProps) {
  return (
    <StrokeIcon size={size} className={className} strokeWidth={1.8}>
      <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
      <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
      <path d="M9 14.5l2 2 4-4" />
    </StrokeIcon>
  );
}

export function BriefcaseIcon({ size = 22, className }: IconProps) {
  return (
    <StrokeIcon size={size} className={className} strokeWidth={1.8}>
      <rect x="2.5" y="7" width="19" height="13.5" rx="2.5" />
      <path d="M8.5 7V5.5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2V7" />
      <path d="M2.5 12.5h19" />
    </StrokeIcon>
  );
}

export function ChatQuestionIcon({ size = 22, className }: IconProps) {
  return (
    <StrokeIcon size={size} className={className} strokeWidth={1.8}>
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4L3 21l1.1-4.6A8.4 8.4 0 1 1 21 11.5z" />
      <path d="M9.6 9.3a2.4 2.4 0 0 1 4.7.7c0 1.6-2.3 2-2.3 2" />
      <path d="M12 15.6h.01" />
    </StrokeIcon>
  );
}

/* ---------- Process rail ---------- */

export function RefreshLoopIcon({ size = 18, className }: IconProps) {
  return (
    <StrokeIcon size={size} className={className}>
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </StrokeIcon>
  );
}

/* ---------- Testimonials ---------- */

export function PlayIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

/** Deliberately mitred rather than rounded, matching the original artwork. */
export function QuoteMarkIcon({ size = 34, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className={className}
    >
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.76-2.02-2-2H4c-1.25 0-2 .75-2 1.97V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .01-1 1.03V21c0 1 0 1 1 1z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.76-2.02-2-2h-4c-1.25 0-2 .75-2 1.97V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
  );
}

/* ---------- Social platforms ---------- */

export function LinkedInIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#0A66C2"
        d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.91 39.91 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186zM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009s9.851-22.014 22.008-22.016c12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97zM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"
      />
    </svg>
  );
}

export function UpworkIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#6FDA44"
        d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"
      />
    </svg>
  );
}

export function FiverrIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 8 5.75 7.75"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#1DBF73"
        d="M.908 15.44H2.51v-3.558h1.524v3.558h1.591v-4.874H2.51v-.302c0-.332.235-.536.606-.536h.918V8.412H2.85c-1.162 0-1.943.712-1.943 1.755v.4H0v1.316h.908v3.558z"
      />
    </svg>
  );
}
