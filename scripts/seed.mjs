/**
 * seed.mjs
 * Copies placeholder data files to data/ only when destination does not already exist.
 * Idempotent — never overwrites real data.
 */
import { existsSync, mkdirSync, readdirSync, statSync, copyFileSync } from 'fs';
import { resolve, join, relative, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SEED_DIR = join(__dirname, 'seed');
const DATA_DIR = resolve(__dirname, '../data');

if (!existsSync(SEED_DIR)) {
  console.log('No seed directory found at scripts/seed/. Nothing to seed.');
  process.exit(0);
}

let copied = 0;
let skipped = 0;

function seedDir(srcDir, destDir) {
  mkdirSync(destDir, { recursive: true });
  for (const entry of readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = join(srcDir, entry.name);
    const destPath = join(destDir, entry.name);
    if (entry.isDirectory()) {
      seedDir(srcPath, destPath);
    } else {
      if (existsSync(destPath)) {
        skipped++;
        console.log(`  skip: ${relative(DATA_DIR, destPath)} (already exists)`);
      } else {
        copyFileSync(srcPath, destPath);
        copied++;
        console.log(`  copy: ${relative(DATA_DIR, destPath)}`);
      }
    }
  }
}

console.log('Seeding data files...\n');
seedDir(SEED_DIR, DATA_DIR);
console.log(`\n✅ Seed complete: ${copied} copied, ${skipped} skipped.`);
