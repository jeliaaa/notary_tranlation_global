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

import type { Currency } from './currency-context';

const cheapLangs = new Set(['english', 'russian']);

const currencyPrices: Record<Currency, { cheap: number; standard: number }> = {
  PLN: { cheap: 50, standard: 99 },
  EUR: { cheap: 12, standard: 23 },
};

export function getLanguagePrice(lang: string, currency: Currency): number {
  const tier = cheapLangs.has(lang) ? 'cheap' : 'standard';
  return currencyPrices[currency][tier];
}

// Legacy export used by pricing.ts — defaults to PLN
export const languagePrices: Record<string, number> = {
  english: 50,
  russian: 50,
  german: 99,
  french: 99,
  spanish: 99,
  italian: 99,
  latvian: 99,
  slovak: 99,
  chinese: 99,
  japanese: 99,
  korean: 99,
  arabic: 99,
  portuguese: 99,
  dutch: 99,
  jewish: 99,
  azerbaijani: 99,
  turkish: 99,
  armenian: 99,
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
