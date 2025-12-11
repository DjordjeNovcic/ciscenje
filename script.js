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

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();

  var quillEditor = null;

  // Helper function to show loading spinner
  function showLoading(containerId) {
      const container = document.getElementById(containerId);
      if (!container) return;

      container.innerHTML = `
          <div class="loading-container">
              <div class="loading-spinner"></div>
              <p class="loading-text">Učitavanje...</p>
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

  document.addEventListener('DOMContentLoaded', function() {
      initializeApp();
      setupSidebarNavigation();
      initQuillEditor();
  });

  function initQuillEditor() {
      const editorElement = document.getElementById('serviceDescription');
      if (editorElement && !quillEditor) {
          quillEditor = new Quill('#serviceDescription', {
              theme: 'snow',
              modules: {
                  toolbar: [
                      ['bold', 'italic', 'underline', 'strike'],
                      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                      [{ 'header': [1, 2, 3, false] }],
                      ['clean']
                  ]
              },
              placeholder: 'Unesite opis usluge...'
          });
      }
  }

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

  function setupSidebarNavigation() {
      const navItems = document.querySelectorAll('.nav-item');
      const sections = document.querySelectorAll('.content-section');
      navItems.forEach(item => {
          item.addEventListener('click', function() {
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
          uploadPhotoBtn.addEventListener('click', function() {
              document.getElementById('photoInput').click();
          });
      }
  }

  function setupMobileNav() {
      const hamburger = document.getElementById('hamburger');
      const navMenu = document.getElementById('navMenu');
      if (hamburger && navMenu) {
          const newHamburger = hamburger.cloneNode(true);
          hamburger.parentNode.replaceChild(newHamburger, hamburger);
          newHamburger.addEventListener('click', function(e) {
              e.stopPropagation();
              navMenu.classList.toggle('active');
              newHamburger.classList.toggle('active');
          });
          document.addEventListener('click', function(e) {
              if (!newHamburger.contains(e.target) && !navMenu.contains(e.target)) {
                  navMenu.classList.remove('active');
                  newHamburger.classList.remove('active');
              }
          });
      }
  }

  function loadPublicPageContent() {
      loadHomeContent();
      loadServices();
      loadAboutContent();
      loadTestimonials();
      loadGallery();
      loadAddOns();
  }

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

  function setupAdminLogin() {
      const loginForm = document.getElementById('loginForm');
      if (!loginForm) return;
      loginForm.addEventListener('submit', function(e) {
          e.preventDefault();
          const emailInput = document.getElementById('email');
          const passwordInput = document.getElementById('password');
          if (!emailInput || !passwordInput) return;
          const email = emailInput.value;
          const password = passwordInput.value;
          auth.signInWithEmailAndPassword(email, password)
              .then(function() {
                  window.location.href = 'admin-dashboard.html';
              })
              .catch(function(error) {
                  alert('Greska pri prijavi: ' + error.message);
              });
      });
  }

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
      loadAddOnsAdmin();
      setupLogout();
  }

  function loadHomeContent() {
      const heroHeading = document.getElementById('heroHeading');
      const heroText = document.getElementById('heroText');
      const featuresGrid = document.getElementById('featuresGrid');

      if (!featuresGrid) return;

      showLoading('featuresGrid');

      db.collection('content').doc('home').get().then(function(doc) {
          if (doc.exists) {
              const data = doc.data();

              if (heroHeading) {
                  heroHeading.className = 'fade-in';
                  heroHeading.textContent = data.heroHeading || '';
              }
              if (heroText) {
                  heroText.className = 'fade-in';
                  heroText.textContent = data.heroText || '';
              }

              const features = data.features || [];
              featuresGrid.innerHTML = '';

              if (features.length === 0) {
                  showEmptyState('featuresGrid', 'Trenutno nema dostupnih karakteristika.');
              } else {
                  features.forEach(function(feature, index) {
                      const card = document.createElement('div');
                      card.className = 'feature-card fade-in';
                      card.style.animationDelay = (index * 0.1) + 's';

                      const icon = document.createElement('div');
                      icon.className = 'feature-icon';
                      icon.textContent = feature.icon;

                      const h3 = document.createElement('h3');
                      h3.textContent = feature.title;

                      const p = document.createElement('p');
                      p.textContent = feature.description;

                      card.appendChild(icon);
                      card.appendChild(h3);
                      card.appendChild(p);
                      featuresGrid.appendChild(card);
                  });
              }
          }
      }).catch(function(error) {
          console.error('Error loading home content:', error);
          featuresGrid.innerHTML = '<p style="text-align: center; color: var(--danger-color); padding: 2rem; grid-column: 1/-1;">Greška pri učitavanju sadržaja. Molimo osvežite stranicu.</p>';
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
              featuresContainer.innerHTML = '';
              features.forEach(function(feature, index) {
                  addFeatureItem(featuresContainer, feature, index);
              });
          }
      });
  }

  function addFeatureItem(container, feature, index) {
      const icons = ['sparkles', 'eco', 'calendar', 'star', 'briefcase', 'home', 'heart', 'handshake', 'broom', 'soap', 'check', 'target'];
      const iconEmojis = {
          'sparkles': '\u2728',
          'eco': '\u127F',
          'calendar': '\uD83D\uDCC5',
          'star': '\u2B50',
          'briefcase': '\uD83D\uDCBC',
          'home': '\uD83C\uDFE0',
          'heart': '\uD83D\uDC9A',
          'handshake': '\uD83E\uDD1D',
          'broom': '\uD83E\uDDF9',
          'soap': '\uD83E\uDDFC',
          'check': '\u2705',
          'target': '\uD83C\uDFAF'
      };
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
      icons.forEach(function(iconName) {
          const option = document.createElement('option');
          option.value = iconEmojis[iconName];
          option.textContent = iconEmojis[iconName] + ' ' + iconName;
          if (feature && feature.icon === iconEmojis[iconName]) {
              option.selected = true;
          }
          iconSelect.appendChild(option);
      });
      iconGroup.appendChild(iconLabel);
      iconGroup.appendChild(iconSelect);
      const titleGroup = document.createElement('div');
      titleGroup.className = 'form-group';
      const titleLabel = document.createElement('label');
      titleLabel.textContent = 'Naslov';
      const titleInput = document.createElement('input');
      titleInput.type = 'text';
      titleInput.value = feature ? (feature.title || '') : '';
      titleInput.setAttribute('data-index', index);
      titleInput.setAttribute('data-field', 'title');
      titleInput.placeholder = 'Naslov';
      titleGroup.appendChild(titleLabel);
      titleGroup.appendChild(titleInput);
      const descGroup = document.createElement('div');
      descGroup.className = 'form-group';
      const descLabel = document.createElement('label');
      descLabel.textContent = 'Opis';
      const descTextarea = document.createElement('textarea');
      descTextarea.rows = 2;
      descTextarea.value = feature ? (feature.description || '') : '';
      descTextarea.setAttribute('data-index', index);
      descTextarea.setAttribute('data-field', 'description');
      descTextarea.placeholder = 'Opis';
      descGroup.appendChild(descLabel);
      descGroup.appendChild(descTextarea);
      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'btn';
      deleteBtn.textContent = 'Obrisi karakteristiku';
      deleteBtn.style.cssText = 'background: var(--danger-color); color: white; width: 100%;';
      deleteBtn.onclick = function() { removeFeature(index); };
      featureDiv.appendChild(iconGroup);
      featureDiv.appendChild(titleGroup);
      featureDiv.appendChild(descGroup);
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
      Array.from(container.children).forEach(function(child, i) {
          child.querySelectorAll('[data-index]').forEach(function(el) {
              el.setAttribute('data-index', i);
          });
          const button = child.querySelector('button');
          if (button) {
              button.onclick = function() { removeFeature(i); };
          }
      });
  }

  function saveHomeContent() {
      const features = [];
      document.querySelectorAll('#featuresContainer .feature-item').forEach(function(item) {
          features.push({
              icon: item.querySelector('[data-field="icon"]').value,
              title: item.querySelector('[data-field="title"]').value,
              description: item.querySelector('[data-field="description"]').value
          });
      });
      db.collection('content').doc('home').set({
          heroHeading: document.getElementById('heroHeading').value,
          heroText: document.getElementById('heroText').value,
          features: features
      }).then(function() {
          alert('Sadrzaj pocetne stranice je sacuvan!');
      });
  }

  function loadServices() {
      const servicesGrid = document.getElementById('servicesGrid');
      if (!servicesGrid) return;

      showLoading('servicesGrid');

      db.collection('services').get().then(function(querySnapshot) {
          const services = [];
          querySnapshot.forEach(function(doc) {
              services.push({ id: doc.id, ...doc.data() });
          });

          servicesGrid.innerHTML = '';

          if (services.length === 0) {
              showEmptyState('servicesGrid', 'Trenutno nema dostupnih usluga.');
          } else {
              services.forEach(function(service, index) {
                  const card = document.createElement('div');
                  card.className = 'service-card fade-in';
                  card.style.animationDelay = (index * 0.1) + 's';

                  const h3 = document.createElement('h3');
                  h3.textContent = service.name;

                  const desc = document.createElement('div');
                  desc.className = 'service-description';
                  desc.innerHTML = service.description;

                  const price = document.createElement('span');
                  price.className = 'service-price';
                  price.textContent = service.price + ' RSD';

                  card.appendChild(h3);
                  card.appendChild(desc);
                  card.appendChild(price);
                  servicesGrid.appendChild(card);
              });
          }
      }).catch(function(error) {
          console.error('Error loading services:', error);
          servicesGrid.innerHTML = '<p style="text-align: center; color: var(--danger-color); padding: 2rem; grid-column: 1/-1;">Greška pri učitavanju usluga. Molimo osvežite stranicu.</p>';
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
              const h4 = document.createElement('h4');
              h4.textContent = service.name;
              const p1 = document.createElement('div');
              p1.className = 'service-description';
              p1.innerHTML = service.description;
              p1.style.marginBottom = '10px';
              const p2 = document.createElement('p');
              p2.className = 'service-price';
              const strong = document.createElement('strong');
              strong.textContent = service.price;
              p2.appendChild(strong);
              const editBtn = document.createElement('button');
              editBtn.textContent = 'Izmeni';
              editBtn.onclick = function() { editService(doc.id); };
              const deleteBtn = document.createElement('button');
              deleteBtn.textContent = 'Obrisi';
              deleteBtn.onclick = function() { deleteService(doc.id); };
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
          db.collection('services').doc(serviceId).get().then(function(doc) {
              if (doc.exists) {
                  const service = doc.data();
                  document.getElementById('serviceName').value = service.name;
                  if (quillEditor) {
                      quillEditor.root.innerHTML = service.description || '';
                  }
                  document.getElementById('servicePrice').value = service.price;
                  form.dataset.serviceId = serviceId;
              }
          });
      } else {
          modalTitle.textContent = 'Dodaj uslugu';
          form.reset();
          if (quillEditor) {
              quillEditor.setText('');
          }
          delete form.dataset.serviceId;
      }
      modal.style.display = 'flex';
  }

  function closeServiceModal() {
      document.getElementById('serviceModal').style.display = 'none';
      if (quillEditor) {
          quillEditor.setText('');
      }
  }

  function saveService() {
      const form = document.getElementById('serviceForm');
      const description = quillEditor ? quillEditor.root.innerHTML : '';
      const serviceData = {
          name: document.getElementById('serviceName').value,
          description: description,
          price: document.getElementById('servicePrice').value
      };
      const serviceId = form.dataset.serviceId;
      if (serviceId) {
          db.collection('services').doc(serviceId).update(serviceData).then(function() {
              closeServiceModal();
              loadServicesAdmin();
              alert('Usluga je azurirana!');
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
      if (confirm('Da li ste sigurni da zelite da obrisete ovu uslugu?')) {
          db.collection('services').doc(serviceId).delete().then(function() {
              loadServicesAdmin();
              alert('Usluga je obrisana!');
          });
      }
  }

   function loadAboutContent() {
      const aboutHeading = document.getElementById('aboutHeading');
      const aboutText = document.getElementById('aboutText');

      if (!aboutHeading || !aboutText) return;

      aboutHeading.innerHTML = '<div class="loading-spinner" style="width: 30px; height: 30px; border-width: 3px;"></div>';
      aboutText.innerHTML = '<div class="loading-spinner" style="width: 30px; height: 30px; border-width: 3px;"></div>';

      db.collection('content').doc('about').get().then(function(doc) {
          if (doc.exists) {
              const data = doc.data();

              aboutHeading.className = 'fade-in';
              aboutText.className = 'fade-in story-text';

              aboutHeading.textContent = data.heading || 'O nama - MS Sjaj';
              aboutText.textContent = data.text || 'Osnovani 2015. godine, MS Sjaj je započeo sa jednostavnom misijom - pružanje profesionalnih usluga čišćenja za domove i firme.';

              // Load stats if exists
              const statsSection = document.querySelector('.stats-section');
              if (statsSection && data.stats) {
                  statsSection.innerHTML = '';
                  data.stats.forEach(function(stat, index) {
                      const statBox = document.createElement('div');
                      statBox.className = 'stat-box fade-in';
                      statBox.style.animationDelay = (index * 0.1) + 's';

                      const statNumber = document.createElement('div');
                      statNumber.className = 'stat-number';
                      statNumber.textContent = stat.number;

                      const statLabel = document.createElement('div');
                      statLabel.className = 'stat-label';
                      statLabel.textContent = stat.label;

                      statBox.appendChild(statNumber);
                      statBox.appendChild(statLabel);
                      statsSection.appendChild(statBox);
                  });
              }

              // Load reasons if exists
              const reasonsGrid = document.querySelector('.reasons-grid');
              if (reasonsGrid && data.reasons) {
                  reasonsGrid.innerHTML = '';
                  data.reasons.forEach(function(reason, index) {
                      const reasonCard = document.createElement('div');
                      reasonCard.className = 'reason-card fade-in';
                      reasonCard.style.animationDelay = (index * 0.1) + 's';

                      const reasonIcon = document.createElement('div');
                      reasonIcon.className = 'reason-icon';
                      reasonIcon.textContent = reason.icon;

                      const reasonTitle = document.createElement('h3');
                      reasonTitle.textContent = reason.title;

                      const reasonDesc = document.createElement('p');
                      reasonDesc.textContent = reason.description;

                      reasonCard.appendChild(reasonIcon);
                      reasonCard.appendChild(reasonTitle);
                      reasonCard.appendChild(reasonDesc);
                      reasonsGrid.appendChild(reasonCard);
                  });
              }
          } else {
              aboutHeading.textContent = 'O nama - MS Sjaj';
              aboutText.textContent = 'Osnovani 2015. godine, MS Sjaj je započeo sa jednostavnom misijom - pružanje profesionalnih usluga čišćenja za domove i firme.';
          }
      }).catch(function(error) {
          console.error('Error loading about content:', error);
          aboutHeading.textContent = 'O nama - MS Sjaj';
          aboutText.textContent = 'Greška pri učitavanju sadržaja. Molimo osvežite stranicu.';
          aboutText.style.color = 'var(--danger-color)';
      });
  }


 // Load About Content Admin with Stats and Reasons
  function loadAboutContentAdmin() {
      const aboutHeading = document.getElementById('aboutHeading');
      const aboutText = document.getElementById('aboutText');
      const statsContainer = document.getElementById('statsContainer');
      const reasonsContainer = document.getElementById('reasonsContainer');

      if (!aboutHeading || !aboutText) return;

      db.collection('content').doc('about').get().then(function(doc) {
          if (doc.exists) {
              const data = doc.data();
              aboutHeading.value = data.heading || '';
              aboutText.value = data.text || '';

              // Load stats
              if (statsContainer) {
                  statsContainer.innerHTML = '';
                  const stats = data.stats || [];
                  stats.forEach(function(stat, index) {
                      addStatItem(statsContainer, stat, index);
                  });
              }

              // Load reasons
              if (reasonsContainer) {
                  reasonsContainer.innerHTML = '';
                  const reasons = data.reasons || [];
                  reasons.forEach(function(reason, index) {
                      addReasonItem(reasonsContainer, reason, index);
                  });
              }
          }
      });
  }

  // Add Stat Item to Admin
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

      const labelGroup = document.createElement('div');
      labelGroup.className = 'form-group';
      const labelLabel = document.createElement('label');
      labelLabel.textContent = 'Oznaka';
      const labelInput = document.createElement('input');
      labelInput.type = 'text';
      labelInput.value = stat ? (stat.label || '') : '';
      labelInput.setAttribute('data-index', index);
      labelInput.setAttribute('data-field', 'label');
      labelInput.placeholder = 'npr. Zadovoljnih klijenata';
      labelGroup.appendChild(labelLabel);
      labelGroup.appendChild(labelInput);

      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'btn';
      deleteBtn.textContent = 'Obriši statistiku';
      deleteBtn.style.cssText = 'background: var(--danger-color); color: white; width: 100%;';
      deleteBtn.onclick = function() { removeStat(index); };

      statDiv.appendChild(numberGroup);
      statDiv.appendChild(labelGroup);
      statDiv.appendChild(deleteBtn);
      container.appendChild(statDiv);
  }

  // Add new stat
  function addStat() {
      const container = document.getElementById('statsContainer');
      const index = container.children.length;
      addStatItem(container, null, index);
  }

  // Remove stat
  function removeStat(index) {
      const container = document.getElementById('statsContainer');
      if (container.children[index]) {
          container.children[index].remove();
      }
      Array.from(container.children).forEach(function(child, i) {
          child.querySelectorAll('[data-index]').forEach(function(el) {
              el.setAttribute('data-index', i);
          });
          const button = child.querySelector('button');
          if (button) {
              button.onclick = function() { removeStat(i); };
          }
      });
  }

  // Add Reason Item to Admin
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
      icons.forEach(function(icon) {
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

      const titleGroup = document.createElement('div');
      titleGroup.className = 'form-group';
      const titleLabel = document.createElement('label');
      titleLabel.textContent = 'Naslov';
      const titleInput = document.createElement('input');
      titleInput.type = 'text';
      titleInput.value = reason ? (reason.title || '') : '';
      titleInput.setAttribute('data-index', index);
      titleInput.setAttribute('data-field', 'title');
      titleInput.placeholder = 'Naslov razloga';
      titleGroup.appendChild(titleLabel);
      titleGroup.appendChild(titleInput);

      const descGroup = document.createElement('div');
      descGroup.className = 'form-group';
      const descLabel = document.createElement('label');
      descLabel.textContent = 'Opis';
      const descTextarea = document.createElement('textarea');
      descTextarea.rows = 3;
      descTextarea.value = reason ? (reason.description || '') : '';
      descTextarea.setAttribute('data-index', index);
      descTextarea.setAttribute('data-field', 'description');
      descTextarea.placeholder = 'Opis razloga';
      descGroup.appendChild(descLabel);
      descGroup.appendChild(descTextarea);

      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'btn';
      deleteBtn.textContent = 'Obriši razlog';
      deleteBtn.style.cssText = 'background: var(--danger-color); color: white; width: 100%;';
      deleteBtn.onclick = function() { removeReason(index); };

      reasonDiv.appendChild(iconGroup);
      reasonDiv.appendChild(titleGroup);
      reasonDiv.appendChild(descGroup);
      reasonDiv.appendChild(deleteBtn);
      container.appendChild(reasonDiv);
  }

  // Add new reason
  function addReason() {
      const container = document.getElementById('reasonsContainer');
      const index = container.children.length;
      if (index >= 6) {
          alert('Možete dodati maksimalno 6 razloga.');
          return;
      }
      addReasonItem(container, null, index);
  }

  // Remove reason
  function removeReason(index) {
      const container = document.getElementById('reasonsContainer');
      if (container.children[index]) {
          container.children[index].remove();
      }
      Array.from(container.children).forEach(function(child, i) {
          child.querySelectorAll('[data-index]').forEach(function(el) {
              el.setAttribute('data-index', i);
          });
          const button = child.querySelector('button');
          if (button) {
              button.onclick = function() { removeReason(i); };
          }
      });
  }

  // Updated Save About Content
  function saveAboutContent() {
      const statsContainer = document.getElementById('statsContainer');
      const reasonsContainer = document.getElementById('reasonsContainer');

      const stats = [];
      const reasons = [];

      // Collect stats
      if (statsContainer) {
          statsContainer.querySelectorAll('.feature-item').forEach(function(item) {
              stats.push({
                  number: item.querySelector('[data-field="number"]').value,
                  label: item.querySelector('[data-field="label"]').value
              });
          });
      }

      // Collect reasons
      if (reasonsContainer) {
          reasonsContainer.querySelectorAll('.feature-item').forEach(function(item) {
              reasons.push({
                  icon: item.querySelector('[data-field="icon"]').value,
                  title: item.querySelector('[data-field="title"]').value,
                  description: item.querySelector('[data-field="description"]').value
              });
          });
      }

      db.collection('content').doc('about').set({
          heading: document.getElementById('aboutHeading').value,
          text: document.getElementById('aboutText').value,
          stats: stats,
          reasons: reasons
      }).then(function() {
          alert('Sadržaj O nama stranice je sačuvan!');
      });
  }



   function loadTestimonials() {
      const testimonialsGrid = document.getElementById('testimonialsGrid');
      if (!testimonialsGrid) return;

      showLoading('testimonialsGrid');

      db.collection('testimonials').get().then(function(querySnapshot) {
          const testimonials = [];
          querySnapshot.forEach(function(doc) {
              testimonials.push({ id: doc.id, ...doc.data() });
          });

          testimonialsGrid.innerHTML = '';

          if (testimonials.length === 0) {
              showEmptyState('testimonialsGrid', 'Trenutno nema dostupnih recenzija.');
          } else {
              testimonials.forEach(function(testimonial, index) {
                  const card = document.createElement('div');
                  card.className = 'testimonial-card fade-in';
                  card.style.animationDelay = (index * 0.1) + 's';

                  // Testimonial text
                  const text = document.createElement('p');
                  text.className = 'testimonial-text';
                  text.textContent = testimonial.text;

                  // Star rating (dynamic based on database value)
                  const rating = document.createElement('div');
                  rating.className = 'testimonial-rating';
                  const ratingValue = testimonial.rating || 5;
                  const fullStars = '★'.repeat(ratingValue);
                  const emptyStars = '☆'.repeat(5 - ratingValue);
                  rating.innerHTML = fullStars + emptyStars;

                  // Author section with avatar
                  const authorSection = document.createElement('div');
                  authorSection.className = 'testimonial-author-section';

                  const avatar = document.createElement('div');
                  avatar.className = 'author-avatar';
                  avatar.textContent = testimonial.author.charAt(0).toUpperCase();

                  const authorInfo = document.createElement('div');
                  authorInfo.className = 'author-info';

                  const authorName = document.createElement('strong');
                  authorName.textContent = testimonial.author;

                  authorInfo.appendChild(authorName);
                  // No authorTitle added!

                  authorSection.appendChild(avatar);
                  authorSection.appendChild(authorInfo);

                  // Append all elements to card
                  card.appendChild(text);
                  card.appendChild(rating);
                  card.appendChild(authorSection);

                  testimonialsGrid.appendChild(card);
              });
          }
      }).catch(function(error) {
          console.error('Error loading testimonials:', error);
          testimonialsGrid.innerHTML = '<p style="text-align: center; color: var(--danger-color); padding: 2rem; grid-column: 1/-1;">Greška pri učitavanju recenzija. Molimo osvežite stranicu.</p>';
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
              const contentDiv = document.createElement('div');
              contentDiv.className = 'testimonial-content';

              const p1 = document.createElement('p');
              p1.textContent = '"' + testimonial.text + '"';

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
              editBtn.onclick = function() { editTestimonial(doc.id); };
              const deleteBtn = document.createElement('button');
              deleteBtn.textContent = 'Obrisi';
              deleteBtn.onclick = function() { deleteTestimonial(doc.id); };
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
          db.collection('testimonials').doc(testimonialId).get().then(function(doc) {
              if (doc.exists) {
                  const testimonial = doc.data();
                  document.getElementById('testimonialText').value = testimonial.text;
                  document.getElementById('testimonialAuthor').value = testimonial.author;
                  document.getElementById('testimonialRating').value = testimonial.rating || 5;
                  form.dataset.testimonialId = testimonialId;
              }
          });
      } else {
          form.reset();
          document.getElementById('testimonialRating').value = 5; // Default to 5 stars
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
          author: document.getElementById('testimonialAuthor').value,
          rating: parseInt(document.getElementById('testimonialRating').value)
      };
      const testimonialId = form.dataset.testimonialId;
      if (testimonialId) {
          db.collection('testimonials').doc(testimonialId).update(testimonialData).then(function() {
              closeTestimonialModal();
              loadTestimonialsAdmin();
              alert('Recenzija je azurirana!');
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
      if (confirm('Da li ste sigurni da zelite da obrisete ovu recenziju?')) {
          db.collection('testimonials').doc(testimonialId).delete().then(function() {
              loadTestimonialsAdmin();
              alert('Recenzija je obrisana!');
          });
      }
  }

  function loadGallery() {
      const galleryGrid = document.getElementById('galleryGrid');
      if (!galleryGrid) return;

      showLoading('galleryGrid');

      db.collection('gallery').orderBy('uploadedAt', 'desc').get().then(function(querySnapshot) {
          galleryGrid.innerHTML = '';

          if (querySnapshot.empty) {
              showEmptyState('galleryGrid', 'Trenutno nema fotografija u galeriji.');
          } else {
              querySnapshot.forEach(function(doc, index) {
                  const photo = doc.data();
                  const div = document.createElement('div');
                  div.className = 'gallery-item fade-in';
                  div.style.animationDelay = (index * 0.05) + 's';

                  const img = document.createElement('img');
                  img.src = photo.url;
                  img.alt = 'Galerija';

                  div.appendChild(img);
                  galleryGrid.appendChild(div);
              });
          }
      }).catch(function(error) {
          console.error('Error loading gallery:', error);
          galleryGrid.innerHTML = '<p style="text-align: center; color: var(--danger-color); padding: 2rem; grid-column: 1/-1;">Greška pri učitavanju galerije. Molimo osvežite stranicu.</p>';
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
              const img = document.createElement('img');
              img.src = photo.url;
              img.alt = 'Galerija';
              const deleteBtn = document.createElement('button');
              deleteBtn.className = 'delete-photo';
              deleteBtn.textContent = 'Obrisi';
              deleteBtn.onclick = function() { deletePhoto(doc.id); };
              div.appendChild(img);
              div.appendChild(deleteBtn);
              galleryAdmin.appendChild(div);
          });
      });
  }

  function setupAdminForms() {
      const photoInput = document.getElementById('photoInput');
      if (photoInput) {
          photoInput.addEventListener('change', function(e) {
              const file = e.target.files[0];
              if (!file) return;
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
                          db.collection('gallery').add({
                              url: imageUrl,
                              filename: file.name,
                              uploadedAt: firebase.firestore.FieldValue.serverTimestamp()
                          }).then(function() {
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
  }

  function deletePhoto(photoId) {
      if (confirm('Da li ste sigurni da zelite da obrisete ovu fotografiju?')) {
          db.collection('gallery').doc(photoId).delete().then(function() {
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
          alert('Kontakt informacije su sacuvane!');
          updateFooterContent();
      });
  }

  function loadAddOns() {
      const addonsGrid = document.getElementById('addonsGrid');
      if (!addonsGrid) return;

      showLoading('addonsGrid');

      db.collection('addons').get().then(function(querySnapshot) {
          const addons = [];
          querySnapshot.forEach(function(doc) {
              addons.push({ id: doc.id, ...doc.data() });
          });

          addonsGrid.innerHTML = '';

          if (addons.length === 0) {
              showEmptyState('addonsGrid', 'Trenutno nema dostupnih dodatnih usluga.');
          } else {
              addons.forEach(function(addon, index) {
                  const card = document.createElement('div');
                  card.className = 'addon-card fade-in';
                  card.style.animationDelay = (index * 0.1) + 's';

                  const h4 = document.createElement('h4');
                  h4.textContent = addon.name;

                  const p = document.createElement('p');
                  p.textContent = addon.price + ' RSD';

                  card.appendChild(h4);
                  card.appendChild(p);
                  addonsGrid.appendChild(card);
              });
          }
      }).catch(function(error) {
          console.error('Error loading add-ons:', error);
          addonsGrid.innerHTML = '<p style="text-align: center; color: var(--danger-color); padding: 2rem; grid-column: 1/-1;">Greška pri učitavanju dodatnih usluga. Molimo osvežite stranicu.</p>';
      });
  }

  function loadAddOnsAdmin() {
      const addonsList = document.getElementById('addonsList');
      if (!addonsList) return;
      db.collection('addons').get().then(function(querySnapshot) {
          addonsList.innerHTML = '';
          if (querySnapshot.empty) {
              const emptyMsg = document.createElement('p');
              emptyMsg.style.cssText = 'text-align: center; color: var(--text-light); padding: 2rem;';
              emptyMsg.textContent = 'Nema dodatnih usluga. Kliknite "Dodaj novu dodatnu uslugu" da biste dodali prvu.';
              addonsList.appendChild(emptyMsg);
              return;
          }
          querySnapshot.forEach(function(doc) {
              const addon = doc.data();
              const div = document.createElement('div');
              div.className = 'addon-item';
              const h4 = document.createElement('h4');
              h4.textContent = addon.name;
              const p1 = document.createElement('p');
              p1.textContent = addon.description;
              p1.style.marginBottom = '10px';
              const p2 = document.createElement('p');
              p2.className = 'addon-price';
              const strong = document.createElement('strong');
              strong.textContent = addon.price;
              p2.appendChild(strong);
              const editBtn = document.createElement('button');
              editBtn.textContent = 'Izmeni';
              editBtn.onclick = function() { editAddOn(doc.id); };
              const deleteBtn = document.createElement('button');
              deleteBtn.textContent = 'Obrisi';
              deleteBtn.onclick = function() { deleteAddOn(doc.id); };
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
          db.collection('addons').doc(addonId).get().then(function(doc) {
              if (doc.exists) {
                  const addon = doc.data();
                  document.getElementById('addonName').value = addon.name;
                  document.getElementById('addonDescription').value = addon.description;
                  document.getElementById('addonPrice').value = addon.price;
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
          name: document.getElementById('addonName').value,
          description: document.getElementById('addonDescription').value,
          price: document.getElementById('addonPrice').value
      };
      const addonId = form.dataset.addonId;
      if (addonId) {
          db.collection('addons').doc(addonId).update(addonData).then(function() {
              closeAddOnModal();
              loadAddOnsAdmin();
              alert('Dodatna usluga je azurirana!');
          });
      } else {
          db.collection('addons').add(addonData).then(function() {
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
          db.collection('addons').doc(addonId).delete().then(function() {
              loadAddOnsAdmin();
              alert('Dodatna usluga je obrisana!');
          });
      }
  }
