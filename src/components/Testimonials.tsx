'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Lang } from '@/lib/translations';
import { CONTACT } from '@/lib/data';

interface Props {
  lang: Lang;
}

/* ── Animated counter ── */
const useCountUp = (target: number, duration = 1500) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return [count, ref] as const;
};

const StatBox = ({ target, suffix, label }: { target: number; suffix: string; label: string }) => {
  const [count, ref] = useCountUp(target);
  return (
    <div ref={ref} className="bg-white p-6 rounded-2xl shadow-lg text-center">
      <h3 className="text-4xl font-bold text-primary-600 mb-2">{count}{suffix}</h3>
      <p className="text-gray-600">{label}</p>
    </div>
  );
};

const StatsRow = ({ stats }: { stats: { clients: string; languages: string; satisfaction: string; support: string } }) => (
  <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
    <StatBox target={500} suffix="+" label={stats.clients} />
    <StatBox target={20} suffix="+" label={stats.languages} />
    <StatBox target={99} suffix="%" label={stats.satisfaction} />
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h3 className="text-4xl font-bold text-primary-600 mb-2">24/7</h3>
      <p className="text-gray-600">{stats.support}</p>
    </div>
  </div>
);

/* ── Google logo ── */
const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" width="18" height="18">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

interface Review {
  name: string;
  badge: string | null;
  initials: string;
  color: string;
  date: string;
  rating: number;
  comment: string;
}

const reviewsByLang: Record<Lang, Review[]> = {
  en: [
    {
      name: 'Jerzy M.',
      badge: 'Local Guide · 586 reviews',
      initials: 'JM',
      color: '#1a73e8',
      date: '7 months ago',
      rating: 5,
      comment:
        'We are satisfied with the service. We needed our documents translated while abroad, and they were ready for pick-up on arrival. Translation and certification were included in one package price — no extra payment. The translation was accepted by the ministry. Reliable service, and whenever we had questions they responded within a day. Thank you.',
    },
    {
      name: 'Nina G.',
      badge: '1 review',
      initials: 'NG',
      color: '#34a853',
      date: '6 months ago',
      rating: 5,
      comment:
        "I recently used this office to translate and certify my academic documents, and I couldn't be happier with their service. The translations were accurate, professionally formatted, and accepted without any issues by official institutions. The staff was responsive, helpful, and guided me clearly through every step. Highly recommended!",
    },
    {
      name: 'Leszek K.',
      badge: '12 reviews',
      initials: 'LK',
      color: '#ea4335',
      date: 'a few months ago',
      rating: 5,
      comment:
        "Quick and professional. I needed a couple of documents translated while abroad. Communication was easy, responses were fast and the translation was accurate. Can't ask for more.",
    },
    {
      name: 'Anna W.',
      badge: 'Local Guide · 30 reviews',
      initials: 'AW',
      color: '#fbbc04',
      date: '9 months ago',
      rating: 5,
      comment:
        'I used this service to translate personal documents and it exceeded my expectations. The process was organized, communication was easy and pleasant. I will definitely use it again in the future.',
    },
  ],
  pl: [
    {
      name: 'Jerzy M.',
      badge: 'Lokalny przewodnik · 586 opinii',
      initials: 'JM',
      color: '#1a73e8',
      date: '7 miesięcy temu',
      rating: 5,
      comment:
        'Jesteśmy zadowoleni z obsługi. Potrzebowaliśmy tłumaczenia dokumentów przebywając za granicą — po przyjeździe były gotowe do odbioru. Tłumaczenie i poświadczenie w jednej cenie, bez dopłat. Tłumaczenie zostało przyjęte przez urząd. Rzetelna obsługa, na pytania odpowiadali w ciągu jednego dnia. Dziękujemy.',
    },
    {
      name: 'Nina G.',
      badge: '1 opinia',
      initials: 'NG',
      color: '#34a853',
      date: '6 miesięcy temu',
      rating: 5,
      comment:
        'Niedawno skorzystałam z tłumaczenia i poświadczenia moich dokumentów akademickich i jestem bardzo zadowolona. Tłumaczenia były dokładne, profesjonalnie sformatowane i przyjęte bez zastrzeżeń przez instytucje. Obsługa szybka, pomocna i jasno prowadząca przez każdy etap. Gorąco polecam!',
    },
    {
      name: 'Leszek K.',
      badge: '12 opinii',
      initials: 'LK',
      color: '#ea4335',
      date: 'kilka miesięcy temu',
      rating: 5,
      comment:
        'Szybko i profesjonalnie. Potrzebowałem przetłumaczyć kilka dokumentów przebywając za granicą. Komunikacja bezproblemowa, odpowiedzi błyskawiczne, tłumaczenie dokładne. Nic dodać, nic ująć.',
    },
    {
      name: 'Anna W.',
      badge: 'Lokalny przewodnik · 30 opinii',
      initials: 'AW',
      color: '#fbbc04',
      date: '9 miesięcy temu',
      rating: 5,
      comment:
        'Skorzystałam z tej usługi przy tłumaczeniu dokumentów osobistych i przerosło to moje oczekiwania. Proces był uporządkowany, a kontakt łatwy i przyjemny. Na pewno skorzystam ponownie.',
    },
  ],
};

