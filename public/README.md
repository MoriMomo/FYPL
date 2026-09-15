# Public assets — notes

## ⚠️ Oversized team images

The 8 images in `public/team/*.png` are **1.7–2.0 MB each** (~14 MB total). At the
size they render (16:9 cards, max ~480px wide) they are far larger than needed.
Next.js `<Image>` optimizes them at request time, but the large source files
still:

- bloat the git repo,
- slow the first optimization pass / cold builds,
- cost bandwidth on the very first uncached request.

### Recommended fix (opt-in — re-encodes source art, so run deliberately)

`sharp` is already available (bundled with Next). This resizes each team image
to a sensible max width and re-encodes as compressed PNG **in place**. Review the
output before committing.

```bash
node scripts/compress-team-images.mjs
```

The script writes optimized copies to `public/team/` and prints the before/after
size of each file. Consider WebP instead of PNG for photos if you want a further
~30% cut (`.webp()` instead of `.png()` in the script, then update the paths in
`src/data/team.ts`).

## logo2.png

Rendered at ~120px but the source is ~547 KB. Same treatment recommended if you
want a leaner payload.
