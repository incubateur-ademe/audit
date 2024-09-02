import axios from "axios";

import { GRIST } from "../app/constants";

const { GRIST_URL, GRIST_API_KEY } = process.env;

const apiClient = axios.create({
    baseURL: GRIST_URL,
    headers: { Authorization: `Bearer ${GRIST_API_KEY}`}
})

export async function getGristQuestions() {
    return (await apiClient.get(`/docs/${GRIST.DOC_AUDIT}/tables/${GRIST.TABLES.QUESTIONS.ID}/records`, {
        params: {
            sort: 'manualSort'
        }
    })).data;
}

export async function saveGristReponses(records: any) {
    await apiClient.put(`/docs/${GRIST.DOC_AUDIT}/tables/${GRIST.TABLES.REPONSES.ID}/records`, { 
        records 
    });
}

export async function getGristAudit(auditId: number) {
    return (await apiClient.get(`/docs/${GRIST.DOC_AUDIT}/tables/${GRIST.TABLES.AUDITS.ID}/records`, {
        params: {
            filter: `{"${GRIST.TABLES.AUDITS.FIELDS.ID}":["${auditId}"]}`
        }
    })).data.records[0] ?? null
}

export async function getGristProduit(produitId: number) {
    return (await apiClient.get(`/docs/${GRIST.DOC_AUDIT}/tables/${GRIST.TABLES.PRODUITS.ID}/records`, {
        params: {
            filter: `{"${GRIST.TABLES.AUDITS.FIELDS.ID}":["${produitId}"]}`
        }
    })).data.records[0] ?? null
}
