import { Link } from 'react-router-dom';
import { Phone, Mail, Facebook, Instagram } from 'lucide-react';

const languages = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-1 mb-4">
              <span className="text-white font-extrabold text-2xl">Civil</span>
              <span className="text-accent font-extrabold text-2xl">+</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Outils professionnels pour ingénieurs civils en Afrique et dans le monde.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-accent transition flex items-center justify-center"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-accent transition flex items-center justify-center"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
              Nos contacts
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-accent shrink-0" />
                <a href="tel:+237650000749" className="hover:text-white transition">
                  +237 650 000 749
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-accent shrink-0" />
                <a href="mailto:ingenierie@civilplus.work" className="hover:text-white transition">
                  ingenierie@civilplus.work
                </a>
              </li>
            </ul>
          </div>

          {/* Liens */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
              Liens
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/a-propos" className="hover:text-white transition">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/nos-services" className="hover:text-white transition">
                  Nos services
                </Link>
              </li>
            </ul>
          </div>

          {/* Légales */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
              Légales
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/mentions-legales" className="hover:text-white transition">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link to="/conditions-utilisation" className="hover:text-white transition">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link to="/politique-confidentialite" className="hover:text-white transition">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Civil+. Tous droits réservés.
          </p>

          {/* Language selector */}
          <div className="flex items-center gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className="text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-accent text-gray-300 hover:text-white transition"
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
