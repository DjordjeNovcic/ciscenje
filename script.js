 // ========================================
  // INITIALIZE APP
  // ========================================
  document.addEventListener('DOMContentLoaded', function() {
      initializeApp();
  });

  function initializeApp() {
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
      setupBookingManagement();
      setupPhotoGallery();
      setupSettings();
      updateDashboardStats();
      loadBookings();
      loadPhotos();
  }

  // ========================================
  // SECTION NAVIGATION
  // ========================================
  function setupSectionNavigation() {
      const navItems = document.querySelectorAll('.sidebar-nav .nav-item');

      navItems.forEach(item => {
          item.addEventListener('click', function(e) {
              e.preventDefault();

              // Remove active class from all items
              navItems.forEach(nav => nav.classList.remove('active'));

              // Add active class to clicked item
              this.classList.add('active');

              // Get section to show
              const sectionName = this.getAttribute('data-section');

              // Hide all sections
              document.querySelectorAll('.content-section').forEach(section => {
                  section.classList.remove('active');
              });

              // Show selected section
              const sectionToShow = document.getElementById(sectionName + 'Section');
              if (sectionToShow) {
                  sectionToShow.classList.add('active');
              }

              // Update page title
              const pageTitle = document.getElementById('pageTitle');
              if (pageTitle) {
                  pageTitle.textContent = this.textContent.trim();
              }
          });
      });
  }

  // ========================================
  // BOOKING MANAGEMENT
  // ========================================
  let currentEditingBookingId = null;

  function setupBookingManagement() {
      const addBookingBtn = document.getElementById('addBookingBtn');
      const addBookingBtn2 = document.getElementById('addBookingBtn2');
      const bookingModal = document.getElementById('bookingModal');
      const bookingForm = document.getElementById('bookingForm');
      const cancelBookingBtn = document.getElementById('cancelBookingBtn');
      const closeBtn = bookingModal.querySelector('.close');

      // Open modal for new booking
      [addBookingBtn, addBookingBtn2].forEach(btn => {
          if (btn) {
              btn.addEventListener('click', () => openBookingModal());
          }
      });

      // Close modal
      [cancelBookingBtn, closeBtn].forEach(btn => {
          if (btn) {
              btn.addEventListener('click', () => closeBookingModal());
          }
      });

      // Close on outside click
      bookingModal.addEventListener('click', function(e) {
          if (e.target === bookingModal) {
              closeBookingModal();
          }
      });

      // Submit form
      bookingForm.addEventListener('submit', function(e) {
          e.preventDefault();
          saveBooking();
      });

      // Auto-fill amount based on service
      const serviceType = document.getElementById('serviceType');
      const amountField = document.getElementById('amount');

      serviceType.addEventListener('change', function() {
          const prices = {
              'Basic Clean': 89,
              'Deep Clean': 149,
              'Move In/Out': 199,
              'Office Cleaning': 299,
              'Retail Space': 399
          };

          const selectedService = this.value;
          if (prices[selectedService]) {
              amountField.value = prices[selectedService];
          }
      });
  }

  function openBookingModal(bookingId = null) {
      const modal = document.getElementById('bookingModal');
      const modalTitle = document.getElementById('modalTitle');
      const form = document.getElementById('bookingForm');

      form.reset();
      currentEditingBookingId = bookingId;

      if (bookingId) {
          // Edit mode
          modalTitle.textContent = 'Edit Booking';
          const bookings = getBookings();
          const booking = bookings.find(b => b.id === bookingId);

          if (booking) {
              document.getElementById('customerName').value = booking.customerName;
              document.getElementById('customerPhone').value = booking.customerPhone;
              document.getElementById('customerEmail').value = booking.customerEmail || '';
              document.getElementById('serviceType').value = booking.serviceType;
              document.getElementById('bookingDate').value = booking.bookingDate;
              document.getElementById('bookingStatus').value = booking.status;
              document.getElementById('amount').value = booking.amount;
              document.getElementById('notes').value = booking.notes || '';
          }
      } else {
          // New booking mode
          modalTitle.textContent = 'New Booking';
          document.getElementById('bookingStatus').value = 'Pending';
      }

      modal.classList.add('active');
  }

  function closeBookingModal() {
      const modal = document.getElementById('bookingModal');
      modal.classList.remove('active');
      currentEditingBookingId = null;
  }

  function saveBooking() {
      const bookings = getBookings();

      const booking = {
          id: currentEditingBookingId || Date.now().toString(),
          customerName: document.getElementById('customerName').value,
          customerPhone: document.getElementById('customerPhone').value,
          customerEmail: document.getElementById('customerEmail').value,
          serviceType: document.getElementById('serviceType').value,
          bookingDate: document.getElementById('bookingDate').value,
          status: document.getElementById('bookingStatus').value,
          amount: parseFloat(document.getElementById('amount').value),
          notes: document.getElementById('notes').value,
          createdAt: currentEditingBookingId ?
              bookings.find(b => b.id === currentEditingBookingId)?.createdAt :
              new Date().toISOString()
      };

      if (currentEditingBookingId) {
          // Update existing
          const index = bookings.findIndex(b => b.id === currentEditingBookingId);
          if (index !== -1) {
              bookings[index] = booking;
          }
      } else {
          // Add new
          bookings.push(booking);
      }

      localStorage.setItem('bookings', JSON.stringify(bookings));

      closeBookingModal();
      loadBookings();
      updateDashboardStats();

      alert(currentEditingBookingId ? 'Booking updated successfully!' : 'Booking added successfully!');
  }

  function deleteBooking(bookingId) {
      if (!confirm('Are you sure you want to delete this booking?')) {
          return;
      }

      let bookings = getBookings();
      bookings = bookings.filter(b => b.id !== bookingId);
      localStorage.setItem('bookings', JSON.stringify(bookings));

      loadBookings();
      updateDashboardStats();

      alert('Booking deleted successfully!');
  }

  function getBookings() {
      const bookings = localStorage.getItem('bookings');
      return bookings ? JSON.parse(bookings) : [];
  }

  function loadBookings() {
      const bookings = getBookings();

      // Load recent bookings (dashboard)
      const recentTableBody = document.getElementById('bookingsTableBody');
      if (recentTableBody) {
          if (bookings.length === 0) {
              recentTableBody.innerHTML = `
                  <tr>
                      <td colspan="6" style="text-align: center; padding: 2rem;">
                          No bookings yet. Click "New Booking" to add one.
                      </td>
                  </tr>
              `;
          } else {
              const recentBookings = bookings.slice(-5).reverse();
              recentTableBody.innerHTML = recentBookings.map(booking => `
                  <tr>
                      <td>${formatDate(booking.bookingDate)}</td>
                      <td>${booking.customerName}</td>
                      <td>${booking.serviceType}</td>
                      <td><span class="badge badge-${booking.status.toLowerCase()}">${booking.status}</span></td>
                      <td>$${booking.amount}</td>
                      <td>
                          <button class="btn-icon" onclick="openBookingModal('${booking.id}')" title="Edit">✏️</button>
                          <button class="btn-icon" onclick="deleteBooking('${booking.id}')" title="Delete">🗑️</button>
                      </td>
                  </tr>
              `).join('');
          }
      }

      // Load all bookings
      const allTableBody = document.getElementById('allBookingsTableBody');
      if (allTableBody) {
          if (bookings.length === 0) {
              allTableBody.innerHTML = `
                  <tr>
                      <td colspan="7" style="text-align: center; padding: 2rem;">
                          No bookings yet.
                      </td>
                  </tr>
              `;
          } else {
              allTableBody.innerHTML = bookings.reverse().map(booking => `
                  <tr>
                      <td>${formatDate(booking.bookingDate)}</td>
                      <td>${booking.customerName}</td>
                      <td>${booking.customerPhone}</td>
                      <td>${booking.serviceType}</td>
                      <td><span class="badge badge-${booking.status.toLowerCase()}">${booking.status}</span></td>
                      <td>$${booking.amount}</td>
                      <td>
                          <button class="btn-icon" onclick="openBookingModal('${booking.id}')" title="Edit">✏️</button>
                          <button class="btn-icon" onclick="deleteBooking('${booking.id}')" title="Delete">🗑️</button>
                      </td>
                  </tr>
              `).join('');
          }
      }
  }

  function updateDashboardStats() {
      const bookings = getBookings();

      // Total bookings
      const totalBookings = document.getElementById('totalBookings');
      if (totalBookings) {
          totalBookings.textContent = bookings.length;
      }

      // New bookings (last 7 days)
      const newBookings = document.getElementById('newBookings');
      if (newBookings) {
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
          const recentCount = bookings.filter(b =>
              new Date(b.createdAt) > sevenDaysAgo
          ).length;
          newBookings.textContent = `${recentCount} new`;
      }

      // Pending bookings
      const pendingBookings = document.getElementById('pendingBookings');
      if (pendingBookings) {
          const pendingCount = bookings.filter(b => b.status === 'Pending').length;
          pendingBookings.textContent = pendingCount;
      }

      // Completed bookings
      const completedBookings = document.getElementById('completedBookings');
      if (completedBookings) {
          const completedCount = bookings.filter(b => b.status === 'Completed').length;
          completedBookings.textContent = completedCount;
      }

      // Total revenue
      const totalRevenue = document.getElementById('totalRevenue');
      if (totalRevenue) {
          const revenue = bookings
              .filter(b => b.status === 'Completed')
              .reduce((sum, b) => sum + b.amount, 0);
          totalRevenue.textContent = `$${revenue.toLocaleString()}`;
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
      const clearDataBtn = document.getElementById('clearDataBtn');

      if (clearDataBtn) {
          clearDataBtn.addEventListener('click', function() {
              if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
                  if (confirm('This will delete ALL bookings and photos. Are you absolutely sure?')) {
                      localStorage.removeItem('bookings');
                      localStorage.removeItem('photos');
                      loadBookings();
                      loadPhotos();
                      updateDashboardStats();
                      alert('All data has been cleared.');
                  }
              }
          });
      }
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
  // UTILITY FUNCTIONS
  // ========================================
  function formatDate(dateString) {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
  }

  // Make functions globally accessible for onclick handlers
  window.openBookingModal = openBookingModal;
  window.deleteBooking = deleteBooking;
  window.deletePhoto = deletePhoto;
