import { Shield, RefreshCcw, Headphones, Zap } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

export default function TrustBadges({ variant = 'grid' }) {
  const { t } = useI18n();

  const items = [
    { icon: Shield, title: t('trust.secureCheckout'), desc: t('trust.secureDesc') },
    { icon: RefreshCcw, title: t('trust.refund'), desc: t('trust.refundDesc') },
    { icon: Headphones, title: t('trust.support'), desc: t('trust.supportDesc') },
    { icon: Zap, title: t('trust.delivery'), desc: t('trust.deliveryDesc') },
  ];

  if (variant === 'compact') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {items.map(({ icon: Icon, title }) => (
          <div key={title} className="flex flex-col items-center gap-1 text-center bg-gray-50 rounded-card p-3">
            <Icon size={18} className="text-primary" />
            <span className="text-[10px] md:text-xs text-gray-600 font-medium leading-tight">{title}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
      {items.map(({ icon: Icon, title, desc }) => (
        <div
          key={title}
          className="flex flex-col items-center text-center bg-white border border-gray-100 rounded-card p-4 hover:border-gray-300 transition"
        >
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
            <Icon size={20} className="text-primary" />
          </div>
          <p className="text-sm font-bold text-primary mb-1">{title}</p>
          <p className="text-xs text-gray-500 leading-snug">{desc}</p>
        </div>
      ))}
    </div>
  );
}
