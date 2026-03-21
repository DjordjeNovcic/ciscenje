const SITE_DATA = {
   stats: [
      { number: '500+', label_sr: 'Zadovoljnih klijenata', label_en: 'Satisfied clients' },
      { number: '10+', label_sr: 'Godina iskustva', label_en: 'Years of experience' },
      { number: '24h', label_sr: 'Odgovor na upit', label_en: 'Inquiry response' },
      { number: '7/7', label_sr: 'Fleksibilni termini', label_en: 'Flexible booking' }
   ],
   features: [
      {
         icon: '✨',
         title_sr: 'Besprekorna završnica',
         title_en: 'Polished final finish',
         description_sr: 'Prostor posle tretmana izgleda uredno, smireno i spremno za svakodnevni život ili profesionalni utisak.',
         description_en: 'After the service, the space feels orderly, calm, and ready for everyday living or a professional impression.'
      },
      {
         icon: '🫧',
         title_sr: 'Detaljna obrada zona',
         title_en: 'Detailed zone treatment',
         description_sr: 'Kuhinje, kupatila, kontaktne površine i osetljive zone tretiraju se sa pojačanom pažnjom i jasnim redosledom rada.',
         description_en: 'Kitchens, bathrooms, contact surfaces, and delicate zones are treated with extra care and a clear workflow.'
      },
      {
         icon: '📅',
         title_sr: 'Dogovor bez komplikovanja',
         title_en: 'Simple, clear booking',
         description_sr: 'Termin, obim rada i očekivanje rezultata definišemo unapred, bez nejasnih stavki i improvizacije.',
         description_en: 'Timing, scope, and expected result are defined in advance without vague promises or improvisation.'
      },
      {
         icon: '🤝',
         title_sr: 'Diskretan i pouzdan tim',
         title_en: 'Discreet and reliable team',
         description_sr: 'Radimo organizovano, tiho i sa poštovanjem prema prostoru klijenta, bilo da je u pitanju dom ili poslovni enterijer.',
         description_en: 'We work in an organized, discreet way and respect the client’s space, whether it is a home or a business interior.'
      }
   ],
   reasons: [
      {
         icon: '💎',
         title_sr: 'Premium utisak bez viška',
         title_en: 'A premium feel without excess',
         description_sr: 'Naš cilj nije samo ukloniti nečistoću, već ostaviti prostor koji deluje negovano, jasno i vizuelno rasterećeno.',
         description_en: 'Our goal is not only to remove dirt but to leave behind a space that feels curated, clear, and visually calm.'
      },
      {
         icon: '⏰',
         title_sr: 'Pouzdan ritam saradnje',
         title_en: 'Reliable service rhythm',
         description_sr: 'Poštujemo termine, dogovorene korake i dinamiku prostora u kome boravite ili radite.',
         description_en: 'We respect schedules, agreed steps, and the rhythm of the space where you live or work.'
      },
      {
         icon: '🛡️',
         title_sr: 'Sigurnost i poverenje',
         title_en: 'Safety and trust',
         description_sr: 'Koristimo proverena sredstva, pažljiv pristup i transparentnu komunikaciju tokom cele usluge.',
         description_en: 'We use trusted products, a careful approach, and transparent communication throughout the service.'
      }
   ],
   services: [
      {
         name_sr: 'Standardno čišćenje doma',
         name_en: 'Standard home cleaning',
         price_sr: 'od 4.500',
         price_en: 'from 4,500',
         description_sr: 'Dnevni boravak, kuhinja i kupatilo\nBrisanje prašine i usisavanje\nVizuelno osveženje prostora',
         description_en: 'Living room, kitchen, and bathroom\nDusting and vacuuming\nA visibly refreshed space',
         image: 'hero-approved.png?v=20260321c'
      },
      {
         name_sr: 'Detaljno čišćenje enterijera',
         name_en: 'Detailed interior cleaning',
         price_sr: 'od 7.500',
         price_en: 'from 7,500',
         description_sr: 'Detaljna obrada kontaktnih površina\nFokus na kuhinje, kupatila i stolariju\nZavršnica koja ostavlja premium utisak',
         description_en: 'Detailed treatment of contact surfaces\nFocus on kitchens, bathrooms, and joinery\nA finish that leaves a premium impression',
         image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80'
      },
      {
         name_sr: 'Čišćenje poslovnog prostora',
         name_en: 'Business space cleaning',
         price_sr: 'od 9.500',
         price_en: 'from 9,500',
         description_sr: 'Kancelarije, saloni i manji poslovni enterijeri\nDogovor po terminu koji ne remeti rad\nUredan prostor spreman za klijente i tim',
         description_en: 'Offices, salons, and smaller commercial interiors\nScheduling that does not disrupt operations\nA polished space ready for clients and staff',
         image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'
      }
   ],
   addons: [
      {
         name_sr: 'Dubinsko pranje nameštaja',
         name_en: 'Deep upholstery cleaning',
         description_sr: 'Tretman fotelja, sofa i tapaciranih površina za osvežen izgled i prijatniji osećaj prostora.',
         description_en: 'Treatment for armchairs, sofas, and upholstered surfaces for a fresher look and feel.',
         price_sr: 'od 3.500',
         price_en: 'from 3,500'
      },
      {
         name_sr: 'Pranje prozora i staklenih površina',
         name_en: 'Window and glass cleaning',
         description_sr: 'Za više prirodnog svetla, čistiji utisak enterijera i završnicu koja se vidi odmah.',
         description_en: 'For more natural light, a cleaner interior impression, and a finish you notice right away.',
         price_sr: 'od 2.500',
         price_en: 'from 2,500'
      },
      {
         name_sr: 'Detaljna obrada kuhinje',
         name_en: 'Detailed kitchen treatment',
         description_sr: 'Frontovi, radne površine i detalji koji najviše utiču na utisak urednosti doma.',
         description_en: 'Fronts, worktops, and details that most strongly shape the feeling of order in a home.',
         price_sr: 'od 3.000',
         price_en: 'from 3,000'
      },
      {
         name_sr: 'Osveženje kupatila i keramike',
         name_en: 'Bathroom and tile refresh',
         description_sr: 'Pojačana pažnja na sanitarije, pločice i zone koje traže detaljan završni tretman.',
         description_en: 'Extra attention to sanitary fixtures, tiles, and areas that require a detail-oriented final pass.',
         price_sr: 'od 2.800',
         price_en: 'from 2,800'
      }
   ],
   testimonials: [
      {
         author: 'Milica P.',
         rating: 5,
         text_sr: 'Stan je posle tretmana izgledao uredno i mirno, bez haosa koji obično ostane posle velikog spremanja.',
         text_en: 'After the service, the apartment felt orderly and calm, without the chaos that usually follows a major clean.'
      },
      {
         author: 'Nikola R.',
         rating: 5,
         text_sr: 'Najviše mi znači što je dogovor bio jasan i što je tim radio precizno, bez ometanja svakodnevnog ritma kancelarije.',
         text_en: 'What mattered most to me was the clear booking process and the way the team worked precisely without disrupting our office routine.'
      },
      {
         author: 'Jelena M.',
         rating: 5,
         text_sr: 'Rezultat nije bio samo čist prostor, već utisak da je ceo enterijer ponovo prodisao i postao prijatniji.',
         text_en: 'The result was not just a cleaner space, but the feeling that the whole interior could breathe again and felt more pleasant.'
      }
   ],
   gallery: [
      {
         url: 'hero-approved.png?v=20260321c',
         alt_sr: 'MS Sjaj tim u enterijeru',
         alt_en: 'MS Sjaj team in an interior'
      },
      {
         url: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
         alt_sr: 'Svetao dnevni boravak posle čišćenja',
         alt_en: 'Bright living room after cleaning'
      },
      {
         url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
         alt_sr: 'Uredan poslovni enterijer',
         alt_en: 'Tidy business interior'
      },
      {
         url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
         alt_sr: 'Čista kuhinja i trpezarija',
         alt_en: 'Clean kitchen and dining room'
      },
      {
         url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
         alt_sr: 'Detalji modernog enterijera',
         alt_en: 'Modern interior details'
      }
   ]
};

