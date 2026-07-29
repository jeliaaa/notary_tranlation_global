'use client';

import type { Lang } from '@/lib/translations';
import { waUrl } from '@/lib/data';

// Always on screen from first paint (desktop only — `hidden md:flex`), which is
// how the button behaves on notarytranslation.ge.
export default function WhatsAppButton({ lang }: { lang: Lang }) {
  return (
    <a
      id="wa-btn-floating"
      href={waUrl(lang)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="hidden md:flex"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: '#25D366',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.25)';
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="white">
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.9 15.9 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.302 22.602c-.39 1.1-1.932 2.014-3.166 2.28-.846.18-1.95.324-5.67-1.218-4.762-1.972-7.826-6.796-8.064-7.112-.23-.316-1.932-2.572-1.932-4.904s1.222-3.48 1.656-3.958c.434-.478.948-.598 1.264-.598.316 0 .632.002.908.016.292.016.684-.11 1.07.816.39.94 1.326 3.232 1.442 3.466.116.234.194.508.038.816-.156.316-.234.512-.468.79-.234.278-.492.62-.702.832-.234.234-.478.488-.206.958.272.468 1.212 2 2.602 3.238 1.786 1.592 3.292 2.084 3.76 2.318.468.234.742.194 1.014-.118.272-.312 1.17-1.362 1.482-1.832.312-.468.624-.39 1.054-.234.434.156 2.724 1.284 3.19 1.518.468.234.778.352.894.546.116.194.116 1.128-.274 2.228z" />
      </svg>
    </a>
  );
}
