import { EXTERNAL_LINKS, HOME_SECTION_IDS } from '@/content/site';

export type NavigationLink = {
  readonly label: string;
  /** Id of the home page section this link scrolls to. */
  readonly sectionId: string;
};

export const NAVIGATION_LINKS: readonly NavigationLink[] = [
  { label: 'Services', sectionId: HOME_SECTION_IDS.services },
  { label: 'How We Work', sectionId: HOME_SECTION_IDS.process },
  { label: 'Case Studies', sectionId: HOME_SECTION_IDS.work },
  { label: 'Testimonials', sectionId: HOME_SECTION_IDS.voices },
  { label: 'FAQs', sectionId: HOME_SECTION_IDS.faq },
];

/**
 * Home page anchors are plain hashes so the browser scrolls in place; every other
 * page has to route back to the home page first.
 */
export function buildHomeAnchorHref(sectionId: string, isOnHomePage: boolean): string {
  return isOnHomePage ? `#${sectionId}` : `/#${sectionId}`;
}

export const MOBILE_MENU_CTA = {
  label: 'Book a Free Call →',
  href: EXTERNAL_LINKS.bookACall,
} as const;
