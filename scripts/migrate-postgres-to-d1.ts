#!/usr/bin/env node
/**
 * PostgreSQL JSON export → D1 (SQLite) SQL import dosyası üretir.
 *
 * Kullanım:
 *   1. PostgreSQL'den JSON export alın (psql ile, örnek komutlar README'de):
 *      data/export.json  → { blogs: [...], translations: [...], views: [...] }
 *   2. SQL üret:
 *      npx tsx scripts/migrate-postgres-to-d1.ts
 *      → data/import.sql oluşur
 *   3. D1'e uygulayın:
 *      npx wrangler d1 execute portfolio-db --local --file=data/import.sql
 *      npx wrangler d1 execute portfolio-db --remote --file=data/import.sql
 *
 * PostgreSQL dump'ını doğrudan D1'e uygulamayın (SERIAL, NOW(), ::text,
 * TIMESTAMP(3) gibi sözdizimleri SQLite ile uyumsuzdur). Bu script
 * değerleri SQLite/D1 uyumlu literal'lara dönüştürür.
 */
import fs from "node:fs";
import path from "node:path";

const EXPORT_PATH = "data/export.json";
const OUTPUT_PATH = "data/import.sql";

type Blog = {
  id: number;
  title: string;
  slug: string;
  content: string;
  keywords: string;
  categories: string;
  featured: boolean;
  published: boolean;
  viewCount?: number;
  createdAt: string;
  updatedAt: string;
};

type Translation = {
  id: number;
  blogId: number;
  locale: string;
  title: string;
  slug: string;
  content: string;
  keywords: string;
  categories: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

type View = {
  id: number;
  blogId: number;
  ipAddress: string;
  userAgent: string;
  viewedAt: string;
};

function esc(value: string): string {
  return `'${value.replace(/'/g, "''")}'`;
}

function bool(value: boolean): string {
  return value ? "1" : "0";
}

function num(value: number): string {
  if (!Number.isFinite(value)) throw new Error(`Geçersiz sayı: ${value}`);
  return String(Math.trunc(value));
}

function main() {
  const exportFile = path.resolve(EXPORT_PATH);
  if (!fs.existsSync(exportFile)) {
    console.error(`\n❌ ${EXPORT_PATH} bulunamadı.\n`);
    console.error("Önce PostgreSQL'den JSON export alın. Örnek (README'de tam hali):");
    console.error(`  psql "$DATABASE_URL" -c "COPY (SELECT row_to_json(t) FROM ...)" ...`);
    console.error(`  veya Prisma Studio / blog-manager ile veriyi JSON olarak dışa aktarın.\n`);
    console.error("Beklenen format: { blogs: [...], translations: [...], views: [...] }\n");
    process.exit(1);
  }

  const raw = JSON.parse(fs.readFileSync(exportFile, "utf-8")) as {
    blogs: Blog[];
    translations: Translation[];
    views: View[];
  };

  const blogs = raw.blogs ?? [];
  const translations = raw.translations ?? [];
  const views = raw.views ?? [];

  const lines: string[] = [
    "-- D1 import — migrate-postgres-to-d1.ts ile üretildi",
    "-- Sıra FK güvenli: Blog → BlogTranslation → BlogView",
    "PRAGMA foreign_keys=OFF;",
  ];

  for (const b of blogs) {
    lines.push(
      `INSERT INTO "Blog" ("id","title","slug","content","keywords","categories","featured","published","viewCount","createdAt","updatedAt") VALUES (${num(b.id)},${esc(b.title)},${esc(b.slug)},${esc(b.content)},${esc(b.keywords)},${esc(b.categories)},${bool(b.featured)},${bool(b.published)},${num(b.viewCount ?? 0)},${esc(b.createdAt)},${esc(b.updatedAt)});`
    );
  }
  for (const t of translations) {
    lines.push(
      `INSERT INTO "BlogTranslation" ("id","blogId","locale","title","slug","content","keywords","categories","published","publishedAt","createdAt","updatedAt") VALUES (${num(t.id)},${num(t.blogId)},${esc(t.locale)},${esc(t.title)},${esc(t.slug)},${esc(t.content)},${esc(t.keywords)},${esc(t.categories)},${bool(t.published)},${t.publishedAt ? esc(t.publishedAt) : "NULL"},${esc(t.createdAt)},${esc(t.updatedAt)});`
    );
  }
  for (const v of views) {
    lines.push(
      `INSERT OR IGNORE INTO "BlogView" ("id","blogId","ipAddress","userAgent","viewedAt") VALUES (${num(v.id)},${num(v.blogId)},${esc(v.ipAddress)},${esc(v.userAgent)},${esc(v.viewedAt)});`
    );
  }
  lines.push("PRAGMA foreign_keys=ON;");

  fs.mkdirSync(path.dirname(path.resolve(OUTPUT_PATH)), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, lines.join("\n") + "\n");

  console.log(`\n✅ ${OUTPUT_PATH} oluşturuldu`);
  console.log(`   Postgres export → D1 import`);
  console.log(`   Blogs:        ${blogs.length}`);
  console.log(`   Translations: ${translations.length}`);
  console.log(`   Views:        ${views.length}`);
  console.log(`\nSonra:`);
  console.log(`   npx wrangler d1 execute portfolio-db --local --file=${OUTPUT_PATH}`);
  console.log(`   npx wrangler d1 execute portfolio-db --remote --file=${OUTPUT_PATH}\n`);
}

main();
