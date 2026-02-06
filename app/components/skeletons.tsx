import { FloatingDock } from "@/components/floating-dock";
import { PageTransition } from "@/components/page-transition";
import { Skeleton } from "@/components/ui/skeleton";

/** Skeleton displayed while blog list data is loading */
export function BlogListSkeleton() {
  return (
    <>
      <FloatingDock />
      <PageTransition>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">
          {/* Header skeleton */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <Skeleton className="h-8 sm:h-9 w-24" />
          </div>

          {/* Blog post skeletons */}
          <div className="space-y-8 sm:space-y-10">
            {Array.from({ length: 5 }).map((_, i) => (
              <article key={i} className="flex flex-col gap-3">
                {/* Date & badge */}
                <div className="flex items-center gap-3">
                  <Skeleton className="h-4 w-28" />
                  {i === 0 && <Skeleton className="h-5 w-20 rounded-full" />}
                </div>
                {/* Title */}
                <Skeleton className="h-6 sm:h-7 w-full max-w-md" />
              </article>
            ))}
          </div>
        </div>
      </PageTransition>
    </>
  );
}

/** Skeleton displayed while a single blog post is loading */
export function BlogPostSkeleton() {
  return (
    <>
      <FloatingDock />
      <PageTransition>
        <article className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">
          {/* Sticky header skeleton */}
          <div className="sticky top-0 z-10 -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8 py-4 mb-8 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between gap-4">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-5 w-48" />
            </div>
          </div>

          {/* Header meta */}
          <header className="mb-12">
            <div className="flex items-center gap-3 flex-wrap mb-6">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-20" />
            </div>

            {/* Title */}
            <Skeleton className="h-10 sm:h-12 md:h-14 w-full mb-3" />
            <Skeleton className="h-10 sm:h-12 md:h-14 w-3/4 mb-6" />

            {/* Category badges */}
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </header>

          {/* Content skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-11/12" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />

            <div className="py-2" />

            <Skeleton className="h-7 w-48 mb-2" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-2/3" />

            <div className="py-2" />

            {/* Code block skeleton */}
            <Skeleton className="h-40 w-full rounded-lg" />

            <div className="py-2" />

            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
          </div>
        </article>
      </PageTransition>
    </>
  );
}

/** Skeleton displayed while projects data is loading */
export function ProjectsSkeleton() {
  return (
    <>
      <FloatingDock />
      <PageTransition>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">
          {/* Header */}
          <div className="mb-12">
            <Skeleton className="h-10 sm:h-12 md:h-14 w-48 mb-4" />
            <Skeleton className="h-6 w-80" />
          </div>

          {/* Project grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden flex flex-col"
              >
                {/* Image skeleton */}
                <Skeleton className="aspect-video w-full rounded-none" />

                <div className="p-3 sm:p-4 flex flex-col flex-1 gap-2">
                  {/* Title */}
                  <Skeleton className="h-5 sm:h-6 w-3/4" />
                  {/* Description */}
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-auto pt-1">
                    <Skeleton className="h-4 sm:h-5 w-12 rounded-full" />
                    <Skeleton className="h-4 sm:h-5 w-14 rounded-full" />
                    <Skeleton className="h-4 sm:h-5 w-10 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageTransition>
    </>
  );
}
