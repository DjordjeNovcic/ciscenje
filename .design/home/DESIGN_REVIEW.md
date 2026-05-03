# Design Review: Home page (`index.html`)

Reviewed against: `DESIGN.md` (root) + `PRODUCT.md` (root)
Philosophy: **The Quiet Operator** — editorial, calm, photography-led, single brass accent
Date: 2026-05-03
Build under review: commit `47c719f` (cache-bust `big22`)

## Screenshots Captured

| Screenshot | Breakpoint | Description |
| --- | --- | --- |
| `screenshots/review-home-desktop-1280.png` | Desktop (1280×800) | Full-page home, lazy images forced loaded |
| `screenshots/review-home-tablet-768.png` | Tablet (768×1024) | Full-page home stacking |
| `screenshots/review-home-mobile-375.png` | Mobile (375×812) | Full-page home with mobile hero card |

> All screenshots live in `.design/home/screenshots/`.

## Summary

The home reads convincingly as **The Quiet Operator** — Cormorant + Manrope are doing the work, the cream-walnut palette is held, and the recent passes (framed testimonial, lift-card warmth, CTA right-side glow, reduced section padding, taupe Dokaz arrow) genuinely raised the floor. The single biggest brief-violation that survives is the **`500+` track-record block**, which is exactly the hero-metric template the brief and `PRODUCT.md` both explicitly forbid. After that, the issues are smaller: a few "cards levitate" hover lifts that exceed the brief's restraint, a brass accent count that is creeping past the ≤10% budget, and a Pristup ornament that is now so subtle it reads as missing.

## Must Fix

1. **Track-record block IS the banned hero-metric template.**
   `index.html` lines ~319–328, paired with the `.track-record::after { content: "500+" }` rule in `styles.css`. Brief states explicitly: *"Don't ship the hero-metric template — big number, small label, supporting stats with gradient accents. Banned in shared design laws and especially wrong for this brand."* Currently the home ships exactly this: a 4–8.4rem brass `500+` glyph anchored next to a paragraph of supporting copy, on its own section with no other purpose. See `screenshots/review-home-desktop-1280.png` (between FAQ and CTA) and `review-home-mobile-375.png` (mid-stack).
   *Fix:* either delete `.section-track-record` from the home (the same `500+ / 10+ / 24h` numbers already appear on `about.html` inside the spotlight, so removal is non-destructive), or rewrite it as a photography-led closing band — a single full-bleed interior photo with one Cormorant headline pulled from the page voice. Do not retain the giant numeral.

