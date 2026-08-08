import { ArrowRightIcon } from '@/components/ui/icons';
import { SOCIAL_PROFILES } from '@/content/social';
import { EXTERNAL_LINK_PROPS, EXTERNAL_LINKS, HOME_SECTION_IDS } from '@/content/site';
import { REVEAL_CLASS_NAME } from '@/lib/reveal';

export function FinalCallToActionSection() {
  return (
    <section className="final">
      <div className="final-glow" aria-hidden="true" />

      <div className={`wrap final-inner ${REVEAL_CLASS_NAME}`}>
        <h2 className="final-title">
          Investing in SEO — but not seeing enough{' '}
          <span className="grad">traffic or signups?</span>
        </h2>
        <p className="final-text">
          More content and disconnected fixes won’t solve the problem. You need someone to
          understand your product, identify what’s blocking growth, and lead the right work from
          strategy through execution.
        </p>

        <div className="final-actions">
          <a
            href={EXTERNAL_LINKS.bookACall}
            {...EXTERNAL_LINK_PROPS}
            className="btn btn-accent btn-lg"
          >
            Book your free 30-minute consultation
            <ArrowRightIcon />
          </a>
          <a href={`#${HOME_SECTION_IDS.contactQuestion}`} className="btn btn-ghost btn-lg">
            Tell me what’s not working
            <ArrowRightIcon />
          </a>
        </div>

        <p className="final-kicker">
          Let’s turn organic effort into visibility, ICP traffic, and qualified signups.
        </p>

        <div className="social-row">
          {SOCIAL_PROFILES.map((profile) => (
            <a
              key={profile.label}
              href={profile.href}
              {...EXTERNAL_LINK_PROPS}
              className="social-btn"
              aria-label={profile.label}
            >
              <profile.Icon />
              <span>{profile.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
