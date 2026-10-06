// Site Configuration
import { projects as projectData, type Project } from "@/data/projects";

export const siteConfig = {
  name: "Kemal Hafızoğlu",
  url: "https://bykemalh.me",
  ogImage: "https://bykemalh.me/og-image.png",
  profileImage: "https://bykemalh.me/profile.jpg",
  description: "Full Stack Developer & AI Engineer",
  author: "Kemal Hafızoğlu",
  twitterHandle: "@bykemalh",
  locale: "tr_TR",
  alternateLocales: ["en_US"],
};

const OG_LOCALES: Record<string, string> = {
  tr: "tr_TR",
  en: "en_US",
};

interface SEOProps {
  title: string;
  description: string;
  keywords: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  locale?: "tr" | "en";
  alternates?: { locale: string; url: string }[];
}

export function generateSEO({
  title,
  description,
  keywords,
  image = siteConfig.ogImage,
  url,
  type = "website",
  publishedTime,
  modifiedTime,
  author = siteConfig.author,
  section,
  tags = [],
  locale = "tr",
  alternates = [],
}: SEOProps) {
  const fullUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;

  const meta: any[] = [
    { title: `${title} | ${siteConfig.name}` },
    { name: "description", content: description },
    { name: "keywords", content: keywords.join(", ") },
    { name: "author", content: author },
    { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
    { name: "googlebot", content: "index, follow" },

    // Canonical URL
    { tagName: "link", rel: "canonical", href: fullUrl },

    // Open Graph
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: fullUrl },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: title },
    { property: "og:site_name", content: siteConfig.name },
    { property: "og:locale", content: OG_LOCALES[locale] ?? "tr_TR" },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: siteConfig.twitterHandle },
    { name: "twitter:creator", content: siteConfig.twitterHandle },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: title },
  ];

  // hreflang alternates + x-default + og:locale:alternate
  const defaultAlternate = alternates.find((alternate) => alternate.locale === "tr") ?? alternates[0];
  alternates.forEach((alternate) => {
    meta.push({ tagName: "link", rel: "alternate", hrefLang: alternate.locale, href: `${siteConfig.url}${alternate.url}` });
    const ogLocale = OG_LOCALES[alternate.locale];
    if (ogLocale) meta.push({ property: "og:locale:alternate", content: ogLocale });
  });
  if (defaultAlternate) {
    meta.push({ tagName: "link", rel: "alternate", hrefLang: "x-default", href: `${siteConfig.url}${defaultAlternate.url}` });
  }

  // Article-specific meta tags
  if (type === "article") {
    if (publishedTime) {
      meta.push({ property: "article:published_time", content: publishedTime });
    }
    if (modifiedTime) {
      meta.push({ property: "article:modified_time", content: modifiedTime });
    }
    if (author) {
      meta.push({ property: "article:author", content: author });
    }
    if (section) {
      meta.push({ property: "article:section", content: section });
    }
    if (tags.length > 0) {
      tags.forEach(tag => {
        meta.push({ property: "article:tag", content: tag });
      });
    }
  }

  return meta;
}

/**
 * JSON-LD güvenli serileştirme.
 * `</script>` kaçışı yapılmadan doğrudan gömülen JSON-LD, script tag'inin erken
 * kapatılmasına (stored XSS) yol açabilir. `<`, U+2028 ve U+2029 escape edilir.
 */
export function generateJsonLd(schema: unknown) {
  return {
    __html: JSON.stringify(schema)
      .replace(/</g, "\\u003c")
      .replace(/\u2028/g, "\\u2028")
      .replace(/\u2029/g, "\\u2029"),
  };
}

/**
 * Markdown içeriğinden düz metin özeti üretir (meta description ve schema için).
 */
