import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

import { MetricValue } from '@/components/ui/MetricValue';
import { ArrowRightIcon, ArrowUpRightIcon } from '@/components/ui/icons';
import { buildCaseStudyPath, CASE_STUDIES } from '@/content/case-studies';
import { HOME_SECTION_IDS } from '@/content/site';
import { createRevealDelayStyle, REVEAL_CLASS_NAME } from '@/lib/reveal';

/** Three cards on wide screens, two on tablets, and full width below 860px. */
const CARD_IMAGE_SIZES =
  '(max-width: 860px) 100vw, (max-width: 1024px) 50vw, 360px';
const CARD_REVEAL_STAGGER = 0.08;

export function CaseStudiesSection() {
  return (
    <section id={HOME_SECTION_IDS.work} className="section section-alt">
      <div className="wrap">
        <header className={`sec-head ${REVEAL_CLASS_NAME}`}>
          <h2 className="sec-title">
            The work behind <span className="grad">the growth</span>
          </h2>
          <p className="sec-lede">
            A look at how deeper audits, sharper priorities, and focused execution turn organic
            growth barriers into momentum.
          </p>
        </header>

        <div className="work-grid">
          {CASE_STUDIES.map((caseStudy, index) => (
            <Link
              key={caseStudy.slug}
              href={buildCaseStudyPath(caseStudy.slug)}
              className={`work-card ${REVEAL_CLASS_NAME}`}
              style={createRevealDelayStyle(index * CARD_REVEAL_STAGGER)}
            >
              <div className="work-card-image">
                <Image
                  src={caseStudy.card.image.src}
                  alt={caseStudy.card.image.alt}
                  width={caseStudy.card.image.width}
                  height={caseStudy.card.image.height}
                  sizes={CARD_IMAGE_SIZES}
                  loading="lazy"
                  // next/image must emit width/height attributes, which would
                  // otherwise pin the height and cancel the stylesheet's
                  // `aspect-ratio: 16 / 8`. Releasing the height hands sizing
                  // back to the CSS, as in the original markup.
                  style={{ height: 'auto' }}
                />
                <span className="work-card-arrow">
                  <ArrowUpRightIcon />
                </span>
              </div>

              <div className="work-card-content">
                <div className="work-card-meta">
                  {caseStudy.card.metaItems.map((metaItem, metaIndex) => (
                    <Fragment key={metaItem}>
                      {metaIndex > 0 && <span className="work-card-dot" />}
                      <span>{metaItem}</span>
                    </Fragment>
                  ))}
                </div>

                <h3 className="work-card-title">{caseStudy.card.title}</h3>
                <p className="work-card-summary">{caseStudy.card.summary}</p>

                <p className="work-card-metric">
                  <MetricValue metric={caseStudy.card.headlineMetric} className="metric-value" />
                  <span className="metric-label">{caseStudy.card.headlineMetric.label}</span>
                </p>

                <span className="work-card-cta">
                  Read the full case study
                  <ArrowRightIcon size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className={`disclaimer ${REVEAL_CLASS_NAME}`}>
          Disclaimer: client identities, website details, and commercially sensitive information
          have been withheld for confidentiality.
        </p>
      </div>
    </section>
  );
}
