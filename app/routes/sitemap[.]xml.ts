import { type LoaderFunctionArgs } from "react-router";
import { getPrisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/seo";

/** XML metin ve öznitelik değerleri için varlık kaçışı. */
function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function loader({ context }: LoaderFunctionArgs) {
  const prisma = getPrisma(context);
  // Base URL'i istekten değil, kanonik site yapılandırmasından al
  // (Host başlığı zehirlenmesine karşı).
  const baseUrl = siteConfig.url;

  const posts = await prisma.blogTranslation.findMany({
    where: { published: true },
    select: { blogId: true, locale: true, slug: true, updatedAt: true },
    orderBy: { blogId: "asc" },
  });

  // Aynı yazının tr/en çevirilerini hreflang grubuna dönüştür.
  const groups = new Map<number, typeof posts>();
  for (const post of posts) {
    const group = groups.get(post.blogId) ?? [];
    group.push(post);
    groups.set(post.blogId, group);
  }

  const postUrls = [...groups.values()]
    .map((group) => {
      // x-default: Türkçe sürüm (yoksa ilk çeviri).
      const sorted = [...group].sort((a, b) => (a.locale === "tr" ? -1 : b.locale === "tr" ? 1 : 0));
      const alternates = sorted
        .map((translation) => {
          const href = `${baseUrl}/${translation.locale}/blog/${escapeXml(translation.slug)}`;
          return `
      <xhtml:link rel="alternate" hreflang="${translation.locale}" href="${href}" />`;
        })
        .join("");
      const defaultHref = `${baseUrl}/${sorted[0].locale}/blog/${escapeXml(sorted[0].slug)}`;
      return sorted
        .map((translation) => {
          const lastmod = translation.updatedAt.toISOString();
          return `
  <url>
    <loc>${baseUrl}/${translation.locale}/blog/${escapeXml(translation.slug)}</loc>${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultHref}" />
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
        })
        .join("");
    })
    .join("");

  const content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/projects</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${baseUrl}/img/projects/2/sakus1.webp</image:loc>
      <image:title>Sakus — Real-time bus tracking</image:title>
    </image:image>
    <image:image>
      <image:loc>${baseUrl}/img/projects/7/robotek1.webp</image:loc>
      <image:title>Robotek — SUBU 2025 AI competition winner</image:title>
    </image:image>
    <image:image>
      <image:loc>${baseUrl}/img/projects/8/image.png</image:loc>
      <image:title>FytureAI — AI assistant chatbot</image:title>
    </image:image>
  </url>
  <url>
    <loc>${baseUrl}/tr/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/en/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>${postUrls}
</urlset>`;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
