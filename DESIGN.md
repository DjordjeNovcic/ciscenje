---
name: MS Sjaj
description: Premium handover-cleaning operator in Kragujevac — calm, editorial, and quietly precise.
colors:
  primary: "#d99a2b"
  primary-lit: "#ffb73a"
  secondary: "#6fa99a"
  warm-linen: "#f4ede2"
  soft-linen: "#fbf7f1"
  bright-linen: "#fffdf8"
  aged-cream: "#ead7b6"
  toasted-sand: "#e6d7c2"
  smoke-walnut: "#221d18"
  smoke-walnut-soft: "#5f4c3a"
  smoke-walnut-muted: "#8a735c"
  charred-oak: "#2a2724"
  lampblack-brown: "#1c1917"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(2.5rem, 4.3vw, 4.9rem)"
    fontWeight: 600
    lineHeight: 0.92
    letterSpacing: "-0.034em"
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(1.8rem, 2.5vw, 2.45rem)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "1.65rem"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "clamp(1rem, 1.45vw, 1.06rem)"
    fontWeight: 400
    lineHeight: 1.72
    letterSpacing: "normal"
  label:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.22em"
rounded:
  sm: "12px"
  md: "20px"
  lg: "32px"
spacing:
  section: "clamp(4.6rem, 7vw, 7.2rem)"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.bright-linen}"
    rounded: "{rounded.sm}"
    padding: "0 1.5rem"
    height: "56px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.primary-lit}"
    textColor: "{colors.bright-linen}"
  button-secondary:
    backgroundColor: "{colors.soft-linen}"
    textColor: "{colors.smoke-walnut}"
    rounded: "{rounded.sm}"
    padding: "0 1.5rem"
    height: "56px"
  button-secondary-hover:
    backgroundColor: "{colors.bright-linen}"
    textColor: "{colors.smoke-walnut}"
  service-card:
    backgroundColor: "{colors.soft-linen}"
    textColor: "{colors.smoke-walnut}"
    rounded: "{rounded.lg}"
    padding: "1.5rem"
  cta-panel:
    backgroundColor: "{colors.charred-oak}"
    textColor: "{colors.bright-linen}"
    rounded: "{rounded.lg}"
    padding: "clamp(2.5rem, 4vw, 4rem)"
  eyebrow:
    textColor: "{colors.primary}"
    typography: "{typography.label}"
---

# Design System: MS Sjaj

## 1. Overview

**Creative North Star: "The Quiet Operator"**

MS Sjaj is the cleaning service that does not perform. Pages do not announce themselves. CTAs do not shout. Hero typography is set in Cormorant Garamond — a magazine-grade serif that carries the weight while everything around it stays quiet. The page background is Warm Linen, not white; the ink is Smoke Walnut, not black. Every surface is tinted toward the brass accent so the system feels like one warm room rather than a stack of unrelated tiles.

The operative metaphor is delivery, not décor. Buyers are real-estate agents preparing units for showings, project managers handing over post-construction sites, and homeowners who want it done and signed off. The interface is built to convince them that the operator running this site will arrive on time, work without disturbance, and leave the space ready for inspection. That is what every word, every hairline, every photograph is in service of.

This system explicitly rejects: stock-photo cleaning sites with green checkmark badges, "100% satisfaction" tag clouds, "brzo i jeftino" discount energy, oversaturated CTAs, urgency banners, Bootstrap-card SaaS landings with identical 4-up icon-and-text grids, and the hero-metric template (big number + label + supporting stats with gradient accents).

**Key Characteristics:**
- Editorial pairing — Cormorant Garamond display set against Manrope body, carrying a magazine cadence into a service-business surface.
- Warm Linen room, not a white page. Backgrounds are tinted; "white" is reserved for very few raised surfaces.
- Old Brass is the single accent. It earns ≤10% of any screen.
- Hairline gradient dividers and gentle ambient lift do most of the depth work; cards do not float.
- Photography-led proof. Real before/after evidence does the selling, not bullet lists.

## 2. Colors: The Linen and Brass Palette

A two-family palette: warm linen neutrals carrying the room, deep walnut ink anchoring the type, and a single brass accent doing every job an accent can do. A muted eucalyptus appears only in supporting hairlines — never as a second voice.

