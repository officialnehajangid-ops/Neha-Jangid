import type { ComponentType } from 'react';

import { GlobeIcon, SearchInsightIcon, StarIcon, type IconProps } from '@/components/ui/icons';

/** A concrete deliverable, listed inside its pillar's card. */
export type ServiceOffering = {
  readonly number: string;
  readonly name: string;
  readonly description: string;
};

/**
 * One of the three headline pillars: Be Everywhere, Be Found, Be Chosen.
 * Each card carries its own offerings, so a pillar and its deliverables stay
 * inside a single container instead of being split across two grids.
 */
export type ServicePillar = {
  readonly number: string;
  readonly name: string;
  readonly headline: string;
  readonly description: string;
  readonly Icon: ComponentType<IconProps>;
  readonly offerings: readonly ServiceOffering[];
};

export const SERVICE_PILLARS: readonly ServicePillar[] = [
  {
    number: '01',
    name: 'Be Everywhere',
    headline: 'Build authority that strengthens every channel',
    description:
      'Expand your reach beyond owned content with credible mentions, relevant links, and consistent distribution that make your entire organic presence more authoritative.',
    Icon: GlobeIcon,
    offerings: [
      {
        number: '01',
        name: 'Digital PR',
        description:
          'Turn your expertise, insights, and original stories into coverage that earns attention, strengthens credibility, and generates valuable mentions from relevant publications.',
      },
      {
        number: '02',
        name: 'Link Building & Backlinks',
        description:
          'Earn relevant, high-authority backlinks that improve rankings and brand authority - without directories, PBNs, or shortcuts that put your website at risk.',
      },
      {
        number: '03',
        name: 'Omnichannel Distribution',
        description:
          'Transform every strong content idea into multiple channel-ready assets, helping your brand reach more buyers without constantly starting from zero.',
      },
    ],
  },
  {
    number: '02',
    name: 'Be Found',
    headline: 'Show up wherever your buyers search',
    description:
      'Build a discoverable brand across traditional search and AI platforms so your product appears when high-intent buyers are actively looking for answers and solutions.',
    Icon: SearchInsightIcon,
    offerings: [
      {
        number: '01',
        name: 'SEO Strategy & Technical SEO',
        description:
          'Turn your website into a stronger growth foundation with strategic audits, scalable site architecture, and technical improvements that help search engines crawl, understand, and rank your product.',
      },
      {
        number: '02',
        name: 'Programmatic SEO',
        description:
          'Capture hundreds of valuable long-tail searches with scalable, template-driven pages - without sacrificing relevance, usefulness, or quality.',
      },
      {
        number: '03',
        name: 'GEO & AI Search',
        description:
          'Increase your chances of being discovered and cited across ChatGPT, Perplexity, Google AI Overviews, and other AI-driven search experiences.',
      },
    ],
  },
  {
    number: '03',
    name: 'Be Chosen',
    headline: 'Turn attention into trust - and trust into action',
    description:
      'Create buyer-focused content that explains your value, strengthens your positioning, and gives potential customers a compelling reason to choose your product.',
    Icon: StarIcon,
    offerings: [
      {
        number: '01',
        name: 'Content Strategy & Writing',
        description:
          'Product-led content mapped to real buyer intent - created to earn visibility, answer buying questions, communicate your differentiation, and convert interest into action.',
      },
      {
        number: '02',
        name: 'YouTube',
        description:
          'Search-led videos designed to build trust, rank across YouTube and Google, and turn one powerful idea into assets for your wider content engine.',
      },
      {
        number: '03',
        name: 'LinkedIn',
        description:
          'Founder and brand-led content that builds authority, starts relevant conversations, and keeps your product visible to the people who influence buying decisions.',
      },
      {
        number: '04',
        name: 'Reddit & Communities',
        description:
          'Build a credible presence in the conversations where buyers exchange recommendations, compare products, and increasingly influence what AI platforms surface.',
      },
    ],
  },
];
