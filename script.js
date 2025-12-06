 // Firebase configuration
  const firebaseConfig = {
      apiKey: "AIzaSyAR4ae5zbbqwqgWLRVtbb2V2W3WbwuSCWo",
      authDomain: "mssjaj-20b34.firebaseapp.com",
      projectId: "mssjaj-20b34",
      storageBucket: "mssjaj-20b34.firebasestorage.app",
      messagingSenderId: "52721755434",
      appId: "1:52721755434:web:dc654c159ce6cd226faa53"
  };

  // ImgBB API Key
  const IMGBB_API_KEY = '8e1325002347317ddab99277f90754b0';

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();

  // Initialize app
  document.addEventListener('DOMContentLoaded', function() {
      console.log('DOM loaded, initializing...');
      initializeApp();
      setupSidebarNavigation();
  });

  function initializeApp() {
      setupMobileNav();

      const isAdminPage = document.getElementById('loginForm') || document.getElementById('adminContent');
      if (!isAdminPage) {
          loadPublicPageContent();
      }

      updateFooterContent();

      if (document.getElementById('loginForm')) {
          setupAdminLogin();
      }

      if (document.getElementById('adminContent')) {
          setupAdminDashboard();
      }
  }

  // Sidebar Navigation - THIS IS CRITICAL!
  function setupSidebarNavigation() {
      console.log('Setting up sidebar navigation...');
      const navItems = document.querySelectorAll('.nav-item');
      const sections = document.querySelectorAll('.content-section');

      console.log('Found', navItems.length, 'nav items and', sections.length, 'sections');

      navItems.forEach(item => {
          item.addEventListener('click', function() {
              console.log('Nav item clicked:', this.getAttribute('data-section'));

              // Remove active class from all nav items and sections
              navItems.forEach(nav => nav.classList.remove('active'));
              sections.forEach(section => section.classList.remove('active'));

              // Add active class to clicked item
              this.classList.add('active');

              // Show corresponding section
              const sectionId = this.getAttribute('data-section');
              const targetSection = document.getElementById(sectionId);
              if (targetSection) {
                  targetSection.classList.add('active');
                  console.log('Showing section:', sectionId);
              } else {
                  console.error('Section not found:', sectionId);
              }
          });
      });

      // Upload photo button
      const uploadPhotoBtn = document.getElementById('uploadPhotoBtn');
      if (uploadPhotoBtn) {
          uploadPhotoBtn.addEventListener('click', function() {
              document.getElementById('photoInput').click();
          });
      }
  }

  // Mobile Navigation
  function setupMobileNav() {
      const hamburger = document.getElementById('hamburger');
      const navMenu = document.getElementById('navMenu');

      if (hamburger && navMenu) {
          hamburger.addEventListener('click', function() {
              if (navMenu.classList.contains('active')) {
                  navMenu.classList.remove('active');
                  hamburger.classList.remove('active');
              } else {
                  navMenu.classList.add('active');
                  hamburger.classList.add('active');
              }
          });

          document.addEventListener('click', function(e) {
              if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                  navMenu.classList.remove('active');
                  hamburger.classList.remove('active');
              }
          });
      }
  }

  // Load public page content
  function loadPublicPageContent() {
      loadHomeContent();
      loadServices();
      loadAboutContent();
      loadTestimonials();
      loadGallery();
  }

  // Update footer content
  function updateFooterContent() {
      db.collection('contact').doc('info').get().then(function(doc) {
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

  // Admin Login
  function setupAdminLogin() {
      const loginForm = document.getElementById('loginForm');
      if (!loginForm) return;

      loginForm.addEventListener('submit', function(e) {
          e.preventDefault();

          const emailInput = document.getElementById('email');
          const passwordInput = document.getElementById('password');

          if (!emailInput || !passwordInput) {
              console.error('Email or password input not found');
              return;
          }

          const email = emailInput.value;
          const password = passwordInput.value;

          auth.signInWithEmailAndPassword(email, password)
              .then(function() {
                  window.location.href = 'admin-dashboard.html';
              })
              .catch(function(error) {
                  alert('Greška pri prijavi: ' + error.message);
              });
      });
  }

  // Admin Dashboard
  function setupAdminDashboard() {
      auth.onAuthStateChanged(function(user) {
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
          logoutBtn.addEventListener('click', function(e) {
              e.preventDefault();
              auth.signOut().then(function() {
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
      setupLogout();
  }

  // HOME CONTENT
  function loadHomeContent() {
      db.collection('content').doc('home').get().then(function(doc) {
          if (doc.exists) {
              const data = doc.data();
              const heroHeading = document.getElementById('heroHeading');
              const heroText = document.getElementById('heroText');

              if (heroHeading) heroHeading.textContent = data.heroHeading || '';
              if (heroText) heroText.textContent = data.heroText || '';

              const features = data.features || [];
              const featuresGrid = document.getElementById('featuresGrid');
              if (featuresGrid) {
                  featuresGrid.innerHTML = features.map(feature => `
                      <div class="feature-card">
                          <div class="feature-icon">${feature.icon}</div>
                          <h3>${feature.title}</h3>
                          <p>${feature.description}</p>
                      </div>
                  `).join('');
              }
          }
      });
  }

  function loadHomeContentAdmin() {
      const heroHeading = document.getElementById('heroHeading');
      const heroText = document.getElementById('heroText');
      const featuresContainer = document.getElementById('featuresContainer');

      if (!heroHeading || !heroText || !featuresContainer) return;

      db.collection('content').doc('home').get().then(function(doc) {
          if (doc.exists) {
              const data = doc.data();
              heroHeading.value = data.heroHeading || '';
              heroText.value = data.heroText || '';

              const features = data.features || [];
              featuresContainer.innerHTML = features.map((feature, index) => `
                  <div class="feature-item" style="background: var(--bg-light); padding: 1.5rem; border-radius: 8px; 
  margin-bottom: 1rem;">
                      <div class="form-group">
                          <label>Ikona</label>
                          <select data-index="${index}" data-field="icon" style="font-size: 1.5rem;">
                              <option value="✨" ${feature.icon === '✨' ? 'selected' : ''}>✨ Sparkles</option>
                              <option value="🌿" ${feature.icon === '🌿' ? 'selected' : ''}>🌿 Eco</option>
                              <option value="📅" ${feature.icon === '📅' ? 'selected' : ''}>📅 Calendar</option>
                              <option value="⭐" ${feature.icon === '⭐' ? 'selected' : ''}>⭐ Star</option>
                              <option value="💼" ${feature.icon === '💼' ? 'selected' : ''}>💼 Briefcase</option>
                              <option value="🏠" ${feature.icon === '🏠' ? 'selected' : ''}>🏠 Home</option>
                              <option value="💚" ${feature.icon === '💚' ? 'selected' : ''}>💚 Heart</option>
                              <option value="🤝" ${feature.icon === '🤝' ? 'selected' : ''}>🤝 Handshake</option>
                              <option value="🧹" ${feature.icon === '🧹' ? 'selected' : ''}>🧹 Broom</option>
                              <option value="🧼" ${feature.icon === '🧼' ? 'selected' : ''}>🧼 Soap</option>
                              <option value="✅" ${feature.icon === '✅' ? 'selected' : ''}>✅ Check</option>
                              <option value="🎯" ${feature.icon === '🎯' ? 'selected' : ''}>🎯 Target</option>
                          </select>
                      </div>
                      <div class="form-group">
                          <label>Naslov</label>
                          <input type="text" value="${feature.title}" data-index="${index}" data-field="title">
                      </div>
                      <div class="form-group">
                          <label>Opis</label>
                          <textarea rows="2" data-index="${index}" 
  data-field="description">${feature.description}</textarea>
                      </div>
                      <button type="button" onclick="removeFeature(${index})" class="btn" style="background: 
  var(--danger-color); color: white; width: 100%;">Obriši karakteristiku</button>
                  </div>
              `).join('');
          }
      });
  }

 function addFeature() {
      const container = document.getElementById('featuresContainer');
      const index = container.children.length;
      const div = document.createElement('div');
      div.className = 'feature-item';
      div.style.cssText = 'background: var(--bg-light); padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem;';
      div.innerHTML = `
          <div class="form-group">
              <label>Ikona</label>
              <select data-index="${index}" data-field="icon" style="font-size: 1.5rem;">
                  <option value="✨">✨ Sparkles</option>
                  <option value="🌿">🌿 Eco</option>
                  <option value="📅">📅 Calendar</option>
                  <option value="⭐">⭐ Star</option>
                  <option value="💼">💼 Briefcase</option>
                  <option value="🏠">🏠 Home</option>
                  <option value="💚">💚 Heart</option>
                  <option value="🤝">🤝 Handshake</option>
                  <option value="🧹">🧹 Broom</option>
                  <option value="🧼">🧼 Soap</option>
                  <option value="✅">✅ Check</option>
                  <option value="🎯">🎯 Target</option>
              </select>
          </div>
          <div class="form-group">
              <label>Naslov</label>
              <input type="text" placeholder="Naslov karakteristike" data-index="${index}" data-field="title">
          </div>
          <div class="form-group">
              <label>Opis</label>
              <textarea rows="2" placeholder="Opis karakteristike" data-index="${index}" 
  data-field="description"></textarea>
          </div>
          <button type="button" onclick="removeFeature(${index})" class="btn" style="background: var(--danger-color); color:
   white; width: 100%;">Obriši karakteristiku</button>
      `;
      container.appendChild(div);
  }

  function removeFeature(index) {
      const container = document.getElementById('featuresContainer');
      container.children[index].remove();
      Array.from(container.children).forEach((child, i) => {
          child.querySelectorAll('[data-index]').forEach(el => {
              el.setAttribute('data-index', i);
          });
          const button = child.querySelector('button');
          if (button) {
              button.setAttribute('onclick', `removeFeature(${i})`);
          }
      });
  }

   function saveHomeContent() {
      const features = [];
      document.querySelectorAll('#featuresContainer .feature-item').forEach(item => {
          const icon = item.querySelector('[data-field="icon"]').value;
          const title = item.querySelector('[data-field="title"]').value;
          const description = item.querySelector('[data-field="description"]').value;

          features.push({
              icon: icon,
              title: title,
              description: description
          });
      });

      db.collection('content').doc('home').set({
          heroHeading: document.getElementById('heroHeading').value,
          heroText: document.getElementById('heroText').value,
          features: features
      }).then(function() {
          alert('Sadržaj početne stranice je sačuvan!');
      });
  }


  // SERVICES
  function loadServices() {
      db.collection('services').get().then(function(querySnapshot) {
          const services = [];
          querySnapshot.forEach(function(doc) {
              services.push({ id: doc.id, ...doc.data() });
          });

          const servicesGrid = document.getElementById('servicesGrid');
          if (servicesGrid) {
              if (services.length === 0) {
                  servicesGrid.innerHTML = '<p style="text-align: center; color: var(--text-light); grid-column: 
  1/-1;">Trenutno nema dostupnih usluga. Dodajte usluge preko admin panela.</p>';
              } else {
                  servicesGrid.innerHTML = services.map(service => `
                      <div class="service-card">
                          <h3>${service.name}</h3>
                          <p class="service-description">${service.description}</p>
                          <p class="service-price">${service.price}</p>
                      </div>
                  `).join('');
              }
          }
      });
  }


  function loadServicesAdmin() {
      const servicesList = document.getElementById('servicesList');
      if (!servicesList) return;

      db.collection('services').get().then(function(querySnapshot) {
          servicesList.innerHTML = '';

          querySnapshot.forEach(function(doc) {
              const service = doc.data();
              const div = document.createElement('div');
              div.className = 'service-item';
              div.innerHTML = `
                  <h4>${service.name}</h4>
                  <p>${service.description}</p>
                  <p><strong>${service.price}</strong></p>
                  <button onclick="editService('${doc.id}')">Izmeni</button>
                  <button onclick="deleteService('${doc.id}')">Obriši</button>
              `;
              servicesList.appendChild(div);
          });
      });
  }

  function showServiceModal(serviceId = null) {
      const modal = document.getElementById('serviceModal');
      const form = document.getElementById('serviceForm');

      if (serviceId) {
          db.collection('services').doc(serviceId).get().then(function(doc) {
              if (doc.exists) {
                  const service = doc.data();
                  document.getElementById('serviceName').value = service.name;
                  document.getElementById('serviceDescription').value = service.description;
                  document.getElementById('servicePrice').value = service.price;
                  form.dataset.serviceId = serviceId;
              }
          });
      } else {
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
          name: document.getElementById('serviceName').value,
          description: document.getElementById('serviceDescription').value,
          price: document.getElementById('servicePrice').value
      };

      const serviceId = form.dataset.serviceId;

      if (serviceId) {
          db.collection('services').doc(serviceId).update(serviceData).then(function() {
              closeServiceModal();
              loadServicesAdmin();
              alert('Usluga je ažurirana!');
          });
      } else {
          db.collection('services').add(serviceData).then(function() {
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
      if (confirm('Da li ste sigurni da želite da obrišete ovu uslugu?')) {
          db.collection('services').doc(serviceId).delete().then(function() {
              loadServicesAdmin();
              alert('Usluga je obrisana!');
          });
      }
  }

  // ABOUT CONTENT
  function loadAboutContent() {
      db.collection('content').doc('about').get().then(function(doc) {
          if (doc.exists) {
              const data = doc.data();
              const aboutHeading = document.getElementById('aboutHeading');
              const aboutText = document.getElementById('aboutText');

              if (aboutHeading) aboutHeading.textContent = data.heading || '';
              if (aboutText) aboutText.textContent = data.text || '';
          }
      });
  }

  function loadAboutContentAdmin() {
      const aboutHeading = document.getElementById('aboutHeading');
      const aboutText = document.getElementById('aboutText');

      if (!aboutHeading || !aboutText) return;

      db.collection('content').doc('about').get().then(function(doc) {
          if (doc.exists) {
              const data = doc.data();
              aboutHeading.value = data.heading || '';
              aboutText.value = data.text || '';
          }
      });
  }

  function saveAboutContent() {
      db.collection('content').doc('about').set({
          heading: document.getElementById('aboutHeading').value,
          text: document.getElementById('aboutText').value
      }).then(function() {
          alert('Sadržaj O nama stranice je sačuvan!');
      });
  }

  // TESTIMONIALS
  function loadTestimonials() {
      db.collection('testimonials').get().then(function(querySnapshot) {
          const testimonials = [];
          querySnapshot.forEach(function(doc) {
              testimonials.push({ id: doc.id, ...doc.data() });
          });

          const testimonialsGrid = document.getElementById('testimonialsGrid');
          if (testimonialsGrid) {
              testimonialsGrid.innerHTML = testimonials.map(testimonial => `
                  <div class="testimonial-card">
                      <p class="testimonial-text">"${testimonial.text}"</p>
                      <p class="testimonial-author">- ${testimonial.author}</p>
                  </div>
              `).join('');
          }
      });
  }

  function loadTestimonialsAdmin() {
      const testimonialsList = document.getElementById('testimonialsList');
      if (!testimonialsList) return;

      db.collection('testimonials').get().then(function(querySnapshot) {
          testimonialsList.innerHTML = '';

          querySnapshot.forEach(function(doc) {
              const testimonial = doc.data();
              const div = document.createElement('div');
              div.className = 'testimonial-item';
              div.innerHTML = `
                  <div class="testimonial-content">
                      <p>"${testimonial.text}"</p>
                      <p class="testimonial-author">- ${testimonial.author}</p>
                  </div>
                  <div class="testimonial-actions">
                      <button onclick="editTestimonial('${doc.id}')">Izmeni</button>
                      <button onclick="deleteTestimonial('${doc.id}')">Obriši</button>
                  </div>
              `;
              testimonialsList.appendChild(div);
          });
      });
  }

  function showTestimonialModal(testimonialId = null) {
      const modal = document.getElementById('testimonialModal');
      const form = document.getElementById('testimonialForm');

      if (testimonialId) {
          db.collection('testimonials').doc(testimonialId).get().then(function(doc) {
              if (doc.exists) {
                  const testimonial = doc.data();
                  document.getElementById('testimonialText').value = testimonial.text;
                  document.getElementById('testimonialAuthor').value = testimonial.author;
                  form.dataset.testimonialId = testimonialId;
              }
          });
      } else {
          form.reset();
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
          text: document.getElementById('testimonialText').value,
          author: document.getElementById('testimonialAuthor').value
      };

      const testimonialId = form.dataset.testimonialId;

      if (testimonialId) {
          db.collection('testimonials').doc(testimonialId).update(testimonialData).then(function() {
              closeTestimonialModal();
              loadTestimonialsAdmin();
              alert('Recenzija je ažurirana!');
          });
      } else {
          db.collection('testimonials').add(testimonialData).then(function() {
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
      if (confirm('Da li ste sigurni da želite da obrišete ovu recenziju?')) {
          db.collection('testimonials').doc(testimonialId).delete().then(function() {
              loadTestimonialsAdmin();
              alert('Recenzija je obrisana!');
          });
      }
  }

  // GALLERY
  function loadGallery() {
      db.collection('gallery').orderBy('uploadedAt', 'desc').get().then(function(querySnapshot) {
          const galleryGrid = document.getElementById('galleryGrid');
          if (galleryGrid) {
              galleryGrid.innerHTML = '';
              querySnapshot.forEach(function(doc) {
                  const photo = doc.data();
                  const div = document.createElement('div');
                  div.className = 'gallery-item';
                  div.innerHTML = `<img src="${photo.url}" alt="Galerija">`;
                  galleryGrid.appendChild(div);
              });
          }
      });
  }

  function loadGalleryAdmin() {
      const galleryAdmin = document.getElementById('galleryAdmin');
      if (!galleryAdmin) return;

      db.collection('gallery').orderBy('uploadedAt', 'desc').get().then(function(querySnapshot) {
          galleryAdmin.innerHTML = '';
          querySnapshot.forEach(function(doc) {
              const photo = doc.data();
              const div = document.createElement('div');
              div.className = 'gallery-item';
              div.innerHTML = `
                  <img src="${photo.url}" alt="Galerija">
                  <button class="delete-photo" onclick="deletePhoto('${doc.id}')">Obriši</button>
              `;
              galleryAdmin.appendChild(div);
          });
      });
  }

  // Upload photo using ImgBB API
  function setupAdminForms() {
      const photoInput = document.getElementById('photoInput');
      if (photoInput) {
          photoInput.addEventListener('change', function(e) {
              const file = e.target.files[0];
              if (!file) return;

              console.log('Uploading to ImgBB...');

              const reader = new FileReader();
              reader.onload = function(event) {
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
                          console.log('Image uploaded successfully:', imageUrl);

                          db.collection('gallery').add({
                              url: imageUrl,
                              filename: file.name,
                              uploadedAt: firebase.firestore.FieldValue.serverTimestamp()
                          }).then(function() {
                              photoInput.value = '';
                              loadGalleryAdmin();
                              alert('Fotografija je uspešno otpremljena!');
                          });
                      } else {
                          console.error('ImgBB upload error:', data);
                          alert('Greška pri otpremanju fotografije. Pokušajte ponovo.');
                      }
                  })
                  .catch(error => {
                      console.error('Upload error:', error);
                      alert('Greška pri otpremanju fotografije. Pokušajte ponovo.');
                  });
              };

              reader.readAsDataURL(file);
          });
      }
  }

  function deletePhoto(photoId) {
      if (confirm('Da li ste sigurni da želite da obrišete ovu fotografiju?')) {
          db.collection('gallery').doc(photoId).delete().then(function() {
              loadGalleryAdmin();
              alert('Fotografija je obrisana!');
          });
      }
  }

  // CONTACT INFO
  function loadContactAdmin() {
      const contactPhone = document.getElementById('contactPhone');
      const contactEmail = document.getElementById('contactEmail');
      const contactAddress = document.getElementById('contactAddress');

      if (!contactPhone || !contactEmail || !contactAddress) return;

      db.collection('contact').doc('info').get().then(function(doc) {
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
      }).then(function() {
          alert('Kontakt informacije su sačuvane!');
          updateFooterContent();
      });
  }
