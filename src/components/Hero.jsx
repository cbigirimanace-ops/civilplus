import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Star, ShieldCheck, Users, Pause } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

// ─── Slide data ──────────────────────────────────────────────────────────────
function buildSlides(lang) {
  const en = lang === 'en';
  return [
    {
      id: 'manager',
      titleLines: en
        ? ['Tools for', 'engineers who', 'make a difference.']
        : ['Des outils', 'pour ingénieurs', 'qui font la différence.'],
      subtitle: en
        ? 'Over 60 Excel files, construction apps and training built by and for African civil engineers.'
        : "Plus de 60 fichiers Excel, applications BTP et formations conçus par et pour les ingénieurs civils d'Afrique.",
      kind: 'mockup',
      // image set
      avif: '/images/mockup-manager.avif',
      webp: '/images/mockup-manager.webp',
      png: '/images/mockup-manager.png',
      alt: en ? 'Manager Toolkit — preview on PC and mobile' : 'Manager Toolkit — aperçu PC et mobile',
      chipTitle: en ? 'Manager Toolkit — lifetime' : 'Manager Toolkit — à vie',
      productSlug: 'manager-toolkit',
      badge: { discount: '-73%', priceNew: '40 000 FCFA', priceOld: '150 000 FCFA' },
      tagBottom: en ? 'Lifetime plan' : 'Forfait à vie',
    },
    {
      id: 'pack-ba',
      titleLines: en
        ? ['60+ Excel files', 'for fast structural', 'calculations.']
        : ['+60 fichiers Excel', 'pour vos calculs', 'de structure.'],
      subtitle: en
        ? 'Reinforced concrete sizing made simple: beams, columns, slabs, footings. Calculation notes ready for technical control.'
        : "Dimensionnement béton armé clé en main : poutres, poteaux, dalles, fondations. Notes de calcul prêtes pour le contrôle technique.",
      kind: 'logo',
      logo: '/images/logo-excel.svg',
      alt: en ? "Engineering Pack — Excel files" : "Pack Bureaux d'Études — fichiers Excel",
      chipTitle: en ? "Engineering Pack — 60+ Excel files" : "Pack Bureaux d'Études — +60 fichiers Excel",
      productSlug: 'pack-bureaux-etudes',
      badge: { discount: '-77%', priceNew: '3 500 FCFA', priceOld: '15 000 FCFA' },
      tagBottom: en ? '60+ Excel files' : '+60 fichiers Excel',
      logoTint: '#1F7244',
    },
    {
      id: 'gantt',
      titleLines: en
        ? ['Plan smarter', 'with our Excel', 'Gantt template.']
        : ['Simplifiez', 'votre planification', 'avec notre modèle.'],
      subtitle: en
        ? 'Automated Excel Gantt: dependencies, critical path, S-curves and late-task alerts — no MS Project needed.'
        : "Template Excel Gantt 100% automatisé : dépendances, chemin critique, courbes S et alertes de retard.",
      kind: 'logo',
      logo: '/images/logo-excel.svg',
      alt: en ? 'Gantt planning Excel template' : 'Template Excel de planification Gantt',
      chipTitle: en ? 'Gantt Template — Excel' : 'Template Gantt — Excel',
      productSlug: 'template-gantt',
      badge: { discount: '-50%', priceNew: '2 000 FCFA', priceOld: '4 000 FCFA' },
      tagBottom: en ? 'Excel template' : 'Modèle Excel',
      logoTint: '#1F7244',
    },
    {
      id: 'qualite',
      titleLines: en
        ? ['Standardize', 'your quality', 'control.']
        : ['Standardisez', 'vos contrôles', 'qualité.'],
      subtitle: en
        ? '30+ ready-to-use Word & Excel quality control sheets for any site. ISO 9001 compliant.'
        : "+30 fiches Word et Excel de contrôle qualité prêtes à l'emploi pour vos chantiers. Conformes ISO 9001.",
      kind: 'logo',
      logo: '/images/logo-word.svg',
      alt: en ? 'Quality Control Pack — Word documents' : 'Pack Contrôle Qualité — documents Word',
      chipTitle: en ? 'Quality Control Pack — Word' : 'Pack Contrôle Qualité — Word',
      productSlug: 'pack-controle-qualite',
      badge: { discount: '-50%', priceNew: '3 500 FCFA', priceOld: '7 000 FCFA' },
      tagBottom: en ? '30+ Word/Excel sheets' : '+30 fiches Word/Excel',
      logoTint: '#185ABD',
    },
    {
      id: 'finance',
      titleLines: en
        ? ['Master', 'your project', 'budgets.']
        : ['Maîtrisez', 'vos budgets', 'de projet.'],
      subtitle: en
        ? "Smart Excel copilot: disbursement tracking, variance vs. actual, forecasts and overrun alerts."
        : "Copilote Excel intelligent : suivi des décaissements, écarts vs. réel, prévisions et alertes de dépassement.",
      kind: 'logo',
      logo: '/images/logo-excel.svg',
      alt: en ? 'Financial Copilot — Excel' : 'Copilote de Gestion Financière — Excel',
      chipTitle: en ? 'Financial Copilot — Excel' : 'Copilote Finance — Excel',
      productSlug: 'copilote-gestion-financiere',
      badge: { discount: '-50%', priceNew: '1 500 FCFA', priceOld: '3 000 FCFA' },
      tagBottom: en ? 'Excel dashboard' : 'Tableau de bord Excel',
      logoTint: '#1F7244',
    },
  ];
}

