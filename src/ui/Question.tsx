'use client'

import { REPONSE_NON } from "@/app/constants";
import { Audit, Question as QuestionType, REPONSE_OPTIONS, Reponse } from "@/domain/types";
import { saveReponse } from "@/infrastructure/repositories/reponsesRepository";
import Input from "@codegouvfr/react-dsfr/Input";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import { Range } from "@codegouvfr/react-dsfr/Range";
import React from "react";
import { Badge } from "@codegouvfr/react-dsfr/Badge";
import { Card } from "@codegouvfr/react-dsfr/Card";

export default function Question({ audit, question }: {audit: Audit, question: QuestionType }) {

    const [reponse, setReponse] = React.useState<REPONSE_OPTIONS | null>(question.reponse?.reponse || null);
    const [comment, setComment] = React.useState(question.reponse?.commentaire || "");
    const [percentage, setPercentage] = React.useState(question.reponse?.pourcentage || 0);

    React.useEffect(() => {
        const effect = async () => {
            !audit.cloture && await saveReponse({
                auditId: audit.id, 
                questionId: question.id, 
                reponse, 
                commentaire: comment ?? null, 
                pourcentage: reponse === REPONSE_NON ? percentage : null
            });
        }
        effect();
    }, [reponse, comment, percentage]);

    const badgeForReponse = (reponse: Reponse | null) => {
        let severity, label = 'Non répondue';
        if (reponse) {
            switch (reponse.reponse) {
                case REPONSE_OPTIONS.OUI:
                    severity = 'success';
                    label = 'Oui';
                    break;
                case REPONSE_OPTIONS.NON:
                    severity = 'error';
                    label = `Non${reponse.pourcentage && ` (${reponse.pourcentage}%)`}`;
                    break;
                case REPONSE_OPTIONS.NE_SAIS_PAS:
                    severity = 'warning';
                    label = 'Ne sais pas';
                    break;
                case REPONSE_OPTIONS.NON_APPLICABLE:
                    severity = 'info';
                    label = 'Non applicable';
                    break;
            }
        }

        return <Badge style={{ fontSize: 20}} severity={severity}>{label}</Badge>
    }

    return (
        <div style={{display: 'flex', flexDirection: 'row', marginTop: 20, alignItems: 'stretch', paddingBottom: 20}}>
            { audit.cloture ? (
                <Card
                    style={{flexGrow: 1}}
                    background
                    border
                    title={question.question}
                    titleAs="h3"
                    desc={question.tooltip}
                    size="small"
                    end={(<div>
                        { badgeForReponse(question.reponse) } 
                        { question.reponse?.commentaire && (
                            <p style={{whiteSpace: 'pre-wrap', marginTop: 10}}>{question.reponse?.commentaire}</p>
                        )}
                    </div>)}
                />
            ) : (
                <>
                    { reponse && (<Badge severity="success" style={{marginRight: 10}}/>)}
                    <div style={{marginRight: 20, flexBasis: 400, flexGrow: 0.6}}>
                        <RadioButtons
                            disabled={audit.cloture}
                            legend={question.question}
                            hintText={question.tooltip}
                            style={{whiteSpace: 'pre-line'}}
                            orientation="horizontal"
                            options={[
                                {
                                    label: "Oui",
                                    nativeInputProps: {
                                        checked: reponse === REPONSE_OPTIONS.OUI,
                                        onChange: async () => { await setReponse(REPONSE_OPTIONS.OUI);  }
                                    }
                                },
                                {
                                    label: "Non",
                                    nativeInputProps: {
                                        checked: reponse === REPONSE_OPTIONS.NON,
                                        onChange: async () => { await setReponse(REPONSE_OPTIONS.NON);   }
                                    }
                                },
                                {
                                    label: "Je ne sais pas",
                                    nativeInputProps: {
                                        checked: reponse === REPONSE_OPTIONS.NE_SAIS_PAS,
                                        onChange: async () => { await setReponse(REPONSE_OPTIONS.NE_SAIS_PAS); }
                                    }
                                },
                                {
                                    label: "Non applicable",
                                    nativeInputProps: {
                                        checked: reponse === REPONSE_OPTIONS.NON_APPLICABLE,
                                        onChange: async () => { await setReponse(REPONSE_OPTIONS.NON_APPLICABLE); }
                                    }
                                }
                            ]}
                        />
                        { reponse === REPONSE_NON && (
                            <Range
                                disabled={audit.cloture}
                                label=""
                                hintText='A quel pourcentage êtes vous du "Oui" ?'
                                max={100}
                                min={0}
                                step={10}
                                nativeInputProps={{
                                    value: percentage,
                                    onChange: async (event) => { await setPercentage(parseInt(event.currentTarget.value)); },
                                }}
                                small
                            />
                        )}
                    </div>
                    
                    <Input
                        disabled={audit.cloture}
                        label=""
                        style={{display: 'flex', flexGrow: 0.4 }}
                        nativeTextAreaProps={{
                            value: comment,
                            style: {display: 'flex', flexGrow: 1 },
                            placeholder: "Commentaires / détails",
                            name: `reponses[${question.id}][comment]`,
                            onChange: async (event) => { await setComment(event.currentTarget.value); }
                        }}
                        textArea
                    />
                </>
            )}
        </div>
    );
}
