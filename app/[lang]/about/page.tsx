import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import type { Lang } from '@/lib/translations';
import About from '@/components/About';
import AnimatedSection from '@/components/AnimatedSection';

interface Props {
  params: Promise<{ lang: string }>;
}

const meta = {
  en: {
    title: 'About Us - Translation House',
    description: 'Learn about Translation House, our team, experience, and commitment to professional sworn translation services.',
  },
  pl: {
    title: 'O nas - Translation House',
    description: 'Poznaj Translation House — nasz zespół, doświadczenie i profesjonalne usługi tłumaczeń przysięgłych.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: langParam } = await params;
  const lang = (langParam === 'pl' ? 'pl' : 'en') as Lang;
  return { title: meta[lang].title, description: meta[lang].description };
}

export default async function AboutPage({ params }: Props) {
  const { lang: langParam } = await params;
  if (langParam !== 'en' && langParam !== 'pl') redirect('/en');
  const lang = langParam as Lang;

  return (
    <div className="pt-16 sm:pt-20">
      <AnimatedSection>
        <About lang={lang} />
      </AnimatedSection>
    </div>
  );
}
