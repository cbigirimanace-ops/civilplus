import { useState, useEffect } from 'react';
import axios from 'axios';

const CURRENCY_MAP = {
  // West Africa (XOF / FCFA)
  BJ: { code: 'XOF', symbol: 'FCFA', name: 'Franc CFA', countryCode: 'BJ', rate: 1 },
  BF: { code: 'XOF', symbol: 'FCFA', name: 'Franc CFA', countryCode: 'BF', rate: 1 },
  CI: { code: 'XOF', symbol: 'FCFA', name: 'Franc CFA', countryCode: 'CI', rate: 1 },
  GW: { code: 'XOF', symbol: 'FCFA', name: 'Franc CFA', countryCode: 'GW', rate: 1 },
  ML: { code: 'XOF', symbol: 'FCFA', name: 'Franc CFA', countryCode: 'ML', rate: 1 },
  NE: { code: 'XOF', symbol: 'FCFA', name: 'Franc CFA', countryCode: 'NE', rate: 1 },
  SN: { code: 'XOF', symbol: 'FCFA', name: 'Franc CFA', countryCode: 'SN', rate: 1 },
  TG: { code: 'XOF', symbol: 'FCFA', name: 'Franc CFA', countryCode: 'TG', rate: 1 },
  // Central Africa (XAF)
  CM: { code: 'XAF', symbol: 'FCFA', name: 'Franc CFA', countryCode: 'CM', rate: 1 },
  CF: { code: 'XAF', symbol: 'FCFA', name: 'Franc CFA', countryCode: 'CF', rate: 1 },
  TD: { code: 'XAF', symbol: 'FCFA', name: 'Franc CFA', countryCode: 'TD', rate: 1 },
  CG: { code: 'XAF', symbol: 'FCFA', name: 'Franc CFA', countryCode: 'CG', rate: 1 },
  GQ: { code: 'XAF', symbol: 'FCFA', name: 'Franc CFA', countryCode: 'GQ', rate: 1 },
  GA: { code: 'XAF', symbol: 'FCFA', name: 'Franc CFA', countryCode: 'GA', rate: 1 },
  // Europe (EUR)
  FR: { code: 'EUR', symbol: '€', name: 'Euro', countryCode: 'FR', rate: 0.00152 },
  BE: { code: 'EUR', symbol: '€', name: 'Euro', countryCode: 'BE', rate: 0.00152 },
  CH: { code: 'CHF', symbol: 'CHF', name: 'Franc Suisse', countryCode: 'CH', rate: 0.00152 },
  DE: { code: 'EUR', symbol: '€', name: 'Euro', countryCode: 'DE', rate: 0.00152 },
  ES: { code: 'EUR', symbol: '€', name: 'Euro', countryCode: 'ES', rate: 0.00152 },
  IT: { code: 'EUR', symbol: '€', name: 'Euro', countryCode: 'IT', rate: 0.00152 },
  PT: { code: 'EUR', symbol: '€', name: 'Euro', countryCode: 'PT', rate: 0.00152 },
  // Canada
  CA: { code: 'CAD', symbol: 'CA$', name: 'Dollar Canadien', countryCode: 'CA', rate: 0.00207 },
};

const DEFAULT_CURRENCY = {
  code: 'XOF',
  symbol: 'FCFA',
  name: 'Franc CFA',
  countryCode: 'XOF',
  rate: 1,
};

const currencies = [
  { code: 'XOF', symbol: 'FCFA', name: 'Franc CFA (XOF)', countryCode: 'XOF', rate: 1 },
  { code: 'EUR', symbol: '€', name: 'Euro (EUR)', countryCode: 'EU', rate: 0.00152 },
  { code: 'USD', symbol: '$', name: 'Dollar US (USD)', countryCode: 'US', rate: 0.00166 },
  { code: 'CAD', symbol: 'CA$', name: 'Dollar Canadien (CAD)', countryCode: 'CA', rate: 0.00207 },
];

export function useCurrency() {
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [availableCurrencies] = useState(currencies);

  useEffect(() => {
    const detect = async () => {
      try {
        const response = await axios.get('https://ipapi.co/json/', { timeout: 4000 });
        const { country_code, country_name } = response.data;
        setCountry({ code: country_code, name: country_name });

        if (CURRENCY_MAP[country_code]) {
          setCurrency(CURRENCY_MAP[country_code]);
        }
      } catch {
        // Default to XOF on failure
      } finally {
        setLoading(false);
      }
    };
    detect();
  }, []);

  const convertPrice = (priceInFCFA) => {
    const converted = priceInFCFA * currency.rate;
    if (currency.code === 'XOF' || currency.code === 'XAF') {
      return `${Math.round(converted).toLocaleString('fr-FR')} ${currency.symbol}`;
    }
    return `${currency.symbol}${converted.toFixed(2)}`;
  };

  const changeCurrency = (currencyCode) => {
    const found = currencies.find((c) => c.code === currencyCode);
    if (found) setCurrency(found);
  };

  return { currency, country, loading, convertPrice, changeCurrency, availableCurrencies };
}
