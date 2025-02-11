import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Add namespace if splitting json files
const namespace = [
  'common',
  'bank-accounts',
  'branches',
  'forms',
  'notifications',
  'gmaps',
  'customer',
  'vendor-categories',
  'customer-categories',
  'customer-pricelist',
  'trip-expense-item',
  'vehicles',
  'maintenance-service-item-categories',
  'vendors',
  'maintenance-service-items',
  'job-orders',
  'route',
  'maintenance',
  'job-order-trip-money-payment',
  'job-order-trip-expense-payment',
  'job-order-trip-money-realization',
  'job-order-trip-expense-realization',
  'order'
];

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['id', 'en'],
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    ns: namespace,
    defaultNS: 'common',
    fallbackLng: ['id', 'en'],
    detection: {
      order: [
        'queryString',
        'cookie',
        'localStorage',
        'sessionStorage',
        'navigator',
        'htmlTag',
        'path',
        'subdomain',
      ],
      caches: ['localStorage', 'cookie'],
    },
    interpolation: {
      escapeValue: false, // Not needed for React as it escapes by default
    },
  });

export default i18n;
