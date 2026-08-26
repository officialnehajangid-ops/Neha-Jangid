'use client';

import { useState } from 'react';

import { ArrowUpIcon } from '@/components/ui/icons';
import { FREQUENTLY_ASKED_QUESTIONS } from '@/content/faqs';
import { HOME_SECTION_IDS } from '@/content/site';
import { REVEAL_CLASS_NAME } from '@/lib/reveal';

const INITIAL_QUESTION_COUNT = 4;

/**
 * Accordion over native <details> elements, so the markup, the disclosure arrow
 * and the `[open]` styling all come from the browser and the existing stylesheet.
 *
 * `open` is driven from state and the summary's default toggle is prevented, which
 * is what keeps exactly one answer expanded at a time.
 */
export function FaqSection() {
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(null);
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const visibleQuestions = showAllQuestions
    ? FREQUENTLY_ASKED_QUESTIONS
    : FREQUENTLY_ASKED_QUESTIONS.slice(0, INITIAL_QUESTION_COUNT);

  const toggleQuestionList = () => {
    if (showAllQuestions && openQuestionIndex !== null && openQuestionIndex >= INITIAL_QUESTION_COUNT) {
      setOpenQuestionIndex(null);
    }
    setShowAllQuestions((current) => !current);
  };

  return (
    <section id={HOME_SECTION_IDS.faq} className="section section-alt faq-section">
      <div className="wrap">
        <header className={`sec-head ${REVEAL_CLASS_NAME}`}>
          <h2 className="sec-title">
            Questions SaaS founders usually ask <span className="grad">before we start</span>
          </h2>
          <p className="sec-lede">
            Clear answers about how we work, what to expect, and whether we’re the right fit for
            your product.
          </p>
        </header>

        <div className="faq-layout">
          <div id="faq-question-list" className={`faq ${REVEAL_CLASS_NAME}`}>
            {visibleQuestions.map((faq, index) => {
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

          {FREQUENTLY_ASKED_QUESTIONS.length > INITIAL_QUESTION_COUNT && (
            <div className="faq-toggle-row">
              <button
                type="button"
                className="btn btn-ghost faq-toggle"
                aria-expanded={showAllQuestions}
                aria-controls="faq-question-list"
                onClick={toggleQuestionList}
              >
                {showAllQuestions ? 'Show fewer questions' : 'View more questions'}
                <ArrowUpIcon className="faq-toggle-icon" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
