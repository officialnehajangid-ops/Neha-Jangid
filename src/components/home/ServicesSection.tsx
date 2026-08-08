import { Fragment } from 'react';

import { SERVICE_OFFERING_COLUMNS, SERVICE_PILLARS } from '@/content/services';
import { HOME_SECTION_IDS } from '@/content/site';
import { createRevealDelayStyle, REVEAL_CLASS_NAME } from '@/lib/reveal';

/** Seconds added per column so the cards cascade instead of landing together. */
const COLUMN_REVEAL_STAGGER = 0.08;

export function ServicesSection() {
  return (
    <section id={HOME_SECTION_IDS.services} className="section">
      <div className="wrap">
        <header className={`sec-head sec-head-center ${REVEAL_CLASS_NAME}`}>
          <p className="eyebrow">Services</p>
          <h2 className="sec-title">
            Everything your brand needs to get more traffic, visibility, and{' '}
            <span className="grad">overall growth</span>
          </h2>
          <p className="sec-lede">
            One connected organic growth strategy across search, AI, content, video, PR, and
            communities — built around your buyers and tied to meaningful business outcomes. I lead
            the strategy alongside our eight-person team, bringing focused expertise, consistent
            execution, and clear accountability to every channel.
          </p>
        </header>

        <div className="pillars">
          {SERVICE_PILLARS.map((pillar, index) => (
            <div
              key={pillar.number}
              className={REVEAL_CLASS_NAME}
              style={createRevealDelayStyle(index * COLUMN_REVEAL_STAGGER)}
            >
              <article className="pillar-card">
                <div className="pillar-top">
                  <span className="pillar-icon">
                    <pillar.Icon />
                  </span>
                  <span className="pillar-num">{pillar.number}</span>
                </div>
                <h3 className="pillar-name">{pillar.name}</h3>
                <p className="pillar-headline">{pillar.headline}</p>
                <p className="pillar-desc">{pillar.description}</p>
              </article>
            </div>
          ))}
        </div>

        <div className="pillar-services">
          {SERVICE_OFFERING_COLUMNS.map((offerings, columnIndex) => (
            <div
              key={SERVICE_PILLARS[columnIndex]?.number ?? columnIndex}
              className={`svc-stack ${REVEAL_CLASS_NAME}`}
              style={createRevealDelayStyle(columnIndex * COLUMN_REVEAL_STAGGER)}
            >
              {offerings.map((offering) => (
                <div key={offering.name} className="svc-card">
                  <span className="svc-idx">{offering.number}</span>
                  <h4>{offering.name}</h4>
                  <p>{offering.description}</p>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className={`equation ${REVEAL_CLASS_NAME}`}>
          <div className="eq-row">
            {SERVICE_PILLARS.map((pillar, index) => {
              const isLastPillar = index === SERVICE_PILLARS.length - 1;
              return (
                <Fragment key={pillar.number}>
                  <span className="eq-chip">{pillar.number}</span>
                  <span className={isLastPillar ? 'eq-op eq-eq' : 'eq-op'}>
                    {isLastPillar ? '=' : '+'}
                  </span>
                </Fragment>
              );
            })}
          </div>
          <h3 className="eq-title">
            Organic visibility that <span className="grad">drives growth</span>
          </h3>
          <p className="eq-sub">
            Search, content, and authority working together to bring in the right traffic — and turn
            more of it into signups and revenue.
          </p>
        </div>
      </div>
    </section>
  );
}