2. **Hero secondary copy may be failing WCAG AA against the dark photo.**
   The two lines under the H1 (`hero-lead` / `hero-note`) sit on a fully dimmed interior photo with no scrim panel. On `review-home-desktop-1280.png` and `review-home-tablet-768.png` they read as faint mid-grey-on-dark. Hero copy is the brand opener — it needs to clear AA at 4.5:1 (or 3:1 for the H1's larger size).
   *Fix:* either thicken the existing `.hero-backdrop` overlay gradient on the lower band, raise `hero-lead` color one notch toward `Bright Linen`, or anchor the copy stack on a soft Walnut wash. Verify with a contrast checker on the rendered photo behind, not on a pure-color swatch.

## Should Fix

1. **Service cards levitate too aggressively on hover.**
   `styles.css` polish block: `.service-card:hover { transform: translateY(-10px); box-shadow: 0 32px 72px rgba(93,63,28,0.2), inset 0 0 0 1px rgba(217,154,43,0.3); }`. Brief: *"The system is soft-layered, never floating. Cards do not levitate."* And: *"the photograph moves, the card frame does not."* The current state moves the whole card 10px up with a 72px shadow spread — that's a SaaS-tier lift, not a Quiet Operator lift. The image scale-on-hover (1.035) is correct; the card-translate is the offender.
   *Fix:* drop `transform: translateY(...)` from `.service-card:hover` entirely, or cap at `-3px`. Keep the deeper shadow + inner ring; let the image scale carry the affordance.

2. **Featured service card body has dead vertical space.**
   See `review-home-desktop-1280.png` services section. The left featured card's body block is short (one h3 + ~2 lines) while the right column stack is taller; the featured card has 100–150px of empty cream below its body. The two columns no longer balance vertically.
   *Fix:* either align grid items with `align-items: stretch` and let the featured card body use `align-self: start; padding-block-end: auto;`, OR push the featured photo to fill more of the height (`aspect-ratio: 4 / 3.6` or taller), OR add one more line of supporting copy in the featured card body so it carries its column. Cleanest: let the photo own more of the column — the brief is photography-led.

3. **Pristup (`.section-why`) ornament is perceptually invisible at desktop.**
   The window illustration is in the DOM at `(1001, 2070, 243×243)` but at `opacity: 0.78` on a Warm-Linen background with very thin lines, it is barely readable in `review-home-desktop-1280.png`. After the cleanup pass we shrank it on purpose — but we shrank it past the threshold of legibility.
   *Fix:* either bump opacity to `0.95` and width to `clamp(220px, 24vw, 320px)`, or remove the figure entirely. A truly invisible ornament is worse than no ornament. The brief says decorations should feel *intentional* — invisible reads as accidental.

4. **Approach is a 3-up text grid, the one anti-pattern PRODUCT.md flags.**
   `PRODUCT.md`: *"Don't ship Bootstrap-card SaaS landings: identical 3- or 4-up icon+heading+text grids… The eye reads them as filler."* Current Pristup is exactly three identical-weight lift-cards (`Bez pogađanja / Mir u prostoru / Kontrola završnice`) at equal width. Without icons it's slightly less template-y than the named anti-pattern, but the rhythm is the same.
   *Fix:* break the symmetry — one wider card with a longer body, two narrower companions (e.g. `1.4fr 1fr 1fr`), or stagger the gold top-accent rule so only the first card carries it. Even small asymmetry rescues this from "filler grid."

5. **Brass-accent budget is at or over the 10% ceiling.**
   On the desktop full page I count: hero `Zatražite ponudu` button, header `ZATRAŽITE PONUDU` button, FAQ `+` chevrons (×3), `500+` glyph, CTA panel `Pozovite nas` button + radial glow, footer column eyebrows at brand-amber 0.95, all eyebrow rules and ordinal `02 / 03 / 05`. Brief: *"Old Brass is used on ≤10% of any given screen. If a screen feels brass-heavy, remove a use, do not add another."* Removing the `500+` block (Must Fix #1) takes a big bite out of this; after that, consider toning the footer column eyebrows back to 0.78 amber from 0.95.

6. **Two CTAs in the hero zone (header + below H1) read as duplication.**
   On desktop `review-home-desktop-1280.png` both `ZATRAŽITE PONUDU` (header, top-right) and `Zatražite ponudu` (under hero copy) are visible at once. Same label, same brass, ~150px apart. Header CTA is a global pattern, hero CTA is the page CTA — but an arriving visitor sees two identical actions side-by-side.
   *Fix:* differentiate the labels (header → `Kontakt`, hero → `Zatražite ponudu`), or hide the header CTA when the hero CTA is in viewport. Header CTA is already there for the rest of the page; it doesn't have to compete with the hero.

## Could Improve

1. **Section eyebrow hairline rule is inconsistent.** Brief defines the 2.8rem brass-tapered hairline as the system's "connective tissue." Some eyebrows on home (e.g. `STRANICE` in footer, `RADNO VREME`) carry the rule; others may not — verify across all `.eyebrow` instances on the page and ensure one global definition.

2. **Section ordinals (`02`, `03`, `05`, etc.) are very faint.** They're decorative-only by design, which is correct — but on screens where they are obscured by content (Pristup overlap risk we already saw earlier), it may be worth adding a min-distance rule between the ordinal and the heading column to prevent ever clipping into letterforms.

3. **Comparison slider initial state reads as low-contrast.** Both chair before/after photos are dark fabric on dark wood; at 54% slider position the visible edges are dark-on-dark. Brief calls the slider "the strongest visual asset on the site" — this specific photo pair undersells that claim. Consider swapping in the bedroom or chair-and-light pair from the works gallery (where the value delta is more visible without interaction).

4. **Mobile section rhythm is fine, but the hero stack has two CTAs visible above the fold** (mobile card + sticky mobile-action-bar). Confirm the mobile-action-bar isn't competing with the hero CTA on first paint.

5. **Dokaz taupe arrow is well placed but slightly too quiet on cream.** Stroke 2px / opacity 0.7 / `#8a735c` is correct per brief, but on full Warm-Linen background the curve barely registers at desktop scroll. If it's intended to "guide the eye toward the slider" it has to be readable at first glance. One step up: stroke 2.25, opacity 0.75 (no color change), see if it crosses the legibility line without crossing the "loud" line.

6. **Track-record paragraph uses `--color-ink-soft` (`#5f4c3a`) at body weight on the cream page**, which is fine — but the paragraph is set quite wide. If you keep this band in any form (replace per Must Fix #1), cap the line length at 65–75ch as the brief specifies.

## What Works Well

- **Editorial pairing is intact and earned.** Cormorant Garamond on the hero, services h2, why h2, dokaz h2 reads as one voice — the magazine cadence the brief asks for. Manrope handles the operational layer cleanly.
- **The framed testimonial is the strongest section.** The cream-gradient card with the gold left-accent rail, the oversized `"`, the divider above the author block — that's the editorial pull-quote treatment the brief calls for, and it lands. It is now the moment on the page that most clearly signals "premium operator."
- **FAQ accordion is in good shape.** Card surface at 92% Bright-Linen, visible resting shadow, gradient on the open item, the `+` chevron transition — all consistent with the restraint principle. Spacing between items (1.1rem) feels right.
- **CTA panel right-side glow.** The new top-right radial + secondary blurred orb makes the panel feel intentional instead of half-occupied. Buttons are aligned cleanly under the copy column.
- **Footer hierarchy is solid.** Brass column eyebrows, larger nav links, readable phone numbers, hairline top divider, social pills lifting on hover. Reads as one finished band rather than parked links.
- **Photography is doing the selling.** Real interior shots throughout services, before/after, lounge — the brief's "show the work, don't list it" principle is honored.
- **Two-family color discipline is held.** No third family, no `#fff`/`#000`, no green checkmarks. The Linen + Walnut + Brass system is consistent across hero, body, dark CTA panel, and dark footer.
- **No green-checkmark / "100% guaranteed" copy.** The voice — `procena u 24 sata`, `predaja bez dorade`, `diskretan tim` — matches `PRODUCT.md`'s operational-facts line. This part of the brief is being honored well.

---

## Quick Action List

If you want the fastest path to closing the gaps:

1. Delete `.section-track-record` from `index.html` (or rewrite as photo-led band).
2. Drop `transform: translateY(-10px)` from `.service-card:hover`; keep shadow + inner ring; let the image scale carry it.
3. Fix hero secondary copy contrast against the photo — either deepen the lower overlay or lighten the lead.
4. Decide on the Pristup ornament: bump opacity to 0.95 + width to `clamp(220px, 24vw, 320px)`, OR remove it entirely.
5. Differentiate the two hero CTAs (header label → `Kontakt`).
6. Stretch the featured service card to fill its column (taller media or longer body).

Do those six and the page reads cleanly against the brief.
