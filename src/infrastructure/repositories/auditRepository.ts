'use server'

import { Audit } from "@/domain/types";
import { getGristAudit, getGristProduit } from "../gristClient";

export async function getAudit(auditId: number): Promise<Audit|null> {
    const gristAudit = await getGristAudit(auditId);

    if (!gristAudit) {
        return null;
    }

    const gristProduit = await getGristProduit(gristAudit.fields.Produit);

    return {
        id: auditId,
        date: new Date(gristAudit.fields.Date * 1000),
        produit: {
            id: gristProduit.fields.ID2,
            nom: gristProduit.fields.Nom
        }
    }
}
