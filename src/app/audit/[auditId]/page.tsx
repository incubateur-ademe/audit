import { getAudit } from "@/infrastructure/repositories/auditRepository";
import { getQuestions } from "@/infrastructure/repositories/questionRepository";
import Question from "@/ui/Question";
import { CallOut } from "@codegouvfr/react-dsfr/CallOut";

export default async function Page({ params: { auditId }}: any) {
    const parsedAuditId = parseInt(auditId);

    const audit = await getAudit(parsedAuditId);
    const categories =  await getQuestions();

    return (
        <>
            { audit ? (
                <>
                { categories && categories.map((category) => (
                    category.titre && (
                    <div key={`category.${category.titre}`} style={{marginBottom: 50}}>
                        <CallOut
                            iconId="ri-information-line"
                            title={ category.titre }
                        ><></></CallOut>
                    { category.questions.map((question) => (
                        <Question auditId={parsedAuditId} question={question} key={`question.${question.id}`}/>
                    ))}
                    </div>
                    )
                ))}
                <br/>
            </>
            ) : (
                <p>Audit not found</p>
            )}
        </>
    );
}