import { getAudit } from "@/infrastructure/repositories/auditRepository";
import { getQuestions } from "@/infrastructure/repositories/questionRepository";
import Audit from "@/ui/Audit";

export default async function Page({ params: { auditHash } }: any) {
  const audit = await getAudit(auditHash);

  if (!audit) {
    return <p>Audit not found</p>;
  }

  const categories = await getQuestions(audit.id);

  return (
    <>
      <h2>Audit technique du produit {audit.produit.nom}</h2>
      <p>
        pour le comité d&apos;investissement du{" "}
        {audit.dateComiteInvestissement.toLocaleDateString("fr")}
      </p>
      <p className="fr-text--lead">
          Bienvenue sur votre audit technique.
          <br />
          La majorité des questions sont formulées de manière à ce qu&apos;une réponse &quot;Oui&quot; soit généralement souhaitable.
          Cependant, il peut être tout à fait approprié de répondre &quot;Non&quot; dans certains cas.
          Si c&apos;est le cas, merci de nous fournir un commentaire expliquant votre situation spécifique.
          <br />
          

            Important : ce formulaire ne prend pas encore en charge l&apos;édition simultanée.
            Si plusieurs personnes travaillent dessus en même temps, vous risquez d&apos;écraser les réponses des autres.
          <br />
          Bon audit !
       </p>
      <Audit audit={audit} categories={categories} />
    </>
  );
}