const contentByLang = {
  en: {
    title: 'What Our Clients Say',
    subtitle: 'Real reviews from Google',
    seeAll: 'See all reviews on Google',
    more: 'More',
    less: 'Less',
    stats: { clients: 'Happy Clients', languages: 'Languages', satisfaction: 'Satisfaction Rate', support: 'Support' },
  },
  pl: {
    title: 'Co mówią nasi klienci',
    subtitle: 'Prawdziwe opinie z Google',
    seeAll: 'Zobacz wszystkie opinie w Google',
    more: 'Więcej',
    less: 'Mniej',
    stats: { clients: 'Zadowolonych klientów', languages: 'Języki', satisfaction: 'Satysfakcja', support: 'Wsparcie' },
  },
};

/* ── Single review card ── */
const ReviewCard = ({ review, moreLabel, lessLabel }: { review: Review; moreLabel: string; lessLabel: string }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.comment.length > 200;
  const displayText = expanded || !isLong ? review.comment : review.comment.slice(0, 200) + '…';

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4 border border-gray-100 h-full">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
            style={{ backgroundColor: review.color }}
          >
            {review.initials}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
            {review.badge && <p className="text-xs text-gray-500">{review.badge}</p>}
          </div>
        </div>
        <GoogleLogo />
      </div>
      <div className="flex items-center gap-2">
        <div className="flex">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
        </div>
        <span className="text-xs text-gray-500">{review.date}</span>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed flex-1">
        {displayText}
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-1 text-primary-600 font-medium hover:underline"
          >
            {expanded ? lessLabel : moreLabel}
          </button>
        )}
      </p>
    </div>
  );
};

/* ── Carousel ── */
const useVisibleCount = () => {
  const [count, setCount] = useState(1);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setCount(3);
      else if (window.innerWidth >= 640) setCount(2);
      else setCount(1);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return count;
};

const ReviewCarousel = ({ reviews, moreLabel, lessLabel }: { reviews: Review[]; moreLabel: string; lessLabel: string }) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const visibleCount = useVisibleCount();
  const total = reviews.length;
  const maxIndex = Math.max(0, total - visibleCount);

  const next = useCallback(() => setCurrent((c) => (c >= maxIndex ? 0 : c + 1)), [maxIndex]);
  const prev = () => setCurrent((c) => (c <= 0 ? maxIndex : c - 1));

  useEffect(() => {
    setCurrent((c) => Math.min(c, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  const cardWidthPct = 100 / visibleCount;

  return (
    <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* Track */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * cardWidthPct}%)` }}
        >
          {reviews.map((review, i) => (
            <div key={review.name + i} className="flex-shrink-0 px-3" style={{ width: `${cardWidthPct}%` }}>
              <ReviewCard review={review} moreLabel={moreLabel} lessLabel={lessLabel} />
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next arrows */}
      {total > visibleCount && (
        <>
          <button
            onClick={prev}
            aria-label="Previous review"
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-600 hover:text-primary-600 hover:border-primary-300 transition-colors z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next review"
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-600 hover:text-primary-600 hover:border-primary-300 transition-colors z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to review ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? 'bg-primary-500 w-6' : 'bg-gray-300 w-2 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

/* ── Main component ── */
export default function Testimonials({ lang }: Props) {
  const content = contentByLang[lang] ?? contentByLang.en;
  const reviews = reviewsByLang[lang] ?? reviewsByLang.en;
  const displayRating = 4.9;

  return (
    <section id="testimonials" className="py-16 bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{content.title}</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto mb-4" />
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm">
            <GoogleLogo />
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-800">{displayRating.toFixed(1)}</span>
            <span className="text-sm text-gray-500">· {content.subtitle}</span>
          </div>
        </div>

        {/* Carousel */}
        <div className="px-6">
          <ReviewCarousel reviews={reviews} moreLabel={content.more} lessLabel={content.less} />
        </div>

        {/* See all on Google */}
        <div className="text-center mt-10">
          <a
            href={CONTACT.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 rounded-full px-5 py-2.5 transition-colors bg-white shadow-sm"
          >
            <GoogleLogo />
            {content.seeAll}
          </a>
        </div>

        <StatsRow stats={content.stats} />
      </div>
    </section>
  );
}
