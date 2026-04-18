import { Users, Globe, ThumbsUp, Zap, PersonStanding } from 'lucide-react';
import type { Lang } from '@/lib/translations';

interface Props {
  lang: Lang;
}

const items = {
  en: [
    { icon: Users, value: '500+', label: 'Happy Clients' },
    { icon: Globe, value: '20+', label: 'Languages' },
    { icon: PersonStanding, value: '50+', label: 'Sworn Translators' },
    { icon: ThumbsUp, value: '99%', label: 'Satisfaction Rate' },
    { icon: Zap, value: 'Same Day', label: 'Turnaround' },
  ],
  pl: [
    { icon: Users, value: '500+', label: 'Zadowolonych klientów' },
    { icon: Globe, value: '20+', label: 'Języki' },
    { icon: PersonStanding, value: '50+', label: 'Przysięgły Tłumacze' },
    { icon: ThumbsUp, value: '99%', label: 'Satysfakcja' },
    { icon: Zap, value: 'Ten sam dzień', label: 'Realizacja' },
  ],
};

export default function TrustStrip({ lang }: Props) {
  const stats = items[lang];

  return (
    <div className="bg-white border-y border-gray-100 shadow-sm py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary-600" />
              </div>
              <span className="font-bold text-gray-900 text-lg">{value}</span>
              <span className="text-sm text-gray-500">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
