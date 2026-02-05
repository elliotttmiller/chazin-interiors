# Chazin Interiors — Frontend

This repository is a migration of a single-file static site into a production-ready frontend with modern tooling, comprehensive accessibility, and SEO optimization.

## What's Included

### Core Migration
- ✅ Extracted CSS into `src/styles/main.css`
- ✅ Extracted JS into `src/main.js` (ES module)
- ✅ Vite build tooling with PostCSS pipeline
- ✅ GitHub Actions CI workflow
- ✅ Netlify deployment config with security headers

### Accessibility (WCAG AA)
- ✅ Skip-to-content link for keyboard navigation
- ✅ Proper form labels and ARIA attributes
- ✅ Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`)
- ✅ Focus-visible styles for keyboard users
- ✅ Descriptive alt text for all images
- ✅ ARIA labels for navigation and sections
- ✅ Proper heading hierarchy

### SEO Optimization
- ✅ Comprehensive meta tags (description, keywords, author)
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card metadata
- ✅ JSON-LD structured data (Organization + LocalBusiness)
- ✅ Canonical URL
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Lazy-loading for non-critical images

### Security & Performance
- ✅ Content Security Policy headers
- ✅ X-Frame-Options, X-Content-Type-Options
- ✅ Cache-Control headers for static assets
- ✅ Font-display swap for web fonts
- ✅ Image lazy-loading strategy

## Getting Started

### Local Development

1. Install dependencies:
```powershell
npm install
```

2. Run dev server:
```powershell
npm run dev
```

3. Build for production:
```powershell
npm run build
```

4. Preview production build:
```powershell
npm run preview
```

## Project Structure

```
chazin-interior/
├── public/                  # Static assets (copied to dist/)
│   ├── robots.txt
│   ├── sitemap.xml
│   └── OG-IMAGE-GUIDE.md   # Instructions for creating og-image.jpg
├── src/
│   ├── assets/
│   │   ├── images/         # Optimized images (WebP, AVIF)
│   │   └── fonts/          # Self-hosted fonts (optional)
│   ├── styles/
│   │   └── main.css        # Main stylesheet
│   └── main.js             # Main JavaScript entry
├── .github/
│   └── workflows/
│       └── ci.yml          # GitHub Actions CI
├── index.html              # Main HTML file
├── vite.config.js
├── postcss.config.cjs
├── netlify.toml            # Netlify config with headers
├── package.json
├── AUDIT.md                # Detailed audit findings
└── README.md
```

## Next Steps (Recommended)

### High Priority
1. **Replace placeholder URLs** — Update `https://yourdomain.example/` with your actual domain in:
   - `index.html` (canonical, og:url, JSON-LD)
   - `public/sitemap.xml`
   - `public/robots.txt`

2. **Create OG image** — Add `public/og-image.jpg` (1200x630px) for social sharing
   - See `public/OG-IMAGE-GUIDE.md` for instructions

3. **Optimize images** — Replace Unsplash URLs with local optimized assets:
   - Download high-res versions
   - Generate WebP/AVIF formats + multiple sizes
   - Update `<img>` tags with `srcset` and `<picture>` elements
   - See `src/assets/images/README.md` for automation guide

4. **Self-host fonts** (optional but recommended):
   - Download Inter, Playfair Display, JetBrains Mono
   - Place in `src/assets/fonts/`
   - Update CSS with `@font-face` + `font-display: swap`

### Medium Priority
5. **Add linting & formatting**:
   ```powershell
   npm install -D eslint prettier eslint-config-prettier
   ```

6. **Add automated testing**:
   - Playwright for E2E tests
   - axe-core for accessibility testing
   - Lighthouse CI in GitHub Actions

7. **Wire up contact form** — Currently frontend-only; needs backend:
   - Netlify Forms (easiest)
   - Serverless function (AWS Lambda, Netlify Functions)
   - Third-party service (Formspree, Basin)

8. **Custom cursor accessibility** — Consider removing or making optional:
   - CSS currently sets `cursor: none` globally
   - Breaks expectations for some assistive tech users
   - Recommend scoping to specific design elements only

### Low Priority
9. **Analytics** — Add privacy-focused analytics:
   - Plausible Analytics (recommended)
   - Fathom Analytics
   - Simple Analytics

10. **Error monitoring** — Add Sentry or similar for JS error tracking

11. **Performance monitoring** — Lighthouse CI or SpeedCurve

## Deployment

### GitHub Pages (Automated)
The site is configured to automatically deploy to GitHub Pages when changes are pushed to the `main` branch.

**Setup Steps:**
1. Go to your repository settings → Pages
2. Set Source to "GitHub Actions"
3. Push to `main` branch to trigger deployment
4. Your site will be available at: `https://elliotttmiller.github.io/chazin-interiors/`

The deployment is handled by `.github/workflows/deploy.yml` which:
- Builds the site with `npm run build`
- Deploys the `dist` folder to GitHub Pages
- Runs automatically on every push to `main` or can be triggered manually

### Netlify
1. Connect your Git repository to Netlify
2. Build settings are in `netlify.toml`
3. Deploy previews will be created for PRs automatically

### Vercel
1. Import project from Git
2. Override build command: `npm run build`
3. Override output directory: `dist`

### Manual Deploy
```powershell
npm run build
# Upload contents of dist/ to your hosting provider
```

## Audit Summary

See `AUDIT.md` for the complete audit report. Key findings:

- **Accessibility**: 8 issues addressed (skip-link, form labels, ARIA, focus states)
- **SEO**: 8 issues addressed (meta tags, JSON-LD, sitemap, alt text)
- **Performance**: 6 issues identified (image optimization, lazy-loading, font strategy)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES modules required (no IE11 support)

## License

© 2026 Chazin Interiors. All rights reserved.

## Contributing

This is a private client project. For questions or support, contact the development team.
