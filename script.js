// Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyAR4ae5zbbqwqgWLRVtbb2V2W3WbwuSCWo",
   authDomain: "mssjaj-20b34.firebaseapp.com",
   projectId: "mssjaj-20b34",
   storageBucket: "mssjaj-20b34.firebasestorage.app",
   messagingSenderId: "52721755434",
   appId: "1:52721755434:web:dc654c159ce6cd226faa53"
};

const IMGBB_API_KEY = '8e1325002347317ddab99277f90754b0';

let galleryImages = [];
let currentLightboxIndex = 0;

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// =====================
// DATA CACHE
// =====================
let servicesCache = null;
let galleryCache = null;
let testimonialsCache = null;
let addonsCache = null;
let homeCache = null;
let aboutCache = null;
let slideshowCache = null;

async function initializeApp() {
   await loadPartials();

   if (document.getElementById('loginForm')) {
      setupAdminLogin();
   }

   if (document.getElementById('adminContent')) {
      setupAdminDashboard();
   }

   setupSidebarNavigation();
   setupMobileBackButton();

   setupThemeInputs();
   setupLightboxOutsideClick();
   setupGoToTopButton();

   loadPublicPageContent();

   deferBelowFoldLoads();

   removePageLoader();
   handleDeferredScroll();
}

function setupMobileBackButton() {
   const btn = document.getElementById('mobileBackBtn');
   if (!btn) return;

   if (location.pathname.endsWith('index.html') || location.pathname === '/') {
      btn.style.display = 'none';
      return;
   }

   // Ako nema history-ja, nema ni back dugmeta
   if (window.history.length <= 1) {
      btn.style.display = 'none';
      return;
   }

   btn.addEventListener('click', () => {
      window.history.back();
   });
}


function setupGoToTopButton() {
   const btn = document.getElementById('goToTopBtn');
   if (!btn) return;

   window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
         btn.classList.add('visible');
      } else {
         btn.classList.remove('visible');
      }
   });

   btn.addEventListener('click', () => {
      window.scrollTo({
         top: 0,
         behavior: 'smooth'
      });
   });
}


function setupPhoneDropdown() {
   const phoneTrigger = document.querySelector('.phone-trigger');
   const phoneWrapper = document.querySelector('.phone-wrapper');
   const navMenu = document.getElementById('navMenu');
   const hamburger = document.getElementById('hamburger');

   if (!phoneTrigger || !phoneWrapper) return;

   phoneTrigger.addEventListener('click', function (e) {
      if (window.innerWidth <= 768) {
         e.stopPropagation();

         // zatvori hamburger meni ako je otvoren
         if (navMenu?.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger?.classList.remove('active');
            document.body.classList.remove('menu-open');
         }

         const isOpen = phoneWrapper.classList.toggle('active');
         document.body.classList.toggle('phone-open', isOpen);
      }
   });

   document.addEventListener('click', function (e) {
      if (window.innerWidth <= 768 && !phoneWrapper.contains(e.target)) {
         phoneWrapper.classList.remove('active');
         document.body.classList.remove('phone-open');
      }
   });

}

function setupThemeInputs() {
   const colorInputs = [
      'primaryColor',
      'primaryDark',
      'secondaryColor',
      'successColor',
      'bgLight',
      'textDark',
      'textLight'
   ];

   colorInputs.forEach(id => {
      const colorInput = document.getElementById(id);
      const textInput = document.getElementById(id + 'Text');

      if (colorInput && textInput) {
         colorInput.addEventListener('input', e => {
            textInput.value = e.target.value;
         });
      }
   });
}


function setupLightboxOutsideClick() {
   const lightbox = document.getElementById('lightbox');
   if (!lightbox) return;

   lightbox.addEventListener('click', function (e) {
      if (e.target === this) {
         closeLightbox();
      }
   });
}

function removePageLoader() {
   document.body.classList.add('loaded');
}

// =====================
// HEADER & FOOTER PARTIALS
// =====================
function loadPartials() {
   const headerEl = document.getElementById('site-header');
   const footerEl = document.getElementById('site-footer');

   const headerPromise = headerEl ?
      fetch('partials/header.html')
      .then(r => r.text())
      .then(html => {
         headerEl.innerHTML = html;
         setupMobileNav();
         setupPhoneDropdown();
         setActiveNavLink();
         setupLanguageSwitcher();
      }) :
      Promise.resolve();

   const footerPromise = footerEl ?
      fetch('partials/footer.html')
      .then(r => r.text())
      .then(html => {
         footerEl.innerHTML = html;
         const yearEl = document.getElementById('currentYear');
         if (yearEl) yearEl.textContent = new Date().getFullYear();
      }) :
      Promise.resolve();

   // ⬅️ KLJUČ: VRATI PROMISE
   return Promise.all([headerPromise, footerPromise]);
}


function shouldLoadSection() {
   return true;
}

function getCachedData(key) {
   const raw = sessionStorage.getItem(key);
   if (!raw) return null;

   try {
      return JSON.parse(raw);
   } catch {
      return null;
   }
}

function setCachedData(key, data) {
   sessionStorage.setItem(key, JSON.stringify(data));
}


// Language Helper Function
function getLocalizedField(item, field) {
   const lang = localStorage.getItem('language') || 'sr';

   // If English, try _en version first
   if (lang === 'en' && item[field + '_en']) {
      return item[field + '_en'];
   }

   // If Serbian, try _sr version first
   if (lang === 'sr' && item[field + '_sr']) {
      return item[field + '_sr'];
   }

   // Fallback to field without suffix
   return item[field] || '';
}

function applyHeroBackgroundFromSlideshow() {
   const landing = document.querySelector('.landing-section');
   if (!landing) return;

   const cached = getCachedData('slideshow');
   if (cached && cached.length > 0) {
      landing.style.backgroundImage = `url('${cached[0]}')`;
      landing.style.backgroundSize = 'cover';
      landing.style.backgroundPosition = 'center';
      landing.style.backgroundRepeat = 'no-repeat';
   }
}

// Helper function to show loading spinner
function showLoading(containerId) {
   const container = document.getElementById(containerId);
   if (!container) return;

   // ✅ AKO JE VEĆ LOADOVANO → NE DIRAJ
   if (container.dataset.loaded === 'true') return;

   // ✅ AKO VEĆ IMA NEKI SADRŽAJ → NE UBACUJ LOADER
   if (container.children.length > 0) return;

   container.innerHTML = `
      <div class="loading-container">
         <div class="loading-spinner"></div>
         <p class="loading-text">
            ${getCurrentLanguage() === 'en' ? 'Loading...' : 'Učitavanje...'}
         </p>
      </div>
   `;
}

// Helper function to show empty state
function showEmptyState(containerId, message) {
   const container = document.getElementById(containerId);
   if (!container) return;

   container.innerHTML = `
          <p style="text-align: center; color: var(--text-light); padding: 2rem; grid-column: 1/-1;">
              ${message}
          </p>
      `;
}

function setupSidebarNavigation() {
   const navItems = document.querySelectorAll('.nav-item');
   const sections = document.querySelectorAll('.content-section');
   navItems.forEach(item => {
      item.addEventListener('click', function () {
         navItems.forEach(nav => nav.classList.remove('active'));
         sections.forEach(section => section.classList.remove('active'));
         this.classList.add('active');
         const sectionId = this.getAttribute('data-section');
         const targetSection = document.getElementById(sectionId);
         if (targetSection) {
            targetSection.classList.add('active');
         }
      });
   });
   const uploadPhotoBtn = document.getElementById('uploadPhotoBtn');
   if (uploadPhotoBtn) {
      uploadPhotoBtn.addEventListener('click', function () {
         document.getElementById('photoInput').click();
      });
   }
}

function setupMobileNav() {
   const hamburger = document.getElementById('hamburger');
   const navMenu = document.getElementById('navMenu');
   const phoneWrapper = document.querySelector('.phone-wrapper');

   if (!hamburger || !navMenu) return;


   const newHamburger = hamburger.cloneNode(true);
   hamburger.parentNode.replaceChild(newHamburger, hamburger);

   newHamburger.addEventListener('click', function (e) {
      e.stopPropagation();


      phoneWrapper?.classList.remove('active');

      const isOpen = navMenu.classList.toggle('active');
      newHamburger.classList.toggle('active', isOpen);
      document.body.classList.toggle('menu-open', isOpen);
   });


   document.addEventListener('click', function (e) {
      if (
         !newHamburger.contains(e.target) &&
         !navMenu.contains(e.target) &&
         !phoneWrapper?.contains(e.target)
      ) {
         navMenu.classList.remove('active');
         newHamburger.classList.remove('active');
         phoneWrapper?.classList.remove('active');
         document.body.classList.remove('menu-open');
      }
   });


   navMenu.querySelectorAll('a[href^="tel:"]').forEach(link => {
      link.addEventListener('click', () => {
         navMenu.classList.remove('active');
         newHamburger.classList.remove('active');
         document.body.classList.remove('menu-open');
      });
   });
}

