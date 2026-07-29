import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import type { Lang } from '@/lib/translations';
import CTABanner from '@/components/CTABanner';
import TrustStrip from '@/components/TrustStrip';
import TabbedCalculator from '@/components/TabbedCalculator';
import About from '@/components/About';
import Prices from '@/components/Prices';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import { faqData } from '@/lib/faq';
import HowItWorks from '@/components/HowItWorks';
import BlogStrip from '@/components/BlogStrip';
import AnimatedSection from '@/components/AnimatedSection';
import MobileLanding, { MobileStickyBar } from '@/components/MobileLanding';
import { CONTACT } from '@/lib/data';

interface Props {
  params: Promise<{ lang: string }>;
}

const meta = {
  en: {
    title: 'Translation House – Professional Sworn Translation Services',
    description:
      'Fast, certified translations to English, Polish, German, and 20+ languages. Same-day service available. Get a free quote in minutes.',
  },
  pl: {
    title: 'Translation House – Profesjonalne tłumaczenia przysięgłe',
    description:
      'Szybkie, certyfikowane tłumaczenia na angielski, polski, niemiecki i 20+ języków. Dostawa tego samego dnia. Bezpłatna wycena w kilka minut.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: langParam } = await params;
  const lang = (langParam === 'pl' ? 'pl' : 'en') as Lang;
  const m = meta[lang];
  return {
    title: m.title,
    description: m.description,
    openGraph: {
      type: 'website',
      title: m.title,
      description: m.description,
      images: [{ url: '/og-image.png' }],
    },
    alternates: {
      languages: {
        en: 'https://notarytranslation.ge/en',
        pl: 'https://notarytranslation.ge/pl',
      },
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { lang: langParam } = await params;
  if (langParam !== 'en' && langParam !== 'pl') redirect('/en');
  const lang = langParam as Lang;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        name: 'Translation House',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Poznanska 37',
          addressLocality: 'Warsaw',
          postalCode: '00-687',
          addressCountry: 'PL',
        },
        telephone: CONTACT.phone1.tel,
        email: CONTACT.email,
        url: 'https://notarytranslation.ge',
        openingHours: 'Mo-Su 00:00-24:00',
        priceRange: '$$',
      },
      {
        '@type': 'Service',
        name: lang === 'pl' ? 'Tłumaczenia przysięgłe' : 'Sworn Translation Services',
        serviceType: 'Translation Service',
        provider: {
          '@type': 'LocalBusiness',
          name: 'Translation House',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Warsaw',
            addressCountry: 'PL',
          },
        },
        areaServed: { '@type': 'City', name: 'Warsaw' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqData[lang].items.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main
        id="main"
        className="relative min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-16 sm:pt-20 pb-28 md:pb-0"
      >
        {/* ── Mobile landing (< md) ── */}
        <div className="md:hidden">
          <MobileLanding lang={lang} />
        </div>

        {/* ── Desktop hero + trust strip (≥ md) ── */}
        <div className="hidden md:block">
          <AnimatedSection direction="down">
            <div className="w-full">
              <CTABanner lang={lang} />
            </div>
          </AnimatedSection>
          <TrustStrip lang={lang} />
        </div>

        {/* Price Calculator & Upload Document */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
          <AnimatedSection direction="up" delay={0.2}>
            <section id="calculator" className="mb-8 sm:mb-10 md:mb-12">
              <TabbedCalculator lang={lang} />
            </section>
          </AnimatedSection>
        </div>

        {/* Testimonials */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pb-6 sm:pb-8 md:pb-10 lg:pb-12">
          <AnimatedSection direction="scale" delay={0.3}>
            <Testimonials lang={lang} />
          </AnimatedSection>
        </div>

        {/* How It Works */}
        <HowItWorks lang={lang} />

        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
          {/* About Us */}
          <AnimatedSection direction="left" delay={0.3}>
            <div className="mb-8 sm:mb-10 md:mb-12">
              <About lang={lang} />
            </div>
          </AnimatedSection>

          {/* Prices */}
          <AnimatedSection direction="right" delay={0.3}>
            <div className="mb-8 sm:mb-10 md:mb-12">
              <Prices lang={lang} />
            </div>
          </AnimatedSection>

          {/* Blog */}
          <AnimatedSection direction="up" delay={0.2}>
            <BlogStrip lang={lang} />
          </AnimatedSection>

          {/* FAQ */}
          <AnimatedSection direction="up" delay={0.2}>
            <FAQ lang={lang} />
          </AnimatedSection>
        </div>
      </main>

      {/* Sticky WhatsApp + Call bar — mobile only */}
      <MobileStickyBar lang={lang} />
    </>
  );
}
