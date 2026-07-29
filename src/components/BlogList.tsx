'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Search, Clock, ArrowRight, Check, Mail, ChevronLeft, ChevronRight,
  BookOpen, Globe, Shield, Tag,
} from 'lucide-react';
import type { Lang } from '@/lib/translations';
import { blogPosts, type BlogPost } from '@/data/blogs';
import { CONTACT, PHONE_URL } from '@/lib/data';
import BlogCard, { formatBlogDate } from '@/components/BlogCard';

interface Props {
  lang: Lang;
}

const ITEMS_PER_PAGE = 6;

const POPULAR_TOPICS = {
  en: ['Notary', 'Documents', 'Same-day', 'Diploma', 'Tips'],
  pl: ['Notarialne', 'Dokumenty', 'Ten sam dzień', 'Dyplom', 'Wskazówki'],
};

const CATEGORY_ICONS: Record<string, typeof BookOpen> = {
  tips: BookOpen,
  country: Globe,
  legal: Shield,
  pricing: Tag,
  notary: Shield,
  translation: Globe,
  Default: BookOpen,
};

function getCategoryIcon(name = '') {
  const entry = Object.entries(CATEGORY_ICONS).find(
    ([k]) => k !== 'Default' && name.toLowerCase().includes(k)
  );
  return entry ? entry[1] : CATEGORY_ICONS.Default;
}

function getInitials(name = '') {
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

const T = {
  en: {
    title: 'Blog',
    journal: 'The Translation House Journal',
    updated: 'Updated weekly',
    h1: 'Practical guides, legal updates, and country-by-country checklists for getting your documents recognized abroad.',
    search: 'Search articles — try "notary translation"',
    latest: 'Latest articles',
    noBlogs: 'No articles found.',
    featured: 'Featured guide',
    browse: 'Browse by topic',
    all: 'All articles',
    translator: 'Translator',
    readFull: 'Read the full guide',
    needTranslation: 'Need a translation?',
    ctaHeading: 'Send your document. Get a quote in under 5 minutes.',
    ctaBullets: ['Notary-certified, accepted abroad', 'Same-day available', 'EN · PL · RU · DE · FR · ES'],
    order: 'Order a translation',
    orCall: 'or call',
    newsletter: 'The Notary Brief',
    newsletterBody: 'Monthly: regulatory changes, country checklists, reader Q&A. No marketing.',
    subscribe: 'Subscribe',
    unsubscribe: 'Unsubscribe anytime',
    popular: 'Popular:',
    showing: (n: number) => `Showing ${n} article${n !== 1 ? 's' : ''}`,
    previous: 'Previous',
    next: 'Next',
    home: 'Home',
    min: 'min',
  },
  pl: {
    title: 'Blog',
    journal: 'Dziennik Translation House',
    updated: 'Aktualizowane co tydzień',
    h1: 'Praktyczne poradniki, zmiany prawne i listy kontrolne dla dokumentów uznawanych za granicą.',
    search: 'Szukaj artykułów — spróbuj „tłumaczenie notarialne”',
    latest: 'Najnowsze artykuły',
    noBlogs: 'Nie znaleziono artykułów.',
    featured: 'Polecany poradnik',
    browse: 'Przeglądaj tematy',
    all: 'Wszystkie artykuły',
    translator: 'Tłumacz',
    readFull: 'Przeczytaj cały poradnik',
    needTranslation: 'Potrzebujesz tłumaczenia?',
    ctaHeading: 'Wyślij dokument. Wycena w mniej niż 5 minut.',
    ctaBullets: ['Poświadczone notarialnie, uznawane za granicą', 'Dostępne tego samego dnia', 'EN · PL · RU · DE · FR · ES'],
    order: 'Zamów tłumaczenie',
    orCall: 'lub zadzwoń',
    newsletter: 'The Notary Brief',
    newsletterBody: 'Co miesiąc: zmiany przepisów, listy kontrolne krajów, pytania czytelników. Bez marketingu.',
    subscribe: 'Zapisz się',
    unsubscribe: 'Wypisz się w każdej chwili',
    popular: 'Popularne:',
    showing: (n: number) => `${n} artykułów`,
    previous: 'Poprzednia',
    next: 'Następna',
    home: 'Strona główna',
    min: 'min',
  },
};

/* ---------- Featured Hero Post ---------- */
function FeaturedPost({ blog, lang }: { blog: BlogPost; lang: Lang }) {
  const t = T[lang];
  const title = lang === 'pl' ? blog.titlePl : blog.title;
  const excerpt = lang === 'pl' ? blog.excerptPl : blog.excerpt;
  const author = lang === 'pl' ? blog.authorPl : blog.author;

  return (
    <Link href={`/${lang}/blog/${blog.slug}`} className="blog-featured block no-underline text-inherit">
      {/* Image */}
      <div className="blog-featured-image bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
        <span className="text-6xl">📄</span>
        <span
          style={{
            position: 'absolute',
            top: 16,
            left: 16,
            padding: '6px 12px',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(6px)',
            color: 'var(--nt-pink-700)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            borderRadius: 999,
          }}
        >
          {t.featured}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '36px 36px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {blog.category && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 10px',
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'capitalize',
              background: '#fce7f3',
              color: '#9d174d',
              alignSelf: 'flex-start',
            }}
          >
            {blog.category}
          </span>
        )}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 28,
            lineHeight: 1.2,
            fontWeight: 600,
            margin: 0,
            color: 'var(--nt-ink)',
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </h2>
        {excerpt && (
          <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--nt-body)', margin: 0 }}>{excerpt}</p>
        )}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 16,
            marginTop: 'auto',
            borderTop: '1px solid var(--nt-rule)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ec4899, #be185d)',
                color: '#fff',
                fontWeight: 700,
                fontSize: 13,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {getInitials(author)}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--nt-ink)' }}>{author}</div>
              <div style={{ fontSize: 12, color: 'var(--nt-muted)', marginTop: 1 }}>{t.translator}</div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--nt-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>{formatBlogDate(blog.date, lang)}</span>
            <span style={{ color: 'var(--nt-faint)' }}>·</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Clock size={12} /> {blog.readingTime} {t.min}
            </span>
          </div>
        </div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            color: 'var(--nt-pink-700)',
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          {t.readFull} <ArrowRight size={16} />
        </div>
      </div>
    </Link>
  );
}

