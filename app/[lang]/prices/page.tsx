import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import type { Lang } from '@/lib/translations';
import Prices from '@/components/Prices';
import AnimatedSection from '@/components/AnimatedSection';

interface Props {
  params: Promise<{ lang: string }>;
}

const meta = {
  en: {
    title: 'Translation Prices - Translation House',
    description: 'See detailed pricing for translation and notary services. Transparent rates for all supported languages.',
  },
  pl: {
    title: 'Ceny tłumaczeń - Translation House',
    description: 'Zobacz szczegółowy cennik tłumaczeń i usług notarialnych. Przejrzyste stawki dla wszystkich obsługiwanych języków.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: langParam } = await params;
  const lang = (langParam === 'pl' ? 'pl' : 'en') as Lang;
  return { title: meta[lang].title, description: meta[lang].description };
}

export default async function PricesPage({ params }: Props) {
  const { lang: langParam } = await params;
  if (langParam !== 'en' && langParam !== 'pl') redirect('/en');
  const lang = langParam as Lang;

  return (
    <div className="pt-16 sm:pt-20">
      <AnimatedSection>
        <Prices lang={lang} />
      </AnimatedSection>
    </div>
  );
}
