import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { locales } from './locales';

const I18nContext = createContext(null);

const STORAGE_KEY = 'civilplus_lang';
const DEFAULT_LANG = 'fr';
const SUPPORTED = ['fr', 'en'];

function getInitialLang() {
  if (typeof window === 'undefined') return DEFAULT_LANG;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED.includes(stored)) return stored;
  // Optional: auto-detect from browser
  const browser = (navigator.language || 'fr').toLowerCase().split('-')[0];
  return SUPPORTED.includes(browser) ? browser : DEFAULT_LANG;
}

function resolve(obj, path) {
  return path.split('.').reduce((acc, k) => (acc && acc[k] != null ? acc[k] : undefined), obj);
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch {}
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next) => {
    if (SUPPORTED.includes(next)) setLangState(next);
  }, []);

  const t = useCallback((key, fallback) => {
    const dict = locales[lang] || locales[DEFAULT_LANG];
    const value = resolve(dict, key);
    if (value != null) return value;
    // Fall back to default lang then to provided fallback
    const fallbackValue = resolve(locales[DEFAULT_LANG], key);
    return fallbackValue != null ? fallbackValue : (fallback ?? key);
  }, [lang]);

  // Localize a product object: merge its .i18n[lang] over the base.
  const localizeProduct = useCallback((product) => {
    if (!product) return product;
    if (lang === 'en' && product.i18n?.en) {
      return { ...product, ...product.i18n.en };
    }
    return product;
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t, localizeProduct, supported: SUPPORTED }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
}