export function plainExcerpt(markdown: string, maxLength = 160) {
  const text = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~|-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= maxLength) return text;
  const slice = text.slice(0, maxLength);
  const lastSpace = slice.lastIndexOf(" ");
  return (lastSpace > maxLength * 0.6 ? slice.slice(0, lastSpace) : slice).trim() + "…";
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: siteConfig.name,
    alternateName: "bykemalh",
    url: siteConfig.url,
    image: siteConfig.profileImage,
    jobTitle: "Full Stack Developer & AI Engineer",
    description: "Kemal Hafızoğlu is a full-stack developer and AI engineer from Sakarya, Turkey, building web applications and machine-learning solutions since 2021.",
    sameAs: [
      "https://github.com/bykemalh",
      "https://twitter.com/bykemalh",
      "https://linkedin.com/in/bykemalh",
      "https://t.me/bykemalh",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sakarya",
      addressCountry: "TR",
    },
    knowsLanguage: ["tr", "ru", "en"],
    knowsAbout: [
      "Web Development",
      "Full Stack Development",
      "Artificial Intelligence",
      "Machine Learning",
      "E-commerce Development",
      "Real-time Web Applications",
      "Search Engine Optimization",
      "React",
      "React Router",
      "Next.js",
      "Node.js",
      "TypeScript",
      "Python",
      "PyTorch",
      "TensorFlow",
      "PostgreSQL",
    ],
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Sakarya University of Applied Sciences",
        url: "https://www.subu.edu.tr",
      },
      {
        "@type": "EducationalOrganization",
        name: "Hacı Sevim Yıldız-1 Technical High School",
      },
    ],
    award: "1st Place, SUBU Robotek AI Competition 2025",
  };
}

/**
 * Google'ın kişi profilleri için tercih ettiği ProfilePage sarmalayıcısı.
 * Ana sayfada Person şemasını bunun içinde yayınlamak bilgi grafiğine katkı sağlar.
 */
export function generateProfilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteConfig.url}/#profilepage`,
    url: siteConfig.url,
    dateModified: "2026-10-01",
    mainEntity: generatePersonSchema(),
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "tr-TR",
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

/**
 * Projeler sayfası için ItemList + CreativeWork şeması (GEO: AI motorlarının
 * proje envanterini yapılandırılmış biçimde görmesini sağlar).
 */
export function generateProjectsSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Projects by Kemal Hafızoğlu",
    description: "Web development, e-commerce, real-time tracking and AI projects by Kemal Hafızoğlu.",
    numberOfItems: projectData.length,
    itemListElement: projectData.map((project: Project, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      item: generateCreativeWorkSchema(project),
    })),
  };
}

export function generateCreativeWorkSchema(project: Project) {
  const item: Record<string, unknown> = {
    "@type": "CreativeWork",
    name: project.title,
    description: project.content.en.description,
    image: `${siteConfig.url}${project.image}`,
    url: project.demoUrl && project.demoUrl !== "#" && project.demoUrl !== "" ? project.demoUrl : `${siteConfig.url}/projects`,
    keywords: project.tags.join(", "),
    programmingLanguage: project.tags,
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
  if (project.repoUrl && project.repoUrl !== "#") {
    item.codeRepository = project.repoUrl;
  }
  return item;
}

/**
 * Blog listesi için CollectionPage + ItemList şeması.
 */
export function generateBlogCollectionSchema({ posts, locale }: { posts: { title: string; slug: string }[]; locale: "tr" | "en" }) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: locale === "tr" ? "Blog — Kemal Hafızoğlu" : "Blog — Kemal Hafızoğlu",
    url: `${siteConfig.url}/${locale}/blog`,
    inLanguage: locale === "tr" ? "tr-TR" : "en-US",
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteConfig.url}/${locale}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };
}

export function generateBlogPostingSchema({ title, description, content, url, datePublished, dateModified, author, keywords, readingTime, language = "tr" }: any) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    articleBody: content,
    url: `${siteConfig.url}${url}`,
    datePublished,
    dateModified,
    author: {
      "@type": "Person",
      name: author,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
    },
    keywords: keywords,
    timeRequired: `PT${readingTime}M`,
    image: siteConfig.ogImage,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}${url}`,
    },
    inLanguage: language === "tr" ? "tr-TR" : "en-US",
    isAccessibleForFree: true,
  };
}
