# Post-Migration Checklist

Use this checklist to complete the remaining manual tasks before going live.

## 🔴 Critical (Must Complete Before Launch)

- [ ] **Replace domain placeholders** with actual production domain:
  - [ ] `index.html` — Update canonical URL (line ~33)
  - [ ] `index.html` — Update og:url, og:image URLs (lines ~21-23)
  - [ ] `index.html` — Update JSON-LD URLs in structured data (lines ~40-95)
  - [ ] `public/sitemap.xml` — Replace all `https://yourdomain.example/`
  - [ ] `public/robots.txt` — Update sitemap URL

- [ ] **Create and add OG image**:
  - [ ] Design 1200x630px image with brand/logo
  - [ ] Save as `public/og-image.jpg`
  - [ ] Test with [Facebook Debugger](https://developers.facebook.com/tools/debug/)
  - [ ] Test with [Twitter Card Validator](https://cards-dev.twitter.com/validator)

- [ ] **Add favicon files** to `public/`:
  - [ ] `favicon.ico` (32x32)
  - [ ] `favicon-32x32.png`
  - [ ] `favicon-16x16.png`
  - [ ] `apple-touch-icon.png` (180x180)

- [ ] **Wire up contact form** (choose one):
  - [ ] Option A: Netlify Forms (add `data-netlify="true"` to form)
  - [ ] Option B: Serverless function (Netlify Functions or AWS Lambda)
  - [ ] Option C: Third-party service (Formspree, Basin, etc.)
  - [ ] Add form validation and error handling
  - [ ] Add success/error messages

## 🟡 High Priority (Performance & Privacy)

- [ ] **Optimize images**:
  - [ ] Download all Unsplash images (or replace with client photos)
  - [ ] Generate WebP + AVIF versions
  - [ ] Create multiple sizes (400w, 800w, 1200w, 1600w)
  - [ ] Update `<img>` tags with `srcset` and `<picture>` elements
  - [ ] Move files to `src/assets/images/`
  - [ ] Run optimization script (see `src/assets/images/README.md`)

- [ ] **Self-host fonts** (optional but recommended):
  - [ ] Download Inter, Playfair Display, JetBrains Mono
  - [ ] Place in `src/assets/fonts/`
  - [ ] Update CSS with `@font-face` declarations
  - [ ] Remove Google Fonts `<link>` from `index.html`
  - [ ] Add `font-display: swap` to all `@font-face` rules

- [ ] **Review custom cursor accessibility**:
  - [ ] Test with keyboard navigation
  - [ ] Test with screen readers
  - [ ] Consider removing `cursor: none` or making it optional
  - [ ] Ensure all interactive elements show pointer on hover

## 🟢 Medium Priority (Quality & Monitoring)

- [ ] **Add linting and formatting**:
  - [ ] `npm install -D eslint prettier eslint-config-prettier`
  - [ ] Create `.eslintrc.json` and `.prettierrc`
  - [ ] Run `npx prettier --write "src/**/*.{js,css,html}"`
  - [ ] Add pre-commit hooks (husky + lint-staged)

- [ ] **Add testing**:
  - [ ] Install Playwright: `npm install -D @playwright/test`
  - [ ] Create `tests/accessibility.spec.js` with axe-core
  - [ ] Create basic E2E smoke test
  - [ ] Add Lighthouse CI to GitHub Actions

- [ ] **Add analytics**:
  - [ ] Choose privacy-focused provider (Plausible/Fathom/Simple Analytics)
  - [ ] Add tracking script to `index.html`
  - [ ] Configure goals/events
  - [ ] Test in production

- [ ] **Add error monitoring**:
  - [ ] Set up Sentry account
  - [ ] Add Sentry SDK to project
  - [ ] Test error reporting

- [ ] **Update JSON-LD data**:
  - [ ] Verify address (currently placeholder: "123 Design Row")
  - [ ] Update geo-coordinates (currently Minneapolis downtown)
  - [ ] Update opening hours if different
  - [ ] Add social media URLs (Instagram, etc.)

## 🔵 Low Priority (Nice to Have)

- [ ] **Newsletter integration**:
  - [ ] Connect footer email input to mailing list provider
  - [ ] Add validation and error handling
  - [ ] Add GDPR compliance checkbox if needed

- [ ] **Instagram feed**:
  - [ ] Replace placeholder boxes with actual Instagram images
  - [ ] Use Instagram Basic Display API or third-party widget
  - [ ] Update footer Instagram link

- [ ] **Blog/Journal section**:
  - [ ] Create journal/blog pages (currently nav link exists but no content)
  - [ ] Set up CMS or static content strategy
  - [ ] Update sitemap.xml

- [ ] **Performance optimizations**:
  - [ ] Consider adding service worker for offline support
  - [ ] Implement critical CSS extraction
  - [ ] Add resource hints for third-party assets

## 📋 Testing Before Launch

- [ ] **Desktop browsers**:
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge

- [ ] **Mobile devices**:
  - [ ] iOS Safari
  - [ ] Chrome Android
  - [ ] Test touch interactions

- [ ] **Accessibility testing**:
  - [ ] Keyboard navigation (Tab through all interactive elements)
  - [ ] Screen reader test (NVDA, JAWS, or VoiceOver)
  - [ ] Color contrast check (WebAIM Contrast Checker)
  - [ ] Run axe DevTools browser extension

- [ ] **SEO validation**:
  - [ ] Run Lighthouse audit (target 90+ in all categories)
  - [ ] Test structured data with [Rich Results Test](https://search.google.com/test/rich-results)
  - [ ] Verify sitemap.xml loads correctly
  - [ ] Check robots.txt is accessible

- [ ] **Performance**:
  - [ ] Run Lighthouse performance audit
  - [ ] Test on 3G connection (Chrome DevTools throttling)
  - [ ] Check Core Web Vitals (LCP, FID, CLS)

## 🚀 Deployment

- [ ] **Connect to hosting**:
  - [ ] Connect GitHub repo to Netlify/Vercel
  - [ ] Verify build settings match `netlify.toml`
  - [ ] Set up custom domain
  - [ ] Enable HTTPS

- [ ] **DNS Configuration**:
  - [ ] Point domain to hosting provider
  - [ ] Wait for DNS propagation (24-48 hours)
  - [ ] Force HTTPS redirect

- [ ] **Post-deployment checks**:
  - [ ] Verify site loads on production domain
  - [ ] Test all links and navigation
  - [ ] Verify forms work
  - [ ] Check analytics are tracking
  - [ ] Test social sharing preview

## 📞 Support

Questions or issues? Check:
- `README.md` for setup and structure
- `AUDIT.md` for detailed issue analysis
- `COMPLETION-SUMMARY.md` for what's been completed
