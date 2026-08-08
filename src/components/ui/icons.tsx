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
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95C20.3 8.75 21 11 21 14.1V21h-4v-6.1c0-1.45-.03-3.32-2.05-3.32-2.05 0-2.37 1.58-2.37 3.21V21H9z" />
    </svg>
  );
}

export function UpworkIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.6 6.9c-1.94 0-3.44 1.25-4.06 3.3-.94-1.4-1.66-3.08-2.08-4.5H9.9v5.42c0 1.07-.87 1.95-1.95 1.95a1.95 1.95 0 0 1-1.95-1.95V5.7H3.4v5.42a4.51 4.51 0 0 0 4.55 4.55c2.52 0 4.55-2.05 4.55-4.55v-.9c.4.83.9 1.68 1.5 2.43l-1.28 6.04h2.62l.92-4.37c.81.52 1.74.83 2.77.83a4.63 4.63 0 0 0 4.62-4.65c0-2.58-2.07-4.6-4.62-4.6zm0 6.67c-.78 0-1.52-.33-2.19-.87l.2-.8v-.02c.14-.83.6-2.23 1.99-2.23a2.04 2.04 0 0 1 2.03 2.05c0 1.14-.9 2.07-2.03 2.07z" />
    </svg>
  );
}

export function FiverrIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16.3 8.2v-.6c0-1.1.9-2 2-2h1.4V2.4h-1.7a5 5 0 0 0-5 5v.8H9.6v-.6c0-1.1.9-2 2-2H12V2.4h-.7a5 5 0 0 0-5 5v.8H4.3v3.1h2v10.3h3.3V11.3H13v10.3h3.3V11.3h3.4V8.2z" />
    </svg>
  );
}
