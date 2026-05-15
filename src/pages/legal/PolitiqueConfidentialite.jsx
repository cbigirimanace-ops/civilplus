import { useEffect } from 'react';
import SeoMeta from '../../components/SeoMeta';
import { useI18n } from '../../i18n/I18nContext';

export default function PolitiqueConfidentialite() {
  const { lang } = useI18n();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const fr = (
    <>
      <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-6">
        Politique de confidentialité
      </h1>
      <div className="prose prose-gray max-w-none text-gray-700 text-sm md:text-base leading-relaxed space-y-5">
        <p>
          La présente politique décrit la manière dont Civil+ collecte, utilise et protège les
          données personnelles des visiteurs et clients du site civilplus.work.
        </p>
        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">1. Données collectées</h2>
          <p>
            Nous collectons uniquement les données strictement nécessaires : nom, adresse email,
            numéro de téléphone (si renseigné), informations de paiement (traitées par notre
            prestataire sécurisé et non stockées par Civil+), adresse IP et données de navigation
            (cookies analytiques).
          </p>
        </section>
        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">2. Finalités</h2>
          <ul className="list-disc ml-5 space-y-1.5">
            <li>Traitement des commandes et livraison des produits numériques</li>
            <li>Support client et communication relative aux commandes</li>
            <li>Amélioration du site (statistiques anonymisées)</li>
            <li>Envoi de communications commerciales (newsletter, codes promo) — uniquement avec votre consentement</li>
          </ul>
        </section>
        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">3. Cookies et traceurs</h2>
          <p>
            Le site utilise des cookies pour assurer son bon fonctionnement et mesurer son audience
            via Google Analytics, Google Tag Manager et le pixel Meta (Facebook). Vous pouvez
            désactiver ces cookies via les paramètres de votre navigateur.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">4. Partage des données</h2>
          <p>
            Vos données ne sont jamais vendues. Elles peuvent être partagées avec nos prestataires
            techniques strictement nécessaires (paiement, hébergement, envoi d'emails) qui agissent
            sous notre instruction et avec un niveau de protection équivalent.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">5. Durée de conservation</h2>
          <p>
            Les données de commande sont conservées pendant 10 ans à des fins comptables. Les
            données marketing sont conservées tant que vous restez abonné à nos communications et
            supprimées sous 30 jours après désinscription.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">6. Vos droits</h2>
          <p>
            Vous disposez d'un droit d'accès, de rectification, de suppression, de portabilité et
            d'opposition concernant vos données. Pour exercer ces droits, contactez-nous à
            ingenierie@civilplus.work.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">7. Sécurité</h2>
          <p>
            Toutes les communications sont chiffrées (HTTPS). Les données sensibles ne sont jamais
            stockées par Civil+. Nous appliquons les mesures techniques et organisationnelles
            usuelles pour prévenir tout accès non autorisé.
          </p>
        </section>
      </div>
    </>
  );

  const en = (
    <>
      <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-6">
        Privacy Policy
      </h1>
      <div className="prose prose-gray max-w-none text-gray-700 text-sm md:text-base leading-relaxed space-y-5">
        <p>
          This policy describes how Civil+ collects, uses and protects the personal data of
          visitors and customers of the civilplus.work website.
        </p>
        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">1. Data collected</h2>
          <p>
            We collect only strictly necessary data: name, email address, phone number (if
            provided), payment information (processed by our secure provider and not stored by
            Civil+), IP address and navigation data (analytics cookies).
          </p>
        </section>
        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">2. Purposes</h2>
          <ul className="list-disc ml-5 space-y-1.5">
            <li>Order processing and digital product delivery</li>
            <li>Customer support and communication about orders</li>
            <li>Site improvement (anonymized statistics)</li>
            <li>Sending of marketing communications (newsletter, promo codes) — only with your consent</li>
          </ul>
        </section>
        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">3. Cookies and trackers</h2>
          <p>
            The site uses cookies to operate correctly and measure audience via Google Analytics,
            Google Tag Manager and Meta (Facebook) pixel. You can disable these cookies through
            your browser settings.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">4. Data sharing</h2>
          <p>
            Your data is never sold. It may be shared with our strictly necessary technical
            providers (payment, hosting, email delivery) acting on our instruction and providing
            equivalent protection.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">5. Retention</h2>
          <p>
            Order data is kept for 10 years for accounting purposes. Marketing data is retained
            while you remain subscribed and is deleted within 30 days of unsubscription.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">6. Your rights</h2>
          <p>
            You have rights of access, rectification, deletion, portability and opposition
            regarding your data. To exercise these rights, contact us at ingenierie@civilplus.work.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">7. Security</h2>
          <p>
            All communications are encrypted (HTTPS). Sensitive data is never stored by Civil+. We
            apply standard technical and organizational measures to prevent unauthorized access.
          </p>
        </section>
      </div>
    </>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-12">
      <SeoMeta
        title={lang === 'en' ? 'Privacy Policy — Civil+' : 'Politique de confidentialité — Civil+'}
        description={lang === 'en' ? 'How we collect, use and protect your data.' : 'Comment nous collectons, utilisons et protégeons vos données.'}
      />
      {lang === 'en' ? en : fr}
    </div>
  );
}