function loadPublicPageContent() {
   loadHomeContent();
   loadServices();
   loadAboutContent();
   loadTestimonials();
   loadGallery();
   loadAddOns();
   applyHeroBackgroundFromSlideshow();
}

function updateFooterContent() {
   db.collection('contact').doc('info').get().then(function (doc) {
      if (doc.exists) {
         const data = doc.data();
         const phoneElements = document.querySelectorAll('.footer-phone');
         const emailElements = document.querySelectorAll('.footer-email');
         const addressElements = document.querySelectorAll('.footer-address');
         phoneElements.forEach(el => el.textContent = data.phone || '+381 XX XXX XXXX');
         emailElements.forEach(el => el.textContent = data.email || 'info@mssjaj.rs');
         addressElements.forEach(el => el.textContent = data.address || 'Kragujevac, Srbija');
      }
   });
}

function setupAdminLogin() {
   const loginForm = document.getElementById('loginForm');
   if (!loginForm) return;
   loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');
      if (!emailInput || !passwordInput) return;
      const email = emailInput.value;
      const password = passwordInput.value;
      auth.signInWithEmailAndPassword(email, password)
         .then(function () {
            window.location.href = 'admin-dashboard.html';
         })
         .catch(function (error) {
            alert('Greska pri prijavi: ' + error.message);
         });
   });
}

function setupAdminDashboard() {
   auth.onAuthStateChanged(function (user) {
      if (!user) {
         window.location.href = 'admin-login.html';
         return;
      }
      loadAdminContent();
      setupAdminForms();
   });
}

function setupLogout() {
   const logoutBtn = document.getElementById('logoutBtn');
   if (logoutBtn) {
      logoutBtn.addEventListener('click', function (e) {
         e.preventDefault();
         auth.signOut().then(function () {
            window.location.href = 'admin-login.html';
         });
      });
   }
}

function loadAdminContent() {
   loadHomeContentAdmin();
   loadServicesAdmin();
   loadAboutContentAdmin();
   loadTestimonialsAdmin();
   loadGalleryAdmin();
   loadContactAdmin();
   loadAddOnsAdmin();
   loadSlideshowAdmin();
   setupLogout();
}

// ============================================
// HOME CONTENT
// ============================================

function loadHomeContent() {
   if (!shouldLoadSection('home')) return;

   const featuresGrid = document.getElementById('featuresGrid');
   if (!featuresGrid) return;

   // ✅ SESSION STORAGE CACHE
   const cached = getCachedData('home');
   if (cached) {
      homeCache = cached;
      renderHomeContent(cached);
      return;
   }

   // fallback na memory cache
   if (homeCache) {
      renderHomeContent(homeCache);
      return;
   }

   showLoading('featuresGrid');

   db.collection('content').doc('home').get()
      .then(doc => {
         if (!doc.exists) return;

         const data = doc.data();

         homeCache = data;
         setCachedData('home', data); // ✅ OVO JE KLJUČNO

         renderHomeContent(data);
      })
      .catch(error => {
         console.error(error);
      });
}


function renderHomeContent(data) {
   const heroHeading = document.getElementById('heroHeading');
   const heroText = document.getElementById('heroText');
   const featuresGrid = document.getElementById('featuresGrid');

   if (!featuresGrid) return;

   if (heroHeading) {
      heroHeading.className = 'fade-in';
      heroHeading.textContent = getLocalizedField(data, 'heroHeading') || '';
   }

   if (heroText) {
      heroText.className = 'fade-in';
      heroText.textContent = getLocalizedField(data, 'heroText') || '';
   }

   const features = data.features || [];
   featuresGrid.innerHTML = '';

   if (!features.length) {
      showEmptyState('featuresGrid', 'Trenutno nema dostupnih karakteristika.');
      return;
   }

   features.forEach((feature, index) => {
      const card = document.createElement('div');
      card.className = 'feature-card fade-in';
      card.style.animationDelay = (index * 0.1) + 's';

      card.innerHTML = `
         <div class="feature-icon">${feature.icon}</div>
         <h3>${getLocalizedField(feature, 'title')}</h3>
         <p>${getLocalizedField(feature, 'description')}</p>
      `;

      featuresGrid.appendChild(card);
   });

   // ✅ OVO DODAJEŠ
   featuresGrid.dataset.loaded = 'true';
}

function loadHomeContentAdmin() {
   const heroHeadingSr = document.getElementById('heroHeading_sr');
   const heroHeadingEn = document.getElementById('heroHeading_en');
   const heroTextSr = document.getElementById('heroText_sr');
   const heroTextEn = document.getElementById('heroText_en');
   const featuresContainer = document.getElementById('featuresContainer');

   if (!heroHeadingSr || !heroTextSr) return;

   db.collection('content').doc('home').get().then(function (doc) {
      if (doc.exists) {
         const data = doc.data();

         // Load Serbian fields
         heroHeadingSr.value = data.heroHeading_sr || '';
         heroTextSr.value = data.heroText_sr || '';

         // Load English fields
         if (heroHeadingEn) heroHeadingEn.value = data.heroHeading_en || '';
         if (heroTextEn) heroTextEn.value = data.heroText_en || '';

         const features = data.features || [];
         if (featuresContainer) {
            featuresContainer.innerHTML = '';
            features.forEach(function (feature, index) {
               addFeatureItem(featuresContainer, feature, index);
            });
         }
      }
   });
}

function addFeatureItem(container, feature, index) {
   const icons = ['✨', '🌿', '📅', '⭐', '💼', '🏠', '💚', '🤝', '🧹', '🧼', '✅', '🎯'];

   const featureDiv = document.createElement('div');
   featureDiv.className = 'feature-item';
   featureDiv.style.cssText = 'background: var(--bg-light); padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem;';

   const iconGroup = document.createElement('div');
   iconGroup.className = 'form-group';
   const iconLabel = document.createElement('label');
   iconLabel.textContent = 'Ikona';
   const iconSelect = document.createElement('select');
   iconSelect.setAttribute('data-index', index);
   iconSelect.setAttribute('data-field', 'icon');
   iconSelect.style.fontSize = '1.5rem';
   icons.forEach(function (icon) {
      const option = document.createElement('option');
      option.value = icon;
      option.textContent = icon;
      if (feature && feature.icon === icon) {
         option.selected = true;
      }
      iconSelect.appendChild(option);
   });
   iconGroup.appendChild(iconLabel);
   iconGroup.appendChild(iconSelect);

   // Serbian Title
   const titleGroupSr = document.createElement('div');
   titleGroupSr.className = 'form-group';
   const titleLabelSr = document.createElement('label');
   titleLabelSr.textContent = 'Naslov (Srpski)';
   const titleInputSr = document.createElement('input');
   titleInputSr.type = 'text';
   titleInputSr.value = feature ? (feature.title_sr || '') : '';
   titleInputSr.setAttribute('data-index', index);
   titleInputSr.setAttribute('data-field', 'title_sr');
   titleInputSr.placeholder = 'Naslov';
   titleGroupSr.appendChild(titleLabelSr);
   titleGroupSr.appendChild(titleInputSr);

   // English Title
   const titleGroupEn = document.createElement('div');
   titleGroupEn.className = 'form-group';
   const titleLabelEn = document.createElement('label');
   titleLabelEn.textContent = 'Naslov (English)';
   const titleInputEn = document.createElement('input');
   titleInputEn.type = 'text';
   titleInputEn.value = feature ? (feature.title_en || '') : '';
   titleInputEn.setAttribute('data-index', index);
   titleInputEn.setAttribute('data-field', 'title_en');
   titleInputEn.placeholder = 'Title';
   titleGroupEn.appendChild(titleLabelEn);
   titleGroupEn.appendChild(titleInputEn);

   // Serbian Description
   const descGroupSr = document.createElement('div');
   descGroupSr.className = 'form-group';
   const descLabelSr = document.createElement('label');
   descLabelSr.textContent = 'Opis (Srpski)';
   const descTextareaSr = document.createElement('textarea');
   descTextareaSr.rows = 2;
   descTextareaSr.value = feature ? (feature.description_sr || '') : '';
   descTextareaSr.setAttribute('data-index', index);
   descTextareaSr.setAttribute('data-field', 'description_sr');
   descTextareaSr.placeholder = 'Opis';
   descGroupSr.appendChild(descLabelSr);
   descGroupSr.appendChild(descTextareaSr);

   // English Description
   const descGroupEn = document.createElement('div');
   descGroupEn.className = 'form-group';
   const descLabelEn = document.createElement('label');
   descLabelEn.textContent = 'Opis (English)';
   const descTextareaEn = document.createElement('textarea');
   descTextareaEn.rows = 2;
   descTextareaEn.value = feature ? (feature.description_en || '') : '';
   descTextareaEn.setAttribute('data-index', index);
   descTextareaEn.setAttribute('data-field', 'description_en');
   descTextareaEn.placeholder = 'Description';
   descGroupEn.appendChild(descLabelEn);
   descGroupEn.appendChild(descTextareaEn);

   const deleteBtn = document.createElement('button');
   deleteBtn.type = 'button';
   deleteBtn.className = 'btn';
   deleteBtn.textContent = 'Obrisi karakteristiku';
   deleteBtn.style.cssText = 'background: var(--danger-color); color: white; width: 100%;';
   deleteBtn.onclick = function () {
      removeFeature(index);
   };

   featureDiv.appendChild(iconGroup);
   featureDiv.appendChild(titleGroupSr);
   featureDiv.appendChild(titleGroupEn);
   featureDiv.appendChild(descGroupSr);
   featureDiv.appendChild(descGroupEn);
   featureDiv.appendChild(deleteBtn);
   container.appendChild(featureDiv);
}

