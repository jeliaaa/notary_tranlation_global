'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, X, Send, Check, FileText, MessageCircle } from 'lucide-react';
import type { Lang } from '@/lib/translations';
import { CONTACT, waUrl } from '@/lib/data';

interface Props {
  lang: Lang;
}

const translations = {
  en: {
    dragDrop: 'Drag & drop files here or',
    browse: 'browse',
    maxFiles: 'Maximum 5 files (10MB each)',
    email: 'Your Email',
    send: 'Get Free Quote',
    remove: 'Remove',
    success: 'Files sent successfully!',
    error: 'Error sending files. Please try again.',
    invalidEmail: 'Please enter a valid email',
    tooManyFiles: 'Maximum 5 files allowed',
    fileTooLarge: 'File size exceeds 10MB',
    message: 'Phone Number (optional)',
    uploadBenefit1: 'Free price estimate',
    uploadBenefit2: 'Fast response within 5 minutes',
    uploadBenefit3: 'Professional translation services',
    phoneNumber: 'Chat with us on WhatsApp: ',
  },
  pl: {
    dragDrop: 'Przeciągnij i upuść pliki tutaj lub',
    browse: 'przeglądaj',
    maxFiles: 'Maksymalnie 5 plików (po 10MB)',
    email: 'Twój email',
    send: 'Otrzymaj bezpłatną wycenę',
    remove: 'Usuń',
    success: 'Pliki zostały pomyślnie wysłane!',
    error: 'Błąd podczas wysyłania. Spróbuj ponownie.',
    invalidEmail: 'Podaj poprawny adres email',
    tooManyFiles: 'Dozwolone maksymalnie 5 plików',
    fileTooLarge: 'Rozmiar pliku przekracza 10MB',
    message: 'Numer telefonu (opcjonalnie)',
    uploadBenefit1: 'Bezpłatna wycena',
    uploadBenefit2: 'Szybka odpowiedź w ciągu 5 minut',
    uploadBenefit3: 'Profesjonalne usługi tłumaczeniowe',
    phoneNumber: 'Napisz do nas na WhatsApp: ',
  },
} as const;

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_TOTAL_SIZE = 10 * 1024 * 1024;
const MAX_FILES = 5;

export default function FileUploadForm({ lang }: Props) {
  const t = translations[lang] ?? translations.en;
  const router = useRouter();

  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const validateFiles = (newFiles: File[]) => {
    if (files.length + newFiles.length > MAX_FILES) {
      setNotification({ type: 'error', message: t.tooManyFiles });
      return false;
    }
    for (const file of newFiles) {
      if (file.size > MAX_FILE_SIZE) {
        setNotification({ type: 'error', message: `${file.name}: ${t.fileTooLarge}` });
        return false;
      }
    }
    const totalSize = [...files, ...newFiles].reduce((sum, f) => sum + f.size, 0);
    if (totalSize > MAX_TOTAL_SIZE) {
      setNotification({ type: 'error', message: t.fileTooLarge });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const form = formRef.current!;
    const emailValue = (form.querySelector('[name="email"]') as HTMLInputElement).value;
    const phoneValue = (form.querySelector('[name="message"]') as HTMLInputElement).value;

    try {
      const formData = new FormData();
      formData.append('email', emailValue);
      formData.append('phone', phoneValue || 'Not provided');
      formData.append('lang', lang);
      files.forEach((file) => formData.append('files', file));

      const res = await fetch('/api/send-quote', { method: 'POST', body: formData });
      if (!res.ok) throw new Error(await res.text());

      router.push(`/${lang}/thank-you-page`);
    } catch (error) {
      console.error('Submission error:', error);
      setNotification({ type: 'error', message: t.error });
    } finally {
      setIsSending(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (!validateFiles(droppedFiles)) return;
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? []);
    if (!validateFiles(selectedFiles)) return;
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="max-w-2xl mx-auto px-2 sm:px-4 md:px-6">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">

        {/* Upload Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {[t.uploadBenefit1, t.uploadBenefit2, t.uploadBenefit3].map((benefit) => (
            <div key={benefit} className="bg-white rounded-lg p-3 border border-primary-100 text-center shadow-sm">
              <Check className="w-5 h-5 mx-auto mb-2 text-primary-500" />
              <p className="text-xs sm:text-sm text-gray-700">{benefit}</p>
            </div>
          ))}
        </div>

        {/* Email Input */}
        <div>
          <input
            type="email"
            name="email"
            placeholder={t.email}
            className="w-full p-2.5 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm sm:text-base"
            required
          />
        </div>

        {/* Phone Input */}
        <div>
          <input
            type="tel"
            name="message"
            placeholder={t.message}
            className="w-full p-2.5 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm sm:text-base"
          />
        </div>

        {/* File Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-4 sm:p-6 md:p-8 text-center transition-colors ${
            isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInput}
            multiple
            className="hidden"
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
          />
          <Upload className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 sm:mb-3 md:mb-4 text-primary-500" />
          <p className="mb-1 sm:mb-2 text-sm sm:text-base text-gray-700">
            {t.dragDrop}{' '}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-primary-600 hover:text-primary-800 font-medium underline"
            >
              {t.browse}
            </button>
          </p>
          <p className="text-xs sm:text-sm text-gray-500">{t.maxFiles}</p>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-1.5 sm:space-y-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-100"
              >
                <span className="flex items-center">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 mr-2" />
                  <span className="truncate max-w-[180px] sm:max-w-xs text-xs sm:text-sm">{file.name}</span>
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={files.length === 0 || isSending}
          className={`w-full py-2.5 sm:py-3.5 px-4 sm:px-6 rounded-lg text-white font-medium flex items-center justify-center space-x-2 text-sm sm:text-base transition-all duration-300 ${
            files.length === 0 || isSending
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 shadow-lg hover:shadow-primary-200/50 transform hover:scale-[1.01]'
          }`}
        >
          {isSending ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              <span>...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{t.send}</span>
            </>
          )}
        </button>

        {/* WhatsApp link */}
        <div className="text-center mt-4">
          <a
            id="wa-btn-upload"
            href={waUrl(lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            {t.phoneNumber}{CONTACT.phone1.display}
          </a>
        </div>

        {/* Notification */}
        {notification && (
          <div
            className={`fixed bottom-4 right-4 p-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-xs z-50 ${
              notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
            style={{ animation: 'nt-fade-up 0.2s ease-out both' }}
          >
            {notification.type === 'success' ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
            <span>{notification.message}</span>
          </div>
        )}
      </form>
    </div>
  );
}
