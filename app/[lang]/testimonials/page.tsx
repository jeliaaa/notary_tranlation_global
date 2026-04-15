import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import type { Lang } from '@/lib/translations';
import Testimonials from '@/components/Testimonials';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const titles: Record<string, string> = { en: 'Client Testimonials - Translation House', pl: 'Opinie klientów - Translation House' };
  return { title: titles[lang] ?? titles.en };
}

export default async function TestimonialsPage({ params }: Props) {
  const { lang: langParam } = await params;
  if (langParam !== 'en' && langParam !== 'pl') redirect('/en');
  const lang = langParam as Lang;
  return (
    <div className="pt-16 sm:pt-20">
      <Testimonials lang={lang} />
    </div>
  );
}