function addFeature() {
   const container = document.getElementById('featuresContainer');
   const index = container.children.length;
   addFeatureItem(container, null, index);
}

function removeFeature(index) {
   const container = document.getElementById('featuresContainer');
   if (container.children[index]) {
      container.children[index].remove();
   }
   Array.from(container.children).forEach(function (child, i) {
      child.querySelectorAll('[data-index]').forEach(function (el) {
         el.setAttribute('data-index', i);
      });
      const button = child.querySelector('button');
      if (button) {
         button.onclick = function () {
            removeFeature(i);
         };
      }
   });
}

// ============================================
// SERVICES
// ============================================

function loadServices() {
   if (!shouldLoadSection('services')) return;

   const servicesGrid = document.getElementById('servicesGrid');
   if (!servicesGrid) return;

   // 1️⃣ sessionStorage cache
   const cached = getCachedData('services');
   if (cached) {
      servicesCache = cached;
      renderServices(cached);
      return;
   }

   showLoading('servicesGrid');

   db.collection('services').get()
      .then(snapshot => {
         const services = [];
         snapshot.forEach(doc => services.push({
            id: doc.id,
            ...doc.data()
         }));

         // 2️⃣ upis u oba cache-a
         servicesCache = services;
         setCachedData('services', services);

         renderServices(services);
      })
      .catch(err => {
         console.error(err);
         servicesGrid.innerHTML = '<p>Greška pri učitavanju</p>';
      });
}


function renderServices(services) {
   const servicesGrid = document.getElementById('servicesGrid');
   if (!servicesGrid) return;

   servicesGrid.innerHTML = '';

   if (services.length === 0) {
      showEmptyState('servicesGrid', 'Trenutno nema dostupnih usluga.');
      return;
   }

   services.forEach(function (service, index) {
      const card = document.createElement('div');
      card.className = 'pricing-card fade-in';
      card.style.animationDelay = (index * 0.1) + 's';

      // ⭐ featured middle card
      if (services.length >= 3 && index === 1) {
         card.classList.add('featured');
      }

      const h3 = document.createElement('h3');
      h3.textContent = getLocalizedField(service, 'name');

      const price = document.createElement('span');
      price.className = 'service-price';
      price.textContent = getLocalizedField(service, 'price') + ' RSD';

      const divider = document.createElement('div');
      divider.className = 'features-divider';

      const descList = document.createElement('ul');
      descList.className = 'service-features';

      (getLocalizedField(service, 'description') || '')
      .split('\n')
         .map(line => line.trim())
         .filter(Boolean)
         .forEach(text => {
            const li = document.createElement('li');
            li.textContent = text;
            descList.appendChild(li);
         });

      const ctaBtn = document.createElement('a');
      ctaBtn.href = 'index.html?scroll=cta-contact';
      ctaBtn.className = 'btn';
      ctaBtn.textContent =
         getCurrentLanguage() === 'en' ?
         'Book now' :
         'Zakaži termin';

      card.append(h3, price, divider, descList, ctaBtn);
      servicesGrid.appendChild(card);
   });
   servicesGrid.dataset.loaded = 'true';
}


function loadServicesAdmin() {
   const servicesList = document.getElementById('servicesList');
   if (!servicesList) return;
   db.collection('services').get().then(function (querySnapshot) {
      servicesList.innerHTML = '';
      querySnapshot.forEach(function (doc) {
         const service = doc.data();
         const div = document.createElement('div');
         div.className = 'service-item';
         const h4 = document.createElement('h4');
         h4.textContent = service.name_sr || 'N/A';
         const p1 = document.createElement('div');
         p1.className = 'service-description';
         p1.textContent =
            (service.description_sr || 'N/A')
            .split('\n')
            .slice(0, 2)
            .join(' • ') + '...';
         p1.style.marginBottom = '10px';
         const p2 = document.createElement('p');
         p2.className = 'service-price';
         const strong = document.createElement('strong');
         strong.textContent = 'SR: ' + (service.price_sr || 'N/A') + ' | EN: ' + (service.price_en || 'N/A');
         p2.appendChild(strong);
         const editBtn = document.createElement('button');
         editBtn.textContent = 'Izmeni';
         editBtn.onclick = function () {
            editService(doc.id);
         };
         const deleteBtn = document.createElement('button');
         deleteBtn.textContent = 'Obrisi';
         deleteBtn.onclick = function () {
            deleteService(doc.id);
         };
         div.appendChild(h4);
         div.appendChild(p1);
         div.appendChild(p2);
         div.appendChild(editBtn);
         div.appendChild(document.createTextNode(' '));
         div.appendChild(deleteBtn);
         servicesList.appendChild(div);
      });
   });
}

function showServiceModal(serviceId) {
   const modal = document.getElementById('serviceModal');
   const form = document.getElementById('serviceForm');
   const modalTitle = document.getElementById('serviceModalTitle');

   if (serviceId) {
      modalTitle.textContent = 'Uredi uslugu';
      db.collection('services').doc(serviceId).get().then(function (doc) {
         if (doc.exists) {
            const service = doc.data();

            // Load Serbian fields
            document.getElementById('serviceName_sr').value = service.name_sr || '';
            document.getElementById('serviceDescription_sr').value = service.description_sr || '';
            document.getElementById('servicePrice_sr').value = service.price_sr || '';

            // Load English fields
            document.getElementById('serviceName_en').value = service.name_en || '';
            document.getElementById('serviceDescription_en').value = service.description_en || '';
            document.getElementById('servicePrice_en').value = service.price_en || '';

            form.dataset.serviceId = serviceId;
         }
      });
   } else {
      modalTitle.textContent = 'Dodaj uslugu';
      form.reset();
      delete form.dataset.serviceId;
   }
   modal.style.display = 'flex';
}

function closeServiceModal() {
   document.getElementById('serviceModal').style.display = 'none';
}

function saveService() {
   const form = document.getElementById('serviceForm');

   const serviceData = {
      name_sr: document.getElementById('serviceName_sr').value,
      description_sr: document.getElementById('serviceDescription_sr').value,
      price_sr: document.getElementById('servicePrice_sr').value,
      name_en: document.getElementById('serviceName_en').value,
      description_en: document.getElementById('serviceDescription_en').value,
      price_en: document.getElementById('servicePrice_en').value
   };

   const serviceId = form.dataset.serviceId;
   if (serviceId) {
      db.collection('services').doc(serviceId).update(serviceData).then(function () {
         servicesCache = null;
         closeServiceModal();
         loadServicesAdmin();
         alert('Usluga je azurirana!');
      });
   } else {
      db.collection('services').add(serviceData).then(function () {
         servicesCache = null;
         closeServiceModal();
         loadServicesAdmin();
         alert('Usluga je dodata!');
      });
   }
}

function editService(serviceId) {
   showServiceModal(serviceId);
}

function deleteService(serviceId) {
   if (confirm('Da li ste sigurni da zelite da obrisete ovu uslugu?')) {
      db.collection('services').doc(serviceId).delete().then(function () {
         servicesCache = null;
         loadServicesAdmin();
         alert('Usluga je obrisana!');
      });
   }
}

// ============================================
// ABOUT CONTENT
// ============================================

