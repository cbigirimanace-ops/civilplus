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
  const [mobileCurrencyOpen, setMobileCurrencyOpen] = useState(false);
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
      if (!e.target.closest('[data-mobile-currency]')) {
        setMobileCurrencyOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const renderCurrencyDropdown = (isOpen, close) => (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute right-0 top-full mt-2 bg-white rounded-card shadow-xl border border-gray-100 min-w-[180px] z-50 overflow-hidden"
    >
      {availableCurrencies.map((c) => (
        <button
          key={c.code}
          onClick={() => { changeCurrency(c.code); close(); }}
          className={`w-full text-left px-3 py-2.5 text-sm flex items-center gap-2 hover:bg-gray-50 transition ${
            currency.code === c.code ? 'bg-primary/10 text-primary font-semibold' : 'text-gray-700'
          }`}
        >
          <span className="w-8 h-5 rounded text-[10px] font-bold bg-gray-100 flex items-center justify-center text-gray-600">
            {c.countryCode}
          </span>
          <span className="text-xs">{c.name}</span>
        </button>
      ))}
    </motion.div>
  );

  return (
    <nav className="sticky top-0 z-50 bg-primary shadow-lg">
      <div className="max-w-7xl mx-auto px-3 md:px-6">
        <div className="flex items-center gap-2 h-14 md:h-16">
          {/* Logo — far left */}
          <Link to="/" className="flex items-center gap-1 flex-shrink-0">
            <span className="text-white font-extrabold text-xl md:text-2xl tracking-tight">Civil</span>
            <span className="text-white font-extrabold text-xl md:text-2xl">+</span>
          </Link>

          {/* MOBILE: centered currency (flex-1 pushes it to center between logo and right group) */}
          <div className="flex-1 flex justify-center md:hidden">
            <div className="relative" data-mobile-currency>
              <button
                onClick={() => setMobileCurrencyOpen(!mobileCurrencyOpen)}
                className="flex items-center gap-1 text-gray-200 text-xs font-medium px-2.5 py-1.5 rounded-md bg-white/10 hover:bg-white/15 transition"
                aria-label={t('nav.currency')}
              >
                <Globe size={12} />
                <span className="text-[11px] font-bold">{currency.countryCode}</span>
                <span className="text-xs">{currency.symbol}</span>
                <ChevronDown size={12} className={`transition-transform ${mobileCurrencyOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileCurrencyOpen && renderCurrencyDropdown(mobileCurrencyOpen, () => setMobileCurrencyOpen(false))}
            </div>
          </div>

          {/* Desktop nav */}
          <div
            ref={navRef}
            className="hidden md:flex items-center gap-1 relative flex-1 justify-center"
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

          {/* MOBILE: right-aligned language switch + hamburger */}
          <div className="flex md:hidden items-center gap-1.5 flex-shrink-0">
            <div className="bg-white/10 rounded-md px-1.5 py-1">
              <LanguageSwitch />
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-white p-1.5 rounded-lg hover:bg-white/10 transition"
              aria-label={t('nav.menu')}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Desktop right side: language + currency */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
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
              {currencyOpen && renderCurrencyDropdown(currencyOpen, () => setCurrencyOpen(false))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu — only nav links now (currency & language are inline above) */}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
