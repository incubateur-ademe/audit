import { getAudit } from "@/infrastructure/repositories/auditRepository";
import { getQuestions } from "@/infrastructure/repositories/questionRepository";
import Question from "@/ui/Question";
import { CallOut } from "@codegouvfr/react-dsfr/CallOut";

export default async function Page({ params: { auditId }}) {
    const parsedAuditId = parseInt(auditId);

    const audit = await getAudit(parsedAuditId);
    const categories =  await getQuestions();

    return (
        <>
            { audit ? (
                <>
                { categories && categories.map((category) => (
                    category.title && (
                    <div key={`category.${category.title}`} style={{marginBottom: 50}}>
                    <CallOut
                        iconId="ri-information-line"
                        title={ category.title }
                        ></CallOut>
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