function loadAboutContent() {
   if (!shouldLoadSection('about')) return;

   const cached = getCachedData('about');
   if (cached) {
      aboutCache = cached;
      renderAboutContent(cached);
      return;
   }

   if (aboutCache) {
      renderAboutContent(aboutCache);
      return;
   }

   db.collection('content').doc('about').get().then(doc => {
      if (!doc.exists) return;

      aboutCache = doc.data();
      setCachedData('about', aboutCache);

      renderAboutContent(aboutCache);
   });
}


function loadAboutContentAdmin() {
   const aboutHeadingSr = document.getElementById('aboutHeading_sr');
   const aboutHeadingEn = document.getElementById('aboutHeading_en');
   const aboutTextSr = document.getElementById('aboutText_sr');
   const aboutTextEn = document.getElementById('aboutText_en');
   const statsContainer = document.getElementById('statsContainer');
   const reasonsContainer = document.getElementById('reasonsContainer');

   if (!aboutHeadingSr || !aboutTextSr) return;

   db.collection('content').doc('about').get().then(function (doc) {
      if (doc.exists) {
         const data = doc.data();

         // Load Serbian fields
         aboutHeadingSr.value = data.heading_sr || '';
         aboutTextSr.value = data.text_sr || '';

         // Load English fields
         if (aboutHeadingEn) aboutHeadingEn.value = data.heading_en || '';
         if (aboutTextEn) aboutTextEn.value = data.text_en || '';

         // Load stats
         if (statsContainer) {
            statsContainer.innerHTML = '';
            const stats = data.stats || [];
            stats.forEach(function (stat, index) {
               addStatItem(statsContainer, stat, index);
            });
         }

         // Load reasons
         if (reasonsContainer) {
            reasonsContainer.innerHTML = '';
            const reasons = data.reasons || [];
            reasons.forEach(function (reason, index) {
               addReasonItem(reasonsContainer, reason, index);
            });
         }
      }
   });
}

function renderAboutContent(data) {
   const aboutHeading = document.getElementById('aboutHeading');
   const aboutText = document.getElementById('aboutText');

   if (aboutHeading && aboutText) {
      aboutHeading.className = 'fade-in';
      aboutText.className = 'fade-in story-text';
      aboutHeading.textContent = getLocalizedField(data, 'heading');
      aboutText.textContent = getLocalizedField(data, 'text');
   }

   // stats
   const statsSection = document.querySelector('.stats-section');
   if (statsSection && data.stats) {
      statsSection.innerHTML = '';

      data.stats.forEach((stat, index) => {
         const box = document.createElement('div');
         box.className = 'stat-box fade-in';
         box.style.animationDelay = `${index * 0.1}s`;
         box.innerHTML = `
            <div class="stat-number">${stat.number}</div>
            <div class="stat-label">${getLocalizedField(stat, 'label')}</div>
         `;
         statsSection.appendChild(box);
      });

      // ✅ DODATI
      statsSection.dataset.loaded = 'true';
   }

   // reasons
   const reasonsGrid = document.querySelector('.reasons-grid');
   if (reasonsGrid && data.reasons) {
      reasonsGrid.innerHTML = '';

      data.reasons.forEach((reason, index) => {
         const card = document.createElement('div');
         card.className = 'reason-card fade-in';
         card.style.animationDelay = `${index * 0.1}s`;
         card.innerHTML = `
            <div class="reason-icon">${reason.icon}</div>
            <h3>${getLocalizedField(reason, 'title')}</h3>
            <p>${getLocalizedField(reason, 'description')}</p>
         `;
         reasonsGrid.appendChild(card);
      });

      // ✅ DODATI
      reasonsGrid.dataset.loaded = 'true';
   }
}


function addStatItem(container, stat, index) {
   const statDiv = document.createElement('div');
   statDiv.className = 'feature-item';
   statDiv.style.cssText = 'background: var(--bg-light); padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem;';

   const numberGroup = document.createElement('div');
   numberGroup.className = 'form-group';
   const numberLabel = document.createElement('label');
   numberLabel.textContent = 'Broj/Vrednost (npr. 500+, 10, 100%, 24/7)';
   const numberInput = document.createElement('input');
   numberInput.type = 'text';
   numberInput.value = stat ? (stat.number || '') : '';
   numberInput.setAttribute('data-index', index);
   numberInput.setAttribute('data-field', 'number');
   numberInput.placeholder = 'npr. 500+';
   numberGroup.appendChild(numberLabel);
   numberGroup.appendChild(numberInput);

   // Serbian Label
   const labelGroupSr = document.createElement('div');
   labelGroupSr.className = 'form-group';
   const labelLabelSr = document.createElement('label');
   labelLabelSr.textContent = 'Oznaka (Srpski)';
   const labelInputSr = document.createElement('input');
   labelInputSr.type = 'text';
   labelInputSr.value = stat ? (stat.label_sr || '') : '';
   labelInputSr.setAttribute('data-index', index);
   labelInputSr.setAttribute('data-field', 'label_sr');
   labelInputSr.placeholder = 'npr. Zadovoljnih klijenata';
   labelGroupSr.appendChild(labelLabelSr);
   labelGroupSr.appendChild(labelInputSr);

   // English Label
   const labelGroupEn = document.createElement('div');
   labelGroupEn.className = 'form-group';
   const labelLabelEn = document.createElement('label');
   labelLabelEn.textContent = 'Oznaka (English)';
   const labelInputEn = document.createElement('input');
   labelInputEn.type = 'text';
   labelInputEn.value = stat ? (stat.label_en || '') : '';
   labelInputEn.setAttribute('data-index', index);
   labelInputEn.setAttribute('data-field', 'label_en');
   labelInputEn.placeholder = 'e.g. Satisfied Clients';
   labelGroupEn.appendChild(labelLabelEn);
   labelGroupEn.appendChild(labelInputEn);

   const deleteBtn = document.createElement('button');
   deleteBtn.type = 'button';
   deleteBtn.className = 'btn';
   deleteBtn.textContent = 'Obriši statistiku';
   deleteBtn.style.cssText = 'background: var(--danger-color); color: white; width: 100%;';
   deleteBtn.onclick = function () {
      removeStat(index);
   };

   statDiv.appendChild(numberGroup);
   statDiv.appendChild(labelGroupSr);
   statDiv.appendChild(labelGroupEn);
   statDiv.appendChild(deleteBtn);
   container.appendChild(statDiv);
}

function addStat() {
   const container = document.getElementById('statsContainer');
   const index = container.children.length;
   addStatItem(container, null, index);
}

function removeStat(index) {
   const container = document.getElementById('statsContainer');
   if (container.children[index]) {
      container.children[index].remove();
   }
   Array.from(container.children).forEach(function (child, i) {
      child.querySelectorAll('[data-index]').forEach(function (el) {
         el.setAttribute('data-index', i);
      });
      const button = child.querySelector('button');
      if (button) {
         button.onclick = function () {
            removeStat(i);
         };
      }
   });
}

