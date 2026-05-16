import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Star, ShieldCheck, Users } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

/**
 * Modern split-asymmetric hero — option 1.
 * Left: chip, 3-line bold title, subtitle, CTAs, trust strip.
 * Right: floating product mockup with tilt + shadow + discount badge.
 * Background: solid black + subtle mesh gradient + grain texture overlay.
 */
export default function Hero() {
  const { t } = useI18n();
  const containerRef = useRef(null);
  const [mouseTilt, setMouseTilt] = useState({ x: -2, y: 0 });

  // Scroll-based parallax on the mockup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const mockupOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  // Subtle mouse-parallax tilt on desktop
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
    >
      {/* ── Background layers ── */}
      {/* Mesh gradient blob (bottom-right) */}
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(168,85,247,0.08) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      {/* Second mesh blob (top-left) */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, rgba(34,197,94,0.05) 40%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      {/* Grain texture overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Content grid ── */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">

          {/* ── Left: Text column ── */}
          <div className="md:col-span-7 lg:col-span-6 flex flex-col gap-5 md:gap-7">

            {/* Chip "Nouveau" */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <Link
                to="/produits/manager-toolkit"
                className="inline-flex items-center gap-2 bg-white/8 hover:bg-white/15 backdrop-blur-sm border border-white/15 rounded-full px-3 py-1.5 text-xs md:text-sm transition-all group w-fit"
              >
                <span className="flex items-center gap-1 bg-white text-primary font-bold px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wide">
                  <Sparkles size={11} />
                  {t('hero.badgeNew')}
                </span>
                <span className="text-gray-200">{t('hero.badgeProduct')}</span>
                <ArrowRight size={13} className="text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </Link>
            </motion.div>

            {/* Title — 3 lines staggered */}
            <h1 className="font-display font-black tracking-tight leading-[0.95] text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              {[t('hero.titleLine1'), t('hero.titleLine2'), t('hero.titleLine3')].map((line, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="text-gray-300 text-base md:text-lg leading-relaxed max-w-xl"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex flex-col sm:flex-row gap-3 mt-1"
            >
              <a
                href="#produits"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('produits')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group inline-flex items-center justify-center gap-2 bg-white text-primary font-bold px-6 md:px-7 py-3 md:py-3.5 rounded-btn text-sm md:text-base hover:bg-gray-100 transition-all hover:scale-[1.02] shadow-xl shadow-white/10"
              >
                {t('hero.ctaPrimary')}
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                to="/produits/manager-toolkit"
                className="inline-flex items-center justify-center gap-2 border border-white/25 bg-white/5 hover:bg-white/10 text-white font-semibold px-6 md:px-7 py-3 md:py-3.5 rounded-btn text-sm md:text-base transition-all"
              >
                <Play size={15} className="fill-current" />
                {t('hero.ctaSecondary')}
              </Link>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-xs md:text-sm text-gray-400"
            >
              <span className="flex items-center gap-1.5">
                <span className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </span>
                <span className="text-gray-200 font-semibold">{t('hero.trustRating')}</span>
              </span>
              <span className="hidden sm:inline text-gray-600">·</span>
              <span className="flex items-center gap-1.5">
                <Users size={13} className="text-gray-400" />
                {t('hero.trustEngineers')}
              </span>
              <span className="hidden sm:inline text-gray-600">·</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-gray-400" />
                {t('hero.trustCompliant')}
              </span>
            </motion.div>
          </div>

          {/* ── Right: Mockup ── */}
          <motion.div
            style={{ y: mockupY, opacity: mockupOpacity }}
            className="md:col-span-5 lg:col-span-6 relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotateY: -8 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                transform: `perspective(1200px) rotateY(${mouseTilt.x}deg) rotateX(${mouseTilt.y}deg)`,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.4s ease-out',
              }}
              className="relative"
            >
              <img
                src="/images/mockup-manager.svg"
                alt={t('hero.mockupAlt')}
                loading="eager"
                fetchpriority="high"
                className="w-full h-auto drop-shadow-2xl"
                style={{ filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.5))' }}
              />

              {/* Discount badge — floating top-right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: 15 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.9, type: 'spring', stiffness: 200 }}
                className="absolute -top-3 -right-3 md:top-4 md:right-2 bg-red-500 text-white font-black px-3 py-2 rounded-2xl shadow-2xl shadow-red-500/30"
                style={{ transform: 'rotate(-8deg)' }}
              >
                <p className="text-[10px] uppercase tracking-wider leading-none mb-0.5 opacity-90">Promo</p>
                <p className="text-lg md:text-xl leading-none">-73% OFF</p>
              </motion.div>

              {/* Floating mini-card — bottom-left (extra signal) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1, ease: 'easeOut' }}
                className="absolute -bottom-3 -left-3 md:bottom-6 md:-left-4 bg-white/95 backdrop-blur-md rounded-xl shadow-xl px-3 py-2 flex items-center gap-2 max-w-[180px]"
              >
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck size={16} className="text-green-600" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 leading-tight uppercase tracking-wide">Forfait à vie</p>
                  <p className="text-xs font-bold text-primary leading-tight">40 000 FCFA</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade to white (transition into products section) */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white pointer-events-none" />
    </section>
  );
}
