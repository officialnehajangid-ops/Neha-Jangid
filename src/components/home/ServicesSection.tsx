import { Fragment } from 'react';

import { TrendUpIcon } from '@/components/ui/icons';
import { SERVICE_PILLARS } from '@/content/services';
import { HOME_SECTION_IDS } from '@/content/site';
import { createRevealDelayStyle, REVEAL_CLASS_NAME } from '@/lib/reveal';

/** Seconds added per column so the cards cascade instead of landing together. */
const COLUMN_REVEAL_STAGGER = 0.08;

export function ServicesSection() {
  return (
    <section id={HOME_SECTION_IDS.services} className="section">
      <div className="wrap">
        <header className={`sec-head sec-head-center ${REVEAL_CLASS_NAME}`}>
          <h2 className="sec-title">
            Everything your brand needs to get more traffic, visibility, and{' '}
            <span className="grad">overall growth</span>
          </h2>
          <p className="sec-lede">
            One connected organic growth strategy across search, AI, content, video, PR, and
            communities - built around your buyers and tied to meaningful business outcomes. I lead
            the strategy alongside our eight-person team, bringing focused expertise, consistent
            execution, and clear accountability to every channel.
          </p>
        </header>

        {/*
          One card per pillar: heading, description and the pillar's own services
          all live in the same container, so the three columns read top-to-bottom.
        */}
        <div className="pillars">
          {SERVICE_PILLARS.map((pillar, index) => (
            // The reveal fade and the card's own hover transition need separate
            // elements: both set `transition`, so one would cancel the other.
            <div
              key={pillar.number}
              className={REVEAL_CLASS_NAME}
              style={createRevealDelayStyle(index * COLUMN_REVEAL_STAGGER)}
            >
              <article className="pillar-card">
                <div className="pillar-head">
                  <div className="pillar-top">
                    <span className="pillar-icon">
                      <pillar.Icon />
                    </span>
                    <span className="pillar-num">{pillar.number}</span>
                  </div>
                  <h3 className="pillar-name">{pillar.name}</h3>
                  <p className="pillar-headline">{pillar.headline}</p>
                  <p className="pillar-desc">{pillar.description}</p>
                </div>

                <ul className="pillar-list">
                  {pillar.offerings.map((offering) => (
                    <li key={offering.name} className="svc-item">
                      <span className="svc-idx">{offering.number}</span>
                      <h4>{offering.name}</h4>
                      <p>{offering.description}</p>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          ))}
        </div>

        {/* Summary banner: the three pillars adding up to organic growth. */}
        <div className={`equation ${REVEAL_CLASS_NAME}`}>
          <div className="eq-row">
            {SERVICE_PILLARS.map((pillar, index) => {
              const isLastPillar = index === SERVICE_PILLARS.length - 1;
              return (
                <Fragment key={pillar.number}>
                  <span className="eq-chip">
                    <em>{pillar.number}</em>
                    {pillar.name}
                  </span>
                  <span className={isLastPillar ? 'eq-op eq-eq' : 'eq-op'} aria-hidden="true">
                    {isLastPillar ? '=' : '+'}
                  </span>
                </Fragment>
              );
            })}
            <span className="eq-result">
              <TrendUpIcon size={20} />
              Growth
            </span>
          </div>
          <h3 className="eq-title">
            Organic visibility that <span className="grad">drives growth</span>
          </h3>
          <p className="eq-sub">
            Search, content, and authority working together to bring in the right traffic - and turn
            more of it into signups and revenue.
          </p>
        </div>
      </div>
    </section>
  );
}