let galleryImages = [];
let currentLightboxIndex = 0;
let scrollRevealObserver = null;

document.addEventListener('DOMContentLoaded', initializeApp);

async function initializeApp() {
   await loadPartials();
   setupMobileBackButton();
   setupLightboxOutsideClick();
   setupGoToTopButton();
   loadPublicPageContent();
   setupPremiumPublicExperience();
   initializeScrollReveal();
   removePageLoader();
   handleDeferredScroll();

   document.addEventListener('keydown', handleLightboxKeys);
   window.addEventListener('languagechange', () => {
      loadPublicPageContent();
      initializeScrollReveal();
   });
}

async function loadPartials() {
   const headerEl = document.getElementById('site-header');
   const footerEl = document.getElementById('site-footer');

   if (headerEl) {
      const headerResponse = await fetch('partials/header.html');
      headerEl.innerHTML = await headerResponse.text();
      setupMobileNav();
      setupPhoneDropdown();
      setActiveNavLink();
      if (typeof setupLanguageSwitcher === 'function') {
         setupLanguageSwitcher();
      }
   }

   if (footerEl) {
      const footerResponse = await fetch('partials/footer.html');
      footerEl.innerHTML = await footerResponse.text();
      const yearEl = document.getElementById('currentYear');
      if (yearEl) yearEl.textContent = new Date().getFullYear();
   }

   if (typeof applyLanguage === 'function') {
      applyLanguage();
   }
}

