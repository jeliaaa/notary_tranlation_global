'use client';

import { Info, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Lang } from '@/lib/translations';
import { getT } from '@/lib/translations';
import { languageNames } from '@/lib/data';
import AnimatedSection from './AnimatedSection';

interface Props {
  lang: Lang;
}

const priceGroups = [
  { price: 22.5, langs: ['english', 'russian'] },
  { price: 25, langs: ['turkish', 'armenian'] },
  { price: 27.5, langs: ['azerbaijani'] },
  { price: 35, langs: ['german', 'french', 'italian', 'latvian'] },
  { price: 37.5, langs: ['slovak'] },
  { price: 50, langs: ['spanish', 'portuguese', 'dutch', 'jewish'] },
  { price: 57.5, langs: ['arabic'] },
  { price: 72.5, langs: ['chinese'] },
  { price: 100, langs: ['japanese', 'korean'] },
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

const notaryLines = {
  en: ['1 page: 6 ₾', '2–10 pages: 4 ₾ per page', '11–50 pages: 3 ₾ per page', '51+ pages: 2 ₾ per page'],
  pl: ['1 strona: 6 ₾', '2–10 stron: 4 ₾ za stronę', '11–50 stron: 3 ₾ za stronę', '51+ stron: 2 ₾ za stronę'],
};

const discountLines = {
  en: ['10% discount for 50+ pages', '15% discount for 100+ pages'],
  pl: ['10% rabatu dla 50+ stron', '15% rabatu dla 100+ stron'],
};

export default function Prices({ lang }: Props) {
  const t = getT(lang);
  const h = headings[lang];
  const names = languageNames[lang];

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
                      <td className="py-3.5 px-6 text-lg font-semibold text-primary-600">{price} ₾</td>
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
          {/* <AnimatedSection direction="left" delay={0.15}>
            <div className="bg-white rounded-2xl shadow-lg p-6 h-full">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-primary-500" />
                <h3 className="font-bold text-gray-900">{h.notaryTitle}</h3>
              </div>
              <ul className="space-y-2">
                {notaryLines[lang].map((line) => (
                  <li key={line} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection> */}

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