### Primary
- **Old Brass** (`#d99a2b` / `oklch(72% 0.16 70)`): The single accent that carries every CTA, every eyebrow, every hairline divider, and the gold focus ring. Earns the page through restraint, not saturation.
- **Lit Brass** (`#ffb73a` / `oklch(82% 0.16 75)`): The bright step of brass, used only as the inner gradient stop on primary CTAs and as the call-button highlight on the mobile action bar. Never a flat fill.

### Secondary
- **Soft Eucalyptus** (`#6fa99a` / `oklch(67% 0.06 175)`): Quiet cool counterweight. Appears in secondary-button border tints (very low alpha) and as the supporting hue on the page-background radial wash. Never used as an accent in copy or CTAs.

### Neutral — Linen Family
- **Warm Linen** (`#f4ede2`): The base page background. The room you walk into.
- **Soft Linen** (`#fbf7f1`): Elevated surfaces where copy needs more breathing room.
- **Bright Linen** (`#fffdf8`): The rare high-contrast surface — used in raised cards and primary-button text. Never the page background.
- **Aged Cream** (`#ead7b6`): Secondary surface for split layouts and panel variations. Edge-of-section bands.
- **Toasted Sand** (`#e6d7c2`): Used for hairline transitions and tinted edges between sections.

### Neutral — Ink Family (text on light)
- **Smoke Walnut** (`#221d18`): Primary ink. Used on Cormorant headings only.
- **Smoke Walnut Soft** (`#5f4c3a`): Body copy ink — the default Manrope color.
- **Smoke Walnut Muted** (`#8a735c`): Meta, supporting micro-labels, captions.

### Neutral — Panel Family (dark surfaces)
- **Charred Oak** (`#2a2724`): Primary dark panel — CTA bands, footer surfaces.
- **Lampblack Brown** (`#1c1917`): Deepest band — footer top bar, used sparingly to punctuate the page bottom.

### Named Rules

**The One-Voice Rule.** Old Brass is used on ≤10% of any given screen. It is never a fill, never gradient text, never a side-stripe accent. If a screen feels brass-heavy, remove a use, do not add another.

**The Two-Family Rule.** Every screen lives within Linen + Walnut by default. Eucalyptus appears only in hairlines and tints. There is never a third family.

**The No-White-Page Rule.** Warm Linen is the page; Bright Linen is the rare raised surface. `#ffffff` is forbidden as a background. So is `#000000` as ink.

## 3. Typography

**Display Font:** Cormorant Garamond (with Georgia, serif fallback)
**Body Font:** Manrope (with system-ui, sans-serif fallback)

**Character:** A magazine-grade serif against a humanist geometric sans. The serif carries the editorial weight — it is the brand voice; the sans does the operational work. The pairing is intentional: hospitality-adjacent type system imported into a service business that earns "premium" by typography, not by adjectives.

### Hierarchy

- **Display** (Cormorant Garamond, 600, `clamp(2.5rem, 4.3vw, 4.9rem)`, line-height 0.92, letter-spacing -0.034em): Hero h1 and major section h2. Tight leading, slightly compressed letter-spacing, full italic restraint — never italicize for emphasis.
- **Headline** (Cormorant Garamond, 600, `clamp(1.8rem, 2.5vw, 2.45rem)`, line-height 0.98, letter-spacing -0.025em): Page hero h1, mid-level section heads, large-card titles.
- **Title** (Cormorant Garamond, 600, 1.65rem, line-height 1.02, letter-spacing -0.02em): Service card titles, process-step headings.
- **Body** (Manrope, 400–500, `clamp(1rem, 1.45vw, 1.06rem)`, line-height 1.72): Paragraph copy. Color is Smoke Walnut Soft, not black. Max line length 65–75ch.
- **Label** (Manrope, 700, 0.7rem, letter-spacing 0.22em, uppercase): Eyebrows, panel titles, footer kickers. Always paired with a 2.8rem hairline gradient that tapers from brass to transparent.

### Named Rules

**The Two-Voices-Only Rule.** Cormorant for headings, Manrope for everything else. No third typeface, no script, no variable-font display experiments. Font Awesome icons do not count — they are utility, not voice.

**The Eyebrow Hairline Rule.** Every label is preceded by a 2.8rem-wide gradient hairline that taper-fades from `rgba(217, 154, 43, 0.82)` to `rgba(217, 154, 43, 0.18)`. The hairline is the visual rhyme that holds the system together — never drop it from a labelled section.

