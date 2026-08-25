export type FrequentlyAskedQuestion = {
  readonly question: string;
  readonly answerParagraphs: readonly string[];
};

/** Rendered as the FAQ accordion and published as FAQPage structured data. */
export const FREQUENTLY_ASKED_QUESTIONS: readonly FrequentlyAskedQuestion[] = [
  {
    question: 'Will I work directly with you or with your team?',
    answerParagraphs: [
      'You’ll work directly with me during discovery, strategy, prioritization, and important decisions. Our specialists support execution across SEO, content, and other organic channels, while I remain closely involved throughout the engagement.',
    ],
  },
  {
    question: 'What types of companies do you work with?',
    answerParagraphs: [
      'We work primarily with B2B SaaS companies, API-first products, developer tools, and technical software businesses - from early-stage startups to established products looking to strengthen or scale organic acquisition.',
    ],
  },
  {
    question: 'Can you work alongside our existing marketing or development team?',
    answerParagraphs: [
      'Yes. We can lead your organic growth roadmap or collaborate with your existing SEO, content, marketing, and development teams. Responsibilities, workflows, and approvals are clearly defined before execution begins.',
    ],
  },
  {
    question: 'Do you provide strategy only, or do you also execute it?',
    answerParagraphs: [
      'Both. We identify opportunities, create the roadmap, and help execute the work across technical SEO, content, AI search, video, digital PR, backlinks, communities, and organic distribution.',
    ],
  },
  {
    question: 'What happens before you create the strategy?',
    answerParagraphs: [
      'We first understand your product, ICP, positioning, competitors, goals, and current performance. We then audit your website, content, technical foundation, and organic visibility before recommending what should happen next.',
    ],
  },
  {
    question: 'What access will you need?',
    answerParagraphs: [
      'Depending on the project, we may request access to Google Analytics, Google Search Console, your CMS, and relevant SEO or reporting tools. We only request the access required to understand performance and complete the agreed work.',
    ],
  },
  {
    question: 'Will anything be published or implemented without our approval?',
    answerParagraphs: [
      'No. Important content, recommendations, and website changes are reviewed before implementation or publishing. Your team stays informed, and nothing substantial goes live without the agreed approval process.',
    ],
  },
  {
    question: 'Our niche has low search volume. Can organic marketing still work?',
    answerParagraphs: [
      'Yes. SaaS and API products often serve specific audiences whose demand is spread across problems, use cases, integrations, comparisons, documentation, and highly technical searches.',
      'These searches may have lower volume, but they can carry much stronger buying intent. We evaluate the complete search journey, competition, ICP relevance, and conversion potential - not keyword volume alone.',
    ],
  },
  {
    question: 'How long does it take to see results?',
    answerParagraphs: [
      'It depends on your website’s current condition, competition, authority, and scope of work. Some technical and on-page improvements can create early movement, while sustainable organic growth typically builds over several months.',
    ],
  },
  {
    question: 'How do you measure success?',
    answerParagraphs: [
      'We define KPIs around your business goals. These may include search and AI visibility, rankings, qualified organic traffic, engagement, demo requests, product signups, conversion rates, and organic-attributed revenue.',
    ],
  },
  {
    question: 'Do you use AI to create content?',
    answerParagraphs: [
      'AI may support research, ideation, analysis, and parts of the workflow, but it doesn’t replace product understanding, original thinking, editing, or quality control. Every deliverable is reviewed before it reaches your audience.',
    ],
  },
  {
    question: 'Can you guarantee rankings or a specific amount of traffic?',
    answerParagraphs: [
      'No responsible SEO professional can guarantee a particular ranking or traffic number. What we can promise is a thoughtful strategy, quality-first execution, transparent reporting, and continuous improvement based on performance.',
    ],
  },
  {
    question: 'How are projects priced?',
    answerParagraphs: [
      'Pricing depends on your goals, website, competition, required channels, and level of execution. After the initial conversation, you’ll receive a recommended scope with clear deliverables and pricing.',
    ],
  },
  {
    question: 'Can I hire you through Fiverr or Upwork?',
    answerParagraphs: [
      'Yes. If you prefer working through an established freelance platform, you can hire me through Fiverr or Upwork. You can also work with us directly through DevMarkLab.',
    ],
  },
  {
    question: 'Will our product and performance data remain confidential?',
    answerParagraphs: [
      'Yes. Client information, website access, strategy documents, and performance data are treated as confidential. Public case studies can also be anonymized when the client’s identity or commercial information cannot be disclosed.',
    ],
  },
];
