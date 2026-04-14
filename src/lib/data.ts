import type { Lang } from './translations';

export const languages = [
  'georgian', 'english', 'russian', 'german', 'french', 'spanish',
  'italian', 'latvian', 'slovak', 'chinese', 'japanese', 'korean',
  'arabic', 'portuguese', 'dutch', 'swedish', 'norwegian', 'finnish',
  'jewish', 'azerbaijani', 'turkish', 'armenian',
] as const;

export type LanguageKey = (typeof languages)[number];

export const languageNames: Record<Lang, Record<LanguageKey, string>> = {
  en: {
    georgian: 'Georgian', english: 'English', russian: 'Russian',
    german: 'German', french: 'French', spanish: 'Spanish',
    italian: 'Italian', latvian: 'Latvian', slovak: 'Slovak',
    chinese: 'Chinese', japanese: 'Japanese', korean: 'Korean',
    arabic: 'Arabic', portuguese: 'Portuguese', dutch: 'Dutch',
    swedish: 'Swedish', norwegian: 'Norwegian', finnish: 'Finnish',
    jewish: 'Jewish', azerbaijani: 'Azerbaijani', turkish: 'Turkish',
    armenian: 'Armenian',
  },
  pl: {
    georgian: 'Gruziński', english: 'Angielski', russian: 'Rosyjski',
    german: 'Niemiecki', french: 'Francuski', spanish: 'Hiszpański',
    italian: 'Włoski', latvian: 'Łotewski', slovak: 'Słowacki',
    chinese: 'Chiński', japanese: 'Japoński', korean: 'Koreański',
    arabic: 'Arabski', portuguese: 'Portugalski', dutch: 'Holenderski',
    swedish: 'Szwedzki', norwegian: 'Norweski', finnish: 'Fiński',
    jewish: 'Hebrajski', azerbaijani: 'Azerbejdżański', turkish: 'Turecki',
    armenian: 'Ormiański',
  },
};

export const languagePrices: Record<string, number> = {
  english: 22.5,
  russian: 22.5,
  german: 35,
  french: 35,
  spanish: 50,
  italian: 35,
  latvian: 35,
  slovak: 37.5,
  chinese: 72.5,
  japanese: 100,
  korean: 100,
  arabic: 57.5,
  portuguese: 50,
  dutch: 50,
  jewish: 50,
  azerbaijani: 27.5,
  turkish: 25,
  armenian: 25,
};

export const CONTACT = {
  phone1: { display: '+995 591 729 911', tel: '+995591729911', short: '591729911' },
  phone2: { display: '+995 579 737 737', tel: '+995579737737' },
  email: 'info@th.com.ge',
  emailForCopy: 'notarytranslation24@gmail.com',
  whatsapp: '+995591729911',
  address: {
    en: 'Tbilisi, Business Center Karvasla, 7 Kotne Dadiani St.',
    pl: 'Tbilisi, Centrum Biznesowe Karvasla, ul. Cotne Dadiani 7',
  },
  googleMapsUrl: 'https://maps.app.goo.gl/VJ6hqwzq2NhoFH3v6',
  googleMapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2977.9971810990783!2d44.79694!3d41.6933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDQxJzM2LjAiTiA0NMKwNDcnNDkuMCJF!5e0!3m2!1sen!2sge!4v1234567890',
};
