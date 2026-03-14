/**
 * bundle-check.mjs
 * Verifies initial JS bundle size ≤ 300 KB uncompressed.
 */
import { readdirSync, statSync } from 'fs';
import { resolve, join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, '../dist/assets');
const LIMIT_BYTES = 300 * 1024; // 300 KB

// Chunks excluded from the initial-bundle budget:
//   - pagefind*  → Pagefind search index (lazy-loaded, per plan.md Dependency Bundle Budget)
//   - SearchBar* → Pagefind UI wrapper (lazy-loaded via dynamic import inside SearchBar.jsx)
// Only chunks that are part of the per-page initial load are counted.
const LAZY_PATTERNS = ['pagefind', 'SearchBar'];

let totalJs = 0;
const files = [];

try {
  for (const file of readdirSync(DIST)) {
    const isJs = extname(file) === '.js';
    const isLazy = LAZY_PATTERNS.some((p) => file.includes(p));
    if (isJs && !isLazy) {
      const filepath = join(DIST, file);
      const size = statSync(filepath).size;
      files.push({ file, size });
      totalJs += size;
    }
  }
} catch {
  console.error('❌ Could not read dist/assets. Run npm run build first.');
  process.exit(1);
}

console.log('\nJS Bundle Sizes:');
for (const { file, size } of files.sort((a, b) => b.size - a.size)) {
  const kb = (size / 1024).toFixed(1);
  console.log(`  ${file}: ${kb} KB`);
}

const totalKb = (totalJs / 1024).toFixed(1);
console.log(`\nTotal: ${totalKb} KB (limit: 300 KB)`);

if (totalJs > LIMIT_BYTES) {
  console.error(`\n❌ Bundle exceeds 300 KB limit (${totalKb} KB). Consider aliasing React to Preact in vite.config.js.`);
  process.exit(1);
} else {
  console.log(`\n✅ Bundle within budget (${totalKb} KB ≤ 300 KB)`);
}