// ─── Mockup visual (uses <picture> for AVIF/WebP/PNG) ────────────────────────
function MockupVisual({ slide }) {
  if (slide.kind === 'logo') {
    return (
      // Aspect locked to the mockup's natural ratio (~16:10) on mobile so all slides
      // occupy the same vertical space, then natural on md+.
      <div className="relative w-full aspect-[16/10] md:aspect-square flex items-center justify-center">
        <div
          className="absolute inset-4 md:inset-8 rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${slide.logoTint || '#fff'}33 0%, transparent 55%)`,
            filter: 'blur(40px)',
          }}
        />
        <img
          src={slide.logo}
          alt={slide.alt}
          className="relative w-32 sm:w-40 md:w-64 lg:w-72 h-auto drop-shadow-2xl"
          loading="eager"
          decoding="async"
        />
      </div>
    );
  }
  // 'mockup' (Manager Toolkit) — wrap in same aspect on mobile, natural on md+
  return (
    <div className="relative w-full aspect-[16/10] md:aspect-auto flex items-center justify-center">
      <picture>
        <source srcSet={slide.avif} type="image/avif" />
        <source srcSet={slide.webp} type="image/webp" />
        <img
          src={slide.png}
          alt={slide.alt}
          loading="eager"
          fetchpriority="high"
          decoding="async"
          className="w-full h-full md:h-auto object-contain"
          style={{ filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.5))' }}
        />
      </picture>
    </div>
  );
}

// ─── Main Hero ───────────────────────────────────────────────────────────────
const ROTATION_MS = 6000;