**The 12.5px Floor.** Body-adjacent labels never go below 0.78rem (~12.5px). Anything smaller is decorative-only — eyebrows above headings, footer micro-labels — and is never used to carry information a user must read to act.

## 4. Elevation

The system is **soft-layered, never floating.** Depth is conveyed primarily through hairline gradient dividers (1px tapered amber strips on every section seam) and gentle ambient brown-tinted shadows on raised surfaces. Cards do not levitate. Drop shadows are warm, low-spread, and amber-tinted to match the room — never the cool gray drop-shadow of a SaaS dashboard.

### Shadow Vocabulary

- **Soft Ambient** (`box-shadow: 0 18px 48px rgba(93, 63, 28, 0.12)`): Default lift for raised surfaces — service cards at rest, mobile nav social buttons, feature cards.
- **Strong Ambient** (`box-shadow: 0 28px 80px rgba(34, 29, 24, 0.17)`): The deeper variant — used on hover for the same surfaces and on the most prominent panels (CTA panels, hero-card overlays).
- **Brass Lift** (`box-shadow: 0 16px 34px rgba(217, 154, 43, 0.28)`): Reserved for the primary CTA only. Brass-tinted glow that signals the single committable action on the screen.

### Named Rules

**The Hairline-First Rule.** Section seams are marked with a 1px tapered gradient strip (`linear-gradient(90deg, transparent, rgba(217, 154, 43, 0.14), transparent)`), not with hard borders or contrasting backgrounds. Hairlines do depth before shadows do.

**The Warm-Shadow Rule.** Every shadow is brown- or brass-tinted. `rgba(0, 0, 0, X)` shadows are forbidden — they read as cool and clinical, the wrong room.

## 5. Components

### Buttons

- **Shape:** Gently rounded (12px / `--radius-sm`), 56px tall, padded 1.5rem inline.
- **Primary:** A 135° gradient from Old Brass through Lit Brass to a final pale brass stop (`#ffd27c`). Text is Bright Linen. Brass Lift shadow. On hover: a controlled diagonal sheen sweeps left-to-right across the surface (the `::before` pseudo-element, `transform: translateX(...) skewX(-22deg)`), the button rises 2px, the shadow deepens. The sheen is the signature interaction — never disable it, never replace it with a color flash.
- **Secondary:** Soft Linen surface at 80% opacity, 1px Eucalyptus border at 24% opacity, Smoke Walnut text. Inset highlight (`inset 0 1px 0 rgba(255, 255, 255, 0.55)`) gives a subtle paper-edge feel. Hover lifts to 96% opacity Bright Linen, border to 40% opacity Eucalyptus.
- **Focus:** A 2px brass outline at 55% opacity offset 3px from the button. This is the global focus ring — it is also used on nav, social rail, gallery cards, FAQ summaries, and footer links. One ring across the entire site.
- **Header CTA variant:** Tighter padding (0.95rem 1.35rem), same 12px radius, primary brass gradient, 28px-spread brass shadow at 24% alpha. Lifts 2px on hover; no underline.

### Service Cards

- **Corner Style:** 32px radius (`--radius-lg`). Generous, magazine-cover.
- **Background:** Soft Linen on Warm Linen page. Always lighter than the page; never inverted.
- **Shadow Strategy:** Soft Ambient at rest. On hover, the media wrapper image scales 1.05 with a 600ms premium ease curve, while the card itself remains anchored — the photograph moves, the card frame does not.
- **Border:** None. The radius and shadow do the work.
- **Internal Padding:** 1.5rem on the body block, with a tagged eyebrow (`.card-tag`) sitting above the title in the eyebrow type style.

### CTA Panels

- **Corner Style:** 32px radius. The shape rhymes with the service card so the page reads as one system.
- **Background:** Charred Oak. The single dark surface in the body of the page — its job is to mark "this is where you act."
- **Internal Padding:** Generous, `clamp(2.5rem, 4vw, 4rem)` — the panel breathes around the form.
- **Inner form:** A bordered panel-on-panel composition, with Bright Linen field surfaces on the dark background. The form's `aria-live="polite"` status line carries success/error copy without claiming what hasn't happened.

### Inputs / Fields (inquiry form)

- **Style:** Bright Linen surface, 1px brass border at low alpha, 12px radius.
- **Focus:** The same global brass outline (2px / 55% / 3px offset). No glow expansion, no border thickening — restraint, again.
- **Error:** Status announced through the form's `aria-live` line, never via a red color flash that reads as "alarm."

