'use server'

import { Reponse } from "@/domain/types";
import { saveGristReponses } from "../gristClient";

export async function saveReponse(reponse: Reponse) {
    await naiveSaveWithPacking(reponse);
}

const reponseId = (reponse: Reponse): string => `${reponse.auditId}-${reponse.questionId}`;

let isPacking: boolean;
let packedReponses: Record<string, Reponse>;
let currentTimerId: NodeJS.Timeout;
async function naiveSaveWithPacking(reponse?: Reponse) {
    if (!isPacking) {
        packedReponses= {};
        isPacking = true;
        currentTimerId = setTimeout(naiveSaveWithPacking, 3000);
    } else {
        const countReponses = Object.keys(packedReponses).length;
        if (!reponse|| countReponses > 10) {
            if (countReponses > 0) {
                saveReponses(Object.values(packedReponses));
            }
            isPacking = false;
            clearTimeout(currentTimerId);
        }    
    }

    if (reponse) {
        packedReponses = {
            ...packedReponses,
            [reponseId(reponse)]: reponse
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
            ... (reponse.reponse && {
                "Reponse": reponse.reponse,
            }),
            ... (reponse.commentaire && {
                "Commentaires_Details": reponse.commentaire,
            }),
            ... (reponse.pourcentage && {
                "Pourcentage": reponse.pourcentage,
            }),
        }
    })))
    
}