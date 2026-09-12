import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("projects", "routes/projects.tsx"),
  route("blog", "routes/blog.legacy.ts"),
  route("blog/:slug", "routes/blog.$slug.legacy.ts"),
  route(":locale/blog", "routes/blog.tsx"),
  route(":locale/blog/:slug", "routes/blog.$slug.tsx"),
  // API routes and sitemap don't need chunking
  route("api/view", "routes/api.view.ts"),
  route("sitemap.xml", "routes/sitemap[.]xml.ts"),
  route("robots.txt", "routes/robots[.]txt.ts"),
] satisfies RouteConfig;
