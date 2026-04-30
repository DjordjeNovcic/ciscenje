# Design Review: MS Sjaj

Reviewed against: `PRODUCT.md` + `DESIGN.md` (acting as the brief)
Philosophy: **The Quiet Operator** — premium handover-cleaning operator, calm editorial, Linen + Brass palette
Date: 2026-05-01

## Screenshots Captured

| Screenshot | Breakpoint | Description |
|---|---|---|
| `screenshots/review-home-desktop-1280.png` | Desktop (1280×800) | Home full page after bolder pass |
| `screenshots/review-home-tablet-768.png` | Tablet (768×1024) | Home tablet collapse |
| `screenshots/review-home-mobile-375.png` | Mobile (375×812) | Home mobile stack |
| `screenshots/review-services-desktop-1280.png` | Desktop | Services page full |
| `screenshots/review-services-tablet-768.png` | Tablet | Services tablet |
| `screenshots/review-services-mobile-375.png` | Mobile | Services mobile |
| `screenshots/review-about-desktop-1280.png` | Desktop | About full |
| `screenshots/review-about-tablet-768.png` | Tablet | About tablet |
| `screenshots/review-about-mobile-375.png` | Mobile | About mobile |
| `screenshots/review-works-desktop-1280.png` | Desktop | Works full |
| `screenshots/review-works-tablet-768.png` | Tablet | Works tablet |
| `screenshots/review-works-mobile-375.png` | Mobile | Works mobile |

> All screenshots are in `.design/ms-sjaj/screenshots/`.

## Summary

The home page now reads like a real premium operator — bolder hero, asymmetric services-editorial layout, editorial pull-quote, track-record line. **But the bolder pass only touched the home page.** Services, about, and works still carry the old patterns the home page outgrew. The most visible regressions and gaps now show up *between* pages (consistency drift), not within them. There's also one P0 mobile a11y bug that survived the polish rounds.

## Must Fix

1. **Mobile home page has no `<h1>`.** `index.html:33` is the desktop `<h1>`, hidden on mobile via `display:none`. The mobile card uses a `<p class="hero-mobile-heading">` (`index.html:46`). Screen readers and SEO crawlers on mobile see no top-level page heading. See `screenshots/review-home-mobile-375.png`.
   *Fix*: Move the `<h1>` element into `.hero-mobile-card` for the mobile layout, OR render one canonical `<h1>` with two visual variants via CSS classes — not two separate DOM elements.

2. **Services page is still the page the home page used to be.** `services.html:77-119` has the 4-up Bootstrap-card pattern (numbered 01-04, identical icon+heading+text cells) — exactly what the home services-grid was distilled away from. See `screenshots/review-services-desktop-1280.png`. Also the services-hero on `services.html:31-62` shows a small left card + image + 4 quick-jump cards beneath, which is its own four-up grid above the fold. The page reads as "old MS Sjaj," and the home page reads as "new MS Sjaj." That inconsistency is loud.
   *Fix*: Apply the editorial 1-large + 3-stacked treatment to the services-hero quick-jumps OR the "Šta konkretno ulazi" section. Pick one — both don't need it.

3. **Featured service card headline truncates on desktop.** On `screenshots/review-home-desktop-1280.png` the featured card shows "Redovno i de... čišćenje doma" — the headline is wrapping or being clipped mid-word. The Cormorant size + tight letter-spacing pushes the line over the available width.
   *Fix*: Either reduce featured h3 max-size to `clamp(1.75rem, 2.5vw, 2.3rem)`, give the body a wider `max-width`, or shorten the headline copy ("Detaljno čišćenje doma" — three words instead of four).

## Should Fix

1. **About-page hero leaves a tall empty band on desktop.** `screenshots/review-about-desktop-1280.png` shows ~28% empty beige below the right-column photo, before the next section starts. The two-column hero shell has uneven content heights. Either pull the next section up, fill the negative space deliberately (a panel, a quote, a small inline stat), or make the photo column taller so the imbalance disappears.

2. **Tablet 768 collapse on services hero is awkward.** `screenshots/review-services-tablet-768.png` shows the hero-quick-jump-cards collapsing into 2-column grid where the 4 cards become 2+2. The card heights mismatch and the hero copy + image + cards stack feels cramped.
   *Fix*: At 768, switch the 4 quick-jump cards to 4-column (single row) compact pills, or hide them at this breakpoint and rely on the section navigation. The 2+2 collapse is the worst of both worlds.

