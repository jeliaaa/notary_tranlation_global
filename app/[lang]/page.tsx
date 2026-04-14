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

interface Props {
  params: Promise<{ lang: string }>;
}

const meta = {
  en: {
    title: 'NotaryTranslation – Professional Notary Translation Services in Tbilisi',
    description: 'Fast, certified translations from Georgian to English, Polish, German, and 20+ languages. Same-day service available. Get a free quote in minutes.',
  },
  pl: {
    title: 'NotaryTranslation – Profesjonalne usługi tłumaczenia notarialnego w Tbilisi',
    description: 'Szybkie, certyfikowane tłumaczenia z języka gruzińskiego na angielski, polski, niemiecki i 20+ języków. Dostawa tego samego dnia. Bezpłatna wycena w kilka minut.',
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

const faqItems = {
  en: [
    { q: 'How long does a notary translation take?', a: 'Standard translations are usually completed within 1–2 business days. Express same-day service is available for urgent documents.' },
    { q: 'What documents can you translate?', a: 'We translate all official documents including passports, birth certificates, marriage certificates, diplomas, contracts, medical records, and court documents.' },
    { q: 'What is the price per page?', a: 'Prices start from 22.5 ₾ per page for English/Russian translations and vary by language.' },
    { q: 'Do you provide certified / notarized translations?', a: 'Yes. All our translations can be notarially certified, making them legally valid for official use in Georgia and internationally.' },
    { q: 'Can I submit a document online?', a: 'Absolutely. Upload your document through our online form or send it via WhatsApp.' },
    { q: 'Do you translate to languages other than Georgian?', a: 'Yes — we translate between 20+ language pairs including English, Polish, German, French, Turkish, Armenian, Arabic, Chinese, and many more.' },
  ],
  pl: [
    { q: 'Jak długo trwa tłumaczenie notarialne?', a: 'Standardowe tłumaczenia są zazwyczaj gotowe w ciągu 1–2 dni roboczych. Dostępna jest usługa ekspresowa na ten sam dzień.' },
    { q: 'Jakie dokumenty możecie przetłumaczyć?', a: 'Tłumaczymy wszystkie oficjalne dokumenty, w tym paszporty, akty urodzenia, akty małżeństwa, dyplomy, umowy, dokumentację medyczną i dokumenty sądowe.' },
    { q: 'Jaka jest cena za stronę?', a: 'Ceny zaczynają się od 22,5 ₾ za stronę i różnią się w zależności od języka.' },
    { q: 'Czy oferujecie certyfikowane tłumaczenia notarialne?', a: 'Tak. Wszystkie nasze tłumaczenia mogą być poświadczone notarialnie, co czyni je prawnie ważnymi.' },
    { q: 'Czy mogę przesłać dokument online?', a: 'Oczywiście. Prześlij swój dokument przez nasz formularz online lub wyślij go przez WhatsApp.' },
    { q: 'Czy tłumaczycie na języki inne niż gruziński?', a: 'Tak — pracujemy z ponad 20 parami językowymi, w tym angielskim, polskim, niemieckim, francuskim, tureckim i wieloma innymi.' },
  ],
};

export default async function HomePage({ params }: Props) {
  const { lang: langParam } = await params;
  if (langParam !== 'en' && langParam !== 'pl') redirect('/en');
  const lang = langParam as Lang;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        name: 'NotaryTranslation',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '7 Kotne Dadiani St.',
          addressLocality: 'Tbilisi',
          addressCountry: 'GE',
        },
        telephone: '+995591729911',
        email: 'info@th.com.ge',
        url: 'https://notarytranslation.ge',
        openingHours: 'Mo-Su 00:00-24:00',
        priceRange: '₾₾',
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems[lang].map(({ q, a }) => ({
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
      <div className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-16 sm:pt-20">
        <CTABanner lang={lang} />
        <TrustStrip lang={lang} />
        <TabbedCalculator lang={lang} />
        <About lang={lang} />
        <Prices lang={lang} />
        <Testimonials lang={lang} />
        <FAQ lang={lang} />
      </div>
    </>
  );
}
