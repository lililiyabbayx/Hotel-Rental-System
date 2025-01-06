import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      welcome: 'Welcome',
      bookNow: 'Book Now',
      tripRecommendations: 'Trip Recommendations',
    },
  },
  fr: {
    translation: {
      welcome: 'Bienvenue',
      bookNow: 'Réserver Maintenant',
      tripRecommendations: 'Recommandations de Voyage',
    },
  },
  es: {
    translation: {
      welcome: 'Bienvenido',
      bookNow: 'Reservar Ahora',
      tripRecommendations: 'Recomendaciones de Viaje',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Default language
  fallbackLng: 'en', // Fallback language
  interpolation: {
    escapeValue: false, // React already handles escaping
  },
});

export default i18n;
