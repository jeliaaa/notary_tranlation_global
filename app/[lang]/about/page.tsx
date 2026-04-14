import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import type { Lang } from '@/lib/translations';
import About from '@/components/About';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const titles: Record<string, string> = { en: 'About Us - NotaryTranslation', pl: 'O nas - NotaryTranslation' };
  return { title: titles[lang] ?? titles.en };
}

export default async function AboutPage({ params }: Props) {
  const { lang: langParam } = await params;
  if (langParam !== 'en' && langParam !== 'pl') redirect('/en');
  const lang = langParam as Lang;
  return (
    <div className="pt-16 sm:pt-20">
      <About lang={lang} />
    </div>
  );
}
