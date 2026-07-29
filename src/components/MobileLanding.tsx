'use client';

import { useState, useEffect } from 'react';
import {
  Phone, Upload, Calculator, CheckCircle,
  Clock, Zap, Camera, ChevronRight,
} from 'lucide-react';
import type { Lang } from '@/lib/translations';
import { CONTACT, PHONE_URL, waUrl } from '@/lib/data';

/* ─────────────────────────────────────────────
   Constants
───────────────────────────────────────────── */
const WA_COLOR = '#25D366';

/* ─────────────────────────────────────────────
   SVG helpers
───────────────────────────────────────────── */
const WAIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.39 9.39 0 0 1-1.44-5.01c0-5.18 4.22-9.4 9.41-9.4 2.51 0 4.87.98 6.64 2.76a9.34 9.34 0 0 1 2.75 6.65c0 5.18-4.22 9.4-9.41 9.4zM20.5 3.49A11.78 11.78 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.6 5.95L.06 24l6.3-1.65a11.86 11.86 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.17-3.49-8.41z" />
  </svg>
);

const StarFilled = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#f5a623" aria-hidden="true">
    <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

/* ─────────────────────────────────────────────
   Translations
───────────────────────────────────────────── */
interface QuotePath {
  tag?: string;
  title: string;
  sub: string;
  tone: string;
}

interface Content {
  lang: Lang;
  proof: string;
  h1: string;
  sub: string;
  waBtn: string;
  waSub: string;
  callBtn: string;
  uploadLink: string;
  calcLink: string;
  chips: string[];
  quoteKicker: string;
  quoteH2: string;
  quotePaths: QuotePath[];
  stats: [string, string][];
  servicesKicker: string;
  servicesH2: string;
  docs: string[];
  seeAll: string;
  seeLess: string;
  howKicker: string;
  howH2: string;
  steps: { t: string; b: string }[];
  reviewScore: string;
  reviewQuote: string;
  reviewName: string;
  reviewMeta: string;
  stickyWa: string;
  stickyCall: string;
}

