import { getPrisma } from "@/lib/prisma";
import { type ActionFunctionArgs, data } from "react-router";

/** Aynı IP için art arda istekler arası minimum süre (saniye). */
const RATE_LIMIT_SECONDS = 15;

/**
 * İstemci IP'si. Cloudflare arkasında CF-Connecting-IP spoof'lanamaz;
 * x-forwarded-for yalnızca yerel geliştirme için yedek olarak kullanılır.
 */
function getClientIp(request: Request): string {
  const cfIp = request.headers.get("CF-Connecting-IP");
  if (cfIp) return cfIp.trim();
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";
}

/**
 * Katı same-origin kontrolü:
 * - Origin başlığı varsa host bire bir eşleşmeli (alt dizi değil).
 * - Origin yoksa modern tarayıcıların gönderdiği Sec-Fetch-Site'a bakılır.
 * - İkisi de yoksa istek reddedilir (tarayıcılar cross-origin POST'ta
 *   her zaman Origin gönderir).
 */
function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("Origin");
  if (origin) {
    try {
      return new URL(origin).host === request.headers.get("Host");
    } catch {
      return false;
    }
  }
  const fetchSite = request.headers.get("Sec-Fetch-Site");
  if (fetchSite) {
    return fetchSite === "same-origin" || fetchSite === "same-site" || fetchSite === "none";
  }
  return false;
}

/** Cache API üzerinden basit per-IP hız sınırı (Worker durumlessness'ına uyar). */
function getRateLimitCache(): { match(key: Request): Promise<Response | undefined>; put(key: Request, res: Response): Promise<void> } | null {
  try {
    const storage = caches as unknown as { default?: { match(key: Request): Promise<Response | undefined>; put(key: Request, res: Response): Promise<void> } };
    return storage.default ?? null;
  } catch {
    return null;
  }
}

async function isRateLimited(ip: string): Promise<boolean> {
  const cache = getRateLimitCache();
  if (!cache) return false;
  try {
    const key = new Request(`https://view-rate-limit.internal/${encodeURIComponent(ip)}`);
    return Boolean(await cache.match(key));
  } catch {
    // Cache API kullanılamıyorsa (bazı yerel ortamlar) sınırı atla.
    return false;
  }
}

async function markRateLimited(ip: string): Promise<void> {
  const cache = getRateLimitCache();
  if (!cache) return;
  try {
    const key = new Request(`https://view-rate-limit.internal/${encodeURIComponent(ip)}`);
    await cache.put(key, new Response("1", { headers: { "Cache-Control": `max-age=${RATE_LIMIT_SECONDS}` } }));
  } catch {
    // En iyi çaba — başarısızlık kritik değil.
  }
}

export async function loader() {
  return data({ message: "Method not allowed" }, { status: 405 });
}

export async function action({ request, context }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return data({ message: "Method not allowed" }, { status: 405 });
  }

  if (!isSameOrigin(request)) {
    return data({ message: "Forbidden" }, { status: 403 });
  }

  const formData = await request.formData().catch(() => null);
  const blogId = formData?.get("blogId");

  // Yalnızca 1-9 haneli pozitif tamsayılar; parseInt/NaN yolu kapatılır.
  if (typeof blogId !== "string" || !/^\d{1,9}$/.test(blogId) || Number(blogId) === 0) {
    return data({ message: "Invalid Blog ID" }, { status: 400 });
  }
  const id = Number(blogId);

  const ipAddress = getClientIp(request);
  const userAgent = (request.headers.get("user-agent") || "unknown").substring(0, 512);

  // Hız sınırı: sayaç şişirme ve gereksiz DB yazmalarına karşı.
  if (await isRateLimited(ipAddress)) {
    return data({ success: false }, { status: 200 });
  }

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

    await markRateLimited(ipAddress);
    return data({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Failed to track view:", error);
    // View tracking failure is non-critical — don't break the user experience
    return data({ success: false }, { status: 200 });
  }
}