function loadPublicPageContent() {
   renderFeatures();
   renderStats();
   renderReasons();
   renderServices();
   renderAddOns();
   renderGallery();
   renderTestimonials();
   setupInteractiveSurfaces();
   if (typeof applyLanguage === 'function') {
      applyLanguage();
   }
}

function getLocalizedContent(item, field) {
   const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'sr';
   return lang === 'en' ? (item[`${field}_en`] || item[field] || '') : (item[`${field}_sr`] || item[field] || '');
}

function getDisplayIconMarkup(icon) {
   const iconMap = {
      '✨': 'fa-solid fa-star',
      '🫧': 'fa-solid fa-droplet',
      '📅': 'fa-regular fa-calendar',
      '🤝': 'fa-solid fa-handshake',
      '💎': 'fa-solid fa-gem',
      '⏰': 'fa-regular fa-clock',
      '🛡️': 'fa-solid fa-shield',
      '🧹': 'fa-solid fa-broom',
      '⭐': 'fa-solid fa-star'
   };

   return iconMap[icon] ? `<i class="${iconMap[icon]}" aria-hidden="true"></i>` : icon;
}

function renderFeatures() {
   const grid = document.getElementById('featuresGrid');
   if (!grid) return;

   grid.innerHTML = SITE_DATA.features.map((feature, index) => `
      <article class="feature-card reveal-item" style="--reveal-delay: ${index * 90}ms;">
         <div class="feature-icon">${getDisplayIconMarkup(feature.icon)}</div>
         <h3>${getLocalizedContent(feature, 'title')}</h3>
         <p>${getLocalizedContent(feature, 'description')}</p>
      </article>
   `).join('');
}

function renderStats() {
   document.querySelectorAll('.stats-section').forEach(section => {
      section.innerHTML = SITE_DATA.stats.map((stat, index) => `
         <div class="stat-box reveal-item" style="--reveal-delay: ${index * 80}ms;">
            <div class="stat-number">${stat.number}</div>
            <div class="stat-label">${getLocalizedContent(stat, 'label')}</div>
         </div>
      `).join('');
   });
}

function renderReasons() {
   document.querySelectorAll('.reasons-grid').forEach(grid => {
      grid.innerHTML = SITE_DATA.reasons.map((reason, index) => `
         <article class="reason-card reveal-item" style="--reveal-delay: ${index * 90}ms;">
            <div class="reason-icon">${getDisplayIconMarkup(reason.icon)}</div>
            <h3>${getLocalizedContent(reason, 'title')}</h3>
            <p>${getLocalizedContent(reason, 'description')}</p>
         </article>
      `).join('');
   });
}

