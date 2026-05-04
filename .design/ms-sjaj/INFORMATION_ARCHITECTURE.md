# Information Architecture: MS Sjaj

## TL;DR — Preporuka

**Sažmi 5 stranica na 2 surfaces: jedna long-form home (index) + odvojena galerija radova (works). Ukloni about.html, services.html i kontakt.html.**

Trenutna struktura (index/about/services/works/kontakt) ne plaća svoju cenu za ovaj biznis. Kupac (real-estate agent / landlord / project manager pred predaju) donosi odluku u jednoj sesiji, najčešće sa telefona, posle WhatsApp ili Google poziva. Pet stranica ga tera da klikće da bi sastavio sliku koja bi trebalo da stane u jedan scroll. Galerija se zadržava kao zasebna jer je slikovno teška i delivable je sama po sebi (link koji se šalje klijentu).

### Zašto current 5-page ne radi

1. **Sadržaj se ponavlja na više stranica.** "Pristup" (3 cards) na home + "Spotlight" (6 items) na about pričaju istu priču. Services preview (3 cards) na home + Services list (4 items) na services.html — isto. Process note na about linkuje na Process na services. FAQ na home (3) + FAQ na services (4) — različita pitanja, isti problem.
2. **CTA panel je duplikovan verbatim na 4 stranice.** Kada vidiš isti sledeći korak 4 puta, prestaje da deluje kao sledeći korak.
3. **Forma je iza extra klika.** Konkurencija u Kragujevcu ima formu na home — MS Sjaj nema. Ovo je friction koji se direktno meri u broju upita.
4. **Brand voice je restraint** ("fewer claims executed deeper" — DESIGN_BRIEF), ali 5 stranica forsira 5 hero-a, 5 različitih H1, 5 verzija iste poruke. To je suprotno od restraint.
5. **Mobile-first se prozni.** Hamburger nav na 5 stavki za jedan dogovor — kupac je tu da odluči, ne da istraži.

### Zašto NE pure one-page (zašto works ostaje zasebno)

- Galerija je image-heavy; spajanje na home pravi mobile bundle preteškim.
- Works je najjači trust asset i ima value kao standalone link (kupac šalje kolegi, agent referenca).
- Long-tail SEO: `/works` može da rangira na "ciscenje stanova kragujevac galerija" / "ciscenje posle radova primeri".

### Šta dobijaš ovim potezom

- 5 → 2 surface; nav se svodi na 3 stavke (Početna · Radovi · Kontakt anchor).
- Forma na home = -1 klik između namere i submita.
- Nema duplikovanog CTA bloka.
- Pristup + Spotlight se spajaju u jednu sekciju "Kako radimo" (3–4 itema, ne 6).
- Process je jednom, FAQ je jednom.
- Manje održavanja: 1 home page mesto 4.

---

## Site Map

### Predloženo (2 surfaces)

- Početna `/` (one-page, sa anchor sekcijama)
  - `#usluge` — šta radimo (4 ključne kategorije)
  - `#pristup` — kako radimo (3 principa, sažeto sa about)
  - `#dokaz` — pre/posle slider + link na Radove
  - `#proces` — 4 koraka od poziva do predaje
  - `#pitanja` — 5 najčešćih pitanja
  - `#kontakt` — forma + telefon + WhatsApp
- Radovi `/works.html` (galerija)
  - Anchor `#kontakt` na dnu (mini CTA, ne ceo panel)

### Trenutno (5 surfaces — preporuka za uklanjanje)

- ~~`/about.html`~~ → kondenzuje se u `#pristup` na home (3 itema umesto 6)
- ~~`/services.html`~~ → kondenzuje se u `#usluge` + `#proces` + `#pitanja` na home
- ~~`/kontakt.html`~~ → forma se preseljava u `#kontakt` sekciju home

## Navigation Model

- **Primarni nav (3 stavke max):** `Početna · Radovi · Kontakt`
  - "Kontakt" je anchor link na `/#kontakt`, ne stranica
  - "Radovi" je jedina prava sekundarna stranica
