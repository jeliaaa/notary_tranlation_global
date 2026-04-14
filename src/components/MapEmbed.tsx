'use client';

import { useState } from 'react';
import { CONTACT } from '@/lib/data';
import type { Lang } from '@/lib/translations';
import { getT } from '@/lib/translations';
import { ExternalLink } from 'lucide-react';

export default function MapEmbed({ lang }: { lang: Lang }) {
  const t = getT(lang);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative w-full h-64 rounded-xl overflow-hidden bg-gray-200">
        {!loaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl" />
        )}
        <iframe
          src={CONTACT.googleMapsEmbedSrc}
          className="w-full h-full rounded-xl"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setLoaded(true)}
          title="Our Location"
        />
      </div>
      <div className="mt-3 text-center">
        <a
          href={CONTACT.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          {t.openInGoogleMaps}
        </a>
      </div>
    </div>
  );
}
