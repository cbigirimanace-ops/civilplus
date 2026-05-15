import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { useCurrency } from '../hooks/useCurrency';
import { useI18n } from '../i18n/I18nContext';
import LanguageSwitch from './LanguageSwitch';

export default function Navbar() {
  const location = useLocation();
  const { t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [bubbleStyle, setBubbleStyle] = useState({});
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const linkRefs = useRef([]);
  const navRef = useRef(null);
  const { currency, availableCurrencies, changeCurrency } = useCurrency();

  const navLinks = [
    { label: t('nav.home'), to: '/' },
    { label: t('nav.products'), to: '/#produits' },
    { label: t('nav.services'), to: '/nos-services' },
    { label: t('nav.about'), to: '/a-propos' },
    { label: t('nav.contact'), to: '/contact' },
  ];

  useEffect(() => {
    const idx = navLinks.findIndex((l) => {
      if (l.to === '/') return location.pathname === '/';
      return location.pathname.startsWith(l.to.replace('/#produits', ''));
    });
    setActiveIndex(idx >= 0 ? idx : 0);
  }, [location.pathname]);

  useEffect(() => {
    const targetIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;
    const el = linkRefs.current[targetIndex];
    const nav = navRef.current;
    if (el && nav) {
      const elRect = el.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();
      setBubbleStyle({
        left: elRect.left - navRect.left - 8,
        width: elRect.width + 16,
        opacity: 1,
      });
    }
  }, [hoveredIndex, activeIndex]);

  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest('[data-currency-dropdown]')) {
        setCurrencyOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-primary shadow-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-1">
            <span className="text-white font-extrabold text-2xl tracking-tight">Civil</span>
            <span className="text-white font-extrabold text-2xl">+</span>
          </Link>

          {/* Desktop nav */}
          <div
            ref={navRef}
            className="hidden md:flex items-center gap-1 relative"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 h-9 bg-white/10 rounded-full pointer-events-none"
              animate={bubbleStyle}
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              style={{ opacity: 0 }}
            />
            {navLinks.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                ref={(el) => (linkRefs.current[i] = el)}
                onMouseEnter={() => setHoveredIndex(i)}
                onClick={() => setActiveIndex(i)}
                className={`relative z-10 px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                  activeIndex === i ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side: language + currency */}
          <div className="hidden md:flex items-center gap-2">
            <div className="bg-white/5 rounded-full px-2 py-1">
              <LanguageSwitch />
            </div>

            <div className="relative" data-currency-dropdown>
              <button
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className="flex items-center gap-2 text-gray-300 hover:text-white text-sm font-medium px-3 py-2 rounded-full hover:bg-white/10 transition"
                aria-label={t('nav.currency')}
              >
                <Globe size={16} />
                <span className="text-xs font-bold">{currency.countryCode}</span>
                <span>{currency.symbol}</span>
                <ChevronDown size={14} className={`transition-transform ${currencyOpen ? 'rotate-180' : ''}`} />
              </button>
              {currencyOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-full mt-2 bg-white rounded-card shadow-xl border border-gray-100 min-w-[200px] z-50 overflow-hidden"
                >
                  {availableCurrencies.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => { changeCurrency(c.code); setCurrencyOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-gray-50 transition ${
                        currency.code === c.code ? 'bg-primary/10 text-primary font-semibold' : 'text-gray-700'
                      }`}
                    >
                      <span className="w-8 h-5 rounded text-xs font-bold bg-gray-100 flex items-center justify-center text-gray-600">
                        {c.countryCode}
                      </span>
                      <span>{c.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition"
            aria-label={t('nav.menu')}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-primary border-t border-white/10"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => { setMobileOpen(false); setActiveIndex(i); }}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition ${
                    activeIndex === i ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile language */}
              <div className="mt-2 pt-2 border-t border-white/10">
                <p className="text-xs text-gray-500 px-4 mb-1">{t('nav.language')}</p>
                <div className="px-4">
                  <LanguageSwitch />
                </div>
              </div>

              {/* Mobile currency */}
              <div className="mt-2 pt-2 border-t border-white/10">
                <p className="text-xs text-gray-500 px-4 mb-1">{t('nav.currency')}</p>
                <div className="flex flex-wrap gap-2 px-4">
                  {availableCurrencies.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => changeCurrency(c.code)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                        currency.code === c.code ? 'bg-white text-primary' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      {c.countryCode} {c.symbol}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
