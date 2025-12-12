// i18n.js
  // Import translations (make sure translations.js is loaded first)

  document.addEventListener('DOMContentLoaded', function() {
      initLanguage();
      setupLanguageSwitcher();
      translatePage();
  });

  function initLanguage() {
      const currentLang = getCurrentLanguage();

      // Set active language button
      document.querySelectorAll('.lang-btn').forEach(btn => {
          if (btn.dataset.lang === currentLang) {
              btn.classList.add('active');
          } else {
              btn.classList.remove('active');
          }
      });
  }

  function setupLanguageSwitcher() {
      document.querySelectorAll('.lang-btn').forEach(btn => {
          btn.addEventListener('click', function() {
              const lang = this.dataset.lang;
              setLanguage(lang);
          });
      });
  }

  function translatePage() {
      // Translate all elements with data-i18n attribute
      document.querySelectorAll('[data-i18n]').forEach(element => {
          const key = element.getAttribute('data-i18n');
          const translation = t(key);

          // Check if element has placeholder attribute
          if (element.hasAttribute('placeholder')) {
              element.setAttribute('placeholder', translation);
          } else {
              element.textContent = translation;
          }
      });

      // Translate elements with innerHTML (for HTML content like <br>)
      document.querySelectorAll('[data-i18n-html]').forEach(element => {
          const key = element.getAttribute('data-i18n-html');
          const translation = t(key);
          element.innerHTML = translation;
      });
  }

  // Function to get translated content from Firebase based on current language
  function getLocalizedField(item, field) {
      const lang = getCurrentLanguage();
      const localizedField = `${field}_${lang}`;

      // Return localized version if exists, otherwise fall back to default
      return item[localizedField] || item[field];
  }
