/**
 * Single source of truth for identity, external links and section anchors.
 * Anything that appears in more than one place on the site lives here.
 */

/** Canonical origin, no trailing slash. Overridable per environment. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nehajangid.com'
).replace(/\/$/, '');

export const SITE = {
  name: 'Neha Jangid',
  jobTitle: 'SaaS SEO & Organic Growth Consultant',
  title: 'Neha Jangid | SaaS SEO & Organic Growth',
  description:
    'I help SaaS companies increase visibility, traffic, and signups. 5+ years of SEO and content experience across 30+ SaaS products. Co-founder of DevMarkLab.',
  socialDescription:
    'Organic growth for SaaS - search, AI visibility, content, video, digital PR and communities, tied to signups and revenue.',
  locale: 'en_US',
  /**
   * Doubles as the Open Graph / Twitter card image.
   *
   * These are the portrait's *declared layout* dimensions, not the source file's
   * intrinsic 1202x1126. The stylesheet sets `width: 100%` but never `height`, so
   * the height attribute is what actually sizes the frame - `object-fit: cover`
   * then crops the photo into it. Changing these numbers changes how tall the
   * hero portrait renders.
   */
  portrait: {
    src: '/images/neha.png',
    alt: 'Neha Jangid',
    width: 600,
    height: 620,
  },
} as const;

/** Public inbox shown in contact surfaces and used as the delivery fallback. */
export const CONTACT_EMAIL = 'hello@nehajangid.com';

export const EXTERNAL_LINKS = {
  bookACall: 'https://cal.com/neha-jangid-fucuhx',
  devMarkLab: 'https://devmarklab.com/',
  linkedIn: 'https://www.linkedin.com/in/neha-jangid123/',
  upwork: 'https://www.upwork.com/freelancers/nehajangid?mp_source=share',
  fiverr: 'https://www.fiverr.com/neha9001/',
} as const;

/** Ids of the home page sections that the nav links to and the scroll spy watches. */
export const HOME_SECTION_IDS = {
  top: 'top',
  services: 'services',
  process: 'process',
  work: 'work',
  voices: 'voices',
  faq: 'faq',
  contact: 'contact',
  contactQuestion: 'contact-question',
} as const;

export const CASE_STUDIES_BASE_PATH = '/case-studies';

/** Attributes every outbound link needs. */
export const EXTERNAL_LINK_PROPS = { target: '_blank', rel: 'noopener' } as const;
