import en from '@/locales/en/translation.json';
import uk from '@/locales/uk/translation.json';

const resources = {
  en: {
    translation: en,
  },
  uk: {
    translation: uk,
  },
} as const;

export { resources };
