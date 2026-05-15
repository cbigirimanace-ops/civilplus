import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ExternalLink, ChevronLeft, ChevronRight, Eye, ArrowLeft } from 'lucide-react';
import StarRating from '../components/StarRating';
import CountdownTimer from '../components/CountdownTimer';
import ReviewsCarousel from '../components/ReviewsCarousel';
import { products } from '../data/products';
import { useCurrency } from '../hooks/useCurrency';
import { trackProductView, trackInitiateCheckout } from '../utils/analytics';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.slug === slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showSticky, setShowSticky] = useState(false);
  const { convertPrice } = useCurrency();
  const mainRef = useRef(null);

  useEffect(() => {
    if (product) {
      trackProductView(product);
      window.scrollTo(0, 0);
    }
  }, [product]);

  useEffect(() => {
    const handleScroll = () => {
      if (mainRef.current) {
        const rect = mainRef.current.getBoundingClientRect();
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
          <Link
            to="/"
            className="bg-accent text-white px-6 py-3 rounded-btn font-semibold hover:bg-accent-dark transition"
          >
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
    if (product.externalLink) {
      window.open(product.externalLink, '_blank', 'noopener,noreferrer');
    } else {
      // In a real app, redirect to payment page
      alert(`Redirection vers le paiement pour : ${product.name}`);
    }
  };

  const prevImage = () => setSelectedImage((i) => Math.max(0, i - 1));
  const nextImage = () => setSelectedImage((i) => Math.min(product.images.length - 1, i + 1));

  return (
    <div className="min-h-screen bg-white">
      {/* Reviews Carousel */}
      <ReviewsCarousel />

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

      {/* Main product section */}
      <div ref={mainRef} className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left: Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Main image */}
            <div className="relative rounded-card overflow-hidden bg-gray-100 mb-3 aspect-video">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                />
              </AnimatePresence>
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    disabled={selectedImage === 0}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow disabled:opacity-30 transition"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={nextImage}
                    disabled={selectedImage === product.images.length - 1}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow disabled:opacity-30 transition"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`flex-shrink-0 w-20 h-14 rounded overflow-hidden border-2 transition ${
                      selectedImage === i ? 'border-accent' : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img src={img} alt={`Vue ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4"
            id="acheter"
          >
            {/* Category + discount */}
            <div className="flex items-center gap-2">
              <span className="bg-primary text-white text-xs px-3 py-1 rounded-full capitalize font-medium">
                {product.category}
              </span>
              <span className="bg-accent text-white text-xs px-3 py-1 rounded-full font-bold">
                -{discountPct}%
              </span>
            </div>

            {/* Name */}
            <h1 className="text-xl md:text-2xl font-extrabold text-primary leading-tight">
              {product.name}
            </h1>

            {/* Stars + review count */}
            <div className="flex items-center gap-3">
              <StarRating rating={product.rating} size={18} />
              <span className="text-sm text-gray-500">{product.reviewCount} avis</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-gray-400 line-through text-base">{displayOldPrice}</span>
              <span className="text-accent font-extrabold text-3xl">{displayPrice}</span>
            </div>

            {/* Countdown */}
            {product.countdown && (
              <div className="bg-gray-50 border border-gray-200 rounded-card p-4">
                <CountdownTimer />
              </div>
            )}

            {/* Short desc */}
            <p className="text-gray-600 text-sm leading-relaxed">{product.shortDesc}</p>

            {/* Detail link */}
            <a
              href="#description"
              className="text-accent text-sm font-medium hover:underline inline-flex items-center gap-1"
            >
              <Eye size={15} />
              Voir le détail complet
            </a>

            {/* CTA buttons */}
            <div className="flex flex-col gap-3 pt-2">
              {product.externalLink && (
                <a
                  href={product.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border-2 border-primary text-primary rounded-btn py-3 font-bold hover:bg-primary hover:text-white transition-all"
                >
                  <ExternalLink size={18} />
                  Voir le produit
                </a>
              )}
              <button
                onClick={handleBuy}
                className="flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white rounded-btn py-3 font-bold text-lg shadow-lg hover:scale-[1.02] transition-all"
              >
                {product.externalLink ? <ExternalLink size={20} /> : <ShoppingCart size={20} />}
                Acheter maintenant
              </button>
            </div>
          </motion.div>
        </div>

        {/* Video section */}
        {product.videoUrl && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14"
          >
            <h2 className="text-xl font-bold text-primary mb-4">Vidéo de présentation</h2>
            <div className="rounded-card overflow-hidden aspect-video bg-black max-w-3xl">
              <iframe
                src={product.videoUrl}
                title={`Vidéo - ${product.name}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </motion.div>
        )}

        {/* Description */}
        <motion.div
          id="description"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 max-w-3xl"
        >
          <h2 className="text-xl font-bold text-primary mb-4">Description courte</h2>
          <p className="text-gray-700 leading-relaxed text-base mb-8">{product.shortDesc}</p>

          <h2 className="text-xl font-bold text-primary mb-4">Description détaillée</h2>
          <div className="prose prose-gray max-w-none">
            {product.fullDesc.split('\n\n').map((para, i) => (
              <p key={i} className="text-gray-700 leading-relaxed mb-4">
                {para}
              </p>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Sticky bottom bar */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl"
          >
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
              <img
                src={product.thumbnail}
                alt={product.name}
                className="w-12 h-12 rounded object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-primary font-semibold text-sm truncate">{product.name}</p>
                <div className="flex items-center gap-2">
                  <StarRating rating={product.rating} size={12} />
                  <span className="text-accent font-bold text-sm">{displayPrice}</span>
                </div>
              </div>
              <button
                onClick={handleBuy}
                className="flex-shrink-0 flex items-center gap-2 bg-accent hover:bg-accent-dark text-white rounded-btn px-5 py-2.5 font-bold text-sm transition"
              >
                <ShoppingCart size={16} />
                Acheter
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
