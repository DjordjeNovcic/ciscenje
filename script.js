let revealObserver = null;
let lightboxItems = [];
let activeLightboxIndex = 0;
let lastFocusedElement = null;

document.addEventListener('DOMContentLoaded', () => {
  initializeSite().catch(error => {
    console.error('Greška pri pokretanju sajta:', error);
  });
});

async function initializeSite() {
  await loadSharedPartials();
  setupPremiumEntrance();
  setupCurrentYear();
  setupScrollProgress();
  setupHeaderState();
  setupNavigation();
  setupAnchorScroll();
  setupRevealAnimations();
  setupHeroParallax();
  setupScrollStories();
  setupPointerGlow();
  setupLightbox();
  setupInquiryForms();
  handleDeferredScroll();
}

async function loadSharedPartials() {
  const headerSlot = document.getElementById('site-header');
  const footerSlot = document.getElementById('site-footer');

  await Promise.all([
    injectPartial(headerSlot, 'partials/header.html'),
    injectPartial(footerSlot, 'partials/footer.html')
  ]);
}

async function injectPartial(slot, url) {
  if (!slot) return;

  try {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Neuspešno učitavanje: ${url}`);
    slot.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
    slot.innerHTML = getPartialFallback(url);
  }
}

function getPartialFallback(url) {
  if (url.includes('header')) {
    return `
      <aside class="social-rail" aria-label="Društvene mreže">
        <a href="tel:+381643937000" class="social-call" aria-label="Pozovite nas">
          <i class="fas fa-phone-alt" aria-hidden="true"></i>
        </a>
        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Fejsbuk">
          <i class="fab fa-facebook-f" aria-hidden="true"></i>
        </a>
        <a href="https://www.instagram.com/mssjaj.kg?igsh=ZjlzajBydXIxemMy" target="_blank" rel="noreferrer" aria-label="Instagram">
          <i class="fab fa-instagram" aria-hidden="true"></i>
        </a>
      </aside>
      <header class="site-header" id="vrh">
        <div class="shell shell-wide header-shell">
          <a href="index.html" class="brand" aria-label="Početna stranica MS Sjaj">
            <img src="logo.png" alt="MS Sjaj znak" class="brand-logo">
            <span class="brand-copy">
              <strong>MS Sjaj</strong>
              <span>Profesionalne usluge čišćenja</span>
            </span>
          </a>
          <button class="nav-toggle" id="navToggle" type="button" aria-expanded="false" aria-controls="siteNav" aria-label="Otvori navigaciju">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav class="site-nav" id="siteNav" aria-label="Glavna navigacija">
            <a href="index.html">Početna</a>
            <a href="about.html">O nama</a>
            <a href="services.html">Usluge</a>
            <a href="works.html">Naši radovi</a>
            <a href="index.html?scroll=kontakt" class="header-cta">Zatražite ponudu</a>
            <div class="mobile-nav-meta">
              <a href="tel:+381643937000" class="mobile-nav-phone">Pozovite: 064 / 393-7000</a>
              <div class="mobile-nav-socials" aria-label="Društvene mreže">
                <a href="tel:+381643937000" class="social-call" aria-label="Pozovite nas">
                  <i class="fas fa-phone-alt" aria-hidden="true"></i>
                </a>
                <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Fejsbuk">
                  <i class="fab fa-facebook-f" aria-hidden="true"></i>
                </a>
                <a href="https://www.instagram.com/mssjaj.kg?igsh=ZjlzajBydXIxemMy" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <i class="fab fa-instagram" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </nav>
        </div>
      </header>
    `;
  }

  return `
    <footer class="site-footer">
      <div class="shell shell-wide footer-cta-shell">
        <div class="footer-cta-block">
          <p class="footer-cta-kicker">MS Sjaj</p>
          <h2>Zatražite čišćenje koje ostavlja ozbiljan utisak već pri prvom ulasku.</h2>
          <p>
            Javite nam tip prostora i termin koji vam odgovara, a mi ćemo predložiti jasan tok rada,
            uslugu i završnicu koja izgleda profesionalno odmah.
          </p>
          <div class="footer-cta-actions" aria-label="Brze akcije">
            <a href="index.html?scroll=kontakt" class="btn btn-primary">Zatražite ponudu</a>
            <a href="tel:+381643937000" class="btn btn-secondary">Pozovite nas</a>
          </div>
        </div>
      </div>
      <div class="shell shell-wide footer-panel">
        <div class="footer-panel-main">
          <div class="footer-brand-column">
            <a href="index.html" class="footer-brand-mark" aria-label="Početna stranica MS Sjaj">
              <img src="logo.png" alt="MS Sjaj logo">
              <span>
                <strong>MS Sjaj</strong>
                <small>Profesionalne usluge čišćenja</small>
              </span>
            </a>
            <p>
              Dubinsko pranje nameštaja, čišćenje posle radova i kompletne usluge čišćenja za
              stanove, kuće i poslovne prostore u Kragujevcu i okolini.
            </p>
          </div>
          <div class="footer-links-grid">
            <div class="footer-column">
              <h2>Stranice</h2>
              <a href="index.html">Početna</a>
              <a href="about.html">O nama</a>
              <a href="services.html">Usluge</a>
              <a href="works.html">Naši radovi</a>
            </div>
            <div class="footer-column">
              <h2>Usluge</h2>
              <p>Dubinsko čišćenje</p>
              <p>Čišćenje nameštaja</p>
              <p>Čišćenje posle radova</p>
              <p>Poslovni prostori</p>
            </div>
            <div class="footer-column">
              <h2>Kontakt</h2>
              <a href="tel:+381643937000">064 / 393-7000</a>
              <a href="tel:+381655625876">065 / 562-5876</a>
              <a href="mailto:11mssjaj@gmail.com">11mssjaj@gmail.com</a>
              <p>Ponedeljak - Petak · 08:00 - 20:00</p>
              <p>Subota po dogovoru</p>
            </div>
          </div>
        </div>
        <div class="footer-bottom-shell">
          <p>&copy; <span id="currentYear"></span> MS Sjaj. Sva prava zadržana.</p>
          <a href="#vrh" class="footer-top-link">Nazad na vrh</a>
        </div>
      </div>
    </footer>
  `;
}

function setupCurrentYear() {
  const year = document.getElementById('currentYear');
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
}

function setupPremiumEntrance() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('is-loaded');
    return;
  }

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      document.body.classList.add('is-loaded');
    });
  });
}

function setupScrollProgress() {
  if (document.querySelector('.scroll-progress')) return;

  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.innerHTML = '<span></span>';
  document.body.appendChild(progress);

  const bar = progress.querySelector('span');

  const updateProgress = () => {
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const ratio = Math.min(window.scrollY / maxScroll, 1);
    bar.style.transform = `scaleX(${ratio})`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();
}

function setupHeaderState() {
  const updateState = () => {
    document.body.classList.toggle('is-scrolled', window.scrollY > 14);
  };

  window.addEventListener('scroll', updateState, { passive: true });
  updateState();
}

function setupNavigation() {
  const nav = document.getElementById('siteNav');
  const toggle = document.getElementById('navToggle');

  if (nav) {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    nav.querySelectorAll('a').forEach(link => {
      const href = link.getAttribute('href') || '';
      const normalized = href.split('?')[0];
      const isHomeAlias = currentPath === '' && normalized === 'index.html';
      if (normalized === currentPath || isHomeAlias) {
        link.classList.add('is-active');
      }

      link.addEventListener('click', () => {
        closeNavigation(nav, toggle);
      });
    });
  }

  if (!nav || !toggle) return;

  toggle.addEventListener('click', () => {
    const shouldOpen = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', shouldOpen);
    toggle.classList.toggle('is-open', shouldOpen);
    toggle.setAttribute('aria-expanded', String(shouldOpen));
    document.body.classList.toggle('nav-open', shouldOpen);
  });

  document.addEventListener('click', event => {
    if (!nav.classList.contains('is-open')) return;
    if (nav.contains(event.target) || toggle.contains(event.target)) return;
    closeNavigation(nav, toggle);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeNavigation(nav, toggle);
      closeLightbox();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 920) {
      closeNavigation(nav, toggle);
    }
  });
}

function closeNavigation(nav, toggle) {
  if (!nav || !toggle) return;
  nav.classList.remove('is-open');
  toggle.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('nav-open');
}

function setupAnchorScroll() {
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    if (href === '#vrh') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.location.hash !== href) {
        history.replaceState(null, '', href);
      }
      return;
    }

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (window.location.hash !== href) {
      history.replaceState(null, '', href);
    }
  });
}

function setupRevealAnimations() {
  const elements = [...document.querySelectorAll('.reveal')];

  if (!elements.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(element => element.classList.add('is-visible'));
    return;
  }

  revealObserver?.disconnect();
  revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: '0px 0px -10% 0px' }
  );

  elements.forEach(element => revealObserver.observe(element));
}

function setupHeroParallax() {
  const hero = document.querySelector('.hero-section');
  const media = hero?.querySelector('.hero-visual img, .hero-media img, .hero-poster-image');
  if (!hero || !media || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const updateHero = () => {
    const rect = hero.getBoundingClientRect();
    const viewport = window.innerHeight || 1;
    const progress = Math.max(Math.min((viewport - rect.top) / (viewport + rect.height), 1), 0);
    const shift = Math.round(progress * 36);
    hero.style.setProperty('--hero-shift', `${shift}px`);
  };

  window.addEventListener('scroll', updateHero, { passive: true });
  window.addEventListener('resize', updateHero);
  updateHero();
}

function setupScrollStories() {
  const stories = [...document.querySelectorAll('[data-scroll-story]')];
  if (!stories.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const activateStoryStep = (story, index) => {
    const steps = [...story.querySelectorAll('[data-story-step]')];
    const visuals = [...story.querySelectorAll('[data-story-visual]')];

    steps.forEach((step, stepIndex) => {
      step.classList.toggle('is-active', stepIndex === index);
    });

    visuals.forEach((visual, visualIndex) => {
      visual.classList.toggle('is-active', visualIndex === index);
    });
  };

  const updateStory = story => {
    const steps = [...story.querySelectorAll('[data-story-step]')];
    const progress = story.querySelector('[data-story-progress]');
    if (!steps.length) return;

    const desktopMode = window.innerWidth > 1080 && !reducedMotion.matches;
    const viewportAnchor = window.innerHeight * (desktopMode ? 0.44 : 0.52);

    let activeIndex = 0;
    let bestDistance = Number.POSITIVE_INFINITY;

    steps.forEach((step, index) => {
      const rect = step.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const distance = Math.abs(center - viewportAnchor);
      if (distance < bestDistance) {
        bestDistance = distance;
        activeIndex = index;
      }
    });

    activateStoryStep(story, activeIndex);

    if (!progress) return;

    if (!desktopMode) {
      progress.style.transform = 'scaleY(1)';
      return;
    }

    const storyRect = story.getBoundingClientRect();
    const maxTravel = Math.max(storyRect.height - window.innerHeight * 0.7, 1);
    const rawProgress = (viewportAnchor - storyRect.top) / maxTravel;
    const clampedProgress = Math.max(0.18, Math.min(rawProgress, 1));
    progress.style.transform = `scaleY(${clampedProgress})`;
  };

  const updateAllStories = () => {
    stories.forEach(updateStory);
  };

  stories.forEach(story => {
    const steps = [...story.querySelectorAll('[data-story-step]')];
    steps.forEach((step, index) => {
      step.addEventListener('mouseenter', () => {
        if (window.innerWidth <= 1080) return;
        activateStoryStep(story, index);
      });
    });
  });

  window.addEventListener('scroll', updateAllStories, { passive: true });
  window.addEventListener('resize', updateAllStories);
  reducedMotion.addEventListener('change', updateAllStories);
  updateAllStories();
}

function setupPointerGlow() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(hover: hover)').matches) return;

  const targets = [
    '.btn',
    '.services-hero-card',
    '.partner-logo-item',
    '.hero-card-grid article',
    '.services-hero-meta span',
    '.works-hero-proof span'
  ];

  document.querySelectorAll(targets.join(', ')).forEach(element => {
    element.addEventListener('mousemove', event => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      element.style.setProperty('--pointer-x', `${x}px`);
      element.style.setProperty('--pointer-y', `${y}px`);
    });

    element.addEventListener('mouseleave', () => {
      element.style.removeProperty('--pointer-x');
      element.style.removeProperty('--pointer-y');
    });
  });
}

function setupLightbox() {
  const triggers = [...document.querySelectorAll('[data-lightbox-src]')];
  if (!triggers.length) return;

  ensureLightboxMarkup();
  lightboxItems = triggers.map(trigger => ({
    src: trigger.getAttribute('data-lightbox-src') || '',
    caption: trigger.getAttribute('data-lightbox-caption') || '',
    alt: trigger.querySelector('img')?.getAttribute('alt') || 'Pregled slike'
  }));

  triggers.forEach((trigger, index) => {
    trigger.addEventListener('click', event => {
      event.preventDefault();
      openLightbox(index);
    });
  });

  const lightbox = document.getElementById('lightbox');
  const closeButton = document.getElementById('lightboxClose');
  const previousButton = document.getElementById('lightboxPrev');
  const nextButton = document.getElementById('lightboxNext');

  lightbox?.addEventListener('click', event => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  closeButton?.addEventListener('click', closeLightbox);
  previousButton?.addEventListener('click', () => changeLightboxItem(-1));
  nextButton?.addEventListener('click', () => changeLightboxItem(1));
  document.addEventListener('keydown', handleLightboxKeyboard);
}

function ensureLightboxMarkup() {
  if (document.getElementById('lightbox')) return;

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.id = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-labelledby', 'lightboxCaption');
  lightbox.setAttribute('aria-describedby', 'lightboxCounter');
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.setAttribute('tabindex', '-1');
  lightbox.innerHTML = `
    <button class="lightbox-close" id="lightboxClose" type="button" aria-label="Zatvori pregled">&times;</button>
    <button class="lightbox-arrow lightbox-prev" id="lightboxPrev" type="button" aria-label="Prethodna slika">‹</button>
    <div class="lightbox-stage">
      <img id="lightboxImage" src="" alt="Pregled slike">
    </div>
    <button class="lightbox-arrow lightbox-next" id="lightboxNext" type="button" aria-label="Sledeća slika">›</button>
    <div class="lightbox-counter" id="lightboxCounter"></div>
    <div class="lightbox-caption" id="lightboxCaption"></div>
  `;
  document.body.appendChild(lightbox);
}

function openLightbox(index) {
  if (!lightboxItems.length) return;
  activeLightboxIndex = index;
  updateLightbox();

  const lightbox = document.getElementById('lightbox');
  lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  lightbox?.classList.add('is-open');
  lightbox?.setAttribute('aria-hidden', 'false');
  document.body.classList.add('is-modal-open');
  document.getElementById('lightboxClose')?.focus();
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox?.classList.contains('is-open')) return;

  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('is-modal-open');
  lastFocusedElement?.focus?.();
}

function changeLightboxItem(step) {
  if (!lightboxItems.length) return;
  activeLightboxIndex = (activeLightboxIndex + step + lightboxItems.length) % lightboxItems.length;
  updateLightbox();
}

function updateLightbox() {
  const item = lightboxItems[activeLightboxIndex];
  const image = document.getElementById('lightboxImage');
  const counter = document.getElementById('lightboxCounter');
  const caption = document.getElementById('lightboxCaption');
  const previousButton = document.getElementById('lightboxPrev');
  const nextButton = document.getElementById('lightboxNext');

  if (!item || !image || !counter || !caption) return;

  image.src = item.src;
  image.alt = item.alt;
  counter.textContent = `${activeLightboxIndex + 1} / ${lightboxItems.length}`;
  caption.textContent = item.caption;

  const hideControls = lightboxItems.length < 2;
  if (previousButton) previousButton.hidden = hideControls;
  if (nextButton) nextButton.hidden = hideControls;
}

function handleLightboxKeyboard(event) {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox?.classList.contains('is-open')) return;

  if (event.key === 'ArrowRight') {
    event.preventDefault();
    changeLightboxItem(1);
    return;
  }

  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    changeLightboxItem(-1);
    return;
  }

  if (event.key !== 'Tab') return;

  const focusable = [...lightbox.querySelectorAll('button:not([hidden])')];
  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function setupInquiryForms() {
  const forms = [...document.querySelectorAll('[data-inquiry-form]')];
  if (!forms.length) return;

  forms.forEach(form => {
    const submit = form.querySelector('button[type="submit"]');
    const status = form.querySelector('[data-form-status]');

    form.addEventListener('submit', event => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        if (status) {
          status.dataset.state = 'error';
          status.textContent = 'Molimo popunite obavezna polja kako bismo pripremili jasan odgovor.';
        }
        return;
      }

      const data = new FormData(form);
      const context = form.getAttribute('data-form-context') || 'Sajt';
      const name = String(data.get('name') || '').trim();
      const phone = String(data.get('phone') || '').trim();
      const space = String(data.get('space') || '').trim();
      const message = String(data.get('message') || '').trim() || 'Bez dodatne napomene.';
      const details = [
        `Stranica: ${context}`,
        `Ime i prezime: ${name}`,
        `Telefon: ${phone}`,
        `Tip prostora: ${space}`,
        `Poruka: ${message}`
      ].join('\n');

      submit?.setAttribute('disabled', 'true');
      form.classList.add('is-submitting');

      if (status) {
        status.dataset.state = 'success';
        status.textContent = 'Otvaramo email klijent sa pripremljenim upitom. Ako se ne otvori, pozovite nas direktno.';
      }

      const subject = encodeURIComponent(`Upit za uslugu — ${context}`);
      const body = encodeURIComponent(details);
      window.location.href = `mailto:11mssjaj@gmail.com?subject=${subject}&body=${body}`;

      window.setTimeout(() => {
        submit?.removeAttribute('disabled');
        form.classList.remove('is-submitting');
      }, 900);
    });
  });
}

function handleDeferredScroll() {
  const params = new URLSearchParams(window.location.search);
  const targetId = params.get('scroll') || (window.location.hash ? window.location.hash.slice(1) : '');
  if (!targetId) return;

  window.setTimeout(() => {
    const target = document.getElementById(targetId);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 160);
}
