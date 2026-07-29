import type { Metadata } from 'next';
import type { Lang } from '@/lib/translations';
import { CurrencyProvider } from '@/lib/currency-context';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TawkToWidget from '@/components/TawkToWidget';
import ScrollToTop from '@/components/ScrollToTop';
import WhatsAppButton from '@/components/WhatsAppButton';
import LeadCapturePopup from '@/components/LeadCapturePopup';
import Script from 'next/script';
import '../globals.css';

interface Props {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export const metadata: Metadata = {
  title: 'Translation House',
};

export default async function LangLayout({ children, params }: Props) {
  const { lang: langParam } = await params;
  const lang = (langParam === 'pl' ? 'pl' : 'en') as Lang;

  return (
    <html lang={lang} className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#ec4899" />
      </head>
      <body className={`overflow-x-hidden bg-white lang-${lang}`}>
        <CurrencyProvider>
          <ScrollToTop />
          <div className="min-h-screen w-full relative overflow-x-hidden">
            <div className="flex flex-col min-h-screen w-full">
              <Header lang={lang} />
              <main className="flex-grow">{children}</main>
              <Footer lang={lang} />
              <WhatsAppButton lang={lang} />
              <LeadCapturePopup lang={lang} />
            </div>
          </div>
          <TawkToWidget />
        </CurrencyProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZG73YVWM8Y"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ZG73YVWM8Y');
            `,
          }}
        />
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=109080508', 'ym');

              ym(109080508, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
            `,
          }}
        />
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/109080508" style={{ position: 'absolute', left: '-9999px' }} alt="" />
          </div>
        </noscript>
      </body>
    </html>
  );
}
