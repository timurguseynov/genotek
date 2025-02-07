import { defineConfig } from "vite";
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import react from "@vitejs/plugin-react";
const __dirname = dirname(fileURLToPath(import.meta.url));

console.log('import.meta.url:', import.meta.url);
console.log('__dirname', __dirname);

// https://vite.dev/config/
export default defineConfig({
  root: join(__dirname, "client"),
  plugins: [react()],
});
