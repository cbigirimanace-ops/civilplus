import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Phone, ArrowRight, Building2, Wrench } from 'lucide-react';
import { trackPageView } from '../utils/analytics';

const services = [
  {
    id: 1,
    title: 'Construction Métallique',
    description:
      "Confiez l'étude technique complète de vos structures métalliques à notre équipe d'ingénieurs. Grâce à une modélisation rigoureuse et des calculs de résistance de pointe, nous garantissons la conformité, la robustesse et la pérennité de vos infrastructures, même face aux contraintes les plus exigeantes.",
    icon: Wrench,
    dotColor: 'bg-primary',
    image: '/images/construction-metallique.jpg',
  },
  {
    id: 2,
    title: 'Projet de Bâtiment',
    description:
      "De la conception à la livraison, nous déployons une méthodologie rigoureuse pour piloter chaque phase de votre projet : étude de faisabilité, conception architecturale et structurale, étude de prix et suivi de projet. En confiant vos travaux à nos experts, vous bénéficiez d'un ouvrage alliant confort, sécurité et parfaite conformité aux normes en vigueur.",
    icon: Building2,
    dotColor: 'bg-gray-400',
    image: '/images/projet-batiment.jpg',
  },
];

// Real project photos from "Images projets réalisée"
const galleryImages = Array.from({ length: 7 }, (_, i) => `/images/gallery/gallery-${i + 17}.jpg`);

export default function Services() {
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    trackPageView('Nos Services', '/nos-services');
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setGalleryIndex((i) => (i + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const prevGallery = () => setGalleryIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);
  const nextGallery = () => setGalleryIndex((i) => (i + 1) % galleryImages.length);

  return (
    <div>
      {/* ── Hero Banner ── */}
      <div className="relative h-80 md:h-[460px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-white">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white/70 uppercase tracking-widest text-sm font-semibold mb-2"
          >
            Nos expertises
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold mb-4"
          >
            Découvrez
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-base md:text-lg mb-8 max-w-xl"
          >
            Tous nos services de prestations de génie civil, du bâtiment à la construction
            métallique en passant par le suivi de projet.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <a
              href="#services-list"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-bold px-6 py-3 rounded-btn hover:bg-white hover:text-primary transition-all"
            >
              Nos services <ChevronRight size={18} />
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── Service cards ── */}
      <section id="services-list" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-6 space-y-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col md:flex-row gap-0 rounded-card overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div
                  className="w-full md:w-64 h-48 md:h-auto flex-shrink-0 bg-gray-200 bg-cover bg-center"
                  style={{ backgroundImage: `url('${service.image}')` }}
                />
                <div className="flex-1 p-6 flex flex-col justify-between bg-white">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                        <Icon size={20} className="text-primary" />
                      </div>
                      <h3 className="text-xl font-extrabold text-primary">{service.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <a
                      href="/contact"
                      className="text-sm font-semibold text-primary hover:underline flex items-center gap-1"
                    >
                      En savoir plus <ArrowRight size={14} />
                    </a>
                    <span className={`w-3 h-3 rounded-full ${service.dotColor}`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Gallery carousel — real project photos ── */}
      <section className="bg-primary py-14">
        <div className="relative max-w-5xl mx-auto px-12">
          <div className="overflow-hidden rounded-card aspect-video bg-gray-900">
            <AnimatePresence mode="wait">
              <motion.img
                key={galleryIndex}
                src={galleryImages[galleryIndex]}
                alt={`Projet réalisé ${galleryIndex + 1}`}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                onError={(e) => { e.currentTarget.style.opacity = '0.3'; }}
              />
            </AnimatePresence>
          </div>

          <button
            onClick={prevGallery}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/30 text-white rounded-full p-3 transition backdrop-blur-sm"
            aria-label="Précédent"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={nextGallery}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/30 text-white rounded-full p-3 transition backdrop-blur-sm"
            aria-label="Suivant"
          >
            <ChevronRight size={22} />
          </button>

          <div className="flex justify-center gap-2 mt-5">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setGalleryIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === galleryIndex ? 'bg-white w-6' : 'bg-white/30 w-1.5'
                }`}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA — increased top/bottom padding ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-xl my-4">
            <div className="flex-1 bg-primary p-10 md:p-12 flex flex-col justify-center">
              <h2 className="text-white text-3xl md:text-4xl font-extrabold leading-tight mb-5">
                Obtenez un devis<br />personnalisé
              </h2>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-5 py-2.5 rounded-btn hover:bg-white hover:text-primary transition w-fit text-sm"
              >
                Nous contacter <ArrowRight size={16} />
              </a>
            </div>
            <div className="flex-1 bg-white p-10 md:p-12 flex flex-col justify-center items-start md:border-l border-gray-100">
              <p className="text-5xl md:text-6xl font-extrabold text-primary mb-3">+50 clients</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Nous accompagnons des ingénieurs et entreprises à travers toute l'Afrique
                de l'Ouest et Centrale.
              </p>
              <div className="flex items-center gap-2 mt-5 text-gray-600 text-sm">
                <Phone size={16} />
                +237 650 000 749
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
