'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, FileText, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getT, type Lang } from '@/lib/translations';
import { CONTACT } from '@/lib/data';

interface Props {
  lang: Lang;
}

const content = {
  en: {
    badges: ['Free price estimate', 'Fast response within 5 minutes', 'Professional translation services'],
    emailPlaceholder: 'Your Email',
    phonePlaceholder: 'Phone Number (optional)',
    dropText: 'Drop files here or',
    browse: 'browse',
    submitBtn: 'Get Free Quote',
    sending: 'Sending...',
    orCall: 'Or reach us on WhatsApp:',
    successMsg: 'Files sent successfully!',
    errorMsg: 'Something went wrong. Please try again.',
  },
  pl: {
    badges: ['Bezpłatna wycena', 'Szybka odpowiedź w 5 minut', 'Profesjonalne usługi tłumaczeniowe'],
    emailPlaceholder: 'Twój email',
    phonePlaceholder: 'Numer telefonu (opcjonalnie)',
    dropText: 'Upuść pliki tutaj lub',
    browse: 'przeglądaj',
    submitBtn: 'Otrzymaj bezpłatną wycenę',
    sending: 'Wysyłanie...',
    orCall: 'Lub napisz na WhatsApp:',
    successMsg: 'Pliki zostały pomyślnie wysłane!',
    errorMsg: 'Coś poszło nie tak. Spróbuj ponownie.',
  },
};

interface Toast {
  id: number;
  type: 'success' | 'error';
  message: string;
}

let toastCounter = 0;

export default function FileUploadForm({ lang }: Props) {
  const c = content[lang];
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const t = getT(lang);

  const addToast = (type: 'success' | 'error', message: string) => {
    const id = ++toastCounter;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 5000);
  };

  const addFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return;
    const accepted = Array.from(incoming).filter((f) => {
      const ext = f.name.split('.').pop()?.toLowerCase() ?? '';
      return ['pdf', 'doc', 'docx', 'txt', 'jpg', 'jpeg', 'png'].includes(ext) && f.size <= 10 * 1024 * 1024;
    });
    setFiles((prev) => [...prev, ...accepted].slice(0, 5));
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const whatsAppLink = () => {
    const num = CONTACT.whatsapp.replace(/\D/g, '');
    const msg = encodeURIComponent(lang === 'pl' ? 'Witaj, chciałbym uzyskać więcej informacji.' : 'Hello, I would like to get more information.');
    return `https://wa.me/${num}?text=${msg}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files.length || !email) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('phone', phone || 'Not provided');
      formData.append('lang', lang);
      files.forEach((file) => formData.append('files', file));

      const res = await fetch('/api/send-quote', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('API error');

      addToast('success', c.successMsg);
      setFiles([]);
      setEmail('');
      setPhone('');
    } catch {
      addToast('error', c.errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl border border-primary-100 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {c.badges.map((badge) => (
          <div key={badge} className="flex items-center gap-2 text-sm text-gray-700">
            <Check className="w-4 h-4 text-primary-500 flex-shrink-0" />
            {badge}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={c.emailPlaceholder}
          className="w-full border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-xl px-4 py-3 text-sm outline-none transition-colors bg-white"
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={c.phonePlaceholder}
          className="w-full border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-xl px-4 py-3 text-sm outline-none transition-colors bg-white"
        />

        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
            dragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400 bg-white'
          }`}
        >
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">
            {c.dropText}{' '}
            <span className="text-primary-600 font-medium underline">{c.browse}</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX, TXT, JPG, PNG • max 5 files, 10MB each</p>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
            className="hidden"
            onChange={(e) => addFiles(e.target.files)}
          />
        </div>

        <AnimatePresence>
          {files.map((file) => (
            <motion.div
              key={file.name}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-2.5"
            >
              <div className="flex items-center gap-2 min-w-0">
                <FileText className="w-4 h-4 text-primary-500 flex-shrink-0" />
                <span className="text-sm text-gray-700 truncate">{file.name}</span>
              </div>
              <button
                type="button"
                onClick={() => setFiles((prev) => prev.filter((f) => f.name !== file.name))}
                className="text-gray-400 hover:text-red-500 transition-colors ml-2 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        <button
          type="submit"
          disabled={!files.length || !email || loading}
          className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all ${
            files.length && email && !loading
              ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:opacity-90'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {c.sending}
            </>
          ) : (
            c.submitBtn
          )}
        </button>

        <p className="text-center text-sm text-gray-500">
          {c.orCall}{' '}
          <a href={whatsAppLink()} target="_blank" rel="noopener noreferrer" className="text-primary-600 font-medium">
            WhatsApp
          </a>
        </p>
      </form>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-white text-sm font-medium ${
                toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              {toast.type === 'success' ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
