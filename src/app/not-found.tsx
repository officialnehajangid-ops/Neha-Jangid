import type { Metadata } from 'next';
import Link from 'next/link';

import { ArrowRightIcon } from '@/components/ui/icons';
import { HOME_SECTION_IDS } from '@/content/site';

export const metadata: Metadata = {
  title: 'Page not found | Neha Jangid',
  robots: { index: false, follow: true },
};

/** Reuses the final-CTA layout so a wrong URL still lands somewhere on-brand. */
export default function NotFoundPage() {
  return (
    <main>
      <section className="final">
        <div className="final-glow" aria-hidden="true" />
        <div className="wrap final-inner">
          <p className="cs-label">Error 404</p>
          <h1 className="final-title">
            This page has <span className="grad">moved or never existed</span>
          </h1>
          <p className="final-text">
            The link you followed doesn’t lead anywhere. Head back to the home page, or jump
            straight to the case studies.
          </p>
          <div className="final-actions">
            <Link href="/" className="btn btn-accent btn-lg">
              Back to the home page
              <ArrowRightIcon />
            </Link>
            <Link href={`/#${HOME_SECTION_IDS.work}`} className="btn btn-ghost btn-lg">
              Read the case studies
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