function addReasonItem(container, reason, index) {
   const icons = ['✨', '🌿', '💎', '⏰', '🛡️', '💰', '⭐', '🤝', '💚', '🏆', '🎯', '📊'];

   const reasonDiv = document.createElement('div');
   reasonDiv.className = 'feature-item';
   reasonDiv.style.cssText = 'background: var(--bg-light); padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem;';

   const iconGroup = document.createElement('div');
   iconGroup.className = 'form-group';
   const iconLabel = document.createElement('label');
   iconLabel.textContent = 'Ikona';
   const iconSelect = document.createElement('select');
   iconSelect.setAttribute('data-index', index);
   iconSelect.setAttribute('data-field', 'icon');
   iconSelect.style.fontSize = '1.5rem';
   icons.forEach(function (icon) {
      const option = document.createElement('option');
      option.value = icon;
      option.textContent = icon;
      if (reason && reason.icon === icon) {
         option.selected = true;
      }
      iconSelect.appendChild(option);
   });
   iconGroup.appendChild(iconLabel);
   iconGroup.appendChild(iconSelect);

   // Serbian Title
   const titleGroupSr = document.createElement('div');
   titleGroupSr.className = 'form-group';
   const titleLabelSr = document.createElement('label');
   titleLabelSr.textContent = 'Naslov (Srpski)';
   const titleInputSr = document.createElement('input');
   titleInputSr.type = 'text';
   titleInputSr.value = reason ? (reason.title_sr || '') : '';
   titleInputSr.setAttribute('data-index', index);
   titleInputSr.setAttribute('data-field', 'title_sr');
   titleInputSr.placeholder = 'Naslov razloga';
   titleGroupSr.appendChild(titleLabelSr);
   titleGroupSr.appendChild(titleInputSr);

   // English Title
   const titleGroupEn = document.createElement('div');
   titleGroupEn.className = 'form-group';
   const titleLabelEn = document.createElement('label');
   titleLabelEn.textContent = 'Naslov (English)';
   const titleInputEn = document.createElement('input');
   titleInputEn.type = 'text';
   titleInputEn.value = reason ? (reason.title_en || '') : '';
   titleInputEn.setAttribute('data-index', index);
   titleInputEn.setAttribute('data-field', 'title_en');
   titleInputEn.placeholder = 'Reason title';
   titleGroupEn.appendChild(titleLabelEn);
   titleGroupEn.appendChild(titleInputEn);

   // Serbian Description
   const descGroupSr = document.createElement('div');
   descGroupSr.className = 'form-group';
   const descLabelSr = document.createElement('label');
   descLabelSr.textContent = 'Opis (Srpski)';
   const descTextareaSr = document.createElement('textarea');
   descTextareaSr.rows = 3;
   descTextareaSr.value = reason ? (reason.description_sr || '') : '';
   descTextareaSr.setAttribute('data-index', index);
   descTextareaSr.setAttribute('data-field', 'description_sr');
   descTextareaSr.placeholder = 'Opis razloga';
   descGroupSr.appendChild(descLabelSr);
   descGroupSr.appendChild(descTextareaSr);

   // English Description
   const descGroupEn = document.createElement('div');
   descGroupEn.className = 'form-group';
   const descLabelEn = document.createElement('label');
   descLabelEn.textContent = 'Opis (English)';
   const descTextareaEn = document.createElement('textarea');
   descTextareaEn.rows = 3;
   descTextareaEn.value = reason ? (reason.description_en || '') : '';
   descTextareaEn.setAttribute('data-index', index);
   descTextareaEn.setAttribute('data-field', 'description_en');
   descTextareaEn.placeholder = 'Reason description';
   descGroupEn.appendChild(descLabelEn);
   descGroupEn.appendChild(descTextareaEn);

   const deleteBtn = document.createElement('button');
   deleteBtn.type = 'button';
   deleteBtn.className = 'btn';
   deleteBtn.textContent = 'Obriši razlog';
   deleteBtn.style.cssText = 'background: var(--danger-color); color: white; width: 100%;';
   deleteBtn.onclick = function () {
      removeReason(index);
   };

   reasonDiv.appendChild(iconGroup);
   reasonDiv.appendChild(titleGroupSr);
   reasonDiv.appendChild(titleGroupEn);
   reasonDiv.appendChild(descGroupSr);
   reasonDiv.appendChild(descGroupEn);
   reasonDiv.appendChild(deleteBtn);
   container.appendChild(reasonDiv);
}

function addReason() {
   const container = document.getElementById('reasonsContainer');
   const index = container.children.length;
   if (index >= 6) {
      alert('Možete dodati maksimalno 6 razloga.');
      return;
   }
   addReasonItem(container, null, index);
}

function removeReason(index) {
   const container = document.getElementById('reasonsContainer');
   if (container.children[index]) {
      container.children[index].remove();
   }
   Array.from(container.children).forEach(function (child, i) {
      child.querySelectorAll('[data-index]').forEach(function (el) {
         el.setAttribute('data-index', i);
      });
      const button = child.querySelector('button');
      if (button) {
         button.onclick = function () {
            removeReason(i);
         };
      }
   });
}

function saveAboutContent() {
   const statsContainer = document.getElementById('statsContainer');
   const reasonsContainer = document.getElementById('reasonsContainer');

   const stats = [];
   const reasons = [];

   // Collect stats
   if (statsContainer) {
      statsContainer.querySelectorAll('.feature-item').forEach(function (item) {
         stats.push({
            number: item.querySelector('[data-field="number"]').value,
            label_sr: item.querySelector('[data-field="label_sr"]').value,
            label_en: item.querySelector('[data-field="label_en"]').value
         });
      });
   }

   // Collect reasons
   if (reasonsContainer) {
      reasonsContainer.querySelectorAll('.feature-item').forEach(function (item) {
         reasons.push({
            icon: item.querySelector('[data-field="icon"]').value,
            title_sr: item.querySelector('[data-field="title_sr"]').value,
            title_en: item.querySelector('[data-field="title_en"]').value,
            description_sr: item.querySelector('[data-field="description_sr"]').value,
            description_en: item.querySelector('[data-field="description_en"]').value
         });
      });
   }

   db.collection('content').doc('about').set({
      heading_sr: document.getElementById('aboutHeading_sr').value,
      heading_en: document.getElementById('aboutHeading_en').value,
      text_sr: document.getElementById('aboutText_sr').value,
      text_en: document.getElementById('aboutText_en').value,
      stats: stats,
      reasons: reasons
   }).then(function () {
      aboutCache = null;
      alert('Sadržaj O nama stranice je sačuvan!');
   });
}

// ============================================
// TESTIMONIALS
// ============================================

function loadTestimonials() {
   if (!shouldLoadSection('testimonials')) return;

   const testimonialsGrid = document.getElementById('testimonialsGrid');
   if (!testimonialsGrid) return;

   // ✅ sessionStorage cache
   const cached = getCachedData('testimonials');
   if (cached) {
      testimonialsCache = cached;
      renderTestimonials(cached);
      return;
   }

   // fallback memory cache
   if (testimonialsCache) {
      renderTestimonials(testimonialsCache);
      return;
   }

   showLoading('testimonialsGrid');

   db.collection('testimonials').get()
      .then(snapshot => {
         const testimonials = [];
         snapshot.forEach(doc => {
            testimonials.push({
               id: doc.id,
               ...doc.data()
            });
         });

         testimonialsCache = testimonials;
         setCachedData('testimonials', testimonials); // ✅ OVO FALI

         renderTestimonials(testimonials);
      })
      .catch(error => {
         console.error(error);
         testimonialsGrid.innerHTML = '<p>Greška pri učitavanju</p>';
      });
}


function renderTestimonials(testimonials) {
   const testimonialsGrid = document.getElementById('testimonialsGrid');
   testimonialsGrid.innerHTML = '';

   if (!testimonials.length) {
      showEmptyState('testimonialsGrid', 'Trenutno nema recenzija.');
      return;
   }

   testimonials.forEach((testimonial, index) => {
      const card = document.createElement('div');
      card.className = 'testimonial-card fade-in';
      card.style.animationDelay = (index * 0.1) + 's';

      card.innerHTML = `
      <p class="testimonial-text">${getLocalizedField(testimonial, 'text')}</p>
      <div class="testimonial-rating">${'★'.repeat(testimonial.rating || 5)}</div>
      <strong>${testimonial.author}</strong>
    `;

      testimonialsGrid.appendChild(card);
   });
   testimonialsGrid.dataset.loaded = 'true';
}

function loadTestimonialsAdmin() {
   const testimonialsList = document.getElementById('testimonialsList');
   if (!testimonialsList) return;
   db.collection('testimonials').get().then(function (querySnapshot) {
      testimonialsList.innerHTML = '';
      querySnapshot.forEach(function (doc) {
         const testimonial = doc.data();
         const div = document.createElement('div');
         div.className = 'testimonial-item';
         const contentDiv = document.createElement('div');
         contentDiv.className = 'testimonial-content';

         const p1 = document.createElement('p');
         p1.textContent = '"' + (testimonial.text_sr || 'N/A') + '"';

         const ratingP = document.createElement('p');
         const ratingValue = testimonial.rating || 5;
         const fullStars = '★'.repeat(ratingValue);
         const emptyStars = '☆'.repeat(5 - ratingValue);
         ratingP.innerHTML = '<strong>Ocena:</strong> ' + fullStars + emptyStars;
         ratingP.style.color = '#fbbf24';
         ratingP.style.fontSize = '1.2rem';

         const p2 = document.createElement('p');
         p2.className = 'testimonial-author';
         p2.textContent = '- ' + testimonial.author;

         contentDiv.appendChild(p1);
         contentDiv.appendChild(ratingP);
         contentDiv.appendChild(p2);

         const actionsDiv = document.createElement('div');
         actionsDiv.className = 'testimonial-actions';
         const editBtn = document.createElement('button');
         editBtn.textContent = 'Izmeni';
         editBtn.onclick = function () {
            editTestimonial(doc.id);
         };
         const deleteBtn = document.createElement('button');
         deleteBtn.textContent = 'Obrisi';
         deleteBtn.onclick = function () {
            deleteTestimonial(doc.id);
         };
         actionsDiv.appendChild(editBtn);
         actionsDiv.appendChild(deleteBtn);
         div.appendChild(contentDiv);
         div.appendChild(actionsDiv);
         testimonialsList.appendChild(div);
      });
   });
}

