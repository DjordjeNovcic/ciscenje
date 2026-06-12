let lightboxItems = [];
let activeLightboxIndex = 0;
let lastFocusedElement = null;

document.addEventListener('DOMContentLoaded', () => {
  try {
    initializeSite();
  } catch (error) {
    console.error('Greška pri pokretanju sajta:', error);
  }
});

function initializeSite() {
  setupPremiumEntrance();
  setupCurrentYear();
  setupScrollProgress();
  setupHeaderState();
  setupNavigation();
  setupAnchorScroll();
  setupRevealAnimations();
  setupHeroParallax();
  setupScrollStories();
  setupTextParallaxSections();
  setupPointerGlow();
  setupGalleryFilters();
  setupLightbox();
  setupImageComparisons();
  setupInquiryForms();
  setupMagneticButtons();
  handleDeferredScroll();
}

function setupMagneticButtons() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(hover: hover)').matches) return;

  const targets = document.querySelectorAll('.btn-primary, .header-cta');
  targets.forEach(btn => {
    const onMove = event => {
      const rect = btn.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const max = 6;
      const tx = Math.max(-max, Math.min(max, dx * 0.18));
      const ty = Math.max(-max, Math.min(max, dy * 0.18));
      btn.style.setProperty('--magnet-x', `${tx}px`);
      btn.style.setProperty('--magnet-y', `${ty}px`);
    };
    const reset = () => {
      btn.style.setProperty('--magnet-x', '0px');
      btn.style.setProperty('--magnet-y', '0px');
    };
    btn.addEventListener('pointermove', onMove);
    btn.addEventListener('pointerleave', reset);
    btn.addEventListener('blur', reset);
  });
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

function bindScrollUpdate(update) {
  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => {
      scheduled = false;
      update();
    });
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  update();
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

  bindScrollUpdate(updateProgress);
}

function setupHeaderState() {
  const updateState = () => {
    document.body.classList.toggle('is-scrolled', window.scrollY > 14);
  };

  bindScrollUpdate(updateState);
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
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
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

  bindScrollUpdate(updateHero);
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

  bindScrollUpdate(updateAllStories);
  reducedMotion.addEventListener('change', updateAllStories);
}

