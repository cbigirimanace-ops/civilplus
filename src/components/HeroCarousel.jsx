import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    heading: 'Découvrez',
    subheading: 'Les meilleurs outils Excel pour ingénieurs civils',
    text: 'Plus de 60 fichiers de dimensionnement, des applications de gestion de projet et des formations spécialisées pour booster votre productivité.',
    gradient: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    cta: 'Nos produits',
    ctaLink: '/#produits',
  },
  {
    id: 2,
    heading: 'Découvrez',
    subheading: 'Manager Toolkit — Gérez vos projets comme un pro',
    text: "L'application de référence pour le suivi de chantier, l'étude de prix et la gestion financière de vos projets de construction.",
    gradient: 'linear-gradient(135deg, #1a3a1a 0%, #2d6a2d 50%, #1a1a1a 100%)',
    cta: 'Nos produits',
    ctaLink: '/#produits',
  },
  {
    id: 3,
    heading: 'Découvrez',
    subheading: 'Formations Excel pour ingénieurs spécialistes',
    text: 'Maîtrisez Excel à un niveau expert et développez vos propres outils de calcul adaptés à vos projets de génie civil.',
    gradient: 'linear-gradient(135deg, #1a0533 0%, #4a0080 50%, #1a0533 100%)',
    cta: 'Nos produits',
    ctaLink: '/#produits',
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((index, dir) => {
    setDirection(dir);
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, -1);
  }, [current, goTo]);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 0 }),
  };

  return (
    <div className="relative w-full h-[560px] md:h-[640px] overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={slides[current].id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: slides[current].gradient }}
        >
          {/* Overlay pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.05) 40px, rgba(255,255,255,0.05) 41px)',
            }}
          />

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-accent font-semibold text-lg mb-2 tracking-widest uppercase"
            >
              {slides[current].heading}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight"
            >
              {slides[current].subheading}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-300 text-base md:text-lg mb-8 max-w-2xl mx-auto"
            >
              {slides[current].text}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <a
                href={slides[current].ctaLink}
                className="inline-block bg-accent hover:bg-accent-dark text-white font-bold px-8 py-4 rounded-btn transition-all duration-300 hover:scale-105 shadow-lg"
              >
                {slides[current].cta}
              </a>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/25 text-white rounded-full p-3 transition-all backdrop-blur-sm"
        aria-label="Précédent"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/25 text-white rounded-full p-3 transition-all backdrop-blur-sm"
        aria-label="Suivant"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === current ? 'bg-accent w-8' : 'bg-white/50 hover:bg-white'
            }`}
            aria-label={`Aller au slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
