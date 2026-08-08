'use client';

import { useEffect, useState } from 'react';

/**
 * True once the page is scrolled further than `thresholdInPixels`.
 * Drives the sticky nav background and the back-to-top button.
 */
export function useHasScrolledPast(thresholdInPixels: number): boolean {
  const [hasScrolledPast, setHasScrolledPast] = useState(false);

  useEffect(() => {
    const syncFromScrollPosition = () => {
      setHasScrolledPast(window.scrollY > thresholdInPixels);
    };

    syncFromScrollPosition();
    window.addEventListener('scroll', syncFromScrollPosition, { passive: true });
    return () => window.removeEventListener('scroll', syncFromScrollPosition);
  }, [thresholdInPixels]);

  return hasScrolledPast;
}
