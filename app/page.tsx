'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    let lang = 'en';
    try {
      const stored = localStorage.getItem('preferredLanguage');
      if (stored === 'en' || stored === 'pl') lang = stored;
    } catch {
      // localStorage not available (SSR guard)
    }
    router.replace(`/${lang}`);
  }, [router]);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600" />
        </div>
      </body>
    </html>
  );
}
