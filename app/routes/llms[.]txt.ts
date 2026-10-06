import { type LoaderFunctionArgs } from "react-router";
import { getPrisma } from "@/lib/prisma";
import { siteConfig, plainExcerpt } from "@/lib/seo";
import { projects } from "@/data/projects";

/**
 * llms.txt (https://llmstxt.org) — yapay zeka motorları için site içerik
 * envanteri. llmstxt.org önerisine uygun biçim: H1 başlık, blockquote özet,
 * bağlantı ve açıklama içeren bölümler.
 */
export async function loader({ context }: LoaderFunctionArgs) {
  const prisma = getPrisma(context);
  const baseUrl = siteConfig.url;

  let blogSection = "";
  try {
    const posts = await prisma.blogTranslation.findMany({
      where: { published: true, locale: "tr" },
      orderBy: { createdAt: "desc" },
      select: { title: true, slug: true, content: true },
      take: 20,
    });
    if (posts.length > 0) {
      blogSection = `
## Blog (Turkish)
${posts.map((post) => `- [${post.title}](${baseUrl}/tr/blog/${post.slug}): ${plainExcerpt(post.content, 140)}`).join("\n")}
`;
    }
  } catch {
    // Blog kullanılamıyorsa llms.txt yine de sunulur.
  }

  const content = `# ${siteConfig.name} — Full Stack Developer & AI Engineer

> Kemal Hafızoğlu is a full-stack developer and AI engineer from Sakarya, Turkey. Since 2021 he has built e-commerce platforms, real-time tracking systems and award-winning AI projects for municipalities, universities and startups. Core stack: TypeScript, React, Node.js, Python, PyTorch, PostgreSQL. Winner of the 2025 SUBU Robotek AI competition.

Site: ${baseUrl}

## About
- [Home](${baseUrl}/): portfolio with work experience (İnegöl Municipality, Aris888 Metaverse, Sakarya Metropolitan Municipality, Ewros Yazılım 2026), education (Sakarya University of Applied Sciences) and skills
- [Projects](${baseUrl}/projects): ${projects.length} projects across web development, e-commerce, real-time tracking and AI

## Projects
${projects.map((project) => `- [${project.title}](${project.demoUrl && project.demoUrl !== "#" && project.demoUrl !== "" ? project.demoUrl : `${baseUrl}/projects`}): ${project.content.en.description} Tech: ${project.tags.join(", ")}.`).join("\n")}

## Blog (English)
- [English blog index](${baseUrl}/en/blog): articles about software development and AI
${blogSection}
## Contact
- Telegram: https://t.me/bykemalh
- GitHub: https://github.com/bykemalh
- LinkedIn: https://linkedin.com/in/bykemalh
- X/Twitter: https://twitter.com/bykemalh
`;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
