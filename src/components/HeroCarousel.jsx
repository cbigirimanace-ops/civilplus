import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    heading: 'Découvrez',
    subheading: 'Des outils faciles d\'utilisation pour débutants, experts du génie civil et particuliers.',
    text: 'Plus de 60 fichiers de dimensionnement, des applications de gestion de projet et des formations spécialisées pour booster votre productivité.',
    image: '/images/hero-bg.jpg',
    gradient: 'linear-gradient(135deg,rgba(10,10,10,0.72) 0%,rgba(20,20,40,0.65) 100%)',
    cta: 'Nos produits',
    ctaLink: '/#produits',
  },
  {
    id: 2,
    heading: 'Découvrez',
    subheading: 'Manager Toolkit — Gérez vos projets BTP comme un vrai professionnel.',
    text: "L'application de référence pour le suivi de chantier, l'étude de prix et la gestion financière de vos projets de construction.",
    image: '/images/hero-bg.jpg',
    gradient: 'linear-gradient(135deg,rgba(5,30,10,0.75) 0%,rgba(10,60,20,0.68) 100%)',
    cta: 'Nos produits',
    ctaLink: '/#produits',
  },
  {
    id: 3,
    heading: 'Découvrez',
    subheading: 'Formations Excel & Civil 3D pour ingénieurs spécialistes.',
    text: 'Maîtrisez Excel à un niveau expert et développez vos propres outils de calcul adaptés à vos projets de génie civil.',
    image: '/images/hero-bg.jpg',
    gradient: 'linear-gradient(135deg,rgba(20,5,50,0.76) 0%,rgba(50,10,100,0.68) 100%)',
    cta: 'Nos produits',
    ctaLink: '/#produits',
  },
];

const variants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 0 }),
};

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

  return (
    <div className="relative w-full h-[520px] md:h-[620px] overflow-hidden">
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
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slides[current].image}')` }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0" style={{ background: slides[current].gradient }} />

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-white/70 font-semibold text-base mb-2 tracking-widest uppercase"
            >
              {slides[current].heading}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight"
            >
              {slides[current].subheading}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-gray-300 text-base md:text-lg mb-8 max-w-2xl mx-auto"
            >
              {slides[current].text}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45 }}
            >
              <a
                href={slides[current].ctaLink}
                className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-btn transition-all duration-300 hover:scale-105 shadow-lg hover:bg-gray-100"
              >
                {slides[current].cta}
                <ChevronRight size={18} />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/15 hover:bg-white/30 text-white rounded-full p-3 transition-all backdrop-blur-sm"
        aria-label="Précédent"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/15 hover:bg-white/30 text-white rounded-full p-3 transition-all backdrop-blur-sm"
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
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? 'bg-white w-8' : 'bg-white/40 w-2.5 hover:bg-white/70'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
