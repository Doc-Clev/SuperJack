import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base so it works on GitHub Pages under /superjack-deck/ (or any path).
export default defineConfig({
  plugins: [react()],
  base: "./",
});
