import { Globe } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { trackEvent } from '../utils/analytics';

export default function LanguageSwitch({ variant = 'pill' }) {
  const { lang, setLang, supported, t } = useI18n();

  const onSelect = (code) => {
    if (code === lang) return;
    setLang(code);
    trackEvent('language_change', { from: lang, to: code });
  };

  if (variant === 'select') {
    return (
      <select
        value={lang}
        onChange={(e) => onSelect(e.target.value)}
        className="bg-white text-gray-700 rounded px-3 py-1.5 text-sm border border-gray-200 cursor-pointer"
      >
        {supported.map((code) => (
          <option key={code} value={code}>{t(`language.${code}`)}</option>
        ))}
      </select>
    );
  }

  // pill variant — for navbar / footer
  return (
    <div className="inline-flex items-center gap-1 text-xs">
      <Globe size={14} className="text-gray-400 mr-1" />
      {supported.map((code) => (
        <button
          key={code}
          onClick={() => onSelect(code)}
          className={`px-2 py-1 rounded font-semibold transition ${
            lang === code
              ? 'bg-white text-primary'
              : 'text-gray-400 hover:text-white'
          }`}
          aria-label={t(`language.${code}`)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
