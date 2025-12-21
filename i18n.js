// i18n.js - Internationalization Helper
  document.addEventListener('DOMContentLoaded', function() {
      setupLanguageSwitcher();
      applyLanguage();

      document.body.classList.add('loaded');
  });

  function initLanguage() {
      const currentLang = getCurrentLanguage();
      document.documentElement.lang = currentLang;

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
      // Translate elements with data-i18n
      document.querySelectorAll('[data-i18n]').forEach(element => {
          const key = element.getAttribute('data-i18n');
          const translation = t(key);
          element.textContent = translation;
      });

      // Translate placeholders
      document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
          const key = element.getAttribute('data-i18n-placeholder');
          const translation = t(key);
          element.setAttribute('placeholder', translation);
      });

      // Translate HTML content
      document.querySelectorAll('[data-i18n-html]').forEach(element => {
          const key = element.getAttribute('data-i18n-html');
          const translation = t(key);
          element.innerHTML = translation;
      });

      // Translate select options
      document.querySelectorAll('select option[data-i18n]').forEach(option => {
          const key = option.getAttribute('data-i18n');
          const translation = t(key);
          option.textContent = translation;
      });
  }

  function applyLanguage() {
    const currentLang = getCurrentLanguage();

    // <html lang="">
    document.documentElement.lang = currentLang;

    // Active state on language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });

    // Apply translations
    translatePage();
  }

  // Get localized field from Firebase document
  function getLocalizedField(item, field) {
      const lang = getCurrentLanguage();

      if (lang === 'en' && item[field + '_en']) {
          return item[field + '_en'];
      }

      if (lang === 'sr' && item[field + '_sr']) {
          return item[field + '_sr'];
      }

      return item[field] || '';
  }
