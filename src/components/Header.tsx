'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X, ChevronDown, MessageCircle } from 'lucide-react';
import type { Lang } from '@/lib/translations';
import { getT } from '@/lib/translations';
import { waUrl } from '@/lib/data';
import { useCurrency, type Currency } from '@/lib/currency-context';

interface Props {
  lang: Lang;
}

const HEADER_OFFSET = 64;

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior: 'smooth' });
};

export default function Header({ lang }: Props) {
  const t = getT(lang);
  const router = useRouter();
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currency, setCurrency } = useCurrency();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu when screen size changes from mobile to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Deferred scroll target set by other pages (e.g. the footer links)
  useEffect(() => {
    const target = sessionStorage.getItem('scrollTarget');
    if (!target) return;
    sessionStorage.removeItem('scrollTarget');
    const attempt = (tries: number) => {
      const el = document.getElementById(target);
      if (el) {
        scrollToSection(target);
      } else if (tries > 0) {
        setTimeout(() => attempt(tries - 1), 150);
      }
    };
    setTimeout(() => attempt(10), 100);
  }, [pathname]);

  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;

  const handleNavClick = useCallback(
    (item: { section?: string; isBlog?: boolean }) => {
      setMenuOpen(false);

      if (item.isBlog) {
        router.push(`/${lang}/blog`);
        return;
      }

      if (!isHome) {
        sessionStorage.setItem('scrollTarget', item.section!);
        router.push(`/${lang}`);
      } else {
        document.getElementById(item.section!)?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [isHome, lang, router]
  );

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value as Lang;
    try {
      localStorage.setItem('preferredLanguage', newLang);
    } catch {}
    const newPath = pathname.replace(/^\/(en|pl)/, `/${newLang}`);
    router.replace(newPath);
  };

  const navigationItems: { key: keyof typeof t; section?: string; isBlog?: boolean }[] = [
    { key: 'home', section: 'main' },
    { key: 'about', section: 'about' },
    { key: 'prices', section: 'prices' },
    { key: 'testimonials', section: 'testimonials' },
    { key: 'blog', isBlog: true },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-40 overflow-x-hidden transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-2 py-2 sm:px-4 sm:py-3 lg:px-8">
          {/* Logo */}
          <button
            onClick={() => handleNavClick({ section: 'main' })}
            className="flex items-center hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <Image
              src="/logo.svg"
              alt="Translation House"
              width={160}
              height={75}
              priority
              className="h-8 sm:h-10 w-auto"
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="flex flex-wrap justify-center space-x-2 lg:space-x-4">
              {navigationItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item)}
                  className="text-gray-600 hover:text-gray-900 transition-colors text-xs lg:text-sm px-1.5 py-1"
                >
                  {t[item.key]}
                </button>
              ))}
            </div>
          </nav>

          {/* Right side items */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            <a
              href={waUrl(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center px-2 py-1.5 sm:px-3 sm:py-2 text-white bg-gradient-to-r from-primary-500 to-secondary-500
                         rounded-md hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 text-xs lg:text-sm"
            >
              <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-1.5" />
              WhatsApp
            </a>

            {/* Currency toggle */}
            <div className="flex bg-gray-100 rounded-md p-0.5">
              {(['PLN', 'EUR'] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2 py-1 text-[11px] sm:text-xs font-semibold rounded transition-colors ${
                    currency === c
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Language selector */}
            <div className="relative">
              <select
                value={lang}
                onChange={handleLangChange}
                style={{ backgroundImage: 'none' }}
                className="appearance-none bg-primary-600 text-white px-2 py-1.5 sm:px-3 sm:py-2 pr-6 sm:pr-8 rounded-md cursor-pointer hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 text-xs sm:text-sm"
              >
                <option value="en">EN</option>
                <option value="pl">PL</option>
              </select>
              <ChevronDown className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-white pointer-events-none" />
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden p-1 sm:p-1.5 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className="md:hidden bg-white border-t border-gray-200 shadow-lg max-w-full"
        style={{
          overflow: 'hidden',
          maxHeight: menuOpen ? '400px' : 0,
          opacity: menuOpen ? 1 : 0,
          transition: 'max-height 0.2s ease, opacity 0.2s ease',
        }}
      >
        <div className="px-3 pt-2 pb-3 space-y-1 overflow-x-hidden">
          {navigationItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleNavClick(item)}
              className="block w-full text-left px-2 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              {t[item.key]}
            </button>
          ))}
          <a
            href={waUrl(lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center px-2 py-2 rounded-md text-sm font-medium text-primary-600 hover:text-primary-800 hover:bg-gray-50"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            WhatsApp
          </a>
        </div>
      </div>

      {/* Mobile WhatsApp banner */}
      {!menuOpen && (
        <div className="md:hidden bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-center py-1">
          <a
            href={waUrl(lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center text-xs"
          >
            <MessageCircle className="h-3 w-3 mr-1" />
            <span>{t.contactViaWhatsApp}</span>
          </a>
        </div>
      )}
    </header>
  );
}
