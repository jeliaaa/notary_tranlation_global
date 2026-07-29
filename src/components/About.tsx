import { Calendar, Users, Languages, Briefcase } from 'lucide-react';
import type { Lang } from '@/lib/translations';
import { getT } from '@/lib/translations';

interface Props {
  lang: Lang;
}

const langValues = {
  en: 'English, Polish, Russian, German, French, and others',
  pl: 'Angielski, Polski, Rosyjski, Niemiecki, Francuski i inne',
};

export default function About({ lang }: Props) {
  const t = getT(lang);

  const infoCards = [
    {
      icon: <Calendar className="w-8 h-8 text-primary-600" />,
      title: t.foundationYear,
      value: '2023',
      bgColor: 'bg-blue-50',
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: t.translatorCount,
      value: '50+',
      bgColor: 'bg-green-50',
    },
    {
      icon: <Languages className="w-8 h-8 text-purple-600" />,
      title: t.languages,
      value: langValues[lang] ?? langValues.en,
      bgColor: 'bg-purple-50',
    },
    {
      icon: <Briefcase className="w-8 h-8 text-rose-600" />,
      title: t.specialization,
      value: t.specializationDetails,
      bgColor: 'bg-rose-50',
    },
  ];

  return (
    <section id="about" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">{t.aboutTitle}</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto mb-4" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.detailedInfo}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {infoCards.map((card, index) => (
            <div
              key={index}
              className={`${card.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300`}
            >
              <div className="bg-white rounded-xl p-3 inline-block shadow-sm">{card.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
