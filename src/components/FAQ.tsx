'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Lang } from '@/lib/translations';
import AnimatedSection from './AnimatedSection';

interface Props {
  lang: Lang;
}

const faqData = {
  en: {
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know about our translation services',
    items: [
      { q: 'How long does a translation house translation take?', a: 'Standard translations are usually completed within 1–2 business days. Express same-day service is available for urgent documents — contact us for details.' },
      { q: 'What documents can you translate?', a: 'We translate all official documents including passports, birth certificates, marriage certificates, diplomas, contracts, medical records, court documents, and more.' },
      { q: 'What is the price per page?', a: 'Prices start from 50zł (12€) per page for English/Russian translations, and vary by language. Use our price calculator for an exact estimate.' },
      { q: 'Do you provide certified translations?', a: 'Yes. All our translations are certified, making them legally valid for official use in Poland and internationally.' },
      { q: 'Can I submit a document online?', a: 'Absolutely. Upload your document through our online form or send it via WhatsApp. We will review it and send you a price quote within 5 minutes.' },
      { q: 'Do you translate to languages other than Polish?', a: 'Yes — we translate between 20+ language pairs including English, Russian, German, French, Turkish, Armenian, Arabic, Chinese, and many more.' },
    ],
  },
  pl: {
    title: 'Często zadawane pytania',
    subtitle: 'Wszystko, co musisz wiedzieć o naszych usługach tłumaczeniowych',
    items: [
      { q: 'Jak długo trwa tłumaczenie notarialne?', a: 'Standardowe tłumaczenia są zazwyczaj gotowe w ciągu 1–2 dni roboczych. Dostępna jest usługa ekspresowa na ten sam dzień — skontaktuj się z nami w celu uzyskania szczegółów.' },
      { q: 'Jakie dokumenty możecie przetłumaczyć?', a: 'Tłumaczymy wszystkie oficjalne dokumenty, w tym paszporty, akty urodzenia, akty małżeństwa, dyplomy, umowy, dokumentację medyczną, dokumenty sądowe i wiele innych.' },
      { q: 'Jaka jest cena za stronę?', a: 'Ceny zaczynają się od 50zł (12€) za stronę w przypadku tłumaczeń z języka angielskiego/rosyjskiego i różnią się w zależności od języka. Użyj naszego kalkulatora cen, aby uzyskać dokładną wycenę.' },
      { q: 'Czy oferujecie certyfikowane tłumaczenia notarialne?', a: 'Tak. Wszystkie nasze tłumaczenia są certyfikowane, co czyni je prawnie ważnymi do oficjalnego użytku w Polsce i na arenie międzynarodowej.' },
      { q: 'Czy mogę przesłać dokument online?', a: 'Oczywiście. Prześlij swój dokument przez nasz formularz online lub wyślij go przez WhatsApp. Przejrzymy go i wyślemy wycenę w ciągu 5 minut.' },
      { q: 'Czy tłumaczycie na języki inne niż polski?', a: 'Tak — pracujemy z ponad 20 parami językowymi, w tym angielskim, rosyjskim, niemieckim, francuskim, tureckim, ormiańskim, arabskim, chińskim i wieloma innymi.' },
    ],
  },
};

export default function FAQ({ lang }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const data = faqData[lang];

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up" className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{data.title}</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto mb-4" />
          <p className="text-gray-500 text-lg">{data.subtitle}</p>
        </AnimatedSection>

        <div className="space-y-3">
          {data.items.map(({ q, a }, i) => (
            <AnimatedSection key={q} direction="up" delay={i * 0.07}>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-primary-50 transition-colors text-left"
                >
                  <span className="font-medium text-gray-900 text-sm pr-4">{q}</span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 text-gray-600 bg-white border-t border-gray-100 leading-relaxed text-sm">
                        {a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
