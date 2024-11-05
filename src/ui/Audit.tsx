'use client'
import { Tabs } from "@codegouvfr/react-dsfr/Tabs";
import React, { ChangeEvent, FormEvent } from "react";
import { Audit as AuditType, Categorie as CategorieType, Reponse } from "@/domain/types";
import Categorie from "@/ui/Categorie";
import Question from "./Question";
import Button from "@codegouvfr/react-dsfr/Button";
import { saveReponse } from "@/infrastructure/repositories/reponsesRepository";

export default function Audit({ audit, categories }: { audit: AuditType, categories: CategorieType[]}) {
    const formRef = React.useRef<HTMLFormElement>(null);

    function handleQuestionChange(question: Reponse) {
        console.log('handleQuestionChange', question);
        saveReponse(question);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log('submit', event);
        return;
    }

    return (
        <>
            <form ref={formRef} onSubmit={handleSubmit}>
                <Tabs
                    tabs={ categories?.map((categorie, index) => ({
                        tabId: index,
                        label: categorie.titre,
                        content: (categorie.titre ? (
                                <div key={`category.${categorie.titre}`} title={categorie.titre}>
                                    { categorie.questions.map((question) => (
                                        <Question 
                                                audit={audit} 
                                                question={question} 
                                                key={`question.${question.id}`} 
                                                onChange={handleQuestionChange}
                                            />
                                        ))}
                                </div>
                            ) : undefined)
                        })
                    )}
                    />
            </form>
        </>
    );
}