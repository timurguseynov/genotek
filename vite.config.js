import { defineConfig } from "vite";
import { join } from "node:path";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  root: join(import.meta.dirname, "client"),
  plugins: [react()],
});
