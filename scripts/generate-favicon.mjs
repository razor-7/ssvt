/**
 * generate-favicon.mjs
 * Generates public/favicon.ico (16×16 + 32×32 + 48×48) and public/site.webmanifest.
 * Matches the SSVT Logistics header logo: gradient orange square + white chart icon.
 *
 * Pure Node.js — zero external dependencies.
 * Usage:  node scripts/generate-favicon.mjs
 */

import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const PUBLIC = resolve(ROOT, 'public');

// ── Colour helpers ────────────────────────────────────────────────────────────

/** Lerp between two RGBA colours */
function lerpColor(a, b, t) {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
    Math.round(a[3] + (b[3] - a[3]) * t),
  ];
}

/** Alpha-composite src over dst (both RGBA arrays) */
function composite(src, dst) {
  const sa = src[3] / 255, da = dst[3] / 255;
  const oa = sa + da * (1 - sa);
  if (oa === 0) return [0, 0, 0, 0];
  return [
    Math.round((src[0] * sa + dst[0] * da * (1 - sa)) / oa),
    Math.round((src[1] * sa + dst[1] * da * (1 - sa)) / oa),
    Math.round((src[2] * sa + dst[2] * da * (1 - sa)) / oa),
    Math.round(oa * 255),
  ];
}

// Brand colours (RGBA)
const ORANGE_TL = [0xf5, 0x93, 0x40, 0xff]; // #f59340 — gradient top-left
const ORANGE_BR = [0xd9, 0x60, 0x1a, 0xff]; // #d9601a — gradient bottom-right
const WHITE     = [0xff, 0xff, 0xff, 0xff];
const TRANS     = [0x00, 0x00, 0x00, 0x00];

// ── Canvas builder ────────────────────────────────────────────────────────────

/**
 * Returns a SIZE×SIZE pixel array (each pixel = [R,G,B,A]).
 * Draws: gradient rounded square + area fill + trend line + peak dot + baseline.
 */
function buildCanvas(size) {
  const S = size;
  const canvas = new Array(S * S).fill(null);

  // ── 1. Gradient background + rounded-corner mask ──────────────────────────
  const radius = S * 7 / 32; // scale 7px radius from 32×32 reference
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      // Rounded corner: find nearest corner centre
      const cx = x < radius ? radius : x > S - 1 - radius ? S - 1 - radius : x;
      const cy = y < radius ? radius : y > S - 1 - radius ? S - 1 - radius : y;
      const dx = x - cx, dy = y - cy;
      if (dx * dx + dy * dy > radius * radius) {
        canvas[y * S + x] = [...TRANS];
        continue;
      }
      // Diagonal gradient t = 0 (top-left) … 1 (bottom-right)
      const t = (x + y) / (2 * (S - 1));
      canvas[y * S + x] = lerpColor(ORANGE_TL, ORANGE_BR, t);
    }
  }

  // ── 2. Top-gloss highlight (white overlay, top 40% of icon) ──────────────
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      if (canvas[y * S + x][3] === 0) continue;
      const gy = y / S;
      if (gy < 0.40) {
        const alpha = Math.round((0.40 - gy) / 0.40 * 26); // max ~10% opacity
        canvas[y * S + x] = composite([255, 255, 255, alpha], canvas[y * S + x]);
      }
    }
  }

  // ── Helper: scale from 16×16 reference to target size ────────────────────
  const sc = S / 16;

  // Trend-line points in 16×16 reference space (same as header SVG)
  const pts = [[1,11],[5,4],[9,8],[13,3],[15,5]];

  // ── 3. Area fill under trend line (semi-transparent white) ───────────────
  const baseY = 14 * sc; // baseline Y
  for (let x = 0; x < S; x++) {
    // Find the y value of the trend line at this x by interpolating segments
    const xRef = x / sc;
    let lineY = baseY;
    for (let i = 0; i < pts.length - 1; i++) {
      const [ax, ay] = pts[i], [bx, by] = pts[i + 1];
      if (xRef >= ax && xRef <= bx) {
        const t = (xRef - ax) / (bx - ax);
        lineY = (ay + (by - ay) * t) * sc;
        break;
      }
    }
    // Fill pixels from lineY down to baseY
    for (let y = 0; y < S; y++) {
      if (canvas[y * S + x][3] === 0) continue;
      const py = y;
      if (py >= lineY && py <= baseY) {
        canvas[y * S + x] = composite([255, 255, 255, 33], canvas[y * S + x]);
      }
    }
  }

  // ── 4. Trend line ─────────────────────────────────────────────────────────
  const lineThick = Math.max(1.0, 1.8 * sc);
  function drawLine(x0f, y0f, x1f, y1f, thickness, color) {
    const x0 = Math.round(x0f), y0 = Math.round(y0f);
    const x1 = Math.round(x1f), y1 = Math.round(y1f);
    const dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
    let err = dx - dy, cx2 = x0, cy2 = y0;
    const r = Math.ceil(thickness / 2);
    while (true) {
      for (let tx = -r; tx <= r; tx++) {
        for (let ty = -r; ty <= r; ty++) {
          if (tx * tx + ty * ty <= r * r + 0.5) {
            const px = cx2 + tx, py = cy2 + ty;
            if (px >= 0 && px < S && py >= 0 && py < S && canvas[py * S + px][3] > 0) {
              canvas[py * S + px] = composite(color, canvas[py * S + px]);
            }
          }
        }
      }
      if (cx2 === x1 && cy2 === y1) break;
      const e2 = 2 * err;
      if (e2 > -dy) { err -= dy; cx2 += sx; }
      if (e2 <  dx) { err += dx; cy2 += sy; }
    }
  }

  // Subtle glow pass (thicker, low-alpha white)
  for (let i = 0; i < pts.length - 1; i++) {
    drawLine(
      pts[i][0] * sc, pts[i][1] * sc,
      pts[i+1][0] * sc, pts[i+1][1] * sc,
      lineThick * 2.5, [255, 255, 255, 40]
    );
  }
  // Main line
  for (let i = 0; i < pts.length - 1; i++) {
    drawLine(
      pts[i][0] * sc, pts[i][1] * sc,
      pts[i+1][0] * sc, pts[i+1][1] * sc,
      lineThick, WHITE
    );
  }

  // ── 5. Peak accent dot at highest point (13, 3) in 16×16 space ───────────
  const dotX = 13 * sc, dotY = 3 * sc;
  const dotR = Math.max(1.4, 2.0 * sc);
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      if (canvas[y * S + x][3] === 0) continue;
      const dx = x - dotX, dy = y - dotY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= dotR) {
        canvas[y * S + x] = composite(WHITE, canvas[y * S + x]);
      } else if (dist <= dotR + 0.8) {
        // Anti-alias fringe
        const alpha = Math.round((dotR + 0.8 - dist) / 0.8 * 255);
        canvas[y * S + x] = composite([255, 255, 255, alpha], canvas[y * S + x]);
      }
      // Inner ring (brand colour)
      if (dist <= dotR * 0.5) {
        canvas[y * S + x] = composite([0xf0, 0x7b, 0x2b, 140], canvas[y * S + x]);
      }
    }
  }

  // ── 6. Baseline ───────────────────────────────────────────────────────────
  drawLine(1 * sc, 14 * sc, 15 * sc, 14 * sc, Math.max(1, 1.4 * sc), [255, 255, 255, 165]);

  return canvas;
}

