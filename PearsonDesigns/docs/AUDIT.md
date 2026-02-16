# Site Audit Report — Pearson Designs

## Accessibility Issues (Current State)

### Critical
1. **Custom cursor with `cursor: none`** — All elements have `cursor: none;` set globally. This breaks default cursor behavior and creates accessibility barriers for users relying on visual cursor feedback, magnification tools, or assistive tech.
   - **Fix**: Remove or scope to specific design elements only; ensure keyboard focus indicators are strong.

2. **Form inputs missing labels** — All form fields use `placeholder` but have no associated `<label>` elements. Screen readers cannot identify field purpose.
   - **Fix**: Add explicit `<label>` with `for` attribute or wrap inputs in labels.

3. **Missing skip-link** — No "Skip to main content" link for keyboard/screen-reader users to bypass navigation.
   - **Fix**: Add skip-link at top of `<body>`.

4. **Decorative Instagram boxes lack ARIA** — Empty `.insta-box` divs are presentational but not marked.
   - **Fix**: Add `role="presentation"` or `aria-hidden="true"`.

5. **No ARIA landmarks** — `<header>`, `<main>`, `<footer>` are present but `<nav>` lacks `aria-label`. Sections lack ARIA labels for screen readers.
   - **Fix**: Add `aria-label` to `<nav>`, consider `<section aria-labelledby="...">`.

### Moderate
6. **Inline styles in HTML** — Multiple inline styles (font-size, margin, color) make it hard to maintain and override for accessibility (e.g., user stylesheets).
   - **Fix**: Move to CSS classes where possible.

7. **No `lang` attribute on SVG** — SVG grain overlay has no text, but best practice is to mark decorative SVGs with `aria-hidden="true"`.

8. **Contrast issues** — `.mono` labels with `opacity: 0.4` and `.ticker-content span` with `opacity: 0.3` may fail WCAG AA contrast.
   - **Fix**: Test contrast and increase opacity or use darker base colors.

## SEO Issues

### Critical
1. **Missing OG image** — `og:image` and `twitter:image` not set; social shares will have no preview image.
   - **Fix**: Add `<meta property="og:image" content="https://...">`.

2. **Canonical URL placeholder** — `<link rel="canonical" href="https://yourdomain.example/">` is a placeholder.
   - **Fix**: Replace with actual production domain.

3. **No JSON-LD structured data** — Google/Bing use structured data for rich results. Site has no LocalBusiness or Organization schema.
   - **Fix**: Add JSON-LD for Organization and LocalBusiness (Wayzata location).

4. **Missing sitemap.xml** — No sitemap for search engines.
   - **Fix**: Generate `public/sitemap.xml`.

5. **Portfolio images missing alt text** — 6 portfolio `<img>` tags have no `alt` attribute.
   - **Fix**: Add descriptive alt text.

6. **No robots.txt** — Missing robots.txt to control crawler behavior.
   - **Fix**: Add `public/robots.txt`.

### Moderate
7. **Footer email input has no label or form** — Newsletter signup input is standalone, no label, no validation, no backend.
   - **Fix**: Wrap in `<form>`, add label and submit button, or remove if not wired up.

8. **H1 has `<br>` tag** — Breaks in heading can confuse screen readers and SEO parsers.
   - **Fix**: Use CSS or rephrase heading without `<br>`.

## Performance Issues

### Critical
1. **Google Fonts blocking render** — 3 font families loaded synchronously. No `font-display: swap` set in URL.
   - **Fix**: Add `&display=swap` to font URL, or self-host fonts with `@font-face` and `font-display: swap`.

2. **Large Unsplash images** — Hero image is 2000px wide; portfolio images 800-1200px. No responsive `srcset` or modern formats (WebP/AVIF).
   - **Fix**: Generate multiple sizes + WebP/AVIF, use `<picture>` or `srcset`.

3. **No lazy-loading** — All images load immediately. Portfolio and non-critical images should be lazy-loaded.
   - **Fix**: Add `loading="lazy"` to portfolio images.

4. **No image preload for hero** — Hero image is critical but not preloaded; LCP will be delayed.
   - **Fix**: Add `<link rel="preload" as="image" href="...">` for hero.

### Moderate
5. **Ticker animation runs continuously** — `@keyframes scroll` runs 30s infinite even when not in viewport; minor perf impact.
   - **Fix**: Pause animation when out of view (Intersection Observer).

6. **No CSS code-splitting** — All CSS is one file; could split critical vs. non-critical.
   - **Fix**: Extract critical CSS inline or use code-splitting in build.

## Summary of Fixes to Implement

| Category | Count | Priority |
|----------|-------|----------|
| Accessibility | 8 | High |
| SEO | 8 | High |
| Performance | 6 | High |

**Next steps**: Apply fixes in HTML, create asset folders, generate placeholder images, add JSON-LD, sitemap, robots.txt, and update README with audit findings.
