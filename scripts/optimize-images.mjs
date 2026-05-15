// Run with: node scripts/optimize-images.mjs
// Compresses & resizes images in /public/images/ in place.
import sharp from 'sharp';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..', 'public', 'images');

// Per-folder presets (max width, quality)
const PRESETS = {
  hero: { maxWidth: 1920, jpegQuality: 75, pngQuality: 80 },
  default: { maxWidth: 1200, jpegQuality: 80, pngQuality: 80 },
  thumb: { maxWidth: 900, jpegQuality: 82, pngQuality: 82 },
  gallery: { maxWidth: 1400, jpegQuality: 78, pngQuality: 80 },
  sub: { maxWidth: 600, jpegQuality: 80, pngQuality: 80 },
};

function presetFor(filePath) {
  const rel = path.relative(ROOT, filePath);
  if (rel.includes('hero-bg')) return PRESETS.hero;
  if (rel.startsWith('gallery')) return PRESETS.gallery;
  if (rel.startsWith('sub')) return PRESETS.sub;
  // Main product thumbnails (top-level images)
  if (!rel.includes(path.sep)) return PRESETS.thumb;
  return PRESETS.default;
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(full)));
    else if (/\.(jpg|jpeg|png)$/i.test(e.name)) files.push(full);
  }
  return files;
}

async function optimize(file) {
  const preset = presetFor(file);
  const ext = path.extname(file).toLowerCase();
  const stat = await fs.stat(file);
  const beforeKB = (stat.size / 1024).toFixed(0);

  const buf = await fs.readFile(file);
  let pipeline = sharp(buf).rotate(); // honor EXIF rotation

  const meta = await pipeline.metadata();
  if (meta.width && meta.width > preset.maxWidth) {
    pipeline = pipeline.resize({ width: preset.maxWidth, withoutEnlargement: true });
  }

  let out;
  if (ext === '.png') {
    out = await pipeline.png({ quality: preset.pngQuality, compressionLevel: 9, palette: true }).toBuffer();
    // If JPEG would be much smaller and there's no real transparency, switch
    if (!meta.hasAlpha) {
      const asJpeg = await sharp(buf).rotate()
        .resize({ width: preset.maxWidth, withoutEnlargement: true })
        .jpeg({ quality: preset.jpegQuality, mozjpeg: true })
        .toBuffer();
      if (asJpeg.length < out.length * 0.7) {
        out = asJpeg;
        const newFile = file.replace(/\.png$/i, '.jpg');
        await fs.writeFile(newFile, out);
        await fs.unlink(file);
        const afterKB = (out.length / 1024).toFixed(0);
        console.log(`  ${path.relative(ROOT, file)}  ${beforeKB}KB → ${afterKB}KB  (PNG→JPG)`);
        return { file: newFile, oldFile: file };
      }
    }
  } else {
    out = await pipeline.jpeg({ quality: preset.jpegQuality, mozjpeg: true }).toBuffer();
  }

  // Only write if smaller
  if (out.length < buf.length) {
    await fs.writeFile(file, out);
    const afterKB = (out.length / 1024).toFixed(0);
    console.log(`  ${path.relative(ROOT, file)}  ${beforeKB}KB → ${afterKB}KB`);
  } else {
    console.log(`  ${path.relative(ROOT, file)}  ${beforeKB}KB (kept)`);
  }
  return null;
}

(async () => {
  const files = await walk(ROOT);
  console.log(`Optimizing ${files.length} images in ${ROOT}\n`);
  const renames = [];
  for (const f of files) {
    try {
      const r = await optimize(f);
      if (r) renames.push(r);
    } catch (err) {
      console.error('  ERROR:', f, err.message);
    }
  }
  if (renames.length) {
    console.log(`\n${renames.length} file(s) converted PNG → JPG. Update product image paths if any of these are referenced in src/data/products.js`);
    renames.forEach((r) => console.log(`  ${path.basename(r.oldFile)} → ${path.basename(r.file)}`));
  }
  console.log('\nDone.');
})();
