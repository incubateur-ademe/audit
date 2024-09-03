'use server'

import { Categorie, Reponse } from "@/domain/types";
import { getGristQuestions } from "../gristClient";
import { getReponses } from "./reponsesRepository";

export async function getQuestions(auditId: number): Promise<Categorie[]> {

    const gristQuestions = await getGristQuestions();
    const reponses: Record<string, Reponse> = (await getReponses(auditId)).reduce((acc: Record<string, Reponse>, reponse) => {
        return {
            ...acc,
            [reponse.questionId]: reponse
        }
    }, {});

    return Object.values(gristQuestions.records.reduce((acc: Record<string, Categorie>, gristQuestion: any) => {
        return {
            ...acc,
            [gristQuestion.fields.Categorie]: {
                ...acc[gristQuestion.fields.Categorie],
                titre: gristQuestion.fields.Categorie,
                questions: [
                    ... (acc[gristQuestion.fields.Categorie] ? acc[gristQuestion.fields.Categorie].questions : []),
                    {
                        id: gristQuestion.id,
                        question: gristQuestion.fields.Question,
                        importance: gristQuestion.fields.Importance,
                        tooltip: gristQuestion.fields.Tooltip,
                        reponse: reponses[gristQuestion.id],
                    }
                ]
            }
        }
    }, {}));
}