### Navigation

- **Style:** A fixed transparent header that solidifies (Bright Linen wash + soft shadow) once `body.is-scrolled` triggers.
- **Typography:** Manrope 700 at 0.95rem, letter-spacing -0.01em. Smoke Walnut Soft at rest, Smoke Walnut on hover.
- **Hover treatment:** A 1px underline strokes left-to-right (transform-origin: left, scaleX 0 → 1, 220ms premium ease). No color change beyond the ink shift.
- **Mobile:** Hamburger toggle on the right; full-screen drawer with social buttons and a phone link. Outside-click and Escape both close.

### Mobile Action Bar

- **Style:** A 3-action fixed bar pinned to the bottom of mobile viewports — phone, message, inquiry. Each target is ≥48px tall to clear WCAG touch-target guidance.
- **Active state:** The phone-call button uses the primary brass gradient; the others are Bright Linen with brass-tinted borders. Same focus ring as the rest of the site.

### Eyebrows (signature label)

- **Style:** Manrope 700, 0.7rem, 0.22em letter-spacing, uppercase, color Old Brass. Preceded by a 2.8rem brass-tapered hairline. Always followed by a 1.22rem gap before the heading it labels.
- **Use:** Every section head opens with one. They are the voice of the table of contents — short, calm, declarative.

### Before/After Comparison Slider (signature)

- **Style:** A horizontal range input with a custom thumb and a `--comparison-position` CSS variable driving a clip-path on the "after" image.
- **Why distinctive:** It is the strongest visual asset on the site — it shows handover-grade outcome in one drag. Reuse the pattern on every page that has paired before/after assets, and pick a different room/object pair per page.

## 6. Do's and Don'ts

### Do:

- **Do** lead with photography — every page should carry at least one full-bleed or generously framed real interior. The room is the proof.
- **Do** preserve the eyebrow hairline above every label. The 2.8rem brass taper is the system's connective tissue.
- **Do** use Old Brass on ≤10% of any screen. Count it before you ship.
- **Do** keep Cormorant Garamond as the only serif and Manrope as the only sans. Two voices, no exceptions.
- **Do** use the global brass focus ring (2px / 55% / 3px offset) on every focusable element. One ring, everywhere.
- **Do** put new CSS in mobile-first scopes. Add desktop overrides via `min-width` queries, not the other way around.
- **Do** ship reduced-motion fallbacks for any new entrance animation — the existing system already guards `setupPremiumEntrance`; new motion must too.
- **Do** name colors descriptively in code comments and CSS variables (Old Brass / Warm Linen). The names carry the brand.

### Don't:

- **Don't** use stock-photo cleaning imagery, green checkmark badges, "100% satisfaction" tags, or "brzo i jeftino" discount language. Those are the anti-references named in PRODUCT.md and they are forbidden here.
- **Don't** ship Bootstrap-card SaaS landings: identical 3- or 4-up icon+heading+text grids repeated down the page. The eye reads them as filler.
- **Don't** ship the hero-metric template — big number, small label, supporting stats with gradient accents. Banned in shared design laws and especially wrong for this brand.
- **Don't** use side-stripe borders (`border-left` greater than 1px as a colored stripe) on cards, callouts, or list items. Rewrite the element with a full hairline divider, a numbered marker, or a tagged eyebrow instead.
- **Don't** apply gradient text via `background-clip: text`. Solid Smoke Walnut for headings, full stop. Emphasis comes from weight and scale, not gradient.
- **Don't** add decorative glassmorphism. The header gets a Bright Linen wash on scroll — that is the only blurred surface on the site. New blurs must be argued for case by case.
- **Don't** use `#ffffff` as a background or `#000000` as ink. Warm Linen and Smoke Walnut. Always.
- **Don't** use cool gray (`rgba(0, 0, 0, X)`) drop shadows. Every shadow is brown- or brass-tinted to stay in the room.
- **Don't** claim form success before the email actually leaves. The status line speaks in operational facts ("Otvaramo email — pošaljite poruku da završite upit"), never in premature confirmations.
- **Don't** introduce a third color family (greens, blues outside Eucalyptus, purples) or a third typeface. The two-family rule holds.
- **Don't** convert the comparison slider to a library or framework component. The CSS-variable + clip-path implementation is part of the brand's restraint.
- **Don't** use exclamation marks, "najbolji," "100% guaranteed," or any superlative. Concrete operational facts only.
