import { Fragment } from 'react';

import { RefreshLoopIcon } from '@/components/ui/icons';
import { PROCESS_STEPS, type ProcessStep } from '@/content/process';
import { HOME_SECTION_IDS } from '@/content/site';
import { REVEAL_CLASS_NAME } from '@/lib/reveal';

function GrowthChain({ outcomes }: { outcomes: readonly string[] }) {
  return (
    <div className="chain">
      {outcomes.map((outcome, index) => (
        <Fragment key={outcome}>
          {index > 0 && <span className="chain-arrow" aria-hidden="true" />}
          <span className="chain-item">
            {outcome} <i>↑</i>
          </span>
        </Fragment>
      ))}
    </div>
  );
}

function ImprovementLoop({ stages }: { stages: readonly string[] }) {
  return (
    <div className="loop">
      <RefreshLoopIcon className="loop-icon" />
      {stages.map((stage, index) => (
        <Fragment key={stage}>
          {index > 0 && <em>→</em>}
          <span>{stage}</span>
        </Fragment>
      ))}
    </div>
  );
}

function ProcessRailStep({ step }: { step: ProcessStep }) {
  const stepClassName = ['step', step.modifierClassName, REVEAL_CLASS_NAME]
    .filter(Boolean)
    .join(' ');

  return (
    <li className={stepClassName}>
      <div className={`step-node${step.isAccented ? ' node-accent' : ''}`}>
        <span>{step.number}</span>
      </div>

      <div className={`step-card${step.isAccented ? ' card-accent' : ''}`}>
        <h3>{step.title}</h3>

        {step.tags && (
          <ul className="tags">
            {step.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}

        {step.growthChain && <GrowthChain outcomes={step.growthChain} />}
        {step.improvementLoop && <ImprovementLoop stages={step.improvementLoop} />}
      </div>
    </li>
  );
}

export function ProcessSection() {
  return (
    <section id={HOME_SECTION_IDS.process} className="section section-alt">
      <div className="wrap">
        <header className={`sec-head ${REVEAL_CLASS_NAME}`}>
          <h2 className="sec-title">
            How We <span className="grad">Work</span>
          </h2>
          <p className="sec-lede">
            Every SaaS product solves a specific problem for a specific audience. So before we build
            your growth strategy, we understand your product, your buyers, and what makes them
            choose you.
          </p>
        </header>

        <ol className="rail">
          {PROCESS_STEPS.map((step) => (
            <ProcessRailStep key={step.number} step={step} />
          ))}
        </ol>
      </div>
    </section>
  );
}
