import type { Metadata } from 'next';
import type { Lang } from '@/lib/translations';
import { CurrencyProvider } from '@/lib/currency-context';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TawkToWidget from '@/components/TawkToWidget';
import ScrollToTop from '@/components/ScrollToTop';
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
      <body className="flex flex-col min-h-screen overflow-x-hidden bg-white">
        <CurrencyProvider>
          <ScrollToTop />
          <Header lang={lang} />
          <main className="flex-grow">{children}</main>
          <Footer lang={lang} />
          <TawkToWidget />
        </CurrencyProvider>
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
              })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=109077745', 'ym');

              ym(109077745, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
            `,
          }}
        />
      </body>
    </html>
  );
}
