'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CheckCircle, ArrowLeft, MessageCircle } from 'lucide-react';
import { waUrl } from '@/lib/data';
import type { Lang } from '@/lib/translations';

const content = {
  en: {
    heading: 'Thank you for uploading a document',
    subtext: 'We will get back to you via email soon.',
    backBtn: 'Back to the page',
    whatsappText: 'In case of any questions, contact us via WhatsApp',
    toastMsg: 'Files uploaded successfully!',
    waMessage: 'Hello, I have a question about my document submission.',
  },
  pl: {
    heading: 'Dziękujemy za przesłanie dokumentu',
    subtext: 'Wkrótce skontaktujemy się z Tobą e-mailem.',
    backBtn: 'Wróć na stronę',
    whatsappText: 'W razie pytań skontaktuj się z nami przez WhatsApp',
    toastMsg: 'Pliki zostały przesłane pomyślnie!',
    waMessage: 'Dzień dobry, mam pytanie dotyczące przesłanego dokumentu.',
  },
};

export default function ThankYouPage() {
  const params = useParams();
  const router = useRouter();
  const langParam = params?.lang as string;
  const lang: Lang = langParam === 'pl' ? 'pl' : 'en';
  const c = content[lang];

  const [toastVisible, setToastVisible] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setToastVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 px-4 py-16">
      {/* Toast */}
      {toastVisible && (
        <div
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-white border border-green-200 shadow-xl rounded-2xl px-5 py-3.5 whitespace-nowrap"
          style={{ animation: 'nt-tab-in 0.35s ease-out both' }}
        >
          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
          <span className="text-sm font-medium text-gray-800">{c.toastMsg}</span>
        </div>
      )}

      {/* Card */}
      <div
        className="bg-white rounded-3xl shadow-2xl p-10 sm:p-14 max-w-lg w-full text-center"
        style={{ animation: 'nt-fade-up 0.5s ease-out both' }}
      >
        {/* Check icon */}
        <div
          className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ animation: 'nt-pop-in 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.2s both' }}
        >
          <CheckCircle className="w-10 h-10 text-primary-500" />
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-tight">{c.heading}</h1>

        {/* Subtext */}
        <p className="text-sm text-gray-500 mb-8">{c.subtext}</p>

        {/* Back button */}
        <button
          onClick={() => router.push(`/${lang}`)}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-primary-200/50 mb-5"
        >
          <ArrowLeft className="w-4 h-4" />
          {c.backBtn}
        </button>

        {/* WhatsApp link */}
        <a
          id="wa-btn-thankyou"
          href={waUrl(lang, c.waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-green-600 transition-colors"
        >
          <MessageCircle className="w-4 h-4 text-green-500" />
          {c.whatsappText}
        </a>
      </div>
    </div>
  );
}
