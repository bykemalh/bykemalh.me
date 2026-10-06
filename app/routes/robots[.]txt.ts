import { type LoaderFunctionArgs } from "react-router";
import { siteConfig } from "@/lib/seo";

/**
 * AI tarayıcılara bilinçli olarak açık erişim verilir (GEO stratejisi).
 * LLM motorlarının (ChatGPT, Perplexity, Claude, Google AI Overflows vb.)
 * içeriği alıntılayabilmesi için açık `Allow` bildirilir.
 * İçerik envanteri /llms.txt adresinde de sunulur.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
  "cohere-ai",
  "GoogleOther",
];

export function loader(_: LoaderFunctionArgs) {
  const baseUrl = siteConfig.url;

  const content = `User-agent: *
Allow: /

# AI crawlers are explicitly welcome (GEO) — content inventory: /llms.txt
${AI_CRAWLERS.map((crawler) => `User-agent: ${crawler}\nAllow: /`).join("\n")}

Sitemap: ${baseUrl}/sitemap.xml
`;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
