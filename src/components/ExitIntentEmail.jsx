import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, CheckCircle } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { trackEvent } from '../utils/analytics';

const STORAGE_KEY = 'civilplus_exit_seen';
const COOLDOWN_DAYS = 7;

export default function ExitIntentEmail() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Cooldown: show at most once per N days
    try {
      const last = localStorage.getItem(STORAGE_KEY);
      if (last && Date.now() - Number(last) < COOLDOWN_DAYS * 24 * 60 * 60 * 1000) return;
    } catch {}

    const handler = (e) => {
      if (e.clientY <= 0 && !open) {
        setOpen(true);
        try { localStorage.setItem(STORAGE_KEY, String(Date.now())); } catch {}
        trackEvent('exit_intent_shown');
      }
    };

    // Wait a few seconds before arming, so it doesn't fire on page load
    const arm = setTimeout(() => {
      document.addEventListener('mouseout', handler);
    }, 5000);

    return () => {
      clearTimeout(arm);
      document.removeEventListener('mouseout', handler);
    };
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    trackEvent('exit_intent_email_submitted', { email });
    setDone(true);
    // In a real setup, POST to a CRM endpoint here.
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="bg-white rounded-card max-w-md w-full p-6 md:p-8 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
              aria-label="Fermer"
            >
              <X size={16} />
            </button>

            {done ? (
              <div className="text-center py-4">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
                <h3 className="text-xl font-extrabold text-primary mb-2">{t('exitIntent.successTitle')}</h3>
                <p className="text-gray-600 text-sm">{t('exitIntent.successText')}</p>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Mail size={22} className="text-primary" />
                </div>
                <h3 className="text-2xl font-extrabold text-primary mb-1">{t('exitIntent.title')}</h3>
                <p className="text-gray-600 text-sm mb-5">{t('exitIntent.subtitle')}</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('exitIntent.placeholder')}
                    className="w-full px-4 py-3 border border-gray-200 rounded-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <button
                    type="submit"
                    className="bg-primary hover:bg-gray-800 text-white font-bold py-3 rounded-btn transition-all hover:scale-[1.01]"
                  >
                    {t('exitIntent.submit')}
                  </button>
                </form>
                <p className="text-[11px] text-gray-400 mt-3 text-center">{t('exitIntent.privacy')}</p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
