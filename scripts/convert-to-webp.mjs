// Convert every JPG/PNG in /public/images to WebP (in-place), keeping
// AVIF/PNG/SVG companions where they already exist (hero mockup).
// WebP support is >96% globally — graceful for the rest.
//
// Run:  node scripts/convert-to-webp.mjs
import sharp from 'sharp';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..', 'public', 'images');

// Per-folder presets (max width, WebP quality)
const PRESETS = {
  hero: { maxWidth: 1920, quality: 86 },
  banner: { maxWidth: 1200, quality: 85 },
  gallery: { maxWidth: 1400, quality: 80 },
  sub: { maxWidth: 700, quality: 80 },
  payment: { maxWidth: 200, quality: 90 },
  default: { maxWidth: 1200, quality: 84 },
};

// Skip files that already have AVIF/WebP triplets managed separately (hero mockup)
const SKIP = new Set(['mockup-manager.png']);

function presetFor(file) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  if (rel.includes('hero-bg')) return PRESETS.hero;
  if (rel.startsWith('banners/')) return PRESETS.banner;
  if (rel.startsWith('gallery/')) return PRESETS.gallery;
  if (rel.startsWith('sub/')) return PRESETS.sub;
  if (rel.startsWith('payment/')) return PRESETS.payment;
  return PRESETS.default;
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(full)));
    else if (/\.(jpe?g|png)$/i.test(e.name)) files.push(full);
  }
  return files;
}

const renames = [];
let totalBefore = 0;
let totalAfter = 0;

for (const file of await walk(ROOT)) {
  const name = path.basename(file);
  if (SKIP.has(name)) continue;

  const preset = presetFor(file);
  const buf = await fs.readFile(file);
  totalBefore += buf.length;

  let pipeline = sharp(buf).rotate();
  const meta = await pipeline.metadata();
  if (meta.width && meta.width > preset.maxWidth) {
    pipeline = pipeline.resize({ width: preset.maxWidth, withoutEnlargement: true });
  }

  const webp = await pipeline.webp({ quality: preset.quality, effort: 6 }).toBuffer();
  const newFile = file.replace(/\.(jpe?g|png)$/i, '.webp');

  await fs.writeFile(newFile, webp);
  if (path.resolve(newFile) !== path.resolve(file)) {
    await fs.unlink(file);
  }
  totalAfter += webp.length;

  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  const newRel = path.relative(ROOT, newFile).replace(/\\/g, '/');
  if (rel !== newRel) renames.push([rel, newRel]);

  const before = (buf.length / 1024).toFixed(0);
  const after = (webp.length / 1024).toFixed(0);
  console.log(`  ${rel}  ${before}KB → ${after}KB`);
}

console.log('');
console.log(`Total:  ${(totalBefore / 1024).toFixed(0)} KB → ${(totalAfter / 1024).toFixed(0)} KB`);
console.log(`Saved:  ${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}%`);

if (renames.length) {
  console.log('\nRenames to apply in code:');
  renames.forEach(([from, to]) => console.log(`  ${from} → ${to}`));
}
