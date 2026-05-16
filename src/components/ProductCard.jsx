import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye, ExternalLink } from 'lucide-react';
import StarRating from './StarRating';
import { useCurrency } from '../hooks/useCurrency';
import { useI18n } from '../i18n/I18nContext';
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

export default function ProductCard({ product, eager = false, dense = false }) {
  const { convertPrice } = useCurrency();
  const { t } = useI18n();

  const displayPrice = convertPrice(product.price);
  const displayOldPrice = convertPrice(product.oldPrice);
  const discountPct = Math.round((1 - product.price / product.oldPrice) * 100);
  const fallback = FALLBACK_GRADIENTS[(product.id - 1) % FALLBACK_GRADIENTS.length];

  const handleBuy = (e) => {
    e.preventDefault();
    e.stopPropagation();
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
      whileHover={{ scale: 1.025, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="bg-white rounded-card shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
    >
      {/* Thumbnail */}
      <div
        className="relative w-full aspect-[4/3] overflow-hidden"
        style={{ background: fallback }}
      >
        <img
          src={product.thumbnail}
          alt={product.name}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          fetchpriority={eager ? 'high' : 'auto'}
          className="w-full h-full object-cover"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        {/* Discount badge */}
        <span className="absolute top-3 left-3 bg-black text-white text-xs font-bold px-2.5 py-1 rounded-full">
          -{discountPct}%
        </span>
      </div>

      {/* Body — extra spacing between description and buttons */}
      <div className={`flex flex-col flex-1 ${dense ? 'p-3' : 'p-4'}`}>
        <h3 className={`font-bold text-primary leading-snug line-clamp-2 ${
          dense ? 'text-[11px] mb-2' : 'text-sm mb-3'
        }`}>
          {product.name}
        </h3>

        <div className={`flex items-center gap-1.5 ${dense ? 'mb-2' : 'mb-3'}`}>
          <StarRating rating={product.rating} size={dense ? 11 : 14} />
          <span className={`text-gray-400 ${dense ? 'text-[10px]' : 'text-xs'}`}>({product.reviewCount})</span>
        </div>

        {/* Prices — locked on one line via whitespace-nowrap */}
        <div className={`flex items-baseline gap-1.5 whitespace-nowrap mt-auto ${dense ? 'mb-3' : 'mb-5'}`}>
          <span className={`text-gray-400 line-through ${dense ? 'text-[9px]' : 'text-xs'}`}>{displayOldPrice}</span>
          <span className={`text-primary font-extrabold ${dense ? 'text-sm' : 'text-lg'}`}>{displayPrice}</span>
        </div>

        {/* Buttons */}
        <div className={`flex gap-1.5 pt-2 border-t border-gray-100 ${dense ? '' : 'gap-2'}`}>
          <Link
            to={`/produits/${product.slug}`}
            className={`flex-1 flex items-center justify-center gap-1 border border-gray-300 text-primary rounded-btn font-semibold hover:border-primary hover:bg-gray-50 transition-all mt-2 ${
              dense ? 'py-1.5 text-[10px]' : 'py-2 text-xs'
            }`}
          >
            <Eye size={dense ? 11 : 14} />
            {dense ? 'Voir' : t('product.viewProduct')}
          </Link>
          <button
            onClick={handleBuy}
            className={`flex-1 flex items-center justify-center gap-1 bg-primary text-white rounded-btn font-semibold hover:bg-gray-800 transition-all mt-2 ${
              dense ? 'py-1.5 text-[10px]' : 'py-2 text-xs'
            }`}
          >
            {product.externalLink || product.checkoutLink ? <ExternalLink size={dense ? 11 : 14} /> : <ShoppingCart size={dense ? 11 : 14} />}
            {t('product.buyShort')}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
