# Core Edge / AURA Website

## Brand System
- Colors: gold `#C9A84C` (accent `#E3C77E`), cream `#F5F2EC`, near-black/ink `#080806`
- Typography (EN): Cormorant Garamond (headings, h1–h3), Montserrat (body/nav/UI)
- Typography (AR): Noto Naskh Arabic (headings), Noto Kufi Arabic (body) — loaded alongside the EN fonts, not Amiri
- Logo mark uses Cormorant Garamond regardless of language

## i18n / RTL Toggle Mechanism (as implemented)
This is **not** a JS-driven single-page toggle — it's a static twin-page pattern:
- Every page ships as two files: an EN file and an `ar-` prefixed twin (home page is the exception: `index.html` ↔ `ar.html`).
- The AR file sets `<html lang="ar" dir="rtl">` on the root element; the EN file sets `lang="en"` with no `dir` (defaults ltr). This single attribute drives RTL mirroring of all text and block flow via CSS logical inheritance.
- The nav bar is explicitly pinned to `nav{direction:ltr;}` on AR pages so the logo stays left and nav links don't visually mirror — only body content mirrors.
- Language switcher markup (in both files):
  ```html
  <div class="lang-switch" aria-label="Language switch">
    <a href="index.html" class="active" lang="en" aria-current="page">EN</a>
    <span class="divider">|</span>
    <a href="ar.html" lang="ar" dir="rtl">عربي</a>
  </div>
  ```
  Each page's switcher links straight to its sibling file (e.g. `aura.html` ↔ `ar-aura.html`); the current language gets `class="active"` + `aria-current="page"`.
- Each page has its own inline `<style>` block (no shared CSS file) — fonts, RTL rules, and the `.lang-switch` styling are duplicated per page and must be edited per page when changed.

## Site Structure
- 11 page-pairs (22 HTML files total): index/ar, about/ar-about, aura/ar-aura, green-belt/ar-green-belt, developer/ar-developer, portfolio/ar-portfolio, contact/ar-contact, 404/ar-404, and 3 blog posts (blog-green-belt-investment, blog-inside-aura, blog-investor-first) each with an `ar-` twin
- Standardized nav and footer across all pages
- Contact: +20 11 0000 3939 (WhatsApp-first, no contact form)
- Hosted on GitHub (`mtoufic/-coreedgedev`), deployed via **Vercel** (not Netlify — confirmed via existing `.vercel/project.json` link), auto-deploy from `main`. Current working branch: `finalbilingual` (ahead of `main`, carries the complete bilingual + QA work; not yet merged).

## Working Conventions
- Preserve the EN/AR twin-page pattern and `dir="rtl"` + `nav{direction:ltr;}` mirroring on every new section added — apply changes to **both** files in a pair
- Match existing file/folder structure (flat HTML files, inline styles, `images/` folder), do not introduce a new build system, framework, or shared CSS/JS file
- Test both language states (EN file and its `ar-` twin) before reporting any task complete
