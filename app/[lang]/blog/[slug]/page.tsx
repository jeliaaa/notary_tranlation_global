import type { Metadata } from 'next';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Lang } from '@/lib/translations';
import { getT } from '@/lib/translations';
import { blogPosts } from '@/data/blogs';

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: langParam, slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: 'Blog - NotaryTranslation' };
  const lang = (langParam === 'pl' ? 'pl' : 'en') as Lang;
  return { title: `${lang === 'pl' ? post.titlePl : post.title} - NotaryTranslation` };
}

export default async function BlogPostPage({ params }: Props) {
  const { lang: langParam, slug } = await params;
  if (langParam !== 'en' && langParam !== 'pl') redirect('/en');
  const lang = langParam as Lang;
  const t = getT(lang);

  const postIndex = blogPosts.findIndex((p) => p.slug === slug);
  if (postIndex === -1) notFound();

  const post = blogPosts[postIndex];
  const prev = blogPosts[postIndex - 1] ?? null;
  const next = blogPosts[postIndex + 1] ?? null;

  const title = lang === 'pl' ? post.titlePl : post.title;
  const content = lang === 'pl' ? post.contentPl : post.content;
  const author = lang === 'pl' ? post.authorPl : post.author;

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString(lang === 'pl' ? 'pl-PL' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <div className="pt-16 sm:pt-20 min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href={`/${lang}/blog`}
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {lang === 'pl' ? 'Powrót do bloga' : 'Back to Blog'}
        </Link>

        <div className="h-64 rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center mb-8">
          <span className="text-6xl">📄</span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <span className="bg-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full capitalize">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <Clock className="w-3 h-3" />
            {post.readingTime} {t.readingTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">{title}</h1>

        <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-100">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold">
            {author[0]}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{author}</p>
            <p className="text-gray-400 text-xs">{formatDate(post.date)}</p>
          </div>
        </div>

        <div
          className="prose prose-gray max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-100 gap-4">
          {prev ? (
            <Link
              href={`/${lang}/blog/${prev.slug}`}
              className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="line-clamp-1">{lang === 'pl' ? prev.titlePl : prev.title}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link
              href={`/${lang}/blog/${next.slug}`}
              className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors text-right"
            >
              <span className="line-clamp-1">{lang === 'pl' ? next.titlePl : next.title}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}
