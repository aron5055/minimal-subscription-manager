import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import viteBundleAnalyzer from "vite-bundle-analyzer";

const BACKEND_URL = "https://subs-backend.yxxyyijiaren.workers.dev";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteBundleAnalyzer()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("chart.js") || id.includes("recharts")) {
            return;
          }
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: BACKEND_URL,
        changeOrigin: true,
        secure: false,
        rewrite: (p) => p.replace(/^\/api/, ""),
      },
    },
  },
});
