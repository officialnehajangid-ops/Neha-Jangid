import { SOCIAL_PROFILES } from '@/content/social';
import { EXTERNAL_LINK_PROPS, EXTERNAL_LINKS, SITE } from '@/content/site';

const FOOTER_LINKS = [
  ...SOCIAL_PROFILES.map(({ label, href }) => ({ label, href })),
  { label: 'DevMark Lab', href: EXTERNAL_LINKS.devMarkLab },
];

export function SiteFooter() {
  // Resolved when the page is rendered, which for these static pages means at
  // build time — so a yearly redeploy keeps the notice current.
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <p>
          © {currentYear} {SITE.name} · Co-founder,{' '}
          <a href={EXTERNAL_LINKS.devMarkLab} {...EXTERNAL_LINK_PROPS}>
            DevMark Lab
          </a>
        </p>
        <p className="footer-links">
          {FOOTER_LINKS.map((link) => (
            <a key={link.label} href={link.href} {...EXTERNAL_LINK_PROPS}>
              {link.label}
            </a>
          ))}
        </p>
      </div>
    </footer>
  );
}
