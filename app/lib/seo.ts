// Site Configuration
export const siteConfig = {
  name: "Kemal Hafızoğlu",
  url: "https://bykemalh.me",
  ogImage: "https://bykemalh.me/og-image.png",
  description: "Full Stack Developer & AI Engineer",
  author: "Kemal Hafızoğlu",
  twitterHandle: "@bykemalh",
  locale: "tr_TR",
  alternateLocales: ["en_US"],
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
    { property: "og:locale", content: siteConfig.locale },
    
    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: siteConfig.twitterHandle },
    { name: "twitter:creator", content: siteConfig.twitterHandle },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: title },
  ];

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

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateJsonLd(schema: any) {
  return {
    __html: JSON.stringify(schema),
  };
}

export function generateArticleSchema({ headline, description, image, url, datePublished, dateModified, author }: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image: [image],
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
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}${url}`,
    },
  };
}

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    image: siteConfig.ogImage,
    sameAs: [
      "https://github.com/bykemalh",
      "https://twitter.com/bykemalh",
      "https://linkedin.com/in/bykemalh",
    ],
    jobTitle: "Full Stack Developer & AI Engineer",
    description: siteConfig.description,
    knowsAbout: [
      "Web Development",
      "Full Stack Development",
      "Artificial Intelligence",
      "Machine Learning",
      "React",
      "Next.js",
      "Node.js",
      "Python",
      "TypeScript",
    ],
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "tr-TR",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/blog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateBlogPostingSchema({ title, description, content, url, datePublished, dateModified, author, keywords, readingTime }: any) {
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
  };
}
