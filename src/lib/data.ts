import type { Lang } from './translations';

export const languages = [
  'polish', 'english', 'russian', 'german', 'french', 'spanish',
  'italian', 'latvian', 'slovak', 'chinese', 'japanese', 'korean',
  'arabic', 'portuguese', 'dutch', 'swedish', 'norwegian', 'finnish',
  'hebrew', 'azerbaijani', 'turkish', 'armenian', 'georgian'
] as const;

export type LanguageKey = (typeof languages)[number];

export const languageNames: Record<Lang, Record<LanguageKey, string>> = {
  en: {
    polish: "Polish", english: "English", russian: "Russian",
    german: "German", french: "French", spanish: "Spanish",
    italian: "Italian", latvian: "Latvian", slovak: "Slovak",
    chinese: "Chinese", japanese: "Japanese", korean: "Korean",
    arabic: "Arabic", portuguese: "Portuguese", dutch: "Dutch",
    swedish: "Swedish", norwegian: "Norwegian", finnish: "Finnish",
    hebrew: "Hebrew", azerbaijani: "Azerbaijani", turkish: "Turkish",
    armenian: "Armenian", georgian: "Georgian",
  },
  pl: {
    polish: 'Polski', english: 'Angielski', russian: 'Rosyjski',
    german: 'Niemiecki', french: 'Francuski', spanish: 'Hiszpański',
    italian: 'Włoski', latvian: 'Łotewski', slovak: 'Słowacki',
    chinese: 'Chiński', japanese: 'Japoński', korean: 'Koreański',
    arabic: 'Arabski', portuguese: 'Portugalski', dutch: 'Holenderski',
    swedish: 'Szwedzki', norwegian: 'Norweski', finnish: 'Fiński',
    hebrew: 'Hebrajski', azerbaijani: 'Azerbejdżański', turkish: 'Turecki',
    armenian: 'Ormiański', georgian: 'Gruziński',
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
    en: 'Poznanska 37, 00-687 Warsaw, Poland',
    pl: 'ul. Poznańska 37, 00-687 Warszawa, Polska',
  },
  googleMapsUrl: 'https://maps.app.goo.gl/JsGbJksVDEcUrawK9',
  googleMapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.8047905447916!2d21.0097512!3d52.228764299999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471eccf2ef9c1663%3A0x1dcc975c6cfe6e2a!2sPozna%C5%84ska%2037%2C%2000-689%20Warszawa%2C%20Poland!5e0!3m2!1sen!2sge!4v1776264739394!5m2!1sen!2sge',
};