3. **Sub-13px micro-labels still in dark zones.** `screenshots/review-services-desktop-1280.png` services-hero-card `<small>` text at 0.62 opacity cream on muted dark gold — likely fails WCAG AA at small text sizes. DESIGN.md's 12.5px floor + the labels' role (operational micro-info) means these need a contrast bump.
   *Fix*: Bump opacity from 0.62 to ≥0.85, or swap to a solid token.

4. **Track-record line is borderline-template.** `index.html:239-246` is "Više od 500 završenih angažmana..." — one editorial sentence is good, but pinning it on a specific number framed as "Više od 500" still reads metric-y. See `screenshots/review-home-desktop-1280.png`.
   *Fix*: Tie the number to a story or remove the count: "Iza nas su domovi i lokali u Kragujevcu i okolini — od stanova spremnih za predaju do poslovnih prostora..." Or specifically named context: "Poslednji predan stan u Aerodromskoj — pre dva dana."

5. **Image perf is the elephant in the room.** `logo.png` is 1.4MB at 54×54 display size. Hero JPG is 4689×3126 (2.4MB) for max 1200px display, served identically to mobile. Zero `loading="lazy"` across ~30 images on the four pages. None of this is visible in screenshots but it's how the site *feels* on a real network. Cited in detail in the parallel `$impeccable audit` report.

## Could Improve

1. **Home featured card image gets cropped on tablet.** `screenshots/review-home-tablet-768.png` shows the featured card image stacked above body, but the aspect ratio + crop loses the room composition. A different crop or smaller aspect ratio at this breakpoint would help.

2. **Mobile services page hero is heavy.** `screenshots/review-services-mobile-375.png` shows hero copy + image + 4 quick-jumps + 4 detail-cards stacked above the fold. By the time a mobile user finds the inquiry form, they've scrolled through 8 cards. Distill the hero or move the quick-jumps to the gallery section.

3. **Body text size feels small relative to the bigger headlines.** After pushing display type up ~30%, body text at `clamp(1.04rem, 1.5vw, 1.14rem)` reads small in proportion. Bump to `clamp(1.08rem, 1.6vw, 1.2rem)` so the type ramp stays balanced.

4. **About hero stat strip is tight.** `screenshots/review-about-desktop-1280.png` strip shows "500+ / 10+ / 24h" at full clamp size but the captions ("ZAVRŠENIH ANGAŽMANA / GODINA ISKUSTVA / DO PRVE PROCENE") don't have enough breathing space below the digits.
   *Fix*: Increase the gap between digit and caption from `0.55rem` to `0.85rem`.

5. **Compact service cards on home: image-left/copy-right works but compact card images all crop the room oddly.** Each image is full-bleed full-height and gets a tight horizontal slice. A wider compact aspect ratio (`1 / 1` instead of stretched) would give better photo composition.

## What Works Well

- **Hero on home is genuinely bolder.** The Cormorant headline at clamp(3.4rem, 6.4vw, 6.8rem) carries the page now, and the single brass CTA decides for the user. See `screenshots/review-home-desktop-1280.png`. This is the strongest page on the site.
- **Editorial 1-large + 3-stacked services layout reads premium.** It's the asymmetric pattern that breaks the Bootstrap-card cliché. The featured card has a generous image and headline; the compacts have a horizontal image-left/copy-right rhythm. This is the signature pattern the rest of the site should adopt.
- **About-page hairline-divided stats strip is on-spec.** Solid Smoke Walnut Cormorant digits with hairlines between, no card chrome, no gradients. See `screenshots/review-about-desktop-1280.png`. This is exactly what DESIGN.md described.
- **The pull-quote and track-record sections break the page rhythm.** Mid-page on home went from three-tile-three-tile-three-tile to services-grid → why-grid → before/after → pull-quote → FAQ → track-record → CTA. Three different visual patterns, not one repeated.
- **Photography is doing its job.** Real interior photos throughout. The works gallery composition with mixed aspect ratios (`screenshots/review-works-desktop-1280.png`) is the strongest gallery on the site.
- **Color discipline is holding.** Old Brass appears on ≤10% of any screen, Linen + Walnut do the heavy lifting. The only slip is in dark-section small-text contrast.
