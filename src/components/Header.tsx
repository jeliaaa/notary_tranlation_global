// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import Image from 'next/image';
// import { Menu, X, Phone, ChevronDown } from 'lucide-react';
// import type { Lang } from '@/lib/translations';
// import { getT } from '@/lib/translations';
// import { CONTACT } from '@/lib/data';
// import { motion, AnimatePresence } from 'framer-motion';

// interface Props {
//   lang: Lang;
// }

// const scrollToSection = (id: string) => {
//   const el = document.getElementById(id);
//   if (!el) return;
//   const offset = 64;
//   const top = el.getBoundingClientRect().top + window.scrollY - offset;
//   window.scrollTo({ top, behavior: 'smooth' });
// };

// export default function Header({ lang }: Props) {
//   const t = getT(lang);
//   const router = useRouter();
//   const pathname = usePathname();
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener('scroll', onScroll, { passive: true });
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   useEffect(() => {
//     const onResize = () => {
//       if (window.innerWidth >= 768) setMenuOpen(false);
//     };
//     window.addEventListener('resize', onResize);
//     return () => window.removeEventListener('resize', onResize);
//   }, []);

//   const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;

//   const handleNavClick = useCallback(
//     (sectionId: string) => {
//       setMenuOpen(false);
//       if (isHome) {
//         scrollToSection(sectionId);
//       } else {
//         router.push(`/${lang}`);
//         setTimeout(() => scrollToSection(sectionId), 200);
//       }
//     },
//     [isHome, lang, router]
//   );

//   const handleLogoClick = () => {
//     if (isHome) scrollToSection('main');
//     else router.push(`/${lang}`);
//   };

//   const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const newLang = e.target.value as Lang;
//     try {
//       localStorage.setItem('preferredLanguage', newLang);
//     } catch {}
//     const newPath = pathname.replace(/^\/(en|pl)/, `/${newLang}`);
//     router.replace(newPath);
//   };

//   const handlePhoneClick = () => {
//     if (window.innerWidth >= 768) {
//       navigator.clipboard.writeText(CONTACT.phone1.short).catch(() => {});
//       alert('Number copied');
//     } else {
//       window.location.href = `tel:${CONTACT.phone1.short}`;
//     }
//   };

//   const navItems = [
//     { label: t.home, section: 'main' },
//     { label: t.about, section: 'about' },
//     { label: t.prices, section: 'prices' },
//     { label: t.testimonials, section: 'testimonials' },
//   ];

//   return (
//     <header
//       className={`fixed w-full top-0 z-40 transition-all duration-300 ${
//         scrolled
//           ? 'bg-white/95 backdrop-blur-sm shadow-md'
//           : 'bg-white shadow-sm'
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <button
//             onClick={handleLogoClick}
//             className="flex items-center hover:opacity-80 transition-opacity"
//           >
//             <Image src="/logo.svg" alt="Translation House" width={160} height={75} priority />
//           </button>

//           {/* Desktop Nav */}
//           <nav className="hidden md:flex items-center gap-6">
//             {navItems.map((item) => (
//               <button
//                 key={item.section}
//                 onClick={() => handleNavClick(item.section)}
//                 className="text-gray-600 hover:text-gray-900 text-sm font-medium hover:underline underline-offset-4 transition-colors"
//               >
//                 {item.label}
//               </button>
//             ))}
//             <button
//               onClick={() => router.push(`/${lang}/blog`)}
//               className="text-gray-600 hover:text-gray-900 text-sm font-medium hover:underline underline-offset-4 transition-colors"
//             >
//               {t.blog}
//             </button>
//           </nav>

//           {/* Right side */}
//           <div className="flex items-center gap-3">
//             {/* Phone button desktop */}
//             <button
//               onClick={handlePhoneClick}
//               className="hidden md:flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
//             >
//               <Phone className="w-4 h-4" />
//               {CONTACT.phone1.short}
//             </button>

//             {/* Language selector */}
//             <div className="relative">
//               <select
//                 value={lang}
//                 onChange={handleLangChange}
//                 className="appearance-none bg-primary-600 text-white text-sm font-semibold px-3 py-1.5 pr-7 rounded-lg border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400"
//                 style={{ backgroundImage: 'none' }}
//               >
//                 <option value="en">EN</option>
//                 <option value="pl">PL</option>
//               </select>
//               <ChevronDown className="w-3.5 h-3.5 text-white absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
//             </div>

//             {/* Hamburger */}
//             <button
//               onClick={() => setMenuOpen((v) => !v)}
//               className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
//               aria-label="Toggle menu"
//             >
//               {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile phone banner (shown when menu is closed) */}
//       {!menuOpen && (
//         <div className="md:hidden">
//           <a
//             href={`tel:${CONTACT.phone1.short}`}
//             className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm py-2 font-medium"
//           >
//             <Phone className="w-4 h-4" />
//             {CONTACT.phone1.display}
//           </a>
//         </div>
//       )}

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: 'auto', opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.25 }}
//             className="md:hidden overflow-hidden bg-white border-t border-gray-100 shadow-lg"
//           >
//             <div className="px-4 py-3 flex flex-col gap-1">
//               {navItems.map((item) => (
//                 <button
//                   key={item.section}
//                   onClick={() => handleNavClick(item.section)}
//                   className="text-left text-gray-700 hover:text-primary-600 py-2.5 px-3 rounded-lg hover:bg-primary-50 text-sm font-medium transition-colors"
//                 >
//                   {item.label}
//                 </button>
//               ))}
//               <button
//                 onClick={() => {
//                   setMenuOpen(false);
//                   router.push(`/${lang}/blog`);
//                 }}
//                 className="text-left text-gray-700 hover:text-primary-600 py-2.5 px-3 rounded-lg hover:bg-primary-50 text-sm font-medium transition-colors"
//               >
//                 {t.blog}
//               </button>
//               <a
//                 href={`tel:${CONTACT.phone1.short}`}
//                 className="flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-2.5 px-3 rounded-lg text-sm font-medium mt-1"
//               >
//                 <Phone className="w-4 h-4" />
//                 {CONTACT.phone1.display}
//               </a>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// }

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X, ChevronDown, MessageCircle } from 'lucide-react';
import type { Lang } from '@/lib/translations';
import { getT } from '@/lib/translations';
import { CONTACT } from '@/lib/data';
import { useCurrency, type Currency } from '@/lib/currency-context';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  lang: Lang;
}

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 64;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
};

