import type { Metadata } from 'next';
import type { Lang } from '@/lib/translations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TawkToWidget from '@/components/TawkToWidget';
import ScrollToTop from '@/components/ScrollToTop';
import '../globals.css';

interface Props {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export const metadata: Metadata = {
  title: 'NotaryTranslation',
};

export default async function LangLayout({ children, params }: Props) {
  const { lang: langParam } = await params;
  const lang = (langParam === 'pl' ? 'pl' : 'en') as Lang;

  return (
    <html lang={lang} className="scroll-smooth">
      <body className="flex flex-col min-h-screen overflow-x-hidden bg-white">
        <ScrollToTop />
        <Header lang={lang} />
        <main className="flex-grow">{children}</main>
        <Footer lang={lang} />
        <TawkToWidget />
      </body>
    </html>
  );
}
