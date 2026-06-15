/**
 * Optimize the raw event photos in public/images/Foto/<album>/ into small,
 * web-ready JPEGs under public/images/gallery/<slug>/NN.jpg.
 *
 * The originals are 4–9 MB camera files (far too big to ship) and include
 * formats browsers can't show (.ARW Sony RAW, .heic). This resizes to a sane
 * web size, fixes EXIF rotation (phone photos!), strips metadata, and converts
 * everything to JPEG. RAW files that sharp can't decode are skipped.
 *
 * Run:  node scripts/optimize-photos.mjs
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve("public/images/Foto");
const OUT = path.resolve("public/images/gallery");

const MAX_EDGE = 1400; // long-edge px — covers the lightbox at 2x DPR
const QUALITY = 80;

// folder → output slug + display title (order = order on the memory wall)
const ALBUMS = [
  { dir: "o week", slug: "o-week", title: "O-Week" },
  { dir: "globalnight", slug: "global-night", title: "Global Night" },
  { dir: "guf", slug: "guf", title: "GUF" },
  { dir: "jcc", slug: "jcc", title: "JCC" },
  { dir: "sports day", slug: "sports-day", title: "Sports Day" },
  { dir: "Bromo Adventurous Trip", slug: "bromo", title: "Bromo Adventurous Trip" },
];

const DECODABLE = /\.(jpe?g|png|webp|heic|heif|tiff?)$/i;

/**
 * The caption IS the filename (the user names each photo). Drop the extension,
 * trim stray spaces, and recover punctuation the filesystem can't store:
 * `_` between letters → apostrophe ("Ain_t" → "Ain't"); any leftover `_` → "?"
 * ("Volcano Who_" → "Volcano Who?").
 */
function captionFromFilename(file) {
  return file
    .replace(/\.[^.]+$/, "")
    .trim()
    .replace(/([A-Za-z])_([A-Za-z])/g, "$1'$2")
    .replace(/_/g, "?")
    .replace(/\s+/g, " ");
}

const esc = (s) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

/** Pull every embedded JPEG stream (FFD8…FFD9) out of a buffer. */
function extractJpegs(buf) {
  const out = [];
  let i = 0;
  while (i < buf.length - 3) {
    if (buf[i] === 0xff && buf[i + 1] === 0xd8 && buf[i + 2] === 0xff) {
      let j = i + 2;
      while (j < buf.length - 1 && !(buf[j] === 0xff && buf[j + 1] === 0xd9)) j++;
      if (j < buf.length - 1) {
        out.push(buf.subarray(i, j + 2));
        i = j + 2;
        continue;
      }
    }
    i++;
  }
  return out;
}

/**
 * Return something sharp can decode: the file itself if it's a real image, else
 * the largest embedded JPEG preview (recovers Sony .ARW RAW files that were
 * renamed to .jpg — they carry a full 1920px preview inside).
 */
async function decodableInput(srcPath) {
  try {
    await sharp(srcPath).metadata();
    return srcPath;
  } catch {
    /* not a format sharp reads directly — try an embedded preview */
  }
  const buf = await fs.readFile(srcPath);
  const jpegs = extractJpegs(buf).sort((a, b) => b.length - a.length);
  for (const j of jpegs) {
    try {
      await sharp(j).metadata();
      return j;
    } catch {
      /* keep looking */
    }
  }
  return null;
}

async function run() {
  const manifest = [];
  const blur = {}; // public path -> tiny base64 blur placeholder (smooth fade-in)

  for (const album of ALBUMS) {
    const srcDir = path.join(ROOT, album.dir);
    const outDir = path.join(OUT, album.slug);
    await fs.mkdir(outDir, { recursive: true });

    let entries;
    try {
      entries = (await fs.readdir(srcDir)).filter((f) => DECODABLE.test(f)).sort();
    } catch {
      console.warn(`! skipped missing folder: ${album.dir}`);
      continue;
    }

    const photos = [];
    let n = 0;
    for (const file of entries) {
      const src = path.join(srcDir, file);
      n += 1;
      const outName = String(n).padStart(2, "0") + ".jpg";
      const outPath = path.join(outDir, outName);
      try {
        const input = await decodableInput(src);
        if (!input) throw new Error("no decodable image (RAW/HEIC without preview)");
        const info = await sharp(input)
          .rotate() // apply EXIF orientation
          .resize(MAX_EDGE, MAX_EDGE, { fit: "inside", withoutEnlargement: true })
          .jpeg({ quality: QUALITY, mozjpeg: true })
          .toFile(outPath);
        const publicPath = `/images/gallery/${album.slug}/${outName}`;
        photos.push({ src: publicPath, caption: captionFromFilename(file) });

        // tiny blurred preview (base64) for next/image placeholder="blur"
        const tiny = await sharp(outPath)
          .resize(12)
          .jpeg({ quality: 30 })
          .toBuffer();
        blur[publicPath] = `data:image/jpeg;base64,${tiny.toString("base64")}`;

        console.log(
          `  ${album.slug}/${outName}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`,
        );
      } catch (err) {
        n -= 1; // don't burn an index on a file we couldn't decode
        console.warn(`  ! skipped ${album.dir}/${file}: ${err.message}`);
      }
    }

    manifest.push({ ...album, photos });
    console.log(`✓ ${album.title}: ${photos.length} photos\n`);
  }

  // emit a ready-to-paste albums array for data/site.ts (matches its indentation)
  const out = manifest
    .map((a) => {
      const photoLines = a.photos
        .map(
          (p) =>
            `          { src: "${p.src}", alt: "${esc(`${a.title} — ${p.caption}`)}", caption: "${esc(p.caption)}" },`,
        )
        .join("\n");
      return `      {
        cover: "${a.photos[0]?.src ?? null}",
        title: "${esc(a.title)}",
        alt: "${esc(a.title)} moments",
        photos: [
${photoLines}
        ],
      },`;
    })
    .join("\n");

  await fs.writeFile(path.join(OUT, "_albums.generated.txt"), out, "utf8");
  console.log("Wrote public/images/gallery/_albums.generated.txt");

  // blur placeholders → data/blurData.ts (imported by the Gallery)
  const blurEntries = Object.entries(blur)
    .map(([k, v]) => `  "${k}": "${v}",`)
    .join("\n");
  const blurFile = `// AUTO-GENERATED by scripts/optimize-photos.mjs — do not edit by hand.
// Tiny base64 previews so gallery photos fade in smoothly instead of popping.
export const blurData: Record<string, string> = {
${blurEntries}
};
`;
  await fs.writeFile(path.resolve("data/blurData.ts"), blurFile, "utf8");
  console.log(`Wrote data/blurData.ts (${Object.keys(blur).length} placeholders)`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
