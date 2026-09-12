-- Preserve the existing Blog records as the stable article identity and move
-- their current content into a Turkish translation. Keeping the legacy columns
-- allows a controlled rollout and gives existing URLs a safe redirect source.
CREATE TABLE "BlogTranslation" (
    "id" SERIAL NOT NULL,
    "blogId" INTEGER NOT NULL,
    "locale" VARCHAR(2) NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "keywords" TEXT NOT NULL,
    "categories" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogTranslation_pkey" PRIMARY KEY ("id")
);

INSERT INTO "BlogTranslation" (
  "blogId", "locale", "title", "slug", "content", "keywords", "categories",
  "published", "publishedAt", "createdAt", "updatedAt"
)
SELECT
  "id", 'tr', "title", "slug", "content", "keywords", "categories",
  "published", CASE WHEN "published" THEN "createdAt" ELSE NULL END, "createdAt", "updatedAt"
FROM "Blog";

CREATE UNIQUE INDEX "BlogTranslation_blogId_locale_key" ON "BlogTranslation"("blogId", "locale");
CREATE UNIQUE INDEX "BlogTranslation_locale_slug_key" ON "BlogTranslation"("locale", "slug");
CREATE INDEX "BlogTranslation_locale_published_createdAt_idx"
  ON "BlogTranslation"("locale", "published", "createdAt" DESC);

ALTER TABLE "BlogTranslation"
  ADD CONSTRAINT "BlogTranslation_blogId_fkey"
  FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
