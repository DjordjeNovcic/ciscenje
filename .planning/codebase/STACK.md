# Stack

## Overview

This project is a static multi-page website for a cleaning business with a client-side admin CMS.
There is no build step, package manager, bundler, or server code in the repository.
The app is delivered as plain HTML, CSS, and JavaScript files loaded directly in the browser.

## Languages and Runtime

- HTML for page structure in `index.html`, `about.html`, `services.html`, `admin-login.html`, and `admin-dashboard.html`
- CSS in `styles.css`
- Vanilla JavaScript in `script.js`, `i18n.js`, and `translations.js`
- Browser runtime only

## Frontend Libraries and CDNs

- Firebase compat SDK v9.22.0 loaded from Google CDN
  - `https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js`
  - `https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js`
  - `https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js`
- Font Awesome 6.5.1 loaded from Cloudflare CDN
  - `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css`
- Flag images loaded from `flagcdn.com` inside `partials/header.html`

## Data and Storage

- Firestore is the primary data store
- Firebase Auth is used for admin sign-in
- Browser `sessionStorage` caches public content:
  - `home`
  - `services`
  - `about`
  - `testimonials`
  - `gallery`
  - `addons`
  - `slideshow`
- Browser `localStorage` stores:
  - `language`
  - `mssjaj_theme`

## External Media Uploads

- Image uploads for gallery and slideshow go through ImgBB using `IMGBB_API_KEY` in `script.js`
- Uploaded ImgBB URLs are then persisted to Firestore

## Theming

- CSS custom properties in `styles.css` define the visual system
- Theme colors can be changed from admin and stored in `settings/theme`
- Theme is applied in two places:
  - `script.js` through `applyTheme()`
  - inline scripts in `admin-login.html` and `admin-dashboard.html`

## Internationalization

- Static translation dictionary lives in `translations.js`
- DOM translation helpers live in `i18n.js`
- Firestore content is modeled as dual-language fields such as `name_sr`, `name_en`, `text_sr`, `text_en`

## Configuration Present in Repo

- Firebase web app config is hardcoded in `script.js`
- ImgBB API key is hardcoded in `script.js`
- There is no environment-variable system in the repo

## Not Present

- No `package.json`
- No test framework
- No CI configuration
- No backend source
- No linting or formatting setup in repo
