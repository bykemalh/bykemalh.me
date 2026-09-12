import { FloatingDock } from "@/components/floating-dock";
import { PageTransition } from "@/components/page-transition";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";
import { blogLocales, blogPath, isBlogLocale, localeLabel } from "@/lib/blog-locale";
import { prisma } from "@/lib/prisma";
import { generateBreadcrumbSchema, generateJsonLd, generateSEO } from "@/lib/seo";
import { FileText, Star } from "lucide-react";
import { data, Link, useLoaderData } from "react-router";
import type { Route } from "./+types/blog";

export function headers() {
  return { "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600", "CDN-Cache-Control": "max-age=300, stale-while-revalidate=3600" };
}

export async function loader({ params }: Route.LoaderArgs) {
  if (!isBlogLocale(params.locale)) throw data("Blog language not found", { status: 404 });
  try {
    const posts = await prisma.blogTranslation.findMany({
      where: { locale: params.locale, published: true },
      orderBy: [{ blog: { featured: "desc" } }, { createdAt: "desc" }],
      select: { id: true, title: true, slug: true, createdAt: true, blog: { select: { featured: true } } },
    });
    return { locale: params.locale, posts };
  } catch (error) {
    console.error("Unable to load the blog list", error);
    throw data("Blog is temporarily unavailable", { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}

export function meta({ loaderData }: Route.MetaArgs) {
  const locale = loaderData?.locale ?? "tr";
  return generateSEO({ title: "Blog", description: locale === "tr" ? "Yazılım geliştirme, yapay zekâ ve teknoloji üzerine yazılar." : "Articles about software development, AI, and technology.", keywords: ["blog", "software", "technology", "AI"], url: blogPath(locale), locale });
}

export default function BlogPage() {
  const { locale, posts } = useLoaderData<typeof loader>();
  const dateLocale = locale === "tr" ? "tr-TR" : "en-US";
  const breadcrumbSchema = generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Blog", url: blogPath(locale) }]);
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={generateJsonLd(breadcrumbSchema)} />
    <FloatingDock />
    <PageTransition><main className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">
      <header className="mb-12 sm:mb-16 md:mb-20 flex items-start justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white tracking-tight">Blog</h1>
        <nav aria-label="Blog language" className="flex gap-2 text-sm">{blogLocales.map((item) => <Link key={item} to={blogPath(item)} className={item === locale ? "font-semibold text-black dark:text-white" : "text-gray-500 hover:text-black dark:hover:text-white"}>{localeLabel(item)}</Link>)}</nav>
      </header>
      {posts.length === 0 ? <EmptyState icon={<FileText className="w-16 h-16" />} title={locale === "tr" ? "Henüz blog yazısı yok" : "No blog posts yet"} description={locale === "tr" ? "Yakında tekrar kontrol edin." : "Please check back soon."} /> :
        <div className="space-y-8 sm:space-y-10">{posts.map((post) => <article key={post.id} className="group"><Link to={blogPath(locale, post.slug)} prefetch="intent" className="block"><div className="flex flex-col gap-3"><div className="flex items-center gap-3 flex-wrap"><time className="text-xs sm:text-sm font-mono text-gray-400 dark:text-gray-600">{new Intl.DateTimeFormat(dateLocale, { day: "2-digit", month: "short", year: "numeric" }).format(post.createdAt)}</time>{post.blog.featured && <Badge variant="default" className="flex items-center gap-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 border-yellow-500/20"><Star className="w-3 h-3" />{locale === "tr" ? "Öne çıkan" : "Featured"}</Badge>}</div><h2 className="text-lg sm:text-xl font-semibold text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">{post.title}</h2></div></Link></article>)}</div>}
    </main></PageTransition>
  </>;
}
