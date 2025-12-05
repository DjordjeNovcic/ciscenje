  // ========================================
  // INITIALIZE APP
  // ========================================
  document.addEventListener('DOMContentLoaded', function() {
      initializeApp();
  });

  function initializeApp() {
      // Initialize default content if first time
      initializeDefaultContent();

      // Mobile navigation
      setupMobileNav();

      // Contact form
      setupContactForm();

      // Admin login
      setupAdminLogin();

      // Admin dashboard
      setupAdminDashboard();

      // Smooth scrolling
      setupSmoothScrolling();

      // Load dynamic content on public pages
      loadPublicPageContent();
  }

  // ========================================
  // DEFAULT CONTENT INITIALIZATION
  // ========================================
  function initializeDefaultContent() {
      // Only initialize if content doesn't exist
      if (!localStorage.getItem('homeContent')) {
          const defaultHome = {
              heroTitle: 'Professional Cleaning Services',
              heroSubtitle: 'Residential & Commercial Excellence',
              feature1Title: 'Experienced Team',
              feature1Text: 'Professional cleaners with years of experience in both residential and commercial cleaning.',
              feature2Title: 'Eco-Friendly',
              feature2Text: 'We use environmentally safe cleaning products that are tough on dirt but gentle on your space.',
              feature3Title: 'Flexible Scheduling',
              feature3Text: 'We work around your schedule with convenient booking times including evenings and weekends.',
              feature4Title: 'Satisfaction Guaranteed',
              feature4Text: '100% satisfaction guarantee or we\'ll come back and make it right at no extra cost.'
          };
          localStorage.setItem('homeContent', JSON.stringify(defaultHome));
      }

      if (!localStorage.getItem('servicesContent')) {
          const defaultServices = {
              basicCleanPrice: 89,
              deepCleanPrice: 149,
              moveInOutPrice: 199,
              officeCleaningPrice: 299,
              retailSpacePrice: 399
          };
          localStorage.setItem('servicesContent', JSON.stringify(defaultServices));
      }

      if (!localStorage.getItem('aboutContent')) {
          const defaultAbout = {
              paragraph1: 'Founded in 2015, CleanPro started with a simple mission: to provide exceptional cleaning services that make life easier for homeowners and 
  businesses alike.',
              paragraph2: 'What began as a small residential cleaning service has grown into a trusted name in both residential and commercial cleaning. Our success 
  is built on our commitment to quality, reliability, and customer satisfaction.',
              paragraph3: 'Today, we serve hundreds of satisfied customers across the region, and our team of professional cleaners continues to uphold the high 
  standards that have made us a leader in the industry.',
              companyEmail: 'info@cleanpro.com',
              companyPhone: '(555) 123-4567',
              companyHours: 'Mon-Fri: 8AM - 6PM\nSat: 9AM - 4PM'
          };
          localStorage.setItem('aboutContent', JSON.stringify(defaultAbout));
      }
  }

  // ========================================
  // MOBILE NAVIGATION
  // ========================================
  function setupMobileNav() {
      const hamburger = document.querySelector('.hamburger');
      const navMenu = document.querySelector('.nav-menu');

      if (hamburger) {
          hamburger.addEventListener('click', function() {
              navMenu.classList.toggle('active');
          });
      }
  }

  // ========================================
  // CONTACT FORM
  // ========================================
  function setupContactForm() {
      const contactForm = document.getElementById('contactForm');
      if (contactForm) {
          contactForm.addEventListener('submit', function(e) {
              e.preventDefault();

              const formData = new FormData(contactForm);
              const data = Object.fromEntries(formData);

              alert('Thank you for your inquiry! We will contact you shortly.\n\nDetails:\n' +
                    'Name: ' + data.name + '\n' +
                    'Email: ' + data.email + '\n' +
                    'Phone: ' + data.phone + '\n' +
                    'Service: ' + data.serviceType);

              contactForm.reset();
          });
      }
  }

  // ========================================
  // ADMIN LOGIN
  // ========================================
  function setupAdminLogin() {
      const loginForm = document.getElementById('loginForm');
      if (loginForm) {
          loginForm.addEventListener('submit', function(e) {
              e.preventDefault();

              const username = document.getElementById('username').value;
              const password = document.getElementById('password').value;
              const errorMessage = document.getElementById('loginError');

              if (username === 'admin' && password === 'admin123') {
                  localStorage.setItem('isAdminLoggedIn', 'true');
                  localStorage.setItem('adminUsername', username);
                  window.location.href = 'admin-dashboard.html';
              } else {
                  errorMessage.style.display = 'block';
                  setTimeout(() => {
                      errorMessage.style.display = 'none';
                  }, 3000);
              }
          });
      }
  }

  // ========================================
  // ADMIN DASHBOARD
  // ========================================
  function setupAdminDashboard() {
      const adminLayout = document.querySelector('.admin-layout');
      if (!adminLayout) return;

      // Check authentication
      const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
      if (!isLoggedIn) {
          window.location.href = 'admin-login.html';
          return;
      }

      // Display username
      const adminUser = document.getElementById('adminUsername');
      if (adminUser) {
          const username = localStorage.getItem('adminUsername');
          adminUser.textContent = 'Welcome, ' + (username || 'Admin');
      }

      // Setup logout
      const logoutBtn = document.getElementById('logoutBtn');
      if (logoutBtn) {
          logoutBtn.addEventListener('click', function() {
              localStorage.removeItem('isAdminLoggedIn');
              localStorage.removeItem('adminUsername');
              window.location.href = 'admin-login.html';
          });
      }

      // Initialize dashboard features
      setupSectionNavigation();
      setupHomeCMS();
      setupServicesCMS();
      setupAboutCMS();
      setupTestimonialManagement();
      setupPhotoGallery();
      setupSettings();
      updateDashboardStats();
  }

  // ========================================
  // SECTION NAVIGATION
  // ========================================
  function setupSectionNavigation() {
      const navItems = document.querySelectorAll('.sidebar-nav .nav-item');

      navItems.forEach(item => {
          item.addEventListener('click', function(e) {
              e.preventDefault();

              navItems.forEach(nav => nav.classList.remove('active'));
              this.classList.add('active');

              const sectionName = this.getAttribute('data-section');

              document.querySelectorAll('.content-section').forEach(section => {
                  section.classList.remove('active');
              });

              const sectionToShow = document.getElementById(sectionName + 'Section');
              if (sectionToShow) {
                  sectionToShow.classList.add('active');
              }

              const pageTitle = document.getElementById('pageTitle');
              if (pageTitle) {
                  pageTitle.textContent = this.textContent.trim();
              }
          });
      });
  }

  function goToSection(sectionName) {
      const navItem = document.querySelector(`[data-section="${sectionName}"]`);
      if (navItem) {
          navItem.click();
      }
  }

  // ========================================
  // HOME PAGE CMS
  // ========================================
  function setupHomeCMS() {
      const homeForm = document.getElementById('homeForm');
      if (!homeForm) return;

      // Load current content
      loadHomeContent();

      // Save on submit
      homeForm.addEventListener('submit', function(e) {
          e.preventDefault();

          const content = {
              heroTitle: document.getElementById('heroTitle').value,
              heroSubtitle: document.getElementById('heroSubtitle').value,
              feature1Title: document.getElementById('feature1Title').value,
              feature1Text: document.getElementById('feature1Text').value,
              feature2Title: document.getElementById('feature2Title').value,
              feature2Text: document.getElementById('feature2Text').value,
              feature3Title: document.getElementById('feature3Title').value,
              feature3Text: document.getElementById('feature3Text').value,
              feature4Title: document.getElementById('feature4Title').value,
              feature4Text: document.getElementById('feature4Text').value
          };

          localStorage.setItem('homeContent', JSON.stringify(content));
          alert('Home page content saved! Refresh your website to see changes.');
      });
  }

  function loadHomeContent() {
      const content = JSON.parse(localStorage.getItem('homeContent'));
      if (!content) return;

      document.getElementById('heroTitle').value = content.heroTitle || '';
      document.getElementById('heroSubtitle').value = content.heroSubtitle || '';
      document.getElementById('feature1Title').value = content.feature1Title || '';
      document.getElementById('feature1Text').value = content.feature1Text || '';
      document.getElementById('feature2Title').value = content.feature2Title || '';
      document.getElementById('feature2Text').value = content.feature2Text || '';
      document.getElementById('feature3Title').value = content.feature3Title || '';
      document.getElementById('feature3Text').value = content.feature3Text || '';
      document.getElementById('feature4Title').value = content.feature4Title || '';
      document.getElementById('feature4Text').value = content.feature4Text || '';
  }

  // ========================================
  // SERVICES CMS
  // ========================================
  function setupServicesCMS() {
      const servicesForm = document.getElementById('servicesForm');
      if (!servicesForm) return;

      // Load current prices
      loadServicesContent();

      // Save on submit
      servicesForm.addEventListener('submit', function(e) {
          e.preventDefault();

          const content = {
              basicCleanPrice: parseInt(document.getElementById('basicCleanPrice').value),
              deepCleanPrice: parseInt(document.getElementById('deepCleanPrice').value),
              moveInOutPrice: parseInt(document.getElementById('moveInOutPrice').value),
              officeCleaningPrice: parseInt(document.getElementById('officeCleaningPrice').value),
              retailSpacePrice: parseInt(document.getElementById('retailSpacePrice').value)
          };

          localStorage.setItem('servicesContent', JSON.stringify(content));
          alert('Services pricing saved! Refresh your services page to see changes.');
      });
  }

  function loadServicesContent() {
      const content = JSON.parse(localStorage.getItem('servicesContent'));
      if (!content) return;

      document.getElementById('basicCleanPrice').value = content.basicCleanPrice || 89;
      document.getElementById('deepCleanPrice').value = content.deepCleanPrice || 149;
      document.getElementById('moveInOutPrice').value = content.moveInOutPrice || 199;
      document.getElementById('officeCleaningPrice').value = content.officeCleaningPrice || 299;
      document.getElementById('retailSpacePrice').value = content.retailSpacePrice || 399;
  }

  // ========================================
  // ABOUT PAGE CMS
  // ========================================
  function setupAboutCMS() {
      const aboutForm = document.getElementById('aboutForm');
      if (!aboutForm) return;

      // Load current content
      loadAboutContent();

      // Save on submit
      aboutForm.addEventListener('submit', function(e) {
          e.preventDefault();

          const content = {
              paragraph1: document.getElementById('aboutParagraph1').value,
              paragraph2: document.getElementById('aboutParagraph2').value,
              paragraph3: document.getElementById('aboutParagraph3').value,
              companyEmail: document.getElementById('companyEmail').value,
              companyPhone: document.getElementById('companyPhone').value,
              companyHours: document.getElementById('companyHours').value
          };

          localStorage.setItem('aboutContent', JSON.stringify(content));
          alert('About page content saved! Refresh your website to see changes.');
      });
  }

  function loadAboutContent() {
      const content = JSON.parse(localStorage.getItem('aboutContent'));
      if (!content) return;

      document.getElementById('aboutParagraph1').value = content.paragraph1 || '';
      document.getElementById('aboutParagraph2').value = content.paragraph2 || '';
      document.getElementById('aboutParagraph3').value = content.paragraph3 || '';
      document.getElementById('companyEmail').value = content.companyEmail || '';
      document.getElementById('companyPhone').value = content.companyPhone || '';
      document.getElementById('companyHours').value = content.companyHours || '';
  }

  // ========================================
  // TESTIMONIAL MANAGEMENT
  // ========================================
  let currentEditingTestimonialId = null;

  function setupTestimonialManagement() {
      const addTestimonialBtn = document.getElementById('addTestimonialBtn');
      const testimonialModal = document.getElementById('testimonialModal');
      const testimonialForm = document.getElementById('testimonialForm');
      const cancelTestimonialBtn = document.getElementById('cancelTestimonialBtn');
      const closeBtn = testimonialModal.querySelector('.close');

      // Load testimonials
      loadTestimonials();

      // Open modal
      if (addTestimonialBtn) {
          addTestimonialBtn.addEventListener('click', () => openTestimonialModal());
      }

      // Close modal
      [cancelTestimonialBtn, closeBtn].forEach(btn => {
          if (btn) {
              btn.addEventListener('click', () => closeTestimonialModal());
          }
      });

      // Close on outside click
      testimonialModal.addEventListener('click', function(e) {
          if (e.target === testimonialModal) {
              closeTestimonialModal();
          }
      });

      // Submit form
      testimonialForm.addEventListener('submit', function(e) {
          e.preventDefault();
          saveTestimonial();
      });
  }

  function openTestimonialModal(testimonialId = null) {
      const modal = document.getElementById('testimonialModal');
      const modalTitle = document.getElementById('testimonialModalTitle');
      const form = document.getElementById('testimonialForm');

      form.reset();
      currentEditingTestimonialId = testimonialId;

      if (testimonialId) {
          modalTitle.textContent = 'Edit Testimonial';
          const testimonials = getTestimonials();
          const testimonial = testimonials.find(t => t.id === testimonialId);

          if (testimonial) {
              document.getElementById('testimonialText').value = testimonial.text;
              document.getElementById('testimonialAuthor').value = testimonial.author;
              document.getElementById('testimonialRole').value = testimonial.role;
              document.getElementById('testimonialRating').value = testimonial.rating;
          }
      } else {
          modalTitle.textContent = 'New Testimonial';
      }

      modal.classList.add('active');
  }

  function closeTestimonialModal() {
      const modal = document.getElementById('testimonialModal');
      modal.classList.remove('active');
      currentEditingTestimonialId = null;
  }

  function saveTestimonial() {
      const testimonials = getTestimonials();

      const testimonial = {
          id: currentEditingTestimonialId || Date.now().toString(),
          text: document.getElementById('testimonialText').value,
          author: document.getElementById('testimonialAuthor').value,
          role: document.getElementById('testimonialRole').value,
          rating: document.getElementById('testimonialRating').value
      };

      if (currentEditingTestimonialId) {
          const index = testimonials.findIndex(t => t.id === currentEditingTestimonialId);
          if (index !== -1) {
              testimonials[index] = testimonial;
          }
      } else {
          testimonials.push(testimonial);
      }

      localStorage.setItem('testimonials', JSON.stringify(testimonials));

      closeTestimonialModal();
      loadTestimonials();
      updateDashboardStats();

      alert('Testimonial saved! Refresh your about page to see changes.');
  }

  function deleteTestimonial(testimonialId) {
      if (!confirm('Are you sure you want to delete this testimonial?')) {
          return;
      }

      let testimonials = getTestimonials();
      testimonials = testimonials.filter(t => t.id !== testimonialId);
      localStorage.setItem('testimonials', JSON.stringify(testimonials));

      loadTestimonials();
      updateDashboardStats();

      alert('Testimonial deleted!');
  }

  function getTestimonials() {
      const testimonials = localStorage.getItem('testimonials');
      return testimonials ? JSON.parse(testimonials) : [];
  }

  function loadTestimonials() {
      const testimonials = getTestimonials();
      const testimonialsList = document.getElementById('testimonialsList');

      if (!testimonialsList) return;

      if (testimonials.length === 0) {
          testimonialsList.innerHTML = '<p style="text-align: center; color: #64748b; padding: 2rem;">No testimonials yet. Click "Add Testimonial" to create 
  one.</p>';
      } else {
          testimonialsList.innerHTML = testimonials.map(t => {
              const stars = '⭐'.repeat(parseInt(t.rating));
              return `
                  <div class="testimonial-item">
                      <div class="testimonial-content">
                          <div class="stars">${stars}</div>
                          <p>"${t.text}"</p>
                          <strong>${t.author}</strong>
                          <span>${t.role || 'Customer'}</span>
                      </div>
                      <div class="testimonial-actions">
                          <button class="btn-icon" onclick="openTestimonialModal('${t.id}')" title="Edit">✏️</button>
                          <button class="btn-icon" onclick="deleteTestimonial('${t.id}')" title="Delete">🗑️</button>
                      </div>
                  </div>
              `;
          }).join('');
      }
  }

  // ========================================
  // PHOTO GALLERY
  // ========================================
  function setupPhotoGallery() {
      const uploadPhotoBtn = document.getElementById('uploadPhotoBtn');
      const photoModal = document.getElementById('photoModal');
      const photoForm = document.getElementById('photoForm');
      const cancelPhotoBtn = document.getElementById('cancelPhotoBtn');
      const closeBtn = photoModal.querySelector('.close');
      const photoFile = document.getElementById('photoFile');
      const photoPreview = document.getElementById('photoPreview');

      // Load photos
      loadPhotos();

      // Open modal
      if (uploadPhotoBtn) {
          uploadPhotoBtn.addEventListener('click', () => {
              photoForm.reset();
              photoPreview.innerHTML = '';
              photoModal.classList.add('active');
          });
      }

      // Close modal
      [cancelPhotoBtn, closeBtn].forEach(btn => {
          if (btn) {
              btn.addEventListener('click', () => {
                  photoModal.classList.remove('active');
              });
          }
      });

      // Close on outside click
      photoModal.addEventListener('click', function(e) {
          if (e.target === photoModal) {
              photoModal.classList.remove('active');
          }
      });

      // Preview photo
      photoFile.addEventListener('change', function(e) {
          const file = e.target.files[0];
          if (file) {
              const reader = new FileReader();
              reader.onload = function(event) {
                  photoPreview.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
              };
              reader.readAsDataURL(file);
          }
      });

      // Submit form
      photoForm.addEventListener('submit', function(e) {
          e.preventDefault();
          savePhoto();
      });
  }

  function savePhoto() {
      const photoFile = document.getElementById('photoFile').files[0];
      const photoTitle = document.getElementById('photoTitle').value;
      const photoDescription = document.getElementById('photoDescription').value;

      if (!photoFile) {
          alert('Please select a photo');
          return;
      }

      const reader = new FileReader();
      reader.onload = function(event) {
          const photos = getPhotos();

          const photo = {
              id: Date.now().toString(),
              title: photoTitle,
              description: photoDescription,
              imageData: event.target.result,
              uploadedAt: new Date().toISOString()
          };

          photos.push(photo);
          localStorage.setItem('photos', JSON.stringify(photos));

          document.getElementById('photoModal').classList.remove('active');
          loadPhotos();
          updateDashboardStats();

          alert('Photo uploaded successfully!');
      };

      reader.readAsDataURL(photoFile);
  }

  function deletePhoto(photoId) {
      if (!confirm('Are you sure you want to delete this photo?')) {
          return;
      }

      let photos = getPhotos();
      photos = photos.filter(p => p.id !== photoId);
      localStorage.setItem('photos', JSON.stringify(photos));

      loadPhotos();
      updateDashboardStats();
      alert('Photo deleted successfully!');
  }

  function getPhotos() {
      const photos = localStorage.getItem('photos');
      return photos ? JSON.parse(photos) : [];
  }

  function loadPhotos() {
      const photos = getPhotos();
      const photoGallery = document.getElementById('photoGallery');

      if (!photoGallery) return;

      if (photos.length === 0) {
          photoGallery.innerHTML = `
              <div class="empty-gallery">
                  <p>📷</p>
                  <p>No photos yet. Click "Upload Photo" to add before/after images of your work.</p>
              </div>
          `;
      } else {
          photoGallery.innerHTML = photos.reverse().map(photo => `
              <div class="photo-card">
                  <img src="${photo.imageData}" alt="${photo.title}">
                  <div class="photo-info">
                      <h4>${photo.title}</h4>
                      <p>${photo.description || 'No description'}</p>
                      <div class="photo-actions">
                          <button class="btn btn-secondary" onclick="deletePhoto('${photo.id}')">🗑️ Delete</button>
                      </div>
                  </div>
              </div>
          `).join('');
      }
  }

  // ========================================
  // SETTINGS
  // ========================================
  function setupSettings() {
      const resetToDefaultBtn = document.getElementById('resetToDefaultBtn');
      const clearDataBtn = document.getElementById('clearDataBtn');

      if (resetToDefaultBtn) {
          resetToDefaultBtn.addEventListener('click', function() {
              if (confirm('Reset all content to default? Your customizations will be lost.')) {
                  localStorage.removeItem('homeContent');
                  localStorage.removeItem('servicesContent');
                  localStorage.removeItem('aboutContent');
                  initializeDefaultContent();
                  loadHomeContent();
                  loadServicesContent();
                  loadAboutContent();
                  alert('Content reset to defaults!');
              }
          });
      }

      if (clearDataBtn) {
          clearDataBtn.addEventListener('click', function() {
              if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
                  if (confirm('This will delete ALL content, testimonials and photos. Are you absolutely sure?')) {
                      localStorage.removeItem('homeContent');
                      localStorage.removeItem('servicesContent');
                      localStorage.removeItem('aboutContent');
                      localStorage.removeItem('testimonials');
                      localStorage.removeItem('photos');
                      initializeDefaultContent();
                      loadHomeContent();
                      loadServicesContent();
                      loadAboutContent();
                      loadTestimonials();
                      loadPhotos();
                      updateDashboardStats();
                      alert('All data has been cleared.');
                  }
              }
          });
      }
  }

  // ========================================
  // DASHBOARD STATS
  // ========================================
  function updateDashboardStats() {
      const testimonialsCount = document.getElementById('testimonialsCount');
      if (testimonialsCount) {
          testimonialsCount.textContent = getTestimonials().length;
      }

      const photosCount = document.getElementById('photosCount');
      if (photosCount) {
          photosCount.textContent = getPhotos().length;
      }
  }

  // ========================================
  // LOAD CONTENT ON PUBLIC PAGES
  // ========================================
  function loadPublicPageContent() {
      // Only run on public pages (not admin pages)
      if (document.querySelector('.admin-layout')) return;

      loadHomePageContent();
      loadServicesPageContent();
      loadAboutPageContent();
  }

  function loadHomePageContent() {
      const content = JSON.parse(localStorage.getItem('homeContent'));
      if (!content) return;

      // Update hero section
      const heroTitle = document.querySelector('.hero h1');
      const heroSubtitle = document.querySelector('.hero p');
      if (heroTitle) heroTitle.textContent = content.heroTitle;
      if (heroSubtitle) heroSubtitle.textContent = content.heroSubtitle;

      // Update features
      const featureCards = document.querySelectorAll('.feature-card');
      if (featureCards.length >= 4) {
          featureCards[0].querySelector('h3').textContent = content.feature1Title;
          featureCards[0].querySelector('p').textContent = content.feature1Text;
          featureCards[1].querySelector('h3').textContent = content.feature2Title;
          featureCards[1].querySelector('p').textContent = content.feature2Text;
          featureCards[2].querySelector('h3').textContent = content.feature3Title;
          featureCards[2].querySelector('p').textContent = content.feature3Text;
          featureCards[3].querySelector('h3').textContent = content.feature4Title;
          featureCards[3].querySelector('p').textContent = content.feature4Text;
      }
  }

  function loadServicesPageContent() {
      const content = JSON.parse(localStorage.getItem('servicesContent'));
      if (!content) return;

      // Update prices in the page
      const prices = document.querySelectorAll('.price');
      if (prices.length >= 5) {
          prices[0].textContent = '$' + content.basicCleanPrice;
          prices[1].textContent = '$' + content.deepCleanPrice;
          prices[2].textContent = '$' + content.moveInOutPrice;
          prices[3].textContent = '$' + content.officeCleaningPrice;
          prices[4].textContent = '$' + content.retailSpacePrice;
      }
  }

  function loadAboutPageContent() {
      const content = JSON.parse(localStorage.getItem('aboutContent'));
      if (!content) return;

      // Update about text
      const aboutText = document.querySelector('.about-text');
      if (aboutText) {
          const paragraphs = aboutText.querySelectorAll('p');
          if (paragraphs.length >= 3) {
              paragraphs[0].textContent = content.paragraph1;
              paragraphs[1].textContent = content.paragraph2;
              paragraphs[2].textContent = content.paragraph3;
          }
      }

      // Update contact info in footer
      updateFooterContact(content);

      // Load testimonials
      loadPublicTestimonials();
  }

  function updateFooterContact(content) {
      const footerEmail = document.querySelector('.footer-section p');
      const footerPhone = document.querySelectorAll('.footer-section p')[1];

      if (footerEmail && content.companyEmail) {
          footerEmail.textContent = 'Email: ' + content.companyEmail;
      }
      if (footerPhone && content.companyPhone) {
          footerPhone.textContent = 'Phone: ' + content.companyPhone;
      }
  }

  function loadPublicTestimonials() {
      const testimonials = getTestimonials();
      const testimonialsGrid = document.querySelector('.testimonials-grid');

      if (!testimonialsGrid || testimonials.length === 0) return;

      testimonialsGrid.innerHTML = testimonials.map(t => {
          const stars = '⭐'.repeat(parseInt(t.rating));
          return `
              <div class="testimonial-card">
                  <div class="stars">${stars}</div>
                  <p>"${t.text}"</p>
                  <div class="testimonial-author">
                      <strong>${t.author}</strong>
                      <span>${t.role || 'Customer'}</span>
                  </div>
              </div>
          `;
      }).join('');
  }

  // ========================================
  // SMOOTH SCROLLING
  // ========================================
  function setupSmoothScrolling() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
              const href = this.getAttribute('href');

              if (!href || href === '#' || href.length <= 1) {
                  e.preventDefault();
                  return;
              }

              const target = document.querySelector(href);
              if (target) {
                  e.preventDefault();
                  target.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                  });

                  const navMenu = document.querySelector('.nav-menu');
                  if (navMenu && navMenu.classList.contains('active')) {
                      navMenu.classList.remove('active');
                  }
              }
          });
      });
  }

  // ========================================
  // GLOBAL FUNCTIONS
  // ========================================
  window.openTestimonialModal = openTestimonialModal;
  window.deleteTestimonial = deleteTestimonial;
  window.deletePhoto = deletePhoto;
  window.goToSection = goToSection;
