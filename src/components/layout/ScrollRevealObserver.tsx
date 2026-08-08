'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { REVEAL_CLASS_NAME } from '@/lib/reveal';

const REVEALED_CLASS_NAME = 'in';

/**
 * Fades every `.reveal` element in the first time it scrolls into view.
 *
 * One observer for the whole page keeps the markup free of wrapper elements —
 * important here, because reveal targets include grid and flex children whose
 * layout an extra <div> would break. Mounted once in the root layout and rebuilt
 * on navigation, since each route brings its own set of reveal targets.
 */
export function ScrollRevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const revealTargets = Array.from(
      document.querySelectorAll<HTMLElement>(`.${REVEAL_CLASS_NAME}`),
    );

    if (!('IntersectionObserver' in window)) {
      revealTargets.forEach((target) => target.classList.add(REVEALED_CLASS_NAME));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add(REVEALED_CLASS_NAME);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    revealTargets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
