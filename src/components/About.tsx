'use client';

import { Calendar, Users, Languages, Briefcase, Upload, FileCheck, CheckCircle } from 'lucide-react';
import type { Lang } from '@/lib/translations';
import { getT } from '@/lib/translations';
import AnimatedSection from './AnimatedSection';

interface Props {
  lang: Lang;
}

const steps = {
  en: [
    { icon: Upload, title: 'Upload Your Document', desc: 'Send us your document via our online form or WhatsApp.' },
    { icon: FileCheck, title: 'We Translate & Certify', desc: 'Our certified translators complete the translation with notary stamp.' },
    { icon: CheckCircle, title: 'Receive Your Translation', desc: 'Pick up in person or receive by courier — same day available.' },
  ],
  pl: [
    { icon: Upload, title: 'Prześlij dokument', desc: 'Wyślij nam dokument przez formularz online lub WhatsApp.' },
    { icon: FileCheck, title: 'Tłumaczymy i poświadczamy', desc: 'Certyfikowani tłumacze wykonują tłumaczenie z pieczęcią notarialną.' },
    { icon: CheckCircle, title: 'Odbierz tłumaczenie', desc: 'Odbierz osobiście lub kurierem — dostawa tego samego dnia.' },
  ],
};

const howItWorks = { en: 'How It Works', pl: 'Jak to działa' };

const langValues = {
  en: 'English, Georgian, Russian, German, French, and others',
  pl: 'Angielski, Gruziński, Rosyjski, Niemiecki, Francuski i inne',
};

export default function About({ lang }: Props) {
  const t = getT(lang);

  const infoCards = [
    { icon: Calendar, color: 'text-primary-600', bg: 'bg-blue-50', title: t.foundationYear, value: '2023' },
    { icon: Users, color: 'text-green-600', bg: 'bg-green-50', title: t.translatorCount, value: '50+' },
    { icon: Languages, color: 'text-purple-600', bg: 'bg-purple-50', title: t.languages, value: langValues[lang] },
    { icon: Briefcase, color: 'text-rose-600', bg: 'bg-rose-50', title: t.specialization, value: t.specializationDetails },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up" className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{t.aboutTitle}</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto mb-4" />
          <p className="text-gray-500 text-lg">{t.detailedInfo}</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {infoCards.map(({ icon: Icon, color, bg, title, value }, i) => (
            <AnimatedSection key={title} direction="up" delay={i * 0.1}>
              <div className="rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow bg-white border border-gray-100 h-full">
                <div className={`inline-block p-3 rounded-xl shadow-sm mb-4 ${bg}`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <p className="text-sm text-gray-500 mb-1">{title}</p>
                <p className="font-semibold text-gray-800 text-sm leading-snug">{value}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection direction="up" className="text-center mb-10">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{howItWorks[lang]}</h3>
        </AnimatedSection>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="hidden md:block absolute top-10 h-0.5 bg-gradient-to-r from-primary-300 to-secondary-300 z-0" style={{ left: '16.67%', right: '16.67%' }} />
          {steps[lang].map(({ icon: Icon, title, desc }, i) => (
            <AnimatedSection key={title} direction="up" delay={i * 0.15} className="relative z-10">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mx-auto shadow-xl">
                    <Icon className="w-9 h-9 text-white" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h4 className="font-bold text-gray-900 text-lg mb-2">{title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
