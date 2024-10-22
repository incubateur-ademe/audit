export default function Page() {
  return (
    <div role="main" id="content">
      <div className="fr-mb-md-14v pt-20 max-w-screen-lg mx-auto px-4">
        <h1 className="fr-h1">Mentions légales</h1>

        <hr className="mt-8" />

        <h3 className="fr-h3">Editeur de la Plateforme</h3>

        <p>
          Ce site <b>Audit tech</b> est éditée par
          l’Agence nationale de la cohésion des territoires, située au :
        </p>

        <p>
          20 avenue de Ségur <br />
          75007, Paris <br />
          Téléphone : +33 1 85 58 60 00 <br />
          Courriel :{" "}
          <a href="mailto:contactincubateur@anct.gouv.fr">
            contactincubateur@anct.gouv.fr
          </a>
        </p>

        <hr className="mt-8" />

        <h2 className="fr-h3">Directeur de la publication</h2>

        <p>Stanislas Bourron, Directeur général</p>

        <hr className="mt-8" />

        <h2 className="fr-h3">Hébergement de la Plateforme</h2>

        <p>
          <strong>
            Plateforme en tant que service (Platform as a Service) :
          </strong>
          Scalingo SAS
          <br />
          3 place de Haguenau
          <br />
          67000 STRASBOURG,
          <br />
          FRANCE
        </p>

        <p>
          <strong>Hébergement :</strong>
            Outscale (3DS Outscale)
            <br />
            1 rue Royale
            <br />
            319 Bureaux de la Colline
            <br />
            92210 SAINT-CLOUD,
            <br />
            FRANCE
        </p>

        <hr className="mt-8" />

        <h2 className="fr-h3">Accessibilité</h2>

        <p>
          La conformité aux normes d’accessibilité numérique est un objectif
          ultérieur mais nous tâchons de rendre ce site accessible à toutes et à
          tous.
        </p>

        <h3>Signaler un dysfonctionnement</h3>

        <p>
          Si vous rencontrez un défaut d’accessibilité vous empêchant d’accéder
          à un contenu ou une fonctionnalité du site, merci de nous en faire
          part en envoyant un mail à 
          <a href="mailto:contactincubateur@anct.gouv.fr">
            contactincubateur@anct.gouv.fr
          </a>
          . Si vous n’obtenez pas de réponse rapide de notre part, vous êtes en
          droit de faire parvenir vos doléances ou une demande de saisine au
          Défenseur des droits.
        </p>

        <h3>En savoir plus</h3>

        <p>
          Pour en savoir plus sur la politique d’accessibilité numérique de
          l’État : 
          <a
            href="https://references.modernisation.gouv.fr/accessibilite-numerique"
            target="_blank"
            title="Référentiel général d’amélioration de l’accessibilité - nouvelle fenêtre"
          >
            https://references.modernisation.gouv.fr/accessibilite-numerique
          </a>
        </p>

        <hr className="mt-8" />

        <h2 className="fr-h3">Sécurité</h2>

        <p>
          Le site est protégé par un certificat électronique, matérialisé pour
          la grande majorité des navigateurs par un cadenas. Cette protection
          participe à la confidentialité des échanges. En aucun cas les services
          associés à la plateforme ne seront à l’origine d’envoi de courriels
          pour demander la saisie d’informations personnelles.
        </p>
      </div>
    </div>
  );
}
