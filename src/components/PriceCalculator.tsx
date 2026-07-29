'use client';

import { useState } from 'react';
import { Calculator, X, Clock, Mail, ChevronDown, Plus, Trash2 } from 'lucide-react';
import type { Lang } from '@/lib/translations';
import { getT } from '@/lib/translations';
import { languages, languageNames, CONTACT, waUrl } from '@/lib/data';
import { getLanguagePairPrice, calcTranslation, calcNotary, calcDelivery } from '@/lib/pricing';
import { useCurrency } from '@/lib/currency-context';

interface Props {
  lang: Lang;
}

const ui = {
  addDocument: { en: 'Add Document', pl: 'Dodaj dokument' },
  document: { en: 'Document', pl: 'Dokument' },
  remove: { en: 'Remove', pl: 'Usuń' },
  pages: { en: 'pages', pl: 'str.' },
  translationCostLabel: { en: 'Translation', pl: 'Tłumaczenie' },
  notaryCostLabel: { en: 'Notary', pl: 'Notariusz' },
  swipeDown: { en: 'Swipe down to close', pl: 'Przesuń w dół, aby zamknąć' },
  emailCopied: { en: 'Email copied', pl: 'Email skopiowany' },
} as const;

interface DocRow {
  id: number;
  fromLang: string;
  toLang: string;
  pages: number | '';
  notaryApproval: boolean;
}

const newDocument = (): DocRow => ({
  id: Date.now() + Math.random(),
  fromLang: 'polish',
  toLang: 'english',
  pages: 1,
  notaryApproval: false,
});

interface DocResult {
  index: number;
  fromLang: string;
  toLang: string;
  pages: number;
  notaryApproval: boolean;
  translationCost: number;
  notaryCost: number;
  discount: number;
  subtotal: number;
}

interface Results {
  docResults: DocResult[];
  totalPrice: number;
  totalDiscount: number;
  deliveryTime: string;
}

