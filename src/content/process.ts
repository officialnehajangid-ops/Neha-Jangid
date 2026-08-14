/**
 * The "How We Work" stepper: one step is shown at a time in a single panel.
 * Steps render as tag lists by default; step 06 shows the growth chain instead,
 * and step 07 adds the continuous-improvement loop.
 */
export type ProcessStep = {
  readonly number: string;
  readonly title: string;
  /** What the client actually gets out of this step, highlighted in the panel. */
  readonly benefit: string;
  /** Short labels shown as chips under the step title. */
  readonly tags?: readonly string[];
  /** Arrow-linked outcomes, each rendered with a trailing "↑". */
  readonly growthChain?: readonly string[];
  /** The repeating cycle printed under the final step. */
  readonly improvementLoop?: readonly string[];
  /** Paints the step's node and panel in the active accent. */
  readonly isAccented?: boolean;
};

export const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    number: '01',
    title: 'You share the context',
    benefit: 'No drawn-out onboarding. A short brief is enough for us to get moving.',
    tags: ['Website', 'Competitors', 'Business goals'],
  },
  {
    number: '02',
    title: 'We learn your business',
    benefit:
      'Your strategy is shaped around your product and your buyers, not a generic SEO checklist.',
    tags: ['Product', 'ICP', 'Positioning', 'Market', 'GA / GSC'],
  },
  {
    number: '03',
    title: 'We find the growth opportunities',
    benefit:
      'You see exactly where visibility, traffic, and revenue are being left on the table today.',
    tags: ['Technical', 'Content', 'Competitors', 'Search & AI visibility'],
  },
  {
    number: '04',
    title: 'We build your organic growth roadmap',
    benefit: 'A prioritised plan you can approve, budget against, and hold us accountable to.',
    tags: ['Priorities', 'Channels', 'Deliverables', 'KPIs'],
  },
  {
    number: '05',
    title: 'Our team puts it into action',
    benefit: 'Specialists ship the work, so progress never stalls waiting on your internal team.',
    tags: ['Quality-first execution', 'Tracking', 'Continuous improvement'],
  },
  {
    number: '06',
    title: 'Growth starts',
    benefit: 'Compounding organic visibility that keeps returning value long after the work ships.',
    growthChain: ['Visibility', 'ICP traffic', 'Qualified signups', 'Revenue opportunities'],
    isAccented: true,
  },
  {
    number: '07',
    title: 'We monitor, learn & adapt',
    benefit:
      'The strategy keeps improving as your market, your product, and search itself keep changing.',
    tags: [
      'Continuous performance tracking',
      'New growth opportunities',
      'Custom improvements',
    ],
    improvementLoop: ['Review', 'Improve', 'Implement', 'Measure'],
  },
];
