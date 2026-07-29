import { Users, Globe, ThumbsUp, Zap } from 'lucide-react';
import type { Lang } from '@/lib/translations';

interface Props {
  lang: Lang;
}

const items = {
  en: [
    { icon: Users, value: '500+', label: 'Happy Clients' },
    { icon: Globe, value: '20+', label: 'Languages' },
    { icon: ThumbsUp, value: '99%', label: 'Satisfaction Rate' },
    { icon: Zap, value: 'Same Day', label: 'Turnaround' },
  ],
  pl: [
    { icon: Users, value: '500+', label: 'Zadowolonych klientów' },
    { icon: Globe, value: '20+', label: 'Języki' },
    { icon: ThumbsUp, value: '99%', label: 'Satysfakcja' },
    { icon: Zap, value: 'Ten sam dzień', label: 'Realizacja' },
  ],
};

export default function TrustStrip({ lang }: Props) {
  const data = items[lang] ?? items.en;

  return (
    <div className="bg-white border-y border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {data.map(({ icon: Icon, value, label }, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-gray-900 leading-none">{value}</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
