'use client';

import { Check, Info } from 'lucide-react';
import type { Lang } from '@/lib/translations';
import { languageNames } from '@/lib/data';
import { useCurrency } from '@/lib/currency-context';

interface Props {
  lang: Lang;
}

const priceGroupDefs = [
  { tier: 'cheap' as const, langs: ['english', 'russian'] },
  { tier: 'standard' as const, langs: ['turkish', 'armenian'] },
  { tier: 'standard' as const, langs: ['azerbaijani'] },
  { tier: 'standard' as const, langs: ['german', 'french', 'italian', 'latvian'] },
  { tier: 'standard' as const, langs: ['slovak'] },
  { tier: 'standard' as const, langs: ['spanish', 'portuguese', 'dutch', 'hebrew'] },
  { tier: 'standard' as const, langs: ['arabic'] },
  { tier: 'standard' as const, langs: ['chinese'] },
  { tier: 'standard' as const, langs: ['japanese', 'korean'] },
];

const tierPrices = {
  PLN: { cheap: 50, standard: 99 },
  EUR: { cheap: 12, standard: 23 },
};

const content = {
  en: {
    title: 'Translation Prices',
    subtitle: 'Detailed information about our pricing',
    pricePerPage: 'Price per Page',
    languages: 'Languages',
    notaryTitle: 'Notary Approval Pricing',
    discountTitle: 'Discounts',
  },
  pl: {
    title: 'Ceny tłumaczeń',
    subtitle: 'Szczegółowe informacje o naszych cenach',
    pricePerPage: 'Cena za stronę',
    languages: 'Języki',
    notaryTitle: 'Cennik poświadczenia notarialnego',
    discountTitle: 'Rabaty',
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

export default function Prices({ lang }: Props) {
  const t = content[lang] ?? content.en;
  const names = languageNames[lang];
  const { currency, formatPrice } = useCurrency();

  // Group languages by price
  const grouped = new Map<number, string[]>();
  for (const g of priceGroupDefs) {
    const price = tierPrices[currency][g.tier];
    const existing = grouped.get(price) ?? [];
    existing.push(...g.langs);
    grouped.set(price, existing);
  }
  const priceGroups = Array.from(grouped.entries()).sort(([a], [b]) => a - b);

  return (
    <section id="prices" className="py-16 bg-gradient-to-br from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto mb-4" />
          <p className="text-xl text-gray-600">{t.subtitle}</p>
        </div>

        {/* Main Pricing Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-primary-600">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">{t.pricePerPage}</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">{t.languages}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {priceGroups.map(([price, langs]) => (
                  <tr key={price} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-lg font-semibold text-primary-600">{formatPrice(price)}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {langs.map((l) => names[l as keyof typeof names]).join(', ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Information Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Notary Pricing */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <Info className="w-6 h-6 text-primary-600 mr-2" />
              <h3 className="text-xl font-semibold text-gray-900">{t.notaryTitle}</h3>
            </div>
            <ul className="space-y-3">
              {notaryData[currency][lang].map((line) => (
                <li key={line} className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-600">{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Discounts */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <Info className="w-6 h-6 text-primary-600 mr-2" />
              <h3 className="text-xl font-semibold text-gray-900">{t.discountTitle}</h3>
            </div>
            <ul className="space-y-3">
              {discountLines[lang].map((line) => (
                <li key={line} className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-600">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
