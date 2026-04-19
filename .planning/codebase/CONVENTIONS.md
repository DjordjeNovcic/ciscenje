# Conventions

## Coding style

- Predominantly classic function declarations instead of modules or classes
- Heavy use of global scope in `script.js`
- Uses both arrow functions and `function (...)` style, with no strict consistency
- Comments are practical and often bilingual
- Section banners split the large file into domains

## DOM and rendering style

- Imperative DOM creation with `document.createElement(...)`
- Some templates use `innerHTML` for convenience
- Public loaders follow a common pattern:
  - guard for relevant container
  - check sessionStorage cache
  - fetch Firestore data
  - render markup
  - mark container with `data-loaded`

## Data naming conventions

- Bilingual content fields use `_sr` and `_en`
- Generic fallback fields sometimes exist without suffixes
- Firestore docs use business-oriented collection names instead of technical namespaces

Examples:

- `name_sr`, `name_en`
- `description_sr`, `description_en`
- `price_sr`, `price_en`
- `heading_sr`, `heading_en`

## UI conventions

- Shared theme values come from CSS custom properties
- Buttons consistently use `.btn`, `.btn-primary`, `.btn-secondary`
- Cards and sections use reusable class names such as `.feature-card`, `.pricing-card`, `.testimonial-card`

## Internationalization conventions

- Static copy is translated using `data-i18n`
- Dynamic Firestore content is translated via `getLocalizedField(...)`
- Language preference is stored in `localStorage.language`

## Admin conventions

- Admin actions mostly trigger browser `alert()` and `confirm()`
- Admin modals are switched via display toggles rather than component state
- Section switching relies on matching `data-section` to content section IDs

## Inconsistencies worth knowing

- `getLocalizedField(...)` is defined in both `script.js` and `i18n.js`
- `setupLanguageSwitcher()` is defined in both `script.js` and `i18n.js`
- admin page redefines `switchLang()` and `switchModalLang()` inline even though `script.js` also defines them
- some text is translated from dictionary, while some is hardcoded Serbian or English in HTML and JS alerts

## Error handling conventions

- Mostly `console.error(...)`, `alert(...)`, and optimistic UI refreshes
- No centralized logger
- No retry/backoff behavior
- No validation layer beyond browser input types and a few simple guards
