'use server'

import { Reponse } from "@/domain/types";
import { getGristReponse, getGristReponses, saveGristReponses } from "../gristClient";

export async function getReponses(auditId: number): Promise<Reponse[]> {

    const gristReponses = await getGristReponses(auditId);

    return gristReponses.map((gristReponse: any) => ({
        id: gristReponse.id,
        auditId: gristReponse.fields.Audit,
        questionId: gristReponse.fields.Question,
        reponse: gristReponse.fields.Reponse,
        commentaire: gristReponse.fields.Commentaires_Details,
        pourcentage: gristReponse.fields.Pourcentage,
    }));
}

export async function getReponse(auditId: number, questionId: number): Promise<Reponse> {

    const gristReponse = await getGristReponse(auditId, questionId);

    return {
        id: gristReponse.id,
        auditId: gristReponse.fields.Audit,
        questionId: gristReponse.fields.Question,
        reponse: gristReponse.fields.Reponse,
        commentaire: gristReponse.fields.Commentaires_Details,
        pourcentage: gristReponse.fields.Pourcentage,
    };
}

export async function saveReponse(reponse: Reponse) {
    console.log('saveReponse', reponse);
    await naiveSaveWithPacking(reponse);
}

export async function resetReponse(auditId: number, questionId: number) {
    saveReponse({
        auditId,
        questionId,
        reponse: null,
        commentaire: "",
        pourcentage: 0,
        reset: true
    })
}

export const reponseId = async (reponse: Reponse): Promise<string> => `${reponse.auditId}-${reponse.questionId}`;

let isPacking: boolean;
let packedReponses: Record<string, Reponse>;
let currentTimerId: NodeJS.Timeout;

async function naiveSaveWithPacking(reponse?: Reponse) {
    if (!isPacking) {
        packedReponses= {};
        isPacking = true;
        currentTimerId = setTimeout(naiveSaveWithPacking, 1000);
    } else {
        const countReponses = Object.keys(packedReponses).length;
        if (!reponse || countReponses > 40) {
            if (countReponses > 0) {
                await saveReponses(Object.values(packedReponses));
            }
            isPacking = false;
            clearTimeout(currentTimerId);
        }    
    }

    if (reponse) {
        const rId = await reponseId(reponse);
        if (!packedReponses[rId]?.reset) {
            packedReponses = {
                ...packedReponses,
                [rId]: reponse
            }
        }
    } 
}

export async function saveReponses(reponses: Reponse[]) {
    saveGristReponses(reponses.map((reponse) => ({
        require: {
            "Audit": reponse.auditId,
            "Question": reponse.questionId,
        },
        fields: {
            ... ((reponse.reponse != null || reponse.reset) && {
                "Reponse": reponse.reponse,
            }),
            ... (reponse.commentaire != null && {
                "Commentaires_Details": reponse.commentaire,
            }),
            ... (reponse.pourcentage != null && {
                "Pourcentage": reponse.pourcentage,
            }),
        }
    })))
    
}