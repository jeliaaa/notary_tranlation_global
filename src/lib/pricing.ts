import { languagePrices } from './data';
import type { Lang } from './translations';

export function getLanguagePairPrice(from: string, to: string): number {
  if (from === 'georgian') return languagePrices[to] ?? 0;
  if (to === 'georgian') return languagePrices[from] ?? 0;
  return Math.max(languagePrices[from] ?? 0, languagePrices[to] ?? 0);
}

export function calcTranslation(basePrice: number, pages: number) {
  const cost = basePrice * pages;
  let discount = 0;
  if (pages >= 100) discount = cost * 0.15;
  else if (pages >= 50) discount = cost * 0.1;
  return { cost: cost - discount, discount };
}

export function calcNotary(pages: number): number {
  let pricePerPage: number;
  if (pages === 1) pricePerPage = 6;
  else if (pages <= 10) pricePerPage = 4;
  else if (pages <= 50) pricePerPage = 3;
  else pricePerPage = 2;
  return pricePerPage * pages * 1.18 + 5;
}

export function calcDelivery(pages: number, notary: boolean, lang: Lang): string {
  let time: string;
  if (pages <= 10) {
    time = lang === 'pl' ? 'Około 90 minut' : 'About 90 minutes';
  } else if (pages <= 40) {
    time = lang === 'pl' ? 'Około 180 minut' : 'About 180 minutes';
  } else {
    time = lang === 'pl'
      ? 'Indywidualnie, skontaktujemy się z tobą'
      : 'Custom, we will contact you';
  }

  if (notary && (time.includes('minut') || time.includes('minutes'))) {
    time += lang === 'pl'
      ? ' + 1 dzień na poświadczenie notarialne'
      : ' + 1 day for notary approval';
  }
  return time;
}
