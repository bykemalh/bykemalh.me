import { createRequestHandler, RouterContextProvider } from "react-router";
import { cloudflareContext } from "../app/lib/cloudflare-context";

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE
);

/**
 * Tüm yanıtlara uygulanan güvenlik başlıkları.
 *
 * CSP notu: React Router SSR hidrasyonu inline script'ler üretir ve sayfalar
 * CDN'de (s-maxage) önbelleklendiği için istek başına nonce kullanılamaz.
 * Bu yüzden script-src 'unsafe-inline' içerir; asıl XSS savunması kaynak
 * seviyesinde sağlanır (JSON-LD kaçışı, rehype-sanitize, escape'li XML).
 * frame-src, iframe beyaz listesiyle (markdown-renderer.tsx) eş tutulur.
 */
const securityHeaders: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "media-src 'self' https:",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "frame-src https://www.youtube-nocookie.com https://www.youtube.com https://player.vimeo.com https://open.spotify.com",
    "upgrade-insecure-requests",
  ].join("; "),
};

function withSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(securityHeaders)) {
    headers.set(key, value);
  }
  // 204/304 yanıtlarının body'si olmamalıdır.
  const body = response.status === 204 || response.status === 304 ? null : response.body;
  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  fetch(request, env, ctx) {
    // www → non-www 301 (canonical: https://bykemalh.me)
    const url = new URL(request.url);
    if (url.hostname === "www.bykemalh.me") {
      url.hostname = "bykemalh.me";
      return new Response(null, {
        status: 301,
        headers: { Location: url.toString(), ...securityHeaders },
      });
    }
    const loadContext = new RouterContextProvider();
    loadContext.set(cloudflareContext, { env, ctx });
    return requestHandler(request, loadContext).then(withSecurityHeaders);
  },
} satisfies ExportedHandler<Env>;