- **Mobile:** ista 3 linka, bez hamburger-a (3 stavke staju u top-bar). Sticky CTA "Pozovi" / "WhatsApp" na dnu se zadržava.
- **Sekundarno:** in-page anchor strip na home na poziciji ispod hero-a — `Usluge · Pristup · Dokaz · Proces · Pitanja` (već postoji template na services hero, prebaciti na home).
- **Utility:** footer drži kontakt podatke, working hours, area served, social proof badge ako postoji. Nema "About" linka.

## Content Hierarchy — Početna `/`

1. **Hero** — H1 "Dubinsko čišćenje nameštaja, stanova i lokala", lokacija eyebrow, primarni CTA "Brza procena" (skroluje na #kontakt, ne odvodi sa stranice). _Razlog: 70% mobile usera nikad ne skroluje dalje od ovoga; ovo mora da prodaje._
2. **Pre/posle slider (#dokaz)** — diže se gore (trenutno je 4. sekcija). _Razlog: proof pre liste usluga; "show the work, don't list it" iz design principa. Ovo je razlika prema templejtnoj konkurenciji._
3. **Usluge (#usluge)** — 4 itema (Dubinsko · Stanovi · Poslovni · Posle radova). Svaka kartica je 2 rečenice + chips. Ne razdvajati na 4-card preview + zasebnu listu — to je trenutni duplikat. _Razlog: jedan izvor istine, jedan scroll._
4. **Pristup (#pristup)** — 3 principa, ne 6. Preuzima Spotlight 01/02/03 sa about, ostavlja 04/05/06 kao subtle copy line ispod. _Razlog: 6 itema u jednom scrolled pogledu izgleda kao spisak; 3 izgleda kao stav._
5. **Proces (#proces)** — 4 koraka (Poziv → Procena → Dolazak → Predaja). _Razlog: skida nepoznanicu pre forme. Bez ovoga forma deluje preuranjeno._
6. **Pitanja (#pitanja)** — 5 itema (3 sa home + 2 najjače sa services). _Razlog: konsoliduje umesto da fragmentira._
7. **Kontakt (#kontakt)** — forma + tel + WhatsApp + working hours. _Razlog: mora da bude na home da bi forma sakupljala upite. Trenutno je iza klika._
8. **Testimonial** — opcionalno, kratak, jedan citat. Trenutni je dobar.

## Content Hierarchy — Radovi `/works.html`

1. Hero (kratak, jedna rečenica, slika)
2. Galerija (lightbox grid)
3. Kratak in-line CTA na dnu (1 dugme + tel) — NE pun panel kao trenutno

## User Flows

### A. Mobile, došao preko Google Maps / WhatsApp

1. Otvara `/`
2. Vidi hero + lokacija, scroluje
3. Vidi pre/posle slider — ovo je odlučni momenat
4. Brzo proleti kroz usluge, vidi svoju kategoriju
5. Skoči na #kontakt preko sticky bar-a ili anchor-a
6. Šalje formu / klikne WhatsApp / klikne Pozovi
7. **Konverzija u jednom scroll-u, bez page load-a.**

### B. Desktop, "ozbiljniji" buyer (real-estate agent, project manager)

1. Otvara `/`
2. Skroluje ceo home
3. Klikće "Pogledajte radove" → `/works.html`
4. Pregleda galeriju
5. Vraća se ili šalje formu sa works stranice
6. **Maksimalno 2 page load-a.**

### C. Repeat / referral (kupac koji već zna)

1. Direktno klik na tel ili WhatsApp iz hero-a
2. **Nema scrolla, nema forme.**

## Naming Conventions

| Concept | Label u UI | Notes |
|---|---|---|
| ulazna ponuda | "Brza procena" | konzistentno na svim CTA dugmićima — ne mešati sa "Zatraži ponudu" / "Pošaljite upit" |
| sekcija usluga | "Usluge" (eyebrow), H2 sa konkretnim glagolom | ne "Naše usluge" / "Šta radimo" naizmenično |
| sekcija pristupa | "Pristup" (eyebrow) | NE "Standard" / "O nama" / "Spotlight" — trenutno se koristi 3 različita imena za istu stvar |
| galerija | "Radovi" | nav stavka i page title isti |
| kontakt sekcija | "Kontakt" | anchor `#kontakt` zadržati radi backlink-ova |
| process steps | numerisani 01–04, kicker reči | drži format koji već postoji u services-process |

## Component Reuse Map

| Component | Used on (after) | Notes |
|---|---|---|
| `site-header` (3 link) | `/`, `/works.html` | drop "O nama", "Usluge", "Kontakt" linkove |
| `hero-section` | `/` only | works dobija page-hero (kraći) |
| `before-after-compare-card` | `/` (jedan, glavni) | trenutno na home + works — držati samo na home, na works su slike same |
| `service-card` | `/` (4 itema) | ukloniti `services-list-editorial` |
| `lift-card` (pristup) | `/` (3 itema) | ukloniti `about-spotlight-shell` (6 itema) |
| `service-process-grid` | `/` (4 koraka) | seli se sa services na home |
| `faq-list` | `/` (5 pitanja) | objedini home FAQ + services FAQ |
| `cta-panel` | `/` (jedan, kao #kontakt sa formom) | ne ponavljati na works — tamo mini-CTA |
| `kontakt-form` | `/` (#kontakt) | iz kontakt.html prebaciti unutar home |
| `site-footer` | obe | bez izmene |

## URL Strategy

- Pattern: `/` za home, `/works.html` za galeriju, anchor `/#section-id` za interne skokove.
- **301 redirekti (obavezno) da se ne izgubi SEO equity:**
  - `/about.html` → `/#pristup`
  - `/services.html` → `/#usluge`
  - `/services.html#process` → `/#proces`
  - `/services.html#pitanja` → `/#pitanja`
  - `/kontakt.html` → `/#kontakt`
- Sitemap.xml smanjiti na 2 URL-a (home + works).
- JSON-LD `CleaningService` ostaje na home; ukloniti dupli structured data sa ostalih stranica ako postoji.

## Content Growth Plan

- **Galerija će rasti** — works.html mora da podrži filtere (Stan / Lokal / Posle radova / Nameštaj) kada se broj radova prevali preko ~12. Sada je tu lightbox grid što je dovoljno.
- **FAQ će rasti** — limit na home-u je ~6. Ako se broj prelije, tek tada razmotriti `/pitanja.html` (ne pre).
- **Testimonials** — ostavi 1 na home; ne praviti zasebnu stranicu dok nemaš 8+ pravih.
- **Blog / čišćenje saveti** — ako ikad budu, idu pod `/saveti/` ali to je tema za drugu odluku, ne sada.

---

## Konkretni delete/move list (za izvođenje)

**Brisati:**
- `about.html` (premestiti spotlight 01/02/03 u home `#pristup`)
- `services.html` (premestiti list-editorial → home `#usluge`; process → home `#proces`; FAQ merge → home `#pitanja`)
- `kontakt.html` (premestiti formu u home `#kontakt`)

**Sažeti na home:**
- Pristup: 6 spotlight items → 3 lift-cards (već postoje na home)
- Services: 3 preview cards (home) + 4 list items (services) → 4 jedinstvene kartice
- FAQ: 3 (home) + 4 (services) → 5 najjačih, deduplikovani

**Kept:**
- `works.html` (jedina sekundarna stranica)
- Hero + pre/posle slider + testimonial + footer ostaju kao komponente, samo reordered

**Ne dirati:**
- JSON-LD na index.html
- Robots.txt logiku
- Brand voice / copy ton (DESIGN_BRIEF principi su tačni — IA je bila ta koja ih je narušavala)
