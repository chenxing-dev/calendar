import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import nextFont from "@next-font/plugin-vite";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  base: "/calendar/",
  // The nextFont() plugin is used for font optimization similar to Next.js in this Vite/React project.
  plugins: [
    react(),
    tailwindcss(),
    nextFont(),
    visualizer({ open: false, gzipSize: true, filename: ".cache/visualizer.html" }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
