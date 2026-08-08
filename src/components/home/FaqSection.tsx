'use client';

import { useState } from 'react';

import { FREQUENTLY_ASKED_QUESTIONS } from '@/content/faqs';
import { HOME_SECTION_IDS } from '@/content/site';
import { REVEAL_CLASS_NAME } from '@/lib/reveal';

/**
 * Accordion over native <details> elements, so the markup, the disclosure arrow
 * and the `[open]` styling all come from the browser and the existing stylesheet.
 *
 * `open` is driven from state and the summary's default toggle is prevented, which
 * is what keeps exactly one answer expanded at a time.
 */
export function FaqSection() {
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(null);

  return (
    <section id={HOME_SECTION_IDS.faq} className="section section-alt">
      <div className="wrap">
        <header className={`sec-head ${REVEAL_CLASS_NAME}`}>
          <p className="eyebrow">FAQs</p>
          <h2 className="sec-title">
            Questions SaaS founders usually ask <span className="grad">before we start</span>
          </h2>
          <p className="sec-lede">
            Clear answers about how we work, what to expect, and whether we’re the right fit for
            your product.
          </p>
        </header>

        <div className={`faq ${REVEAL_CLASS_NAME}`}>
          {FREQUENTLY_ASKED_QUESTIONS.map((faq, index) => {
            const isOpen = openQuestionIndex === index;

            return (
              <details key={faq.question} className="faq-item" open={isOpen}>
                <summary
                  onClick={(event) => {
                    event.preventDefault();
                    setOpenQuestionIndex(isOpen ? null : index);
                  }}
                >
                  {faq.question}
                </summary>
                <div className="faq-body">
                  {faq.answerParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
