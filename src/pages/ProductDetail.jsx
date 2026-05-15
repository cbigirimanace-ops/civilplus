import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, ExternalLink, ChevronLeft, ChevronRight,
  ArrowLeft, CheckCircle2, Download, Users,
} from 'lucide-react';
import StarRating from '../components/StarRating';
import CountdownTimer from '../components/CountdownTimer';
import ReviewsCarousel from '../components/ReviewsCarousel';
import RelatedProducts from '../components/RelatedProducts';
import ProductBanner from '../components/ProductBanner';
import ProductFAQ from '../components/ProductFAQ';
import TrustBadges from '../components/TrustBadges';
import WhatsAppButton from '../components/WhatsAppButton';
import SeoMeta from '../components/SeoMeta';
import { products } from '../data/products';
import { useCurrency } from '../hooks/useCurrency';
import { useI18n } from '../i18n/I18nContext';
import { trackProductView, trackInitiateCheckout } from '../utils/analytics';

// ─── Payment method icons (real logos on white background) ──────────────────
function PaymentIcons() {
  const card = "border border-gray-200 rounded-md bg-white h-9 px-2 flex items-center justify-center";
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {/* Visa */}
      <div className={card} title="Visa">
        <svg viewBox="0 0 48 16" className="h-4 w-auto" aria-label="Visa">
          <text x="0" y="13" fontFamily="Arial" fontWeight="900" fontSize="14" fill="#1A1F71">VISA</text>
        </svg>
      </div>
      {/* Mastercard */}
      <div className={card} title="Mastercard">
        <svg viewBox="0 0 38 24" className="h-5 w-auto">
          <circle cx="15" cy="12" r="10" fill="#EB001B" />
          <circle cx="23" cy="12" r="10" fill="#F79E1B" fillOpacity="0.85" />
        </svg>
      </div>
      {/* Orange Money — real logo */}
      <div className={card} title="Orange Money">
        <img src="/images/payment/orange.png" alt="Orange Money" className="h-6 w-auto object-contain" loading="lazy" />
      </div>
      {/* MTN Mobile Money — real logo */}
      <div className={card} title="MTN Mobile Money">
        <img src="/images/payment/mtn.jpg" alt="MTN MoMo" className="h-6 w-auto object-contain" loading="lazy" />
      </div>
      {/* Wave */}
      <div className={card} title="Wave">
        <svg viewBox="0 0 60 24" className="h-5 w-auto">
          <rect width="60" height="24" rx="4" fill="#1DC1EB" />
          <text x="11" y="17" fontFamily="Arial" fontWeight="bold" fontSize="13" fill="#fff">Wave</text>
        </svg>
      </div>
      {/* Moov Money — fixed truncation (wider viewBox, smaller font) */}
      <div className={card} title="Moov Money">
        <svg viewBox="0 0 70 24" className="h-5 w-auto">
          <rect width="70" height="24" rx="4" fill="#0055A5" />
          <text x="6" y="17" fontFamily="Arial" fontWeight="bold" fontSize="11" fill="#fff">Moov Money</text>
        </svg>
      </div>
    </div>
  );
}

