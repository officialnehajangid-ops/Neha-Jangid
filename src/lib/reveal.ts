import type { CSSProperties } from 'react';

/**
 * Marks an element to be faded in by `ScrollRevealObserver` the first time it
 * scrolls into view. Styling lives in `.reveal` / `.reveal.in`.
 */
export const REVEAL_CLASS_NAME = 'reveal';

/**
 * Staggers a reveal so neighbouring cards cascade instead of appearing at once.
 * Feeds the `--d` custom property that `.reveal` uses as its transition delay.
 */
export function createRevealDelayStyle(delayInSeconds: number): CSSProperties {
  return { '--d': `${delayInSeconds}s` } as CSSProperties;
}
