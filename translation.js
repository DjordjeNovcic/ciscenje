 // translations.js
  const translations = {
      sr: {
          // Navigation
          nav: {
              home: 'Početna',
              services: 'Usluge',
              about: 'O nama',
              gallery: 'Galerija',
              contact: 'Kontakt'
          },
          // Landing page
          landing: {
              subtitle: 'Profesionalno Čišćenje'
          },
          // Services page
          servicesPage: {
              title: 'Naše Usluge',
              subtitle: 'Profesionalno čišćenje prilagođeno vašim potrebama',
              addonsTitle: 'Dodatne Usluge',
              addonsSubtitle: 'Proširite svoje čišćenje sa našim dodatnim uslugama',
              bookButton: 'Zakažite'
          },
          // CTA Section
          cta: {
              title: 'Spremni za savršeno čist prostor?',
              subtitle: 'Kontaktirajte nas danas i zakažite termin',
              button: 'Zakažite Čišćenje'
          },
          // Footer
          footer: {
              about: 'MS Sjaj',
              aboutText: 'Profesionalne usluge čišćenja za vaš dom i poslovni prostor.',
              contact: 'Kontakt',
              phone: 'Telefon',
              email: 'Email',
              hours: 'Radno vreme',
              hoursText: 'Pon-Pet: 08:00 - 20:00<br>Subota: 09:00 - 17:00',
              copyright: '© 2024 MS Sjaj. Sva prava zadržana.'
          },
          // About page
          aboutPage: {
              title: 'O nama',
              subtitle: 'Upoznajte naš tim i našu priču'
          },
          // Contact page
          contactPage: {
              title: 'Kontaktirajte nas',
              subtitle: 'Javite nam se i zakažite termin',
              name: 'Ime i prezime',
              email: 'Email',
              phone: 'Telefon',
              service: 'Usluga',
              message: 'Poruka',
              send: 'Pošalji'
          },
          // Loading
          loading: 'Učitavanje...'
      },
      en: {
          // Navigation
          nav: {
              home: 'Home',
              services: 'Services',
              about: 'About',
              gallery: 'Gallery',
              contact: 'Contact'
          },
          // Landing page
          landing: {
              subtitle: 'Professional Cleaning'
          },
          // Services page
          servicesPage: {
              title: 'Our Services',
              subtitle: 'Professional cleaning tailored to your needs',
              addonsTitle: 'Additional Services',
              addonsSubtitle: 'Enhance your cleaning with our additional services',
              bookButton: 'Book Now'
          },
          // CTA Section
          cta: {
              title: 'Ready for a perfectly clean space?',
              subtitle: 'Contact us today and schedule an appointment',
              button: 'Book Cleaning'
          },
          // Footer
          footer: {
              about: 'MS Sjaj',
              aboutText: 'Professional cleaning services for your home and business.',
              contact: 'Contact',
              phone: 'Phone',
              email: 'Email',
              hours: 'Working Hours',
              hoursText: 'Mon-Fri: 08:00 AM - 08:00 PM<br>Saturday: 09:00 AM - 05:00 PM',
              copyright: '© 2024 MS Sjaj. All rights reserved.'
          },
          // About page
          aboutPage: {
              title: 'About Us',
              subtitle: 'Meet our team and our story'
          },
          // Contact page
          contactPage: {
              title: 'Contact Us',
              subtitle: 'Get in touch and schedule an appointment',
              name: 'Full Name',
              email: 'Email',
              phone: 'Phone',
              service: 'Service',
              message: 'Message',
              send: 'Send'
          },
          // Loading
          loading: 'Loading...'
      }
  };

  // Get current language from localStorage or default to Serbian
  function getCurrentLanguage() {
      return localStorage.getItem('language') || 'sr';
  }

  // Set language
  function setLanguage(lang) {
      localStorage.setItem('language', lang);
      location.reload(); // Reload page to apply translations
  }

  // Get translation
  function t(key) {
      const lang = getCurrentLanguage();
      const keys = key.split('.');
      let value = translations[lang];

      for (const k of keys) {
          value = value[k];
          if (!value) return key;
      }

      return value;
  }

  // Export for use in other files
  if (typeof module !== 'undefined' && module.exports) {
      module.exports = { translations, getCurrentLanguage, setLanguage, t };
  }
