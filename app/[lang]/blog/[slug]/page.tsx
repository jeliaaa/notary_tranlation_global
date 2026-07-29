import type { Metadata } from 'next';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, User, Calendar } from 'lucide-react';
import type { Lang } from '@/lib/translations';
import { blogPosts, type BlogPost } from '@/data/blogs';
import BlogShareButton from '@/components/BlogShareButton';

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

const T = {
  en: {
    notFound: 'Blog post not found',
    readTime: 'min read',
    publishedOn: 'Published on',
    share: 'Share',
    copied: 'URL copied to clipboard!',
    backToBlogs: 'Back to blog posts',
    previousPost: 'Previous Post',
    nextPost: 'Next Post',
  },
  pl: {
    notFound: 'Nie znaleziono wpisu',
    readTime: 'min czytania',
    publishedOn: 'Opublikowano',
    share: 'Udostępnij',
    copied: 'Adres URL skopiowany do schowka!',
    backToBlogs: 'Powrót do bloga',
    previousPost: 'Poprzedni wpis',
    nextPost: 'Następny wpis',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: langParam, slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: 'Blog - Translation House' };
  const lang = (langParam === 'pl' ? 'pl' : 'en') as Lang;
  const title = lang === 'pl' ? post.titlePl : post.title;
  const description = lang === 'pl' ? post.excerptPl : post.excerpt;
  return {
    title: `${title} - Translation House`,
    description,
    openGraph: { type: 'article', title, description },
  };
}

export async function generateStaticParams() {
  return ['en', 'pl'].flatMap((lang) => blogPosts.map((post) => ({ lang, slug: post.slug })));
}

function NavigationCard({
  blog,
  lang,
  direction,
  label,
}: {
  blog: BlogPost | null;
  lang: Lang;
  direction: 'previous' | 'next';
  label: string;
}) {
  if (!blog) return null;

  const isNext = direction === 'next';
  const title = lang === 'pl' ? blog.titlePl : blog.title;

  return (
    <Link
      href={`/${lang}/blog/${blog.slug}`}
      className={`flex-1 bg-gray-50 hover:bg-gray-100 transition-colors p-4 rounded-lg ${isNext ? 'text-right' : ''}`}
    >
      <div className={`flex items-center text-sm text-gray-600 mb-2 ${isNext ? 'justify-end' : ''}`}>
        {!isNext && <ArrowLeft className="w-4 h-4 mr-2" />}
        <span>{label}</span>
        {isNext && <ArrowRight className="w-4 h-4 ml-2" />}
      </div>
      <h4 className="font-medium line-clamp-2">{title}</h4>
    </Link>
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { lang: langParam, slug } = await params;
  if (langParam !== 'en' && langParam !== 'pl') redirect('/en');
  const lang = langParam as Lang;
  const t = T[lang];

  const postIndex = blogPosts.findIndex((p) => p.slug === slug);
  if (postIndex === -1) notFound();

  const post = blogPosts[postIndex];
  const previousBlog = blogPosts[postIndex - 1] ?? null;
  const nextBlog = blogPosts[postIndex + 1] ?? null;

  const title = lang === 'pl' ? post.titlePl : post.title;
  const content = lang === 'pl' ? post.contentPl : post.content;
  const author = lang === 'pl' ? post.authorPl : post.author;

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString(lang === 'pl' ? 'pl-PL' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    datePublished: post.date,
    author: { '@type': 'Person', name: author },
    publisher: { '@type': 'Organization', name: 'Translation House' },
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Back to Blog button */}
        <Link
          href={`/${lang}/blog`}
          className="inline-flex items-center py-2 px-4 mb-8 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t.backToBlogs}
        </Link>

        {/* Blog Post Card */}
        <article className="bg-white shadow-lg rounded-2xl overflow-hidden">
          {/* Cover Image */}
          <div className="relative h-64 sm:h-96 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
            <span className="text-7xl">📄</span>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 lg:p-10">
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm">
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  <span>{author}</span>
                </div>

                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{t.publishedOn} {formatDate(post.date)}</span>
                </div>

                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{post.readingTime} {t.readTime}</span>
                </div>

                <BlogShareButton title={title} label={t.share} copiedLabel={t.copied} />
              </div>
            </header>

            <div
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Blog Navigation */}
            <div className="flex gap-4 mt-12">
              <NavigationCard blog={previousBlog} lang={lang} direction="previous" label={t.previousPost} />
              <NavigationCard blog={nextBlog} lang={lang} direction="next" label={t.nextPost} />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
