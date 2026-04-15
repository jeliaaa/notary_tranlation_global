'use client';

import { Info, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Lang } from '@/lib/translations';
import { getT } from '@/lib/translations';
import { languageNames } from '@/lib/data';
import { useCurrency } from '@/lib/currency-context';
import AnimatedSection from './AnimatedSection';

interface Props {
  lang: Lang;
}

const priceGroupDefs = [
  { tier: 'cheap' as const, langs: ['english', 'russian'] },
  { tier: 'standard' as const, langs: ['turkish', 'armenian'] },
  { tier: 'standard' as const, langs: ['azerbaijani'] },
  { tier: 'standard' as const, langs: ['german', 'french', 'italian', 'latvian'] },
  { tier: 'standard' as const, langs: ['slovak'] },
  { tier: 'standard' as const, langs: ['spanish', 'portuguese', 'dutch', 'jewish'] },
  { tier: 'standard' as const, langs: ['arabic'] },
  { tier: 'standard' as const, langs: ['chinese'] },
  { tier: 'standard' as const, langs: ['japanese', 'korean'] },
];

const headings = {
  en: {
    title: 'Translation Prices',
    subtitle: 'Detailed information about our pricing',
    pricePerPage: 'Price per Page',
    languages: 'Languages',
    notaryTitle: 'Notary Approval Pricing',
    discountTitle: 'Volume Discounts',
  },
  pl: {
    title: 'Ceny tłumaczeń',
    subtitle: 'Szczegółowe informacje o naszych cenach',
    pricePerPage: 'Cena za stronę',
    languages: 'Języki',
    notaryTitle: 'Cennik poświadczenia notarialnego',
    discountTitle: 'Rabaty za ilość',
  },
};

const notaryData = {
  PLN: {
    en: ['1 page: 8 zł', '2–10 pages: 6 zł per page', '11–50 pages: 4 zł per page', '51+ pages: 3 zł per page'],
    pl: ['1 strona: 8 zł', '2–10 stron: 6 zł za stronę', '11–50 stron: 4 zł za stronę', '51+ stron: 3 zł za stronę'],
  },
  EUR: {
    en: ['1 page: €2', '2–10 pages: €1.50 per page', '11–50 pages: €1 per page', '51+ pages: €0.75 per page'],
    pl: ['1 strona: €2', '2–10 stron: €1,50 za stronę', '11–50 stron: €1 za stronę', '51+ stron: €0,75 za stronę'],
  },
};

const discountLines = {
  en: ['10% discount for 50+ pages', '15% discount for 100+ pages'],
  pl: ['10% rabatu dla 50+ stron', '15% rabatu dla 100+ stron'],
};

const tierPrices = {
  PLN: { cheap: 50, standard: 99 },
  EUR: { cheap: 12, standard: 23 },
};

export default function Prices({ lang }: Props) {
  const t = getT(lang);
  const h = headings[lang];
  const names = languageNames[lang];
  const { currency, formatPrice } = useCurrency();

  // Deduplicate groups by price (all "standard" languages collapse into one row)
  const grouped = new Map<number, string[]>();
  for (const g of priceGroupDefs) {
    const price = tierPrices[currency][g.tier];
    const existing = grouped.get(price) ?? [];
    existing.push(...g.langs);
    grouped.set(price, existing);
  }
  const priceGroups = Array.from(grouped.entries()).map(([price, langs]) => ({ price, langs }));

  return (
    <section id="prices" className="py-16 sm:py-20 bg-gradient-to-br from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up" className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{h.title}</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto mb-4" />
          <p className="text-gray-500 text-lg">{h.subtitle}</p>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.1}>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary-600 text-white">
                    <th className="py-4 px-6 text-left text-sm font-semibold">{h.pricePerPage}</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold">{h.languages}</th>
                  </tr>
                </thead>
                <tbody>
                  {priceGroups.map(({ price, langs }, idx) => (
                    <motion.tr
                      key={price}
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08 }}
                      className={`border-b border-gray-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    >
                      <td className="py-3.5 px-6 text-lg font-semibold text-primary-600">{formatPrice(price)}</td>
                      <td className="py-3.5 px-6 text-gray-700 text-sm">
                        {langs.map((l) => names[l as keyof typeof names]).join(', ')}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatedSection direction="left" delay={0.15}>
            <div className="bg-white rounded-2xl shadow-lg p-6 h-full">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-primary-500" />
                <h3 className="font-bold text-gray-900">{h.notaryTitle}</h3>
              </div>
              <ul className="space-y-2">
                {notaryData[currency][lang].map((line) => (
                  <li key={line} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.15}>
            <div className="bg-white rounded-2xl shadow-lg p-6 h-full">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-secondary-500" />
                <h3 className="font-bold text-gray-900">{h.discountTitle}</h3>
              </div>
              <ul className="space-y-2">
                {discountLines[lang].map((line) => (
                  <li key={line} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
