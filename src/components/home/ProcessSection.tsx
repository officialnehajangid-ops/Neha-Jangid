'use client';

import { Fragment, useCallback, useEffect, useRef, useState } from 'react';

import { RefreshLoopIcon, TrendUpIcon } from '@/components/ui/icons';
import { PROCESS_STEPS, type ProcessStep } from '@/content/process';
import { HOME_SECTION_IDS } from '@/content/site';
import { createRevealDelayStyle, REVEAL_CLASS_NAME } from '@/lib/reveal';

/** How long each step stays on screen before the stepper advances itself. */
const AUTOPLAY_INTERVAL_MS = 5000;
/** Seconds added per chip so they cascade in as a step opens. */
const CHIP_STAGGER = 0.05;

function GrowthChain({ outcomes }: { outcomes: readonly string[] }) {
  return (
    <div className="chain">
      {outcomes.map((outcome, index) => (
        <Fragment key={outcome}>
          {index > 0 && <span className="chain-arrow" aria-hidden="true" />}
          <span className="chain-item" style={createRevealDelayStyle(index * CHIP_STAGGER)}>
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

function StepPanelBody({ step }: { step: ProcessStep }) {
  return (
    <>
      <p className="step-benefit">
        <TrendUpIcon size={16} className="step-benefit-icon" />
        <span>{step.benefit}</span>
      </p>

      {step.tags && (
        <ul className="tags">
          {step.tags.map((tag, index) => (
            <li key={tag} style={createRevealDelayStyle(index * CHIP_STAGGER)}>
              {tag}
            </li>
          ))}
        </ul>
      )}

      {step.growthChain && <GrowthChain outcomes={step.growthChain} />}
      {step.improvementLoop && <ImprovementLoop stages={step.improvementLoop} />}
    </>
  );
}

/**
 * Advances the stepper on a timer, but only while the section is on screen and
 * the reader is not interacting with it. Returns a ref to attach to the section.
 */
function useAutoplay(isPaused: boolean, onAdvance: () => void) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isOnScreen, setIsOnScreen] = useState(false);
  // Kept in a ref so restarting the timer never depends on the callback identity.
  const advanceRef = useRef(onAdvance);
  advanceRef.current = onAdvance;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !('IntersectionObserver' in window)) {
      setIsOnScreen(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setIsOnScreen(entry.isIntersecting);
      },
      { threshold: 0.35 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Self-advancing content is exactly what reduced-motion asks us not to do.
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (isPaused || !isOnScreen || prefersReducedMotion) return;

    const timer = window.setInterval(() => advanceRef.current(), AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [isPaused, isOnScreen]);

  return sectionRef;
}

export function ProcessSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const advance = useCallback(() => {
    setActiveIndex((current) => (current + 1) % PROCESS_STEPS.length);
  }, []);

  const sectionRef = useAutoplay(isPaused, advance);
  const activeStep = PROCESS_STEPS[activeIndex];

  /** Arrow / Home / End move the selection and carry focus with it. */
  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const lastIndex = PROCESS_STEPS.length - 1;
    let nextIndex: number | null = null;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = activeIndex === lastIndex ? 0 : activeIndex + 1;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = activeIndex === 0 ? lastIndex : activeIndex - 1;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = lastIndex;
    }

    if (nextIndex === null) return;
    event.preventDefault();
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  // Unreachable: `activeIndex` is always wrapped back into range. Present only
  // so the checked index access above types as a definite step.
  if (!activeStep) return null;

  return (
    <section
      id={HOME_SECTION_IDS.process}
      className="section section-alt section-process"
      ref={sectionRef}
    >
      <div className="wrap">
        <header className={`sec-head sec-head-center sec-head-tight ${REVEAL_CLASS_NAME}`}>
          <h2 className="sec-title">
            How We <span className="grad">Work</span>
          </h2>
          <p className="sec-lede">
            Every SaaS product solves a specific problem for a specific audience. So before we build
            your growth strategy, we understand your product, your buyers, and what makes them
            choose you.
          </p>
        </header>

        {/*
          All seven steps read in full down the left, so the journey makes sense
          without clicking anything; the panel on the right expands whichever one
          is selected. Hover, focus or a click stops the auto-advance.
        */}
        <div
          className={`stepper ${REVEAL_CLASS_NAME}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          <div
            className="stepper-nav"
            role="tablist"
            aria-orientation="vertical"
            aria-label="How we work"
          >
            {/* Progress rail: how far through the seven steps the reader is. */}
            <span
              className="stepper-progress"
              style={{ height: `${((activeIndex + 1) / PROCESS_STEPS.length) * 100}%` }}
              aria-hidden="true"
            />

            {PROCESS_STEPS.map((step, index) => {
              const isActive = index === activeIndex;
              const stepClassName = [
                'stepper-tab',
                isActive ? 'is-active' : '',
                index < activeIndex ? 'is-done' : '',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <button
                  key={step.number}
                  type="button"
                  role="tab"
                  id={`process-tab-${step.number}`}
                  aria-selected={isActive}
                  aria-controls="process-panel"
                  tabIndex={isActive ? 0 : -1}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  className={stepClassName}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={handleTabKeyDown}
                >
                  <span className="stepper-num">{step.number}</span>
                  <span className="stepper-title">{step.title}</span>
                </button>
              );
            })}
          </div>

          <div
            className={`step-panel${activeStep.isAccented ? ' panel-accent' : ''}`}
            id="process-panel"
            role="tabpanel"
            aria-labelledby={`process-tab-${activeStep.number}`}
            tabIndex={-1}
          >
            {/* Keyed on the step so the panel replays its entrance on each change. */}
            <div className="step-panel-inner" key={activeStep.number}>
              <p className="step-panel-num">
                Step {activeStep.number} <span>of {PROCESS_STEPS.length}</span>
              </p>
              <h3 className="step-panel-title">{activeStep.title}</h3>
              <StepPanelBody step={activeStep} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
