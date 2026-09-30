// `npx wrangler types` çalıştırınca bu dosya yeniden üretilir.
// D1 binding `DB` için tip. `database_id` oluştuktan sonra
// `npm run db:types` ile yeniden üretin.
import type { D1Database } from "@cloudflare/workers-types";

declare global {
  interface Env {
    DB: D1Database;
  }
}

export {};
