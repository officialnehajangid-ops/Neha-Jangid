import type { MetadataRoute } from 'next';

import { buildCaseStudyPath, CASE_STUDIES } from '@/content/case-studies';
import { SITE_URL } from '@/content/site';

/**
 * `lastModified` is deliberately omitted: stamping every entry with the build
 * date would tell crawlers the content changed when only the deployment did.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...CASE_STUDIES.map((caseStudy) => ({
      url: `${SITE_URL}${buildCaseStudyPath(caseStudy.slug)}`,
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    })),
  ];
}
