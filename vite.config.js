import { defineConfig } from "vite";
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import react from "@vitejs/plugin-react";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  root: join(__dirname, "client"),
  plugins: [react()],
});
