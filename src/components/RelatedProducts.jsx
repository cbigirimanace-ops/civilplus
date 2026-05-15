import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, ExternalLink } from 'lucide-react';
import { ThumbsUp } from 'lucide-react';
import { products as allProducts } from '../data/products';
import { useCurrency } from '../hooks/useCurrency';
import { trackInitiateCheckout } from '../utils/analytics';

const FALLBACK_GRADIENTS = [
  'linear-gradient(135deg,#1a1a2e 0%,#16213e 100%)',
  'linear-gradient(135deg,#0d3b66 0%,#1b6ca8 100%)',
  'linear-gradient(135deg,#1a3a1a 0%,#2d6a2d 100%)',
  'linear-gradient(135deg,#3d0c02 0%,#8b2500 100%)',
  'linear-gradient(135deg,#1a0533 0%,#4a0080 100%)',
  'linear-gradient(135deg,#0f2027 0%,#2c5364 100%)',
  'linear-gradient(135deg,#232526 0%,#414345 100%)',
  'linear-gradient(135deg,#24243e 0%,#302b63 100%)',
];

export default function RelatedProducts({ currentSlug, limit = 4 }) {
  const { convertPrice } = useCurrency();
  const related = allProducts.filter((p) => p.slug !== currentSlug).slice(0, limit);

  if (related.length === 0) return null;

  return (
    <section className="bg-white py-14 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-xl md:text-2xl font-extrabold text-primary mb-8">
          Autres produits qui pourraient vous intéresser
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {related.map((product) => {
            const fallback = FALLBACK_GRADIENTS[(product.id - 1) % FALLBACK_GRADIENTS.length];
            const discountPct = Math.round((1 - product.price / product.oldPrice) * 100);
            const handleBuy = () => {
              trackInitiateCheckout(product);
              const target = product.checkoutLink || product.externalLink;
              if (target) {
                window.open(target, '_blank', 'noopener,noreferrer');
              } else {
                window.location.href = `/produits/${product.slug}#acheter`;
              }
            };

            return (
              <motion.div
                key={product.id}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="bg-white rounded-card shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                {/* Thumbnail — clickable, badge top-right */}
                <Link
                  to={`/produits/${product.slug}`}
                  className="relative w-full aspect-square overflow-hidden block"
                  style={{ background: fallback }}
                >
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <span className="absolute top-3 right-3 bg-black text-white text-[11px] font-bold px-2 py-0.5 rounded">
                    {discountPct}% OFF
                  </span>
                </Link>

                {/* Body */}
                <div className="flex flex-col p-4 flex-1">
                  <Link
                    to={`/produits/${product.slug}`}
                    className="text-sm font-bold text-primary leading-snug line-clamp-2 mb-3 hover:underline"
                  >
                    {product.name}
                  </Link>

                  {/* "100% (N Avis)" */}
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                    <ThumbsUp size={13} className="text-gray-400" />
                    <span>100% ({product.reviewCount} Avis)</span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-4 mt-auto">
                    <span className="text-gray-400 line-through text-xs">
                      {convertPrice(product.oldPrice)}
                    </span>
                    <span className="text-primary font-extrabold text-base">
                      {convertPrice(product.price)}
                    </span>
                  </div>

                  <button
                    onClick={handleBuy}
                    className="flex items-center justify-center gap-1.5 bg-primary hover:bg-gray-800 text-white rounded-btn py-2.5 text-xs md:text-sm font-semibold transition-all"
                  >
                    {product.externalLink || product.checkoutLink ? (
                      <ExternalLink size={14} />
                    ) : (
                      <ShoppingCart size={14} />
                    )}
                    Acheter maintenant
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
