'use client';

import Image from 'next/image';
import { MessageCircle, Mail, MapPin } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import type { Lang } from '@/lib/translations';
import { getT } from '@/lib/translations';
import { CONTACT, waUrl } from '@/lib/data';
import MapEmbed from './MapEmbed';

interface Props {
  lang: Lang;
}

export default function Footer({ lang }: Props) {
  const t = getT(lang);
  const router = useRouter();
  const pathname = usePathname();
  const year = new Date().getFullYear();

  const handleEmailClick = () => {
    navigator.clipboard.writeText(CONTACT.email).catch(() => {});
    alert(lang === 'pl' ? 'Email skopiowany' : 'Email copied to clipboard');
  };

  const scrollToSection = (sectionId: string) => {
    const isHomePage = pathname === `/${lang}` || pathname === `/${lang}/`;

    if (!isHomePage) {
      sessionStorage.setItem('scrollTarget', sectionId);
      router.push(`/${lang}`);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const offsetPosition = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleNavClick = (e: React.MouseEvent, section: string) => {
    e.preventDefault();
    if (section === 'blog') {
      router.push(`/${lang}/blog`);
    } else {
      scrollToSection(section);
    }
  };

  const companyLinks: { key: keyof typeof t; section?: string; url?: string }[] = [
    { key: 'about', section: 'about' },
    { key: 'blog', section: 'blog' },
    { key: 'privacy', url: `/${lang}/privacy` },
    { key: 'terms', url: `/${lang}/terms` },
  ];

  const serviceLinks: { key: keyof typeof t; section: string }[] = [
    { key: 'documentTranslation', section: 'prices' },
    { key: 'notaryService', section: 'prices' },
    { key: 'expressTranslation', section: 'prices' },
  ];

  const titleClass = 'text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4';

  return (
    <footer className="bg-gray-900 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Map section */}
        <div className="py-8 sm:py-12 border-b border-gray-800">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 text-center">{t.ourLocation}</h2>
          <div className="max-w-3xl mx-auto">
            <MapEmbed lang={lang} />
          </div>
        </div>

        {/* Main footer content */}
        <div className="py-8 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Logo and company description */}
            <div className="col-span-1">
              <button
                onClick={(e) => handleNavClick(e, 'main')}
                className="flex items-center text-white mb-3 sm:mb-4"
              >
                <Image src="/logo.svg" alt="Translation House" width={140} height={66} className="h-9 w-auto" />
              </button>
              <p className="text-gray-400 text-sm">{t.mainTitle}</p>
            </div>

            {/* Company links */}
            <div>
              <h3 className={titleClass}>{t.company}</h3>
              <ul className="space-y-2 sm:space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.key}>
                    {link.section ? (
                      <button
                        onClick={(e) => handleNavClick(e, link.section!)}
                        className="text-gray-300 hover:text-white transition duration-150 ease-in-out"
                      >
                        {t[link.key]}
                      </button>
                    ) : (
                      <a
                        href={link.url}
                        className="text-gray-300 hover:text-white transition duration-150 ease-in-out"
                      >
                        {t[link.key]}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className={titleClass}>{t.services}</h3>
              <ul className="space-y-2 sm:space-y-3">
                {serviceLinks.map((service) => (
                  <li key={service.key}>
                    <button
                      onClick={(e) => handleNavClick(e, service.section)}
                      className="text-gray-300 hover:text-white transition duration-150 ease-in-out"
                    >
                      {t[service.key]}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact information */}
            <div>
              <h3 className={titleClass}>{t.getInTouch}</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <a
                    href={waUrl(lang)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-300 hover:text-white transition duration-150 ease-in-out"
                  >
                    <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{t.contactViaWhatsApp}</span>
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleEmailClick}
                    className="flex items-center text-gray-300 hover:text-white transition duration-150 ease-in-out"
                  >
                    <Mail className="h-5 w-5 mr-3 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{CONTACT.email}</span>
                  </button>
                </li>
                <li>
                  <a
                    href={CONTACT.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start text-gray-300 hover:text-white transition duration-150 ease-in-out"
                  >
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{CONTACT.address[lang]}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 py-4 sm:py-6">
          <p className="text-center text-xs sm:text-sm text-gray-400">
            © {year} Translation House. {t.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
}
