import { prisma } from "@/lib/prisma";
import { data, redirect } from "react-router";
import type { Route } from "./+types/blog.$slug.legacy";
export async function loader({ params }: Route.LoaderArgs) {
  const translation = await prisma.blogTranslation.findFirst({ where: { locale: "tr", slug: params.slug }, select: { slug: true } });
  if (translation) throw redirect(`/tr/blog/${translation.slug}`, 301);
  throw data("Blog post not found", { status: 404 });
}
