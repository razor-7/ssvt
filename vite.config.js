import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import { readdirSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function getPageEntries() {
  const pagesDir = resolve(__dirname, 'src/pages');
  const entries = {};

  if (!existsSync(pagesDir)) return entries;

  for (const dir of readdirSync(pagesDir, { withFileTypes: true })) {
    if (dir.isDirectory()) {
      const entryPath = resolve(pagesDir, dir.name, 'main.jsx');
      if (existsSync(entryPath)) {
        entries[dir.name] = entryPath;
      }
    }
  }

  return entries;
}

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: getPageEntries(),
      output: {
        // Produce a stable CSS filename so PageShell can reference it
        assetFileNames: (assetInfo) => {
          // Consolidate all CSS into a single stable file for static HTML linking
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/styles.css';
          }
          return 'assets/[name]-[hash][extname]';
        },
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name]-[hash].js',
      },
    },
    outDir: 'dist',
    emptyOutDir: false,
  },
  css: {
    postcss: './postcss.config.js',
  },
});
