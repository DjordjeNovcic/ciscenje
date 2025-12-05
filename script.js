 document.addEventListener('DOMContentLoaded', function() {
      const hamburger = document.querySelector('.hamburger');
      const navMenu = document.querySelector('.nav-menu');

      if (hamburger) {
          hamburger.addEventListener('click', function() {
              navMenu.classList.toggle('active');
          });
      }

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

      const adminLayout = document.querySelector('.admin-layout');
      if (adminLayout) {
          const isLoggedIn = localStorage.getItem('isAdminLoggedIn');

          if (!isLoggedIn) {
              window.location.href = 'admin-login.html';
          }

          const adminUser = document.querySelector('.admin-user span');
          if (adminUser) {
              const username = localStorage.getItem('adminUsername');
              adminUser.textContent = 'Welcome, ' + (username || 'Admin');
          }
      }

      const logoutBtn = document.getElementById('logoutBtn');
      if (logoutBtn) {
          logoutBtn.addEventListener('click', function() {
              localStorage.removeItem('isAdminLoggedIn');
              localStorage.removeItem('adminUsername');
              window.location.href = 'admin-login.html';
          });
      }

      // Fixed smooth scrolling - only for valid anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
              const href = this.getAttribute('href');

              // Ignore empty anchors or just "#"
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

                  if (navMenu && navMenu.classList.contains('active')) {
                      navMenu.classList.remove('active');
                  }
              }
          });
      });
  });
