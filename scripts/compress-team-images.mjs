// Opt-in team-image optimizer. Resizes public/team/*.png to a sane max width
// and re-encodes as compressed PNG IN PLACE. Run deliberately:
//
//   node scripts/compress-team-images.mjs
//
// Review the results (and git diff) before committing — this overwrites art.

import sharp from "sharp";
import { readdir, stat, rename } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEAM_DIR = join(__dirname, "..", "public", "team");
const MAX_WIDTH = 960; // 2x the largest render width (~480px)

const fmtKB = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

const files = (await readdir(TEAM_DIR)).filter((f) => /\.png$/i.test(f));

for (const file of files) {
  const src = join(TEAM_DIR, file);
  const tmp = join(TEAM_DIR, `.tmp-${file}`);

  const before = (await stat(src)).size;

  await sharp(src)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .png({ compressionLevel: 9, quality: 82 })
    .toFile(tmp);

  const after = (await stat(tmp)).size;
  await rename(tmp, src);

  console.log(
    `${file.padEnd(16)} ${fmtKB(before).padStart(8)} -> ${fmtKB(after).padStart(8)}`
  );
}

console.log("Done. Review the changes before committing.");
