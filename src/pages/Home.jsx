import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Users, Clock, ShieldCheck, Filter } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import HeroCarousel from '../components/HeroCarousel';
import ProductCard from '../components/ProductCard';
import CountUpNumber from '../components/CountUpNumber';
import { products, categories } from '../data/products';
import { trackPageView } from '../utils/analytics';
import { useI18n } from '../i18n/I18nContext';
import SeoMeta from '../components/SeoMeta';

export default function Home() {
  const { t, localizeProduct } = useI18n();

  const priceRanges = [
    { label: t('home.priceAll'), min: 0, max: Infinity },
    { label: t('home.priceLt2k'), min: 0, max: 2000 },
    { label: t('home.priceMid'), min: 2000, max: 5000 },
    { label: t('home.priceGt5k'), min: 5000, max: Infinity },
  ];

  const metrics = [
    { icon: Users, number: 200, prefix: '+', suffix: '', label: t('home.metric1') },
    { icon: Clock, number: 30, prefix: '+', suffix: 'H', label: t('home.metric2') },
    { icon: ShieldCheck, number: 100, prefix: '', suffix: '%', label: t('home.metric3') },
  ];

  const categoryLabels = {
    all: t('home.catAll'),
    excel: t('home.catExcel'),
    app: t('home.catApp'),
    formation: t('home.catFormation'),
    documents: t('home.catDocuments'),
  };

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const location = useLocation();

  // Featured product slugs (the 4 highlighted on mobile)
  const FEATURED_SLUGS = ['manager-toolkit', 'pack-bureaux-etudes', 'template-gantt', 'pack-controle-qualite'];
  // unused vars retained for tooling
  // eslint-disable-next-line no-unused-vars
  const _t = t;

  useEffect(() => {
    trackPageView('Accueil', '/');
  }, []);

  useEffect(() => {
    if (location.hash === '#produits') {
      setTimeout(() => {
        document.getElementById('produits')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, [location]);

  const filtered = products.map(localizeProduct).filter((p) => {
    const range = priceRanges[selectedPriceRange];
    const matchSearch =
      search.trim() === '' ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchPrice = p.price >= range.min && p.price <= range.max;
    return matchSearch && matchCategory && matchPrice;
  });

  useEffect(() => { setFeaturedIndex(0); }, [search, selectedCategory, selectedPriceRange]);

  // Split filtered products into featured + others (mobile two-section layout)
  const featuredProducts = filtered.filter((p) => FEATURED_SLUGS.includes(p.slug));
  const otherProducts = filtered.filter((p) => !FEATURED_SLUGS.includes(p.slug));

  // Auto-advance featured carousel every 2s
  useEffect(() => {
    if (featuredProducts.length <= 1) return;
    const id = setInterval(() => {
      setFeaturedIndex((i) => (i + 1) % featuredProducts.length);
    }, 2000);
    return () => clearInterval(id);
  }, [featuredProducts.length]);

  return (
    <div>
      <SeoMeta
        title="Civil+ | Outils professionnels pour ingénieurs civils"
        description={t('home.productsSubtitle')}
        url="https://civilplus.work/"
      />
      <HeroCarousel />

      {/* Products */}
      <section id="produits" className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-3">{t('home.productsTitle')}</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              {t('home.productsSubtitle')}
            </p>
          </motion.div>

          {/* Search & Filter — compact heights */}
          <div className="flex flex-col md:flex-row gap-2 mb-8">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('home.searchPlaceholder')}
                className="w-full pl-9 pr-3 h-9 border border-gray-200 rounded-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              />
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 h-9 rounded-card text-sm font-medium border transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
                  }`}
                >
                  {categoryLabels[cat.id] || cat.name}
                </button>
              ))}
            </div>
            <div className="relative">
              <Filter size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(Number(e.target.value))}
                className="appearance-none pl-8 pr-7 h-9 border border-gray-200 rounded-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-gray-700 cursor-pointer"
              >
                {priceRanges.map((range, i) => (
                  <option key={i} value={i}>{range.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Desktop grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Search size={40} className="mx-auto mb-3 opacity-30" />
              <p>{t('home.noResults')}</p>
            </div>
          ) : (
            <>
              {/* Desktop / Tablet: grid */}
              <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* MOBILE: featured auto-carousel + 2-col grid for the rest */}
              <div className="md:hidden space-y-8">
                {featuredProducts.length >= 2 && (
                  <section>
                    <div className="flex items-center justify-between mb-3 px-1">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                        Produits phares
                      </h3>
                      <span className="text-[10px] text-gray-400">
                        {featuredIndex + 1} / {featuredProducts.length}
                      </span>
                    </div>
                    <div className="relative overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={featuredProducts[featuredIndex]?.id}
                          initial={{ opacity: 0, x: 40 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -40 }}
                          transition={{ duration: 0.4, ease: 'easeInOut' }}
                        >
                          <ProductCard product={featuredProducts[featuredIndex]} eager />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    {/* Dots */}
                    <div className="flex justify-center gap-1.5 mt-3">
                      {featuredProducts.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setFeaturedIndex(i)}
                          className={`h-1.5 rounded-full transition-all ${
                            i === featuredIndex ? 'w-6 bg-primary' : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                          }`}
                          aria-label={`Slide ${i + 1}`}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {otherProducts.length > 0 && (
                  <section>
                    {featuredProducts.length >= 2 && (
                      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 px-1">
                        Autres produits
                      </h3>
                    )}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="grid grid-cols-2 gap-3"
                    >
                      {otherProducts.map((product) => (
                        <ProductCard key={product.id} product={product} dense />
                      ))}
                    </motion.div>
                  </section>
                )}

                {/* Fallback: if filtering left no featured products, render all in 2-col */}
                {featuredProducts.length < 2 && otherProducts.length === 0 && filtered.length > 0 && (
                  <div className="grid grid-cols-2 gap-3">
                    {filtered.map((product) => (
                      <ProductCard key={product.id} product={product} dense />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Metrics */}
      <section className="bg-primary py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white text-3xl font-extrabold mb-14"
          >
            {t('home.metricsTitle')}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center text-white">
            {metrics.map((metric, i) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Icon size={30} className="text-white" />
                  </div>
                  <div>
                    <p className="text-3xl md:text-4xl font-extrabold text-white">
                      <CountUpNumber
                        target={metric.number}
                        prefix={metric.prefix}
                        suffix={metric.suffix}
                        duration={2000}
                      />
                    </p>
                    <p className="text-gray-400 mt-2 text-xs md:text-sm leading-relaxed max-w-xs mx-auto">
                      {metric.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
