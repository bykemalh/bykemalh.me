import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("projects", "routes/projects.tsx"),
  route("blog", "routes/blog.legacy.ts"),
  route("blog/:slug", "routes/blog.$slug.legacy.ts"),
  route(":locale/blog", "routes/blog.tsx"),
  route(":locale/blog/:slug", "routes/blog.$slug.tsx"),
  // API routes, sitemap and llms.txt don't need chunking
  route("api/view", "routes/api.view.ts"),
  route("sitemap.xml", "routes/sitemap[.]xml.ts"),
  route("robots.txt", "routes/robots[.]txt.ts"),
  route("llms.txt", "routes/llms[.]txt.ts"),
  // Branded 404 for every unmatched path (real 404 status, noindex)
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;
