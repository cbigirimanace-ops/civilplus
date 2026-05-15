import { useEffect, useRef, useState } from 'react';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import StarRating from './StarRating';
import { useI18n } from '../i18n/I18nContext';

/**
 * Auto-scrolling reviews carousel.
 * Constrained to max-w-7xl (matches the product block below)
 * with edge fade-out via CSS mask.
 */
export default function ReviewsCarousel({ reviews = [] }) {
  const { t } = useI18n();
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const posRef = useRef(0);
  const [paused, setPaused] = useState(false);

  // Duplicate so the loop is seamless
  const items = [...reviews, ...reviews, ...reviews];

  useEffect(() => {
    if (!trackRef.current || reviews.length === 0) return;
    const speed = 0.4;

    const tick = () => {
      if (!paused && trackRef.current) {
        posRef.current -= speed;
        const third = trackRef.current.scrollWidth / 3;
        if (Math.abs(posRef.current) >= third) {
          posRef.current = 0;
        }
        trackRef.current.style.transform = `translateX(${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [reviews, paused]);

  if (!reviews || reviews.length === 0) return null;

  return (
    <div className="bg-gray-50 border-b border-gray-100 py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-sm md:text-base font-bold text-primary mb-4 uppercase tracking-wide">
          {t('product.customerReviews')}
        </h2>

        {/* Constrained track with edge fade mask */}
        <div
          className="overflow-hidden"
          style={{
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0, black 5%, black 95%, transparent 100%)',
            maskImage:
              'linear-gradient(to right, transparent 0, black 5%, black 95%, transparent 100%)',
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            ref={trackRef}
            className="flex gap-3 w-max will-change-transform"
            style={{ transform: 'translateX(0px)' }}
          >
            {items.map((review, i) => (
              <motion.div
                key={`${review.id}-${i}`}
                className="bg-white rounded-card shadow-sm px-4 py-3 flex flex-col gap-1.5 w-64 flex-shrink-0 border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Quote size={14} className="text-gray-300" />
                    <span className="font-bold text-primary text-xs">{review.author}</span>
                  </div>
                  <StarRating rating={review.rating} size={11} />
                </div>
                <p className="text-gray-600 text-xs leading-relaxed italic line-clamp-2">
                  "{review.text}"
                </p>
                <p className="text-[10px] text-gray-400">{review.country}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
