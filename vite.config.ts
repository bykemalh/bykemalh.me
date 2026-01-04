import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks
          "vendor-react": ["react", "react-dom", "react-router"],
          "vendor-ui": ["framer-motion", "@radix-ui/react-accordion", "@radix-ui/react-slot"],
          "vendor-markdown": ["react-markdown", "react-syntax-highlighter", "highlight.js", "rehype-highlight", "rehype-katex", "rehype-slug", "remark-gfm"],
          "vendor-katex": ["katex"],
          "vendor-other": ["nprogress", "lucide-react", "react-icons", "clsx", "class-variance-authority"],
        },
      },
    },
  },
});