function renderServices() {
   document.querySelectorAll('#servicesGrid').forEach(grid => {
      const isHomeGrid = document.body.classList.contains('home-page');
      const services = isHomeGrid ? SITE_DATA.services.slice(0, 3) : SITE_DATA.services;

      grid.innerHTML = services.map((service, index) => {
         const badge = index === 1 ? `<span class="service-badge">${getServiceBadgeLabel()}</span>` : '';
         const descriptionItems = getLocalizedContent(service, 'description')
            .split('\n')
            .map(item => item.trim())
            .filter(Boolean)
            .map(item => `<li>${item}</li>`)
            .join('');

         return `
            <article class="pricing-card reveal-item ${index === 1 ? 'featured' : ''}" style="--reveal-delay: ${index * 90}ms;">
               ${badge}
               <div class="service-media">
                  <img src="${service.image}" alt="${getLocalizedContent(service, 'name')}">
               </div>
               <h3>${getLocalizedContent(service, 'name')}</h3>
               <span class="service-price">${getLocalizedContent(service, 'price')} RSD</span>
               <div class="features-divider"></div>
               <ul class="service-features">${descriptionItems}</ul>
               <a href="index.html?scroll=cta-contact" class="btn service-card-cta">${getServiceCtaLabel()}</a>
            </article>
         `;
      }).join('');
   });
}

function renderAddOns() {
   const grid = document.getElementById('addonsGrid');
   if (!grid) return;

   grid.innerHTML = SITE_DATA.addons.map((addon, index) => `
      <article class="addon-card reveal-item" style="--reveal-delay: ${index * 90}ms;">
         <h4>${getLocalizedContent(addon, 'name')}</h4>
         <p>${getLocalizedContent(addon, 'description')}</p>
         <span class="addon-price">${getLocalizedContent(addon, 'price')} RSD</span>
      </article>
   `).join('');
}

function renderGallery() {
   const grid = document.getElementById('galleryGrid');
   if (!grid) return;

   galleryImages = SITE_DATA.gallery.map(photo => photo.url);
   grid.innerHTML = SITE_DATA.gallery.map((photo, index) => `
      <div class="gallery-item reveal-item" style="--reveal-delay: ${index * 70}ms;" data-gallery-index="${index}">
         <img src="${photo.url}" alt="${getLocalizedContent(photo, 'alt')}">
      </div>
   `).join('');

   grid.querySelectorAll('[data-gallery-index]').forEach(item => {
      item.addEventListener('click', () => openLightbox(Number(item.dataset.galleryIndex)));
   });
}

function renderTestimonials() {
   const grid = document.getElementById('testimonialsGrid');
   if (!grid) return;

   grid.innerHTML = SITE_DATA.testimonials.map((testimonial, index) => `
      <article class="testimonial-card reveal-item" style="--reveal-delay: ${index * 90}ms;">
         <div class="testimonial-quote">“</div>
         <p class="testimonial-text">${getLocalizedContent(testimonial, 'text')}</p>
         <div class="testimonial-author-section">
            <div class="testimonial-rating">${'★'.repeat(testimonial.rating)}</div>
            <strong class="testimonial-author">${testimonial.author}</strong>
         </div>
      </article>
   `).join('');
}

function getServiceBadgeLabel() {
   return typeof getCurrentLanguage === 'function' && getCurrentLanguage() === 'en' ? 'Most booked' : 'Najtraženije';
}

function getServiceCtaLabel() {
   return typeof getCurrentLanguage === 'function' && getCurrentLanguage() === 'en' ? 'Book now' : 'Zakaži termin';
}

function setupMobileBackButton() {
   const btn = document.getElementById('mobileBackBtn');
   if (!btn) return;

   if (document.body.classList.contains('home-page') || window.history.length <= 1) {
      btn.style.display = 'none';
      return;
   }

   btn.addEventListener('click', () => window.history.back());
}

function setupGoToTopButton() {
   const btn = document.getElementById('goToTopBtn');
   if (!btn) return;

   window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 300);
   }, { passive: true });

   btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
   });
}

function setupPhoneDropdown() {
   const phoneTrigger = document.querySelector('.phone-trigger');
   const phoneWrapper = document.querySelector('.phone-wrapper');

   if (!phoneTrigger || !phoneWrapper) return;

   phoneTrigger.addEventListener('click', event => {
      if (window.innerWidth > 768) return;
      event.stopPropagation();
      const isOpen = phoneWrapper.classList.toggle('active');
      document.body.classList.toggle('phone-open', isOpen);
      phoneTrigger.setAttribute('aria-expanded', String(isOpen));
   });

   document.addEventListener('click', event => {
      if (window.innerWidth <= 768 && !phoneWrapper.contains(event.target)) {
         phoneWrapper.classList.remove('active');
         document.body.classList.remove('phone-open');
         phoneTrigger.setAttribute('aria-expanded', 'false');
      }
   });
}

