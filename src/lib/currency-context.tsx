'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

export type Currency = 'PLN' | 'EUR';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  symbol: string;
  formatPrice: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'PLN',
  setCurrency: () => {},
  symbol: 'zł',
  formatPrice: (n) => `${n} zł`,
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('PLN');

  const symbol = currency === 'PLN' ? 'zł' : '€';

  const formatPrice = (amount: number) => {
    if (currency === 'EUR') return `€${amount % 1 === 0 ? amount : amount.toFixed(2)}`;
    return `${amount % 1 === 0 ? amount : amount.toFixed(2)} zł`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, symbol, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
