import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { CaseStudyEmailCta } from '@/components/case-studies/CaseStudyEmailCta';
import { JsonLdScript } from '@/components/seo/JsonLdScript';
import { MetricValue } from '@/components/ui/MetricValue';
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/ui/icons';
import {
  buildCaseStudyPath,
  CASE_STUDIES,
  findAdjacentCaseStudy,
  findCaseStudyBySlug,
  flattenAccentedHeading,
  type CaseStudy,
} from '@/content/case-studies';
import { HOME_SECTION_IDS, SITE } from '@/content/site';
import { createRevealDelayStyle, REVEAL_CLASS_NAME } from '@/lib/reveal';
import { buildBreadcrumbSchema, buildCaseStudyArticleSchema } from '@/lib/structured-data';

/** The screenshot spans the full content column, capped by `.wrap` at 1132px. */
const SCREENSHOT_SIZES = '(max-width: 1180px) 100vw, 1132px';

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return CASE_STUDIES.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = findCaseStudyBySlug(slug);
  if (!caseStudy) return {};

  const path = buildCaseStudyPath(caseStudy.slug);
  const socialImage = caseStudy.searchConsole.image;

  return {
    title: caseStudy.metadata.title,
    description: caseStudy.metadata.description,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      title: caseStudy.metadata.socialTitle,
      description: caseStudy.metadata.socialDescription,
      url: path,
      images: [{ url: socialImage.src, alt: socialImage.alt }],
    },
    twitter: {
      title: caseStudy.metadata.socialTitle,
      description: caseStudy.metadata.socialDescription,
      images: [socialImage.src],
    },
  };
}

function CaseStudyBody({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <div className="cs-col">
      {caseStudy.sections.map((section) => (
        <section key={section.heading} className={`cs-block ${REVEAL_CLASS_NAME}`}>
          <h2>{section.heading}</h2>

          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          {section.bullets && (
            <ul className="cs-list">
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          )}

          {section.closingParagraph && (
            <p style={{ marginTop: 20 }}>{section.closingParagraph}</p>
          )}
        </section>
      ))}
    </div>
  );
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = findCaseStudyBySlug(slug);
  if (!caseStudy) notFound();

  const adjacentCaseStudy = findAdjacentCaseStudy(caseStudy.slug);
  const screenshot = caseStudy.searchConsole.image;

  return (
    <main>
      <JsonLdScript
        schemas={[
          buildCaseStudyArticleSchema(caseStudy),
          buildBreadcrumbSchema([
            { name: SITE.name, path: '/' },
            { name: flattenAccentedHeading(caseStudy.title), path: buildCaseStudyPath(slug) },
          ]),
        ]}
      />

      <header className="cs-hero">
        <div className="cs-hero-glow" aria-hidden="true" />
        <div className="wrap">
          <Link href={`/#${HOME_SECTION_IDS.work}`} className={`cs-back ${REVEAL_CLASS_NAME}`}>
            <ArrowLeftIcon />
            All case studies
          </Link>

          <p className={`cs-label ${REVEAL_CLASS_NAME}`}>{caseStudy.eyebrow}</p>

          <h1 className={`cs-title ${REVEAL_CLASS_NAME}`} style={createRevealDelayStyle(0.06)}>
            {caseStudy.title.lead}
            <span className="grad">{caseStudy.title.accent}</span>
          </h1>

          <div className={`cs-meta ${REVEAL_CLASS_NAME}`} style={createRevealDelayStyle(0.12)}>
            {caseStudy.metaPills.map((pill) => (
              <span key={pill} className="pill">
                {pill}
              </span>
            ))}
          </div>
        </div>
      </header>

      <article className="cs-body">
        <div className="wrap">
          <CaseStudyBody caseStudy={caseStudy} />

          <div className={`cs-wide ${REVEAL_CLASS_NAME}`}>
            <p className="cs-wide-label">The impact</p>
            <div className="impact-grid">
              {caseStudy.impactMetrics.map((metric) => (
                <div key={metric.label} className="impact">
                  <MetricValue metric={metric} className="impact-num" />
                  <span className="impact-cap">{metric.label}</span>
                </div>
              ))}
            </div>
          </div>

          <figure className={`cs-wide ${REVEAL_CLASS_NAME}`}>
            <p className="cs-wide-label">GSC performance</p>
            <div className="shot-frame">
              <div className="shot-bar">
                <span />
                <span />
                <span />
                <p>Search Console · Performance</p>
              </div>
              <Image
                src={screenshot.src}
                alt={screenshot.alt}
                width={screenshot.width}
                height={screenshot.height}
                sizes={SCREENSHOT_SIZES}
                loading="lazy"
                style={{ height: 'auto' }}
              />
            </div>
            <figcaption className="cs-gsc-line">{caseStudy.searchConsole.caption}</figcaption>
          </figure>

          {caseStudy.searchConsole.additionalViews?.map((view) => (
            <figure key={view.image.src} className={`cs-wide ${REVEAL_CLASS_NAME}`}>
              <p className="cs-wide-label">{view.label}</p>
              <div className="shot-frame">
                <div className="shot-bar">
                  <span />
                  <span />
                  <span />
                  <p>Search Console · Performance</p>
                </div>
                <Image
                  src={view.image.src}
                  alt={view.image.alt}
                  width={view.image.width}
                  height={view.image.height}
                  sizes={SCREENSHOT_SIZES}
                  loading="lazy"
                  style={{ height: 'auto' }}
                />
              </div>
              <figcaption className="cs-gsc-line">{view.caption}</figcaption>
            </figure>
          ))}

          <div className="cs-col">
            <div className={`cs-takeaway ${REVEAL_CLASS_NAME}`}>
              <h2>{caseStudy.takeaway.heading}</h2>
              {caseStudy.takeaway.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className={`cs-cta ${REVEAL_CLASS_NAME}`}>
              <CaseStudyEmailCta label={caseStudy.contactCtaLabel} />
            </div>

            <p className={`cs-note ${REVEAL_CLASS_NAME}`}>{caseStudy.confidentialityNote}</p>
          </div>
        </div>
      </article>

      {adjacentCaseStudy && (
        <section className="cs-next">
          <div className="wrap cs-next-inner">
            <div>
              <p className="cs-next-label">{adjacentCaseStudy.relationLabel}</p>
              <h3>{flattenAccentedHeading(adjacentCaseStudy.caseStudy.title)}</h3>
            </div>
            <Link
              href={buildCaseStudyPath(adjacentCaseStudy.caseStudy.slug)}
              className="btn btn-ghost btn-lg"
            >
              Read case study {adjacentCaseStudy.caseStudy.number}
              <ArrowRightIcon />
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
