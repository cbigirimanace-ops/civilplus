import { MessageCircle } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { trackEvent } from '../utils/analytics';

const WHATSAPP_URL = 'https://api.whatsapp.com/send/?phone=237650000749';

export default function WhatsAppButton({ context = 'product', message }) {
  const { t } = useI18n();

  const handleClick = () => {
    trackEvent('whatsapp_click', { context });
  };

  const href = message
    ? `${WHATSAPP_URL}&text=${encodeURIComponent(message)}`
    : WHATSAPP_URL;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebc59] text-white rounded-btn px-6 py-3 text-sm md:text-base font-semibold transition-all shadow-md hover:shadow-lg hover:scale-[1.01]"
    >
      <MessageCircle size={18} className="fill-current" />
      {t('product.talkOnWhatsApp')}
    </a>
  );
}
