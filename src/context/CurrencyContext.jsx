import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CURRENCY_MAP = {
  BJ: { code: 'XOF', symbol: 'FCFA', name: 'Franc CFA', countryCode: 'XOF', rate: 1 },
  BF: { code: 'XOF', symbol: 'FCFA', name: 'Franc CFA', countryCode: 'XOF', rate: 1 },
  CI: { code: 'XOF', symbol: 'FCFA', name: 'Franc CFA', countryCode: 'XOF', rate: 1 },
  GW: { code: 'XOF', symbol: 'FCFA', name: 'Franc CFA', countryCode: 'XOF', rate: 1 },
  ML: { code: 'XOF', symbol: 'FCFA', name: 'Franc CFA', countryCode: 'XOF', rate: 1 },
  NE: { code: 'XOF', symbol: 'FCFA', name: 'Franc CFA', countryCode: 'XOF', rate: 1 },
  SN: { code: 'XOF', symbol: 'FCFA', name: 'Franc CFA', countryCode: 'XOF', rate: 1 },
  TG: { code: 'XOF', symbol: 'FCFA', name: 'Franc CFA', countryCode: 'XOF', rate: 1 },
  CM: { code: 'XAF', symbol: 'FCFA', name: 'Franc CFA', countryCode: 'XAF', rate: 1 },
  CF: { code: 'XAF', symbol: 'FCFA', name: 'Franc CFA', countryCode: 'XAF', rate: 1 },
  TD: { code: 'XAF', symbol: 'FCFA', name: 'Franc CFA', countryCode: 'XAF', rate: 1 },
  CG: { code: 'XAF', symbol: 'FCFA', name: 'Franc CFA', countryCode: 'XAF', rate: 1 },
  GQ: { code: 'XAF', symbol: 'FCFA', name: 'Franc CFA', countryCode: 'XAF', rate: 1 },
  GA: { code: 'XAF', symbol: 'FCFA', name: 'Franc CFA', countryCode: 'XAF', rate: 1 },
  FR: { code: 'EUR', symbol: '€', name: 'Euro', countryCode: 'EUR', rate: 0.00152 },
  BE: { code: 'EUR', symbol: '€', name: 'Euro', countryCode: 'EUR', rate: 0.00152 },
  CH: { code: 'CHF', symbol: 'CHF', name: 'Franc Suisse', countryCode: 'CHF', rate: 0.00151 },
  DE: { code: 'EUR', symbol: '€', name: 'Euro', countryCode: 'EUR', rate: 0.00152 },
  ES: { code: 'EUR', symbol: '€', name: 'Euro', countryCode: 'EUR', rate: 0.00152 },
  IT: { code: 'EUR', symbol: '€', name: 'Euro', countryCode: 'EUR', rate: 0.00152 },
  PT: { code: 'EUR', symbol: '€', name: 'Euro', countryCode: 'EUR', rate: 0.00152 },
  CA: { code: 'CAD', symbol: 'CA$', name: 'Dollar Canadien', countryCode: 'CAD', rate: 0.00207 },
  US: { code: 'USD', symbol: '$', name: 'Dollar US', countryCode: 'USD', rate: 0.00166 },
};

const DEFAULT_CURRENCY = { code: 'XOF', symbol: 'FCFA', name: 'Franc CFA (XOF)', countryCode: 'XOF', rate: 1 };

export const AVAILABLE_CURRENCIES = [
  { code: 'XOF', symbol: 'FCFA', name: 'Franc CFA (XOF)', countryCode: 'XOF', rate: 1 },
  { code: 'EUR', symbol: '€', name: 'Euro (EUR)', countryCode: 'EUR', rate: 0.00152 },
  { code: 'USD', symbol: '$', name: 'Dollar US (USD)', countryCode: 'USD', rate: 0.00166 },
  { code: 'CAD', symbol: 'CA$', name: 'Dollar Canadien (CAD)', countryCode: 'CAD', rate: 0.00207 },
];

const CurrencyContext = createContext(null);

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);

  useEffect(() => {
    axios
      .get('https://ipapi.co/json/', { timeout: 4000 })
      .then(({ data }) => {
        const detected = CURRENCY_MAP[data.country_code];
        if (detected) {
          const match = AVAILABLE_CURRENCIES.find((c) => c.code === detected.code);
          if (match) setCurrency(match);
        }
      })
      .catch(() => {});
  }, []);

  const convertPrice = (priceInFCFA) => {
    const converted = priceInFCFA * currency.rate;
    if (currency.code === 'XOF' || currency.code === 'XAF') {
      return `${Math.round(converted).toLocaleString('fr-FR')} ${currency.symbol}`;
    }
    if (currency.code === 'EUR') return `${converted.toFixed(2)} ${currency.symbol}`;
    return `${currency.symbol}${converted.toFixed(2)}`;
  };

  const changeCurrency = (code) => {
    const found = AVAILABLE_CURRENCIES.find((c) => c.code === code);
    if (found) setCurrency(found);
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, convertPrice, changeCurrency, availableCurrencies: AVAILABLE_CURRENCIES }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
