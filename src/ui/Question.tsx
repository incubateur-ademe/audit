'use client'

import { REPONSE_NON } from "@/app/constants";
import { Audit, Question as QuestionType, REPONSE_OPTIONS } from "@/domain/types";
import { saveReponse } from "@/infrastructure/repositories/reponsesRepository";
import Input from "@codegouvfr/react-dsfr/Input";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import { Range } from "@codegouvfr/react-dsfr/Range";
import React from "react";

export default function Question({ audit, question }: {audit: Audit, question: QuestionType }) {

    const [reponse, setReponse] = React.useState<REPONSE_OPTIONS | null>(question.reponse?.reponse || null);
    const [comment, setComment] = React.useState(question.reponse?.commentaire || "");
    const [percentage, setPercentage] = React.useState(question.reponse?.pourcentage || 0);

    React.useEffect(() => {
        const effect = async () => {
            question.id === 15 && console.log('Apply save effect effect')
            await saveReponse({
                auditId: audit.id, 
                questionId: question.id, 
                reponse, 
                commentaire: comment ?? null, 
                pourcentage: reponse === REPONSE_NON ? percentage : null
            });
        }
        effect();
    }, [reponse, comment, percentage]);

    return (
        <div style={{display: 'flex', flexDirection: 'row', marginTop: 20, alignItems: 'stretch'}}>
            <div style={{marginRight: 20,  flexBasis: 600, flexGrow: 0.6}}>
                <RadioButtons
                    disabled={audit.cloture}
                    state={reponse ? 'success' : 'default'}
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
                        state={percentage ? 'success' : 'default'}
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
                style={{flexGrow: 0.4}}
                nativeTextAreaProps={{
                    value: comment,
                    style: {flexGrow: 1},
                    placeholder: "Commentaires / détails",
                    name: `reponses[${question.id}][comment]`,
                    onChange: async (event) => { await setComment(event.currentTarget.value); }
                }}
                textArea
            />
        </div>
    );
}
