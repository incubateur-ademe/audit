'use server'

import { Audit } from "@/domain/types";
import { getGristAudit, getGristProduit } from "../gristClient";

export async function getAudit(auditHash: string|null): Promise<Audit|null> {

    if (!auditHash) {
        return null;
    }

    const gristAudit = await getGristAudit(auditHash);

    if (!gristAudit) {
        return null;
    }

    const gristProduit = await getGristProduit(gristAudit.fields.Produit);

    return {
        id: gristAudit.id,
        dateComiteInvestissement: new Date(gristAudit.fields.Date_comite_d_investissment * 1000),
        cloture: gristAudit.fields.Cloture,
        clotureLe: new Date(gristAudit.fields.Cloture_le * 1000),
        produit: {
            id: gristProduit.id,
            nom: gristProduit.fields.Nom
        }
    }
}
