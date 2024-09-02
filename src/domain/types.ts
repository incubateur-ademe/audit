import { REPONSE_NE_SAIS_PAS, REPONSE_NON, REPONSE_NON_APPLICABLE, REPONSE_OUI } from "@/app/constants"

export enum REPONSE_OPTIONS {
    OUI=REPONSE_OUI,
    NON=REPONSE_NON,
    NE_SAIS_PAS=REPONSE_NE_SAIS_PAS,
    NON_APPLICABLE=REPONSE_NON_APPLICABLE,
}

export interface Categorie {
    titre: string
    questions: Question[]
}

export interface Question {
    id: number
    question: string
}

export interface Produit {
    id: number
    nom: string
}

export interface Audit {
    id: number
    date: Date
    produit: Produit
}

export interface Reponse {
    auditId: number
    questionId: number
    reponse: REPONSE_OPTIONS|null
    commentaire: string|null
    pourcentage: number|null
}