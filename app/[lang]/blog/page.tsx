'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronLeft, ChevronRight, Clock, ArrowRight } from 'lucide-react';
import type { Lang } from '@/lib/translations';
import { getT } from '@/lib/translations';
import { blogPosts } from '@/data/blogs';

interface Props {
  params: Promise<{ lang: string }>;
}

const POSTS_PER_PAGE = 6;

function formatDate(dateStr: string, lang: Lang) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(lang === 'pl' ? 'pl-PL' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPage({ params }: Props) {
  const { lang: langParam } = use(params);
  const lang = (langParam === 'pl' ? 'pl' : 'en') as Lang;
  const t = getT(lang);
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);

  const filtered = blogPosts.filter((post) => {
    const title = lang === 'pl' ? post.titlePl : post.title;
    const excerpt = lang === 'pl' ? post.excerptPl : post.excerpt;
    const q = search.toLowerCase();
    return title.toLowerCase().includes(q) || excerpt.toLowerCase().includes(q);
  });

  const pageCount = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const visible = filtered.slice(page * POSTS_PER_PAGE, (page + 1) * POSTS_PER_PAGE);

  return (
    <div className="pt-16 sm:pt-20 min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">{t.blog}</h1>

        <div className="relative max-w-md mx-auto mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            placeholder={lang === 'pl' ? 'Szukaj artykułów...' : 'Search articles...'}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 focus:border-primary-500 rounded-xl text-sm outline-none transition-colors bg-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {visible.map((post) => {
            const title = lang === 'pl' ? post.titlePl : post.title;
            const excerpt = lang === 'pl' ? post.excerptPl : post.excerpt;
            const author = lang === 'pl' ? post.authorPl : post.author;
            return (
              <div key={post.slug} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
                <div className="h-48 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                  <span className="text-4xl">📄</span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="inline-block bg-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full mb-3 self-start capitalize">
                    {post.category}
                  </span>
                  <h2 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">{title}</h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">{excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-4 flex-wrap gap-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold text-[10px]">
                        {author[0]}
                      </div>
                      <span>{author}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>{formatDate(post.date, lang)}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readingTime} {t.readingTime}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => router.push(`/${lang}/blog/${post.slug}`)}
                    className="flex items-center gap-2 text-primary-600 font-semibold text-sm hover:text-primary-700 transition-colors"
                  >
                    {t.readMore}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {pageCount > 1 && (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="p-2 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-gray-600">{page + 1} / {pageCount}</span>
            <button
              onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
              disabled={page >= pageCount - 1}
              className="p-2 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {visible.length === 0 && (
          <p className="text-center text-gray-500 py-12">
            {lang === 'pl' ? 'Nie znaleziono artykułów.' : 'No articles found.'}
          </p>
        )}
      </div>
    </div>
  );
}
