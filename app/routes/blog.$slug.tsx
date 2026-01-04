import { FloatingDock } from "@/components/floating-dock";
import { PageTransition } from "@/components/page-transition";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { BlogViewTracker } from "@/components/blog-view-tracker";
import { prisma } from "@/lib/prisma";
import { generateSEO, generateBreadcrumbSchema, generateJsonLd, generateBlogPostingSchema } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Star, ArrowLeft } from "lucide-react";
import { Link, useLoaderData, data } from "react-router";
import type { Route } from "./+types/blog.$slug";

export function headers() {
  return {
    "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400", // ISR: CDN 1h, revalidate for 24h
  };
}

export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;

  const post = await prisma.blog.findUnique({
    where: { slug },
    include: {
      _count: {
        select: { views: true },
      },
    },
  });

  if (!post || !post.published) {
    throw data("Blog post not found", { status: 404 });
  }

  return { post };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data?.post) {
    return [{ title: "Blog Not Found" }];
  }
  const { post } = data;
  const description = post.content.substring(0, 160).replace(/[#*_`]/g, "");
  const categories = post.categories.split(",").map((c: string) => c.trim());
  
  return generateSEO({
    title: post.title,
    description,
    keywords: post.keywords.split(",").map((k) => k.trim()),
    type: "article",
    url: `/blog/${post.slug}`,
    publishedTime: post.createdAt.toISOString(),
    modifiedTime: post.updatedAt.toISOString(),
    author: "Kemal Hafızoğlu",
    section: categories[0],
    tags: categories,
  });
}

export default function BlogPostPage() {
  const { post } = useLoaderData<typeof loader>();

  // Calculate reading time (ortalama 200 kelime/dakika)
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);

  const blogPostSchema = generateBlogPostingSchema({
    title: post.title,
    description: post.content.substring(0, 160).replace(/[#*_`]/g, ""),
    content: post.content,
    url: `/blog/${post.slug}`,
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: "Kemal Hafızoğlu",
    keywords: post.keywords,
    readingTime,
  });

  return (
    <>
      <BlogViewTracker blogId={post.id} />
      
      {/* Structured Data - Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateJsonLd(breadcrumbSchema)}
        key="breadcrumb-jsonld"
      />
      
      {/* Structured Data - BlogPosting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateJsonLd(blogPostSchema)}
        key="blogpost-jsonld"
      />

      <FloatingDock />
      <PageTransition>
        <article className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">
          {/* Sticky Header with Back Button */}
          <div className="sticky top-0 z-10 -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8 py-4 mb-8 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-transparent hover:border-gray-200 dark:hover:border-gray-800 transition-all">
            <div className="flex items-center justify-between gap-4">
              <Link to="/blog">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="gap-2 hover:bg-gray-100 dark:hover:bg-gray-900"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </Button>
              </Link>
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {post.featured && (
                  <Star className="w-4 h-4 text-yellow-600 dark:text-yellow-500 flex-shrink-0" />
                )}
                <h2 className="text-sm sm:text-base font-semibold text-black dark:text-white truncate">
                  {post.title}
                </h2>
              </div>
            </div>
          </div>

          {/* Header */}
          <header className="mb-12">
            {/* Badges & Meta */}
            <div className="flex items-center gap-3 flex-wrap mb-6">
              <time className="text-sm font-mono text-gray-400 dark:text-gray-600 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </time>
              <span className="text-sm text-gray-400 dark:text-gray-600 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {readingTime} min read
              </span>
              <span className="text-sm text-gray-400 dark:text-gray-600 flex items-center gap-2">
                👁️ {post._count.views} views
              </span>
              {post.featured && (
                <Badge variant="default" className="flex items-center gap-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 border-yellow-500/20">
                  <Star className="w-3 h-3" />
                  Featured
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tight mb-6">
              {post.title}
            </h1>

            {/* Categories */}
            {post.categories && (
              <div className="flex gap-2 flex-wrap">
                {post.categories.split(",").map((cat, index) => (
                  <Badge key={`cat-${index}`} variant="outline">
                    {cat.trim()}
                  </Badge>
                ))}
              </div>
            )}
          </header>

          {/* Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <MarkdownRenderer content={post.content} />
          </div>
        </article>
      </PageTransition>
    </>
  );
}
