'use server'

import { Reponse } from "@/domain/types";
import { saveGristReponses } from "../gristClient";

export async function saveReponse(reponse: Reponse) {
    await saveReponses([reponse]);
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