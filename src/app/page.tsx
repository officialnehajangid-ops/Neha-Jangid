import type { Metadata } from 'next';

import { CaseStudiesSection } from '@/components/home/CaseStudiesSection';
import { ClientMarqueeSection } from '@/components/home/ClientMarqueeSection';
import { ContactSection } from '@/components/home/ContactSection';
import { DevMarkLabBand } from '@/components/home/DevMarkLabBand';
import { FaqSection } from '@/components/home/FaqSection';
import { FinalCallToActionSection } from '@/components/home/FinalCallToActionSection';
import { HeroSection } from '@/components/home/HeroSection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { JsonLdScript } from '@/components/seo/JsonLdScript';
import { HOME_SECTION_IDS, SITE } from '@/content/site';
import {
  buildFaqPageSchema,
  buildPersonSchema,
  buildWebSiteSchema,
} from '@/lib/structured-data';

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  alternates: { canonical: '/' },
  openGraph: {
    title: SITE.title,
    description: SITE.socialDescription,
    url: '/',
    images: [{ url: SITE.portrait.src, alt: SITE.portrait.alt }],
  },
  twitter: {
    title: SITE.title,
    description: SITE.socialDescription,
    images: [SITE.portrait.src],
  },
};

export default function HomePage() {
  return (
    <main id={HOME_SECTION_IDS.top}>
      <JsonLdScript
        schemas={[buildPersonSchema(), buildWebSiteSchema(), buildFaqPageSchema()]}
      />

      <HeroSection />
      <DevMarkLabBand />
      <ClientMarqueeSection />
      <ServicesSection />
      <ProcessSection />
      <TestimonialsSection />
      <CaseStudiesSection />
      <ContactSection />
      <FaqSection />
      <FinalCallToActionSection />
    </main>
  );
}
