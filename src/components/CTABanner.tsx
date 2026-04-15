'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Upload, Calculator, ShieldCheck, Clock, Zap } from 'lucide-react';
import type { Lang } from '@/lib/translations';

interface Props {
  lang: Lang;
}

const content = {
  en: {
    heading: 'Professional Translation House Services',
    subtitle: 'Fast, accurate, and certified translations for all your official documents. Trusted by thousands of clients in Tbilisi.',
    uploadBtn: 'Upload Document Now',
    calcBtn: 'Calculate Price',
    badges: [
      { icon: ShieldCheck, label: 'Certified Translations' },
      { icon: Clock, label: '5-min Response' },
      { icon: Zap, label: 'Same Day Delivery' },
    ],
  },
  pl: {
    heading: 'Profesjonalne Usługi Tłumaczenia Notarialnego',
    subtitle: 'Szybkie, dokładne i certyfikowane tłumaczenia wszystkich oficjalnych dokumentów. Zaufało nam tysiące klientów w Tbilisi.',
    uploadBtn: 'Prześlij dokument teraz',
    calcBtn: 'Oblicz cenę',
    badges: [
      { icon: ShieldCheck, label: 'Certyfikowane tłumaczenia' },
      { icon: Clock, label: 'Odpowiedź w 5 minut' },
      { icon: Zap, label: 'Dostawa tego samego dnia' },
    ],
  },
};

const scrollToSection = (id: string, delay = 0) => {
  setTimeout(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top, behavior: 'smooth' });
  }, delay);
};

export default function CTABanner({ lang }: Props) {
  const c = content[lang];

  const handleUpload = () => {
    scrollToSection('calculator');
    setTimeout(() => {
      const uploadTabBtn = document.getElementById('tab-upload');
      if (uploadTabBtn) uploadTabBtn.click();
    }, 700);
  };

  return (
    <section
      id="main"
      className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #ec4899 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          opacity: 0.04,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <Image src="/logo.svg" alt="Translation House" width={280} height={132} priority />
            </motion.div>

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
            >
              {c.heading}
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8"
            >
              {c.subtitle}
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <button
                onClick={handleUpload}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary-200"
              >
                <Upload className="w-5 h-5" />
                {c.uploadBtn}
              </button>
              <button
                onClick={() => scrollToSection('calculator')}
                className="flex items-center justify-center gap-2 border-2 border-primary-300 text-primary-600 px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-primary-50 transition-colors"
              >
                <Calculator className="w-5 h-5" />
                {c.calcBtn}
              </button>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-2"
            >
              {c.badges.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 bg-white border border-gray-100 shadow-sm rounded-full px-3 py-1.5 text-sm text-gray-700"
                >
                  <Icon className="w-4 h-4 text-primary-500" />
                  {label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right column — illustration */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-96 h-96">
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-200 to-secondary-200 opacity-40"
                animate={{ scale: [1, 1.05, 1], rotate: [0, 10, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute top-8 left-8 w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 shadow-xl"
                animate={{ y: [0, -12, 0], rotate: [0, 45, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute bottom-10 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-secondary-400 to-secondary-600 shadow-xl"
                animate={{ y: [0, 14, 0], x: [0, -8, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute top-1/2 right-4 w-12 h-12 rotate-45 bg-gradient-to-br from-primary-300 to-secondary-300 shadow-lg"
                animate={{ rotate: [45, 90, 45] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute top-16 right-12 w-32 bg-white rounded-xl shadow-xl p-3 -rotate-6"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="h-2 bg-gray-200 rounded mb-2 w-3/4" />
                <div className="h-2 bg-gray-100 rounded mb-2" />
                <div className="h-2 bg-gray-100 rounded w-5/6" />
                <div className="h-2 bg-gray-100 rounded mt-2 w-2/3" />
              </motion.div>
              <motion.div
                className="absolute bottom-20 left-10 w-28 bg-white rounded-xl shadow-xl p-3 rotate-6"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <div className="h-2 bg-primary-200 rounded mb-2 w-2/3" />
                <div className="h-2 bg-gray-100 rounded mb-2" />
                <div className="h-2 bg-gray-100 rounded w-4/5" />
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-white shadow-2xl flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" stroke="currentColor" strokeWidth={2}>
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
