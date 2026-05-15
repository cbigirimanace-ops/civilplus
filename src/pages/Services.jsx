import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Phone, ArrowRight, Building2, Wrench } from 'lucide-react';
import Footer from '../components/Footer';
import { trackPageView } from '../utils/analytics';

const services = [
  {
    id: 1,
    title: 'Projet de Bâtiment',
    description:
      'Conception et dimensionnement complet de structures en béton armé, charpente bois et métal. De l\'avant-projet sommaire à l\'exécution, nous accompagnons vos projets de bâtiments résidentiels, commerciaux et industriels avec rigueur et expertise.',
    icon: Building2,
    dotColor: 'bg-primary',
    image: 'https://placehold.co/600x400/1a1a2e/4CAF50?text=Projet+Batiment',
  },
  {
    id: 2,
    title: 'Construction Métallique',
    description:
      'Études et réalisation de structures métalliques pour halls industriels, passerelles, ponts et équipements spéciaux. Notre expertise en charpente métallique couvre la conception selon EC3, la fabrication et le suivi de montage.',
    icon: Wrench,
    dotColor: 'bg-gray-400',
    image: 'https://placehold.co/600x400/2d3748/4CAF50?text=Construction+Metallique',
  },
];

const galleryImages = [
  { src: 'https://placehold.co/800x500/1a3a1a/4CAF50?text=Chantier+1', alt: 'Chantier de construction 1' },
  { src: 'https://placehold.co/800x500/0f2027/4CAF50?text=Chantier+2', alt: 'Chantier de construction 2' },
  { src: 'https://placehold.co/800x500/2c5282/ffffff?text=Chantier+3', alt: 'Chantier de construction 3' },
  { src: 'https://placehold.co/800x500/4a0080/ffffff?text=Chantier+4', alt: 'Chantier de construction 4' },
];

export default function Services() {
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    trackPageView('Nos Services', '/nos-services');
    window.scrollTo(0, 0);
  }, []);

  const prevGallery = () => setGalleryIndex((i) => Math.max(0, i - 1));
  const nextGallery = () => setGalleryIndex((i) => Math.min(galleryImages.length - 1, i + 1));

  return (
    <div>
      {/* Hero Banner */}
      <div
        className="relative h-80 md:h-[440px] flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.04) 40px, rgba(255,255,255,0.04) 41px)',
          }}
        />
        <div className="relative z-10 text-center text-white px-6 max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-accent font-semibold text-lg mb-2 tracking-widest uppercase"
          >
            Découvrez
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-extrabold mb-4"
          >
            Nos Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 text-base md:text-lg mb-8"
          >
            Des prestations d'ingénierie civile sur mesure pour tous vos projets de construction.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            href="#services-list"
            className="inline-block bg-accent hover:bg-accent-dark text-white font-bold px-8 py-3 rounded-btn transition-all hover:scale-105"
          >
            Nos services
          </motion.a>
        </div>
      </div>

      {/* Service Cards */}
      <section id="services-list" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="group rounded-card overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-gray-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${service.dotColor} ring-2 ring-white`} />
                      <span className="text-white text-xs font-medium">Actif</span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Icon size={20} className="text-accent" />
                      </div>
                      <h3 className="text-lg font-bold text-primary">{service.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                    <button className="mt-4 flex items-center gap-2 text-accent font-semibold text-sm hover:gap-3 transition-all">
                      En savoir plus <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Image Gallery Carousel */}
      <section className="py-14 bg-primary">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-2xl font-bold text-white mb-8"
          >
            Nos réalisations
          </motion.h2>
          <div className="relative rounded-card overflow-hidden">
            <motion.img
              key={galleryIndex}
              src={galleryImages[galleryIndex].src}
              alt={galleryImages[galleryIndex].alt}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full aspect-video object-cover"
            />
            <button
              onClick={prevGallery}
              disabled={galleryIndex === 0}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 disabled:opacity-30 transition backdrop-blur-sm"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={nextGallery}
              disabled={galleryIndex === galleryImages.length - 1}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 disabled:opacity-30 transition backdrop-blur-sm"
            >
              <ChevronRight size={22} />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {galleryImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setGalleryIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === galleryIndex ? 'bg-accent w-8' : 'bg-white/50 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 px-10 py-14 flex flex-col justify-center"
            >
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
                Obtenez un devis personnalisé
              </h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Décrivez votre projet et notre équipe d'ingénieurs vous contactera dans les 24h avec une proposition sur mesure adaptée à vos besoins et à votre budget.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-7 py-3 rounded-btn transition-all hover:scale-105 self-start"
              >
                <Phone size={18} />
                Nous contacter
              </a>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 bg-accent/10 px-10 py-14 flex flex-col items-center justify-center border-l border-white/10"
            >
              <div className="text-center">
                <p className="text-6xl font-extrabold text-white mb-2">+50</p>
                <p className="text-accent text-lg font-semibold mb-2">clients satisfaits</p>
                <p className="text-gray-400 text-sm max-w-xs">
                  Des entreprises et bureaux d'études à travers l'Afrique nous font confiance pour leurs projets d'ingénierie civile.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
