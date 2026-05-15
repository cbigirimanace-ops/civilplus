import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, ExternalLink, ChevronLeft, ChevronRight,
  ArrowLeft, CheckCircle2, Download, Shield, Clock, Users,
} from 'lucide-react';
import StarRating from '../components/StarRating';
import CountdownTimer from '../components/CountdownTimer';
import ReviewsCarousel from '../components/ReviewsCarousel';
import RelatedProducts from '../components/RelatedProducts';
import { products } from '../data/products';
import { useCurrency } from '../hooks/useCurrency';
import { trackProductView, trackInitiateCheckout } from '../utils/analytics';

// ─── Payment method SVGs ─────────────────────────────────────────────────────
function PaymentIcons() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {/* Visa */}
      <div className="border border-gray-200 rounded px-2 py-1 bg-white h-8 flex items-center" title="Visa">
        <svg viewBox="0 0 48 16" className="h-4 w-auto" aria-label="Visa">
          <text x="0" y="13" fontFamily="Arial" fontWeight="bold" fontSize="14" fill="#1A1F71">VISA</text>
        </svg>
      </div>
      {/* Mastercard */}
      <div className="border border-gray-200 rounded px-1.5 py-1 bg-white h-8 flex items-center" title="Mastercard">
        <svg viewBox="0 0 38 24" className="h-5 w-auto">
          <circle cx="15" cy="12" r="10" fill="#EB001B" />
          <circle cx="23" cy="12" r="10" fill="#F79E1B" fillOpacity="0.85" />
        </svg>
      </div>
      {/* Orange Money */}
      <div className="border border-gray-200 rounded px-2 py-1 bg-white h-8 flex items-center" title="Orange Money">
        <svg viewBox="0 0 60 20" className="h-4 w-auto">
          <circle cx="10" cy="10" r="9" fill="#FF6600" />
          <text x="24" y="14" fontFamily="Arial" fontWeight="bold" fontSize="9" fill="#FF6600">Money</text>
        </svg>
      </div>
      {/* MTN Mobile Money */}
      <div className="border border-gray-200 rounded px-2 py-1 bg-white h-8 flex items-center" title="MTN MoMo">
        <svg viewBox="0 0 48 20" className="h-4 w-auto">
          <rect width="48" height="20" rx="3" fill="#FFCC00" />
          <text x="6" y="14" fontFamily="Arial" fontWeight="bold" fontSize="9" fill="#000">MTN MoMo</text>
        </svg>
      </div>
      {/* Wave */}
      <div className="border border-gray-200 rounded px-2 py-1 bg-white h-8 flex items-center" title="Wave">
        <svg viewBox="0 0 48 20" className="h-4 w-auto">
          <rect width="48" height="20" rx="3" fill="#1DC1EB" />
          <text x="8" y="14" fontFamily="Arial" fontWeight="bold" fontSize="11" fill="#fff">Wave</text>
        </svg>
      </div>
      {/* Moov Money */}
      <div className="border border-gray-200 rounded px-2 py-1 bg-white h-8 flex items-center" title="Moov Money">
        <svg viewBox="0 0 52 20" className="h-4 w-auto">
          <rect width="52" height="20" rx="3" fill="#0055A5" />
          <text x="4" y="14" fontFamily="Arial" fontWeight="bold" fontSize="9" fill="#fff">Moov Money</text>
        </svg>
      </div>
    </div>
  );
}

