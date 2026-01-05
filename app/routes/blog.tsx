import { FloatingDock } from "@/components/floating-dock";
import { PageTransition } from "@/components/page-transition";
import { EmptyState } from "@/components/ui/empty-state";
import { FileText, Star } from "lucide-react";
import { generateSEO, generateBreadcrumbSchema, generateJsonLd } from "@/lib/seo";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Link, useLoaderData } from "react-router";

export function headers() {
  return {
    // SSR with aggressive caching: CDN caches 5 min, stale content served while revalidating for 1 hour
    "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600",
  };
}

export function meta() {
  return generateSEO({
    title: "Blog",
    description: "Read the latest articles, tutorials, and insights about web development, AI/ML, software engineering, and technology from Kemal Hafızoğlu.",
    keywords: [
      "Blog",
      "Tech Blog",
      "Web Development Articles",
      "AI Articles",
      "Machine Learning Tutorials",
      "Programming Blog",
      "Software Engineering",
      "React Router Tutorials",
      "Python Tutorials",
      "Technology Insights",
    ],
    url: "/blog",
  });
}

export async function loader() {
  try {
    const posts = await prisma.blog.findMany({
      where: {
        published: true,
      },
      orderBy: [
        { featured: "desc" },
        { createdAt: "desc" },
      ],
      select: {
        id: true,
        title: true,
        slug: true,
        categories: true,
        featured: true,
        createdAt: true,
      },
    });
    return { posts };
  } catch (e) {
    console.warn('Database error or not available:', e);
    return { posts: [] };
  }
}

export default function BlogPage() {
  const { posts } = useLoaderData<typeof loader>();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ]);

  return (
    <>
      {/* Structured Data - Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateJsonLd(breadcrumbSchema)}
        key="breadcrumb-jsonld"
      />

      <FloatingDock />
      <PageTransition>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">
          {/* Header */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white tracking-tight">
              Blog
            </h1>
          </div>

          {posts.length === 0 ? (
            <EmptyState
              icon={<FileText className="w-16 h-16" />}
              title="No blog posts yet"
              description="Check back soon for new content!"
            />
          ) : (
            <div className="space-y-8 sm:space-y-10">
              {posts.map((post) => (
                <article key={post.id} className="group">
                  <Link to={`/blog/${post.slug}`} className="block">
                    <div className="flex flex-col gap-3">
                      {/* Featured badge & date */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <time className="text-xs sm:text-sm font-mono text-gray-400 dark:text-gray-600">
                          {new Date(post.createdAt).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </time>
                        {post.featured && (
                          <Badge variant="default" className="flex items-center gap-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 border-yellow-500/20">
                            <Star className="w-3 h-3" />
                            Featured
                          </Badge>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="text-lg sm:text-xl font-semibold text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                        {post.title}
                      </h2>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </PageTransition>
    </>
  );
}
