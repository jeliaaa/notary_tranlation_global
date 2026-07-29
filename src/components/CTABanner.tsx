'use client';

import { Upload, Calculator, Clock, Zap, MessageCircle } from 'lucide-react';
import type { Lang } from '@/lib/translations';
import { waUrl } from '@/lib/data';
import { useCurrency } from '@/lib/currency-context';

interface Props {
  lang: Lang;
}

const translations = {
  title: {
    en: 'Sworn translation for official documents. Ready the same day.',
    pl: 'Tłumaczenie przysięgłe dokumentów urzędowych. Gotowe tego samego dnia.',
  },
  subtitle: {
    en: 'Certified sworn translations for passports, diplomas, and official documents. Trusted by 500+ clients.',
    pl: 'Certyfikowane tłumaczenia przysięgłe paszportów, dyplomów i dokumentów urzędowych. Zaufało nam ponad 500 klientów.',
  },
  priceHintPrefix: {
    en: 'Starting from',
    pl: 'Już od',
  },
  priceHintSuffix: {
    en: '/page',
    pl: '/strona',
  },
  primaryCTA: {
    en: 'Upload Document Now',
    pl: 'Prześlij dokument teraz',
  },
  secondaryCTA: {
    en: 'Calculate Price',
    pl: 'Oblicz cenę',
  },
  whatsappCTA: {
    en: 'Chat on WhatsApp',
    pl: 'Napisz na WhatsApp',
  },
  certified: {
    en: 'Sworn & Certified',
    pl: 'Przysięgłe i poświadczone',
  },
  trustBadges: {
    en: [
      { label: 'Sworn Translations', icon: 'shield' },
      { label: '5-min Response', icon: 'clock' },
      { label: 'Same Day Delivery', icon: 'zap' },
    ],
    pl: [
      { label: 'Tłumaczenia przysięgłe', icon: 'shield' },
      { label: 'Odpowiedź w 5 minut', icon: 'clock' },
      { label: 'Dostawa tego samego dnia', icon: 'zap' },
    ],
  },
} as const;

const startingPrice = { PLN: 50, EUR: 12 } as const;

const BadgeIcon = ({ type }: { type: string }) => {
  if (type === 'clock') return <Clock className="w-4 h-4 text-primary-600" />;
  return <Zap className="w-4 h-4 text-primary-600" />;
};

