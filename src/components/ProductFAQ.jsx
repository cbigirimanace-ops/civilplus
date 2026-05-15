import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../i18n/I18nContext';

export default function ProductFAQ({ faq = [] }) {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState(0);

  if (!faq || faq.length === 0) return null;

  return (
    <section className="mt-12 max-w-3xl mx-auto">
      <h2 className="text-2xl font-extrabold text-primary mb-6 text-center">
        {t('product.faqTitle')}
      </h2>
      <div className="space-y-2">
        {faq.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="border border-gray-200 rounded-card overflow-hidden bg-white"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50 transition"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-primary text-sm md:text-base flex-1">
                  {item.q}
                </span>
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                  {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
