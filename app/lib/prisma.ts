import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // Production: tune connection pool for high-traffic (2M+ daily visitors)
    // PgBouncer in front of PostgreSQL is strongly recommended for production
    datasourceUrl: appendPoolParams(process.env.DATABASE_URL || ""),
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/** Append connection pool parameters if not already present */
function appendPoolParams(url: string): string {
  if (!url) return url;
  const separator = url.includes("?") ? "&" : "?";
  const params: string[] = [];

  // Pool size: ~10 connections per CPU core is a safe default
  if (!url.includes("connection_limit")) params.push("connection_limit=20");
  // Timeout waiting for a connection from the pool (ms)
  if (!url.includes("pool_timeout")) params.push("pool_timeout=30");

  return params.length > 0 ? `${url}${separator}${params.join("&")}` : url;
}