export default function CTABanner({ lang }: Props) {
  const { currency, formatPrice } = useCurrency();

  const scrollToCalculator = () => {
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToUpload = () => {
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      const uploadTabButton = document.querySelector<HTMLButtonElement>('[data-tab="upload"]');
      if (uploadTabButton) uploadTabButton.click();
    }, 700);
  };

  const badges = translations.trustBadges[lang] ?? translations.trustBadges.en;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #ec4899 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left — Content */}
          <div className="space-y-6 sm:space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {translations.title[lang]}
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              {translations.subtitle[lang]}
            </p>

            <p className="text-lg sm:text-xl font-semibold text-primary-600">
              {translations.priceHintPrefix[lang]} {formatPrice(startingPrice[currency])}
              {translations.priceHintSuffix[lang]}
            </p>

            <div className="space-y-5">
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={scrollToUpload}
                  className="px-6 py-3.5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-semibold hover:from-primary-600 hover:to-secondary-600 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-primary-200/50 text-sm sm:text-base flex items-center justify-center"
                >
                  <Upload className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                  {translations.primaryCTA[lang]}
                </button>

                <button
                  onClick={scrollToCalculator}
                  className="px-6 py-3.5 border-2 border-primary-300 text-primary-600 rounded-xl font-semibold hover:bg-primary-50 transition-all duration-300 text-sm sm:text-base flex items-center justify-center"
                >
                  <Calculator className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                  {translations.secondaryCTA[lang]}
                </button>
              </div>

              {/* WhatsApp CTA */}
              <a
                id="wa-btn-cta"
                href={waUrl(lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                {translations.whatsappCTA[lang]}
              </a>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3">
                {badges.map((badge, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 bg-white border border-gray-100 shadow-sm rounded-full px-3 py-1.5"
                  >
                    <BadgeIcon type={badge.icon} />
                    <span className="text-xs sm:text-sm font-medium text-gray-700">
                      {badge.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Document translation animation (desktop only) */}
          <div
            className="hidden lg:flex items-center justify-center relative h-96 lg:h-[500px]"
            style={{ animation: 'nt-enter-right 0.8s ease-out 0.4s both' }}
          >
            {/* Outer glow ring */}
            <div
              className="absolute w-80 h-80 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)',
                animation: 'nt-pulse-ring 5s ease-in-out infinite',
              }}
            />

            {/* Source document — left, tilted */}
            <div
              className="absolute left-4 top-16 w-44 h-56 rounded-2xl bg-white shadow-xl border border-gray-100 p-4 flex flex-col gap-2"
              style={{ animation: 'nt-float-l 6s ease-in-out infinite' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-4 rounded-sm bg-gradient-to-r from-blue-500 to-red-500 opacity-80" />
                <div className="h-2 w-16 rounded-full bg-gray-200" />
              </div>
              <div className="h-2 w-full rounded-full bg-gray-100" />
              <div className="h-2 w-5/6 rounded-full bg-gray-100" />
              <div className="h-2 w-full rounded-full bg-gray-100" />
              <div className="h-2 w-4/5 rounded-full bg-gray-100" />
              <div className="h-2 w-full rounded-full bg-gray-100" />
              <div className="h-2 w-3/4 rounded-full bg-gray-100" />
              <div className="h-2 w-full rounded-full bg-gray-100" />
              <div className="h-2 w-5/6 rounded-full bg-gray-100" />
              <div className="mt-auto self-end w-10 h-10 rounded-full border-2 border-primary-300 flex items-center justify-center opacity-40">
                <div className="w-6 h-6 rounded-full border border-primary-400" />
              </div>
            </div>

            {/* Animated arrows in the center */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-10"
              style={{ animation: 'nt-arrow 1.2s ease-in-out infinite' }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-4 h-4 border-r-2 border-b-2 border-primary-400 rotate-[-45deg]"
                  style={{ animation: 'nt-fade-chevron 1.2s ease-in-out infinite', animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>

            {/* Translated document — right, tilted other way */}
            <div
              className="absolute right-4 top-16 w-44 h-56 rounded-2xl bg-white shadow-xl border border-primary-100 p-4 flex flex-col gap-2"
              style={{ animation: 'nt-float-r 6s ease-in-out infinite', animationDelay: '0.5s' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-4 rounded-sm bg-white border border-gray-200 flex items-center justify-center">
                  <span style={{ fontSize: 8, lineHeight: 1 }}>🇵🇱</span>
                </div>
                <div className="h-2 w-16 rounded-full bg-primary-100" />
              </div>
              <div className="h-2 w-full rounded-full bg-primary-50" />
              <div className="h-2 w-5/6 rounded-full bg-primary-50" />
              <div className="h-2 w-full rounded-full bg-primary-50" />
              <div className="h-2 w-4/5 rounded-full bg-primary-50" />
              <div className="h-2 w-full rounded-full bg-primary-50" />
              <div className="h-2 w-3/4 rounded-full bg-primary-50" />
              <div className="h-2 w-full rounded-full bg-primary-50" />
              <div className="h-2 w-5/6 rounded-full bg-primary-50" />
              <div className="mt-auto self-end w-10 h-10 rounded-full border-2 border-primary-500 flex items-center justify-center bg-primary-50">
                <div
                  className="w-6 h-6 rounded-full bg-primary-400"
                  style={{ animation: 'nt-stamp-pulse 2s ease-in-out infinite' }}
                />
              </div>
            </div>

            {/* Certified badge floating below */}
            <div
              className="absolute bottom-12 left-1/2 bg-white border border-green-200 shadow-lg rounded-full px-4 py-2 flex items-center gap-2 whitespace-nowrap"
              style={{ animation: 'nt-bob 3s ease-in-out infinite', animationDelay: '1s' }}
            >
              <div
                className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center"
                style={{ animation: 'nt-badge-pulse 1.5s ease-in-out infinite' }}
              >
                <svg viewBox="0 0 12 12" width="10" height="10" fill="white">
                  <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-700">{translations.certified[lang]}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