export default function Hero() {
  const { t, lang } = useI18n();
  const slides = buildSlides(lang);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [warmedUp, setWarmedUp] = useState(false);
  const containerRef = useRef(null);
  const [mouseTilt, setMouseTilt] = useState({ x: -2, y: 0 });

  const slide = slides[index];

  // Warm up all hero images upfront so every slide displays at the same
  // pace (no first-visit delay on the AVIF mockup).
  useEffect(() => {
    const sources = [
      '/images/mockup-manager.avif',
      '/images/mockup-manager.webp',
      '/images/mockup-manager.png',
      '/images/logo-excel.svg',
      '/images/logo-word.svg',
    ];
    let loaded = 0;
    sources.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded += 1;
        if (loaded >= sources.length) setWarmedUp(true);
      };
      img.src = src;
    });
    // Safety: never block the carousel for more than 800ms even if a fetch hangs
    const safety = setTimeout(() => setWarmedUp(true), 800);
    return () => clearTimeout(safety);
  }, []);

  // Auto-rotation (only starts once images are warm so the first cycle
  // isn't disproportionately long for the heavier mockup slide)
  useEffect(() => {
    if (paused || !warmedUp) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), ROTATION_MS);
    return () => clearInterval(id);
  }, [paused, warmedUp, slides.length]);

  // Scroll parallax
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const visualOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  // Mouse parallax (desktop only)
  useEffect(() => {
    const onMove = (e) => {
      if (window.innerWidth < 768) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 4 - 2;
      const y = (e.clientY / window.innerHeight - 0.5) * -2;
      setMouseTilt({ x, y });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-primary text-white"
      aria-label="Civil+ hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Background layers ── */}
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(168,85,247,0.08) 40%, transparent 70%)', filter: 'blur(40px)' }}
      />
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, rgba(34,197,94,0.05) 40%, transparent 70%)', filter: 'blur(50px)' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='nf'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23nf)'/%3E%3C/svg%3E")` }}
      />

      {/* ── Content ── */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">

          {/* ── Left text column ── */}
          <div className="md:col-span-7 lg:col-span-6 flex flex-col gap-5 md:gap-7">
            {/* Chip — rotates with slide */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`chip-${slide.id}`}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4 }}
              >
                <Link
                  to={`/produits/${slide.productSlug}`}
                  className="inline-flex items-center gap-2 bg-white/8 hover:bg-white/15 backdrop-blur-sm border border-white/15 rounded-full px-3 py-1.5 text-xs md:text-sm transition-all group w-fit"
                >
                  <span className="flex items-center gap-1 bg-white text-primary font-bold px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wide">
                    <Sparkles size={11} />
                    {lang === 'en' ? 'Featured' : 'À la une'}
                  </span>
                  <span className="text-gray-200">{slide.chipTitle}</span>
                  <ArrowRight size={13} className="text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Title — animated per slide */}
            <h1 className="font-display font-black tracking-tight leading-[0.95] text-4xl sm:text-5xl md:text-6xl lg:text-7xl min-h-[3.5em]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`title-${slide.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="block"
                >
                  {slide.titleLines.map((line, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className="block"
                    >
                      {line}
                    </motion.span>
                  ))}
                </motion.span>
              </AnimatePresence>
            </h1>

            {/* Subtitle */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${slide.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-gray-300 text-base md:text-lg leading-relaxed max-w-xl"
              >
                {slide.subtitle}
              </motion.p>
            </AnimatePresence>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mt-1">
              <a
                href="#produits"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('produits')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group inline-flex items-center justify-center gap-2 bg-white text-primary font-bold px-6 md:px-7 py-3 md:py-3.5 rounded-btn text-sm md:text-base hover:bg-gray-100 transition-all hover:scale-[1.02] shadow-xl shadow-white/10"
              >
                {lang === 'en' ? 'Browse products' : 'Découvrir nos produits'}
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                to={`/produits/${slide.productSlug}`}
                className="inline-flex items-center justify-center gap-2 border border-white/25 bg-white/5 hover:bg-white/10 text-white font-semibold px-6 md:px-7 py-3 md:py-3.5 rounded-btn text-sm md:text-base transition-all"
              >
                <Play size={15} className="fill-current" />
                {lang === 'en' ? 'See the product' : 'Voir le produit'}
              </Link>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-xs md:text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </span>
                <span className="text-gray-200 font-semibold">{lang === 'en' ? '4.9/5' : '4,9/5'}</span>
              </span>
              <span className="hidden sm:inline text-gray-600">·</span>
              <span className="flex items-center gap-1.5">
                <Users size={13} className="text-gray-400" />
                {lang === 'en' ? '+200 engineers equipped' : '+200 ingénieurs équipés'}
              </span>
              <span className="hidden sm:inline text-gray-600">·</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-gray-400" />
                {lang === 'en' ? 'Compliant with standards' : 'Conformes aux normes'}
              </span>
            </div>

            {/* Slide indicators */}
            <div className="flex items-center gap-2 mt-2">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? 'w-8 bg-white' : 'w-2 bg-white/25 hover:bg-white/50'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
              <button
                onClick={() => setPaused((p) => !p)}
                className="ml-2 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 transition"
                aria-label={paused ? 'Play' : 'Pause'}
              >
                {paused ? <Play size={10} className="fill-current" /> : <Pause size={10} className="fill-current" />}
              </button>
            </div>
          </div>

          {/* ── Right visual column ── */}
          <motion.div
            style={{ y: visualY, opacity: visualOpacity }}
            className="md:col-span-5 lg:col-span-6 relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`visual-${slide.id}`}
                initial={{ opacity: 0, scale: 0.92, rotateY: -8 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.96, rotateY: 6 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  transform: `perspective(1200px) rotateY(${mouseTilt.x}deg) rotateX(${mouseTilt.y}deg)`,
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.4s ease-out',
                }}
                className="relative"
              >
                <MockupVisual slide={slide} />

                {/* Discount badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotate: 15 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.3, type: 'spring', stiffness: 200 }}
                  className="absolute top-2 right-2 md:top-4 md:right-2 bg-red-500 text-white font-black px-3 py-2 rounded-2xl shadow-2xl shadow-red-500/30"
                  style={{ transform: 'rotate(-8deg)' }}
                >
                  <p className="text-[10px] uppercase tracking-wider leading-none mb-0.5 opacity-90">Promo</p>
                  <p className="text-lg md:text-xl leading-none">{slide.badge.discount} OFF</p>
                </motion.div>

                {/* Floating mini-card — price */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
                  className="absolute -bottom-3 -left-3 md:bottom-6 md:-left-4 bg-white/95 backdrop-blur-md rounded-xl shadow-xl px-3 py-2 flex items-center gap-2 max-w-[200px]"
                >
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck size={16} className="text-green-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-gray-500 leading-tight uppercase tracking-wide truncate">
                      {slide.tagBottom}
                    </p>
                    <p className="text-xs font-bold text-primary leading-tight whitespace-nowrap">
                      <span className="text-gray-400 line-through text-[10px] mr-1 font-normal">
                        {slide.badge.priceOld}
                      </span>
                      {slide.badge.priceNew}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
