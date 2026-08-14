import { Fragment } from 'react';

import { CLIENTS } from '@/content/clients';
import { REVEAL_CLASS_NAME } from '@/lib/reveal';

/**
 * The track holds the same list twice and slides by exactly -50%, which is what
 * makes the scroll loop seamlessly. The duplicate is hidden from assistive tech,
 * and its links are taken out of the tab order so each brand is focusable once.
 */
function ClientNameGroup({ isDuplicate = false }: { isDuplicate?: boolean }) {
  return (
    <div className="marquee-group" aria-hidden={isDuplicate || undefined}>
      {CLIENTS.map((client) => (
        // The name and its trailing dot are siblings: `.marquee-group` is a flex
        // row, and the <i> dot relies on being a flex item for its own spacing.
        <Fragment key={client.name}>
          <a
            className="marquee-link"
            href={client.url}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={isDuplicate ? -1 : undefined}
          >
            {client.name}
          </a>
          <i />
        </Fragment>
      ))}
    </div>
  );
}

export function ClientMarqueeSection() {
  return (
    <section className="clients">
      <div className={`wrap ${REVEAL_CLASS_NAME}`}>
        <h2 className="clients-title">SaaS teams I have worked with</h2>
        <p className="clients-sub">
          From API-first products and developer tools to established B2B software.
        </p>
      </div>

      <div className={`marquee ${REVEAL_CLASS_NAME}`} aria-label="Clients I have worked with">
        <div className="marquee-track">
          <ClientNameGroup />
          <ClientNameGroup isDuplicate />
        </div>
      </div>

      <div className={`wrap ${REVEAL_CLASS_NAME}`}>
        <p className="clients-more">+ 30 more SaaS products</p>
      </div>
    </section>
  );
}
