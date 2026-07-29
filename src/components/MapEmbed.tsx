'use client';

import { useState } from 'react';
import { CONTACT } from '@/lib/data';
import type { Lang } from '@/lib/translations';
import { getT } from '@/lib/translations';

export default function MapEmbed({ lang }: { lang: Lang }) {
  const t = getT(lang);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-lg relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-40 z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
        </div>
      )}
      <iframe
        src={CONTACT.googleMapsEmbedSrc}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Translation House Office Location"
        className="w-full h-full"
        onLoad={() => setIsLoading(false)}
      />
      <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gradient-to-t from-black to-transparent opacity-80">
        <p className="text-white text-xs sm:text-sm text-center">
          <a
            href={CONTACT.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary-300 transition-colors"
          >
            {t.openInGoogleMaps}
          </a>
        </p>
      </div>
    </div>
  );
}