function setupMobileNav() {
   const hamburger = document.getElementById('hamburger');
   const navMenu = document.getElementById('navMenu');
   const phoneWrapper = document.querySelector('.phone-wrapper');

   if (!hamburger || !navMenu) return;

   hamburger.addEventListener('click', event => {
      event.stopPropagation();
      phoneWrapper?.classList.remove('active');
      const isOpen = navMenu.classList.toggle('active');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('menu-open', isOpen);
   });

   document.addEventListener('click', event => {
      if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
         navMenu.classList.remove('active');
         hamburger.classList.remove('active');
         hamburger.setAttribute('aria-expanded', 'false');
         document.body.classList.remove('menu-open');
      }
   });

   navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
         navMenu.classList.remove('active');
         hamburger.classList.remove('active');
         hamburger.setAttribute('aria-expanded', 'false');
         document.body.classList.remove('menu-open');
      });
   });
}

function setActiveNavLink() {
   const currentFile = window.location.pathname.split('/').pop() || 'index.html';
   document.querySelectorAll('.nav-menu a').forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      const normalizedHref = href.split('?')[0];
      link.classList.toggle('active', normalizedHref === currentFile || (currentFile === '' && normalizedHref === 'index.html'));
   });
}

function setupPremiumPublicExperience() {
   ensureScrollProgress();
   setupScrollDrivenChrome();
   setupHeroParallax();
   setupInteractiveSurfaces();
}

function ensureScrollProgress() {
   if (document.getElementById('scrollProgress')) return;
   const progress = document.createElement('div');
   progress.className = 'scroll-progress';
   progress.innerHTML = '<span id="scrollProgress" class="scroll-progress-bar"></span>';
   document.body.appendChild(progress);
}

function setupScrollDrivenChrome() {
   const progressBar = document.getElementById('scrollProgress');

   const update = () => {
      const scrollTop = window.scrollY || 0;
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(scrollTop / maxScroll, 1);
      if (progressBar) {
         progressBar.style.transform = `scaleX(${progress})`;
      }
      document.body.classList.toggle('is-scrolled', scrollTop > 24);
   };

   window.addEventListener('scroll', update, { passive: true });
   update();
}

function setupHeroParallax() {
   const landing = document.querySelector('.landing-section');
   if (!landing) return;

   const updateScrollDrift = () => {
      const drift = Math.min(window.scrollY * 0.08, 22);
      landing.style.setProperty('--hero-scroll-shift', `${drift.toFixed(2)}px`);
   };

   window.addEventListener('scroll', updateScrollDrift, { passive: true });
   updateScrollDrift();

   if (!window.matchMedia('(pointer: fine)').matches) return;

   landing.addEventListener('mousemove', event => {
      const rect = landing.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) - 0.5;
      const y = ((event.clientY - rect.top) / rect.height) - 0.5;
      landing.style.setProperty('--hero-pan-x', `${(x * 10).toFixed(2)}px`);
      landing.style.setProperty('--hero-pan-y', `${(y * 10).toFixed(2)}px`);
      landing.style.setProperty('--hero-glow-x', `${((x + 0.5) * 100).toFixed(2)}%`);
      landing.style.setProperty('--hero-glow-y', `${((y + 0.5) * 100).toFixed(2)}%`);
   });

   landing.addEventListener('mouseleave', () => {
      landing.style.setProperty('--hero-pan-x', '0px');
      landing.style.setProperty('--hero-pan-y', '0px');
      landing.style.setProperty('--hero-glow-x', '72%');
      landing.style.setProperty('--hero-glow-y', '22%');
   });
}

