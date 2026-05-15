import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import Footer from '../components/Footer';
import { trackPageView, trackEvent } from '../utils/analytics';

const contactInfo = [
  {
    icon: Phone,
    label: 'Téléphone / WhatsApp',
    value: '+237 650 000 749',
    href: 'tel:+237650000749',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'ingenierie@civilplus.work',
    href: 'mailto:ingenierie@civilplus.work',
  },
  {
    icon: MapPin,
    label: 'Localisation',
    value: 'Cameroun & Afrique francophone',
    href: null,
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    trackPageView('Contact', '/contact');
    window.scrollTo(0, 0);
  }, []);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Votre nom est requis.';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      errs.email = 'Adresse email invalide.';
    if (!formData.message.trim() || formData.message.length < 10)
      errs.message = 'Le message doit contenir au moins 10 caractères.';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1200));
    setLoading(false);
    setSubmitted(true);
    trackEvent('ContactFormSubmit', { name: formData.name, subject: formData.subject });
  };

  return (
    <div>
      {/* Hero */}
      <div
        className="relative py-20 flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #111111 0%, #1e3a5f 100%)' }}
      >
        <div className="relative z-10 text-center px-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-accent font-semibold tracking-widest uppercase text-sm mb-3"
          >
            Parlons-en
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-3"
          >
            Contactez-nous
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-lg mx-auto"
          >
            Une question, un projet, un partenariat ? Notre équipe répond dans les 24h.
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-primary mb-6">Nos coordonnées</h2>
              <div className="space-y-5 mb-8">
                {contactInfo.map((info, i) => {
                  const Icon = info.icon;
                  return (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">
                          {info.label}
                        </p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-primary font-semibold hover:text-accent transition"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-primary font-semibold">{info.value}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Map placeholder */}
              <div className="rounded-card overflow-hidden bg-gray-100 h-52 flex items-center justify-center border border-gray-200">
                <div className="text-center text-gray-400">
                  <MapPin size={36} className="mx-auto mb-2 opacity-40" />
                  <p className="text-sm">Cameroun, Afrique francophone</p>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <CheckCircle size={64} className="text-accent mb-4" />
                  <h3 className="text-2xl font-bold text-primary mb-2">Message envoyé !</h3>
                  <p className="text-gray-500 mb-6">
                    Merci pour votre message. Notre équipe vous répondra dans les 24 heures.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                    className="bg-accent text-white px-6 py-2.5 rounded-btn font-semibold hover:bg-accent-dark transition"
                  >
                    Envoyer un autre message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <h2 className="text-2xl font-bold text-primary mb-6">Envoyez-nous un message</h2>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Nom complet <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jean Dupont"
                      className={`w-full px-4 py-3 border rounded-card text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition ${
                        errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'
                      }`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Adresse email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jean@exemple.com"
                      className={`w-full px-4 py-3 border rounded-card text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition ${
                        errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200'
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Sujet
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Demande d'information sur le Pack Bureaux d'Études"
                      className="w-full px-4 py-3 border border-gray-200 rounded-card text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Décrivez votre demande, votre projet ou votre question..."
                      className={`w-full px-4 py-3 border rounded-card text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition resize-none ${
                        errors.message ? 'border-red-400 bg-red-50' : 'border-gray-200'
                      }`}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold py-3.5 rounded-btn transition-all hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Envoyer le message
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
