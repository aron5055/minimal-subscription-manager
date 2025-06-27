import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import viteBundleAnalyzer from "vite-bundle-analyzer";

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
});
