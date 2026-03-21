let revealObserver = null;
let lightboxItems = [];
let activeLightboxIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  initializeSite().catch(error => {
    console.error('Greška pri pokretanju sajta:', error);
  });
});

async function initializeSite() {
  await loadSharedPartials();
  setupCurrentYear();
  setupScrollProgress();
  setupHeaderState();
  setupNavigation();
  setupRevealAnimations();
  setupHeroParallax();
  setupLightbox();
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
  }
}

function setupCurrentYear() {
  const year = document.getElementById('currentYear');
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
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
  const media = hero?.querySelector('.hero-visual img, .hero-media img');
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
}

function ensureLightboxMarkup() {
  if (document.getElementById('lightbox')) return;

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.id = 'lightbox';
  lightbox.setAttribute('aria-hidden', 'true');
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
  lightbox?.classList.add('is-open');
  lightbox?.setAttribute('aria-hidden', 'false');
  document.body.classList.add('is-modal-open');
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox?.classList.contains('is-open')) return;

  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('is-modal-open');
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