// ─── Formatted description ───────────────────────────────────────────────────
function FormattedDescription({ text, features, t }) {
  const lines = text.split('\n');
  return (
    <div className="space-y-4 text-gray-700 text-[15px] leading-relaxed">
      {features && features.length > 0 && (
        <div className="bg-gray-50 rounded-card p-5 border border-gray-100">
          <p className="font-bold text-primary mb-3 flex items-center gap-2">
            <CheckCircle2 size={17} className="text-green-600" />
            {t('product.whatYouGet')}
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

// ─── Main ────────────────────────────────────────────────────────────────────
export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const base = products.find((p) => p.slug === slug);
  const { localizeProduct, t, lang } = useI18n();
  const product = localizeProduct(base);
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
  }, [product?.id]);

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
          <h1 className="text-3xl font-bold text-primary mb-4">{t('product.notFound')}</h1>
          <p className="text-gray-500 mb-6">{t('product.notFoundText')}</p>
          <Link to="/" className="bg-primary text-white px-6 py-3 rounded-btn font-semibold hover:bg-gray-800 transition">
            {t('product.backHome')}
          </Link>
        </div>
      </div>
    );
  }

  const displayPrice = convertPrice(product.price);
  const displayOldPrice = convertPrice(product.oldPrice);
  const discountPct = Math.round((1 - product.price / product.oldPrice) * 100);

  // JSON-LD Product schema for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDesc,
    image: typeof window !== 'undefined' ? `${window.location.origin}${product.thumbnail}` : product.thumbnail,
    sku: `civilplus-${product.id}`,
    brand: { '@type': 'Brand', name: 'Civil+' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      '@type': 'Offer',
      url: typeof window !== 'undefined' ? window.location.href : '',
      priceCurrency: 'XOF',
      price: product.price,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  };

  const handleBuy = () => {
    trackInitiateCheckout(product);
    const target = product.checkoutLink || product.externalLink;
    if (target) {
      window.open(target, '_blank', 'noopener,noreferrer');
    }
  };

  const prevImage = () => setSelectedImage((i) => Math.max(0, i - 1));
  const nextImage = () => setSelectedImage((i) => Math.min(product.images.length - 1, i + 1));

  return (
    <div className="min-h-screen bg-white pb-24 md:pb-0">
      <SeoMeta
        title={`${product.name} — Civil+`}
        description={product.shortDesc}
        image={typeof window !== 'undefined' ? `${window.location.origin}${product.thumbnail}` : product.thumbnail}
        url={typeof window !== 'undefined' ? window.location.href : undefined}
        type="product"
        jsonLd={jsonLd}
      />

      <ReviewsCarousel reviews={product.reviews} />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-primary text-sm transition"
        >
          <ArrowLeft size={16} />
          {t('product.back')}
        </button>
      </div>

      {/* ── Main product section ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">

          {/* ── Left: Image gallery ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Main image — blurred bg + contained foreground (preserves aspect) */}
            <div className="relative rounded-card overflow-hidden bg-gray-100 mb-3 aspect-square">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  {/* Blurred fill background */}
                  <img
                    src={product.images[selectedImage]}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-60"
                  />
                  {/* Foreground image — keeps aspect ratio */}
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    loading={selectedImage === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchpriority={selectedImage === 0 ? 'high' : 'auto'}
                    className="relative w-full h-full object-contain"
                    onError={(e) => { e.currentTarget.style.opacity = '0.2'; }}
                  />
                </motion.div>
              </AnimatePresence>
              {product.images.length > 1 && (
                <>
                  <button onClick={prevImage} disabled={selectedImage === 0}
                    aria-label="Image précédente"
                    className="absolute z-10 left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow disabled:opacity-30 transition">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={nextImage} disabled={selectedImage === product.images.length - 1}
                    aria-label="Image suivante"
                    className="absolute z-10 right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow disabled:opacity-30 transition">
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
                    aria-label={`Vue ${i + 1}`}
                    className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded overflow-hidden border-2 transition ${
                      selectedImage === i ? 'border-primary' : 'border-gray-200 hover:border-gray-400'
                    }`}>
                    <img src={img} alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover scale-110 blur-md opacity-50" />
                    <img src={img} alt=""
                      loading="lazy" decoding="async"
                      className="relative w-full h-full object-contain"
                      onError={(e) => { e.currentTarget.style.background = '#f0f0f0'; }} />
                  </button>
                ))}
              </div>
            )}

            {/* Trust badges — compact under gallery */}
            <div className="mt-5">
              <TrustBadges variant="compact" />
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
                <strong className="text-primary">{product.reviewCount}</strong> {t('product.reviews')}
              </span>
              <span className="flex items-center gap-1">
                <Download size={14} />
                <strong className="text-primary">{product.sold}+</strong> {t('product.purchases')}
              </span>
              <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs capitalize">
                {product.category === 'app' ? (lang === 'en' ? 'Application' : 'Application')
                  : product.category === 'excel' ? 'Excel/Word'
                  : product.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-xl md:text-2xl font-extrabold text-primary leading-tight">
              {product.name}
            </h1>

            {/* Banner — below title, above stars */}
            {product.banner && (
              <ProductBanner slug={product.slug} alt={product.name} />
            )}

            {/* Stars */}
            <div className="flex items-center gap-3">
              <StarRating rating={product.rating} size={18} />
              <span className="text-sm text-gray-500">
                {product.reviewCount} {t('product.verifiedReviews')}
              </span>
            </div>

            {/* Price block — mobile: discount badge ABOVE price */}
            <div className="flex flex-col gap-2">
              <div className="md:hidden">
                <span className="inline-block bg-red-100 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full">
                  -{discountPct}% {t('product.discount')}
                </span>
              </div>
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-gray-400 line-through text-sm">{displayOldPrice}</span>
                <span className="text-primary font-extrabold text-2xl md:text-3xl">{displayPrice}</span>
                <span className="hidden md:inline-block bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">
                  -{discountPct}% {t('product.discount')}
                </span>
              </div>
            </div>

            {/* Countdown */}
            {product.countdown && (
              <CountdownTimer
                showProgress={false}
                storageKey={`countdown_${product.slug}`}
                hours={72}
              />
            )}

            {/* ── Generous spacing between countdown and short desc ── */}
            <div className="h-2 md:h-4" />

            {/* Short desc */}
            <p className="text-gray-600 text-sm leading-relaxed border-l-4 border-gray-200 pl-3">
              {product.shortDesc}
            </p>

            {/* CTA buttons — smaller height + font */}
            <div className="flex flex-col gap-2.5 pt-1">
              {product.externalLink && (
                <a
                  href={product.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border-2 border-primary text-primary rounded-btn py-2.5 font-bold hover:bg-primary hover:text-white transition-all text-sm"
                >
                  <ExternalLink size={16} />
                  {t('product.viewFull')}
                </a>
              )}
              <button
                onClick={handleBuy}
                className="flex items-center justify-center gap-2 bg-primary hover:bg-gray-800 text-white rounded-btn py-3 font-bold text-base shadow-lg hover:scale-[1.02] transition-all"
              >
                {product.externalLink || product.checkoutLink ? <ExternalLink size={18} /> : <ShoppingCart size={18} />}
                {t('product.buy')}
              </button>
            </div>

            {/* Payment methods — centered relative to button */}
            <div className="flex flex-col items-center gap-2 pt-1">
              <p className="text-xs text-gray-500">{t('product.paymentMethods')}</p>
              <PaymentIcons />
            </div>
          </motion.div>
        </div>

        {/* Video — centered */}
        {product.videoUrl && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14"
          >
            <h2 className="text-xl font-bold text-primary mb-4 text-center">{t('product.videoTitle')}</h2>
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

        {/* Description — centered */}
        <motion.div
          id="description"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 mx-auto max-w-3xl"
        >
          <h2 className="text-2xl font-extrabold text-primary mb-6 text-center">
            {t('product.descriptionTitle')}
          </h2>
          <FormattedDescription text={product.fullDesc} features={product.features} t={t} />

          {/* WhatsApp CTA below detailed description */}
          <div className="flex justify-center mt-10">
            <WhatsAppButton context={`product:${product.slug}`} message={`Bonjour, je suis intéressé(e) par : ${product.name}`} />
          </div>
        </motion.div>

        {/* FAQ */}
        <ProductFAQ faq={product.faq} />

        {/* Trust badges (full version) */}
        <section className="mt-14 max-w-5xl mx-auto">
          <TrustBadges />
        </section>
      </div>

      {/* Related products */}
      <RelatedProducts currentSlug={product.slug} />

      {/* Sticky bottom bar */}
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
                  loading="lazy"
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
                {product.externalLink || product.checkoutLink ? <ExternalLink size={14} /> : <ShoppingCart size={14} />}
                <span className="hidden sm:inline">{t('product.buyShort')}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
