import { createContext } from "react-router";

/**
 * Cloudflare Workers binding'leri için React Router v8 context anahtarı.
 * `workers/app.ts` her request'te `{ env, ctx }` değerini bu context'e yazar,
 * loader/action'lar `context.get(cloudflareContext)` ile okur.
 */
export const cloudflareContext = createContext<{
  env: Env;
  ctx: ExecutionContext;
}>();
