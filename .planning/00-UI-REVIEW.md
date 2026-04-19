# Phase 00 — UI Review

**Audited:** 2026-03-21
**Baseline:** Abstract 6-pillar standards (no UI-SPEC)
**Screenshots:** not captured (orchestrator constraint; code-only audit)

---

## Pillar Scores

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Copywriting | 2/4 | Headlines and CTAs are strong, but trust-critical sections still ship placeholder-oriented copy and proof gaps. |
| 2. Visuals | 3/4 | Layout hierarchy and section composition are polished, but real-world credibility is weakened by placeholder imagery. |
| 3. Color | 3/4 | The palette is cohesive and brand-consistent, but token discipline is loose with many hardcoded color references. |
| 4. Typography | 3/4 | The font pairing and responsive scale are solid, though small label sizes and many one-off values reduce rigor. |
| 5. Spacing | 4/4 | Spacing rhythm is consistent across sections, cards, and breakpoints. |
| 6. Experience Design | 2/4 | Navigation, motion, and responsive behavior are thoughtful, but lead capture, loading fallbacks, and modal accessibility are underdeveloped. |

**Overall: 17/24**

---

## Top 3 Priority Fixes

1. **Replace placeholders with real proof assets** — Placeholder service imagery, team portraits, and gallery examples reduce trust at the exact moment the site asks for conversion — Replace placeholder SVGs and “content will be added later” copy with real project photos, real staff photos, and concrete before/after captions.
2. **Add a proper quote-request flow** — Users can only call or email, with no inline capture, validation, or completion feedback — Add a short inquiry form in the CTA area with required fields, validation, loading, success, and error states.
3. **Improve accessibility and resilience of core interactions** — The lightbox is visual-only rather than a fully accessible dialog, and partial fetch failures only hit the console — Add `role="dialog"` semantics, focus trapping, keyboard navigation, and visible fallback rendering when header/footer fetches fail.

---

## Detailed Findings

