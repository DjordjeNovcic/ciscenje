# Architecture

## High-level shape

This is a browser-only CMS-backed marketing site.
The public site and admin panel share one large global script file, `script.js`.
Runtime behavior is page-detected by checking for specific DOM elements rather than by routing or module boundaries.

## Entry points

- `index.html`
  - landing page
  - features, services preview, gallery, CTA, lightbox
- `services.html`
  - service packages and add-ons
- `about.html`
  - company story, stats, reasons, testimonials
- `admin-login.html`
  - Firebase Auth sign-in
- `admin-dashboard.html`
  - admin CMS for content, gallery, slideshow, contact, and theme

## Initialization flow

Primary app bootstrap:

1. `window.addEventListener('load', initializeApp)` in `script.js`
2. `initializeApp()` loads header/footer partials
3. It conditionally enables login flow or admin dashboard flow
4. It always wires shared UI helpers
5. It triggers public content loaders
6. It defers some below-the-fold sections with `IntersectionObserver`

Secondary bootstrap:

- `DOMContentLoaded` handler in `i18n.js`
- `DOMContentLoaded` handler in `script.js` for lightbox swipe
- multiple inline `<script>` blocks in `admin-dashboard.html`
- inline theme bootstrap in `admin-login.html` and `admin-dashboard.html`

## Data flow

Public page pattern:

1. Read Firestore collection or document
2. Cache result in memory and/or `sessionStorage`
3. Render DOM nodes imperatively
4. Resolve language-specific fields with `getLocalizedField(...)`

Admin page pattern:

1. Firebase Auth gate in `setupAdminDashboard()`
2. Load current records into forms or lists
3. Open modal or edit section
4. Save updates directly to Firestore
5. Re-render admin list

## View composition

- Shared header and footer are fetched from `partials/header.html` and `partials/footer.html`
- Main page body is static HTML shell plus dynamic Firestore content
- Most components are constructed with `document.createElement(...)` or `innerHTML`

## State model

Global state in `script.js`:

- Firebase handles: `db`, `auth`
- content caches: `servicesCache`, `galleryCache`, `testimonialsCache`, `addonsCache`, `homeCache`, `aboutCache`, `slideshowCache`
- lightbox state: `galleryImages`, `currentLightboxIndex`

## Architectural characteristics

- Monolithic script
- Global functions exposed to inline HTML handlers such as `onclick="saveTheme()"`
- Tight DOM coupling
- Firestore schema is implicit in code, not documented elsewhere
- Shared public/admin concerns live in same file

## Strengths

- Very low deployment complexity
- Easy to open locally or host statically
- Admin CRUD flows are direct and understandable
- Dual-language content model is consistent across many entities

## Weak spots

- Repeated logic across files and inline scripts
- No boundary between public and admin concerns
- Cache invalidation is incomplete
- Security posture depends heavily on external Firebase rules
