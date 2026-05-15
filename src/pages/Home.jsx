import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight, Users, Clock, ShieldCheck, Filter } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import HeroCarousel from '../components/HeroCarousel';
import ProductCard from '../components/ProductCard';
import CountUpNumber from '../components/CountUpNumber';
import { products, categories } from '../data/products';
import { useCurrency } from '../hooks/useCurrency';
import { trackPageView } from '../utils/analytics';

const priceRanges = [
  { label: 'Tous les prix', min: 0, max: Infinity },
  { label: 'Moins de 2 000 FCFA', min: 0, max: 2000 },
  { label: '2 000 – 5 000 FCFA', min: 2000, max: 5000 },
  { label: 'Plus de 5 000 FCFA', min: 5000, max: Infinity },
];

const metrics = [
  {
    icon: Users,
    number: 200,
    prefix: '+',
    suffix: '',
    label: 'ingénieurs utilisant nos produits au quotidien',
  },
  {
    icon: Clock,
    number: 30,
    prefix: '+',
    suffix: 'H',
    label: 'gagnées dans l\'élaboration de vos projets',
  },
  {
    icon: ShieldCheck,
    number: 100,
    prefix: '',
    suffix: '%',
    label: 'conformes aux normes actuelles',
  },
];

export default function Home() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [mobileCarouselIndex, setMobileCarouselIndex] = useState(0);
  const { convertPrice } = useCurrency();
  const location = useLocation();

  useEffect(() => {
    trackPageView('Accueil', '/');
  }, []);

  // Scroll to products section if hash
  useEffect(() => {
    if (location.hash === '#produits') {
      setTimeout(() => {
        document.getElementById('produits')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, [location]);

  const filtered = products.filter((p) => {
    const range = priceRanges[selectedPriceRange];
    const matchSearch =
      search.trim() === '' ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchPrice = p.price >= range.min && p.price <= range.max;
    return matchSearch && matchCategory && matchPrice;
  });

  const mobileNext = () => setMobileCarouselIndex((i) => Math.min(i + 1, filtered.length - 1));
  const mobilePrev = () => setMobileCarouselIndex((i) => Math.max(i - 1, 0));

  useEffect(() => {
    setMobileCarouselIndex(0);
  }, [search, selectedCategory, selectedPriceRange]);

  return (
    <div>
      {/* Hero */}
      <HeroCarousel />

      {/* Products Section */}
      <section id="produits" className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-3">
              Nos Produits
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Des outils professionnels conçus par et pour les ingénieurs civils.
            </p>
          </motion.div>

          {/* Search & Filter bar */}
          <div className="flex flex-col md:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un produit..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-card focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-sm"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-card text-sm font-medium border transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            <div className="relative">
              <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(Number(e.target.value))}
                className="pl-9 pr-4 py-3 border border-gray-200 rounded-card text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent bg-white text-gray-700 appearance-none cursor-pointer"
              >
                {priceRanges.map((range, i) => (
                  <option key={i} value={i}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Desktop: 3-col grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Search size={40} className="mx-auto mb-3 opacity-30" />
              <p>Aucun produit ne correspond à votre recherche.</p>
            </div>
          ) : (
            <>
              <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} convertPrice={convertPrice} />
                ))}
              </div>

              {/* Mobile: single-item carousel */}
              <div className="md:hidden relative">
                <div className="overflow-hidden">
                  <motion.div
                    key={mobileCarouselIndex}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard
                      product={filtered[mobileCarouselIndex]}
                      convertPrice={convertPrice}
                    />
                  </motion.div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={mobilePrev}
                    disabled={mobileCarouselIndex === 0}
                    className="p-2 rounded-full border border-gray-200 disabled:opacity-30 hover:bg-gray-100 transition"
                    aria-label="Précédent"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="text-sm text-gray-500">
                    {mobileCarouselIndex + 1} / {filtered.length}
                  </span>
                  <button
                    onClick={mobileNext}
                    disabled={mobileCarouselIndex === filtered.length - 1}
                    className="p-2 rounded-full border border-gray-200 disabled:opacity-30 hover:bg-gray-100 transition"
                    aria-label="Suivant"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Metrics Section */}
      <section className="bg-primary py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
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
                  <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center">
                    <Icon size={28} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-4xl md:text-5xl font-extrabold text-white">
                      <CountUpNumber
                        target={metric.number}
                        prefix={metric.prefix}
                        suffix={metric.suffix}
                        duration={2000}
                      />
                    </p>
                    <p className="text-gray-400 mt-2 text-sm leading-relaxed max-w-xs mx-auto">
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