export default function PriceCalculator({ lang }: Props) {
  const t = getT(lang);
  const names = languageNames[lang];
  const { currency, formatPrice } = useCurrency();

  const [documents, setDocuments] = useState<DocRow[]>([newDocument()]);
  const [results, setResults] = useState<Results | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const uiT = (key: keyof typeof ui) => ui[key][lang] ?? ui[key].en;

  const addDocument = () => setDocuments((prev) => [...prev, newDocument()]);

  const removeDocument = (id: number) =>
    setDocuments((prev) => prev.filter((d) => d.id !== id));

  const updateDocument = <K extends keyof DocRow>(id: number, field: K, value: DocRow[K]) =>
    setDocuments((prev) => prev.map((d) => (d.id === id ? { ...d, [field]: value } : d)));

  const calculatePrice = (e: React.FormEvent) => {
    e.preventDefault();

    const docResults: DocResult[] = documents.map((doc, i) => {
      const pages = typeof doc.pages === 'number' ? doc.pages : 1;
      const basePrice = getLanguagePairPrice(doc.fromLang, doc.toLang, currency);
      const { cost: translationCost, discount } = calcTranslation(basePrice, pages);
      const notaryCost = doc.notaryApproval ? calcNotary(pages, currency) : 0;
      return {
        index: i + 1,
        fromLang: doc.fromLang,
        toLang: doc.toLang,
        pages,
        notaryApproval: doc.notaryApproval,
        translationCost,
        notaryCost,
        discount,
        subtotal: translationCost + notaryCost,
      };
    });

    const totalPages = docResults.reduce((sum, r) => sum + r.pages, 0);
    const anyNotary = docResults.some((r) => r.notaryApproval);
    const totalPrice = docResults.reduce((sum, r) => sum + r.subtotal, 0);
    const totalDiscount = docResults.reduce((sum, r) => sum + r.discount, 0);

    setResults({
      docResults,
      totalPrice,
      totalDiscount,
      deliveryTime: calcDelivery(totalPages, anyNotary, lang),
    });
    setIsOpen(true);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.emailForCopy);
      alert(uiT('emailCopied'));
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientY);
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.touches[0].clientY);
  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    if (touchStart - touchEnd < -100) setIsOpen(false);
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 lg:p-8">
      <form onSubmit={calculatePrice} className="space-y-4">
        {/* Document list */}
        <div className="space-y-4">
          {documents.map((doc, idx) => (
            <div key={doc.id} className="border-2 border-gray-200 rounded-xl p-4 space-y-3">
              {/* Document header */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">
                  {uiT('document')} {idx + 1}
                </span>
                {documents.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDocument(doc.id)}
                    className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    {uiT('remove')}
                  </button>
                )}
              </div>

              {/* Language pair */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-600">{t.sourceLanguage}</label>
                  <div className="relative">
                    <select
                      value={doc.fromLang}
                      onChange={(e) => updateDocument(doc.id, 'fromLang', e.target.value)}
                      style={{ backgroundImage: 'none' }}
                      className="w-full appearance-none bg-white px-3 py-2.5 text-sm rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                    >
                      {languages.map((l) => (
                        <option key={l} value={l}>{names[l]}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-600">{t.targetLanguage}</label>
                  <div className="relative">
                    <select
                      value={doc.toLang}
                      onChange={(e) => updateDocument(doc.id, 'toLang', e.target.value)}
                      style={{ backgroundImage: 'none' }}
                      className="w-full appearance-none bg-white px-3 py-2.5 text-sm rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                    >
                      {languages.map((l) => (
                        <option key={l} value={l}>{names[l]}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Page count */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-600">{t.pageCount}</label>
                <input
                  type="number"
                  min={1}
                  value={doc.pages}
                  onChange={(e) =>
                    updateDocument(
                      doc.id,
                      'pages',
                      e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value) || 1)
                    )
                  }
                  onBlur={(e) => {
                    if (e.target.value === '' || parseInt(e.target.value) < 1)
                      updateDocument(doc.id, 'pages', 1);
                  }}
                  className="w-full px-3 py-2.5 text-sm rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                />
              </div>

              {/* Notary approval */}
              <div
                onClick={() => updateDocument(doc.id, 'notaryApproval', !doc.notaryApproval)}
                className="flex items-center bg-gray-50 p-3 rounded-lg border-2 border-gray-200 hover:border-primary-200 transition-colors cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={doc.notaryApproval}
                  onChange={(e) => updateDocument(doc.id, 'notaryApproval', e.target.checked)}
                  className="w-4 h-4 text-primary-600 border-2 border-gray-300 rounded focus:ring-primary-500 cursor-pointer"
                />
                <label className="ml-2 text-sm text-gray-700 cursor-pointer select-none">
                  {t.notaryApproval}
                </label>
              </div>
            </div>
          ))}
        </div>

        {/* Add document */}
        <button
          type="button"
          onClick={addDocument}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-dashed border-gray-300 text-gray-500 text-sm hover:border-primary-400 hover:text-primary-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          {uiT('addDocument')}
        </button>

        {/* Calculate */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 px-6 rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-3 font-medium shadow-lg shadow-primary-200"
        >
          <Calculator className="w-5 h-5" />
          <span>{t.calculate}</span>
        </button>
      </form>

      {/* Results Modal */}
      {isOpen && results && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4"
          style={{ animation: 'nt-fade-in 0.15s ease-out both' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div
            className="bg-white w-full max-w-md rounded-t-2xl md:rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            style={{ animation: 'nt-slide-up 0.25s ease-out both' }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b flex-shrink-0">
              <h3 className="text-2xl font-bold text-gray-900">{t.translationDetails}</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5 overflow-y-auto">
              {/* Per-document breakdown */}
              <div className="space-y-3">
                {results.docResults.map((r) => (
                  <div key={r.index} className="bg-gray-50 rounded-xl p-4 space-y-2">
                    <div className="text-sm font-semibold text-gray-700">
                      {uiT('document')} {r.index} — {names[r.fromLang as keyof typeof names]} → {names[r.toLang as keyof typeof names]}, {r.pages} {uiT('pages')}
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{uiT('translationCostLabel')}</span>
                      <span>{formatPrice(r.translationCost)}</span>
                    </div>
                    {r.discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>{t.discount}</span>
                        <span>-{formatPrice(r.discount)}</span>
                      </div>
                    )}
                    {r.notaryApproval && (
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{uiT('notaryCostLabel')}</span>
                        <span>{formatPrice(r.notaryCost)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-semibold text-gray-800 pt-1 border-t border-gray-200">
                      <span>{t.totalPrice}</span>
                      <span>{formatPrice(r.subtotal)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Grand total */}
              <div className="flex justify-between items-center text-xl font-bold text-primary-600 pt-2 border-t-2 border-gray-200">
                <span>{t.totalPrice}</span>
                <span>{formatPrice(results.totalPrice)}</span>
              </div>

              {/* Delivery Time */}
              <div className="flex items-center text-gray-600 bg-gray-50 p-4 rounded-xl">
                <Clock className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>{results.deliveryTime}</span>
              </div>

              {/* Contact Buttons */}
              <div className="grid gap-4">
                <button
                  onClick={copyEmail}
                  className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <Mail className="w-5 h-5" />
                  <span>{t.copyEmail}</span>
                </button>

                <a
                  id="wa-btn-calculator"
                  href={waUrl(lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center space-x-3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5" fill="white">
                    <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.9 15.9 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.302 22.602c-.39 1.1-1.932 2.014-3.166 2.28-.846.18-1.95.324-5.67-1.218-4.762-1.972-7.826-6.796-8.064-7.112-.23-.316-1.932-2.572-1.932-4.904s1.222-3.48 1.656-3.958c.434-.478.948-.598 1.264-.598.316 0 .632.002.908.016.292.016.684-.11 1.07.816.39.94 1.326 3.232 1.442 3.466.116.234.194.508.038.816-.156.316-.234.512-.468.79-.234.278-.492.62-.702.832-.234.234-.478.488-.206.958.272.468 1.212 2 2.602 3.238 1.786 1.592 3.292 2.084 3.76 2.318.468.234.742.194 1.014-.118.272-.312 1.17-1.362 1.482-1.832.312-.468.624-.39 1.054-.234.434.156 2.724 1.284 3.19 1.518.468.234.778.352.894.546.116.194.116 1.128-.274 2.228z" />
                  </svg>
                  <span>{t.contactWhatsApp}</span>
                </a>
              </div>

              <div className="md:hidden text-center text-sm text-gray-500">
                {uiT('swipeDown')}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
