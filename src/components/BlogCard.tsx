'use client';

import Link from 'next/link';
import { Clock } from 'lucide-react';
import type { Lang } from '@/lib/translations';
import type { BlogPost } from '@/data/blogs';

const TONE_MAP: Record<string, { bg: string; fg: string }> = {
  'notary': { bg: '#fce7f3', fg: '#9d174d' },
  'pricing': { bg: '#dbeafe', fg: '#1e3a8a' },
  'country': { bg: '#fef3c7', fg: '#854d0e' },
  'legal': { bg: '#fee2e2', fg: '#991b1b' },
  'tips': { bg: '#dcfce7', fg: '#166534' },
  'translation': { bg: '#ede9fe', fg: '#4c1d95' },
  'Default': { bg: '#f3f4f6', fg: '#374151' },
};

function getCategoryTone(category = '') {
  const match = Object.keys(TONE_MAP).find(
    (k) => k !== 'Default' && category.toLowerCase().includes(k)
  );
  return TONE_MAP[match || 'Default'];
}

export function formatBlogDate(dateStr: string, lang: Lang) {
  return new Date(dateStr).toLocaleDateString(lang === 'pl' ? 'pl-PL' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

interface Props {
  blog: BlogPost;
  lang: Lang;
}

export default function BlogCard({ blog, lang }: Props) {
  const title = lang === 'pl' ? blog.titlePl : blog.title;
  const author = lang === 'pl' ? blog.authorPl : blog.author;
  const excerpt = lang === 'pl' ? blog.excerptPl : blog.excerpt;
  const tone = getCategoryTone(blog.category || '');
  const readLabel = lang === 'pl' ? 'min czytania' : 'min read';

  return (
    <article
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        border: '1px solid var(--nt-rule)',
        borderRadius: 14,
        overflow: 'hidden',
        height: '100%',
        boxShadow: '0 1px 3px rgba(15,17,21,0.06)',
        transition: 'box-shadow 200ms ease, transform 180ms ease',
      }}
    >
      <Link
        href={`/${lang}/blog/${blog.slug}`}
        style={{ display: 'flex', flexDirection: 'column', height: '100%', textDecoration: 'none', color: 'inherit' }}
        aria-label={title}
      >
        {/* Image — 16:10 aspect ratio */}
        <div
          style={{ aspectRatio: '16 / 10', overflow: 'hidden', flexShrink: 0 }}
          className="bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center"
        >
          <span className="text-5xl">📄</span>
        </div>

        {/* Body */}
        <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
          {blog.category && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '3px 9px',
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'capitalize',
                background: tone.bg,
                color: tone.fg,
                alignSelf: 'flex-start',
              }}
            >
              {blog.category}
            </span>
          )}

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 18,
              lineHeight: 1.3,
              fontWeight: 600,
              margin: 0,
              color: 'var(--nt-ink)',
              letterSpacing: '-0.005em',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {title}
          </h2>

          {excerpt && (
            <p
              style={{
                fontSize: 13.5,
                lineHeight: 1.55,
                color: 'var(--nt-body)',
                margin: 0,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {excerpt}
            </p>
          )}

          {/* Meta — single compact row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 6,
              fontSize: 12,
              color: 'var(--nt-muted)',
              marginTop: 'auto',
              paddingTop: 12,
              borderTop: '1px solid var(--nt-rule-soft)',
            }}
          >
            <span
              style={{
                color: 'var(--nt-ink-soft)',
                fontWeight: 500,
                maxWidth: 120,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {author}
            </span>
            <span style={{ color: 'var(--nt-faint)' }}>·</span>
            <span>{formatBlogDate(blog.date, lang)}</span>
            <span style={{ color: 'var(--nt-faint)' }}>·</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
              <Clock size={11} /> {blog.readingTime} {readLabel}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
