'use client';

import { useEffect, useState } from 'react';

/**
 * Scroll spy for the header. Watches the given section ids and reports whichever
 * one currently sits in the middle band of the viewport, so the matching nav link
 * can be underlined.
 *
 * Returns null when none of the sections exist on the current page — which is the
 * case on every page except the home page.
 */
export function useActiveSectionId(sectionIds: readonly string[]): string | null {
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  // The ids are a module-level constant, so joining them keeps the effect stable
  // without asking every caller to memoise the array.
  const sectionIdsKey = sectionIds.join(',');

  useEffect(() => {
    const sections = sectionIdsKey
      .split(',')
      .map((sectionId) => document.getElementById(sectionId))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      setActiveSectionId(null);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSectionId(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIdsKey]);

  return activeSectionId;
}
