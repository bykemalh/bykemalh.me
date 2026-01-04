import type { Config } from "@react-router/dev/config";
import { prisma } from "./app/lib/prisma";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  
  // Prerender blog routes for SSG
  async prerender() {
    const posts = await prisma.blog.findMany({
      where: { published: true },
      select: { slug: true },
    });
    
    return [
      "/",
      "/blog",
      ...posts.map((post) => `/blog/${post.slug}`),
    ];
  },
} satisfies Config;