const content: Record<Lang, Content> = {
  en: {
    lang: 'en',
    proof: '4.9 · 500+ clients',
    h1: 'Sworn translation, ready in hours.',
    sub: `Certified & notarized for official use abroad. From 50 zł/page.`,
    waBtn: 'Get a quote on WhatsApp',
    waSub: 'Photo · price back in ~5 min',
    callBtn: `Call ${CONTACT.phone1.display}`,
    uploadLink: 'Upload file',
    calcLink: 'Calculate price',
    chips: ['Certified', '5-min reply', 'Same-day'],

    quoteKicker: 'How to get a price',
    quoteH2: '3 ways to get a price. Pick the quickest.',
    quotePaths: [
      { tag: 'Easiest', title: 'Send a photo on WhatsApp', sub: 'Take a photo and send it. We reply in ~5 min.', tone: WA_COLOR },
      { title: 'Call and ask', sub: 'Tell us the document type. Quote on the spot.', tone: '#ec4899' },
      { title: 'Upload a file', sub: 'PDF or scan from your phone or computer.', tone: '#0f1115' },
    ],

    stats: [['500+', 'Happy clients'], ['20+', 'Languages'], ['99%', 'Positive reviews'], ['Same day', 'Turnaround']],

    servicesKicker: 'What we translate',
    servicesH2: 'Official documents, accepted abroad.',
    docs: [
      'Birth certificate', 'Diploma', 'Marriage certificate', 'Passport',
      'Court documents', 'Contracts', 'Bank statements', 'Medical records',
      'Death certificate', 'National ID', 'Power of attorney', "Driver's license",
      'Business registry extract', 'Registration certificate', 'Employment letter', 'Academic transcript',
    ],
    seeAll: 'See more',
    seeLess: 'See less',

    howKicker: 'How it works',
    howH2: 'Three steps, often same day.',
    steps: [
      { t: 'Send your document', b: 'Photo on WhatsApp, upload, or bring it in.' },
      { t: 'We translate & certify', b: 'Sworn translator + notary certification.' },
      { t: 'Pick up or get it delivered', b: 'Often the same day. Apostille available.' },
    ],

    reviewScore: '4.9 from 412 reviews',
    reviewQuote: '"Sent a photo of my diploma on WhatsApp at 9am, had the certified translation by lunch. Used it for my visa the next day."',
    reviewName: 'Nina K.',
    reviewMeta: 'Diploma · visa application',

    stickyWa: 'Get a quote',
    stickyCall: 'Call',
  },

  pl: {
    lang: 'pl',
    proof: '4.9 · 500+ klientów',
    h1: 'Tłumaczenie przysięgłe w kilka godzin.',
    sub: 'Certyfikowane i poświadczone do użytku urzędowego. Od 50 zł/strona.',
    waBtn: 'Uzyskaj wycenę na WhatsApp',
    waSub: 'Zdjęcie · cena w ok. 5 min',
    callBtn: `Zadzwoń ${CONTACT.phone1.display}`,
    uploadLink: 'Prześlij plik',
    calcLink: 'Oblicz cenę',
    chips: ['Certyfikowane', 'Odpowiedź 5 min', 'Ten sam dzień'],

    quoteKicker: 'Jak poznać cenę',
    quoteH2: '3 sposoby na wycenę. Wybierz najszybszy.',
    quotePaths: [
      { tag: 'Najprościej', title: 'Wyślij zdjęcie na WhatsApp', sub: 'Zrób zdjęcie i wyślij. Odpowiadamy w ok. 5 min.', tone: WA_COLOR },
      { title: 'Zadzwoń i zapytaj', sub: 'Podaj rodzaj dokumentu. Wycena od ręki.', tone: '#ec4899' },
      { title: 'Prześlij plik', sub: 'PDF lub skan z telefonu albo komputera.', tone: '#0f1115' },
    ],

    stats: [['500+', 'Zadowolonych klientów'], ['20+', 'Języków'], ['99%', 'Pozytywnych opinii'], ['Ten sam dzień', 'Realizacja']],

    servicesKicker: 'Co tłumaczymy',
    servicesH2: 'Dokumenty urzędowe akceptowane za granicą.',
    docs: [
      'Akt urodzenia', 'Dyplom', 'Akt małżeństwa', 'Paszport',
      'Dokumenty sądowe', 'Umowy', 'Wyciągi bankowe', 'Dokumentacja medyczna',
      'Akt zgonu', 'Dowód osobisty', 'Pełnomocnictwo', 'Prawo jazdy',
      'Wyciąg z rejestru firm', 'Zaświadczenie o rejestracji', 'Zaświadczenie o zatrudnieniu', 'Suplement do dyplomu',
    ],
    seeAll: 'Pokaż więcej',
    seeLess: 'Zwiń',

    howKicker: 'Jak to działa',
    howH2: 'Trzy kroki, często tego samego dnia.',
    steps: [
      { t: 'Wyślij dokument', b: 'Zdjęcie na WhatsApp, formularz lub osobiście.' },
      { t: 'Tłumaczymy i poświadczamy', b: 'Tłumacz przysięgły + poświadczenie notarialne.' },
      { t: 'Odbierz lub zamów dostawę', b: 'Często tego samego dnia. Apostille dostępne.' },
    ],

    reviewScore: '4.9 z 412 opinii',
    reviewQuote: '"Wysłałam zdjęcie dyplomu na WhatsApp o 9 rano, do obiadu miałam gotowe tłumaczenie przysięgłe. Następnego dnia złożyłam wniosek wizowy."',
    reviewName: 'Nina K.',
    reviewMeta: 'Dyplom · wniosek wizowy',

    stickyWa: 'Uzyskaj wycenę',
    stickyCall: 'Zadzwoń',
  },
};

/* ─────────────────────────────────────────────
   Section components
───────────────────────────────────────────── */

