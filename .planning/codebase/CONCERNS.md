# Concerns

## High priority concerns

### 1. Secrets and privileged integration details are embedded in shipped frontend code

`script.js` contains:

- Firebase web app configuration
- ImgBB API key

Firebase web config alone is often acceptable in browser apps, but the ImgBB key is a true third-party secret-like credential exposed to every visitor.
If abused, it can be used for unauthorized uploads and quota consumption.

### 2. Demo admin credentials are exposed in the login page

`admin-login.html` includes:

- `Demo pristup: admin@cleanpro.com / admin123`

If that account is real, this is a critical security issue.
If it is not real, it still encourages unsafe deployment patterns and can confuse operators.

### 3. Security depends on Firebase rules outside the repo

The public bundle contains direct write code for many Firestore collections.
Because there is no backend in the repo, effective protection depends entirely on Firestore/Auth rules configured elsewhere.
This repository does not provide evidence that public users are prevented from writes.

## Medium priority concerns

### 4. Session cache invalidation is incomplete after admin writes

Public loaders store data in `sessionStorage`, but save/delete flows usually only null the in-memory cache.
Examples include services, add-ons, testimonials, and about content.
That means editors can save new content and still see stale public data until the browser session cache is cleared or a new session begins.

### 5. Logic duplication raises drift risk

The same or similar logic exists in multiple places:

- language switcher helpers in `i18n.js` and `script.js`
- `getLocalizedField(...)` in `i18n.js` and `script.js`
- theme bootstrap in both admin HTML pages
- admin nav and language-tab logic both inline and in `script.js`

This increases the chance that a future fix lands in only one location.

### 6. Public and admin logic are tightly coupled in one large script

`script.js` is over 2300 lines and mixes:

- public rendering
- admin CRUD
- authentication
- theme management
- lightbox behavior
- mobile nav behavior

This makes onboarding, targeted changes, and bug isolation harder over time.

### 7. Heavy reliance on `innerHTML` and inline event handlers

The code uses `innerHTML` for rendering and `onclick="..."` attributes in HTML.
Today the content looks operator-managed, but these patterns can become XSS-sensitive if richer user-supplied content is ever introduced.

## Lower priority but notable

### 8. Multiple bootstrap points can create sequencing bugs

Initialization is spread across:

- `window.load`
- `DOMContentLoaded`
- partial fetch completion
- inline scripts in admin HTML

This is workable, but race conditions are more likely than in a single bootstrap path.

### 9. CDN and external-service dependence has no fallback

The app depends on Firebase CDN, Font Awesome CDN, FlagCDN, and ImgBB.
There is no graceful offline or degraded mode beyond console errors.

### 10. No automated regression protection

Without tests, the riskiest areas are admin CRUD, translations, responsive UI, and cache behavior.

## Suggested near-term remediation order

1. Remove or rotate the ImgBB key and move uploads behind a safer boundary if possible.
2. Remove demo credentials from `admin-login.html` and verify auth/firestore rules.
3. Fix cache invalidation by clearing relevant `sessionStorage` keys after admin writes.
4. Consolidate duplicate language/theme helpers.
5. Split `script.js` into smaller modules or page-specific scripts.
