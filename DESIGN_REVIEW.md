# Design Review: MS Sjaj — sajt (Početna + Naši radovi)

Pregledano prema: DESIGN.md (premium editorial — Cormorant Garamond + Manrope, linen/walnut/gold paleta)
Datum: 2026-06-11

## Screenshotovi

| Screenshot | Breakpoint | Opis |
| --- | --- | --- |
| `screenshots/review-home-desktop-1280.png` | Desktop (1280) | Cela početna |
| `screenshots/review-works-desktop-1280.png` | Desktop (1280) | Cela works stranica |
| `screenshots/tiles/home-m375-*.jpg` | Mobile (375, iframe metoda) | Početna po segmentima |
| `screenshots/tiles/works-m375-*.jpg` | Mobile (375, iframe metoda) | Works po segmentima |

> Napomena za buduće preglede: headless Chrome ne dozvoljava prozor uži od 500px —
> mobile snimci se prave kroz iframe od 375px (`frame375.html` trik), inače se dobije
> 500px layout isečen na 375px i lažni "overflow".

## Rezime

Sajt je vizuelno iznad nivoa tipičnog sajta za lokalne usluge: dosledna editorial estetika,
prave fotografije radova sa pre/posle poređenjima, jasna hijerarhija (numerisane sekcije
01–08), mobilni layout je stvarno adaptiran (posebna hero varijanta, fiksni action bar sa
pozivom/WhatsApp-om). Proverena je i sumnja na horizontalni overflow na mobilnom —
lažna uzbuna (artefakt alata za screenshot). WebP konverzija (q80) nije vizuelno degradirala
fotografije.

## Mora da se sredi

1. **Facebook link je placeholder** — `https://www.facebook.com/` u headeru (mobilna
   navigacija) i footeru obe stranice. Ili uneti pravu stranicu ili ukloniti ikonicu.
   *Čeka se odluka/link od vlasnika.*

## Sređeno tokom pregleda

2. **Meta description na works.html bio zastareo** — govorio je da se galerija "priprema",
   a galerija je odavno živa. Prepisan.
3. **Footer tagline:** "post-građevinske prostore" (anglicizam, nigde drugde na sajtu) →
   "prostore posle radova", usklađeno sa ostatkom teksta.

## Moglo bi bolje (nije hitno)

4. **Font Awesome ceo bundle** (~100 KB) za petnaestak ikonica — forma već koristi inline
   SVG; vremenom zameniti i ostale ikonice inline SVG-om i izbaciti CDN zavisnost.
5. **Hero badge na mobilnom** ("Čistoća bez kompromisa") delom isečen ivicom kartice i
   blizu chip-a "MS Sjaj · Kragujevac" — deluje polu-namerno (sticker stil), ali na 375px
   je tesno.
6. **Testimonijali su anonimni** ("Klijent — agencija za nekretnine") — kad stignu prve
   Google recenzije, zameniti pravim imenima ili linkom na recenzije; znatno jači signal.
7. **Galerija** — dodavati nove pre/posle diptihe kako poslovi pristižu; diptih format je
   najubedljiviji element sajta.

## Šta je dobro (zadržati)

- Dosledan vizuelni sistem: boje, radijusi, senke i tipografska skala iz DESIGN.md se
  stvarno poštuju u implementaciji — nema "ispalih" elemenata.
- Pre/posle slajderi i diptisi sa pravim fotografijama — glavni diferencijator.
- Pristupačnost: reduced-motion poštovan svuda, focus trap u lightboxu, aria-live na
  statusu forme, alt tekstovi na svim slikama.
- Mobilni fiksni action bar (Pozovi / WhatsApp) sa safe-area padding-om — pravi CTA
  za telefonske korisnike, sadržaj ima rezervisan prostor (76px) pa ništa nije prekriveno.
- Footer: čist, sa karticama za poziv/mejl/radno vreme.
