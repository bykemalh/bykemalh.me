-- ============================================================
-- Migration: optimize_blog_performance
-- Purpose: Denormalize view count, fix indexes, simplify unique constraint
-- ============================================================

-- 1. Add denormalized viewCount column
ALTER TABLE "Blog" ADD COLUMN "viewCount" INTEGER NOT NULL DEFAULT 0;

-- 2. Backfill viewCount from existing BlogView data
UPDATE "Blog"
SET "viewCount" = sub."cnt"
FROM (
  SELECT "blogId", COUNT(*) AS "cnt"
  FROM "BlogView"
  GROUP BY "blogId"
) AS sub
WHERE "Blog"."id" = sub."blogId";

-- 3. Deduplicate BlogView rows before changing unique constraint
--    Keep only the earliest record per (blogId, ipAddress)
DELETE FROM "BlogView" a
USING "BlogView" b
WHERE a."blogId" = b."blogId"
  AND a."ipAddress" = b."ipAddress"
  AND a."id" > b."id";

-- 4. Drop old indexes & constraints on BlogView
DROP INDEX IF EXISTS "BlogView_blogId_idx";
DROP INDEX IF EXISTS "BlogView_ipAddress_idx";
DROP INDEX IF EXISTS "BlogView_blogId_ipAddress_userAgent_key";

-- 5. Create new simplified unique constraint (IP only, no userAgent)
CREATE UNIQUE INDEX "BlogView_blogId_ipAddress_key" ON "BlogView"("blogId", "ipAddress");

-- 6. Drop redundant Blog indexes (slug duplicate + individual columns)
DROP INDEX IF EXISTS "Blog_slug_idx";
DROP INDEX IF EXISTS "Blog_published_idx";
DROP INDEX IF EXISTS "Blog_featured_idx";

-- 7. Create composite index for the blog listing query
--    Covers: WHERE published = true ORDER BY featured DESC, createdAt DESC
CREATE INDEX "Blog_published_featured_createdAt_idx"
  ON "Blog"("published", "featured" DESC, "createdAt" DESC);
