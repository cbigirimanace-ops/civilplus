// Convert the heavy mockup SVG into a high-quality WebP + AVIF.
// Both formats preserve quality at a fraction of the size.
import sharp from 'sharp';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..', 'public', 'images');

const targets = [
  { name: 'mockup-manager', width: 1600 },
];

for (const t of targets) {
  const src = path.join(ROOT, `${t.name}.svg`);
  const svg = await fs.readFile(src);

  // High-density rasterization for sharp output
  const base = sharp(svg, { density: 300 }).resize({ width: t.width, withoutEnlargement: false });

  const webp = await base.clone().webp({ quality: 90, effort: 6 }).toBuffer();
  await fs.writeFile(path.join(ROOT, `${t.name}.webp`), webp);

  const avif = await base.clone().avif({ quality: 75, effort: 6 }).toBuffer();
  await fs.writeFile(path.join(ROOT, `${t.name}.avif`), avif);

  const png = await base.clone().png({ quality: 90, compressionLevel: 9 }).toBuffer();
  await fs.writeFile(path.join(ROOT, `${t.name}.png`), png);

  const origKB = (svg.length / 1024).toFixed(0);
  console.log(`${t.name}:`);
  console.log(`  svg   ${origKB} KB (source)`);
  console.log(`  webp  ${(webp.length / 1024).toFixed(0)} KB`);
  console.log(`  avif  ${(avif.length / 1024).toFixed(0)} KB`);
  console.log(`  png   ${(png.length / 1024).toFixed(0)} KB`);
}
