import type { Config } from "@react-router/dev/config";

export default {
  // Pure SSR mode - no static generation
  // Performance is handled via Cache-Control headers at route level
  ssr: true,
} satisfies Config;
