# Integrations

## Firebase

Primary integration is Firebase, initialized in `script.js`.

### Services used

- Firebase App bootstrap
- Firestore
- Firebase Auth

### Firestore collections observed

- `content`
  - `home`
  - `about`
- `services`
- `addons`
- `testimonials`
- `gallery`
- `slideshow`
- `contact`
  - `info`
- `settings`
  - `theme`

### Read paths used by public pages

- `content/home` for hero and feature content
- `content/about` for about text, stats, and reasons
- `services` for service cards
- `addons` for add-on cards
- `testimonials` for testimonial cards
- `gallery` for public gallery
- `contact/info` for footer contact data
- `slideshow` for home hero background cache and admin management
- `settings/theme` for persisted theme values

### Write paths used by admin pages

- Sign-in via `auth.signInWithEmailAndPassword(...)` in `setupAdminLogin()`
- CRUD operations across:
  - `services`
  - `addons`
  - `testimonials`
  - `gallery`
  - `slideshow`
  - `content/about`
  - `contact/info`
  - `settings/theme`

## ImgBB

Image uploads for gallery and slideshow use `https://api.imgbb.com/1/upload`.

Flow:

1. User selects file in admin.
2. Browser reads file with `FileReader`.
3. Base64 payload is sent to ImgBB with the API key.
4. Returned hosted URL is saved into Firestore.

This integration appears in:

- `setupAdminForms()` for gallery uploads in `script.js`
- `setupSlideshowUpload()` for slideshow uploads in `script.js`

## CDN-hosted assets

- Font Awesome icons from Cloudflare CDN
- Firebase SDK from Google CDN
- Country flags from FlagCDN

## Browser/OS deep links

- `tel:` links for phone calls
- `mailto:` links for email
- `https://wa.me/...` for WhatsApp
- `viber://chat?...` for Viber

## Integration assumptions and risks

- The app assumes Firestore security rules enforce public-read/admin-write boundaries, because the client contains write logic and Firebase config in browser-accessible code.
- The app assumes ImgBB API key exposure is acceptable, but that key is embedded in the shipped frontend and should be treated as public.
- The app assumes CDN availability for Firebase, Font Awesome, and flags; there is no local fallback.
