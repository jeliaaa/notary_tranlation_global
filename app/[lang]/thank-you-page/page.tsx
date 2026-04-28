'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, MessageCircle, ArrowLeft } from 'lucide-react';
import { CONTACT } from '@/lib/data';
import type { Lang } from '@/lib/translations';

const content = {
  en: {
    heading: 'Thank you for uploading a document',
    subtext: 'We will get back to you via email soon.',
    backBtn: 'Back to the page',
    whatsappText: 'In case of any questions, contact us via',
    toastMsg: 'Your document has been received!',
  },
  pl: {
    heading: 'Dziękujemy za przesłanie dokumentu',
    subtext: 'Wkrótce skontaktujemy się z Tobą e-mailem.',
    backBtn: 'Wróć na stronę',
    whatsappText: 'W razie pytań skontaktuj się z nami przez',
    toastMsg: 'Twój dokument został odebrany!',
  },
};

export default function ThankYouPage() {
  const params = useParams();
  const router = useRouter();
  const langParam = params?.lang as string;
  const lang: Lang = langParam === 'pl' ? 'pl' : 'en';
  const c = content[lang];

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const timer = setTimeout(() => setShowToast(true), 300);
    const hide = setTimeout(() => setShowToast(false), 5300);
    return () => { clearTimeout(timer); clearTimeout(hide); };
  }, []);

  const whatsAppLink = () => {
    const num = CONTACT.whatsapp.replace(/\D/g, '');
    const msg = encodeURIComponent(
      lang === 'pl'
        ? 'Witaj, mam pytanie dotyczące mojego dokumentu.'
        : 'Hello, I have a question about my document.'
    );
    return `https://wa.me/${num}?text=${msg}`;
  };

  return (
    <>
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-lg w-full text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-4">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            {c.heading}
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            {c.subtext}
          </p>

          <button
            onClick={() => router.push(`/${lang}`)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {c.backBtn}
          </button>

          <p className="text-sm text-gray-500">
            {c.whatsappText}{' '}
            <a
              href={whatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-green-600 font-medium hover:underline"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </p>
        </motion.div>
      </div>

      {/* Toast */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="flex items-center gap-3 bg-green-500 text-white px-4 py-3 rounded-xl shadow-lg text-sm font-medium"
            >
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>{c.toastMsg}</span>
              <button
                onClick={() => setShowToast(false)}
                className="ml-1 hover:opacity-70 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
