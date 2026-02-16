# Image Optimization Guide

## Current State
All images are loaded from Unsplash CDN with fixed sizes. This is fine for prototyping but not production-ready.

## Production Strategy

### 1. Download and optimize images
- Download hero and portfolio images locally.
- Use tools like `sharp`, `squoosh-cli`, or `imagemagick` to generate:
  - Multiple sizes (e.g., 400w, 800w, 1200w, 1600w, 2000w)
  - Modern formats (WebP, AVIF) with fallback to JPEG/PNG.

### 2. Recommended folder structure
```
src/assets/images/
  hero/
    hero-1600.jpg
    hero-1600.webp
    hero-1600.avif
    hero-800.jpg
    hero-800.webp
  portfolio/
    project-1-800.jpg
    project-1-800.webp
    ...
  og/
    og-image.jpg  (1200x630 for social sharing)
```

### 3. Example `<picture>` element for hero
```html
<picture>
  <source type="image/avif" srcset="/src/assets/images/hero/hero-1600.avif 1600w, /src/assets/images/hero/hero-800.avif 800w" sizes="100vw">
  <source type="image/webp" srcset="/src/assets/images/hero/hero-1600.webp 1600w, /src/assets/images/hero/hero-800.webp 800w" sizes="100vw">
  <img src="/src/assets/images/hero/hero-1600.jpg" alt="Luxury modern interior living room with natural light" loading="eager" fetchpriority="high">
</picture>
```

### 4. Lazy-load portfolio images
Add `loading="lazy"` to all portfolio images.

### 5. Preload critical hero image
In `<head>`:
```html
<link rel="preload" as="image" href="/src/assets/images/hero/hero-1600.webp" type="image/webp" fetchpriority="high">
```

### 6. Font optimization
- Download Inter, Playfair Display, and JetBrains Mono from Google Fonts or use `fontsource` npm packages.
- Place in `src/assets/fonts/` and reference via `@font-face` in CSS with `font-display: swap`.

## Tools to generate optimized images
- `sharp-cli`: `npx sharp-cli -i hero.jpg -o hero-{width}.webp -w 800,1200,1600 -f webp`
- `squoosh-cli`: `npx @squoosh/cli --webp auto hero.jpg`
- Online: squoosh.app or tinypng.com

## Next steps
1. Download high-res images from Unsplash (or replace with client photos).
2. Run optimization script (see example below).
3. Update HTML `<img>` tags to use local assets with `<picture>` and `srcset`.

## Example script (Node.js + sharp)
```javascript
// scripts/optimize-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [400, 800, 1200, 1600];
const formats = ['jpeg', 'webp', 'avif'];
const inputDir = 'raw-images';
const outputDir = 'src/assets/images';

fs.readdirSync(inputDir).forEach(file => {
  const inputPath = path.join(inputDir, file);
  const name = path.parse(file).name;
  
  sizes.forEach(width => {
    formats.forEach(format => {
      sharp(inputPath)
        .resize(width)
        [format]({ quality: 80 })
        .toFile(`${outputDir}/${name}-${width}.${format}`);
    });
  });
});
```

Run: `node scripts/optimize-images.js`
