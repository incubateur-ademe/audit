import { getAudit } from "@/infrastructure/repositories/auditRepository";
import { getQuestions } from "@/infrastructure/repositories/questionRepository";
import Question from "@/ui/Question";
import { CallOut } from "@codegouvfr/react-dsfr/CallOut";
import { Tabs } from "@codegouvfr/react-dsfr/Tabs";

export default async function Page({ params: { auditHash }}: any) {
    const audit = await getAudit(auditHash);

    if (!audit) {
        return (<p>Audit not found</p>);
    }

    const categories =  await getQuestions(audit.id);

    return (
        <>
            <h2>Audit technique du produit {audit.produit.nom}</h2>
            <p>pour le comité d'investissement du {audit.dateComiteInvestissement.toLocaleDateString()}</p>
            <p className="fr-text--lead">
                Bienvenue sur votre audit technique.<br/>
                La plupart des questions sont conçues pour que la réponse "Oui" soit souhaitable, il y aura néanmoins des situations où il est tout à fait pertinent de répondre "Non" dans ce cas laissez-nous un commentaire expliquant votre cas.<br/>
                Bon audit !
            </p>
        
            <Tabs
                tabs={ categories && categories.map((category) => ({
                    label: category.titre,
                    content : (
                    category.titre && (
                    <div key={`category.${category.titre}`}>
                    { category.questions.map((question) => (
                        <Question audit={audit} question={question} key={`question.${question.id}`}/>
                    ))}
                    </div>
                    )
                )})
                )}
            />
        </>
    );
}