'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { AccentShuffleButton } from '@/components/layout/AccentShuffleButton';
import { ColorThemeToggle } from '@/components/layout/ColorThemeToggle';
import { useActiveSectionId } from '@/hooks/useActiveSectionId';
import { useAppearance } from '@/hooks/useAppearance';
import { useHasScrolledPast } from '@/hooks/useHasScrolledPast';
import {
  buildHomeAnchorHref,
  MOBILE_MENU_CTA,
  NAVIGATION_LINKS,
} from '@/content/navigation';
import { EXTERNAL_LINK_PROPS, EXTERNAL_LINKS, HOME_SECTION_IDS } from '@/content/site';

/** Distance after which the bar gains its blurred background. */
const STICKY_THRESHOLD_IN_PIXELS = 24;

const NAVIGATED_SECTION_IDS = NAVIGATION_LINKS.map((link) => link.sectionId);

export function SiteHeader() {
  const pathname = usePathname();
  const isOnHomePage = pathname === '/';

  const isStuck = useHasScrolledPast(STICKY_THRESHOLD_IN_PIXELS);
  const activeSectionId = useActiveSectionId(NAVIGATED_SECTION_IDS);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleColorTheme, shuffleAccentScheme } = useAppearance();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav className={`nav${isStuck ? ' stuck' : ''}`}>
        <div className="wrap nav-inner">
          <Link
            href={isOnHomePage ? `#${HOME_SECTION_IDS.top}` : '/'}
            className="brand"
            aria-label="Neha Jangid - home"
          >
            NJ<span className="brand-dot">.</span>
          </Link>

          <div className="nav-links">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.sectionId}
                href={buildHomeAnchorHref(link.sectionId, isOnHomePage)}
                className={`nav-link${activeSectionId === link.sectionId ? ' active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="nav-actions">
            <a
              href={EXTERNAL_LINKS.bookACall}
              {...EXTERNAL_LINK_PROPS}
              className="btn btn-sm btn-accent nav-cta"
            >
              Book a Call
            </a>

            <AccentShuffleButton onShuffle={shuffleAccentScheme} />
            <ColorThemeToggle onToggle={toggleColorTheme} />

            <button
              type="button"
              className="icon-btn menu-btn"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu${isMobileMenuOpen ? ' open' : ''}`}>
        {NAVIGATION_LINKS.map((link) => (
          <Link
            key={link.sectionId}
            href={buildHomeAnchorHref(link.sectionId, isOnHomePage)}
            onClick={closeMobileMenu}
          >
            {link.label}
          </Link>
        ))}
        <a
          href={MOBILE_MENU_CTA.href}
          {...EXTERNAL_LINK_PROPS}
          className="mm-cta"
          onClick={closeMobileMenu}
        >
          {MOBILE_MENU_CTA.label}
        </a>
      </div>
    </>
  );
}