function setupTextParallaxSections() {
  const sections = [...document.querySelectorAll('[data-text-parallax]')];
  if (!sections.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const mapRange = (value, inMin, inMax, outMin, outMax) => {
    const ratio = clamp((value - inMin) / (inMax - inMin), 0, 1);
    return outMin + (outMax - outMin) * ratio;
  };

  const updateSection = section => {
    const mobileMode = window.innerWidth <= 760 || reducedMotion.matches;
    if (mobileMode) {
      section.style.setProperty('--about-parallax-scale', '1');
      section.style.setProperty('--about-parallax-overlay-y', '0px');
      section.style.setProperty('--about-parallax-overlay-opacity', '1');
      return;
    }

    const rect = section.getBoundingClientRect();
    const viewport = window.innerHeight || 1;
    const progress = clamp((viewport - rect.top) / (viewport + rect.height * 0.35), 0, 1);

    const scale = mapRange(progress, 0, 1, 1, 0.86);
    const overlayY = mapRange(progress, 0, 1, 180, -180);

    let overlayOpacity = 0;
    if (progress <= 0.25) {
      overlayOpacity = mapRange(progress, 0, 0.25, 0, 1);
    } else if (progress <= 0.72) {
      overlayOpacity = 1;
    } else {
      overlayOpacity = mapRange(progress, 0.72, 1, 1, 0);
    }

    section.style.setProperty('--about-parallax-scale', scale.toFixed(3));
    section.style.setProperty('--about-parallax-overlay-y', `${overlayY.toFixed(1)}px`);
    section.style.setProperty('--about-parallax-overlay-opacity', overlayOpacity.toFixed(3));
  };

  const updateAll = () => {
    sections.forEach(updateSection);
  };

  bindScrollUpdate(updateAll);
  reducedMotion.addEventListener('change', updateAll);
}

function setupPointerGlow() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(hover: hover)').matches) return;

  const targets = [
    '.btn',
    '.services-hero-card',
    '.hero-card-grid article',
    '.services-hero-meta span'
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

function setupGalleryFilters() {
  const controls = [...document.querySelectorAll('[data-gallery-filter]')];
  const cards = [...document.querySelectorAll('[data-gallery-category]')];
  if (!controls.length || !cards.length) return;

  const setFilter = filter => {
    controls.forEach(control => {
      const isActive = control.getAttribute('data-gallery-filter') === filter;
      control.classList.toggle('is-active', isActive);
      control.setAttribute('aria-pressed', String(isActive));
    });

    cards.forEach(card => {
      const categories = (card.getAttribute('data-gallery-category') || '').split(/\s+/);
      const shouldShow = filter === 'all' || categories.includes(filter);
      card.classList.toggle('is-filter-hidden', !shouldShow);
    });
  };

  controls.forEach(control => {
    control.setAttribute('aria-pressed', String(control.classList.contains('is-active')));
    control.addEventListener('click', () => {
      setFilter(control.getAttribute('data-gallery-filter') || 'all');
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

function setupImageComparisons() {
  const comparisons = [...document.querySelectorAll('[data-image-comparison]')];
  if (!comparisons.length) return;

  comparisons.forEach(comparison => {
    const range = comparison.querySelector('[data-comparison-range]');
    if (!range) return;

    const initial = Number(comparison.getAttribute('data-initial') || range.value || 50);
    updateImageComparison(comparison, initial);

    range.addEventListener('input', event => {
      updateImageComparison(comparison, Number(event.target.value));
    });

    range.addEventListener('change', event => {
      updateImageComparison(comparison, Number(event.target.value));
    });
  });
}

function updateImageComparison(element, value) {
  const safeValue = Math.min(Math.max(value, 0), 100);
  element.style.setProperty('--comparison-position', `${safeValue}%`);
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

// Web3Forms key is public by design (client-side); submissions are limited
// to the domain registered in the Web3Forms dashboard. If the key is ever
// emptied, the form falls back to opening the user's email client.
const WEB3FORMS_ACCESS_KEY = 'a8025a1b-f58e-442a-a618-00f932fb4dcb';
const INQUIRY_RECIPIENT = '11mssjaj@gmail.com';

function setupInquiryForms() {
  const forms = [...document.querySelectorAll('[data-inquiry-form]')];
  if (!forms.length) return;

  forms.forEach(form => {
    const submit = form.querySelector('button[type="submit"]');
    const status = form.querySelector('[data-form-status]');

    form.addEventListener('submit', async event => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        if (status) {
          status.dataset.state = 'error';
          status.textContent = 'Molimo popunite obavezna polja kako bismo pripremili jasan odgovor.';
        }
        form.classList.remove('is-invalid');
        // re-trigger animation on consecutive invalid submits
        void form.offsetWidth;
        form.classList.add('is-invalid');
        setTimeout(() => form.classList.remove('is-invalid'), 400);
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
        `Šta vam treba: ${space}`,
        `Poruka: ${message}`
      ].join('\n');

      submit?.setAttribute('disabled', 'true');
      form.classList.add('is-submitting');
      if (status) {
        status.dataset.state = 'pending';
        status.textContent = 'Šaljemo upit…';
      }

      const sent = WEB3FORMS_ACCESS_KEY
        ? await sendViaWeb3Forms({ context, name, phone, space, message })
        : false;

      if (sent) {
        if (status) {
          status.dataset.state = 'success';
          status.textContent = 'Upit je poslat. Javljamo se u roku od 24 sata.';
        }
        form.reset();
      } else {
        const subject = encodeURIComponent(`Upit za uslugu — ${context}`);
        const body = encodeURIComponent(details);
        if (status) {
          status.dataset.state = 'pending';
          status.textContent = 'Otvaramo program za poštu: pošaljite poruku da završite upit. Ako se ništa ne otvori, pozovite nas direktno.';
        }
        window.location.href = `mailto:${INQUIRY_RECIPIENT}?subject=${subject}&body=${body}`;
      }

      submit?.removeAttribute('disabled');
      form.classList.remove('is-submitting');
    });
  });
}

async function sendViaWeb3Forms({ context, name, phone, space, message }) {
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `Upit za uslugu — ${context}`,
        from_name: name,
        page: context,
        name,
        phone,
        space,
        message
      })
    });
    const result = await response.json().catch(() => ({}));
    return Boolean(response.ok && result.success);
  } catch {
    return false;
  }
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
