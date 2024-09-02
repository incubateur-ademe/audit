'use server'

import { Categorie } from "@/domain/types";
import { getGristQuestions } from "../gristClient";

export async function getQuestions(): Promise<Categorie[]> {

    const gristQuestions = await getGristQuestions();

    return Object.values(gristQuestions.records.reduce((acc, gristQuestion) => {
        return {
            ...acc,
            [gristQuestion.fields.Categorie]: {
                ...acc[gristQuestion.fields.Categorie],
                title: gristQuestion.fields.Categorie,
                questions: [
                    ... (acc[gristQuestion.fields.Categorie] ? acc[gristQuestion.fields.Categorie].questions : []),
                    {
                        id: gristQuestion.fields.ID2,
                        question: gristQuestion.fields.Question
                    }
                ]
            }
        }
    }, {}));
}