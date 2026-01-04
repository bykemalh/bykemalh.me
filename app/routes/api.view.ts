import { type ActionFunctionArgs, data } from "react-router";
import { prisma } from "@/lib/prisma";

export async function action({ request }: ActionFunctionArgs) {
  // Security: Check Origin/Referer to prevent CSRF
  const origin = request.headers.get("Origin");
  const referer = request.headers.get("Referer");
  const host = request.headers.get("Host");
  
  // Allow requests only from the same origin
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

  // Get IP and User Agent
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ipAddress = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";

  try {
    // Try to create a new view record
    // The unique constraint @@unique([blogId, ipAddress, userAgent]) will prevent duplicates
    await prisma.blogView.create({
      data: {
        blogId: id,
        ipAddress,
        userAgent,
      },
    });
    return data({ success: true }, { status: 200 });
  } catch (error: any) {
    // If unique constraint violation (P2002), it means already viewed
    if (error.code === "P2002") {
      return data({ success: true, message: "Already viewed" }, { status: 200 });
    }
    console.error("Failed to track view:", error);
    return data({ message: "Internal Server Error" }, { status: 500 });
  }
}
