'use client';

import { useState } from 'react';
import { Calculator, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Lang } from '@/lib/translations';
import PriceCalculator from './PriceCalculator';
import FileUploadForm from './FileUploadForm';

interface Props {
  lang: Lang;
}

const tabContent = {
  en: {
    tab1: 'Price Calculator',
    tab2: 'Upload Document',
    title1: 'Estimate Translation Cost Instantly',
    title2: 'Send Us Your Document For Free Quote',
    subtitle2: 'Quick response ~ 5 minutes',
  },
  pl: {
    tab1: 'Kalkulator cen',
    tab2: 'Prześlij dokument',
    title1: 'Natychmiastowa wycena tłumaczenia',
    title2: 'Wyślij dokument po bezpłatną wycenę',
    subtitle2: 'Szybka odpowiedź ~ 5 minut',
  },
};

export default function TabbedCalculator({ lang }: Props) {
  const [activeTab, setActiveTab] = useState<0 | 1>(0);
  const c = tabContent[lang];

  return (
    <section id="calculator" className="py-16 sm:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-white rounded-2xl shadow-xl border border-primary-100 overflow-hidden">
          <div className="absolute -top-8 -left-8 w-40 h-40 bg-primary-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-secondary-100 rounded-full blur-3xl opacity-60 pointer-events-none" />

          <div className="relative flex bg-gradient-to-r from-primary-50 to-secondary-50 border-b border-primary-100">
            {[c.tab1, c.tab2].map((tab, i) => {
              const Icon = i === 0 ? Calculator : Upload;
              return (
                <button
                  key={tab}
                  id={i === 1 ? 'tab-upload' : undefined}
                  onClick={() => setActiveTab(i as 0 | 1)}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-colors ${
                    activeTab === i
                      ? 'border-b-[3px] border-primary-500 text-primary-600 bg-white'
                      : 'text-gray-500 hover:text-primary-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="relative p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ x: activeTab === 0 ? -20 : 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: activeTab === 0 ? 20 : -20, opacity: 0 }}
                transition={{ duration: 0.22 }}
              >
                {activeTab === 0 ? (
                  <>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">{c.title1}</h2>
                    <PriceCalculator lang={lang} />
                  </>
                ) : (
                  <>
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-gray-900">{c.title2}</h2>
                      <p className="text-sm text-gray-500 mt-1">{c.subtitle2}</p>
                    </div>
                    <FileUploadForm lang={lang} />
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
