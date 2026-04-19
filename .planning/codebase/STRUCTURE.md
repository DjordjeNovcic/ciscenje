# Structure

## Repository layout

Top-level files:

- `index.html` - public landing page
- `about.html` - public about page
- `services.html` - public services page
- `admin-login.html` - admin sign-in page
- `admin-dashboard.html` - admin CMS page
- `script.js` - main shared runtime for all pages
- `i18n.js` - translation application helpers
- `translations.js` - translation dictionary and language getters
- `styles.css` - all public and admin styles
- `logo.png`, `favicon.ico`, `favicon-32.png` - static assets

Shared partials:

- `partials/header.html` - navbar, language switcher, phone dropdown
- `partials/footer.html` - footer content and current-year script

## Functional grouping in `script.js`

Observed sections:

- Firebase bootstrap and caches
- app initialization
- shared UI helpers
- partial loading
- public content loaders
- admin auth and dashboard setup
- home content
- services CRUD
- about content and stats/reasons CRUD
- testimonials CRUD
- gallery CRUD and lightbox
- contact settings
- add-on CRUD
- slideshow CRUD
- modal language tabs
- theme management
- lazy loading and deferred scrolling

## Naming patterns

- Public render functions typically use `loadX()` and `renderX()`
- Admin data loaders use `loadXAdmin()`
- CRUD actions use `showXModal()`, `saveX()`, `deleteX()`
- bilingual Firestore fields follow `_sr` and `_en` suffixes

## DOM conventions

- Feature-rich sections use stable IDs such as `servicesGrid`, `galleryGrid`, `testimonialsGrid`
- Admin navigation uses `data-section` values matching `.content-section` element IDs
- Several actions rely on inline `onclick` attributes from HTML

## Styling structure

`styles.css` is organized into many section headers and includes:

- base reset and CSS variables
- desktop navigation and hero styles
- section-specific styles for services, about, testimonials, gallery
- admin layout and dashboard styles
- lightbox styles
- mobile responsive overrides

## Generated and planning content

- `.planning/codebase/` is intended to hold analysis artifacts

## Structural observations

- The repo is intentionally small and flat
- There is no `src/` directory or modular split
- Public content pages are thin shells; most behavior is centralized in `script.js`
- Admin page contains substantial inline script in addition to using `script.js`
