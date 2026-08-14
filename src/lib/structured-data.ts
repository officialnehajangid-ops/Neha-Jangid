import {
  buildCaseStudyPath,
  flattenAccentedHeading,
  type CaseStudy,
} from '@/content/case-studies';
import { FREQUENTLY_ASKED_QUESTIONS } from '@/content/faqs';
import { SOCIAL_PROFILES } from '@/content/social';
import { EXTERNAL_LINKS, SITE, SITE_URL } from '@/content/site';

/**
 * schema.org JSON-LD builders.
 *
 * These describe content that is already on the page - they never introduce
 * claims the visitor cannot see, which is what keeps the markup eligible for
 * rich results rather than flagged as spam.
 */

type JsonLdObject = Record<string, unknown>;

function toAbsoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

const PERSON_ID = `${SITE_URL}/#person`;

export function buildPersonSchema(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE.name,
    jobTitle: SITE.jobTitle,
    description: SITE.description,
    url: SITE_URL,
    image: toAbsoluteUrl(SITE.portrait.src),
    worksFor: {
      '@type': 'Organization',
      name: 'DevMark Lab',
      url: EXTERNAL_LINKS.devMarkLab,
    },
    sameAs: [...SOCIAL_PROFILES.map((profile) => profile.href), EXTERNAL_LINKS.devMarkLab],
  };
}

export function buildWebSiteSchema(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE_URL,
    description: SITE.description,
    inLanguage: 'en',
    publisher: { '@id': PERSON_ID },
  };
}

/** Mirrors the FAQ accordion, so the same answers can surface in search results. */
export function buildFaqPageSchema(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FREQUENTLY_ASKED_QUESTIONS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answerParagraphs.join(' '),
      },
    })),
  };
}

export function buildCaseStudyArticleSchema(caseStudy: CaseStudy): JsonLdObject {
  const path = buildCaseStudyPath(caseStudy.slug);

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: flattenAccentedHeading(caseStudy.title),
    description: caseStudy.metadata.description,
    image: toAbsoluteUrl(caseStudy.searchConsole.image.src),
    url: toAbsoluteUrl(path),
    mainEntityOfPage: { '@type': 'WebPage', '@id': toAbsoluteUrl(path) },
    inLanguage: 'en',
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
  };
}

export type BreadcrumbEntry = {
  readonly name: string;
  readonly path: string;
};

export function buildBreadcrumbSchema(entries: readonly BreadcrumbEntry[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: entries.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: toAbsoluteUrl(entry.path),
    })),
  };
}
