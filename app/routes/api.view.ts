import { getPrisma } from "@/lib/prisma";
import { type ActionFunctionArgs, data } from "react-router";

export async function action({ request, context }: ActionFunctionArgs) {
  // Security: Check Origin/Referer to prevent CSRF
  const origin = request.headers.get("Origin");
  const host = request.headers.get("Host");

  if (origin && !origin.includes(host || "")) {
    return data({ message: "Forbidden" }, { status: 403 });
  }

  if (request.method !== "POST") {
    return data({ message: "Method not allowed" }, { status: 405 });
  }

  const formData = await request.formData();
  const blogId = formData.get("blogId");

  if (!blogId || typeof blogId !== "string") {
    return data({ message: "Blog ID is required" }, { status: 400 });
  }

  const id = parseInt(blogId, 10);
  if (isNaN(id)) {
    return data({ message: "Invalid Blog ID" }, { status: 400 });
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const ipAddress = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";
  const userAgent = (request.headers.get("user-agent") || "unknown").substring(0, 512);

  try {
    const prisma = getPrisma(context);
    // D1/SQLite uyumlu: raw SQL yerine Prisma API.
    // D1 transaction desteklemez, bu yüzden sırayla tekil sorgular.
    // Aynı IP daha önce görüntülediyse sayacı artırma.
    const existing = await prisma.blogView.findUnique({
      where: { blogId_ipAddress: { blogId: id, ipAddress } },
      select: { id: true },
    });

    if (!existing) {
      await prisma.blogView.create({
        data: { blogId: id, ipAddress, userAgent },
      });
      await prisma.blog.update({
        where: { id },
        data: { viewCount: { increment: 1 } },
      });
    }

    return data({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Failed to track view:", error);
    // View tracking failure is non-critical — don't break the user experience
    return data({ success: false }, { status: 200 });
  }
}
