---
name: Design Review — MS Sjaj
date: 2026-04-30
basis: Code-only review against current main (no `.design/` brief; falling back to `.planning/00-UI-REVIEW.md` from 2026-03-21 as prior baseline)
philosophy: Warm, editorial premium service site — Manrope + Cormorant Garamond, warm beige + amber accents
---

# Design Review: MS Sjaj public site

Reviewed against: `.planning/00-UI-REVIEW.md` (prior audit, 2026-03-21)
Pages: `index.html`, `services.html`, `about.html`, `works.html`
Stack note: `.planning/codebase/STACK.md` is **stale** — references Firebase, ImgBB, admin-login.html, admin-dashboard.html, i18n.js, translations.js. None of those exist in the current tree. Site is now a pure static four-page marketing site. Planning docs should be updated.

## Screenshots Captured

Full-page captures of all four pages at three widths, served from `python3 -m http.server` and rendered with the Playwright MCP. To get readable full-page renders, the IntersectionObserver-driven reveals were force-applied (`document.body.classList.add('is-loaded')` + `.reveal { is-visible }` on every node) before each shot — without this, off-screen sections render as opacity-0 voids in a stitched fullPage screenshot.

Saved under `.planning/ui-reviews/2026-04-30-screenshots/`:

- Desktop 1280: `desktop-index.png`, `desktop-services.png`, `desktop-about.png`, `desktop-works.png`
- Tablet 768: `tablet-index.png`, `tablet-services.png`, `tablet-about.png`, `tablet-works.png`
- Mobile 375: `mobile-index.png`, `mobile-services.png`, `mobile-about.png`, `mobile-works.png`

## Visual confirmations (from screenshots)

Findings from the code-only pass that the screenshots **confirm**:

