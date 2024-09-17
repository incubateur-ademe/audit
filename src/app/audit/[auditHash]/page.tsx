import { getAudit } from "@/infrastructure/repositories/auditRepository";
import { getQuestions } from "@/infrastructure/repositories/questionRepository";
import Audit from "@/ui/Audit";

export default async function Page({ params: { auditHash }}: any) {
    
    const audit = await getAudit(auditHash);

    if (!audit) {
        return (<p>Audit not found</p>);
    }

    const categories =  await getQuestions(audit.id);

    return (
        <>
            <h2>Audit technique du produit {audit.produit.nom}</h2>
            <p>pour le comité d'investissement du {audit.dateComiteInvestissement.toLocaleDateString('fr')}</p>
            <p className="fr-text--lead">
                Bienvenue sur votre audit technique.<br/>
                La plupart des questions sont conçues pour que la réponse "Oui" soit souhaitable, il y aura néanmoins des situations où il est tout à fait pertinent de répondre "Non" dans ce cas laissez-nous un commentaire expliquant votre cas.<br/>
                Attention ce formulaire ne gère pas encore l'édition simultanée, si vous êtes plusieurs à travailler dessus en même temps vous risquer d'écraser les réponses des autres.<br/>
                Bon audit !
            </p>
            <Audit audit={audit} categories={categories} />
        </>
    );
}