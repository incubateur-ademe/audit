'use client'

import { REPONSE_NON } from "@/app/constants";
import { Question as QuestionType, REPONSE_OPTIONS } from "@/domain/types";
import { saveReponse } from "@/infrastructure/repositories/reponsesRepository";
import Input from "@codegouvfr/react-dsfr/Input";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import { Range } from "@codegouvfr/react-dsfr/Range";
import React from "react";

export default function Question({ auditId, question }: {auditId: number, question: QuestionType}) {

    const [reponse, setReponse] = React.useState<REPONSE_OPTIONS | null>(null);
    const [comment, setComment] = React.useState("");
    const [percentage, setPercentage] = React.useState(0);

    React.useEffect(() => {
        const effect = async () => {
            await saveReponse({
                auditId, 
                questionId: question.id, 
                reponse, 
                commentaire: comment ?? null, 
                pourcentage: reponse === REPONSE_NON ? percentage : null
            });
        }
        effect();
    }, [reponse, comment, percentage])

    return (
        <div style={{display: 'flex', flexDirection: 'row', marginTop: 20, alignItems: 'stretch'}}>
            <div style={{marginRight: 20,  flexBasis: 600, flexGrow: 0.6}}>
                <RadioButtons
                    state={reponse ? 'success' : 'default'}
                    legend={question.question}
                    style={{whiteSpace: 'pre-line'}}
                    name={`reponses[${question.id}][reponse]`}
                    orientation="horizontal"
                    options={[
                        {
                            label: "Oui",
                            nativeInputProps: {
                                value: "Oui",
                                onChange: async () => { setReponse(REPONSE_OPTIONS.OUI) }
                            }
                        },
                        {
                            label: "Non",
                            nativeInputProps: {
                                value: "Non",
                                onChange: async () => {  setReponse(REPONSE_OPTIONS.NON)  }
                            }
                        },
                        {
                            label: "Je ne sais pas",
                            nativeInputProps: {
                                value: "Ne sais pas",
                                onChange: async () => { setReponse(REPONSE_OPTIONS.NE_SAIS_PAS)}
                            }
                        },
                        {
                            label: "Non applicable",
                            nativeInputProps: {
                                value: "N/A",
                                onChange: async () => { setReponse(REPONSE_OPTIONS.NON_APPLICABLE)}
                            }
                        }
                    ]}
                />
                { reponse === REPONSE_NON && (
                    <Range
                        label=""
                        state={percentage ? 'success' : 'default'}
                        hintText='A quel pourcentage êtes vous du "Oui" ?'
                        max={100}
                        min={0}
                        step={10}
                        nativeInputProps={{
                            value: percentage,
                            onChange: (event) => { setPercentage(parseInt(event.currentTarget.value))},
                        }}
                        small
                    />
                )}
            </div>
            
            <Input
                label=""
                style={{flexGrow: 0.4}}
                nativeTextAreaProps={{
                    style: {flexGrow: 1},
                    placeholder: "Commentaires / détails",
                    name: `reponses[${question.id}][comment]`,
                    onBlur: async (event) => { setComment(event.currentTarget.value)}
                }}
                textArea
            />
        </div>
    );
}
