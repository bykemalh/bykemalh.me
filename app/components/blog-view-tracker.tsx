"use client";

import { useEffect } from "react";

interface BlogViewTrackerProps {
  blogId: number;
}

export function BlogViewTracker({ blogId }: BlogViewTrackerProps) {
  useEffect(() => {
    const storageKey = `blog-viewed-${blogId}`;
    try {
      if (sessionStorage.getItem(storageKey)) return;
    } catch {
      // Privacy modes can disallow storage. Tracking remains best effort.
    }

    void fetch("/api/view", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: new URLSearchParams({ blogId: blogId.toString() }),
      credentials: "same-origin",
      keepalive: true,
    }).then((response) => {
      if (response.ok) {
        try { sessionStorage.setItem(storageKey, "true"); } catch { /* best effort */ }
      }
    }).catch(() => undefined);

  }, [blogId]);

  return null;
}

