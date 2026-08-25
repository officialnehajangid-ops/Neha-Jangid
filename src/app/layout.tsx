import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Syne } from 'next/font/google';
import type { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/next';

import { AppearanceBootstrapScript } from '@/components/layout/AppearanceBootstrapScript';
import { BackToTopButton } from '@/components/layout/BackToTopButton';
import { ScrollRevealObserver } from '@/components/layout/ScrollRevealObserver';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { DEFAULT_COLOR_THEME } from '@/lib/appearance';
import { SITE, SITE_URL } from '@/content/site';

import './globals.css';

/**
 * The same three families the static site loaded from Google Fonts, now
 * self-hosted by next/font: identical typefaces, but no render-blocking request
 * to fonts.googleapis.com and no flash of fallback text.
 */
const syne = Syne({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE.title,
  description: SITE.description,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  verification: {
    google: 'PA505s8cRP_1BmGbqYklEUVoiEjpWn82gMfAvuNrnyo',
  },
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }] },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: SITE.locale,
  },
  twitter: { card: 'summary_large_image' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const fontVariables = `${syne.variable} ${inter.variable} ${jetBrainsMono.variable}`;

  return (
    <html
      lang="en"
      data-theme={DEFAULT_COLOR_THEME}
      className={fontVariables}
      // The bootstrap script rewrites data-theme before hydration.
      suppressHydrationWarning
    >
      <body>
        <AppearanceBootstrapScript />

        <SiteHeader />
        {children}
        <SiteFooter />

        <BackToTopButton />
        <ScrollRevealObserver />
        <Analytics />
      </body>
    </html>
  );
}
