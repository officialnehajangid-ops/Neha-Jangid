import type { ComponentType, ReactNode } from 'react';

import { AskQuestionForm } from '@/components/home/AskQuestionForm';
import {
  ArrowRightIcon,
  BriefcaseIcon,
  CalendarCheckIcon,
  ChatQuestionIcon,
  type IconProps,
} from '@/components/ui/icons';
import { EXTERNAL_LINK_PROPS, EXTERNAL_LINKS, HOME_SECTION_IDS } from '@/content/site';
import { createRevealDelayStyle, REVEAL_CLASS_NAME } from '@/lib/reveal';

const OPTION_REVEAL_STAGGER = 0.08;

type ContactOptionProps = {
  Icon: ComponentType<IconProps>;
  label: string;
  heading: string;
  /** Position in the row, used only to stagger the reveal. */
  index: number;
  /** Highlights the recommended option with the accent border and glow. */
  isPrimary?: boolean;
  id?: string;
  children: ReactNode;
};

/** The shared card shell; each option supplies its own body and actions. */
function ContactOption({
  Icon,
  label,
  heading,
  index,
  isPrimary = false,
  id,
  children,
}: ContactOptionProps) {
  return (
    <div
      id={id}
      className={`option${isPrimary ? ' option-primary' : ''} ${REVEAL_CLASS_NAME}`}
      style={createRevealDelayStyle(index * OPTION_REVEAL_STAGGER)}
    >
      <span className="option-icon">
        <Icon />
      </span>
      <p className="option-label">{label}</p>
      <h3>{heading}</h3>
      {children}
    </div>
  );
}

export function ContactSection() {
  return (
    <section id={HOME_SECTION_IDS.contact} className="section">
      <div className="wrap">
        <header className={`sec-head ${REVEAL_CLASS_NAME}`}>
          <h2 className="sec-title">
            Let’s find your next <span className="grad">organic growth opportunity</span>
          </h2>
          <p className="sec-lede">
            Whether you need a complete organic growth strategy, support with a specific project, or
            an expert answer to one question - choose the option that works best for you.
          </p>
        </header>

        <div className="options">
          <ContactOption
            Icon={CalendarCheckIcon}
            label="Book a free consultation"
            heading="Bring your SaaS. Your goals. Your biggest roadblock."
            index={0}
            isPrimary
          >
            <p className="option-text">
              In a free 30-minute consultation, we’ll discuss your product, current organic
              performance, and what may be limiting your visibility, traffic, or signups.
            </p>
            <p className="option-text">
              You’ll leave with a clearer understanding of what deserves attention next - and
              whether we’re the right team to help you execute it.
            </p>
            <a
              href={EXTERNAL_LINKS.bookACall}
              {...EXTERNAL_LINK_PROPS}
              className="btn btn-accent btn-block"
            >
              Book your free 30-minute consultation
              <ArrowRightIcon />
            </a>
          </ContactOption>

          <ContactOption
            Icon={BriefcaseIcon}
            label="Prefer a freelance platform?"
            heading="Work with me through a platform you already trust"
            index={1}
          >
            <p className="option-text">
              If you prefer the payments, protection, and project management offered by an
              established freelance platform, you can connect and work with me directly through
              Fiverr or Upwork.
            </p>
            <div className="option-btns">
              <a
                href={EXTERNAL_LINKS.fiverr}
                {...EXTERNAL_LINK_PROPS}
                className="btn btn-ghost btn-block"
              >
                Work with me on Fiverr
              </a>
              <a
                href={EXTERNAL_LINKS.upwork}
                {...EXTERNAL_LINK_PROPS}
                className="btn btn-ghost btn-block"
              >
                Work with me on Upwork
              </a>
            </div>
          </ContactOption>

          <ContactOption
            Icon={ChatQuestionIcon}
            label="Have a question first?"
            heading="Ask me one organic growth question"
            index={2}
            id={HOME_SECTION_IDS.contactQuestion}
          >
            <p className="option-text">
              Have a question about SEO, content, AI search, organic visibility, traffic,
              conversions, or any other part of organic marketing? Send me one specific question
              along with a little context. I’ll personally review it and reply with a clear,
              practical answer you can act on.
            </p>
            <AskQuestionForm />
          </ContactOption>
        </div>

        <p className={`options-foot ${REVEAL_CLASS_NAME}`}>
          Not sure which option to choose? <strong>Start with a question.</strong> A valuable growth
          conversation doesn’t have to begin with a sales call.
        </p>
      </div>
    </section>
  );
}
