'use client';

import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { Lang } from '@/lib/translations';
import { getT } from '@/lib/translations';
import { CONTACT } from '@/lib/data';
import MapEmbed from './MapEmbed';

interface Props {
  lang: Lang;
}

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 64;
  window.scrollTo({ top, behavior: 'smooth' });
};

export default function Footer({ lang }: Props) {
  const t = getT(lang);
  const router = useRouter();
  const year = new Date().getFullYear();

  const handleEmailCopy = () => {
    navigator.clipboard.writeText(CONTACT.emailForCopy).catch(() => {});
    alert('Email copied');
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Map section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-gray-800">
        <h3 className="text-white font-semibold text-lg mb-6 text-center">{t.ourLocation}</h3>
        <MapEmbed lang={lang} />
      </div>

      {/* 4-column grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="mb-3">
              <Image src="/logo.svg" alt="Translation House" width={140} height={66} />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{t.mainTitle}</p>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t.company}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="hover:text-primary-400 transition-colors"
                >
                  {t.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push(`/${lang}/blog`)}
                  className="hover:text-primary-400 transition-colors"
                >
                  {t.blog}
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push(`/${lang}/privacy`)}
                  className="hover:text-primary-400 transition-colors"
                >
                  {t.privacy}
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push(`/${lang}/terms`)}
                  className="hover:text-primary-400 transition-colors"
                >
                  {t.terms}
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t.services}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection('prices')}
                  className="hover:text-primary-400 transition-colors"
                >
                  {t.documentTranslation}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('prices')}
                  className="hover:text-primary-400 transition-colors"
                >
                  {t.notaryService}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('prices')}
                  className="hover:text-primary-400 transition-colors"
                >
                  {t.expressTranslation}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t.getInTouch}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${CONTACT.phone1.tel}`}
                  className="flex items-center gap-2 hover:text-primary-400 transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  {CONTACT.phone1.display}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phone2.tel}`}
                  className="flex items-center gap-2 hover:text-primary-400 transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  {CONTACT.phone2.display}
                </a>
              </li>
              <li>
                <button
                  onClick={handleEmailCopy}
                  className="flex items-center gap-2 hover:text-primary-400 transition-colors"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  {CONTACT.email}
                </button>
              </li>
              <li>
                <a
                  href={CONTACT.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 hover:text-primary-400 transition-colors"
                >
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{CONTACT.address[lang]}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 py-5 text-center text-sm text-gray-500">
        © {year} Translation House. {t.allRightsReserved}
      </div>
    </footer>
  );
}
