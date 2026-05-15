import { useEffect } from 'react';
import SeoMeta from '../../components/SeoMeta';
import { useI18n } from '../../i18n/I18nContext';

export default function MentionsLegales() {
  const { lang } = useI18n();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-12">
      <SeoMeta
        title={lang === 'en' ? 'Legal notice — Civil+' : 'Mentions légales — Civil+'}
        description={lang === 'en' ? 'Legal information for Civil+ website.' : 'Informations légales du site Civil+.'}
      />
      <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-6">
        {lang === 'en' ? 'Legal Notice' : 'Mentions légales'}
      </h1>

      <div className="prose prose-gray max-w-none text-gray-700 text-sm md:text-base leading-relaxed space-y-5">
        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">
            {lang === 'en' ? 'Site publisher' : 'Éditeur du site'}
          </h2>
          <p>
            <strong>Civil+</strong><br />
            Plateforme de vente d'outils numériques pour ingénieurs civils.<br />
            Yaoundé, Cameroun<br />
            Téléphone : +237 650 000 749<br />
            Email : ingenierie@civilplus.work
          </p>
        </section>

        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">
            {lang === 'en' ? 'Publication director' : 'Directeur de la publication'}
          </h2>
          <p>Charles Bigirimana — Fondateur de Civil+</p>
        </section>

        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">
            {lang === 'en' ? 'Hosting' : 'Hébergement'}
          </h2>
          <p>
            Vercel Inc.<br />
            340 S Lemon Ave #4133, Walnut, CA 91789, USA<br />
            https://vercel.com
          </p>
        </section>

        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">
            {lang === 'en' ? 'Intellectual property' : 'Propriété intellectuelle'}
          </h2>
          <p>
            {lang === 'en'
              ? "All content on this site (text, images, logos, files, templates) is the exclusive property of Civil+ unless otherwise stated. Any reproduction, representation, modification, publication or adaptation, in whole or in part, of any of the elements of the site, by any means whatsoever, is prohibited without the prior written consent of Civil+."
              : "L'ensemble du contenu du site (textes, images, logos, fichiers, modèles) est la propriété exclusive de Civil+ sauf mention contraire. Toute reproduction, représentation, modification, publication ou adaptation, totale ou partielle, des éléments du site, quel que soit le moyen utilisé, est interdite sans autorisation écrite préalable de Civil+."}
          </p>
        </section>

        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">
            {lang === 'en' ? 'Liability' : 'Responsabilité'}
          </h2>
          <p>
            {lang === 'en'
              ? "Civil+ products are provided as professional engineering tools intended for use by qualified engineers. The user remains solely responsible for validating the results of any calculation against current standards and the specific context of their project."
              : "Les produits de Civil+ sont fournis comme outils professionnels destinés à des ingénieurs qualifiés. L'utilisateur reste seul responsable de la validation des résultats de tout calcul au regard des normes en vigueur et du contexte spécifique de son projet."}
          </p>
        </section>

        <section>
          <h2 className="font-bold text-primary text-lg mt-6 mb-2">
            {lang === 'en' ? 'Contact' : 'Contact'}
          </h2>
          <p>
            {lang === 'en'
              ? 'For any question regarding the site or its content, you can contact us at '
              : 'Pour toute question concernant le site ou son contenu, vous pouvez nous contacter à l\'adresse '}
            <a href="mailto:ingenierie@civilplus.work" className="text-primary font-semibold underline">
              ingenierie@civilplus.work
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
