import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Award, Users, Lightbulb, Globe } from 'lucide-react';
import { trackPageView } from '../utils/analytics';

const values = [
  {
    icon: Target,
    title: 'Notre mission',
    text: 'Démocratiser l\'accès aux outils d\'ingénierie professionnels en Afrique en proposant des solutions digitales de haute qualité à des prix abordables, adaptées aux réalités du terrain africain.',
  },
  {
    icon: Eye,
    title: 'Notre vision',
    text: 'Devenir la référence des outils numériques pour les ingénieurs civils d\'Afrique francophone, et contribuer à l\'élévation des standards de qualité dans le secteur de la construction.',
  },
  {
    icon: Lightbulb,
    title: 'Notre approche',
    text: 'Chaque produit Civil+ est développé par des ingénieurs praticiens, testé sur de vrais chantiers, et constamment amélioré grâce aux retours de notre communauté d\'utilisateurs.',
  },
];

const team = [
  {
    name: 'Équipe Technique',
    role: 'Ingénieurs Civils & Développeurs',
    description: 'Notre équipe pluridisciplinaire réunit des ingénieurs civils expérimentés et des développeurs passionnés, tous engagés dans la création d\'outils qui font réellement la différence sur le terrain.',
    image: 'https://placehold.co/200x200/1a1a2e/4CAF50?text=Team',
  },
];

const stats = [
  { icon: Users, value: '+200', label: 'ingénieurs actifs' },
  { icon: Globe, value: '+15', label: 'pays représentés' },
  { icon: Award, value: '+60', label: 'outils développés' },
];

export default function About() {
  useEffect(() => {
    trackPageView('À propos', '/a-propos');
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* Hero */}
      <div
        className="relative py-24 flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #111111 0%, #1a3a1a 100%)' }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.04) 40px, rgba(255,255,255,0.04) 41px)',
          }}
        />
        <div className="relative z-10 text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent font-semibold tracking-widest uppercase text-sm mb-3"
          >
            Notre histoire
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
          >
            À propos de Civil+
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-xl mx-auto text-base leading-relaxed"
          >
            Civil+ est né de la frustration de professionnels du génie civil face au manque d'outils adaptés aux réalités africaines. Nous avons décidé de créer les outils que nous aurions aimé avoir.
          </motion.p>
        </div>
      </div>

      {/* Stats */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-6 text-center">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Icon size={28} className="text-accent mx-auto mb-2" />
                  <p className="text-3xl font-extrabold text-primary">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-primary mb-6">Notre histoire</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Civil+ a été fondé par une équipe d'ingénieurs civils passionnés, basée au Cameroun et actifs dans toute l'Afrique francophone. Après des années passées sur des chantiers et dans des bureaux d'études, nous avons constaté un manque criant d'outils numériques adaptés aux réalités du terrain africain.
              </p>
              <p>
                Les logiciels disponibles sur le marché étaient soit trop chers, soit non adaptés aux normes et pratiques locales, soit nécessitant une connexion internet permanente impossible à avoir sur tous les chantiers. Nous avons alors décidé de développer nos propres outils : des fichiers Excel robustes, des applications légères et des formations pratiques.
              </p>
              <p>
                Depuis notre lancement, plus de 200 ingénieurs civils à travers 15 pays font confiance à nos outils au quotidien. Cette communauté grandissante est notre plus grande fierté et notre principale source d'inspiration pour continuer à développer de nouveaux produits toujours plus utiles et performants.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-light">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-2xl font-bold text-primary mb-10"
          >
            Nos valeurs
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="bg-white rounded-card p-6 shadow-sm hover:shadow-md transition"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <Icon size={24} className="text-accent" />
                  </div>
                  <h3 className="font-bold text-primary mb-2">{v.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{v.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-primary mb-10"
          >
            Notre équipe
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-light rounded-card p-8 flex flex-col md:flex-row items-center gap-6"
          >
            <img
              src={team[0].image}
              alt={team[0].name}
              className="w-28 h-28 rounded-full object-cover border-4 border-accent/30"
            />
            <div className="text-left">
              <h3 className="text-xl font-bold text-primary">{team[0].name}</h3>
              <p className="text-accent font-medium text-sm mb-3">{team[0].role}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{team[0].description}</p>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
