import { Link } from 'react-router-dom';
import { Phone, Mail, Facebook, Instagram, MessageCircle } from 'lucide-react';
import LanguageSwitch from './LanguageSwitch';
import { useI18n } from '../i18n/I18nContext';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-primary text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-1 mb-4">
              <span className="text-white font-extrabold text-2xl">Civil</span>
              <span className="text-white font-extrabold text-2xl">+</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=237650000749"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#25D366] hover:bg-[#1ebc59] transition flex items-center justify-center"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} className="text-white fill-current" />
              </a>
            </div>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
              {t('footer.contacts')}
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-white shrink-0" />
                <a href="tel:+237650000749" className="hover:text-white transition">
                  +237 650 000 749
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-white shrink-0" />
                <a href="mailto:ingenierie@civilplus.work" className="hover:text-white transition">
                  ingenierie@civilplus.work
                </a>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
              {t('footer.links')}
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/a-propos" className="hover:text-white transition">{t('nav.about')}</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">{t('nav.contact')}</Link></li>
              <li><Link to="/nos-services" className="hover:text-white transition">{t('nav.services')}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
              {t('footer.legal')}
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/mentions-legales" className="hover:text-white transition">{t('footer.mentionsLegales')}</Link></li>
              <li><Link to="/conditions-utilisation" className="hover:text-white transition">{t('footer.cgu')}</Link></li>
              <li><Link to="/politique-confidentialite" className="hover:text-white transition">{t('footer.privacy')}</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Civil+. {t('footer.rights')}
          </p>
          <div className="bg-white/5 rounded-full px-2 py-1">
            <LanguageSwitch />
          </div>
        </div>
      </div>
    </footer>
  );
}