/* ---------- Sidebar ---------- */
function Sidebar({
  lang,
  categories,
  activeCategory,
  onCategoryChange,
}: {
  lang: Lang;
  categories: { slug: string; name: string; count: number }[];
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
}) {
  const t = T[lang];
  const [email, setEmail] = useState('');

  return (
    <aside style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Category filter */}
      <div style={{ background: '#fff', border: '1px solid var(--nt-rule)', borderRadius: 14, padding: '20px 18px' }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--nt-muted)',
            marginBottom: 12,
          }}
        >
          {t.browse}
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {categories.map((cat) => {
            const CatIcon = getCategoryIcon(cat.name);
            const isActive = activeCategory === cat.slug;
            return (
              <li key={cat.slug}>
                <button
                  onClick={() => onCategoryChange(cat.slug)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '9px 10px',
                    background: isActive ? 'var(--nt-pink-50)' : 'transparent',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 13.5,
                    color: isActive ? 'var(--nt-pink-700)' : 'var(--nt-body)',
                    fontWeight: isActive ? 600 : 400,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    textAlign: 'left',
                    textTransform: 'capitalize',
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                    <CatIcon size={14} />
                    <span>{cat.name}</span>
                  </span>
                  <span style={{ fontSize: 11.5, color: 'var(--nt-muted)', fontWeight: 500 }}>{cat.count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Pink CTA card */}
      <div
        style={{
          background: 'linear-gradient(160deg, var(--nt-pink-700) 0%, var(--nt-pink) 100%)',
          borderRadius: 14,
          padding: '22px 20px 20px',
          color: '#fff',
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.8)',
            marginBottom: 8,
          }}
        >
          {t.needTranslation}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 18,
            lineHeight: 1.3,
            fontWeight: 600,
            color: '#fff',
            marginBottom: 14,
            letterSpacing: '-0.005em',
          }}
        >
          {t.ctaHeading}
        </div>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '0 0 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            fontSize: 13,
            color: 'rgba(255,255,255,0.92)',
          }}
        >
          {t.ctaBullets.map((item, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Check size={14} strokeWidth={2.5} /> {item}
            </li>
          ))}
        </ul>
        <Link
          href={`/${lang}`}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            background: '#fff',
            color: 'var(--nt-pink-700)',
            border: 'none',
            padding: '11px 14px',
            borderRadius: 8,
            fontSize: 13.5,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'inherit',
            textDecoration: 'none',
          }}
        >
          {t.order} <ArrowRight size={15} />
        </Link>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', textAlign: 'center', marginTop: 10 }}>
          {t.orCall}{' '}
          <a href={PHONE_URL} style={{ color: '#fff', fontWeight: 600 }}>
            {CONTACT.phone1.display}
          </a>
        </div>
      </div>

      {/* Dark newsletter */}
      <div style={{ background: '#0f1115', color: '#fff', borderRadius: 14, padding: '22px 20px' }}>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 16,
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 8,
            color: '#fff',
          }}
        >
          <Mail size={16} strokeWidth={2} /> {t.newsletter}
        </div>
        <p style={{ fontSize: 13, lineHeight: 1.55, color: 'rgba(255,255,255,0.7)', margin: '0 0 14px' }}>
          {t.newsletterBody}
        </p>
        <div style={{ display: 'flex', gap: 6 }}>
          <input
            style={{
              flex: 1,
              height: 36,
              padding: '0 12px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 8,
              color: '#fff',
              fontSize: 13,
              fontFamily: 'inherit',
              outline: 'none',
            }}
            placeholder="you@firm.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            style={{
              background: 'var(--nt-pink)',
              color: '#fff',
              border: 'none',
              padding: '0 14px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {t.subscribe}
          </button>
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 10 }}>{t.unsubscribe}</div>
      </div>
    </aside>
  );
}