// ── BMP-in-ICO encoder ────────────────────────────────────────────────────────

function buildBmpImage(size) {
  const canvas = buildCanvas(size);
  const W = size, H = size;

  const pixelData = Buffer.alloc(W * H * 4);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const c = canvas[y * W + x];
      const dst = ((H - 1 - y) * W + x) * 4; // BMP: bottom-to-top rows, BGRA
      pixelData[dst]     = c[2]; // B
      pixelData[dst + 1] = c[1]; // G
      pixelData[dst + 2] = c[0]; // R
      pixelData[dst + 3] = c[3]; // A
    }
  }

  // AND mask (1 bit/pixel, 1 = transparent)
  const maskRowBytes = Math.ceil(W / 32) * 4;
  const maskData = Buffer.alloc(H * maskRowBytes, 0);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (canvas[y * W + x][3] === 0) {
        const maskY = H - 1 - y;
        maskData[maskY * maskRowBytes + Math.floor(x / 8)] |= (0x80 >> (x % 8));
      }
    }
  }

  const bmpHdr = Buffer.alloc(40, 0);
  bmpHdr.writeUInt32LE(40, 0);
  bmpHdr.writeInt32LE(W, 4);
  bmpHdr.writeInt32LE(H * 2, 8);
  bmpHdr.writeUInt16LE(1, 12);
  bmpHdr.writeUInt16LE(32, 14);
  bmpHdr.writeUInt32LE(0, 16);
  bmpHdr.writeUInt32LE(pixelData.length, 20);

  return Buffer.concat([bmpHdr, pixelData, maskData]);
}

function buildIco(sizes) {
  const images = sizes.map(buildBmpImage);
  const icoHdr = Buffer.alloc(6);
  icoHdr.writeUInt16LE(0, 0);
  icoHdr.writeUInt16LE(1, 2);
  icoHdr.writeUInt16LE(sizes.length, 4);

  const dataOffset = 6 + 16 * sizes.length;
  const entries = [];
  let offset = dataOffset;
  for (let i = 0; i < sizes.length; i++) {
    const e = Buffer.alloc(16, 0);
    const s = sizes[i];
    e[0] = s === 256 ? 0 : s;
    e[1] = s === 256 ? 0 : s;
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(images[i].length, 8);
    e.writeUInt32LE(offset, 12);
    entries.push(e);
    offset += images[i].length;
  }
  return Buffer.concat([icoHdr, ...entries, ...images]);
}

// ── Web App Manifest ──────────────────────────────────────────────────────────

function writeManifest() {
  const manifest = {
    name: 'SSVT Logistics',
    short_name: 'SSVT',
    description: 'Precision Logistics for a Complex World',
    start_url: '/',
    display: 'standalone',
    background_color: '#0d2d5b',
    theme_color: '#f07b2b',
    icons: [
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' },
      { src: '/favicon.ico', sizes: '16x16 32x32 48x48', type: 'image/x-icon' },
    ],
  };
  writeFileSync(resolve(PUBLIC, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
  console.log('✓ Written: public/site.webmanifest');
}

// ── Run ───────────────────────────────────────────────────────────────────────

mkdirSync(PUBLIC, { recursive: true });

const ico = buildIco([16, 32, 48]);
writeFileSync(resolve(PUBLIC, 'favicon.ico'), ico);
console.log(`✓ Written: public/favicon.ico  (${ico.length} bytes — 16×16 + 32×32 + 48×48)`);
console.log('  Design  : gradient orange · area fill · glowing trend line · peak dot · baseline');

writeManifest();
console.log('\n✅ Favicon generation complete.');
