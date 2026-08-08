'use client';

import { ArrowUpIcon } from '@/components/ui/icons';
import { useHasScrolledPast } from '@/hooks/useHasScrolledPast';

const SCROLL_THRESHOLD_IN_PIXELS = 700;

export function BackToTopButton() {
  const isVisible = useHasScrolledPast(SCROLL_THRESHOLD_IN_PIXELS);

  return (
    <button
      type="button"
      className={`to-top${isVisible ? ' show' : ''}`}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowUpIcon />
    </button>
  );
}