- **Two H1s on the homepage.** `mobile-index.png` shows "Čisto, tačno i spremno odmah." in the hero, while `desktop-index.png` shows "MS Sjaj za domove i lokale koji moraju da zablistaju." Both are in the DOM; CSS swaps them at the breakpoint. (Must Fix #5)
- **Inquiry form lives only on home.** `desktop-services.png`, `desktop-about.png`, `desktop-works.png` end in a CTA panel with a "Zatražite čišćenje" button — no inline form. Only `desktop-index.png` shows the actual form. (Must Fix #1)
- **About page stat tiles mix numbers with words.** `desktop-about.png` shows the four-tile row "500+ / 10+ / Upit / Plan" — visually all four are styled the same (large display digit + caption beneath), so "Upit" and "Plan" read as broken data points where the number should be. The mismatch is even sharper on `mobile-about.png` where the tiles stack vertically and the non-numeric ones look like duplicated section headings. (Should Fix #3)
- **Works gallery is thin.** `desktop-works.png` shows ~5 gallery tiles total, and the comparison slider uses the same chair pair as the homepage. With only one bare-`detail`-tagged item, the "Detalj" filter would land on a single image. (Should Fix #3 + #4)
- **Sub-13px labels visibly drift.** Eyebrow labels above section headings (e.g. "NAŠ FOKUS" on about, "PROCES KORAK PO KORAK" on works) render as tiny tracked-out caps at desktop and become near-illegible on `mobile-about.png` and `mobile-works.png`. (Should Fix #2)

Findings the screenshots **refute or downgrade**:

- **Mobile bottom action bar overlap** (Could Improve #1) — at 375 the bottom of every page lands cleanly on the dark CTA panel, then footer; the fixed action bar floats above without clipping content. CSS does provide enough bottom space. Demote to non-issue.

New things visible only with screenshots:

- **Tablet 768 "tweener" — homepage stat row breaks awkwardly.** `tablet-index.png` shows the "3 brza odgovora" tile row collapsing to two narrow columns where the third tile drops to a partial line. The breakpoint `@media (max-width: 980px)` likely needs a tighter intermediate rule.
- **Services hero CTA card sits visually orphaned at desktop.** `desktop-services.png` opens with a small left card + image, with a large empty band of beige below before the next section. The hero feels under-weighted relative to the page that follows.
- **Works hero compound element is hard to parse.** `desktop-works.png` hero shows a card-on-card composition (photo carousel inside a panel inside the hero container) — reads as cluttered next to the airy hero on the other three pages. The visual grammar across the four heroes isn't consistent.
- **About hero leaves a tall empty band on desktop.** `desktop-about.png` has roughly 25–30% empty beige between the hero card and the first paragraph block — the right column under the photo runs short. Either pull the next section up or fill the negative space deliberately.
- **Tablet about stats become two big tiles + two small tiles.** `tablet-about.png` shows 500+/10+ at full width and Upit/Plan as a paired row beneath — three different visual rhythms in one strip, on top of the number/word mismatch.

## Summary

The site has improved meaningfully since the March 17/24 audit. The three top-priority fixes from that round have all landed: real photography replaces placeholders, an inline inquiry form ships on the homepage, and the lightbox is now an accessible dialog with focus trap and restore. The remaining gaps are smaller and mostly about consistency, mobile-first discipline, and form-flow honesty — the site still hands inquiries off to `mailto:` rather than capturing them server-side, and the form lives only on the homepage.

## What changed since the prior audit (worth keeping)

- **Placeholder SVGs are no longer referenced** in any HTML page (grep across `*.html` returns 0 hits for `placeholder-`). Hero, services, gallery, before/after all use real `.jpeg/.jpg` from `assets/`.
- **Inline inquiry form** added on `index.html#kontakt` (`data-inquiry-form`) with name/phone/space/message, browser validation, an `aria-live="polite"` status line, and submit-disabled-during-submit (`script.js:720`).
- **Lightbox is now a proper dialog**: `role="dialog"`, `aria-modal="true"`, `aria-labelledby/describedby`, focus moves to close button on open, last-focused element restored on close, Tab/Shift+Tab is trapped inside the dialog (`script.js:613`, `script.js:687`).
- **Partial fetch failure no longer leaves the page broken** — `getPartialFallback()` injects a full visible header/footer when `fetch` fails (`script.js:55`). This was a "users see nothing" bug before.
- **`script.js` shrank from 2300+ lines to 784** — admin/CMS/i18n code is gone, leaving a focused public bundle.
- **Two-font system shifted** to Manrope (body/UI) + Cormorant Garamond (display) — warmer and more editorial than the prior Inter + Poppins.

## Must Fix

1. **Inquiry only exists on the home page; everywhere else the CTA jumps to `index.html?scroll=kontakt`.**
   `services.html:363`, `about.html:180`, `works.html:227`, and `partials/footer.html:11` all link to `index.html?scroll=kontakt` instead of submitting from the page the user is already on. That's an extra navigation, an extra layout shift, and a real conversion tax — the user is most warmed up exactly where they decided to act. Either render the same `<form data-inquiry-form>` inside each page's CTA panel (the markup is small and the JS already supports `data-form-context` per page), or render a shared `<dialog>` triggered from those CTA buttons.
   _Fix: extract the form to a partial and include it on every page; pass `data-form-context="Usluge"|"O nama"|"Naši radovi"`._

2. **The form's "success" state is misleading — it claims success before the email actually leaves.**
   `script.js:757` sets `status.dataset.state = 'success'` and "Otvaramo email klijent…" *before* `window.location.href = 'mailto:…'`. If the user has no mail client configured, or the OS dialog gets dismissed, the form has lied. There is no real submission; nothing reaches `11mssjaj@gmail.com` unless the user's local mail client successfully sends the draft.
   _Fix (cheapest): change the status copy to "Otvaramo email — pošaljite poruku da završite upit" (no claim of success), and keep mailto. Better: post to a Formspree/Web3Forms endpoint so submissions actually arrive even when no mail client exists. Critical on mobile where most users won't have a configured mail client._

3. **CSS is desktop-first.** `grep @media`: 5 `max-width` queries vs 1 `min-width` (`styles.css:4104, 4167, 4187, 4332, 4569, 5233`). Mobile is a series of overrides on top of a desktop layout, which is exactly the pattern that produces "shrunk desktop site on phone" rather than a phone-native layout. The prior audit also flagged this implicitly via the spacing pillar.
   _Fix: this is not a same-day fix, but new CSS work on this file should be authored mobile-first; over time, each section's mobile rules can move to default scope and the desktop overrides into `min-width` queries._

## Should Fix

1. **Hardcoded colors still dominate the stylesheet.** 392 raw `#…/rgb(…)/rgba(…)` references vs 101 `var(--color-…)` usages. Specifically, `rgba(217, 154, 43, …)` (the primary amber) appears literally many times in gradients (`styles.css:237`, `253`, `285`, etc.) instead of `color-mix(in oklab, var(--color-primary) X%, transparent)` or a dedicated `--color-primary-soft` token. Same for the panel/ink series.
   _Fix: add `--color-primary-soft`, `--color-primary-strong`, `--color-ink-translucent` etc. and replace the most-repeated rgba tuples first._

2. **Sub-13px micro-labels are common.** `styles.css` shows 10+ font sizes ≤ 0.74rem (≤ ~11.8px) on labels (`0.68rem` at lines 1411, 2819; `0.7rem` at 226, 327; `0.72rem` at 1752, 2346; `0.73–0.74rem` elsewhere). At desktop they're fine; at mobile under 375px they're borderline for older eyes and below WCAG comfort guidance. The previous audit raised the same pattern.
   _Fix: floor body-adjacent labels at 0.78rem (~12.5px) and treat anything smaller as decorative-only (eyebrows over headings)._

3. **The home and works comparison sliders are visually identical.** `index.html:150` and `works.html:166` both show "stolica pre/posle" with the same caption ("Jedna stolica, jasna razlika.") and the same image pair. Visiting works after home gives no new before/after evidence — the gallery has only static "before" and "after" thumbnails (`works.html:119, 124`) for one chair. For a "naši radovi" page, that's thin.
   _Fix: pick a different room/object pair for the works page slider (you already have `work-bedroom-before.jpeg` and `work-bedroom-after.jpeg` in `assets/`), and add 1–2 more before/after pairs to the gallery so the filter actually has content._

4. **Gallery filter controls don't all have meaningful targets.** The "Detalj" filter button (`works.html:42`) maps to `data-gallery-filter="detail"`, but the gallery cards use compound categories like `"business detail"`, `"home detail"` — only one card uses bare `"detail"` (`work-carpet-steam.jpeg` at line 114). Clicking "Detalj" therefore shows just one image. The matching logic in `setupGalleryFilters` at `script.js:537` does `categories.includes(filter)`, which is correct but only finds that one card.
   _Fix: either tag more cards with `detail` or rename the filter to something that actually has 3+ matches (e.g., "Enterijer")._

5. **Hero h1 differs between desktop and mobile.** Desktop: "MS Sjaj za domove i lokale koji moraju da zablistaju." (`index.html:33`). Mobile: "Čisto, tačno i spremno odmah." (`index.html:47`). They're both rendered in the DOM and shown/hidden via CSS. SEO and screen readers see two H1s on the same page.
   _Fix: keep one `<h1>`. Either drop the mobile-only headline, or make it visually-only (CSS) on top of the same heading element with `aria-hidden`._

6. **No `prefers-reduced-motion` styling for the `setupPremiumEntrance` blur/translate.** `script.js:195` short-circuits the JS when reduced motion is set — good. But the CSS itself (`styles.css:67–86`) defines the pre-load `opacity: 0; transform: translateY(28px) scale(0.985); filter: blur(8px)` on `.site-body:not(.is-loaded) .hero-section`. If JS fails to run (CSP, error, slow parse), reduced-motion users still see the heavy filter+transform load animation when `is-loaded` finally lands.
   _Fix: wrap those `:not(.is-loaded)` rules in `@media (prefers-reduced-motion: no-preference)` so they only apply when motion is welcome._

## Could Improve

1. **Mobile bottom action bar overlaps content.** `partials/header.html:53` renders a fixed `mobile-action-bar` with three actions. There's no `<main>` bottom padding visible in `styles.css` to compensate (worth eyeballing in a screenshot); without it, the last few lines of the CTA section can sit under the bar at small viewports.

2. **Two phone numbers in the footer** (`partials/footer.html:52–53`) without context. Add a one-word label (e.g., "Direktor / Operativa") so users know which to call.

3. **Stats card on `about.html` mixes numbers with words.** "500+", "10+", then "Upit", "Plan" (`about.html:122–141`). Visually inconsistent — the third and fourth tiles read as headings, not stats. Either make all four numeric ("500+ angažmana, 10+ godina, 24h procena, 7 dana terena") or move the non-numeric ones into a separate "kako radimo" strip.

4. **No structured data / `Organization` + `LocalBusiness` schema.** A cleaning service in Kragujevac is exactly the case where `LocalBusiness` JSON-LD with `address`, `telephone`, `areaServed`, `openingHours` measurably helps Google. Worth adding once.

5. **Partner logos are SVG.** That's fine, but verify they represent real partners — one SVG file per partner suggests they may have been generated as visual filler. If they aren't real customers, the "Prijatelji firme" block is the kind of soft trust signal that hurts more than it helps when discovered.

6. **`logo.png` is 1.4 MB.** That's a lot for a logo loaded on every page. Re-export at 2x display size as PNG-8 or SVG; it should be < 50 KB.

7. **External font + Font Awesome on every page** — both are render-blocking. `font-display: swap` is implicit via Google Fonts; consider `preload` for the woff2 of Manrope-700 (your hero weight) and self-hosting Font Awesome subset (only `phone-alt`, `facebook-f`, `instagram`, `whatsapp`, `paper-plane`, `arrows-left-right` are actually used).

## What Works Well

- **The structural improvements from March landed cleanly.** The lightbox is now correct, the partial fallback is correct, the form has real validation and live status messaging, and the placeholder rot is gone. Each of those was a "must fix" and each has a thoughtful implementation, not a hack.
- **Spacing rhythm holds up** — the previous 4/4 score on the spacing pillar still applies; section padding, card padding, and breakpoint tightening all read consistent in the CSS.
- **Reveal animations are tasteful.** `IntersectionObserver` with `0.16` threshold and `-10%` rootMargin (`script.js:343`), combined with `cubic-bezier(0.16, 1, 0.3, 1)` (`--ease-premium`), gives a non-cheesy entrance. Reduced-motion is respected.
- **The before/after comparison interaction is the strongest visual asset on the site.** It's well-positioned (homepage hero-adjacent), accessible (range input with `aria-label`), and the implementation is minimal — `--comparison-position` CSS var driven, no library.
- **Header/social-rail/mobile bar trio is genuinely mobile-aware** — a desktop social rail on the side, a mobile fixed action bar at the bottom, and a hamburger nav that closes on outside-click and `Escape`. That's three distinct affordances per device class, all coherent.

## Summary scorecard (against the 6 pillars used in the prior audit)

| Pillar | Mar 2026 | Apr 2026 | Movement | Note |
|---|---|---|---|---|
| Copywriting | 2/4 | 3/4 | ↑ | Trust-killing "content will be added later" copy is gone; remaining specificity gaps are minor. |
| Visuals | 3/4 | 4/4 | ↑ | Real photography across all pages; no placeholder hits in HTML. |
| Color | 3/4 | 3/4 | → | Tokens still loose; rgba duplication remains the dominant smell. |
| Typography | 3/4 | 3/4 | → | Font system improved (warmer pairing); micro-label sizes still drift. |
| Spacing | 4/4 | 4/4 | → | Holds. |
| Experience Design | 2/4 | 3/4 | ↑ | Inquiry form + accessible lightbox + partial fallback all landed. Form-on-every-page and real submission backend are the next steps. |

**Overall: 17/24 → 20/24**
