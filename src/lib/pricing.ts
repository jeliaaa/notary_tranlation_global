import { getLanguagePrice } from './data';
import type { Lang } from './translations';
import type { Currency } from './currency-context';

export function getLanguagePairPrice(from: string, to: string, currency: Currency = 'PLN'): number {
  if (from === 'georgian') return getLanguagePrice(to, currency);
  if (to === 'georgian') return getLanguagePrice(from, currency);
  return Math.max(getLanguagePrice(from, currency), getLanguagePrice(to, currency));
}

export function calcTranslation(basePrice: number, pages: number) {
  const cost = basePrice * pages;
  let discount = 0;
  if (pages >= 100) discount = cost * 0.15;
  else if (pages >= 50) discount = cost * 0.1;
  return { cost: cost - discount, discount };
}

const notaryRates: Record<Currency, { single: number; upTo10: number; upTo50: number; over50: number; fee: number }> = {
  PLN: { single: 8, upTo10: 6, upTo50: 4, over50: 3, fee: 7 },
  EUR: { single: 2, upTo10: 1.5, upTo50: 1, over50: 0.75, fee: 1.5 },
};

export function calcNotary(pages: number, currency: Currency = 'PLN'): number {
  const r = notaryRates[currency];
  let pricePerPage: number;
  if (pages === 1) pricePerPage = r.single;
  else if (pages <= 10) pricePerPage = r.upTo10;
  else if (pages <= 50) pricePerPage = r.upTo50;
  else pricePerPage = r.over50;
  return pricePerPage * pages + r.fee;
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