function showTestimonialModal(testimonialId) {
   const modal = document.getElementById('testimonialModal');
   const form = document.getElementById('testimonialForm');
   if (testimonialId) {
      db.collection('testimonials').doc(testimonialId).get().then(function (doc) {
         if (doc.exists) {
            const testimonial = doc.data();
            document.getElementById('testimonialText_sr').value = testimonial.text_sr || '';
            document.getElementById('testimonialText_en').value = testimonial.text_en || '';
            document.getElementById('testimonialAuthor').value = testimonial.author || '';
            document.getElementById('testimonialRating').value = testimonial.rating || 5;
            form.dataset.testimonialId = testimonialId;
         }
      });
   } else {
      form.reset();
      document.getElementById('testimonialRating').value = 5;
      delete form.dataset.testimonialId;
   }
   modal.style.display = 'flex';
}

function closeTestimonialModal() {
   document.getElementById('testimonialModal').style.display = 'none';
}

function saveTestimonial() {
   const form = document.getElementById('testimonialForm');
   const testimonialData = {
      text_sr: document.getElementById('testimonialText_sr').value,
      text_en: document.getElementById('testimonialText_en').value,
      author: document.getElementById('testimonialAuthor').value,
      rating: parseInt(document.getElementById('testimonialRating').value)
   };
   const testimonialId = form.dataset.testimonialId;
   if (testimonialId) {
      db.collection('testimonials').doc(testimonialId).update(testimonialData).then(function () {
         testimonialsCache = null;
         closeTestimonialModal();
         loadTestimonialsAdmin();
         alert('Recenzija je azurirana!');
      });
   } else {
      db.collection('testimonials').add(testimonialData).then(function () {
         testimonialsCache = null;
         closeTestimonialModal();
         loadTestimonialsAdmin();
         alert('Recenzija je dodata!');
      });
   }
}

function editTestimonial(testimonialId) {
   showTestimonialModal(testimonialId);
}

function deleteTestimonial(testimonialId) {
   if (confirm('Da li ste sigurni da zelite da obrisete ovu recenziju?')) {
      db.collection('testimonials').doc(testimonialId).delete().then(function () {
         testimonialsCache = null;
         loadTestimonialsAdmin();
         alert('Recenzija je obrisana!');
      });
   }
}

// ============================================
// GALLERY
// ============================================

function loadGallery() {
   if (!shouldLoadSection('gallery')) return;

   const galleryGrid = document.getElementById('galleryGrid');
   if (!galleryGrid) return;

   const cached = getCachedData('gallery');
   if (cached) {
      galleryCache = cached;
      renderGallery(cached);
      return;
   }

   showLoading('galleryGrid');

   db.collection('gallery').orderBy('uploadedAt', 'desc').get()
      .then(snapshot => {
         const photos = [];
         snapshot.forEach(doc => photos.push(doc.data()));

         galleryCache = photos;
         setCachedData('gallery', photos);

         renderGallery(photos);
      });
}


function loadGalleryAdmin() {
   const galleryAdmin = document.getElementById('galleryAdmin');
   if (!galleryAdmin) return;
   db.collection('gallery').orderBy('uploadedAt', 'desc').get().then(function (querySnapshot) {
      galleryAdmin.innerHTML = '';
      querySnapshot.forEach(function (doc) {
         const photo = doc.data();
         const div = document.createElement('div');
         div.className = 'gallery-item';
         const img = document.createElement('img');
         img.src = photo.url;
         img.alt = 'Galerija';
         const deleteBtn = document.createElement('button');
         deleteBtn.className = 'delete-photo';
         deleteBtn.textContent = 'Obrisi';
         deleteBtn.onclick = function () {
            deletePhoto(doc.id);
         };
         div.appendChild(img);
         div.appendChild(deleteBtn);
         galleryAdmin.appendChild(div);
      });
   });
}

function renderGallery(photos) {
   const galleryGrid = document.getElementById('galleryGrid');
   galleryGrid.innerHTML = '';
   galleryImages = [];

   if (!photos.length) {
      showEmptyState('galleryGrid', 'Trenutno nema fotografija.');
      return;
   }

   photos.forEach((photo, index) => {
      galleryImages.push(photo.url);

      const div = document.createElement('div');
      div.className = 'gallery-item fade-in';
      div.style.animationDelay = (index * 0.05) + 's';

      div.innerHTML = `<img src="${photo.url}" alt="Galerija">`;
      div.onclick = () => openLightbox(index);

      galleryGrid.appendChild(div);
   });

   // ✅ DODATI
   galleryGrid.dataset.loaded = 'true';
}


function setupAdminForms() {
   const photoInput = document.getElementById('photoInput');
   if (photoInput) {
      photoInput.addEventListener('change', function (e) {
         const file = e.target.files[0];
         if (!file) return;
         const reader = new FileReader();
         reader.onload = function (event) {
            const base64Image = event.target.result.split(',')[1];
            const formData = new FormData();
            formData.append('key', IMGBB_API_KEY);
            formData.append('image', base64Image);
            fetch('https://api.imgbb.com/1/upload', {
                  method: 'POST',
                  body: formData
               })
               .then(response => response.json())
               .then(data => {
                  if (data.success) {
                     const imageUrl = data.data.url;
                     db.collection('gallery').add({
                        url: imageUrl,
                        filename: file.name,
                        uploadedAt: firebase.firestore.FieldValue.serverTimestamp()
                     }).then(function () {
                        galleryCache = null;
                        photoInput.value = '';
                        loadGalleryAdmin();
                        alert('Fotografija je uspesno otpremljena!');
                     });
                  } else {
                     alert('Greska pri otpremanju fotografije.');
                  }
               })
               .catch(error => {
                  alert('Greska pri otpremanju fotografije.');
               });
         };
         reader.readAsDataURL(file);
      });
   }
   setupSlideshowUpload();
}

function deletePhoto(photoId) {
   if (confirm('Da li ste sigurni da zelite da obrisete ovu fotografiju?')) {
      db.collection('gallery').doc(photoId).delete().then(function () {
         galleryCache = null;
         loadGalleryAdmin();
         alert('Fotografija je obrisana!');
      });
   }
}

function loadContactAdmin() {
   const contactPhone = document.getElementById('contactPhone');
   const contactEmail = document.getElementById('contactEmail');
   const contactAddress = document.getElementById('contactAddress');
   if (!contactPhone || !contactEmail || !contactAddress) return;
   db.collection('contact').doc('info').get().then(function (doc) {
      if (doc.exists) {
         const data = doc.data();
         contactPhone.value = data.phone || '';
         contactEmail.value = data.email || '';
         contactAddress.value = data.address || '';
      }
   });
}

function saveContact() {
   db.collection('contact').doc('info').set({
      phone: document.getElementById('contactPhone').value,
      email: document.getElementById('contactEmail').value,
      address: document.getElementById('contactAddress').value
   }).then(function () {
      alert('Kontakt informacije su sacuvane!');
      updateFooterContent();
   });
}

// ============================================
// ADD-ONS
// ============================================

function loadAddOns() {
   if (!shouldLoadSection('addons')) return;

   const addonsGrid = document.getElementById('addonsGrid');
   if (!addonsGrid) return;

   // ✅ sessionStorage cache
   const cached = getCachedData('addons');
   if (cached) {
      addonsCache = cached;
      renderAddOns(cached);
      return;
   }

   if (addonsCache) {
      renderAddOns(addonsCache);
      return;
   }

   showLoading('addonsGrid');

   db.collection('addons').get()
      .then(snapshot => {
         const addons = [];
         snapshot.forEach(doc => addons.push({
            id: doc.id,
            ...doc.data()
         }));

         addonsCache = addons;
         setCachedData('addons', addons); // ✅ OVO FALI

         renderAddOns(addons);
      });
}


function renderAddOns(addons) {
   const addonsGrid = document.getElementById('addonsGrid');
   addonsGrid.innerHTML = '';

   if (!addons.length) {
      showEmptyState('addonsGrid', 'Nema dodatnih usluga.');
      return;
   }

   addons.forEach((addon, index) => {
      const card = document.createElement('div');
      card.className = 'addon-card fade-in';
      card.style.animationDelay = (index * 0.1) + 's';

      card.innerHTML = `
      <h4>${getLocalizedField(addon, 'name')}</h4>
      <span class="addon-price">${getLocalizedField(addon, 'price')} RSD</span>
    `;

      addonsGrid.appendChild(card);
   });
   addonsGrid.dataset.loaded = 'true';
}

