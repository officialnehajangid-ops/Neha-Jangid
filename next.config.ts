import type { NextConfig } from 'next';

/**
 * The static site lived at /index.html, /case-study-01.html and /case-study-02.html.
 * These 301s keep any existing links and indexed URLs pointing at the new routes,
 * so nothing that was already crawled turns into a 404.
 */
const LEGACY_HTML_REDIRECTS = [
  { source: '/index.html', destination: '/' },
  { source: '/case-study-01.html', destination: '/case-studies/breaking-a-long-seo-plateau' },
  { source: '/case-study-02.html', destination: '/case-studies/structuring-scaled-ai-content' },
];

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP for everything that cannot take it.
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return LEGACY_HTML_REDIRECTS.map((redirect) => ({ ...redirect, permanent: true }));
  },
};

export default nextConfig;
