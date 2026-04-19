# Testing

## Current state

No automated tests were found in the repository.

Not present:

- unit tests
- integration tests
- end-to-end tests
- visual regression tests
- lint checks
- CI workflows

## Existing quality signals

- The codebase uses explicit sectioning and descriptive function names, which helps manual verification.
- Public pages and admin pages are small enough to exercise manually in a browser.
- Admin CRUD flows appear straightforward to smoke test by hand against Firebase.

## Areas that most need manual coverage

- admin authentication redirect flow between `admin-login.html` and `admin-dashboard.html`
- service CRUD
- add-on CRUD
- testimonial CRUD
- gallery upload and delete
- slideshow upload and delete
- theme save and instant apply
- language switching across all public pages
- lazy-loaded sections and lightbox behavior
- mobile navigation, phone dropdown, back button, and sidebar behavior

## Likely regression hotspots

- duplicate initialization across `i18n.js`, `script.js`, and inline scripts
- sessionStorage caches not being cleared after admin writes
- dual-language field fallbacks
- partial loading timing before language switch setup
- mobile-only interactions

## Recommended future test strategy

1. Add a browser E2E suite first, because most value is in cross-page behavior and Firebase-backed CRUD.
2. Mock Firestore/Auth/ImgBB in tests where possible.
3. Add a lightweight smoke suite for:
   - public page rendering
   - language toggle
   - admin login guard
   - each CRUD modal path
4. Add static checks for HTML/CSS/JS correctness after that.

## Suggested tooling if testing is introduced

- Playwright for browser flows
- a small Firebase test or mock layer for document reads/writes
- ESLint or Biome for basic static checks

## Verification status of this analysis

This codebase map is based on source inspection only.
No browser runtime verification, Firebase connectivity check, or upload integration test was executed during this analysis.