function loadAddOnsAdmin() {
   const addonsList = document.getElementById('addonsList');
   if (!addonsList) return;
   db.collection('addons').get().then(function (querySnapshot) {
      addonsList.innerHTML = '';
      if (querySnapshot.empty) {
         const emptyMsg = document.createElement('p');
         emptyMsg.style.cssText = 'text-align: center; color: var(--text-light); padding: 2rem;';
         emptyMsg.textContent = 'Nema dodatnih usluga. Kliknite "Dodaj novu dodatnu uslugu" da biste dodali prvu.';
         addonsList.appendChild(emptyMsg);
         return;
      }
      querySnapshot.forEach(function (doc) {
         const addon = doc.data();
         const div = document.createElement('div');
         div.className = 'addon-item';
         const h4 = document.createElement('h4');
         h4.textContent = addon.name_sr || 'N/A';
         const p1 = document.createElement('p');
         p1.textContent = (addon.description_sr || 'N/A');
         p1.style.marginBottom = '10px';
         const p2 = document.createElement('p');
         p2.className = 'addon-price';
         const strong = document.createElement('strong');
         strong.textContent = 'SR: ' + (addon.price_sr || 'N/A') + ' | EN: ' + (addon.price_en || 'N/A');
         p2.appendChild(strong);
         const editBtn = document.createElement('button');
         editBtn.textContent = 'Izmeni';
         editBtn.onclick = function () {
            editAddOn(doc.id);
         };
         const deleteBtn = document.createElement('button');
         deleteBtn.textContent = 'Obrisi';
         deleteBtn.onclick = function () {
            deleteAddOn(doc.id);
         };
         div.appendChild(h4);
         div.appendChild(p1);
         div.appendChild(p2);
         div.appendChild(editBtn);
         div.appendChild(document.createTextNode(' '));
         div.appendChild(deleteBtn);
         addonsList.appendChild(div);
      });
   });
}

function showAddOnModal(addonId) {
   const modal = document.getElementById('addonModal');
   const form = document.getElementById('addonForm');
   const modalTitle = document.getElementById('addonModalTitle');
   if (addonId) {
      modalTitle.textContent = 'Uredi dodatnu uslugu';
      db.collection('addons').doc(addonId).get().then(function (doc) {
         if (doc.exists) {
            const addon = doc.data();
            document.getElementById('addonName_sr').value = addon.name_sr || '';
            document.getElementById('addonName_en').value = addon.name_en || '';
            document.getElementById('addonDescription_sr').value = addon.description_sr || '';
            document.getElementById('addonDescription_en').value = addon.description_en || '';
            document.getElementById('addonPrice_sr').value = addon.price_sr || '';
            document.getElementById('addonPrice_en').value = addon.price_en || '';
            form.dataset.addonId = addonId;
         }
      });
   } else {
      modalTitle.textContent = 'Dodaj dodatnu uslugu';
      form.reset();
      delete form.dataset.addonId;
   }
   modal.style.display = 'flex';
}

function closeAddOnModal() {
   document.getElementById('addonModal').style.display = 'none';
}

function saveAddOn() {
   const form = document.getElementById('addonForm');
   const addonData = {
      name_sr: document.getElementById('addonName_sr').value,
      name_en: document.getElementById('addonName_en').value,
      description_sr: document.getElementById('addonDescription_sr').value,
      description_en: document.getElementById('addonDescription_en').value,
      price_sr: document.getElementById('addonPrice_sr').value,
      price_en: document.getElementById('addonPrice_en').value
   };
   const addonId = form.dataset.addonId;
   if (addonId) {
      db.collection('addons').doc(addonId).update(addonData).then(function () {
         addonsCache = null;
         closeAddOnModal();
         loadAddOnsAdmin();
         alert('Dodatna usluga je azurirana!');
      });
   } else {
      db.collection('addons').add(addonData).then(function () {
         addonsCache = null;
         closeAddOnModal();
         loadAddOnsAdmin();
         alert('Dodatna usluga je dodata!');
      });
   }
}

function editAddOn(addonId) {
   showAddOnModal(addonId);
}

function deleteAddOn(addonId) {
   if (confirm('Da li ste sigurni da zelite da obrisete ovu dodatnu uslugu?')) {
      db.collection('addons').doc(addonId).delete().then(function () {
         addonsCache = null;
         loadAddOnsAdmin();
         alert('Dodatna usluga je obrisana!');
      });
   }
}

function loadSlideshowAdmin() {
   const slideshowAdmin = document.getElementById('slideshowAdmin');
   if (!slideshowAdmin) return;

   db.collection('slideshow').orderBy('order', 'asc').get().then(function (querySnapshot) {
      slideshowAdmin.innerHTML = '';

      if (querySnapshot.empty) {
         slideshowAdmin.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-light); padding: 2rem;">Nema slika u slideshow-u. Kliknite "Dodaj sliku" da dodate prvu.</p>';
         return;
      }

      querySnapshot.forEach(function (doc) {
         const image = doc.data();
         const div = document.createElement('div');
         div.className = 'gallery-item';

         const img = document.createElement('img');
         img.src = image.url;
         img.alt = 'Slideshow';

         const deleteBtn = document.createElement('button');
         deleteBtn.className = 'delete-photo';
         deleteBtn.textContent = 'Obriši';
         deleteBtn.onclick = function () {
            deleteSlideshowImage(doc.id);
         };

         div.appendChild(img);
         div.appendChild(deleteBtn);
         slideshowAdmin.appendChild(div);
      });
   });
}

function deleteSlideshowImage(imageId) {
   if (confirm('Da li ste sigurni da želite da obrišete ovu sliku iz slideshow-a?')) {
      db.collection('slideshow').doc(imageId).delete().then(function () {
         sessionStorage.removeItem('slideshow');
         slideshowCache = null;

         loadSlideshowAdmin();
         alert('Slika je obrisana!');
      });
   }
}

function setupSlideshowUpload() {
   const slideshowInput = document.getElementById('slideshowInput');
   if (!slideshowInput) return;

   slideshowInput.addEventListener('change', function (e) {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (event) {
         const base64Image = event.target.result.split(',')[1];
         const formData = new FormData();
         formData.append('key', IMGBB_API_KEY);
         formData.append('image', base64Image);

         fetch('https://api.imgbb.com/1/upload', {
               method: 'POST',
               body: formData
            })
            .then(response => response.json())
            .then(data => {
               if (data.success) {
                  const imageUrl = data.data.url;

                  db.collection('slideshow').orderBy('order', 'desc').limit(1).get()
                     .then(function (querySnapshot) {
                        let maxOrder = 0;
                        querySnapshot.forEach(function (doc) {
                           maxOrder = doc.data().order || 0;
                        });

                        db.collection('slideshow').add({
                           url: imageUrl,
                           filename: file.name,
                           order: maxOrder + 1,
                           uploadedAt: firebase.firestore.FieldValue.serverTimestamp()
                        }).then(function () {
                           sessionStorage.removeItem('slideshow');
                           slideshowCache = null;

                           slideshowInput.value = '';
                           loadSlideshowAdmin();
                           alert('Slika je uspešno dodana u slideshow!');
                        });
                     });
               } else {
                  alert('Greška pri otpremanju slike.');
               }
            })
            .catch(error => {
               alert('Greška pri otpremanju slike.');
               console.error('Upload error:', error);
            });
      };
      reader.readAsDataURL(file);
   });
}

// ============================================
// MODAL LANGUAGE TABS
// ============================================

function switchModalLang(event, lang) {
   const modal = event.target.closest('.modal');

   modal.querySelectorAll('.language-tab').forEach(tab => {
      tab.classList.remove('active');
   });
   event.target.classList.add('active');

   modal.querySelectorAll('.lang-section').forEach(section => {
      section.classList.remove('active');
   });
   modal.querySelector(`.lang-section[data-lang="${lang}"]`).classList.add('active');
}

function switchLang(event, lang) {
   const container = event.target.closest('form') || event.target.closest('.dashboard-section');

   container.querySelectorAll('.language-tab').forEach(tab => {
      tab.classList.remove('active');
   });
   event.target.classList.add('active');

   container.querySelectorAll('.lang-section').forEach(section => {
      section.classList.remove('active');
   });
   container.querySelector(`.lang-section[data-lang="${lang}"]`).classList.add('active');
}


// ========================================
// THEME MANAGEMENT - UPDATED WITH TEXT COLORS
// ========================================

const defaultColors = {
   primaryColor: '#f59e0b',
   primaryDark: '#ea580c',
   secondaryColor: '#2d2d2d',
   successColor: '#10b981',
   bgLight: '#fffbeb',
   textDark: '#1f2937', // ← NEW
   textLight: '#6b7280' // ← NEW
};

