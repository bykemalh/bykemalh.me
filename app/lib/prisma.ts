import { PrismaD1 } from "@prisma/adapter-d1";
import type { D1Database } from "@cloudflare/workers-types";
import type { RouterContextProvider } from "react-router";
import { cloudflareContext } from "./cloudflare-context";
import { PrismaClient } from "~/generated/prisma/client";

/**
 * Cloudflare D1 üzerinden Prisma Client oluşturur.
 * Her request'te Workers binding (`env.DB`) ile çağrılmalıdır.
 * D1 transaction desteklemez — `$transaction([...])` çağrıları
 * adapter tarafından sırayla tekil sorgular olarak çalışır.
 */
export function createPrisma(d1: D1Database) {
  const adapter = new PrismaD1(d1);
  return new PrismaClient({ adapter });
}

/** Route loader/action context'inden Prisma Client oluşturur. */
export function getPrisma(context: Readonly<RouterContextProvider>) {
  const { env } = context.get(cloudflareContext);
  const db = env.DB;
  if (!db) throw new Error("D1 binding `DB` bulunamadı. wrangler.jsonc dosyasını kontrol edin.");
  return createPrisma(db);
}
