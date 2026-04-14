import { en } from './en';
import { pl } from './pl';

export type Lang = 'en' | 'pl';

export const translations = { en, pl } as const;

export type Translations = typeof en;

export function getT(lang: Lang): Translations {
  return translations[lang] ?? translations.en;
}

export { en, pl };
