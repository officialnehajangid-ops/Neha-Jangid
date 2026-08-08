import Image from 'next/image';

import { ArrowRightIcon } from '@/components/ui/icons';
import { EXTERNAL_LINK_PROPS, EXTERNAL_LINKS, HOME_SECTION_IDS, SITE } from '@/content/site';
import { createRevealDelayStyle, REVEAL_CLASS_NAME } from '@/lib/reveal';

/** The portrait never renders wider than 400px, so one size hint covers every breakpoint. */
const PORTRAIT_SIZES = '400px';

export function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-glow" aria-hidden="true" />

      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1 className={`hero-title ${REVEAL_CLASS_NAME}`}>
            I’m <span className="grad">Neha Jangid</span>.<br />I help SaaS companies increase
            visibility, traffic, and signups
          </h1>

          <p className={`hero-lede ${REVEAL_CLASS_NAME}`} style={createRevealDelayStyle(0.12)}>
            <b className="lede-num">5+ years</b> of SEO and content experience across{' '}
            <b className="lede-num">30+ SaaS products</b>. I get your product and know the
            strategies that move the needle for sustainable organic growth.
          </p>

          <div
            className={`hero-actions ${REVEAL_CLASS_NAME}`}
            style={createRevealDelayStyle(0.18)}
          >
            <a
              href={EXTERNAL_LINKS.bookACall}
              {...EXTERNAL_LINK_PROPS}
              className="btn btn-accent btn-lg"
            >
              Book a Free 30-Minute Call
              <ArrowRightIcon />
            </a>
            <a href={`#${HOME_SECTION_IDS.contactQuestion}`} className="btn btn-ghost btn-lg">
              Let’s Chat
              <ArrowRightIcon />
            </a>
          </div>
        </div>

        <div
          className={`hero-portrait ${REVEAL_CLASS_NAME}`}
          style={createRevealDelayStyle(0.14)}
        >
          <div className="portrait-frame">
            <Image
              src={SITE.portrait.src}
              alt={SITE.portrait.alt}
              width={SITE.portrait.width}
              height={SITE.portrait.height}
              sizes={PORTRAIT_SIZES}
              priority
            />
            <div className="portrait-shade" aria-hidden="true" />
          </div>

          <div className="portrait-badge glass">
            <span className="dot" />
            <div>
              <p className="pb-title">Co-founder, DevMark Lab</p>
              <p className="pb-sub">B2B SaaS organic growth</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
