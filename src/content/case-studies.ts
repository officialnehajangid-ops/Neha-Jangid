import { CASE_STUDIES_BASE_PATH } from '@/content/site';

/**
 * A heading split so the second half can be painted with the accent gradient
 * (`<span class="grad">`), the way every headline on the site is written.
 */
export type AccentedHeading = {
  readonly lead: string;
  readonly accent: string;
};

export type ImpactMetric = {
  /** Qualifier rendered smaller and lighter before the figure, e.g. "≈". */
  readonly prefix?: string;
  readonly value: string;
  readonly label: string;
};

export type CaseStudySection = {
  readonly heading: string;
  readonly paragraphs: readonly string[];
  readonly bullets?: readonly string[];
  /** Sits after the bullet list, separated by extra space. */
  readonly closingParagraph?: string;
};

export type CaseStudyImage = {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
};

/** How a case study is teased in the "The work behind the growth" grid. */
export type CaseStudyCard = {
  readonly metaItems: readonly string[];
  readonly title: string;
  readonly summary: string;
  readonly headlineMetric: ImpactMetric;
  readonly image: CaseStudyImage;
};

export type CaseStudy = {
  readonly slug: string;
  readonly number: string;
  readonly card: CaseStudyCard;
  readonly eyebrow: string;
  readonly title: AccentedHeading;
  readonly metaPills: readonly string[];
  readonly sections: readonly CaseStudySection[];
  readonly impactMetrics: readonly ImpactMetric[];
  readonly searchConsole: {
    readonly image: CaseStudyImage;
    readonly caption: string;
  };
  readonly takeaway: {
    readonly heading: string;
    readonly paragraphs: readonly string[];
  };
  readonly contactCtaLabel: string;
  readonly confidentialityNote: string;
  readonly metadata: {
    readonly title: string;
    readonly description: string;
    readonly socialTitle: string;
    readonly socialDescription: string;
  };
};

