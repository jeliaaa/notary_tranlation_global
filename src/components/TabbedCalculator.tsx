'use client';

import { useState } from 'react';
import { Calculator, Upload } from 'lucide-react';
import type { Lang } from '@/lib/translations';
import PriceCalculator from './PriceCalculator';
import FileUploadForm from './FileUploadForm';

interface Props {
  lang: Lang;
}

const tabTranslations = {
  calculator: {
    en: 'Price Calculator',
    pl: 'Kalkulator cen',
  },
  upload: {
    en: 'Upload Document',
    pl: 'Prześlij dokument',
  },
  uploadTitle: {
    en: 'Send Us Your Document For Free Quote',
    pl: 'Wyślij dokument po bezpłatną wycenę',
  },
  uploadSubtitle: {
    en: 'Quick response ~ 5 minutes',
    pl: 'Szybka odpowiedź ~ 5 minut',
  },
  calculatorTitle: {
    en: 'Estimate Translation Cost Instantly',
    pl: 'Natychmiastowa wycena tłumaczenia',
  },
} as const;

export default function TabbedCalculator({ lang }: Props) {
  const [activeTab, setActiveTab] = useState<'calculator' | 'upload'>('calculator');

  return (
    <div
      className="bg-white rounded-2xl shadow-xl border border-primary-100 overflow-hidden relative"
      id="calculator-tabs"
    >
      {/* Spotlight Effect */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary-100 rounded-full opacity-30 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-secondary-100 rounded-full opacity-30 blur-3xl" />

      {/* Tab Headers */}
      <div className="flex border-b border-gray-200 bg-gradient-to-r from-primary-50 to-secondary-50">
        <button
          onClick={() => setActiveTab('calculator')}
          data-tab="calculator"
          className={`flex-1 px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-medium sm:font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 ${
            activeTab === 'calculator'
              ? 'border-b-3 border-primary-500 text-primary-600 bg-white'
              : 'text-gray-500 hover:text-primary-600 hover:bg-white/50'
          }`}
        >
          <div className="flex items-center justify-center space-x-1 sm:space-x-2">
            <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{tabTranslations.calculator[lang]}</span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('upload')}
          data-tab="upload"
          id="tab-upload"
          className={`flex-1 px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-medium sm:font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 ${
            activeTab === 'upload'
              ? 'border-b-3 border-primary-500 text-primary-600 bg-white'
              : 'text-gray-500 hover:text-primary-600 hover:bg-white/50'
          }`}
        >
          <div className="flex items-center justify-center space-x-1 sm:space-x-2">
            <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{tabTranslations.upload[lang]}</span>
          </div>
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-4 sm:p-6 md:p-8 relative z-10">
        {activeTab === 'calculator' && (
          <div key="calculator" className="nt-tab-in">
            <div className="text-center mb-5">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-600 mb-2">
                {tabTranslations.calculatorTitle[lang]}
              </h3>
            </div>
            <PriceCalculator lang={lang} />
          </div>
        )}

        {activeTab === 'upload' && (
          <div key="upload" className="nt-tab-in">
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-600 mb-2">
                  {tabTranslations.uploadTitle[lang]}
                </h3>
                <p className="text-sm sm:text-base text-primary-600 font-medium flex items-center justify-center">
                  <span className="inline-block mr-2">⚡</span>
                  {tabTranslations.uploadSubtitle[lang]}
                </p>
              </div>

              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-3 sm:p-4 md:p-6 border border-primary-100">
                <FileUploadForm lang={lang} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="hidden md:block absolute top-0 right-0 w-32 h-32 overflow-hidden pointer-events-none">
        <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full opacity-50" />
      </div>
      <div className="hidden md:block absolute bottom-0 left-0 w-24 h-24 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-tr from-secondary-200 to-primary-200 rounded-full opacity-40" />
      </div>
    </div>
  );
}
