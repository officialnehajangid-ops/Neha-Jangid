/**
 * The "How We Work" rail. Steps render as tag lists by default; step 06 shows the
 * growth chain instead, and step 07 adds the continuous-improvement loop.
 */
export type ProcessStep = {
  readonly number: string;
  readonly title: string;
  /** Short labels shown as chips under the step title. */
  readonly tags?: readonly string[];
  /** Arrow-linked outcomes, each rendered with a trailing "↑". */
  readonly growthChain?: readonly string[];
  /** The repeating cycle printed under the final step. */
  readonly improvementLoop?: readonly string[];
  /**
   * Marker class kept from the original markup. Currently unstyled, but retained
   * so the rail can be themed per step without touching the component.
   */
  readonly modifierClassName?: string;
  /** Paints the node and card in the active accent. */
  readonly isAccented?: boolean;
};

export const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    number: '01',
    title: 'You share the context',
    tags: ['Website', 'Competitors', 'Business goals'],
  },
  {
    number: '02',
    title: 'We learn your business',
    tags: ['Product', 'ICP', 'Positioning', 'Market', 'GA / GSC'],
  },
  {
    number: '03',
    title: 'We find the growth opportunities',
    tags: ['Technical', 'Content', 'Competitors', 'Search & AI visibility'],
  },
  {
    number: '04',
    title: 'We build your organic growth roadmap',
    tags: ['Priorities', 'Channels', 'Deliverables', 'KPIs'],
  },
  {
    number: '05',
    title: 'Our team puts it into action',
    tags: ['Quality-first execution', 'Tracking', 'Continuous improvement'],
  },
  {
    number: '06',
    title: 'Growth starts',
    growthChain: ['Visibility', 'ICP traffic', 'Qualified signups', 'Revenue opportunities'],
    modifierClassName: 'step-growth',
    isAccented: true,
  },
  {
    number: '07',
    title: 'We monitor, learn & adapt',
    tags: [
      'Continuous performance tracking',
      'New growth opportunities',
      'Custom improvements',
    ],
    improvementLoop: ['Review', 'Improve', 'Implement', 'Measure'],
    modifierClassName: 'step-last',
  },
];
