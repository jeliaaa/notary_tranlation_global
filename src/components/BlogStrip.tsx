'use client';

import Link from 'next/link';
import type { Lang } from '@/lib/translations';
import { blogPosts } from '@/data/blogs';

interface Props {
  lang: Lang;
}

const labels = {
  en: { heading: 'From The Notary Brief', seeAll: 'See all articles', read: 'min read' },
  pl: { heading: 'Z bloga Translation House', seeAll: 'Wszystkie artykuły', read: 'min czytania' },
};

export default function BlogStrip({ lang }: Props) {
  const c = labels[lang] ?? labels.en;
  const latest = blogPosts.slice(0, 3);

  if (latest.length === 0) return null;

  return (
    <section style={{ marginBottom: 40 }}>
      <div className="blog-strip-header">
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(22px, 2.5vw, 30px)',
            fontWeight: 600,
            margin: 0,
            color: 'var(--nt-ink)',
            letterSpacing: '-0.01em',
          }}
        >
          {c.heading}
        </h2>
        <Link
          href={`/${lang}/blog`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 14,
            fontWeight: 600,
            color: 'var(--nt-pink-700)',
            textDecoration: 'none',
          }}
        >
          {c.seeAll} →
        </Link>
      </div>
      <div className="blog-strip-grid">
        {latest.map((blog) => {
          const title = lang === 'pl' ? blog.titlePl : blog.title;
          return (
            <Link
              key={blog.slug}
              href={`/${lang}/blog/${blog.slug}`}
              style={{
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
                background: '#fff',
                border: '1px solid var(--nt-rule)',
                borderRadius: 12,
                overflow: 'hidden',
                boxShadow: 'var(--sh-sm)',
                transition: 'transform 180ms ease, box-shadow 180ms ease',
              }}
            >
              <div
                style={{ aspectRatio: '16/9', overflow: 'hidden' }}
                className="bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center"
              >
                <span className="text-4xl">📄</span>
              </div>
              <div style={{ padding: '16px 18px 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {blog.category && (
                  <span
                    style={{
                      fontSize: 10.5,
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--nt-pink-700)',
                    }}
                  >
                    {blog.category}
                  </span>
                )}
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 16,
                    fontWeight: 600,
                    margin: 0,
                    color: 'var(--nt-ink)',
                    lineHeight: 1.3,
                    letterSpacing: '-0.005em',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {title}
                </h3>
                <div style={{ fontSize: 12, color: 'var(--nt-muted)' }}>
                  {blog.readingTime} {c.read}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