### Pillar 1: Copywriting (2/4)
The site’s main value proposition is generally clear and direct. The landing hero and service CTAs are specific enough to orient a first-time visitor quickly, especially on [index.html](/Users/dnovcic/Downloads/ciscenje/index.html#L29), [services.html](/Users/dnovcic/Downloads/ciscenje/services.html#L23), and [about.html](/Users/dnovcic/Downloads/ciscenje/about.html#L191).

The major weakness is that several trust-building sections still talk about future content instead of present proof. That is especially visible on [works.html](/Users/dnovcic/Downloads/ciscenje/works.html#L27), [works.html](/Users/dnovcic/Downloads/ciscenje/works.html#L77), [about.html](/Users/dnovcic/Downloads/ciscenje/about.html#L133), and [index.html](/Users/dnovcic/Downloads/ciscenje/index.html#L262). On a cleaning-services site, copy such as “kartice su postavljene tako da mogu odmah da prime stvarne portrete” and “galerija je pripremljena” reads like staging language, not customer-facing messaging.

There is also a mild specificity problem: copy repeatedly leans on abstract phrases like “utisak”, “završnica”, and “ozbiljnost” without always grounding them in operational proof or concrete deliverables. The service list is better here on [services.html](/Users/dnovcic/Downloads/ciscenje/services.html#L76), but the gallery and team sections dilute that strength.

### Pillar 2: Visuals (3/4)
The visual hierarchy is strong in code. The homepage hero creates a clear focal point with a large poster image, a strong headline block, and a contrasting stats card on the right at [index.html](/Users/dnovcic/Downloads/ciscenje/index.html#L23) and [index.html](/Users/dnovcic/Downloads/ciscenje/index.html#L49). The supporting CSS reinforces that structure with a two-column hero shell and distinct panel treatment at [styles.css](/Users/dnovcic/Downloads/ciscenje/styles.css#L700) and [styles.css](/Users/dnovcic/Downloads/ciscenje/styles.css#L755).

The site also has more ambition than a generic brochure template. The sticky before/after story module is well conceived in both HTML and CSS at [index.html](/Users/dnovcic/Downloads/ciscenje/index.html#L188), [styles.css](/Users/dnovcic/Downloads/ciscenje/styles.css#L1129), and [styles.css](/Users/dnovcic/Downloads/ciscenje/styles.css#L1252). The works gallery also uses varied card spans instead of a flat repeated grid at [works.html](/Users/dnovcic/Downloads/ciscenje/works.html#L82) and [styles.css](/Users/dnovcic/Downloads/ciscenje/styles.css#L1869).

The visual score stops short of 4 because too many of the most credibility-sensitive modules still depend on placeholders: service cards on [index.html](/Users/dnovcic/Downloads/ciscenje/index.html#L104), team cards on [about.html](/Users/dnovcic/Downloads/ciscenje/about.html#L139), service detail imagery on [services.html](/Users/dnovcic/Downloads/ciscenje/services.html#L136), and much of the gallery on [works.html](/Users/dnovcic/Downloads/ciscenje/works.html#L88). This audit counted 44 placeholder-related references across public pages. For a service business, that is not a cosmetic issue; it directly affects perceived legitimacy.

### Pillar 3: Color (3/4)
The palette is cohesive and clearly intentional. Root tokens define a warm neutral system with a restrained accent set at [styles.css](/Users/dnovcic/Downloads/ciscenje/styles.css#L1). Section-level treatments keep the palette consistent while still creating contrast between hero, testimonials, footer, and CTA blocks at [styles.css](/Users/dnovcic/Downloads/ciscenje/styles.css#L761), [styles.css](/Users/dnovcic/Downloads/ciscenje/styles.css#L1375), and [styles.css](/Users/dnovcic/Downloads/ciscenje/styles.css#L1496).

The issue is governance, not taste. Color usage is only partially tokenized; the stylesheet still contains 238 hardcoded color references (`#...`, `rgba(...)`, `rgb(...)`) outside the root palette. Representative examples appear at [styles.css](/Users/dnovcic/Downloads/ciscenje/styles.css#L42), [styles.css](/Users/dnovcic/Downloads/ciscenje/styles.css#L310), [styles.css](/Users/dnovcic/Downloads/ciscenje/styles.css#L377), and [styles.css](/Users/dnovcic/Downloads/ciscenje/styles.css#L1908). That makes future refinement and contrast auditing harder than it needs to be.

Because this was a code-only audit, contrast could not be verified visually. The heavy use of translucent beige surfaces over gradients suggests some contrast risk for softer text tones, but that remains an inference from code rather than a screenshot-confirmed defect.

### Pillar 4: Typography (3/4)
Typography is directionally good. The site uses a clear two-font system, with Inter for body copy and Poppins for headings at [index.html](/Users/dnovcic/Downloads/ciscenje/index.html#L12), [styles.css](/Users/dnovcic/Downloads/ciscenje/styles.css#L44), and [styles.css](/Users/dnovcic/Downloads/ciscenje/styles.css#L151). Heading scale is responsive and assertive, especially on the homepage hero at [styles.css](/Users/dnovcic/Downloads/ciscenje/styles.css#L712) and global section headers at [styles.css](/Users/dnovcic/Downloads/ciscenje/styles.css#L240).

Weight discipline is good: the stylesheet uses only three weights in practice, with `700` dominant, `600` secondary, and `400` minimally. That keeps the type system relatively controlled.

The typography score is reduced because the file still accumulates many one-off size declarations and very small micro-labels. Distinct sizes include several sub-`0.72rem` labels at [styles.css](/Users/dnovcic/Downloads/ciscenje/styles.css#L167), [styles.css](/Users/dnovcic/Downloads/ciscenje/styles.css#L1029), [styles.css](/Users/dnovcic/Downloads/ciscenje/styles.css#L1206), [styles.css](/Users/dnovcic/Downloads/ciscenje/styles.css#L2761), and [styles.css](/Users/dnovcic/Downloads/ciscenje/styles.css#L3089). These can work visually, but they create maintainability drift and may become marginal on smaller devices.

### Pillar 5: Spacing (4/4)
Spacing is the cleanest pillar in this implementation. The vertical rhythm is coherent from top-level sections down to card interiors. Section padding is standardized at [styles.css](/Users/dnovcic/Downloads/ciscenje/styles.css#L183), major action groups use consistent gaps at [styles.css](/Users/dnovcic/Downloads/ciscenje/styles.css#L726), and core cards share common padding rules at [styles.css](/Users/dnovcic/Downloads/ciscenje/styles.css#L1011).

Breakpoint behavior remains disciplined rather than collapsing into ad hoc overrides. Mobile reductions at [styles.css](/Users/dnovcic/Downloads/ciscenje/styles.css#L2353), [styles.css](/Users/dnovcic/Downloads/ciscenje/styles.css#L2592), and [styles.css](/Users/dnovcic/Downloads/ciscenje/styles.css#L3105) preserve structure while tightening density in a predictable way.

There are one-off values, but they serve composition rather than feeling random. On balance, spacing looks systematized and production-ready.

### Pillar 6: Experience Design (2/4)
There is meaningful interaction work here. The mobile navigation toggles state correctly and closes on outside click and `Escape` at [script.js](/Users/dnovcic/Downloads/ciscenje/script.js#L72) and [script.js](/Users/dnovcic/Downloads/ciscenje/script.js#L119). Reduced-motion handling is present in both JS and CSS at [script.js](/Users/dnovcic/Downloads/ciscenje/script.js#L145) and [styles.css](/Users/dnovcic/Downloads/ciscenje/styles.css#L3165). Focus-visible styles are broadly applied; this audit counted 20 `focus-visible` references in the stylesheet, including [styles.css](/Users/dnovcic/Downloads/ciscenje/styles.css#L297) and [styles.css](/Users/dnovcic/Downloads/ciscenje/styles.css#L500).

The experience gaps are substantial for a public website. First, there is no inline lead-capture flow at all. The public site contains zero form controls, while CTA sections only point to `tel:` and `mailto:` links on [index.html](/Users/dnovcic/Downloads/ciscenje/index.html#L336), [about.html](/Users/dnovcic/Downloads/ciscenje/about.html#L191), [services.html](/Users/dnovcic/Downloads/ciscenje/services.html#L263), and [works.html](/Users/dnovcic/Downloads/ciscenje/works.html#L151). That means no validation, no success state, no error state, and no low-friction way to capture intent.

Second, the lightbox is not implemented as a fully accessible dialog. It uses `aria-hidden`, but it lacks dialog semantics, initial focus placement, focus trapping, and keyboard arrow navigation at [script.js](/Users/dnovcic/Downloads/ciscenje/script.js#L293) through [script.js](/Users/dnovcic/Downloads/ciscenje/script.js#L357). It works visually, but not to an accessibility-complete standard.

Third, shared partial loading fails silently for users. Header and footer injection catches fetch errors but only logs to the console at [script.js](/Users/dnovcic/Downloads/ciscenje/script.js#L20) through [script.js](/Users/dnovcic/Downloads/ciscenje/script.js#L42). If those requests fail, the user gets no visible fallback navigation or footer.

---

## Files Audited
- [ARCHITECTURE.md](/Users/dnovcic/Downloads/ciscenje/.planning/codebase/ARCHITECTURE.md)
- [CONCERNS.md](/Users/dnovcic/Downloads/ciscenje/.planning/codebase/CONCERNS.md)
- [CONVENTIONS.md](/Users/dnovcic/Downloads/ciscenje/.planning/codebase/CONVENTIONS.md)
- [STRUCTURE.md](/Users/dnovcic/Downloads/ciscenje/.planning/codebase/STRUCTURE.md)
- [index.html](/Users/dnovcic/Downloads/ciscenje/index.html)
- [about.html](/Users/dnovcic/Downloads/ciscenje/about.html)
- [services.html](/Users/dnovcic/Downloads/ciscenje/services.html)
- [works.html](/Users/dnovcic/Downloads/ciscenje/works.html)
- [styles.css](/Users/dnovcic/Downloads/ciscenje/styles.css)
- [script.js](/Users/dnovcic/Downloads/ciscenje/script.js)
- [header.html](/Users/dnovcic/Downloads/ciscenje/partials/header.html)
- [footer.html](/Users/dnovcic/Downloads/ciscenje/partials/footer.html)
