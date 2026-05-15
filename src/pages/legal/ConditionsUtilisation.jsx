import { useEffect } from 'react';
import SeoMeta from '../../components/SeoMeta';
import { useI18n } from '../../i18n/I18nContext';

export default function ConditionsUtilisation() {
  const { lang } = useI18n();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const fr = (
    <>
      <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-6">
        Conditions générales d'utilisation et de vente
      </h1>
      <div className="prose prose-gray max-w-none text-gray-700 text-sm md:text-base leading-relaxed space-y-5">
        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">1. Objet</h2>
          <p>
            Les présentes Conditions Générales d'Utilisation et de Vente (CGUV) régissent les relations
            entre Civil+ et tout utilisateur du site civilplus.work, ainsi que les achats de produits
            numériques effectués via le site.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">2. Produits</h2>
          <p>
            Civil+ propose à la vente des fichiers Excel, modèles documentaires, applications web et
            formations en ligne destinés aux professionnels du génie civil. Les caractéristiques
            essentielles de chaque produit sont décrites sur sa page dédiée.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">3. Prix et paiement</h2>
          <p>
            Les prix sont indiqués en FCFA (XOF / XAF). Le paiement s'effectue via notre prestataire
            de paiement sécurisé (Visa, Mastercard, Orange Money, MTN Mobile Money, Wave, Moov Money).
            La commande est validée à réception du paiement.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">4. Livraison</h2>
          <p>
            Les produits sont livrés instantanément après paiement, par téléchargement direct ou par
            email contenant un lien d'accès. Aucun support physique n'est expédié.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">5. Garantie satisfait ou remboursé</h2>
          <p>
            Conformément à notre engagement, vous disposez d'un délai de <strong>14 jours</strong> à
            compter de l'achat pour demander un remboursement, sans avoir à justifier votre décision.
            La demande s'effectue par email à ingenierie@civilplus.work.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">6. Licence d'utilisation</h2>
          <p>
            L'achat d'un produit donne droit à une licence d'utilisation personnelle, non
            transférable et non exclusive. La revente, le partage ou la distribution des fichiers à
            des tiers sont strictement interdits.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">7. Support</h2>
          <p>
            Le support client est disponible 7j/7 par email à ingenierie@civilplus.work et par
            WhatsApp au +237 650 000 749. Le temps de réponse moyen est de 12 heures.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">8. Responsabilité</h2>
          <p>
            Les fichiers de calcul et outils proposés sont des aides à la conception destinées à des
            ingénieurs qualifiés. Civil+ ne saurait être tenu responsable des conséquences d'un
            usage par une personne non qualifiée ou sans validation des résultats par un
            professionnel compétent.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">9. Droit applicable</h2>
          <p>
            Les présentes CGUV sont soumises au droit camerounais. Tout litige sera de la compétence
            exclusive des tribunaux de Yaoundé.
          </p>
        </section>
      </div>
    </>
  );

  const en = (
    <>
      <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-6">
        Terms of Use and Sale
      </h1>
      <div className="prose prose-gray max-w-none text-gray-700 text-sm md:text-base leading-relaxed space-y-5">
        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">1. Purpose</h2>
          <p>
            These Terms of Use and Sale govern the relationship between Civil+ and any user of the
            civilplus.work website, as well as purchases of digital products through the site.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">2. Products</h2>
          <p>
            Civil+ sells Excel files, document templates, web applications and online training
            courses intended for civil engineering professionals. The key features of each product
            are described on its dedicated page.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">3. Pricing and payment</h2>
          <p>
            Prices are listed in FCFA (XOF / XAF). Payment is processed by our secure payment
            provider (Visa, Mastercard, Orange Money, MTN Mobile Money, Wave, Moov Money). The
            order is confirmed upon receipt of payment.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">4. Delivery</h2>
          <p>
            Products are delivered instantly after payment, by direct download or by email
            containing an access link. No physical media is shipped.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">5. Money-back guarantee</h2>
          <p>
            In line with our commitment, you have <strong>14 days</strong> from the date of
            purchase to request a refund, with no need to justify your decision. Requests should be
            sent by email to ingenierie@civilplus.work.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">6. License of use</h2>
          <p>
            Purchase of a product grants a personal, non-transferable, non-exclusive license of use.
            Reselling, sharing or distributing the files to third parties is strictly prohibited.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">7. Support</h2>
          <p>
            Customer support is available 7 days a week by email at ingenierie@civilplus.work and
            via WhatsApp at +237 650 000 749. Average response time is 12 hours.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">8. Liability</h2>
          <p>
            The calculation files and tools offered are design aids intended for qualified
            engineers. Civil+ cannot be held responsible for the consequences of use by an
            unqualified person or without validation of the results by a competent professional.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">9. Applicable law</h2>
          <p>
            These terms are subject to Cameroonian law. Any dispute shall fall under the exclusive
            jurisdiction of the courts of Yaoundé.
          </p>
        </section>
      </div>
    </>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-12">
      <SeoMeta
        title={lang === 'en' ? 'Terms of Use — Civil+' : "Conditions d'utilisation — Civil+"}
        description={lang === 'en' ? 'General terms of use and sale.' : 'Conditions générales d\'utilisation et de vente.'}
      />
      {lang === 'en' ? en : fr}
    </div>
  );
}
