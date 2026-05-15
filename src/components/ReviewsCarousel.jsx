import { useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import StarRating from './StarRating';

export default function ReviewsCarousel({ reviews = [] }) {
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const posRef = useRef(0);

  // Duplicate array so the loop is seamless
  const items = [...reviews, ...reviews];

  useEffect(() => {
    if (!trackRef.current || reviews.length === 0) return;

    const speed = 0.5; // px per frame — lower = slower

    const animate = () => {
      posRef.current -= speed;
      const half = trackRef.current.scrollWidth / 2;
      if (Math.abs(posRef.current) >= half) {
        posRef.current = 0;
      }
      trackRef.current.style.transform = `translateX(${posRef.current}px)`;
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [reviews]);

  // Pause on hover
  const pause = () => cancelAnimationFrame(animRef.current);
  const resume = () => {
    const speed = 0.5;
    const animate = () => {
      posRef.current -= speed;
      const half = trackRef.current.scrollWidth / 2;
      if (Math.abs(posRef.current) >= half) posRef.current = 0;
      trackRef.current.style.transform = `translateX(${posRef.current}px)`;
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
  };

  if (!reviews || reviews.length === 0) return null;

  return (
    <div className="bg-gray-50 border-b border-gray-100 py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-5">
        <h2 className="text-lg font-bold text-primary">Ce que disent nos clients</h2>
      </div>
      <div
        className="overflow-hidden"
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        <div
          ref={trackRef}
          className="flex gap-4 w-max will-change-transform"
          style={{ transform: 'translateX(0px)' }}
        >
          {items.map((review, i) => (
            <motion.div
              key={`${review.id}-${i}`}
              className="bg-white rounded-card shadow-sm p-5 flex flex-col gap-3 w-72 flex-shrink-0 border border-gray-100"
            >
              <Quote size={22} className="text-gray-300" />
              <p className="text-gray-600 text-sm leading-relaxed italic flex-1">
                "{review.text}"
              </p>
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="font-bold text-primary text-sm">{review.author}</p>
                  <p className="text-xs text-gray-400">{review.country}</p>
                </div>
                <StarRating rating={review.rating} size={13} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
