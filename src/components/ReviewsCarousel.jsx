import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import StarRating from './StarRating';
import { reviews } from '../data/products';

export default function ReviewsCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

  const canPrev = startIndex > 0;
  const canNext = startIndex + visibleCount < reviews.length;

  const prev = () => { if (canPrev) setStartIndex(startIndex - 1); };
  const next = () => { if (canNext) setStartIndex(startIndex + 1); };

  const visible = reviews.slice(startIndex, startIndex + visibleCount);

  return (
    <div className="relative py-10 px-4 bg-gray-light">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-2xl font-bold text-primary mb-8">Ce que disent nos clients</h2>

        <div className="relative">
          {/* Nav buttons */}
          <button
            onClick={prev}
            disabled={!canPrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 disabled:opacity-30 hover:bg-gray-100 transition"
            aria-label="Précédent"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            disabled={!canNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 disabled:opacity-30 hover:bg-gray-100 transition"
            aria-label="Suivant"
          >
            <ChevronRight size={20} />
          </button>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-hidden px-6">
            <AnimatePresence mode="popLayout">
              {visible.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35 }}
                  className="bg-white rounded-card shadow-sm p-6 flex flex-col gap-3"
                >
                  <Quote size={28} className="text-accent opacity-60" />
                  <p className="text-gray-700 text-sm leading-relaxed italic">"{review.text}"</p>
                  <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-primary text-sm">{review.author}</p>
                      <p className="text-xs text-gray-500">{review.country}</p>
                    </div>
                    <StarRating rating={review.rating} size={14} />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setStartIndex(Math.min(i, reviews.length - visibleCount))}
              className={`w-2 h-2 rounded-full transition-all ${
                i >= startIndex && i < startIndex + visibleCount
                  ? 'bg-accent w-6'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Avis ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
