import { FloatingDock } from "@/components/floating-dock";
import { PageTransition } from "@/components/page-transition";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { BlogViewTracker } from "@/components/blog-view-tracker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogLocales, blogPath, isBlogLocale, localeLabel } from "@/lib/blog-locale";
import { getPrisma } from "@/lib/prisma";
import { generateBlogPostingSchema, generateBreadcrumbSchema, generateJsonLd, generateSEO } from "@/lib/seo";
import { ArrowLeft, Calendar, Clock, Star } from "lucide-react";
import { data, Link, useLoaderData } from "react-router";
import type { Route } from "./+types/blog.$slug";

export function headers() { return { "Cache-Control": "public, max-age=0, s-maxage=600, stale-while-revalidate=3600", "CDN-Cache-Control": "max-age=600, stale-while-revalidate=3600" }; }

export async function loader({ params, context }: Route.LoaderArgs) {
  if (!isBlogLocale(params.locale)) throw data("Blog language not found", { status: 404 });
  const prisma = getPrisma(context);
  const post = await prisma.blogTranslation.findUnique({
    where: { locale_slug: { locale: params.locale, slug: params.slug } },
    include: { blog: { select: { id: true, featured: true, viewCount: true, translations: { where: { published: true }, select: { locale: true, slug: true } } } } },
  });
  if (!post || !post.published) throw data("Blog post not found", { status: 404 });
  return { locale: params.locale, post };
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData?.post) return [{ title: "Blog Not Found" }];
  const { post, locale } = loaderData;
  return generateSEO({
    title: post.title, description: post.content.substring(0, 160).replace(/[#*_`]/g, ""), keywords: post.keywords.split(",").map((keyword: string) => keyword.trim()), type: "article", url: blogPath(locale, post.slug), publishedTime: (post.publishedAt ?? post.createdAt).toISOString(), modifiedTime: post.updatedAt.toISOString(), section: post.categories.split(",")[0]?.trim(), tags: post.categories.split(",").map((category: string) => category.trim()), locale,
    alternates: post.blog.translations.map((translation: { locale: string; slug: string }) => ({ locale: translation.locale, url: blogPath(translation.locale as "tr" | "en", translation.slug) })),
  });
}

export default function BlogPostPage() {
  const { locale, post } = useLoaderData<typeof loader>();
  const dateLocale = locale === "tr" ? "tr-TR" : "en-US";
  const readingTime = Math.max(1, Math.ceil(post.content.trim().split(/\s+/).length / 200));
  const postUrl = blogPath(locale, post.slug);
  const breadcrumbSchema = generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Blog", url: blogPath(locale) }, { name: post.title, url: postUrl }]);
  const blogPostSchema = generateBlogPostingSchema({ title: post.title, description: post.content.substring(0, 160).replace(/[#*_`]/g, ""), content: post.content, url: postUrl, datePublished: (post.publishedAt ?? post.createdAt).toISOString(), dateModified: post.updatedAt.toISOString(), author: "Kemal Hafızoğlu", keywords: post.keywords, readingTime, language: locale });
  const translations = new Map(post.blog.translations.map((translation) => [translation.locale, translation.slug]));
  return <>
    <BlogViewTracker blogId={post.blog.id} />
    <script type="application/ld+json" dangerouslySetInnerHTML={generateJsonLd(breadcrumbSchema)} />
    <script type="application/ld+json" dangerouslySetInnerHTML={generateJsonLd(blogPostSchema)} />
    <FloatingDock />
    <PageTransition><article className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">
      <div className="sticky top-0 z-10 -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8 py-4 mb-8 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-transparent"><div className="flex items-center justify-between gap-4"><Link to={blogPath(locale)}><Button variant="ghost" size="sm" className="gap-2"><ArrowLeft className="w-4 h-4" />{locale === "tr" ? "Blog'a dön" : "Back to blog"}</Button></Link><nav aria-label="Article language" className="flex gap-2 text-sm">{blogLocales.map((item) => { const slug = translations.get(item); return slug ? <Link key={item} to={blogPath(item, slug)} className={item === locale ? "font-semibold" : "text-gray-500 hover:text-black dark:hover:text-white"}>{localeLabel(item)}</Link> : null; })}</nav></div></div>
      <header className="mb-12"><div className="flex items-center gap-3 flex-wrap mb-6"><time className="text-sm font-mono text-gray-400 dark:text-gray-600 flex items-center gap-2"><Calendar className="w-4 h-4" />{new Intl.DateTimeFormat(dateLocale, { day: "2-digit", month: "short", year: "numeric" }).format(post.createdAt)}</time><span className="text-sm text-gray-400 dark:text-gray-600 flex items-center gap-2"><Clock className="w-4 h-4" />{readingTime} {locale === "tr" ? "dk okuma" : "min read"}</span><span className="text-sm text-gray-400 dark:text-gray-600">👁️ {post.blog.viewCount.toLocaleString(dateLocale)}</span>{post.blog.featured && <Badge variant="default" className="flex items-center gap-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 border-yellow-500/20"><Star className="w-3 h-3" />{locale === "tr" ? "Öne çıkan" : "Featured"}</Badge>}</div><h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tight mb-6">{post.title}</h1>{post.categories && <div className="flex gap-2 flex-wrap">{post.categories.split(",").map((category) => <Badge key={category.trim()} variant="outline">{category.trim()}</Badge>)}</div>}</header>
      <div className="prose prose-gray dark:prose-invert max-w-none"><MarkdownRenderer content={post.content} /></div>
    </article></PageTransition>
  </>;
}
