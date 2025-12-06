 // Firebase Configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAR4ae5zbbqwqgWLRVtbb2V2W3WbwuSCWo",
    authDomain: "mssjaj-20b34.firebaseapp.com",
    projectId: "mssjaj-20b34",
    storageBucket: "mssjaj-20b34.firebasestorage.app",
    messagingSenderId: "52721755434",
    appId: "1:52721755434:web:dc654c159ce6cd226faa53"
  };

  // Initialize Firebase (will be done after SDK loads)
  let db, auth, storage;

  // Wait for Firebase SDK to load
  function initFirebase() {
      if (typeof firebase === 'undefined') {
          console.error('Firebase SDK not loaded yet');
          setTimeout(initFirebase, 100);
          return;
      }

      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

      // Initialize services
      db = firebase.firestore();
      auth = firebase.auth();
      storage = firebase.storage();

      console.log('Firebase initialized successfully');

      // Now initialize the app
      initializeApp();
  }

  // Initialize app
  document.addEventListener('DOMContentLoaded', function() {
      console.log('DOM loaded');
      initFirebase();
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

  // Mobile Navigation
  function setupMobileNav() {
      const hamburger = document.getElementById('hamburger');
      const navMenu = document.getElementById('navMenu');

      if (hamburger && navMenu) {
          hamburger.addEventListener('click', function(e) {
              e.preventDefault();
              e.stopPropagation();

              if (navMenu.classList.contains('active')) {
                  navMenu.classList.remove('active');
                  hamburger.classList.remove('active');
                  document.body.style.overflow = '';
              } else {
                  navMenu.classList.add('active');
                  hamburger.classList.add('active');
                  document.body.style.overflow = 'hidden';
              }
          });

          // Close menu when clicking on nav links
          const navLinks = navMenu.querySelectorAll('a');
          navLinks.forEach(function(link) {
              link.addEventListener('click', function() {
                  navMenu.classList.remove('active');
                  hamburger.classList.remove('active');
                  document.body.style.overflow = '';
              });
          });

          // Close menu when clicking outside
          document.addEventListener('click', function(e) {
              if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                  if (navMenu.classList.contains('active')) {
                      navMenu.classList.remove('active');
                      hamburger.classList.remove('active');
                      document.body.style.overflow = '';
                  }
              }
          });
      }
  }

  // Admin Login
  function setupAdminLogin() {
      const loginForm = document.getElementById('loginForm');
      const loginError = document.getElementById('loginError');

      loginForm.addEventListener('submit', function(e) {
          e.preventDefault();

          const username = document.getElementById('username').value;
          const password = document.getElementById('password').value; // FIXED: removed ()

          // For demo: check if it's the demo credentials
          if (username === 'admin' && password === 'admin123') {
              // Sign in or create demo account
              auth.signInWithEmailAndPassword('admin@cleanpro.com', 'admin123')
                  .then(function() {
                      window.location.href = 'admin-dashboard.html';
                  })
                  .catch(function(error) {
                      // If account doesn't exist, create it
                      if (error.code === 'auth/user-not-found') {
                          return auth.createUserWithEmailAndPassword('admin@cleanpro.com', 'admin123')
                              .then(function() {
                                  window.location.href = 'admin-dashboard.html';
                              });
                      }
                      throw error;
                  })
                  .catch(function(error) {
                      console.error('Login error:', error);
                      loginError.style.display = 'block';
                  });
          } else {
              loginError.style.display = 'block';
          }
      });
  }

  // Admin Dashboard
  function setupAdminDashboard() {
      // Check if logged in
      auth.onAuthStateChanged(function(user) {
          if (!user) {
              window.location.href = 'admin-login.html';
              return;
          }

          console.log('User logged in:', user.email);

          // User is logged in, setup dashboard
          setupDashboardNavigation();
          initializeDefaultContent();
          setupHomeCMS();
          setupServicesCMS();
          setupAboutCMS();
          setupTestimonialManagement();
          setupPhotoGallery();
          setupSettings();
          loadDashboardStats();
      });

      // Logout
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

  function setupDashboardNavigation() {
      const navItems = document.querySelectorAll('.nav-item');
      const sections = document.querySelectorAll('.content-section');

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
  }

  // Initialize default content in Firestore
  function initializeDefaultContent() {
      // Check if content exists, if not create defaults
      db.collection('settings').doc('homeContent').get()
          .then(function(doc) {
              if (!doc.exists) {
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
                  return db.collection('settings').doc('homeContent').set(defaultHome);
              }
          });

      db.collection('settings').doc('servicesContent').get()
          .then(function(doc) {
              if (!doc.exists) {
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
                  return db.collection('settings').doc('servicesContent').set(defaultServices);
              }
          });

      db.collection('settings').doc('aboutContent').get()
          .then(function(doc) {
              if (!doc.exists) {
                  const defaultAbout = {
                      heading: 'About CleanPro',
                      paragraph1: 'Founded in 2015, CleanPro started with a simple mission.',
                      paragraph2: 'We provide professional cleaning services for homes and businesses.',
                      email: 'info@cleanpro.com',
                      phone: '555-0123'
                  };
                  return db.collection('settings').doc('aboutContent').set(defaultAbout);
              }
          });
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

          db.collection('settings').doc('homeContent').set(content)
              .then(function() {
                  alert('Home page content saved successfully!');
              })
              .catch(function(error) {
                  console.error('Error saving:', error);
                  alert('Error saving content. Please try again.');
              });
      });
  }

  function loadHomeContent() {
      db.collection('settings').doc('homeContent').get()
          .then(function(doc) {
              if (!doc.exists) return;

              const content = doc.data();
              document.getElementById('heroHeading').value = content.heroHeading || '';
              document.getElementById('heroText').value = content.heroText || '';

              if (content.features && content.features.length >= 3) {
                  document.getElementById('feature1Title').value = content.features[0].title || '';
                  document.getElementById('feature1Desc').value = content.features[0].description || '';
                  document.getElementById('feature2Title').value = content.features[1].title || '';
                  document.getElementById('feature2Desc').value = content.features[1].description || '';
                  document.getElementById('feature3Title').value = content.features[2].title || '';
                  document.getElementById('feature3Desc').value = content.features[2].description || '';
              }
          })
          .catch(function(error) {
              console.error('Error loading home content:', error);
          });
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

          db.collection('settings').doc('servicesContent').set(content)
              .then(function() {
                  alert('Services content saved successfully!');
              })
              .catch(function(error) {
                  console.error('Error saving:', error);
                  alert('Error saving content. Please try again.');
              });
      });
  }

  function loadServicesContent() {
      db.collection('settings').doc('servicesContent').get()
          .then(function(doc) {
              if (!doc.exists) return;

              const content = doc.data();
              document.getElementById('residentialPrice').value = content.residential.price || '';
              document.getElementById('residentialFeature1').value = content.residential.features[0] || '';
              document.getElementById('residentialFeature2').value = content.residential.features[1] || '';
              document.getElementById('residentialFeature3').value = content.residential.features[2] || '';
              document.getElementById('residentialFeature4').value = content.residential.features[3] || '';

              document.getElementById('commercialPrice').value = content.commercial.price || '';
              document.getElementById('commercialFeature1').value = content.commercial.features[0] || '';
              document.getElementById('commercialFeature2').value = content.commercial.features[1] || '';
              document.getElementById('commercialFeature3').value = content.commercial.features[2] || '';
              document.getElementById('commercialFeature4').value = content.commercial.features[3] || '';
          })
          .catch(function(error) {
              console.error('Error loading services content:', error);
          });
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

          db.collection('settings').doc('aboutContent').set(content)
              .then(function() {
                  alert('About page content saved successfully!');
              })
              .catch(function(error) {
                  console.error('Error saving:', error);
                  alert('Error saving content. Please try again.');
              });
      });
  }

  function loadAboutContent() {
      db.collection('settings').doc('aboutContent').get()
          .then(function(doc) {
              if (!doc.exists) return;

              const content = doc.data();
              document.getElementById('aboutHeading').value = content.heading || '';
              document.getElementById('aboutParagraph1').value = content.paragraph1 || '';
              document.getElementById('aboutParagraph2').value = content.paragraph2 || '';
              document.getElementById('contactEmail').value = content.email || '';
              document.getElementById('contactPhone').value = content.phone || '';
          })
          .catch(function(error) {
              console.error('Error loading about content:', error);
          });
  }

  // Testimonial Management
  function setupTestimonialManagement() {
      const addTestimonialBtn = document.getElementById('addTestimonialBtn');
      const saveTestimonialBtn = document.getElementById('saveTestimonial');
      const testimonialModal = document.getElementById('testimonialModal');
      const closeModalBtns = testimonialModal.querySelectorAll('.close-modal');

      addTestimonialBtn.addEventListener('click', function() {
          document.getElementById('testimonialForm').reset();
          document.getElementById('testimonialId').value = '';
          testimonialModal.style.display = 'flex';
      });

      closeModalBtns.forEach(function(btn) {
          btn.addEventListener('click', function() {
              testimonialModal.style.display = 'none';
          });
      });

      // Close modal when clicking outside
      testimonialModal.addEventListener('click', function(e) {
          if (e.target === testimonialModal) {
              testimonialModal.style.display = 'none';
          }
      });

      saveTestimonialBtn.addEventListener('click', function() {
          const id = document.getElementById('testimonialId').value;
          const testimonial = {
              name: document.getElementById('testimonialName').value,
              rating: parseInt(document.getElementById('testimonialRating').value),
              text: document.getElementById('testimonialText').value,
              createdAt: id ? undefined : firebase.firestore.FieldValue.serverTimestamp()
          };

          // Remove undefined values
          if (testimonial.createdAt === undefined) {
              delete testimonial.createdAt;
          }

          const promise = id ?
              db.collection('testimonials').doc(id).update(testimonial) :
              db.collection('testimonials').add(testimonial);

          promise.then(function() {
                  testimonialModal.style.display = 'none';
                  loadTestimonials();
                  alert('Testimonial saved successfully!');
              })
              .catch(function(error) {
                  console.error('Error saving testimonial:', error);
                  alert('Error saving testimonial. Please try again.');
              });
      });

      loadTestimonials();
  }

  function loadTestimonials() {
      const container = document.getElementById('testimonialsList');

      db.collection('testimonials').get()
          .then(function(querySnapshot) {
              if (querySnapshot.empty) {
                  container.innerHTML = '<p>No testimonials yet. Add your first one!</p>';
                  return;
              }

              let html = '';
              querySnapshot.forEach(function(doc) {
                  const testimonial = doc.data();
                  const stars = '⭐'.repeat(testimonial.rating);

                  html += '<div class="testimonial-item">';
                  html += '<div class="testimonial-content">';
                  html += '<div class="stars">' + stars + '</div>';
                  html += '<p>' + testimonial.text + '</p>';
                  html += '<p class="testimonial-author">- ' + testimonial.name + '</p>';
                  html += '</div>';
                  html += '<div class="testimonial-actions">';
                  html += '<button onclick="editTestimonial(\'' + doc.id + '\')">Edit</button>';
                  html += '<button onclick="deleteTestimonial(\'' + doc.id + '\')">Delete</button>';
                  html += '</div>';
                  html += '</div>';
              });

              container.innerHTML = html;
          })
          .catch(function(error) {
              console.error('Error loading testimonials:', error);
              container.innerHTML = '<p>Error loading testimonials.</p>';
          });
  }

  function editTestimonial(id) {
      db.collection('testimonials').doc(id).get()
          .then(function(doc) {
              if (!doc.exists) return;

              const testimonial = doc.data();
              document.getElementById('testimonialId').value = doc.id;
              document.getElementById('testimonialName').value = testimonial.name;
              document.getElementById('testimonialRating').value = testimonial.rating;
              document.getElementById('testimonialText').value = testimonial.text;
              document.getElementById('testimonialModal').style.display = 'flex';
          });
  }

  function deleteTestimonial(id) {
      if (confirm('Are you sure you want to delete this testimonial?')) {
          db.collection('testimonials').doc(id).delete()
              .then(function() {
                  loadTestimonials();
              })
              .catch(function(error) {
                  console.error('Error deleting testimonial:', error);
                  alert('Error deleting testimonial. Please try again.');
              });
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
          if (!file) return;

          // Show uploading message
          const container = document.getElementById('galleryGrid');
          container.innerHTML = '<p>Uploading photo...</p>';

          // Upload to Firebase Storage
          const storageRef = storage.ref('gallery/' + Date.now() + '_' + file.name);
          const uploadTask = storageRef.put(file);

          uploadTask.on('state_changed',
              function(snapshot) {
                  // Progress
                  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log('Upload is ' + progress + '% done');
              },
              function(error) {
                  console.error('Upload error:', error);
                  alert('Error uploading photo. Please try again.');
                  loadGallery();
              },
              function() {
                  // Complete
                  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                      // Save to Firestore
                      db.collection('gallery').add({
                          url: downloadURL,
                          filename: file.name,
                          uploadedAt: firebase.firestore.FieldValue.serverTimestamp()
                      }).then(function() {
                          photoInput.value = '';
                          loadGallery();
                      });
                  });
              }
          );
      });

      loadGallery();
  }

  function loadGallery() {
      const container = document.getElementById('galleryGrid');

      db.collection('gallery').get()
          .then(function(querySnapshot) {
              if (querySnapshot.empty) {
                  container.innerHTML = '<p>No photos yet. Upload your first one!</p>';
                  return;
              }

              let html = '';
              querySnapshot.forEach(function(doc) {
                  const photo = doc.data();
                  html += '<div class="gallery-item">';
                  html += '<img src="' + photo.url + '" alt="Gallery photo">';
                  html += '<button class="delete-photo" onclick="deletePhoto(\'' + doc.id + '\', \'' + photo.url + '\')">Delete</button>';
                  html += '</div>';
              });

              container.innerHTML = html;
          })
          .catch(function(error) {
              console.error('Error loading gallery:', error);
              container.innerHTML = '<p>Error loading gallery.</p>';
          });
  }

  function deletePhoto(id, url) {
      if (confirm('Are you sure you want to delete this photo?')) {
          // Delete from Storage
          const storageRef = storage.refFromURL(url);
          storageRef.delete()
              .then(function() {
                  // Delete from Firestore
                  return db.collection('gallery').doc(id).delete();
              })
              .then(function() {
                  loadGallery();
              })
              .catch(function(error) {
                  console.error('Error deleting photo:', error);
                  alert('Error deleting photo. Please try again.');
              });
      }
  }

  // Settings
  function setupSettings() {
      const clearDataBtn = document.getElementById('clearDataBtn');

      if (clearDataBtn) {
          clearDataBtn.addEventListener('click', function() {
              if (confirm('Are you sure you want to clear all data? This cannot be undone!')) {
                  Promise.all([
                      db.collection('testimonials').get().then(function(snapshot) {
                          const batch = db.batch();
                          snapshot.docs.forEach(function(doc) {
                              batch.delete(doc.ref);
                          });
                          return batch.commit();
                      }),
                      db.collection('gallery').get().then(function(snapshot) {
                          const deletePromises = [];
                          snapshot.docs.forEach(function(doc) {
                              const photo = doc.data();
                              const storageRef = storage.refFromURL(photo.url);
                              deletePromises.push(storageRef.delete());
                              deletePromises.push(doc.ref.delete());
                          });
                          return Promise.all(deletePromises);
                      })
                  ]).then(function() {
                      alert('All data cleared! Reinitializing defaults...');
                      initializeDefaultContent();
                      setTimeout(function() {
                          window.location.reload();
                      }, 1000);
                  }).catch(function(error) {
                      console.error('Error clearing data:', error);
                      alert('Error clearing data. Please try again.');
                  });
              }
          });
      }
  }

  // Dashboard Stats
  function loadDashboardStats() {
      db.collection('testimonials').get().then(function(snapshot) {
          document.getElementById('totalTestimonials').textContent = snapshot.size;
      });

      db.collection('gallery').get().then(function(snapshot) {
          document.getElementById('totalPhotos').textContent = snapshot.size;
      });
  }

  // Load content on public pages
  function loadPublicPageContent() {
      // Home page
      if (document.getElementById('heroHeading')) {
          db.collection('settings').doc('homeContent').get()
              .then(function(doc) {
                  if (!doc.exists) return;

                  const homeContent = doc.data();
                  const heroHeading = document.getElementById('heroHeading');
                  const heroText = document.getElementById('heroText');

                  if (heroHeading) heroHeading.textContent = homeContent.heroHeading || '';
                  if (heroText) heroText.textContent = homeContent.heroText || '';

                  if (homeContent.features && homeContent.features.length >= 3) {
                      const featureCards = document.querySelectorAll('.feature-card');
                      if (featureCards.length >= 3) {
                          featureCards[0].querySelector('h3').textContent = homeContent.features[0].title;
                          featureCards[0].querySelector('p').textContent = homeContent.features[0].description;
                          featureCards[1].querySelector('h3').textContent = homeContent.features[1].title;
                          featureCards[1].querySelector('p').textContent = homeContent.features[1].description;
                          featureCards[2].querySelector('h3').textContent = homeContent.features[2].title;
                          featureCards[2].querySelector('p').textContent = homeContent.features[2].description;
                      }
                  }
              });
      }

      // Services page
      if (document.querySelector('.pricing-card')) {
          db.collection('settings').doc('servicesContent').get()
              .then(function(doc) {
                  if (!doc.exists) return;

                  const servicesContent = doc.data();
                  const pricingCards = document.querySelectorAll('.pricing-card');

                  if (pricingCards.length >= 2) {
                      pricingCards[0].querySelector('.price').textContent = '$' + servicesContent.residential.price;
                      const residentialFeatures = pricingCards[0].querySelectorAll('.features-list li');
                      servicesContent.residential.features.forEach(function(feature, index) {
                          if (residentialFeatures[index]) {
                              residentialFeatures[index].textContent = '✓ ' + feature;
                          }
                      });

                      pricingCards[1].querySelector('.price').textContent = '$' + servicesContent.commercial.price;
                      const commercialFeatures = pricingCards[1].querySelectorAll('.features-list li');
                      servicesContent.commercial.features.forEach(function(feature, index) {
                          if (commercialFeatures[index]) {
                              commercialFeatures[index].textContent = '✓ ' + feature;
                          }
                      });
                  }
              });
      }

      // About page
      if (document.querySelector('.about-content')) {
          db.collection('settings').doc('aboutContent').get()
              .then(function(doc) {
                  if (!doc.exists) return;

                  const aboutContent = doc.data();
                  const aboutSection = document.querySelector('.about-text');
                  if (aboutSection) {
                      const h2 = aboutSection.querySelector('h2');
                      if (h2) h2.textContent = aboutContent.heading;

                      const paragraphs = aboutSection.querySelectorAll('p');
                      if (paragraphs[0]) paragraphs[0].textContent = aboutContent.paragraph1;
                      if (paragraphs[1]) paragraphs[1].textContent = aboutContent.paragraph2;
                  }

                  // Load testimonials on about page
                  loadPublicTestimonials();
              });
      }
  }

  function loadPublicTestimonials() {
      const container = document.querySelector('.testimonials-grid');
      if (!container) return;

      db.collection('testimonials').get()
          .then(function(querySnapshot) {
              if (querySnapshot.empty) {
                  container.innerHTML = '<p>No testimonials yet.</p>';
                  return;
              }

              let html = '';
              querySnapshot.forEach(function(doc) {
                  const testimonial = doc.data();
                  const stars = '⭐'.repeat(testimonial.rating);

                  html += '<div class="testimonial-card">';
                  html += '<div class="stars">' + stars + '</div>';
                  html += '<p>' + testimonial.text + '</p>';
                  html += '<p class="author">- ' + testimonial.name + '</p>';
                  html += '</div>';
              });

              container.innerHTML = html;
          });
  }

  function updateFooterContent() {
      db.collection('settings').doc('aboutContent').get()
          .then(function(doc) {
              if (!doc.exists) return;

              const content = doc.data();
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
          });
  }