/** Ordered oldest-first; the order drives the previous/next links between studies. */
export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    slug: 'breaking-a-long-seo-plateau',
    number: '01',
    card: {
      metaItems: ['Case study 01', 'Niche SaaS product', '5 months'],
      title: 'From a long SEO plateau to consistent organic growth',
      summary:
        'Years of SEO activity without momentum. We fixed the foundations, strengthened existing content, and rebuilt the strategy around ICP search intent and conversion.',
      headlineMetric: {
        prefix: '≈',
        value: '100%',
        label: 'higher daily organic traffic run rate',
      },
      image: {
        src: '/images/case-study-01-gsc.png',
        alt: 'Search Console performance for case study 01: 20.8K clicks and 940K impressions.',
        width: 2328,
        height: 940,
      },
    },
    eyebrow: 'Case study 01 · Niche SaaS product',
    title: {
      lead: 'Breaking a long SEO plateau and ',
      accent: 'rebuilding organic growth',
    },
    metaPills: ['Engagement duration · 5 months', 'Low keyword volume market'],
    sections: [
      {
        heading: 'The situation',
        paragraphs: [
          'This SaaS product operated in a specialized market with relatively low keyword volume. The company had been investing in SEO for a long time - publishing content, optimizing keywords, and redesigning important pages.',
          'There was plenty of activity, but organic traffic wasn’t growing consistently. The work appeared effective individually, yet it wasn’t creating sustained momentum or bringing enough of the right prospects into the conversion journey.',
        ],
      },
      {
        heading: 'The challenge',
        paragraphs: [
          'The problem wasn’t a lack of effort or content. It was the absence of one connected strategy.',
          'Technical issues, on-page weaknesses, website structure, and content priorities were limiting the impact of the work already being done. Some initiatives supported visibility, but they weren’t sufficiently aligned with the product’s ICP or commercial goals.',
        ],
      },
      {
        heading: 'What we audited',
        paragraphs: ['We conducted a deeper review across:'],
        bullets: [
          'Technical SEO and website health',
          'Existing content quality and performance',
          'On-page optimization',
          'Website and information structure',
          'Competitor positioning and search coverage',
          'ICP problems and high-intent searches',
          'Organic entry points and conversion journeys',
        ],
        closingParagraph:
          'The audit helped us separate surface-level activity from the issues genuinely restricting growth.',
      },
      {
        heading: 'What we changed',
        paragraphs: [
          'We created a custom organic growth roadmap based on impact and priority. Our work included:',
        ],
        bullets: [
          'Fixing high-priority technical and on-page issues',
          'Strengthening existing pages before publishing more',
          'Improving the structure and relationships between important pages',
          'Refocusing content around ICP problems and buying intent',
          'Building clearer paths from organic landing pages to conversion',
          'Prioritizing commercially relevant opportunities over vanity traffic',
          'Continuously monitoring performance and refining the strategy',
        ],
        closingParagraph:
          'Every important change was reviewed before implementation or publishing.',
      },
      {
        heading: 'The outcome',
        paragraphs: [
          'After implementation began, the website moved beyond its previous plateau and established a higher, more consistent level of organic visibility.',
          'Google Search Console showed stronger click and impression trends, more frequent traffic peaks, and clear upward momentum following the start of the engagement in March 2026.',
          'More importantly, the strategy shifted from simply attracting traffic to reaching prospects with a stronger likelihood of becoming customers.',
        ],
      },
    ],
    impactMetrics: [
      { prefix: '≈', value: '100%', label: 'higher daily organic traffic run rate' },
      { prefix: '≈', value: '30%', label: 'more qualified organic signups' },
      { prefix: '≈', value: '25%', label: 'growth in organic-attributed revenue' },
      { prefix: '≈', value: '20%', label: 'increase in AI search visibility' },
    ],
    searchConsole: {
      image: {
        src: '/images/case-study-01-gsc.png',
        alt: 'Google Search Console performance: 20.8K clicks and 940K impressions across a 16-month view, with growth beginning in March 2026.',
        width: 2328,
        height: 940,
      },
      caption: '20.8K clicks · 940K search impressions · engagement began March 2026',
    },
    takeaway: {
      heading: 'The takeaway',
      paragraphs: [
        'Publishing more wasn’t the answer. The growth came from understanding the product, fixing the foundations, and connecting every SEO initiative to the ICP and conversion journey.',
      ],
    },
    contactCtaLabel: 'Discuss a similar growth challenge',
    confidentialityNote:
      'Client identity, website details, and commercially sensitive information have been withheld for confidentiality. The GSC totals shown cover the complete 16-month view; the engagement began in March 2026. Percentage-based outcomes reflect internal performance estimates.',
    metadata: {
      title: 'Case Study 01 - Breaking a Long SEO Plateau | Neha Jangid',
      description:
        'How a niche SaaS product with low keyword volume moved past a long SEO plateau to consistent organic growth in five months.',
      socialTitle: 'Breaking a Long SEO Plateau and Rebuilding Organic Growth',
      socialDescription:
        'A niche SaaS product with low keyword volume, five months, and one connected organic growth strategy.',
    },
  },
  {
    slug: 'structuring-scaled-ai-content',
    number: '02',
    card: {
      metaItems: ['Case study 02', 'Healthy search demand', '1+ year'],
      title: 'From scaled AI content to structured organic growth',
      summary:
        'Content at scale without structure. We strengthened the technical foundation, added quality control, and filled high-intent gaps across the buyer journey.',
      headlineMetric: {
        prefix: '≈',
        value: '500%',
        label: 'higher daily organic traffic run rate',
      },
      image: {
        src: '/images/case-study-02-gsc.png',
        alt: 'Search Console performance for case study 02: 218K clicks and 9.85M impressions.',
        width: 2264,
        height: 1032,
      },
    },
    eyebrow: 'Case study 02 · SaaS product with healthy search demand',
    title: {
      lead: 'Turning scaled AI content into a ',
      accent: 'structured organic growth engine',
    },
    metaPills: ['Engagement duration · 1+ year', 'Healthy search demand'],
    sections: [
      {
        heading: 'The situation',
        paragraphs: [
          'This SaaS product operated in a market with healthy search demand and had scaled content production using AI.',
          'The website had accumulated a substantial amount of content, but publishing at scale wasn’t translating into its full organic potential. Technical issues, inconsistent on-page optimization, and missing coverage across the buyer journey were holding performance back.',
          'The website didn’t need more disconnected pages. It needed a stronger system behind them.',
        ],
      },
      {
        heading: 'The challenge',
        paragraphs: [
          'Rapid content production had created volume without enough strategic structure.',
          'Important ICP problems, product use cases, commercial searches, and decision-stage topics remained uncovered. Existing pages also needed stronger optimization, quality control, and clearer connections to relevant commercial pages.',
        ],
      },
      {
        heading: 'What we audited',
        paragraphs: ['We reviewed:'],
        bullets: [
          'Technical SEO and website health',
          'On-page optimization across existing pages',
          'Content quality, relevance, and search intent',
          'Missing topics across the buyer journey',
          'Website structure and internal page relationships',
          'High-intent and commercially valuable searches',
          'Search performance and growth opportunities',
        ],
        closingParagraph:
          'This gave us a clearer view of which existing assets could be improved and where new coverage could create meaningful growth.',
      },
      {
        heading: 'What we changed',
        paragraphs: [
          'We transformed content production into a more focused organic growth system. Our work included:',
        ],
        bullets: [
          'Fixing high-impact technical and on-page issues',
          'Introducing stronger quality controls for AI-assisted content',
          'Improving valuable existing pages',
          'Identifying missing topics across the buyer journey',
          'Expanding coverage around ICP problems and high-intent searches',
          'Building clearer relationships between informational and commercial pages',
          'Strengthening website structure and internal linking',
          'Monitoring performance and adapting priorities as the website grew',
        ],
        closingParagraph:
          'The focus moved from publishing volume to relevance, quality, market coverage, and commercial value.',
      },
      {
        heading: 'The outcome',
        paragraphs: [
          'Over the six-month GSC view, the website generated 218K organic clicks and 9.85M search impressions, with an average search position of 8.2.',
          'Daily clicks grew from a few hundred early in the period to regularly exceeding 2,000 as the website captured more of the available search demand.',
          'The result was a more complete organic presence - one that could attract buyers across discovery, consideration, and decision-stage searches.',
        ],
      },
    ],
    impactMetrics: [
      { prefix: '≈', value: '500%', label: 'higher daily organic traffic run rate' },
      { prefix: '≈', value: '30%', label: 'more qualified organic signups' },
      { prefix: '≈', value: '15%', label: 'growth in organic-attributed revenue' },
      { prefix: '≈', value: '40%', label: 'increase in AI search visibility' },
    ],
    searchConsole: {
      image: {
        src: '/images/case-study-02-gsc.png',
        alt: 'Google Search Console performance: 218K clicks and 9.85M impressions across a six-month view at an average position of 8.2.',
        width: 2264,
        height: 1032,
      },
      caption: '218K clicks · 9.85M impressions · 8.2 average position',
    },
    takeaway: {
      heading: 'The takeaway',
      paragraphs: [
        'AI helped the company scale production, but sustainable growth came from strategy, quality control, technical strength, and complete buyer-journey coverage.',
        'The goal wasn’t merely to publish more pages. It was to make every page contribute to discoverability, buyer trust, and business growth.',
      ],
    },
    contactCtaLabel: 'Build a stronger organic growth system',
    confidentialityNote:
      'Client identity, website details, and commercially sensitive information have been withheld for confidentiality. Search figures are based on the six-month Google Search Console view shown. Percentage-based commercial and AI-visibility outcomes reflect internal performance estimates.',
    metadata: {
      title: 'Case Study 02 - Structuring Scaled AI Content | Neha Jangid',
      description:
        'How a SaaS product with healthy search demand turned scaled AI content production into a structured organic growth engine over a year.',
      socialTitle: 'Turning Scaled AI Content Into a Structured Organic Growth Engine',
      socialDescription:
        '218K organic clicks and 9.85M impressions - from publishing volume to relevance, quality and full buyer-journey coverage.',
    },
  },
  {
    slug: 'rebuilding-niche-api-site-architecture',
    number: '03',
    card: {
      metaItems: ['Case study 03', 'Niche API product', 'Under 7 weeks'],
      title: 'Rebuilding a niche API website around the way buyers search',
      summary:
        'Months of SEO had not helped its conversion pages rank. I rebuilt the site around search intent, mapped every commercial keyword to the right destination, and rewrote the landing experience.',
      headlineMetric: {
        prefix: '≈',
        value: '100%',
        label: 'increase in average daily organic clicks',
      },
      image: {
        src: '/images/case-study-03-gsc.png',
        alt: 'Search Console performance for case study 03: 6.68K clicks and 272K impressions across a three-month view.',
        width: 2184,
        height: 1302,
      },
    },
    eyebrow: 'Case study 03 · Niche API product',
    title: {
      lead: 'Rebuilding a niche API website around ',
      accent: 'the way buyers search',
    },
    metaPills: ['Initial result window · under 7 weeks', 'No new backlinks or blog posts'],
    sections: [
      {
        heading: 'The situation',
        paragraphs: [
          'This was a highly specialized API product in a market where search volume was low, but every relevant query carried strong buying intent.',
          'The company had already invested months in SEO. Its conversion-focused landing pages existed, yet they were not earning meaningful visibility for the core searches that mattered to the business.',
        ],
      },
      {
        heading: 'The problem',
        paragraphs: [
          'The issue went deeper than copy or metadata. The website did not give search engines a clear enough picture of what the product covered, which page should rank for each intent, or how its capabilities related to one another.',
          'Important commercial searches were either competing for the same destination or had no dedicated page at all. Strong conversion copy could not do its job if the right page was difficult to discover.',
        ],
      },
      {
        heading: 'What I audited',
        paragraphs: [
          'I started by connecting technical findings, search behavior, and the competitive landscape. The review covered:',
        ],
        bullets: [
          'The page types Google preferred for every priority query',
          'The URL structures and hierarchies used by ranking competitors',
          'Search intent and SERP composition across core commercial terms',
          'Existing pages with overlapping or unclear keyword targets',
          'High-intent topics without a dedicated landing page',
          'Technical and on-page issues weakening relevance',
          'How clearly the product, capabilities, and use cases were communicated',
        ],
        closingParagraph:
          'The audit made the central problem clear: the architecture had to be decided before individual pages could rank consistently.',
      },
      {
        heading: 'The architecture strategy',
        paragraphs: [
          'I turned the research into a keyword-to-page map, giving every important query one clear destination within the website.',
          'The new structure connected broad capability hubs to focused platform pages and commercial use-case pages. That created a logical path from a general need to the exact feature or application a buyer was searching for.',
        ],
        bullets: [
          'Capability hubs organized the product around its core jobs',
          'Platform-specific child pages captured precise integration intent',
          'Use-case pages addressed the needs of distinct buyer groups',
          'Every page received one primary keyword and a distinct purpose',
          'Titles and descriptions were written for the page’s exact search intent',
          'Parent-child relationships made the full product offering easier to understand',
        ],
        closingParagraph:
          'Keyword optimization was not added after the pages were written. It shaped the architecture from the beginning.',
      },
      {
        heading: 'What I changed',
        paragraphs: [
          'With the structure in place, I rebuilt the landing-page system around it. The work included:',
        ],
        bullets: [
          'Fixing the technical and on-page issues uncovered during the audit',
          'Rewriting existing commercial pages around their assigned intent',
          'Creating new landing pages for previously uncovered opportunities',
          'Separating overlapping targets to reduce keyword competition',
          'Clarifying the messaging for each capability, platform, and use case',
          'Strengthening the relationships between broader and more specific pages',
        ],
        closingParagraph:
          'The result was not a collection of isolated landing pages. It was one connected search system built to support discovery and conversion.',
      },
      {
        heading: 'The outcome',
        paragraphs: [
          'The work began on August 10. By September 26 - in under seven weeks - average daily organic clicks in the final two weeks shown were approximately double the two-week baseline immediately before the restructure.',
          'The complete three-month Search Console view recorded 6.68K clicks, 272K impressions, a 2.5% average click-through rate, and an average position of 10.9.',
          'No new blog posts or backlinks were added during this result window. The lift coincided with the architecture and landing-page rollout: clearer search intent, better page coverage, and messaging built for each destination.',
          'The clearer structure also created a stronger foundation for AEO and GEO by making the product’s capabilities and page relationships easier for search and AI systems to interpret. These pages were still early in their lifecycle, with more room to mature.',
        ],
      },
    ],
    impactMetrics: [
      { prefix: '≈', value: '100%', label: 'increase in average daily organic clicks' },
      { value: '6.68K', label: 'clicks in the three-month GSC view' },
      { value: '272K', label: 'impressions in the three-month GSC view' },
      { value: '2.5%', label: 'average CTR across the view' },
    ],
    searchConsole: {
      image: {
        src: '/images/case-study-03-gsc.png',
        alt: 'Google Search Console performance showing organic clicks rising after the August 10 architecture rollout, with 6.68K clicks, 272K impressions, 2.5% CTR, and an average position of 10.9 across the full three-month view.',
        width: 2184,
        height: 1302,
      },
      caption:
        '6.68K clicks · 272K impressions · 2.5% average CTR · 10.9 average position',
    },
    takeaway: {
      heading: 'The takeaway',
      paragraphs: [
        'For a niche product, SEO is not simply a volume game. When every relevant search matters, the website needs one clear intent, one appropriate destination, and a logical relationship between every important page.',
        'Architecture determines whether strong copy can be discovered. Clear page purpose also gives search engines and AI answer systems a better foundation for understanding, retrieving, and citing the product.',
      ],
    },
    contactCtaLabel: 'Plan a search-led site architecture',
    confidentialityNote:
      'Client identity, website details, and commercially sensitive information have been withheld for confidentiality. The Search Console totals cover the complete three-month view and include both pre- and post-rollout data. The approximate 100% lift compares average daily clicks in the final 14 days shown with the 14 days immediately before work began on August 10; it is estimated from the chart. No new blog posts or backlinks were added during the result window.',
    metadata: {
      title: 'Case Study 03 - Rebuilding a Niche API Site Architecture | Neha Jangid',
      description:
        'How a search-led architecture and landing-page overhaul approximately doubled average daily organic clicks for a niche API product in under seven weeks.',
      socialTitle: 'Rebuilding a Niche API Website Around the Way Buyers Search',
      socialDescription:
        'Approximately 100% more average daily organic clicks in under seven weeks - without new blog posts or backlinks.',
    },
  },
];

export function buildCaseStudyPath(slug: string): string {
  return `${CASE_STUDIES_BASE_PATH}/${slug}`;
}

export function findCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((caseStudy) => caseStudy.slug === slug);
}

export function flattenAccentedHeading(heading: AccentedHeading): string {
  return `${heading.lead}${heading.accent}`;
}

export type AdjacentCaseStudy = {
  readonly caseStudy: CaseStudy;
  /** "Next case study" when one follows, otherwise "Previous case study". */
  readonly relationLabel: string;
};

/**
 * The study to promote at the foot of a case study page: the next one when there
 * is one, and the previous one on the last page so the link is never a dead end.
 */
export function findAdjacentCaseStudy(slug: string): AdjacentCaseStudy | null {
  const currentIndex = CASE_STUDIES.findIndex((caseStudy) => caseStudy.slug === slug);
  if (currentIndex === -1) return null;

  const next = CASE_STUDIES[currentIndex + 1];
  if (next) return { caseStudy: next, relationLabel: 'Next case study' };

  const previous = CASE_STUDIES[currentIndex - 1];
  if (previous) return { caseStudy: previous, relationLabel: 'Previous case study' };

  return null;
}