// Apply theme colors to CSS variables
function applyTheme(colors) {
   const root = document.documentElement;

   if (colors.primaryColor) root.style.setProperty('--primary-color', colors.primaryColor);
   if (colors.primaryDark) root.style.setProperty('--primary-dark', colors.primaryDark);
   if (colors.secondaryColor) root.style.setProperty('--secondary-color', colors.secondaryColor);
   if (colors.successColor) root.style.setProperty('--success-color', colors.successColor);
   if (colors.bgLight) root.style.setProperty('--bg-light', colors.bgLight);
   if (colors.textDark) root.style.setProperty('--text-dark', colors.textDark); // ← NEW
   if (colors.textLight) root.style.setProperty('--text-light', colors.textLight); // ← NEW

   // Update gradient
   if (colors.primaryColor && colors.primaryDark) {
      root.style.setProperty('--primary-gradient',
         `linear-gradient(135deg, ${colors.primaryColor} 0%, ${colors.primaryDark} 100%)`);
   }
}

// Update color picker displays
function updateColorPickers(colors) {
   Object.keys(colors).forEach(key => {
      const colorInput = document.getElementById(key);
      const textInput = document.getElementById(key + 'Text');

      if (colorInput) colorInput.value = colors[key];
      if (textInput) textInput.value = colors[key];
   });
}

// Load theme settings in admin
function loadThemeSettings() {
   db.collection('settings').doc('theme').get()
      .then(doc => {
         if (doc.exists) {
            const colors = doc.data();
            updateColorPickers(colors);
            applyTheme(colors);
         } else {
            updateColorPickers(defaultColors);
         }
      })
      .catch(error => {
         console.error('Error loading theme settings:', error);
         alert('Greška pri učitavanju tema');
      });
}

// Preview theme
function previewTheme() {
   const colors = {
      primaryColor: document.getElementById('primaryColor').value,
      primaryDark: document.getElementById('primaryDark').value,
      secondaryColor: document.getElementById('secondaryColor').value,
      successColor: document.getElementById('successColor').value,
      bgLight: document.getElementById('bgLight').value,
      textDark: document.getElementById('textDark').value, // ← NEW
      textLight: document.getElementById('textLight').value // ← NEW
   };

   applyTheme(colors);

   const notification = document.createElement('div');
   notification.textContent = '👁️ Pregled tema - promene nisu sačuvane';
   notification.style.cssText = `
          position: fixed; top: 20px; right: 20px;
          background: #3b82f6; color: white;
          padding: 1rem 2rem; border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          z-index: 10000; animation: slideIn 0.3s ease;
      `;
   document.body.appendChild(notification);
   setTimeout(() => notification.remove(), 3000);
}

// Save theme to Firebase
function saveTheme() {
   const colors = {
      primaryColor: document.getElementById('primaryColor').value,
      primaryDark: document.getElementById('primaryDark').value,
      secondaryColor: document.getElementById('secondaryColor').value,
      successColor: document.getElementById('successColor').value,
      bgLight: document.getElementById('bgLight').value,
      textDark: document.getElementById('textDark').value,
      textLight: document.getElementById('textLight').value,
      updatedAt: new Date().toISOString()
   };

   db.collection('settings').doc('theme').set(colors)
      .then(() => {
         // Update localStorage immediately
         localStorage.setItem('mssjaj_theme', JSON.stringify(colors));
         applyTheme(colors);
         alert('✅ Tema je uspešno sačuvana!');
      })
      .catch(error => {
         console.error('Error saving theme:', error);
         alert('❌ Greška pri čuvanju tema');
      });
}

// Reset single color
function resetColor(colorType) {
   const colorMap = {
      'primary': 'primaryColor',
      'primaryDark': 'primaryDark',
      'secondary': 'secondaryColor',
      'textDark': 'textDark', // ← NEW
      'textLight': 'textLight' // ← NEW
   };

   const key = colorMap[colorType];
   if (key && defaultColors[key]) {
      document.getElementById(key).value = defaultColors[key];
      document.getElementById(key + 'Text').value = defaultColors[key];
   }
}

// Reset all colors
function resetAllColors() {
   if (confirm('Da li ste sigurni da želite da resetujete sve boje na podrazumevane vrednosti?')) {
      updateColorPickers(defaultColors);
      applyTheme(defaultColors);
   }
}

// Load theme when theme section is opened
document.querySelector('[data-section="theme-section"]')?.addEventListener('click', loadThemeSettings);


// ============================================
// IMAGE LIGHTBOX / PREVIEW MODE - FIXED
// ============================================

function openLightbox(index) {
   const lightbox = document.getElementById('lightbox');
   const lightboxImage = document.getElementById('lightboxImage');

   if (!lightbox || !lightboxImage) return;
   if (galleryImages.length === 0) return;

   // Set current index
   currentLightboxIndex = index;

   // Set image and show lightbox
   lightboxImage.src = galleryImages[currentLightboxIndex];
   lightbox.classList.add('active');

   // Update counter
   updateLightboxCounter();

   // Prevent body scrolling
   document.body.style.overflow = 'hidden';
}

function closeLightbox() {
   const lightbox = document.getElementById('lightbox');
   if (!lightbox) return;

   lightbox.classList.remove('active');
   document.body.style.overflow = '';
}

function navigateLightbox(direction) {
   if (galleryImages.length === 0) return;

   currentLightboxIndex += direction;

   // Loop around
   if (currentLightboxIndex < 0) {
      currentLightboxIndex = galleryImages.length - 1;
   } else if (currentLightboxIndex >= galleryImages.length) {
      currentLightboxIndex = 0;
   }

   // Update image with animation
   const lightboxImage = document.getElementById('lightboxImage');
   if (!lightboxImage) return;

   lightboxImage.style.animation = 'none';
   setTimeout(() => {
      lightboxImage.src = galleryImages[currentLightboxIndex];
      lightboxImage.style.animation = 'zoomIn 0.3s ease';
      updateLightboxCounter();
   }, 50);
}

function updateLightboxCounter() {
   const lightboxCounter = document.getElementById('lightboxCounter');
   if (!lightboxCounter) return;

   if (galleryImages.length > 0) {
      lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${galleryImages.length}`;
   }
}

function setActiveNavLink() {
   const currentPage = window.location.pathname.split('/').pop() || 'index.html';

   document.querySelectorAll('.nav-menu a').forEach(link => {
      const href = link.getAttribute('href');

      if (!href) return;

      if (href === currentPage) {
         link.classList.add('active');
      } else {
         link.classList.remove('active');
      }
   });

}

function setupLanguageSwitcher() {
   const langButtons = document.querySelectorAll('.lang-btn');

   langButtons.forEach(btn => {
      btn.addEventListener('click', () => {
         const lang = btn.dataset.lang;
         if (!lang) return;

         localStorage.setItem('language', lang);
         window.location.reload();
      });
   });
}


function deferBelowFoldLoads() {
   // testimonials
   lazyLoadSection('.testimonials', loadTestimonials);

   // gallery
   lazyLoadSection('.gallery-section', loadGallery);

   // addons
   lazyLoadSection('.add-ons', loadAddOns);
}

function initLightboxSwipe() {
   const lightbox = document.getElementById('lightbox');
   if (!lightbox) return;

   let startX = 0;
   let endX = 0;
   const SWIPE_THRESHOLD = 50; // px

   lightbox.addEventListener('touchstart', (e) => {
      if (e.touches.length !== 1) return;
      startX = e.touches[0].clientX;
   }, {
      passive: true
   });

   lightbox.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      handleSwipe();
   });

   function handleSwipe() {
      const diff = endX - startX;

      if (Math.abs(diff) < SWIPE_THRESHOLD) return;

      if (diff > 0) {
         // swipe right → previous
         navigateLightbox(-1);
      } else {
         // swipe left → next
         navigateLightbox(1);
      }
   }
}

function handleDeferredScroll() {
   const params = new URLSearchParams(window.location.search);
   const targetId = params.get('scroll');
   if (!targetId) return;

   const tryScroll = () => {
      const el = document.getElementById(targetId);
      if (!el) {
         setTimeout(tryScroll, 100);
         return;
      }

      const headerOffset = 80; // fixed navbar height
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
         top: offsetPosition,
         behavior: 'smooth'
      });
   };

   tryScroll();
}


function lazyLoadSection(selector, loadFn) {
   const section = document.querySelector(selector);
   if (!section) return;

   const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            loadFn();
            observer.disconnect();
         }
      });
   }, {
      rootMargin: '200px'
   });

   observer.observe(section);
}

window.addEventListener('load', initializeApp);

document.addEventListener('DOMContentLoaded', () => {
   initLightboxSwipe();
});