function MobileHero({ c, scrollToCalculator }: { c: Content; scrollToCalculator: () => void }) {
  return (
    <section id="mobile-hero" className="px-5 pt-6 pb-7 flex flex-col gap-4 bg-gradient-to-b from-primary-50 to-white">
      {/* Trust proof row */}
      <div className="flex items-center gap-2">
        <span className="flex gap-0.5">
          {[0, 1, 2, 3, 4].map((i) => <StarFilled key={i} />)}
        </span>
        <span className="text-sm text-gray-600">{c.proof}</span>
      </div>

      {/* Headline */}
      <h1
        className="text-[2rem] leading-[1.1] font-bold text-gray-900 tracking-tight"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {c.h1}
      </h1>
      <p className="text-base text-gray-600 leading-relaxed -mt-1">{c.sub}</p>

      {/* WhatsApp — primary CTA */}
      <a
        id="wa-btn-mobile-hero"
        href={waUrl(c.lang)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 justify-center px-5 py-3.5 rounded-2xl text-white font-bold no-underline"
        style={{ background: WA_COLOR, boxShadow: '0 10px 24px -10px rgba(37,211,102,0.65)' }}
      >
        <WAIcon size={22} />
        <span className="flex flex-col items-start leading-tight">
          <span className="text-base font-bold">{c.waBtn}</span>
          <span className="text-xs font-medium opacity-90">{c.waSub}</span>
        </span>
      </a>

      {/* Call — secondary */}
      <a
        href={PHONE_URL}
        className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl font-bold no-underline text-primary-700 bg-white border-2 border-primary-400 text-base -mt-1"
      >
        <Phone className="w-4 h-4 flex-shrink-0" />
        {c.callBtn}
      </a>

      {/* Tertiary links */}
      <div className="flex items-center justify-center gap-3 -mt-1">
        <button
          onClick={scrollToCalculator}
          className="flex items-center gap-1.5 text-sm text-gray-400 font-medium"
        >
          <Upload className="w-3.5 h-3.5" />
          {c.uploadLink}
        </button>
        <span className="text-gray-300">·</span>
        <button
          onClick={scrollToCalculator}
          className="flex items-center gap-1.5 text-sm text-gray-400 font-medium"
        >
          <Calculator className="w-3.5 h-3.5" />
          {c.calcLink}
        </button>
      </div>

      {/* Trust chips */}
      {c.chips.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-1">
          {c.chips.map((chip, i) => (
            <span
              key={i}
              className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-full"
            >
              {i === 0 && <CheckCircle className="w-3 h-3 text-primary-500" />}
              {i === 1 && <Clock className="w-3 h-3 text-primary-500" />}
              {i === 2 && <Zap className="w-3 h-3 text-primary-500" />}
              {chip}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}

function MobileQuotePaths({ c, scrollToCalculator }: { c: Content; scrollToCalculator: () => void }) {
  const icons = [
    <Camera className="w-5 h-5" key="camera" />,
    <Phone className="w-5 h-5" key="phone" />,
    <Upload className="w-5 h-5" key="upload" />,
  ];

  return (
    <section className="px-5 py-7 flex flex-col gap-3">
      <p className="text-xs font-bold uppercase tracking-widest text-primary-700">{c.quoteKicker}</p>
      <h2
        className="text-xl font-bold text-gray-900 leading-snug tracking-tight -mt-1"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {c.quoteH2}
      </h2>

      <div className="flex flex-col gap-2.5 mt-1">
        {c.quotePaths.map((path, i) => {
          const hrefs = [waUrl(c.lang), PHONE_URL, null];
          const href = hrefs[i];

          const inner = (
            <>
              <span
                className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center border-2"
                style={{
                  color: path.tone,
                  borderColor: path.tone === '#0f1115' ? '#e5e7eb' : path.tone,
                }}
              >
                {icons[i]}
              </span>
              <span className="flex flex-col gap-0.5 flex-1 min-w-0">
                <span className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">{path.title}</span>
                  {path.tag && (
                    <span
                      className="text-xs font-bold uppercase tracking-wide text-white px-2 py-0.5 rounded-full"
                      style={{ background: WA_COLOR }}
                    >
                      {path.tag}
                    </span>
                  )}
                </span>
                <span className="text-xs text-gray-500 leading-snug">{path.sub}</span>
              </span>
              <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
            </>
          );

          const cls = 'flex items-center gap-3.5 p-3.5 rounded-2xl border border-gray-200 bg-white no-underline text-left w-full';

          return href ? (
            <a key={i} id={i === 0 ? 'wa-btn-mobile-quote' : undefined} href={href} target="_blank" rel="noopener noreferrer" className={cls}>
              {inner}
            </a>
          ) : (
            <button key={i} onClick={scrollToCalculator} className={cls}>
              {inner}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function MobileStats({ c }: { c: Content }) {
  return (
    <div className="grid grid-cols-2 border-t border-b border-gray-100 bg-gray-50">
      {c.stats.map(([num, label], i) => (
        <div
          key={i}
          className="px-5 py-5 text-center border-b border-gray-100"
          style={{ borderRight: i % 2 === 0 ? '1px solid #f3f4f6' : 'none' }}
        >
          <div
            className="text-2xl font-bold text-primary-600 leading-none tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {num}
          </div>
          <div className="text-xs text-gray-500 mt-1">{label}</div>
        </div>
      ))}
    </div>
  );
}

const DOCS_INITIAL = 8;

function MobileServices({ c }: { c: Content }) {
  const [expanded, setExpanded] = useState(false);
  const visibleDocs = expanded ? c.docs : c.docs.slice(0, DOCS_INITIAL);
  const hasMore = c.docs.length > DOCS_INITIAL;

  return (
    <section className="px-5 py-7 flex flex-col gap-3">
      <p className="text-xs font-bold uppercase tracking-widest text-primary-700">{c.servicesKicker}</p>
      {c.servicesH2 && (
        <h2
          className="text-xl font-bold text-gray-900 leading-snug tracking-tight -mt-1"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {c.servicesH2}
        </h2>
      )}
      <div className="flex flex-wrap gap-2 mt-1">
        {visibleDocs.map((doc, i) => (
          <span
            key={i}
            className="text-sm font-medium text-gray-700 bg-primary-50 border border-primary-100 px-3.5 py-2 rounded-full"
          >
            {doc}
          </span>
        ))}
      </div>
      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-sm font-semibold text-primary-700 mt-2 bg-transparent border-none cursor-pointer p-0"
        >
          {expanded ? c.seeLess : c.seeAll}
          <ChevronRight
            className="w-4 h-4 transition-transform duration-200"
            style={{ transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
          />
        </button>
      )}
    </section>
  );
}

function MobileHowItWorks({ c }: { c: Content }) {
  return (
    <section className="px-5 py-7 bg-primary-50 flex flex-col gap-3">
      <p className="text-xs font-bold uppercase tracking-widest text-primary-700">{c.howKicker}</p>
      {c.howH2 && (
        <h2
          className="text-xl font-bold text-gray-900 leading-snug tracking-tight -mt-1"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {c.howH2}
        </h2>
      )}
      <div className="flex flex-col gap-4 mt-2">
        {c.steps.map((step, i) => (
          <div key={i} className="flex gap-4 items-start">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500 text-white font-bold text-sm flex items-center justify-center">
              {i + 1}
            </span>
            <div>
              <div className="text-sm font-semibold text-gray-900 leading-snug">{step.t}</div>
              <div className="text-xs text-gray-500 leading-snug mt-0.5">{step.b}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MobileReviews({ c }: { c: Content }) {
  return (
    <section className="px-5 py-7 flex flex-col gap-3">
      <div className="flex items-center gap-2.5">
        <span className="flex gap-0.5">
          {[0, 1, 2, 3, 4].map((i) => <StarFilled key={i} />)}
        </span>
        <span className="text-sm text-gray-600">{c.reviewScore}</span>
      </div>
      <div className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm">
        <p
          className="text-base leading-relaxed text-gray-700 italic mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {c.reviewQuote}
        </p>
        <div className="flex items-center gap-3">
          <span
            className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white text-sm font-bold"
            style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)' }}
          >
            TH
          </span>
          <div>
            <div className="text-sm font-semibold text-gray-900">{c.reviewName}</div>
            <div className="text-xs text-gray-500 mt-0.5">{c.reviewMeta}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Sticky bottom bar — fixed, mobile only
───────────────────────────────────────────── */
export function MobileStickyBar({ lang }: { lang: Lang }) {
  const c = content[lang] ?? content.en;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('mobile-hero');
    if (!hero) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div
        className="bg-white/95 backdrop-blur-sm border-t border-gray-200 px-3.5 pt-2.5 pb-6"
        style={{ boxShadow: '0 -8px 24px -12px rgba(0,0,0,0.15)' }}
      >
        <div className="flex gap-2.5">
          <a
            id="wa-btn-mobile-sticky"
            href={waUrl(c.lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-[1.4] flex items-center justify-center gap-2 h-14 rounded-2xl text-white font-bold no-underline text-base"
            style={{ background: WA_COLOR }}
          >
            <WAIcon size={19} />
            {c.stickyWa}
          </a>
          <a
            href={PHONE_URL}
            className="flex-1 flex flex-col items-center justify-center h-14 rounded-2xl text-white no-underline bg-primary-500"
          >
            <span className="flex items-center gap-1.5 font-bold text-sm">
              <Phone className="w-3.5 h-3.5 flex-shrink-0" />
              {c.stickyCall}
            </span>
            <span className="text-xs font-medium opacity-90 tracking-wide">{CONTACT.phone1.display}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main export — the full mobile landing body
───────────────────────────────────────────── */
export default function MobileLanding({ lang }: { lang: Lang }) {
  const c = content[lang] ?? content.en;

  const scrollToCalculator = () => {
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white text-gray-900">
      <MobileHero c={c} scrollToCalculator={scrollToCalculator} />
      <MobileQuotePaths c={c} scrollToCalculator={scrollToCalculator} />
      <MobileStats c={c} />
      <MobileServices c={c} />
      <MobileHowItWorks c={c} />
      <MobileReviews c={c} />
    </div>
  );
}