/* ---------- Pagination ---------- */
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  labels,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (p: number) => void;
  labels: { previous: string; next: string };
}) {
  const pages: (number | string)[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push('...');
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  return (
    <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, marginTop: 8 }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: '#fff',
          border: '1px solid var(--nt-rule)',
          padding: '9px 16px',
          borderRadius: 8,
          fontSize: 13,
          fontWeight: 500,
          color: currentPage === 1 ? 'var(--nt-faint)' : 'var(--nt-body)',
          cursor: currentPage === 1 ? 'default' : 'pointer',
          fontFamily: 'inherit',
        }}
      >
        <ChevronLeft size={14} /> {labels.previous}
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {pages.map((p, i) =>
          p === '...' ? (
            <span key={`ellipsis-${i}`} style={{ color: 'var(--nt-faint)', padding: '0 4px' }}>…</span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              style={{
                width: 36,
                height: 36,
                border: p === currentPage ? '1px solid var(--nt-pink)' : '1px solid transparent',
                background: p === currentPage ? 'var(--nt-pink)' : 'transparent',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 500,
                color: p === currentPage ? '#fff' : 'var(--nt-body)',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              {p}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: '#fff',
          border: '1px solid var(--nt-rule)',
          padding: '9px 16px',
          borderRadius: 8,
          fontSize: 13,
          fontWeight: 500,
          color: currentPage === totalPages ? 'var(--nt-faint)' : 'var(--nt-body)',
          cursor: currentPage === totalPages ? 'default' : 'pointer',
          fontFamily: 'inherit',
        }}
      >
        {labels.next} <ChevronRight size={14} />
      </button>
    </nav>
  );
}

/* ---------- Main BlogList ---------- */
export default function BlogList({ lang }: Props) {
  const t = T[lang];

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const blogs = blogPosts;

  // Build category list from blogs
  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    blogs.forEach((b) => {
      const cat = b.category || 'General';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    const list = [{ slug: 'all', name: t.all, count: blogs.length }];
    Object.entries(counts).forEach(([name, count]) => {
      list.push({ slug: name.toLowerCase().replace(/\s+/g, '-'), name, count });
    });
    return list;
  }, [blogs, t.all]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const title = lang === 'pl' ? blog.titlePl : blog.title;
      const excerpt = lang === 'pl' ? blog.excerptPl : blog.excerpt;
      const q = searchTerm.toLowerCase();
      const searchMatch =
        searchTerm === '' ||
        title.toLowerCase().includes(q) ||
        excerpt.toLowerCase().includes(q) ||
        (blog.category || '').toLowerCase().includes(q);
      const catMatch =
        activeCategory === 'all' ||
        (blog.category || 'General').toLowerCase().replace(/\s+/g, '-') === activeCategory;
      return searchMatch && catMatch;
    });
  }, [blogs, searchTerm, activeCategory, lang]);

  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);

  const currentBlogs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBlogs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredBlogs, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory]);

  // Featured post = first blog (skip in listing below)
  const featuredBlog = blogs[0];
  const showFeatured = !!featuredBlog && currentPage === 1 && searchTerm === '' && activeCategory === 'all';
  const listingBlogs = showFeatured
    ? currentBlogs.filter((b) => b.slug !== featuredBlog.slug)
    : currentBlogs;

  return (
    <div style={{ background: '#fff', color: 'var(--nt-ink)', minHeight: '100vh' }}>
      {/* ── Masthead ── */}
      <section
        style={{
          background: 'linear-gradient(180deg, var(--nt-pink-50) 0%, #ffffff 100%)',
          borderBottom: '1px solid var(--nt-rule)',
          paddingTop: 80,
        }}
      >
        <div className="blog-masthead-inner">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: 'var(--nt-pink-700)', marginBottom: 18 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
              {t.journal}
            </span>
            <span style={{ color: 'var(--nt-faint)' }}>·</span>
            <span style={{ fontSize: 12, color: 'var(--nt-muted)', letterSpacing: '0.04em' }}>{t.updated}</span>
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(26px, 3vw, 40px)',
              lineHeight: 1.15,
              fontWeight: 600,
              margin: '0 auto 32px',
              maxWidth: 820,
              color: 'var(--nt-ink)',
              letterSpacing: '-0.015em',
            }}
          >
            {t.h1}
          </h1>

          {/* Search bar */}
          <div style={{ position: 'relative', maxWidth: 620, margin: '0 auto' }}>
            <span style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', color: 'var(--nt-muted)' }}>
              <Search size={18} strokeWidth={2} />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.search}
              style={{
                width: '100%',
                height: 52,
                padding: '0 80px 0 48px',
                background: '#fff',
                border: '1px solid var(--nt-rule)',
                borderRadius: 999,
                fontSize: 14,
                color: 'var(--nt-ink)',
                boxShadow: 'var(--sh-sm)',
                outline: 'none',
                fontFamily: 'inherit',
              }}
            />
            <kbd
              style={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: 11,
                fontWeight: 600,
                background: '#f3f4f6',
                border: '1px solid var(--nt-rule)',
                borderRadius: 6,
                padding: '3px 8px',
                color: 'var(--nt-muted)',
                fontFamily: 'monospace',
              }}
            >
              ⌘K
            </kbd>
          </div>

          {/* Popular topics */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 8, marginTop: 20, fontSize: 13 }}>
            <span style={{ color: 'var(--nt-muted)', fontSize: 13, alignSelf: 'center', marginRight: 4 }}>
              {t.popular}
            </span>
            {POPULAR_TOPICS[lang].map((topic) => (
              <button
                key={topic}
                onClick={() => setSearchTerm(topic)}
                style={{
                  padding: '6px 12px',
                  background: '#fff',
                  border: '1px solid var(--nt-rule)',
                  borderRadius: 999,
                  color: 'var(--nt-body)',
                  fontSize: 12.5,
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main content ── */}
      <div className="blog-layout">
        {/* Content column */}
        <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 56 }}>
          {/* Featured post */}
          {showFeatured && <FeaturedPost blog={featuredBlog} lang={lang} />}

          {/* Listing */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <header
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                paddingBottom: 16,
                borderBottom: '1px solid var(--nt-rule)',
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 26,
                    lineHeight: 1.2,
                    fontWeight: 600,
                    margin: 0,
                    letterSpacing: '-0.01em',
                    color: 'var(--nt-ink)',
                  }}
                >
                  {t.latest}
                </h2>
                <div style={{ fontSize: 13, color: 'var(--nt-muted)', marginTop: 4 }}>
                  {t.showing(filteredBlogs.length)}
                </div>
              </div>
            </header>

            {listingBlogs.length === 0 && !showFeatured ? (
              <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--nt-muted)', fontSize: 15 }}>
                {t.noBlogs}
              </div>
            ) : listingBlogs.length > 0 ? (
              <div className="blog-cards-grid">
                {listingBlogs.map((blog) => (
                  <BlogCard key={blog.slug} blog={blog} lang={lang} />
                ))}
              </div>
            ) : null}

            {filteredBlogs.length > 0 && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                labels={{ previous: t.previous, next: t.next }}
              />
            )}
          </section>
        </div>

        {/* Sidebar */}
        <div className="blog-sidebar-wrapper">
          <Sidebar
            lang={lang}
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
      </div>
    </div>
  );
}
