"use client";

import { useEffect, useRef } from "react";
import { useFetcher } from "react-router";

interface BlogViewTrackerProps {
  blogId: number;
}

export function BlogViewTracker({ blogId }: BlogViewTrackerProps) {
  const fetcher = useFetcher();
  const hasTracked = useRef(false);

  useEffect(() => {
    // Prevent double tracking in strict mode or re-renders
    if (hasTracked.current) return;
    
    // Check if already viewed in this session (optional client-side check)
    const storageKey = `blog-viewed-${blogId}`;
    if (sessionStorage.getItem(storageKey)) {
      hasTracked.current = true;
      return;
    }

    hasTracked.current = true;
    sessionStorage.setItem(storageKey, "true");

    // Send view request
    fetcher.submit(
      { blogId: blogId.toString() },
      { method: "post", action: "/api/view" }
    );
  }, [blogId, fetcher]);

  return null;
}

