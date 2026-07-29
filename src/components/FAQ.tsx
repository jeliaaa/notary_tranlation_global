'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Lang } from '@/lib/translations';
import { faqData } from '@/lib/faq';

interface Props {
  lang: Lang;
}

const FAQItem = ({
  q,
  a,
  isOpen,
  onToggle,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div className="border border-gray-200 rounded-xl overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-primary-50 transition-colors duration-200"
      aria-expanded={isOpen}
    >
      <span className="font-semibold text-gray-900 pr-4 text-sm sm:text-base">{q}</span>
      <span
        className="flex-shrink-0 inline-flex"
        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
      >
        <ChevronDown className="w-5 h-5 text-primary-500" />
      </span>
    </button>
    <div
      style={{
        overflow: 'hidden',
        maxHeight: isOpen ? '500px' : 0,
        opacity: isOpen ? 1 : 0,
        transition: 'max-height 0.25s ease-in-out, opacity 0.2s ease-in-out',
      }}
    >
      <div className="px-5 pb-5 pt-1 text-gray-600 bg-white border-t border-gray-100 leading-relaxed text-sm sm:text-base">
        {a}
      </div>
    </div>
  </div>
);

export default function FAQ({ lang }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const data = faqData[lang] ?? faqData.en;

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">{data.heading}</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto mt-4 mb-4" />
          <p className="text-gray-600 text-lg">{data.subheading}</p>
        </div>

        <div className="space-y-3">
          {data.items.map((item, i) => (
            <FAQItem
              key={i}
              q={item.q}
              a={item.a}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
