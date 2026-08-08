import Image from 'next/image';

import { ArrowRightIcon } from '@/components/ui/icons';
import { EXTERNAL_LINK_PROPS, EXTERNAL_LINKS } from '@/content/site';
import { REVEAL_CLASS_NAME } from '@/lib/reveal';

const LOGO = {
  src: '/images/devmarklab-logo.png',
  alt: 'DevMark Lab',
  width: 474,
  height: 116,
} as const;

/** The stylesheet caps the logo at 178px wide. */
const LOGO_SIZES = '178px';

export function DevMarkLabBand() {
  return (
    <section className="band">
      <div className={`wrap band-inner ${REVEAL_CLASS_NAME}`}>
        <a href={EXTERNAL_LINKS.devMarkLab} {...EXTERNAL_LINK_PROPS} className="band-logo">
          <Image
            src={LOGO.src}
            alt={LOGO.alt}
            width={LOGO.width}
            height={LOGO.height}
            sizes={LOGO_SIZES}
          />
        </a>

        <div className="band-copy">
          <p className="eyebrow">Co-founder of DevMark Lab</p>
          <p className="band-text">
            Founder <strong>Divanshu</strong> brings 10+ years of experience, and I bring 6+ years
            of B2B SaaS SEO and organic marketing experience. Together, we lead an{' '}
            <strong>eight-person team</strong> of skilled specialists across SEO, content, and
            organic growth.
          </p>
        </div>

        <a href={EXTERNAL_LINKS.devMarkLab} {...EXTERNAL_LINK_PROPS} className="link-arrow">
          Meet the team at DevMark Lab
          <ArrowRightIcon size={14} />
        </a>
      </div>
    </section>
  );
}
