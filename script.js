 // Initialize app
  document.addEventListener('DOMContentLoaded', function() {
      console.log('DOM loaded');
      initializeApp();
  });

  function initializeApp() {
      console.log('Initializing app...');

      // Setup mobile navigation
      setupMobileNav();

      // Load content on public pages
      if (document.getElementById('heroHeading') || document.getElementById('heroText')) {
          loadPublicPageContent();
      }

      // Update footer on all pages
      updateFooterContent();

      // Admin login page
      if (document.getElementById('loginForm')) {
          setupAdminLogin();
      }

      // Admin dashboard
      if (document.getElementById('adminContent')) {
          setupAdminDashboard();
      }
  }

  // FIXED: Mobile Navigation with direct class manipulation
  function setupMobileNav() {
      const hamburger = document.getElementById('hamburger');
      const navMenu = document.getElementById('navMenu');

      console.log('Setting up mobile nav...');
      console.log('Hamburger element:', hamburger);
      console.log('NavMenu element:', navMenu);

      if (hamburger && navMenu) {
          console.log('Mobile nav elements found - setting up click handler');

          hamburger.addEventListener('click', function(e) {
              e.preventDefault();
              e.stopPropagation();

              console.log('=== HAMBURGER CLICKED ===');
              console.log('Hamburger classes before:', hamburger.className);
              console.log('NavMenu classes before:', navMenu.className);

              // Use direct manipulation instead of toggle
              if (navMenu.classList.contains('active')) {
                  console.log('Removing active class');
                  navMenu.classList.remove('active');
                  hamburger.classList.remove('active');
                  document.body.style.overflow = '';
              } else {
                  console.log('Adding active class');
                  navMenu.classList.add('active');
                  hamburger.classList.add('active');
                  document.body.style.overflow = 'hidden';
              }

              console.log('Hamburger classes after:', hamburger.className);
              console.log('NavMenu classes after:', navMenu.className);
              console.log('=========================');
          });

          // Close menu when clicking on nav links
          const navLinks = navMenu.querySelectorAll('a');
          navLinks.forEach(function(link) {
              link.addEventListener('click', function() {
                  console.log('Nav link clicked - closing menu');
                  navMenu.classList.remove('active');
                  hamburger.classList.remove('active');
                  document.body.style.overflow = '';
              });
          });

          // Close menu when clicking outside
          document.addEventListener('click', function(e) {
              if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                  if (navMenu.classList.contains('active')) {
                      console.log('Clicked outside - closing menu');
                      navMenu.classList.remove('active');
                      hamburger.classList.remove('active');
                      document.body.style.overflow = '';
                  }
              }
          });

          console.log('Mobile nav setup complete');
      } else {
          console.log('Mobile nav elements not found!');
      }
  }

  // Admin Login
  function setupAdminLogin() {
      const loginForm = document.getElementById('loginForm');
      const loginError = document.getElementById('loginError');

      loginForm.addEventListener('submit', function(e) {
          e.preventDefault();

          const username = document.getElementById('username').value;
          const password = document.getElementById('password').value;

          if (username === 'admin' && password === 'admin123') {
              localStorage.setItem('adminLoggedIn', 'true');
              window.location.href = 'admin-dashboard.html';
          } else {
              loginError.style.display = 'block';
          }
      });
  }

  // Admin Dashboard
  function setupAdminDashboard() {
      // Check if logged in
      if (localStorage.getItem('adminLoggedIn') !== 'true') {
          window.location.href = 'admin-login.html';
          return;
      }

      // Setup navigation
      const navItems = document.querySelectorAll('.nav-item');
      const sections = document.querySelectorAll('.dashboard-section');

      navItems.forEach(function(item) {
          item.addEventListener('click', function() {
              const targetSection = this.getAttribute('data-section');

              navItems.forEach(function(nav) {
                  nav.classList.remove('active');
              });
              this.classList.add('active');

              sections.forEach(function(section) {
                  section.classList.remove('active');
              });
              document.getElementById(targetSection).classList.add('active');

              // Load data when switching sections
              if (targetSection === 'testimonials-section') {
                  loadTestimonials();
              } else if (targetSection === 'gallery-section') {
                  loadGallery();
              }
          });
      });

      // Logout
      const logoutBtn = document.getElementById('logoutBtn');
      if (logoutBtn) {
          logoutBtn.addEventListener('click', function(e) {
              e.preventDefault();
              localStorage.removeItem('adminLoggedIn');
              window.location.href = 'admin-login.html';
          });
      }

      // Initialize all CMS sections
      initializeDefaultContent();
      setupHomeCMS();
      setupServicesCMS();
      setupAboutCMS();
      setupTestimonialManagement();
      setupPhotoGallery();
      setupSettings();

      // Load dashboard stats
      loadDashboardStats();
  }

  // Initialize default content if not exists
  function initializeDefaultContent() {
      if (!localStorage.getItem('homeContent')) {
          const defaultHome = {
              heroHeading: 'Professional Cleaning Services You Can Trust',
              heroText: 'We provide top-quality cleaning services for homes and businesses. Experience the difference of a truly clean space.',
              features: [
                  {
                      title: 'Professional Team',
                      description: 'Our experienced cleaners are trained and certified professionals.'
                  },
                  {
                      title: 'Eco-Friendly Products',
                      description: 'We use environmentally safe cleaning products that are effective and safe.'
                  },
                  {
                      title: 'Flexible Scheduling',
                      description: 'We work around your schedule with convenient booking options.'
                  }
              ]
          };
          localStorage.setItem('homeContent', JSON.stringify(defaultHome));
      }

      if (!localStorage.getItem('servicesContent')) {
          const defaultServices = {
              residential: {
                  price: '99',
                  features: [
                      'Deep cleaning of all rooms',
                      'Kitchen and bathroom sanitization',
                      'Dusting and vacuuming',
                      'Window cleaning'
                  ]
              },
              commercial: {
                  price: '299',
                  features: [
                      'Office space cleaning',
                      'Floor maintenance',
                      'Restroom sanitization',
                      'Trash removal'
                  ]
              }
          };
          localStorage.setItem('servicesContent', JSON.stringify(defaultServices));
      }

      if (!localStorage.getItem('aboutContent')) {
          const defaultAbout = {
              heading: 'About CleanPro',
              paragraph1: 'Founded in 2015, CleanPro started with a simple mission.',
              paragraph2: 'We provide professional cleaning services for homes and businesses.',
              email: 'info@cleanpro.com',
              phone: '555-0123'
          };
          localStorage.setItem('aboutContent', JSON.stringify(defaultAbout));
      }

      if (!localStorage.getItem('testimonials')) {
          localStorage.setItem('testimonials', JSON.stringify([]));
      }

      if (!localStorage.getItem('gallery')) {
          localStorage.setItem('gallery', JSON.stringify([]));
      }
  }

  // Home Page CMS
  function setupHomeCMS() {
      const saveHomeBtn = document.getElementById('saveHomeContent');
      if (!saveHomeBtn) return;

      loadHomeContent();

      saveHomeBtn.addEventListener('click', function() {
          const content = {
              heroHeading: document.getElementById('heroHeading').value,
              heroText: document.getElementById('heroText').value,
              features: [
                  {
                      title: document.getElementById('feature1Title').value,
                      description: document.getElementById('feature1Desc').value
                  },
                  {
                      title: document.getElementById('feature2Title').value,
                      description: document.getElementById('feature2Desc').value
                  },
                  {
                      title: document.getElementById('feature3Title').value,
                      description: document.getElementById('feature3Desc').value
                  }
              ]
          };

          localStorage.setItem('homeContent', JSON.stringify(content));
          alert('Home page content saved successfully!');
      });
  }

  function loadHomeContent() {
      const content = JSON.parse(localStorage.getItem('homeContent'));
      if (!content) return;

      document.getElementById('heroHeading').value = content.heroHeading;
      document.getElementById('heroText').value = content.heroText;

      if (content.features && content.features.length >= 3) {
          document.getElementById('feature1Title').value = content.features[0].title;
          document.getElementById('feature1Desc').value = content.features[0].description;
          document.getElementById('feature2Title').value = content.features[1].title;
          document.getElementById('feature2Desc').value = content.features[1].description;
          document.getElementById('feature3Title').value = content.features[2].title;
          document.getElementById('feature3Desc').value = content.features[2].description;
      }
  }

  // Services CMS
  function setupServicesCMS() {
      const saveServicesBtn = document.getElementById('saveServicesContent');
      if (!saveServicesBtn) return;

      loadServicesContent();

      saveServicesBtn.addEventListener('click', function() {
          const content = {
              residential: {
                  price: document.getElementById('residentialPrice').value,
                  features: [
                      document.getElementById('residentialFeature1').value,
                      document.getElementById('residentialFeature2').value,
                      document.getElementById('residentialFeature3').value,
                      document.getElementById('residentialFeature4').value
                  ]
              },
              commercial: {
                  price: document.getElementById('commercialPrice').value,
                  features: [
                      document.getElementById('commercialFeature1').value,
                      document.getElementById('commercialFeature2').value,
                      document.getElementById('commercialFeature3').value,
                      document.getElementById('commercialFeature4').value
                  ]
              }
          };

          localStorage.setItem('servicesContent', JSON.stringify(content));
          alert('Services content saved successfully!');
      });
  }

  function loadServicesContent() {
      const content = JSON.parse(localStorage.getItem('servicesContent'));
      if (!content) return;

      document.getElementById('residentialPrice').value = content.residential.price;
      document.getElementById('residentialFeature1').value = content.residential.features[0];
      document.getElementById('residentialFeature2').value = content.residential.features[1];
      document.getElementById('residentialFeature3').value = content.residential.features[2];
      document.getElementById('residentialFeature4').value = content.residential.features[3];

      document.getElementById('commercialPrice').value = content.commercial.price;
      document.getElementById('commercialFeature1').value = content.commercial.features[0];
      document.getElementById('commercialFeature2').value = content.commercial.features[1];
      document.getElementById('commercialFeature3').value = content.commercial.features[2];
      document.getElementById('commercialFeature4').value = content.commercial.features[3];
  }

  // About Page CMS
  function setupAboutCMS() {
      const saveAboutBtn = document.getElementById('saveAboutContent');
      if (!saveAboutBtn) return;

      loadAboutContent();

      saveAboutBtn.addEventListener('click', function() {
          const content = {
              heading: document.getElementById('aboutHeading').value,
              paragraph1: document.getElementById('aboutParagraph1').value,
              paragraph2: document.getElementById('aboutParagraph2').value,
              email: document.getElementById('contactEmail').value,
              phone: document.getElementById('contactPhone').value
          };

          localStorage.setItem('aboutContent', JSON.stringify(content));
          alert('About page content saved successfully!');
      });
  }

  function loadAboutContent() {
      const content = JSON.parse(localStorage.getItem('aboutContent'));
      if (!content) return;

      document.getElementById('aboutHeading').value = content.heading;
      document.getElementById('aboutParagraph1').value = content.paragraph1;
      document.getElementById('aboutParagraph2').value = content.paragraph2;
      document.getElementById('contactEmail').value = content.email;
      document.getElementById('contactPhone').value = content.phone;
  }

  // Testimonial Management
  function setupTestimonialManagement() {
      const addTestimonialBtn = document.getElementById('addTestimonialBtn');
      const saveTestimonialBtn = document.getElementById('saveTestimonial');
      const testimonialModal = document.getElementById('testimonialModal');
      const closeModalBtn = testimonialModal.querySelector('.close-modal');

      addTestimonialBtn.addEventListener('click', function() {
          document.getElementById('testimonialForm').reset();
          document.getElementById('testimonialId').value = '';
          testimonialModal.style.display = 'flex';
      });

      closeModalBtn.addEventListener('click', function() {
          testimonialModal.style.display = 'none';
      });

      saveTestimonialBtn.addEventListener('click', function() {
          const id = document.getElementById('testimonialId').value;
          const testimonial = {
              id: id || Date.now().toString(),
              name: document.getElementById('testimonialName').value,
              rating: parseInt(document.getElementById('testimonialRating').value),
              text: document.getElementById('testimonialText').value
          };

          let testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];

          if (id) {
              const index = testimonials.findIndex(function(t) {
                  return t.id === id;
              });
              testimonials[index] = testimonial;
          } else {
              testimonials.push(testimonial);
          }

          localStorage.setItem('testimonials', JSON.stringify(testimonials));
          testimonialModal.style.display = 'none';
          loadTestimonials();
          alert('Testimonial saved successfully!');
      });

      loadTestimonials();
  }

  function loadTestimonials() {
      const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
      const container = document.getElementById('testimonialsList');

      if (testimonials.length === 0) {
          container.innerHTML = '<p>No testimonials yet. Add your first one!</p>';
          return;
      }

      let html = '';
      testimonials.forEach(function(testimonial) {
          const stars = '⭐'.repeat(testimonial.rating);

          html += '<div class="testimonial-item">';
          html += '<div class="testimonial-content">';
          html += '<div class="stars">' + stars + '</div>';
          html += '<p>' + testimonial.text + '</p>';
          html += '<p class="testimonial-author">- ' + testimonial.name + '</p>';
          html += '</div>';
          html += '<div class="testimonial-actions">';
          html += '<button onclick="editTestimonial(\'' + testimonial.id + '\')">Edit</button>';
          html += '<button onclick="deleteTestimonial(\'' + testimonial.id + '\')">Delete</button>';
          html += '</div>';
          html += '</div>';
      });

      container.innerHTML = html;
  }

  function editTestimonial(id) {
      const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
      const testimonial = testimonials.find(function(t) {
          return t.id === id;
      });

      if (testimonial) {
          document.getElementById('testimonialId').value = testimonial.id;
          document.getElementById('testimonialName').value = testimonial.name;
          document.getElementById('testimonialRating').value = testimonial.rating;
          document.getElementById('testimonialText').value = testimonial.text;
          document.getElementById('testimonialModal').style.display = 'flex';
      }
  }

  function deleteTestimonial(id) {
      if (confirm('Are you sure you want to delete this testimonial?')) {
          let testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
          testimonials = testimonials.filter(function(t) {
              return t.id !== id;
          });
          localStorage.setItem('testimonials', JSON.stringify(testimonials));
          loadTestimonials();
      }
  }

  // Photo Gallery Management
  function setupPhotoGallery() {
      const uploadPhotoBtn = document.getElementById('uploadPhotoBtn');
      const photoInput = document.getElementById('photoInput');

      uploadPhotoBtn.addEventListener('click', function() {
          photoInput.click();
      });

      photoInput.addEventListener('change', function(e) {
          const file = e.target.files[0];
          if (file) {
              const reader = new FileReader();
              reader.onload = function(event) {
                  const photo = {
                      id: Date.now().toString(),
                      data: event.target.result
                  };

                  let gallery = JSON.parse(localStorage.getItem('gallery')) || [];
                  gallery.push(photo);
                  localStorage.setItem('gallery', JSON.stringify(gallery));
                  loadGallery();
              };
              reader.readAsDataURL(file);
          }
      });

      loadGallery();
  }

  function loadGallery() {
      const gallery = JSON.parse(localStorage.getItem('gallery')) || [];
      const container = document.getElementById('galleryGrid');

      if (gallery.length === 0) {
          container.innerHTML = '<p>No photos yet. Upload your first one!</p>';
          return;
      }

      let html = '';
      gallery.forEach(function(photo) {
          html += '<div class="gallery-item">';
          html += '<img src="' + photo.data + '" alt="Gallery photo">';
          html += '<button class="delete-photo" onclick="deletePhoto(\'' + photo.id + '\')">Delete</button>';
          html += '</div>';
      });

      container.innerHTML = html;
  }

  function deletePhoto(id) {
      if (confirm('Are you sure you want to delete this photo?')) {
          let gallery = JSON.parse(localStorage.getItem('gallery')) || [];
          gallery = gallery.filter(function(p) {
              return p.id !== id;
          });
          localStorage.setItem('gallery', JSON.stringify(gallery));
          loadGallery();
      }
  }

  // Settings
  function setupSettings() {
      const clearDataBtn = document.getElementById('clearDataBtn');

      if (clearDataBtn) {
          clearDataBtn.addEventListener('click', function() {
              if (confirm('Are you sure you want to clear all data? This cannot be undone!')) {
                  localStorage.removeItem('homeContent');
                  localStorage.removeItem('servicesContent');
                  localStorage.removeItem('aboutContent');
                  localStorage.removeItem('testimonials');
                  localStorage.removeItem('gallery');
                  alert('All data cleared! Reinitializing defaults...');
                  initializeDefaultContent();
                  window.location.reload();
              }
          });
      }
  }

  // Dashboard Stats
  function loadDashboardStats() {
      const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
      const gallery = JSON.parse(localStorage.getItem('gallery')) || [];

      document.getElementById('totalTestimonials').textContent = testimonials.length;
      document.getElementById('totalPhotos').textContent = gallery.length;
  }

  // Load content on public pages
  function loadPublicPageContent() {
      // Home page
      if (document.getElementById('heroHeading')) {
          const homeContent = JSON.parse(localStorage.getItem('homeContent'));
          if (homeContent) {
              document.getElementById('heroHeading').textContent = homeContent.heroHeading;
              document.getElementById('heroText').textContent = homeContent.heroText;

              if (homeContent.features && homeContent.features.length >= 3) {
                  const featureCards = document.querySelectorAll('.feature-card');
                  featureCards[0].querySelector('h3').textContent = homeContent.features[0].title;
                  featureCards[0].querySelector('p').textContent = homeContent.features[0].description;
                  featureCards[1].querySelector('h3').textContent = homeContent.features[1].title;
                  featureCards[1].querySelector('p').textContent = homeContent.features[1].description;
                  featureCards[2].querySelector('h3').textContent = homeContent.features[2].title;
                  featureCards[2].querySelector('p').textContent = homeContent.features[2].description;
              }
          }
      }

      // Services page
      if (document.querySelector('.pricing-card')) {
          const servicesContent = JSON.parse(localStorage.getItem('servicesContent'));
          if (servicesContent) {
              const pricingCards = document.querySelectorAll('.pricing-card');

              pricingCards[0].querySelector('.price').textContent = '$' + servicesContent.residential.price;
              const residentialFeatures = pricingCards[0].querySelectorAll('.features li');
              servicesContent.residential.features.forEach(function(feature, index) {
                  if (residentialFeatures[index]) {
                      residentialFeatures[index].textContent = feature;
                  }
              });

              pricingCards[1].querySelector('.price').textContent = '$' + servicesContent.commercial.price;
              const commercialFeatures = pricingCards[1].querySelectorAll('.features li');
              servicesContent.commercial.features.forEach(function(feature, index) {
                  if (commercialFeatures[index]) {
                      commercialFeatures[index].textContent = feature;
                  }
              });
          }
      }

      // About page
      if (document.querySelector('.about-content')) {
          const aboutContent = JSON.parse(localStorage.getItem('aboutContent'));
          if (aboutContent) {
              const aboutSection = document.querySelector('.about-content');
              aboutSection.querySelector('h2').textContent = aboutContent.heading;
              const paragraphs = aboutSection.querySelectorAll('p');
              paragraphs[0].textContent = aboutContent.paragraph1;
              paragraphs[1].textContent = aboutContent.paragraph2;
          }

          // Load testimonials on about page
          loadPublicTestimonials();
      }
  }

  function loadPublicTestimonials() {
      const container = document.querySelector('.testimonials-grid');
      if (!container) return;

      const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];

      if (testimonials.length === 0) {
          container.innerHTML = '<p>No testimonials yet.</p>';
          return;
      }

      let html = '';
      testimonials.forEach(function(testimonial) {
          const stars = '⭐'.repeat(testimonial.rating);

          html += '<div class="testimonial-card">';
          html += '<div class="stars">' + stars + '</div>';
          html += '<p>' + testimonial.text + '</p>';
          html += '<p class="author">- ' + testimonial.name + '</p>';
          html += '</div>';
      });

      container.innerHTML = html;
  }

  function updateFooterContent() {
      const content = JSON.parse(localStorage.getItem('aboutContent'));
      if (!content) return;

      const footerSections = document.querySelectorAll('.footer-section');
      footerSections.forEach(function(section) {
          const heading = section.querySelector('h4');
          if (heading && heading.textContent === 'Contact') {
              const links = section.querySelectorAll('a');
              links.forEach(function(link) {
                  if (link.href.includes('mailto:')) {
                      link.textContent = content.email;
                      link.href = 'mailto:' + content.email;
                  } else if (link.href.includes('tel:')) {
                      link.textContent = content.phone;
                      link.href = 'tel:' + content.phone;
                  }
              });
          }
      });
  }