export default function Header({ lang }: Props) {
  const t = getT(lang);
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { currency, setCurrency } = useCurrency();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;

  const handleNavClick = useCallback(
    (sectionId: string) => {
      setMenuOpen(false);
      if (isHome) {
        scrollToSection(sectionId);
      } else {
        router.push(`/${lang}`);
        setTimeout(() => scrollToSection(sectionId), 200);
      }
    },
    [isHome, lang, router]
  );

  const handleLogoClick = () => {
    if (isHome) scrollToSection('main');
    else router.push(`/${lang}`);
  };

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value as Lang;
    try {
      localStorage.setItem('preferredLanguage', newLang);
    } catch {}
    const newPath = pathname.replace(/^\/(en|pl)/, `/${newLang}`);
    router.replace(newPath);
  };

  // ✅ Proper WhatsApp link
  const getWhatsAppLink = () => {
    const phone = CONTACT.phone1.short.replace(/\D/g, '');
    const message = encodeURIComponent('Hello, I would like to get more information.');
    return `https://wa.me/${phone}?text=${message}`;
  };

  const navItems = [
    { label: t.home, section: 'main' },
    { label: t.about, section: 'about' },
    { label: t.prices, section: 'prices' },
    { label: t.testimonials, section: 'testimonials' },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-md'
          : 'bg-white shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <Image
              src="/logo.svg"
              alt="Translation House"
              width={160}
              height={75}
              priority
            />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => handleNavClick(item.section)}
                className="text-gray-600 hover:text-gray-900 text-sm font-medium hover:underline underline-offset-4 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => router.push(`/${lang}/blog`)}
              className="text-gray-600 hover:text-gray-900 text-sm font-medium hover:underline underline-offset-4 transition-colors"
            >
              {t.blog}
            </button>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* WhatsApp Desktop */}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>

            {/* Currency toggle */}
            <div className="flex bg-gray-100 rounded-lg p-0.5">
              {(['PLN', 'EUR'] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                    currency === c
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {c === 'PLN' ? 'PLN' : 'EUR'}
                </button>
              ))}
            </div>

            {/* Language selector */}
            <div className="relative">
              <select
                value={lang}
                onChange={handleLangChange}
                className="appearance-none bg-primary-600 text-white text-sm font-semibold px-3 py-1.5 pr-7 rounded-lg border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400"
                style={{ backgroundImage: 'none' }}
              >
                <option value="en">EN</option>
                <option value="pl">PL</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-white absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile WhatsApp banner */}
      {!menuOpen && (
        <div className="md:hidden">
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm py-2 font-medium"
          >
            <MessageCircle className="w-4 h-4" />
            Chat on WhatsApp
          </a>
        </div>
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => handleNavClick(item.section)}
                  className="text-left text-gray-700 hover:text-primary-600 py-2.5 px-3 rounded-lg hover:bg-primary-50 text-sm font-medium transition-colors"
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={() => {
                  setMenuOpen(false);
                  router.push(`/${lang}/blog`);
                }}
                className="text-left text-gray-700 hover:text-primary-600 py-2.5 px-3 rounded-lg hover:bg-primary-50 text-sm font-medium transition-colors"
              >
                {t.blog}
              </button>

              {/* WhatsApp Mobile */}
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-2.5 px-3 rounded-lg text-sm font-medium mt-1"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}