import { getAudit } from "@/infrastructure/repositories/auditRepository";
import { getQuestions } from "@/infrastructure/repositories/questionRepository";
import Audit from "@/ui/Audit";

export default async function Page({ params: { auditHash } }: any) {
  const audit = await getAudit(auditHash);

  if (!audit) {
    return (
      <p>
        Désolé, l&apos;audit que vous cherchez n&apos;a pas été trouvé. Il est possible que le lien soit incorrect ou que l&apos;audit n&apos;existe plus. 
        Veuillez vérifier les informations fournies ou contacter l&apos;équipe technique pour obtenir de l&apos;aide.
      </p>
    );
  }

  const categories = await getQuestions(audit.id);

  return (
    <>
      <h2>Audit technique du produit {audit.produit.nom}</h2>
      <p>
        Comité d&apos;investissement prévu pour le{" "}
        {audit.dateComiteInvestissement.toLocaleDateString("fr")}
      </p>
      <p className="fr-text--md fr-mb-2w">
        Ce questionnaire vise à recueillir des informations techniques sur le produit. Une réponse positive (Oui) est généralement attendue, mais une réponse négative (Non) peut être tout à fait appropriée en fonction du contexte. Dans ce cas, merci de préciser les raisons dans les commentaires.
      </p>
      <p className="fr-text--sm fr-mb-4w">
        <strong>Important :</strong> Le formulaire ne prend pas encore en charge l&apos;édition simultanée. Si plusieurs personnes travaillent dessus en même temps, cela risque d&apos;écraser les réponses des autres.
      </p>
      <p className="fr-text--lead fr-mb-6w">Merci pour votre contribution.</p>
      <Audit audit={audit} categories={categories} />
    </>
  );
}
