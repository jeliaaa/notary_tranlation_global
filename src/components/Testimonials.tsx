'use client';

import { useEffect, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import type { Lang } from '@/lib/translations';
import AnimatedSection from './AnimatedSection';

interface Props {
  lang: Lang;
}

const testimonials = {
  en: [
    { name: 'George M.', role: 'Business Owner', text: 'Very satisfied with the service. I received a quick and high-quality translation.' },
    { name: 'Nino G.', role: 'Lawyer', text: 'Professional team and excellent service. I will definitely use their services again.' },
    { name: 'Levan K.', role: 'Manager', text: 'The notary approval service saved me a lot of time. Thank you!' },
  ],
  pl: [
    { name: 'Jerzy M.', role: 'Właściciel firmy', text: 'Bardzo zadowolony z usługi. Otrzymałem szybkie i wysokiej jakości tłumaczenie.' },
    { name: 'Nina G.', role: 'Prawnik', text: 'Profesjonalny zespół i doskonała obsługa. Na pewno skorzystam ponownie.' },
    { name: 'Leszek K.', role: 'Menadżer', text: 'Usługa poświadczenia notarialnego zaoszczędziła mi dużo czasu. Dziękuję!' },
  ],
};

const headings = {
  en: { title: 'Client Testimonials', subtitle: 'What our clients say about us' },
  pl: { title: 'Opinie klientów', subtitle: 'Co mówią o nas nasi klienci' },
};

const stats = {
  en: [
    { target: 500, suffix: '+', label: 'Happy Clients' },
    { target: 15, suffix: '+', label: 'Languages' },
    { target: 99, suffix: '%', label: 'Satisfaction Rate' },
    { target: 24, suffix: '/7', label: 'Support' },
  ],
  pl: [
    { target: 500, suffix: '+', label: 'Zadowolonych klientów' },
    { target: 15, suffix: '+', label: 'Języki' },
    { target: 99, suffix: '%', label: 'Satysfakcja' },
    { target: 24, suffix: '/7', label: 'Wsparcie' },
  ],
};

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Testimonials({ lang }: Props) {
  const h = headings[lang];
  const cards = testimonials[lang];
  const statItems = stats[lang];

  return (
    <section id="testimonials" className="py-16 sm:py-20 bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up" className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{h.title}</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto mb-4" />
          <p className="text-gray-500 text-lg">{h.subtitle}</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {cards.map(({ name, role, text }, i) => (
            <AnimatedSection key={name} direction="scale" delay={i * 0.2}>
              <div className="relative bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow overflow-hidden h-full flex flex-col">
                <div className="absolute top-4 right-4 text-indigo-100">
                  <Quote className="w-12 h-12" />
                </div>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed flex-grow mb-6">&ldquo;{text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold text-sm">
                    {name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{name}</p>
                    <p className="text-gray-500 text-xs">{role}</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-b-3xl" />
              </div>
            </AnimatedSection>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statItems.map(({ target, suffix, label }) => (
            <div key={label} className="text-center">
              <p className="text-4xl font-bold text-primary-600 mb-1">
                <CountUp target={target} suffix={suffix} />
              </p>
              <p className="text-gray-500 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
