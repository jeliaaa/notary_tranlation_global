'use client';

import { useState, useRef } from 'react';
import { ChevronDown, Calculator, X, Clock, Mail, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Lang } from '@/lib/translations';
import { getT } from '@/lib/translations';
import { languages, languageNames } from '@/lib/data';
import { getLanguagePairPrice, calcTranslation, calcNotary, calcDelivery } from '@/lib/pricing';
import { CONTACT } from '@/lib/data';

interface Props {
  lang: Lang;
}

interface Result {
  basePrice: number;
  translationCost: number;
  discount: number;
  notaryCost: number | null;
  total: number;
  delivery: string;
}

export default function PriceCalculator({ lang }: Props) {
  const t = getT(lang);
  const names = languageNames[lang];

  const [from, setFrom] = useState('polish');
  const [to, setTo] = useState('english');
  const [pages, setPages] = useState(1);
  const [notary, setNotary] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  // Swipe-to-close
  const touchStartY = useRef(0);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const basePrice = getLanguagePairPrice(from, to);
    const { cost, discount } = calcTranslation(basePrice, pages);
    const notaryCost = notary ? calcNotary(pages) : null;
    const total = cost + (notaryCost ?? 0);
    const delivery = calcDelivery(pages, notary, lang);
    setResult({ basePrice, translationCost: cost, discount, notaryCost, total, delivery });
  };

  const handleEmailCopy = () => {
    navigator.clipboard.writeText(CONTACT.emailForCopy).catch(() => {});
    alert('Email copied');
  };
  const handlePhoneCopy = () => {
    navigator.clipboard.writeText(CONTACT.phone1.short).catch(() => {});
    alert('Number copied');
  };

  return (
    <>
      <form onSubmit={handleCalculate} className="space-y-5">
        {/* Source language */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.sourceLanguage}</label>
          <div className="relative">
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full appearance-none border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-xl px-4 py-3 pr-10 text-sm bg-white outline-none transition-colors"
              style={{ backgroundImage: 'none' }}
            >
              {languages.map((l) => (
                <option key={l} value={l}>{names[l]}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Target language */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.targetLanguage}</label>
          <div className="relative">
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full appearance-none border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-xl px-4 py-3 pr-10 text-sm bg-white outline-none transition-colors"
              style={{ backgroundImage: 'none' }}
            >
              {languages.map((l) => (
                <option key={l} value={l}>{names[l]}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Pages */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.pageCount}</label>
          <input
            type="number"
            min={1}
            value={pages}
            onChange={(e) => setPages(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
          />
        </div>

        {/* Notary */}
        {/* <div
          onClick={() => setNotary((v) => !v)}
          className="flex items-center gap-3 cursor-pointer border-2 border-gray-200 hover:border-primary-300 rounded-xl px-4 py-3 transition-colors select-none"
        >
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${notary ? 'bg-primary-500 border-primary-500' : 'border-gray-300'}`}>
            {notary && (
              <svg viewBox="0 0 12 12" className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <polyline points="1.5,6 5,9.5 10.5,2.5" />
              </svg>
            )}
          </div>
          <span className="text-sm font-medium text-gray-700">{t.notaryApproval}</span>
        </div> */}

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          <Calculator className="w-5 h-5" />
          {t.calculate}
        </button>
      </form>

      {/* Modal */}
      <AnimatePresence>
        {result && (
          <div
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
            onClick={() => setResult(null)}
          >
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="relative bg-white w-full max-w-md mx-auto rounded-t-2xl md:rounded-2xl shadow-2xl z-10 overflow-hidden"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => { touchStartY.current = e.touches[0].clientY; }}
              onTouchEnd={(e) => {
                const diff = e.changedTouches[0].clientY - touchStartY.current;
                if (diff > 100) setResult(null);
              }}
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-1 md:hidden">
                <div className="w-10 h-1 bg-gray-200 rounded-full" />
              </div>

              <div className="px-6 py-5">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-gray-900 text-lg">{t.translationDetails}</h3>
                  <button onClick={() => setResult(null)} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t.pricePerPage}</span>
                    <span className="font-medium">{result.basePrice} ₾</span>
                  </div>
                  {result.discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{t.discount}</span>
                      <span className="text-green-600 font-medium">-{result.discount.toFixed(2)} ₾</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t.translationCost}</span>
                    <span className="font-medium">{result.translationCost.toFixed(2)} ₾</span>
                  </div>
                  {result.notaryCost !== null && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{t.notaryCost}</span>
                      <span className="font-medium">{result.notaryCost.toFixed(2)} ₾</span>
                    </div>
                  )}
                  <div className="border-t border-gray-100 pt-3 flex justify-between">
                    <span className="font-bold text-gray-900 text-base">{t.totalPrice}</span>
                    <span className="font-bold text-primary-600 text-xl">{result.total.toFixed(2)} ₾</span>
                  </div>
                </div>

                {/* Delivery time */}
                <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3 mb-5">
                  <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">{t.estimatedDeliveryTime}</p>
                    <p className="text-sm font-medium text-gray-800">{result.delivery}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleEmailCopy}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    <Mail className="w-4 h-4" />
                    {t.copyEmail}
                  </button>
                  <button
                    onClick={handlePhoneCopy}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-green-600 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {t.copyPhone}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
