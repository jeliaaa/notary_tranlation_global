import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import type { Lang } from '@/lib/translations';
import BlogList from '@/components/BlogList';

interface Props {
  params: Promise<{ lang: string }>;
}

const meta = {
  en: {
    title: 'Blog — Translation House',
    description:
      'Practical guides, legal updates, and country-by-country checklists for getting your documents recognized abroad.',
  },
  pl: {
    title: 'Blog — Translation House',
    description:
      'Praktyczne poradniki, zmiany prawne i listy kontrolne dla dokumentów uznawanych za granicą.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: langParam } = await params;
  const lang = (langParam === 'pl' ? 'pl' : 'en') as Lang;
  return { title: meta[lang].title, description: meta[lang].description };
}

export default async function BlogPage({ params }: Props) {
  const { lang: langParam } = await params;
  if (langParam !== 'en' && langParam !== 'pl') redirect('/en');
  const lang = langParam as Lang;

  return <BlogList lang={lang} />;
}
