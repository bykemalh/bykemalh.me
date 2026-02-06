import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Renders a circular skeleton (e.g., avatars) */
  circle?: boolean;
}

function Skeleton({ className, circle, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gray-200 dark:bg-gray-800",
        circle ? "rounded-full" : "rounded-md",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