function setupInteractiveSurfaces(scope = document) {
   const surfaces = scope.querySelectorAll(
      '.feature-card, .reason-card, .value-card, .pricing-card, .addon-card, .testimonial-card, .gallery-item, .cta-panel, .hero-sidecard, .story-content, .stat-box, .signature-step, .service-standard-card, .team-standard-card, .service-ritual-step, .editorial-showcase-copy, .editorial-showcase-quote, .brand-manifesto-copy, .brand-manifesto-quote'
   );

   surfaces.forEach(surface => {
      surface.classList.add('premium-surface');
      if (surface.dataset.surfaceBound === 'true') return;
      surface.dataset.surfaceBound = 'true';

      if (!window.matchMedia('(pointer: fine)').matches) return;

      surface.addEventListener('mousemove', event => {
         const rect = surface.getBoundingClientRect();
         const x = ((event.clientX - rect.left) / rect.width) * 100;
         const y = ((event.clientY - rect.top) / rect.height) * 100;
         surface.style.setProperty('--spotlight-x', `${x.toFixed(2)}%`);
         surface.style.setProperty('--spotlight-y', `${y.toFixed(2)}%`);
      });

      surface.addEventListener('mouseleave', () => {
         surface.style.setProperty('--spotlight-x', '50%');
         surface.style.setProperty('--spotlight-y', '50%');
      });
   });
}

function initializeScrollReveal(scope = document) {
   const elements = scope.querySelectorAll('.section-reveal, .reveal-item');
   if (!elements.length) return;

   if (!('IntersectionObserver' in window)) {
      elements.forEach(element => element.classList.add('is-visible'));
      return;
   }

   if (!scrollRevealObserver) {
      scrollRevealObserver = new IntersectionObserver(entries => {
         entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            scrollRevealObserver.unobserve(entry.target);
         });
      }, {
         threshold: 0.16,
         rootMargin: '0px 0px -8% 0px'
      });
   }

   elements.forEach(element => {
      if (element.dataset.revealBound === 'true') return;
      element.dataset.revealBound = 'true';
      scrollRevealObserver.observe(element);
   });
}

function handleDeferredScroll() {
   const params = new URLSearchParams(window.location.search);
   const targetId = params.get('scroll') || window.location.hash.replace('#', '');
   if (!targetId) return;

   window.setTimeout(() => {
      const target = document.getElementById(targetId);
      if (target) {
         target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
   }, 180);
}

function removePageLoader() {
   document.body.classList.add('loaded');
}

function setupLightboxOutsideClick() {
   const lightbox = document.getElementById('lightbox');
   if (!lightbox) return;
   lightbox.addEventListener('click', event => {
      if (event.target === lightbox) closeLightbox();
   });
}

function openLightbox(index) {
   const lightbox = document.getElementById('lightbox');
   const lightboxImage = document.getElementById('lightboxImage');
   if (!lightbox || !lightboxImage || !galleryImages.length) return;

   currentLightboxIndex = index;
   lightboxImage.src = galleryImages[currentLightboxIndex];
   lightbox.classList.add('active');
   updateLightboxCounter();
   document.body.style.overflow = 'hidden';
}

function closeLightbox() {
   const lightbox = document.getElementById('lightbox');
   if (!lightbox) return;
   lightbox.classList.remove('active');
   document.body.style.overflow = '';
}

function navigateLightbox(direction) {
   const lightboxImage = document.getElementById('lightboxImage');
   if (!lightboxImage || !galleryImages.length) return;

   currentLightboxIndex += direction;
   if (currentLightboxIndex < 0) currentLightboxIndex = galleryImages.length - 1;
   if (currentLightboxIndex >= galleryImages.length) currentLightboxIndex = 0;

   lightboxImage.src = galleryImages[currentLightboxIndex];
   updateLightboxCounter();
}

function updateLightboxCounter() {
   const counter = document.getElementById('lightboxCounter');
   if (!counter || !galleryImages.length) return;
   counter.textContent = `${currentLightboxIndex + 1} / ${galleryImages.length}`;
}

function handleLightboxKeys(event) {
   const lightbox = document.getElementById('lightbox');
   if (!lightbox || !lightbox.classList.contains('active')) return;

   if (event.key === 'Escape') closeLightbox();
   if (event.key === 'ArrowRight') navigateLightbox(1);
   if (event.key === 'ArrowLeft') navigateLightbox(-1);
}

window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.navigateLightbox = navigateLightbox;
