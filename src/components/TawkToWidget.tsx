'use client';

import { useEffect } from 'react';

export default function TawkToWidget() {
  useEffect(() => {
    const propertyId = process.env.NEXT_PUBLIC_TAWKTO_PROPERTY_ID;
    const widgetId = process.env.NEXT_PUBLIC_TAWKTO_WIDGET_ID;
    if (!propertyId || !widgetId) return;

    let loaded = false;

    const loadScript = () => {
      if (loaded) return;
      loaded = true;

      const s = document.createElement('script');
      s.async = true;
      s.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
      s.charset = 'UTF-8';
      s.setAttribute('crossorigin', '*');
      document.head.appendChild(s);
    };

    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0 && scrolled / total >= 0.25) {
        loadScript();
        window.removeEventListener('scroll', onScroll, { passive: true } as AddEventListenerOptions);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll, { passive: true } as AddEventListenerOptions);
  }, []);

  return null;
}