// ─── Formatted description ───────────────────────────────────────────────────
function FormattedDescription({ text, features }) {
  const lines = text.split('\n');
  return (
    <div className="space-y-4 text-gray-700 text-[15px] leading-relaxed">
      {features && features.length > 0 && (
        <div className="bg-gray-50 rounded-card p-5 border border-gray-100">
          <p className="font-bold text-primary mb-3 flex items-center gap-2">
            <CheckCircle2 size={17} className="text-green-600" />
            Ce que vous obtenez
          </p>
          <ul className="space-y-2">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm">
                <CheckCircle2 size={15} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {lines.map((line, i) => {
        if (!line.trim()) return null;
        if (line.startsWith('**') || (line.endsWith(':') && line.length < 60)) {
          return (
            <h3 key={i} className="font-bold text-primary text-base mt-5 first:mt-0">
              {line.replace(/\*\*/g, '')}
            </h3>
          );
        }
        if (line.startsWith('- ')) {
          return (
            <li key={i} className="flex items-start gap-2 text-sm ml-2 list-none">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
              <span>{line.slice(2)}</span>
            </li>
          );
        }
        return <p key={i}>{line}</p>;
      })}
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.slug === slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showSticky, setShowSticky] = useState(false);
  const { convertPrice } = useCurrency();
  const buyZoneRef = useRef(null);

  useEffect(() => {
    if (product) {
      trackProductView(product);
      setSelectedImage(0);
      window.scrollTo(0, 0);
    }
  }, [product]);

  useEffect(() => {
    const handleScroll = () => {
      if (buyZoneRef.current) {
        const rect = buyZoneRef.current.getBoundingClientRect();
        setShowSticky(rect.bottom < 0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-4">Produit introuvable</h1>
          <p className="text-gray-500 mb-6">Ce produit n'existe pas ou a été retiré.</p>
          <Link to="/" className="bg-primary text-white px-6 py-3 rounded-btn font-semibold hover:bg-gray-800 transition">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  const displayPrice = convertPrice(product.price);
  const displayOldPrice = convertPrice(product.oldPrice);
  const discountPct = Math.round((1 - product.price / product.oldPrice) * 100);

  const handleBuy = () => {
    trackInitiateCheckout(product);
    const target = product.checkoutLink || product.externalLink;
    if (target) {
      window.open(target, '_blank', 'noopener,noreferrer');
    } else {
      alert(`Redirection vers le paiement pour : ${product.name}`);
    }
  };

  const prevImage = () => setSelectedImage((i) => Math.max(0, i - 1));
  const nextImage = () => setSelectedImage((i) => Math.min(product.images.length - 1, i + 1));

  return (
    <div className="min-h-screen bg-white pb-24 md:pb-0">
      {/* Reviews auto-scroll carousel — constrained to max-w-7xl with edge fade */}
      <ReviewsCarousel reviews={product.reviews} />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-primary text-sm transition"
        >
          <ArrowLeft size={16} />
          Retour
        </button>
      </div>

      {/* ── Main product section ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* ── Left: Image gallery ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Main image */}
            <div className="relative rounded-card overflow-hidden bg-gray-100 mb-3 aspect-square">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={product.images[selectedImage]}
                  alt={product.name}
                  loading={selectedImage === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  fetchpriority={selectedImage === 0 ? 'high' : 'auto'}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onError={(e) => { e.currentTarget.style.opacity = '0.2'; }}
                />
              </AnimatePresence>
              {product.images.length > 1 && (
                <>
                  <button onClick={prevImage} disabled={selectedImage === 0}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow disabled:opacity-30 transition">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={nextImage} disabled={selectedImage === product.images.length - 1}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow disabled:opacity-30 transition">
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>

            {/* Sub-thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)}
                    className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded overflow-hidden border-2 transition ${
                      selectedImage === i ? 'border-primary' : 'border-gray-200 hover:border-gray-400'
                    }`}>
                    <img src={img} alt={`Vue ${i + 1}`}
                      loading="lazy" decoding="async"
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.style.background = '#f0f0f0'; }} />
                  </button>
                ))}
              </div>
            )}

            {/* Trust badges */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { icon: Shield, label: 'Achat sécurisé' },
                { icon: Download, label: 'Accès immédiat' },
                { icon: Clock, label: 'Accès à vie' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1 text-center border border-gray-100 rounded-card p-3">
                  <Icon size={20} className="text-gray-500" />
                  <span className="text-xs text-gray-500">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Info & buy zone ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4"
            id="acheter"
            ref={buyZoneRef}
          >
            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Users size={14} />
                <strong className="text-primary">{product.reviewCount}</strong> avis
              </span>
              <span className="flex items-center gap-1">
                <Download size={14} />
                <strong className="text-primary">{product.sold}+</strong> achats
              </span>
              <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs capitalize">
                {product.category === 'app' ? 'Application' : product.category === 'excel' ? 'Fichier' : product.category}
              </span>
            </div>

            <h1 className="text-xl md:text-2xl font-extrabold text-primary leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-3">
              <StarRating rating={product.rating} size={18} />
              <span className="text-sm text-gray-500">{product.reviewCount} avis vérifiés</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-gray-400 line-through text-base">{displayOldPrice}</span>
              <span className="text-primary font-extrabold text-4xl">{displayPrice}</span>
              <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-0.5 rounded-full">
                -{discountPct}%
              </span>
            </div>

            {/* Countdown (timer only — no progress bar) */}
            {product.countdown && (
              <CountdownTimer
                showProgress={false}
                storageKey={`countdown_${product.slug}`}
              />
            )}

            {/* Short desc */}
            <p className="text-gray-600 text-sm leading-relaxed border-l-4 border-gray-200 pl-3">
              {product.shortDesc}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col gap-3 pt-1">
              {product.externalLink && (
                <a
                  href={product.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border-2 border-primary text-primary rounded-btn py-3.5 font-bold hover:bg-primary hover:text-white transition-all text-base"
                >
                  <ExternalLink size={18} />
                  Voir la description complète du produit
                </a>
              )}
              <button
                onClick={handleBuy}
                className="flex items-center justify-center gap-2 bg-primary hover:bg-gray-800 text-white rounded-btn py-4 font-bold text-lg shadow-lg hover:scale-[1.02] transition-all"
              >
                {product.externalLink ? <ExternalLink size={20} /> : <ShoppingCart size={20} />}
                Télécharger maintenant
              </button>
            </div>

            {/* Payment methods — centered relative to button */}
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs text-gray-500">Moyens de paiement disponibles</p>
              <PaymentIcons />
            </div>
          </motion.div>
        </div>

        {/* Video section — centered relative to full block */}
        {product.videoUrl && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14"
          >
            <h2 className="text-xl font-bold text-primary mb-4 text-center">Vidéo de présentation</h2>
            <div className="rounded-card overflow-hidden aspect-video bg-black mx-auto max-w-3xl shadow-lg">
              <iframe
                src={product.videoUrl}
                title={`Vidéo — ${product.name}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </motion.div>
        )}

        {/* Description — centered relative to upper block */}
        <motion.div
          id="description"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 mx-auto max-w-3xl"
        >
          <h2 className="text-2xl font-extrabold text-primary mb-6 text-center">
            Description du produit
          </h2>
          <FormattedDescription text={product.fullDesc} features={product.features} />
        </motion.div>
      </div>

      {/* ── Related products ── */}
      <RelatedProducts currentSlug={product.slug} />

      {/* ── Sticky bottom bar ── */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl"
          >
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3 md:gap-4">
              <div className="w-12 h-12 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.opacity = '0.2'; }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-primary font-semibold text-xs md:text-sm truncate leading-tight">{product.name}</p>
                <div className="flex items-center gap-2 md:gap-3 mt-0.5">
                  <StarRating rating={product.rating} size={11} />
                  <span className="text-gray-400 line-through text-[10px] md:text-xs">{displayOldPrice}</span>
                  <span className="text-primary font-extrabold text-xs md:text-sm">{displayPrice}</span>
                </div>
              </div>
              <button
                onClick={handleBuy}
                className="flex-shrink-0 flex items-center gap-1.5 bg-primary hover:bg-gray-800 text-white rounded-btn px-3 md:px-5 py-2.5 font-bold text-xs md:text-sm transition"
              >
                {product.externalLink ? <ExternalLink size={14} /> : <ShoppingCart size={14} />}
                <span className="hidden sm:inline">Télécharger</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
