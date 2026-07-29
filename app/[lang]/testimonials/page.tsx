import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import type { Lang } from '@/lib/translations';
import Testimonials from '@/components/Testimonials';
import AnimatedSection from '@/components/AnimatedSection';

interface Props {
  params: Promise<{ lang: string }>;
}

const meta = {
  en: {
    title: 'Client Testimonials - Translation House',
    description: 'Read what our clients say about our sworn translation services. Real reviews and feedback.',
  },
  pl: {
    title: 'Opinie klientów - Translation House',
    description: 'Przeczytaj, co nasi klienci mówią o naszych tłumaczeniach przysięgłych. Prawdziwe opinie i recenzje.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: langParam } = await params;
  const lang = (langParam === 'pl' ? 'pl' : 'en') as Lang;
  return { title: meta[lang].title, description: meta[lang].description };
}

export default async function TestimonialsPage({ params }: Props) {
  const { lang: langParam } = await params;
  if (langParam !== 'en' && langParam !== 'pl') redirect('/en');
  const lang = langParam as Lang;

  return (
    <div className="pt-16 sm:pt-20">
      <AnimatedSection>
        <Testimonials lang={lang} />
      </AnimatedSection>
    </div>
  );
}
