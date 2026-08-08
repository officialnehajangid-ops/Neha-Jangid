'use client';

import { MoonIcon, SunIcon } from '@/components/ui/icons';

type ColorThemeToggleProps = {
  onToggle: () => void;
};

/**
 * Both icons are always rendered; the stylesheet reveals the right one for the
 * active `data-theme`, which keeps the button correct even before hydration.
 */
export function ColorThemeToggle({ onToggle }: ColorThemeToggleProps) {
  return (
    <button
      type="button"
      className="icon-btn"
      aria-label="Toggle colour theme"
      onClick={onToggle}
    >
      <SunIcon className="i-sun" />
      <MoonIcon className="i-moon" />
    </button>
  );
}
