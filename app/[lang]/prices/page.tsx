import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import type { Lang } from '@/lib/translations';
import Prices from '@/components/Prices';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const titles: Record<string, string> = { en: 'Translation Prices - Translation House', pl: 'Ceny - Translation House' };
  return { title: titles[lang] ?? titles.en };
}

export default async function PricesPage({ params }: Props) {
  const { lang: langParam } = await params;
  if (langParam !== 'en' && langParam !== 'pl') redirect('/en');
  const lang = langParam as Lang;
  return (
    <div className="pt-16 sm:pt-20">
      <Prices lang={lang} />
    </div>
  );
}
