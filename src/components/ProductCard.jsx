import { motion } from 'framer-motion';
import { Eye, ShoppingCart, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { trackInitiateCheckout } from '../utils/analytics';

export default function ProductCard({ product, convertPrice }) {
  const handleBuy = (e) => {
    e.preventDefault();
    trackInitiateCheckout(product);
    if (product.externalLink) {
      window.open(product.externalLink, '_blank', 'noopener,noreferrer');
    } else {
      // Redirect to detail page with buy intent
      window.location.href = `/produits/${product.slug}#acheter`;
    }
  };

  const displayPrice = convertPrice ? convertPrice(product.price) : `${product.price.toLocaleString('fr-FR')} ${product.currency}`;
  const displayOldPrice = convertPrice ? convertPrice(product.oldPrice) : `${product.oldPrice.toLocaleString('fr-FR')} ${product.currency}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-card shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Discount badge */}
      <div className="absolute top-3 left-3 z-10 bg-accent text-white text-xs font-bold px-2.5 py-1 rounded-full">
        -{Math.round((1 - product.price / product.oldPrice) * 100)}%
      </div>

      {/* Category badge */}
      <div className="absolute top-3 right-3 z-10 bg-primary/80 text-white text-xs font-medium px-2 py-0.5 rounded-full capitalize">
        {product.category}
      </div>

      {/* Image */}
      <Link to={`/produits/${product.slug}`} className="block overflow-hidden">
        <div className="relative h-52 overflow-hidden bg-gray-100">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <Link to={`/produits/${product.slug}`}>
          <h3 className="text-sm font-bold text-primary leading-tight mb-2 line-clamp-2 group-hover:text-accent transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-500 text-xs mb-3 line-clamp-2">{product.shortDesc}</p>

        {/* Stars */}
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} size={14} />
          <span className="text-xs text-gray-500">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <span className="text-gray-400 line-through text-xs mr-2">{displayOldPrice}</span>
          <span className="text-accent font-extrabold text-lg">{displayPrice}</span>
        </div>

        {/* Buttons — always visible on mobile, slide up on hover on desktop */}
        <div className="mt-auto flex flex-col gap-2 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300">
          <Link
            to={`/produits/${product.slug}`}
            className="flex items-center justify-center gap-2 border border-primary text-primary rounded-btn py-2 text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-200"
          >
            <Eye size={15} />
            Voir le produit
          </Link>
          <button
            onClick={handleBuy}
            className="flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white rounded-btn py-2 text-sm font-semibold transition-all duration-200"
          >
            {product.externalLink ? <ExternalLink size={15} /> : <ShoppingCart size={15} />}
            Acheter
          </button>
        </div>
      </div>
    </motion.div>
  );
}
