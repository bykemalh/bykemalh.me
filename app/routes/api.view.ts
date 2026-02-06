import { type ActionFunctionArgs, data } from "react-router";
import { prisma } from "@/lib/prisma";

export async function action({ request }: ActionFunctionArgs) {
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
    // Single atomic CTE query:
    // 1. INSERT view if not exists (ON CONFLICT DO NOTHING)
    // 2. Only INCREMENT viewCount when a genuinely new row was inserted
    // No race conditions, no dead tuples from failed inserts, no separate transaction needed
    await prisma.$executeRaw`
      WITH ins AS (
        INSERT INTO "BlogView" ("blogId", "ipAddress", "userAgent", "viewedAt")
        VALUES (${id}, ${ipAddress}, ${userAgent}, NOW())
        ON CONFLICT ("blogId", "ipAddress") DO NOTHING
        RETURNING 1
      )
      UPDATE "Blog"
      SET "viewCount" = "viewCount" + 1
      WHERE "id" = ${id}
        AND EXISTS (SELECT 1 FROM ins)
    `;

    return data({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Failed to track view:", error);
    // View tracking failure is non-critical — don't break the user experience
    return data({ success: false }, { status: 200 });
  }
}
